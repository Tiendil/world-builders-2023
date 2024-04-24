import * as uuid from 'uuid';
import * as _ from "lodash";
import * as t from "@/logic/types";
import * as s from "@/logic/statements";
import * as a from "@/logic/actors";
import * as challenges from "@/logic/challenges";
import * as utils from "@/logic/utils";
import * as materials from "@/logic/materials";


function choosePerson(persons: {[key: t.PersonId]: t.Person}, predicate: (person: t.Person) => boolean): t.Person {

  const personIds = Object.keys(persons);

  const candidates = personIds.map(personId => persons[personId]).filter((person: t.Person) => person.isAlive && predicate(person));

  if (candidates.length === 0) {
    return null;
  }

  return _.sample(candidates) as t.Person;
}

function hasStatement(person: t.Person, statementId: t.StatementId): boolean {
  for (const statement of person.statements) {
    if (statement.id === statementId) {
      return true;
    }
  }

  return false;
}

////////////////////////
// event factories
////////////////////////

class BaseEventFactory extends t.EventFactory {

  readonly challenges: t.ChallengeId[];
  readonly themes: t.MaterialTheme[];

  constructor({id, challenges, themes}:
              {id: t.EventFactoryId,
               challenges: t.ChallengeId[],
               themes: t.MaterialTheme[]}) {
    super({id});
    this.challenges = challenges;
    this.themes = themes;
  }


  createEvent({arc, gameState, persons, textLog, materialName}:
              {arc: t.Arc,
               gameState: t.GameState,
               persons: t.Person[],
               textLog: string,
               materialName: string}): t.Event {
    const possibleThemes = this.themes.slice();

    for (const person of persons) {
      utils.extendThemesForPerson({themes: possibleThemes, person: person});
    }

    const themes = _.sampleSize(possibleThemes, 5);

    const challengeTypes = this.challenges.slice();

    for (const person of persons) {
      utils.addChallengeTypes({challengeTypes: challengeTypes, newChallengeTypes: person.challengeTypes});
    }

    return new t.Event({id: uuid.v4() as t.EventId,
                        arcId: arc.id,
                        eventFactoryId: this.id,
                        textLog: textLog,
                        materialName: materialName,
                        challengeTypes: challengeTypes,
                        materialThemes: themes});

  }
};


export class OrgWorkerVsPerson extends BaseEventFactory {
  readonly cause: string;
  readonly organizationId: t.OrganizationId;
  readonly logTemplate: string;
  readonly personFilter: (person: t.Person) => boolean;
  readonly effect: (args) => void;

  constructor({id, challenges, cause, organizationId, logTemplate, personFilter, themes, effect = null}:
              {id: t.EventFactoryId,
               challenges: t.ChallengeId[],
               cause: string,
               organizationId: t.OrganizationId,
               logTemplate: string,
               personFilter: (person: t.Person) => boolean,
               themes: t.MaterialTheme[],
               effect: (args) => void}) {
    super({id, challenges, themes});
    this.cause = cause;
    this.organizationId = organizationId;
    this.logTemplate = logTemplate;
    this.personFilter = personFilter;
    this.effect = effect;
  }

  apply({worker, arc, gameState}:
        {worker: t.Person,
         arc: t.Arc,
         gameState: t.GameState}): t.Event {

    const organization = gameState.organizations[this.organizationId];

    const person = choosePerson(gameState.persons,
                                (p: t.Person) => {
                                  return worker.id !== p.id && this.personFilter(p);
                                });

    if (person === null) {
      return null;
    }

    const textLog = this.logTemplate.replace("{worker}", worker.name).replace("{person}", person.name);

    const materialName = materials.nameOCWP({organization: organization.name,
                                             cause: this.cause,
                                             worker: worker.name,
                                             person: person.name});

    const event = this.createEvent({arc,
                                    gameState,
                                    persons: [worker, person],
                                    textLog,
                                    materialName});

    if (this.effect !== null) {
      this.effect({gameState, organization, worker, person});
    }

    return event;
  }
};


export class OrgWorker extends BaseEventFactory {
  readonly cause: string;
  readonly organizationId: t.OrganizationId;
  readonly logTemplate: string;

  constructor({id, challenges, cause, organizationId, logTemplate, themes}:
              {id: t.EventFactoryId,
               challenges: t.ChallengeId[],
               cause: string,
               organizationId: t.OrganizationId,
               logTemplate: string,
               themes: t.MaterialTheme[]}) {
    super({id, challenges, themes});
    this.cause = cause;
    this.organizationId = organizationId;
    this.logTemplate = logTemplate;
  }

