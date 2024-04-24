import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import * as _ from "lodash";
import * as uuid from 'uuid';

import * as s from "@/logic/statements";
import * as t from "@/logic/types";
import * as a from "@/logic/actors";
import * as stories from "@/logic/stories";
import * as challenges from "@/logic/challenges";
import * as gameTime from "@/logic/gameTime";
import {createChallenges} from "@/logic/challenges";


type infoMode = {
  mode: string;
  objectId: t.PersonId | t.OrganizationId | t.EventId | t.InvestigationId | null;
}


export const useGameStore = defineStore('game', () => {

  // game time
  const logicTime = ref<gameTime.GameTime>(new gameTime.GameTime());

  // statements
  const statements = ref<{[key: t.StatementId]: t.Statement}>({});

  for (const statement of a.predefinedStatements) {
    statements.value[statement.id] = statement;
  }

  // organizations
  const organizations = ref<{[key: t.OrganizationId]: t.Organization}>({});

  for (const organization of a.predefinedOrganizations) {
    organizations.value[organization.id] = organization;
  }

  // persons
  const persons = ref<{[key: t.PersonId]: t.Person}>({});

  for (const person of a.predefinedPersons) {
    person.initialize({organizations: organizations.value});
    persons.value[person.id] = person;
  }

  const totalCitizens = computed(() => {
    let total = 0;

    for (const person of Object.values(persons.value)) {
      total += person.followers();
    }

    return total;
  });

  // arc factories

  const arcFactories = stories.arcFactories;

  // arcs

  const arcs = ref<{[key: t.ArcId]: t.Arc}>({});

  for (const arc of stories.predefinedArcs) {
    arcs.value[arc.id] = arc;
  }

  // challenges

  const challengeTypes = ref<{[key: t.ChallengeId]: t.Challenge}>({});

  for (const challengeTypeId in challenges.challengeTypes) {
    const challengeType = challenges.challengeTypes[challengeTypeId];
    challengeTypes.value[challengeType.id] = challengeType;
  }

  // info mode
  const infoMode = ref<infoMode>({mode: "none", objectId: null});

  function selectNone() {
    infoMode.value = {mode: "none", objectId: null};
  }

  function selectPerson(personId: t.PersonId) {
    infoMode.value = {mode: "person", objectId: personId};
  }

  function selectOrganization(organizationId: t.OrganizationId) {
    infoMode.value = {mode: "organization", objectId: organizationId};
  }

  function selectEvent(eventId: t.EventId) {
    infoMode.value = {mode: "event", objectId: eventId};
  }

  function selectInvestigation(investigationId: t.InvestigationId) {
    infoMode.value = {mode: "investigation", objectId: investigationId};
  }

  // events
  const eventsLog = ref<t.EventId[]>([]);
  const events = ref<{[key: t.EventId]: t.Event}>({});

  function addEvent(event: t.Event) {
    events.value[event.id] = event;
    eventsLog.value.push(event.id);
  }

  function hasEvents() {
    return eventsLog.value.length > 0;
  }

  function nextEvent() {
    const arcCandidates = Object.values(arcs.value);

    const arc = _.sample(arcCandidates);

    const factory = arcFactories[arc.factoryId];

    const triggers = factory.triggers[arc.step];

    const trigger = _.sample(triggers);

    const eventFabricArguments = trigger.prepareMapping({arc: arc,
                                                         gameState: this});

    const event = stories.eventFactories[trigger.eventFactoryId].apply(eventFabricArguments);

    if (event == null) {
      return;
    }

    addEvent(event);
  }

  // investigations
  const investigations = ref<{[key: t.InvestigationId]: t.Investigation}>({});

  function canCreateInvestigation() {
    return freeWorkersIds.value.length > 0;
  }

  function createInvestigation({eventId}: {eventId: t.EventId}) {

    const event = events.value[eventId];

    const investigation = new t.Investigation({
      id: uuid.v4(),
      name: event.textLog,
      materialName: event.materialName,
      materialThemes: event.materialThemes,
      eventId: eventId,
      // TODO: calculate number (complexity?) of challenges from properties of event/entities
      challenges: createChallenges({number: 5, challengeTypeIds: event.challengeTypes}),
      startedAt: logicTime.value.clone(),
    });

    addInvestigation(investigation);
  }

  function hasInvestigations() {
    return Object.keys(investigations.value).length > 0;
  }

  function addInvestigation(investigation: t.Investigation) {
    investigations.value[investigation.id] = investigation;
    events.value[investigation.eventId].investigationId = investigation.id;
  }

  function removeInvestigation(investigationId: t.InvestigationId) {
    delete investigations.value[investigationId];

    if (infoMode.value.mode == "investigation" && infoMode.value.objectId == investigationId) {
      selectNone();
    }
  }

  function investigationsStep() {
    for (const investigation of Object.values(investigations.value)) {
      investigation.step({gameState: this});
    }
  }

  function assigneWorker(investigationId: t.InvestigationId, personId: t.PersonId) {
    if (!workersIds.value.includes(personId)) {
      throw new Error(`Person ${personId} is not a worker`);
    }

    for (const investigation of Object.values(investigations.value)) {
      investigation.removeParticipant(personId);
    }

    investigations.value[investigationId].addParticipant(personId);
  }

  function unasigneWorker(personId: t.PersonId) {
    for (const investigation of Object.values(investigations.value)) {
      investigation.removeParticipant(personId);
    }
  }

  function startInvestigation(investigationId: t.InvestigationId) {
    investigations.value[investigationId].Start();
  }

  function completeInvestigation(investigationId: t.InvestigationId) {
    const investigation = investigations.value[investigationId];

    const possibleConnotations = Object.keys(t.MaterialThemeConnotation);

    const themesConnotations = {};

    for (const theme of investigation.materialThemes) {
      const connotation = _.sample(possibleConnotations);
      themesConnotations[theme] = connotation;
    }

    function nonNeutralThemes() {
      return Object.keys(themesConnotations).filter((theme) => themesConnotations[theme] != t.MaterialThemeConnotation.neutral);
    }

    // ensure there are no more then 3 themes with non-neutral connotations
    while (nonNeutralThemes().length > 3) {
      const themesToChange = nonNeutralThemes();
      const theme = _.sample(themesToChange);
      themesConnotations[theme] = t.MaterialThemeConnotation.neutral;
    }

    const material = new t.Material({id: uuid.v4() as t.MaterialId,
                                     number: materialsNumber.value,
                                     name: investigation.materialName,
                                     themesConnotations: themesConnotations,
                                     maxChangePoints: investigation.points,
                                     gameState: this});
    addMaterial(material);
    removeInvestigation(investigationId);

    const participantNames = [];

    for (const participantId of investigation.participants) {
      participantNames.push(persons.value[participantId].name);
    }

    const participantsString = participantNames.join(", ");


    const event = new t.Event({id: uuid.v4() as t.EventId,
                               arcId: null,
                               eventFactoryId: null,
                               textLog: `${participantsString} completed investigation.`,
                               materialName: null,
                               challengeTypes: [],
                               materialThemes: [],
                               decorative: true});

    addEvent(event);
  }

  function cancelInvestigation(investigationId: t.InvestigationId) {
    removeInvestigation(investigationId);
    for (const event of Object.values(events.value)) {
      if (event.investigationId === investigationId) {
        event.investigationId = null;
      }
    }
  }

  function autocompleteInvestigations() {
    for (const investigation of Object.values(investigations.value)) {
      if (investigation.isCompleted()) {
        this.completeInvestigation(investigation.id);
      }
    }
  }

  // materials

  const materials = ref<{[key: t.MaterialId]: t.Material}>({});
  const materialsNumber = ref<number>(1);
  const choosenMaterialId = ref<t.MaterialId | null>(null);

  function addMaterial(material: t.Material) {
    materials.value[material.id] = material;
    materialsNumber.value += 1;
  }

  function removeMaterial(materialId: t.MaterialId) {
    delete materials.value[materialId];
  }

  function hasMaterials() {
    return Object.keys(materials.value).length > 0;
  }

  function finishMaterial(materialId: t.MaterialId) {
    materials.value[materialId].finished = true;
  }

  function chooseMaterial(materialId: t.MaterialId) {
    choosenMaterialId.value = materialId;
  }

  function autoremoveFullyPublishedMaterials() {
    for (const materialId of Object.keys(materials.value)) {
      if (materials.value[materialId].fullyPublished()) {
        removeMaterial(materialId);
      }
    }
  }

  // opinions

  const shownOpinion = ref<t.TopicOpinion|null>(null);

  function hideOpinion() {
    shownOpinion.value = null;
  }

  function showOpinion({opinions}: {opinions: t.TopicOpinion[]}) {
    shownOpinion.value = _.sample(opinions);
  }

  // media

  function distributeTopics({topics}: {topics: t.Topic[]}) {
    if (topics.length == 0) {
      return;
    }

    for (const person of Object.values(persons.value)) {
      const topic = _.sample(topics);
      person.memoryTopic(topic.clone());
    }
  }

  const twitter = new t.MediaTwitter({});
  const newspaper = new t.MediaNewspaper({});

  function publishMaterial({materialId, hotness, media}: {materialId: t.MaterialId, hotness: number, media: t.MediaType}) {
    if (materialId == 'b-story') {
      return [];
    }

    const material = materials.value[materialId];
    material.publishIn(media);
    const topics = material.topics({hotness: hotness});
    distributeTopics({topics: topics});

    const opinions = [];

    for (const person of Object.values(persons.value)) {
      opinions.push(...person.opinionsOnTopics({topics: topics}));
    }

    return opinions;
  }

  function publishInTwitter({materialId}: {materialId: t.MaterialId}) {
    const opinions = publishMaterial({materialId: materialId,
                                      media: t.MediaType.twitter,
                                      hotness: 2});

    twitter.postsCount += 1;
    logicTime.value.markTwitted();

    this.autoremoveFullyPublishedMaterials();

    showOpinion({opinions: opinions});

    for (const arc of Object.values(arcs.value)) {
      arc.onPublication({gameState: this, opinions: opinions});
    }
  }

  function _publishNewspaperPage({materialIds, hotness}: {materialIds: t.MaterialId[], hotness: number}) {
    let opinions = [];

    for (const materialId of materialIds) {
      const newOpinions = publishMaterial({materialId: materialId,
                                           media: t.MediaType.newspaper,
                                           hotness: hotness});
      opinions.push(...newOpinions);
    }

    return opinions;
  }

  function publishInNewspaper({firstPage, secondPage, thirdPage}:
                              {firstPage: t.MaterialId[], secondPage: t.MaterialId[]}) {
    const opinions1 = _publishNewspaperPage({materialIds: firstPage, hotness: 10});
    const opinions2 = _publishNewspaperPage({materialIds: secondPage, hotness: 5});

    newspaper.releasesCount += 1;
    logicTime.value.markNewspaperReleased();
    this.autoremoveFullyPublishedMaterials();

    const opinions = opinions1.concat(opinions2);

    showOpinion({opinions: opinions});

    for (const arc of Object.values(arcs.value)) {
      arc.onPublication({gameState: this, opinions: opinions});
    }
  }

  // topics

  const topicsSummary = computed(() => {
    const topics = {};

    for (const person of Object.values(persons.value)) {
      for (const topic of person.memory) {
        if (!(topic.id in topics)) {
          topics[topic.id] = new t.TopicSummary({themes: topic.themes});
        }

        topics[topic.id].update({topic: topic, person: person});
      }
    }

    const topicsList = [];

    for (const topic of Object.values(topics)) {
      topicsList.push(topic);
    }

    topicsList.sort((a, b) => b.nonNeutralPersons() - a.nonNeutralPersons());

    return topicsList;
  });

  // utils

  const workersIds = computed(() => {
    const _workers = [];

    for (const person of Object.values(persons.value)) {
      if (!person.isAlive) {
        continue;
      }

      if (person.employeeRoles[a.playerAgency.id] == 'journalist') {
        _workers.push(person);
      }
    }

    _workers.sort((a, b) => a.name.localeCompare(b.name));

    return _workers.map((worker) => worker.id);
  });

  const freeWorkersIds = computed(() => {
    const _workers = [];

    for (const personId of workersIds.value) {
      let isBusy = false;

      for (const investigation of Object.values(investigations.value)) {
        if (investigation.participants.includes(personId)) {
          isBusy = true;
          break;
        }
      }

      if (!isBusy) {
        _workers.push(personId);
      }

    }

    return _workers;
  });

  function gameStep() {

    if (!logicTime.value.stepAllowed()) {
      throw new Error("Game step is not allowed");
    }

    logicTime.value.step();

    this.nextEvent();
    this.investigationsStep();

    for (const person of Object.values(persons.value)) {
      person.forgettingStep();
    }

    this.autocompleteInvestigations();

    shownOpinion.value = null;

    for (const arc of Object.values(arcs.value)) {
      arc.onStep({gameState: this});
    }
  }

  return { logicTime,

           statements,

           persons,
           totalCitizens,

           arcFactories,

           arcs,

           challengeTypes,

           selectPerson,
           selectOrganization,
           selectEvent,
           selectInvestigation,

           infoMode,

           eventsLog,
           events,
           addEvent,
           hasEvents,
           nextEvent,

           organizations,

           investigations,
           canCreateInvestigation,
           createInvestigation,
           hasInvestigations,
           addInvestigation,
           removeInvestigation,
           investigationsStep,
           assigneWorker,
           unasigneWorker,
           startInvestigation,
           completeInvestigation,
           cancelInvestigation,
           autocompleteInvestigations,

           shownOpinion,
           hideOpinion,

           materials,
           addMaterial,
           removeMaterial,
           hasMaterials,
           finishMaterial,
           chooseMaterial,
           choosenMaterialId,
           autoremoveFullyPublishedMaterials,

           twitter,
           newspaper,
           publishInTwitter,
           publishInNewspaper,

           topicsSummary,

           workersIds,
           freeWorkersIds,
           gameStep};
});