  apply({worker, arc, gameState}:
        {worker: t.Person,
         arc: t.Arc,
         gameState: t.GameState}): t.Event {

    const organization = gameState.organizations[this.organizationId];

    const textLog = this.logTemplate.replace("{worker}", worker.name)

    const materialName = materials.nameOCW({organization: organization.name,
                                            cause: this.cause,
                                            worker: worker.name});

    return this.createEvent({arc,
                             gameState,
                             persons: [worker],
                             textLog,
                             materialName});
  }
};


const policeArrestDrunkDriver =  new OrgWorkerVsPerson({challenges: [challenges.policeReportAnalysis.id,
                                                                     challenges.roadCameraAnalysis.id,
                                                                     challenges.uncoverHiddenDetailsInPoliceReports.id,
                                                                     challenges.handlePoliceMisinformation.id],
                                                        themes: [],
                                                        personFilter: (p: t.Person) => hasStatement(p, a.drinker.id) && hasStatement(p, a.driver.id),
                                                        cause: "drunk-driving",
                                                        organizationId: a.policeDepartment.id,
                                                        logTemplate: "Officer {worker} arrested {person} for drunk driving"});

const policeAbuseOfAuthority =  new OrgWorkerVsPerson({challenges: [challenges.policeReportAnalysis.id,
                                                                    challenges.uncoverHiddenDetailsInPoliceReports.id,
                                                                    challenges.handlePoliceMisinformation.id],
                                                       themes: [],
                                                       personFilter: (person: t.Person) => true,
                                                       cause: "abuse-of-authority",
                                                       organizationId: a.policeDepartment.id,
                                                       logTemplate: "Officer {worker} arrested {person} for no reason"});

const policeShooting =  new OrgWorker({challenges: [challenges.policeReportAnalysis.id,
                                                    challenges.uncoverHiddenDetailsInPoliceReports.id,
                                                    challenges.handlePoliceMisinformation.id],
                                       themes: [],
                                       cause: "police-shooting",
                                       organizationId: a.policeDepartment.id,
                                       logTemplate: "Officer {worker} started shooting in the crowd"});

const policeKilledPerson = new OrgWorkerVsPerson({challenges: [],
                                                  themes: [],
                                                  personFilter: (person: t.Person) => true,
                                                  cause: "police-killed-person",
                                                  organizationId: a.policeDepartment.id,
                                                  logTemplate: "Officer {worker} killed {person}",
                                                  effect: ({gameState, organization, worker, person}) => {
                                                    person.kill();
                                                  },
                                                 });

const sermonAgainstWitchcraft = new OrgWorker({challenges: [],
                                               themes: [a.witch.id],
                                               cause: "sermon-against-witchcraft",
                                               organizationId: a.church.id,
                                               logTemplate: "Priest {worker} preached a sermon against witchcraft"});

const sermonAgainstWitch = new OrgWorkerVsPerson({challenges: [],
                                                  themes: [],
                                                  personFilter: (person: t.Person) => hasStatement(person, a.witch.id),
                                                  cause: "sermon-against-witch",
                                                  organizationId: a.church.id,
                                                  logTemplate: "Priest {worker} accused {person} of witchcraft"});

const witchBurned = new OrgWorkerVsPerson({challenges: [],
                                           themes: [],
                                           personFilter: (person: t.Person) => hasStatement(person, a.witch.id),
                                           cause: "witch-burning",
                                           organizationId: a.church.id,
                                           logTemplate: "Priest {worker} burned {person} as a witch",
                                           effect: ({gameState, organization, worker, person}) => {
                                             person.kill();
                                           },
                                          });


export const eventFactoriesList = [
  policeArrestDrunkDriver,
  policeAbuseOfAuthority,
  policeShooting,
  policeKilledPerson,
  sermonAgainstWitchcraft,
  sermonAgainstWitch,
  witchBurned,
];


export const eventFactories = {};

for (const factory of eventFactoriesList) {
  eventFactories[factory.id] = factory;
}


////////////////////////
// arc factories
////////////////////////

// TODO: now points are increased to speed up the development process
const onStepPoints = 10;
const onPublicationPoints = 25;

// We attach every event factory/trigger to an arc because we want to every event to be part of a story — be meaningful.
// If we allow to trigger events without arcs (it is possible) it could lead to a situation
// where events are not connected to each other and the story is not coherent.

export const policeOfficerBreakdown = new t.ArcFactory({
  id: "1" as t.ArcId,
  name: "police officer breakdown",
  steps: ['normal_work', 'stressed_work', 'breakdown'],
  actors: ['policeOfficer'],
  triggers: {'normal_work': [new t.ArcTrigger({eventFactoryId: policeArrestDrunkDriver.id,
                                               actors: {policeOfficer: 'worker'}})],
             'stressed_work': [new t.ArcTrigger({eventFactoryId: policeAbuseOfAuthority.id,
                                                 actors: {policeOfficer: 'worker'}})],
             'breakdown': [new t.ArcTrigger({eventFactoryId: policeShooting.id,
                                             actors: {policeOfficer: 'worker'}}),
                           new t.ArcTrigger({eventFactoryId: policeKilledPerson.id,
                                             actors: {policeOfficer: 'worker'}})]},

  onStep: function({arc, gameState}: {arc: t.Arc, gameState: t.GameState}): void {
    const officer = gameState.persons[arc.actors['policeOfficer']];

    for (const topicSummary of gameState.topicsSummary) {
      if (topicSummary.isPositive()) {
        continue;
      }

      if (topicSummary.themes.includes(a.policeDepartment.id)) {
        arc.points += onStepPoints;
        break;
      }

      if (topicSummary.themes.includes(officer.id)) {
        arc.points += onStepPoints;
        break;
      }

      if (topicSummary.themes.includes(a.policeOfficer.id)) {
        arc.points += onStepPoints;
        break;
      }
    }
  },

  onPublication: function({arc, gameState, opinions}: {arc: t.Arc, gameState: t.GameState, opinions: t.TopicOpinion[]}): void {
    const officer = gameState.persons[arc.actors['policeOfficer']];

    for (const opinion of opinions) {
      if (opinion.personId != officer.id) {
        continue;
      }

      // this condition will react on any negative opinion, related to officer
      if (opinion.topic.isNegative()) {
        arc.points += onPublicationPoints;
        break;
      }
    }
  }
});


export const bornOfWitchHunter = new t.ArcFactory({
  id: "2" as t.ArcId,
  name: "born of witch hunter",
  steps: ['preacher', 'inquisitor', 'witch_hunter'],
  actors: ['priest'],
  triggers: {'preacher': [new t.ArcTrigger({eventFactoryId: sermonAgainstWitchcraft.id,
                                            actors: {priest: 'worker'}})],
             'inquisitor': [new t.ArcTrigger({eventFactoryId: sermonAgainstWitch.id,
                                              actors: {priest: 'worker'}})],
             'witch_hunter': [new t.ArcTrigger({eventFactoryId: witchBurned.id,
                                                actors: {priest: 'worker'}})]},

  onStep: function({arc, gameState}: {arc: t.Arc, gameState: t.GameState}): void {

    const witchTopics = gameState.topicsSummary.filter(topicSummary => _.isEqual(topicSummary.themes, [a.witch.id]))

    if (witchTopics.length == 0) {
      return;
    }

    if (witchTopics[0].isNegative()) {
      arc.points += onStepPoints;
    }
  },

  onPublication: function({arc, gameState, opinions}: {arc: t.Arc, gameState: t.GameState, opinions: t.TopicOpinion[]}): void {
    for (const opinion of opinions) {
      // this condition will react on any negative opinion, related to officer
      if (opinion.topic.themes.includes(a.witch.id)) {
        arc.points += onPublicationPoints;
        break;
      }
    }
  }
});


const arcFactoriesList = [policeOfficerBreakdown, bornOfWitchHunter];

export const arcFactories = {};

for (const factory of arcFactoriesList) {
  arcFactories[factory.id] = factory;
}


//////////////////////////////
// arcs
/////////////////////////////


function createArc({id, factory, actors}:
                   {id: t.ArcId,
                    factory: t.ArcFactory,
                    actors: {[key: string]: PersonId|OrganizationId}}): t.Arc {
  for (const actor of factory.actors) {
    if (!(actor in actors)) {
      throw new Error(`Actor ${actor} is missing`);
    }
  }

  for (const actor of Object.keys(actors)) {
    if (!factory.actors.includes(actor)) {
      throw new Error(`Actor ${actor} is not allowed`);
    }
  }

  return new t.Arc({id: id,
                    factoryId: factory.id,
                    actors: actors,
                    step: factory.steps[0]});
}


export const predefinedArcs = [
  createArc({id: "1" as t.ArcId,
             factory: policeOfficerBreakdown,
             actors: {policeOfficer: a.bob.id}}),
  createArc({id: "2" as t.ArcId,
              factory: bornOfWitchHunter,
              actors: {priest: a.constantine.id}}),
];
