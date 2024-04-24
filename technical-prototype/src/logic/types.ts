import * as uuid from 'uuid';
import * as _ from "lodash";
import * as captions from "@/logic/captions";
import * as gameTime from "@/logic/gameTime";

export type StatementId = string & {readonly __brand: unique symbol};
export type PersonId = string & {readonly __brand: unique symbol};
export type EventId = string & {readonly __brand: unique symbol};
export type EventFactoryId = string & {readonly __brand: unique symbol};
export type OrganizationId = string & {readonly __brand: unique symbol};
export type InvestigationId = string & {readonly __brand: unique symbol};
export type ChallengeTypeId = string & {readonly __brand: unique symbol};
export type ChallengeId = string & {readonly __brand: unique symbol};
export type MaterialId = string & {readonly __brand: unique symbol};
export type ArcFactoryId = string & {readonly __brand: unique symbol};
export type ArcId = string & {readonly __brand: unique symbol};
export type EventFactoryId = string & {readonly __brand: unique symbol};
export type TopicId = string & {readonly __brand: unique symbol};

export type MaterialTheme = PersonId | OrganizationId | StatementId;

export function isPersonId(id: string): id is PersonId {
  return id.startsWith("person#");
}

export function isOrganizationId(id: string): id is OrganizationId {
  return id.startsWith("organization#");
}

export function isStatementId(id: string): id is StatementId {
  return id.startsWith("statement#");
}

export function isTopicId(id: string): id is TopicId {
  return id.startsWith("topic#");
}


export class ChallengeType {
  readonly id: ChallengeTypeId;
  readonly name: string;
  readonly attribute: PersonAttribute;
  // TODO: bonuses and penalties for special skills & knowledges

  constructor({name, attribute}: {name: string, attribute: PersonAttribute}) {
    this.id = `challenge-type#${uuid.v4()}` as ChallengeTypeId;
    this.name = name;
    this.attribute = attribute;
  }
};


export class Statement {
  readonly id: StatementId;
  readonly challengeTypes: ChallengeTypeId[];

  constructor({challengeTypes, personAttributes}: {challengeTypes: ChallengeTypeId[], personAttributes: {[key: PersonAttribute]: number}}) {
    this.id = `statement#${uuid.v4()}` as StatementId;
    this.challengeTypes = challengeTypes;
    this.personAttributes = personAttributes;
  }

  apply({person, organizations}: {person: Person, organizations: {[key: OrganizationId]: Organization}}): void {
    throw new Error("Not implemented");
  }

  name({gameState}: {gameState: GameState}): string {
    throw new Error("Not implemented");
  }

  themes(): MaterialTheme[] {
    return [this.id];
  }
};


enum PersonAttribute {
  // mind
  logic = "logic",
  awareness = "awareness",
  knowledge = "knowledge",
  divination = "divination",

  // spirit
  empathy = "empathy",
  charisma = "charisma",
  willpower = "willpower",
  sensitivity = "sensitivity",

  // body
  agility = "agility",
  endurance = "endurance",
  strength = "strength",
  witchery = "witchery"
};


export class Person {
  readonly id: PersonId;
  readonly name: string;
  readonly color: string;
  readonly followersMultiplier: number;
  readonly employeeOf: OrganizationId[];
  readonly employeeRoles: {[key: OrganizationId]: string};
  readonly statements: Statement[];
  readonly challengeTypes: ChallengeTypeId[];
  readonly attributes: {[key: PersonAttribute]: number};
  isAlive: boolean;

  memory: Topic[];

  constructor({
    id,
    name,
    color,
    statements
  }: {
    id: PersonId;
    name: string;
    color: string;
    statements: Statement[];
  }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.employeeOf = [];
    this.employeeRoles = {};
    this.followersMultiplier = 1;
    this.challengeTypes = [];
    this.statements = statements;
    this.attributes = {};
    this.memory = [];
    this.isAlive = true;

    for (const attribute of Object.keys(PersonAttribute)) {
      this.attributes[attribute] = 0;
    }
  }

  initialize({organizations}: {organizations: {[key: OrganizationId]: Organization}}) {
    for (const statement of this.statements) {
      statement.apply({person: this, organizations: organizations});
    }

    if (this.followersMultiplier < 0) {
      this.followersMultiplier = 0;
    }
  }

  actualColor() {
    return this.isAlive ? this.color : "#888";
  }

  kill() {
    this.isAlive = false;
  }

  memoryTopic(topic: Topic) {
    for (const t of this.memory) {
      if (t.id !== topic.id) {
        continue;
      }

      t.update(topic);
      return;
    }

    this.memory.push(topic);
    this.memory.sort((a, b) => a.hotness - b.hotness);

    if (this.memory.length > 5) {
      this.memory.shift();
    }
  }

  forgettingStep() {
    if (this.memory.length === 0) {
      return;
    }

    const hotnessDelta = 0.1;
    const opinionMultiplier = 0.01;

    for (let topic of this.memory) {
      topic.hotness -= hotnessDelta;
      topic.positivePoints -= opinionMultiplier * topic.positivePoints;
      topic.negativePoints -= opinionMultiplier * topic.negativePoints;
    }

    const opinionBorder = 0.1;

    this.memory = this.memory.filter((topic) => topic.hotness > hotnessDelta);
    this.memory = this.memory.filter((topic) => topic.positivePoints > opinionBorder || topic.negativePoints > opinionBorder);
  }

  followers() {
    return Math.ceil(this.followersMultiplier * 1000);
  }

  isThemeRelated(theme: MaterialTheme) {
    if (isPersonId(theme)) {
      return theme === this.id;
    }

    for (const statement of this.statements) {
      if (statement.themes().includes(theme)) {
        return true;
      }
    }
  }

  opinionsOnTopics({topics}: {topics: Topic[]}): TopicOpinion[] {
    const opinions = [];

    for (const topic of topics) {
      if (!topic.themes.every((theme) => this.isThemeRelated(theme))) {
        continue;
      }

      opinions.push(new TopicOpinion({topic: topic,
                                      personId: this.id}));
    }

    return opinions;
  }

};


export class Event {
  readonly id: EventId;
  readonly arcId: ArcId;
  readonly eventFactoryId: EventFactoryId;
  readonly textLog: string;
  readonly materialName: string;
  readonly challengeTypes: ChallengeTypeId[];
  readonly materialThemes: MaterialTheme[];
  readonly decorative: boolean;

  investigationId: InvestigationId| null;

  constructor({
    id,
    arcId,
    eventFactoryId,
    textLog,
    materialName,
    challengeTypes,
    materialThemes,
    decorative = false
  }: {
    id: EventId;
    arcId: ArcId;
    eventFactoryId: EventFactoryId;
    textLog: string;
    materialName: string;
    challengeTypes: ChallengeTypeId[];
    materialThemes: MaterialTheme[];
    decorative?: boolean;
  }) {
    this.id = id;
    this.arcId = arcId;
    this.eventFactoryId = eventFactoryId;
    this.textLog = textLog;
    this.materialName = materialName;
    this.investigationId = null;
    this.challengeTypes = challengeTypes;
    this.materialThemes = materialThemes;
    this.decorative = decorative;
  }

  hasInvestigation() {
    return this.investigationId !== null;
  }
};


export class Organization {
  readonly id: OrganizationId;
  readonly name: string;
  readonly color: string;
  readonly challengeTypes: ChallengeTypeId[];

  constructor({
    id,
    name,
    color,
    challengeTypes
  }: {
    id: OrganizationId;
    name: string;
    color: string;
    challengeTypes: ChallengeTypeId[];
  }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.challengeTypes = challengeTypes;
  }
};


export class Challenge {
  readonly challengeTypeId: ChallengeTypeId;
  readonly id: ChallengeId;
  readonly name: string;
  readonly attribute: PersonAttribute;
  successed: boolean|null;


  constructor({challengeTypeId, name, attribute}: {challengeTypeId: ChallengeTypeId, name: string, attribute: PersonAttribute}) {
    this.id = `challenge#${uuid.v4()}` as ChallengeId;
    this.challengeTypeId = challengeTypeId;
    this.name = name;
    this.attribute = attribute;
    this.successed = null;
  }

  successChance({persons}: {persons: Person[]}) {
    let teamAttribute = 0;

    for (const person of persons) {
      teamAttribute += person.attributes[this.attribute];
    }

    return Math.max(0, Math.min(10, 5 + teamAttribute)) / 10;
  }
};


enum InvestigationState {
  notStarted = "not_started",
  inProgress = "in_progress",
  completed = "completed",
};


export class Investigation {
  readonly id: InvestigationId;
  readonly name: string;
  readonly materialName: string;
  readonly materialThemes: MaterialTheme[];

  readonly maxParticipants: number;
  participants: PersonId[];
  challenges: Challenge[];

  pointer: number;
  state: InvestigationState;
  points: number;

  readonly startedAt: gameTime.GameTime;

  constructor({
    id,
    name,
    materialName,
    materialThemes,
    eventId,
    challenges,
    startedAt
  }: {
    id: InvestigationId;
    name: string;
    materialName: string;
    materialThemes: MaterialTheme[];
    eventId: EventId;
    maxParticipants: number;
    challenges: Challenge[];
    startedAt: gameTime.GameTime;
    }) {
    this.id = id;
    this.name = name;
    this.materialName = materialName;
    this.materialThemes = materialThemes;
    this.eventId = eventId;
    this.participants = [];
    this.challenges = challenges;
    this.pointer = 0;
    this.state = InvestigationState.notStarted;
    this.points = 0;
    this.startedAt = startedAt;
  }

  step({gameState}: {gameState: GameState}) {
    if (this.state === InvestigationState.notStarted) {
      return;
    }

    const challenge = this.challenges[this.pointer];

    const participants = this.participants.map((personId) => gameState.persons[personId]);

    if (!challenge) {
      console.log("No more challenges");
    }

    const challengeProbability = challenge.successChance({persons: participants});

    const success = Math.random() < challengeProbability;

    challenge.successed = success;

    if (success) {
      this.points++;
    }

    this.pointer++;

    if (this.pointer === this.challenges.length) {
      this.Complete();
    }

  }

  canBeCanceled() {
    return this.state === InvestigationState.notStarted;
  }

  canBeStarted() {
    if (this.state !== InvestigationState.notStarted) {
      return false;
    }

    return this.participants.length > 0;
  }

  Start() {
    if (!this.canBeStarted()) {
      throw new Error("Investigation can't be started");
    }

    this.state = InvestigationState.inProgress;
  }

  Complete() {
    if (this.state !== InvestigationState.inProgress) {
      throw new Error("Investigation is not in progress");
    }

    this.state = InvestigationState.completed;
  }

  isCompleted() {
    return this.state === InvestigationState.completed;
  }

  isStarted() {
    return this.state === InvestigationState.inProgress;
  }

  isNotStarted() {
    return this.state === InvestigationState.notStarted;
  }

  removeParticipant(personId: PersonId) {
    this.participants = this.participants.filter((p) => p !== personId);
  }

  addParticipant(personId: PersonId) {
    if (this.participants.includes(personId)) {
      throw new Error(`Person ${personId} is already a participant`);
    }
    this.participants.push(personId);
  }
};


export enum MediaType {
  twitter = "twitter",
  newspaper = "newspaper",
};


// TODO: now there are only 3 connotations but there could be more
//       with complex logic of transitions between them,
export enum MaterialThemeConnotation {
  negative = "negative",
  neutral = "neutral",
  positive = "positive",
};


export class Material {
  readonly id: MaterialId;
  readonly number: number;
  readonly name: string;
  readonly themesConnotations: {[key: MaterialTheme]: MaterialThemeConnotation};
  readonly originalThemesConnotations: {[key: MaterialTheme]: MaterialThemeConnotation};
  readonly maxChangePoints: number;
  finished: boolean;
  caption: string;

  publishedIn: MediaType[];

  constructor({
    id,
    number,
    name,
    themesConnotations,
    maxChangePoints,
    gameState
  }: {
    id: MaterialId;
    number: number,
    name: string;
    themesConnotations: {[key: MaterialTheme]: MaterialThemeConnotation};
    maxChangePoints: number;
    gameState: GameState;
  }) {
    this.id = id;
    this.number = number;
    this.name = name;
    this.publishedIn = [];
    this.themesConnotations = themesConnotations;
    this.originalThemesConnotations = {...themesConnotations};
    this.maxChangePoints = maxChangePoints;
    this.finished = false;
    this.caption = captions.caption({themes: this.themesConnotations,
                                     gameState: gameState});
  }

  fullyPublished() {
    for (const media of Object.values(MediaType)) {
      if (!this.publishedIn.includes(media)) {
        return false;
      }
    }

    return true;
  }

  publishIn(mediaType: MediaType) {
    if (this.publishedIn.includes(mediaType)) {
      throw new Error(`Material is already published in ${mediaType}`);
    }

    this.publishedIn.push(mediaType);
  }

  isPublishedInTwitter() {
    return this.publishedIn.includes(MediaType.twitter);
  }

  isPublishedInNewspaper() {
    return this.publishedIn.includes(MediaType.newspaper);
  }

  pointsUsed(connotations: {[key: MaterialTheme]: MaterialThemeConnotation}) {
    let pointsUsed = 0;

    // compare if keys in connotations and originalThemesConnotations are the same

    if (!_.isEqual(Object.keys(connotations).sort(), Object.keys(this.originalThemesConnotations).sort())) {
      throw new Error("Themes connotations are not the same");
    }

    for (const theme in connotations) {
      if (connotations[theme] == this.originalThemesConnotations[theme]) {
        continue;
      }

      if (connotations[theme] == MaterialThemeConnotation.neutral) {
        pointsUsed += 1;
        continue;
      }

      if (this.originalThemesConnotations[theme] == MaterialThemeConnotation.neutral) {
        pointsUsed += 1;
        continue;
      }

      pointsUsed += 2;
    }

    return pointsUsed;
  }

  pointsLeft() {
    return this.maxChangePoints - this.pointsUsed(this.themesConnotations);
  }

  canLower(theme: MaterialTheme) {
    if (this.themesConnotations[theme] === MaterialThemeConnotation.negative) {
      return false;
    }

    const updatedConnotations = {...this.themesConnotations};
    this.lowerFor({connotations: updatedConnotations, theme: theme});

    if (this.pointsUsed(updatedConnotations) > this.maxChangePoints) {
      return false;
    }

    return true;
  }

  canRaise(theme: MaterialTheme) {
    if (this.themesConnotations[theme] === MaterialThemeConnotation.positive) {
      return false;
    }

    const updatedConnotations = {...this.themesConnotations};
    this.raiseFor({connotations: updatedConnotations, theme: theme});

    if (this.pointsUsed(updatedConnotations) > this.maxChangePoints) {
      return false;
    }

    return true;
  }

  raiseFor({connotations, theme}: {connotations: {[key: MaterialTheme]: MaterialThemeConnotation}, theme: MaterialTheme}) {
    if (connotations[theme] == MaterialThemeConnotation.negative) {
      connotations[theme] = MaterialThemeConnotation.neutral;
      return;
    }

    if (connotations[theme] == MaterialThemeConnotation.neutral) {
      connotations[theme] = MaterialThemeConnotation.positive;
      return;
    }
  }

  lowerFor({connotations, theme}: {connotations: {[key: MaterialTheme]: MaterialThemeConnotation}, theme: MaterialTheme}) {
    if (connotations[theme] == MaterialThemeConnotation.positive) {
      connotations[theme] = MaterialThemeConnotation.neutral;
      return;
    }

    if (connotations[theme] == MaterialThemeConnotation.neutral) {
      connotations[theme] = MaterialThemeConnotation.negative;
      return;
    }
  }

  raise(gameState: GameState, theme: MaterialTheme) {
    this.raiseFor({connotations: this.themesConnotations, theme: theme});
    this.caption = captions.caption({themes: this.themesConnotations,
                                     gameState: gameState});
  }

  lower(gameState: GameState, theme: MaterialTheme) {
    this.lowerFor({connotations: this.themesConnotations, theme: theme});
    this.caption = captions.caption({themes: this.themesConnotations,
                                     gameState: gameState});
  }

  isChanged(theme: MaterialTheme) {
    return this.themesConnotations[theme] !== this.originalThemesConnotations[theme];
  }

  canBeFinished() {
    // number of non-neural themes max be <= 3

    let nonNeutralThemes = 0;

    for (const theme in this.themesConnotations) {
      if (this.themesConnotations[theme] !== MaterialThemeConnotation.neutral) {
        nonNeutralThemes++;
      }
    }

    return nonNeutralThemes <= 3;
  }


  topics({hotness}: {hotness: number}) {
    if (!this.finished) {
      throw new Error("Material is not finished");
    }

    const topics = [];

    for (const theme1 in this.themesConnotations) {
      if (this.themesConnotations[theme1] === MaterialThemeConnotation.neutral) {
        continue;
      }

      topics.push(constructTopic({themes: [theme1],
                                  hotness: hotness,
                                  connation: this.themesConnotations[theme1]}));

      for (const theme2 in this.themesConnotations) {
        if (theme1 === theme2) {
          continue;
        }

        if (this.themesConnotations[theme2] === MaterialThemeConnotation.neutral) {
          continue;
        }

        if (this.themesConnotations[theme1] !== this.themesConnotations[theme2]) {
          continue;
        }

        topics.push(constructTopic({themes: [theme1, theme2],
                                    hotness: hotness,
                                    connation: this.themesConnotations[theme1]}));
      }
    }

    return topics;
  }

};


export class MediaTwitter {
  postsCount: number;

  constructor({}) {
    this.postsCount = 0;
  }
};


export class MediaNewspaper {
  releasesCount: number;

  constructor({}) {
    this.releasesCount = 0;
  }

};


export class EventFactory {
  readonly id: EventFactoryId;

  constructor() {
    this.id = `event-factory#${uuid.v4()}` as EventFactoryId;
  }

  apply(args) {
    throw new Error("Not implemented");
  }
};


export class ArcTrigger {
  readonly eventFactoryId: EventFactoryId;
  readonly actors: {[key: string]: string};

  constructor({
    eventFactoryId,
    actors
  }: {
    eventFactoryId: EventFactoryId;
    actors: {[key: string]: string};
  }) {
    this.eventFactoryId = eventFactoryId;
    this.actors = actors;
  }

  prepareMapping({arc, gameState}) {
    const mapping = {arc: arc,
                     gameState: gameState};

    for (const arcActor in this.actors) {
      const actorId = arc.actors[arcActor];

      if (isPersonId(actorId)) {
        mapping[this.actors[arcActor]] = gameState.persons[actorId];
      }
      else if (isOrganizationId(actorId)) {
        mapping[this.actors[arcActor]] = gameState.organizations[actorId];
      }
      else {
        throw new Error(`Unknown actor id: ${actorId}`);
      }
    }

    return mapping;
  }
};


export class ArcFactory {
  readonly id: ArcFactoryId;
  readonly name: string;
  readonly steps: string[];
  readonly currentStep: number;
  readonly actors: string[];
  readonly triggers: ArcTrigger[];
  readonly pointsToStep: number;

  // callbacks
  readonly _onStep: ({arc, gameState}: {arc: Arc, gameState: GameState}) => void | null;
  readonly _onPublication: ({arc, gameState, opinions}: {arc: Arc, gameState: GameState, opinions: TopicOpinion[]}) => void | null;

  constructor({
    id,
    name,
    steps,
    actors,
    triggers,
    onStep,
    onPublication
  }: {
    id: ArcId;
    name: string;
    steps: string[];
    actors: string[];
    triggers: ArcTrigger[];
    onStep: ({arc, gameState}: {arc: Arc, gameState: GameState}) => void | null;
    onPublication: ({arc, gameState, opinions}: {arc: Arc, gameState: GameState, opinions: TopicOpinion[]}) => void | null;
  }) {
    this.id = id;
    this.name = name;
    this.steps = steps;
    this.currentStep = 0;
    this.actors = actors;
    this.triggers = triggers;

    this.pointsToStep = 100;

    this._onStep = onStep;
    this._onPublication = onPublication;
  }

  switchSteps({arc, gameState}: {arc: Arc, gameState: GameState}) {
    if (arc.points >= this.pointsToStep && arc.step !== this.steps[this.steps.length - 1]) {
      arc.step = this.steps[this.steps.indexOf(arc.step) + 1];
      arc.points = 0;

      const event = new Event({id: uuid.v4() as EventId,
                               arcId: arc.id,
                               eventFactoryId: this.id,
                               textLog: `Arc "${this.name}" moved to the step "${arc.step}"`,
                               materialName: null,
                               challengeTypes: [],
                               materialThemes: [],
                               decorative: true});

      gameState.addEvent(event);
    }
  }

  onStep({arc, gameState}: {arc: Arc, gameState: GameState}) {
    if (this._onStep) {
      this._onStep({arc, gameState});
    }

    this.switchSteps({arc, gameState});
  }

  onPublication({arc, gameState, opinions}: {arc: Arc, gameState: GameState, opinions: TopicOpinion[]}) {
    if (this._onPublication) {
      this._onPublication({arc, gameState, opinions});
    }

    this.switchSteps({arc, gameState});
  }
}


export class Arc {
  readonly id: ArcId;
  readonly factoryId: ArcFactoryId;
  readonly actors: {[key: string]: PersonId|OrganizationId};
  step: string;
  points: number;

  constructor({id, factoryId, actors, step}:
              {id: ArcId,
               factoryId: ArcFactoryId,
               actors: {[key: string]: PersonId|OrganizationId},
               step: string}) {
    this.id = id;
    this.factoryId = factoryId;
    this.actors = actors;
    this.step = step;
    this.points = 0;
  }

  roleOf(actorId: PersonId|OrganizationId): null|string {
    for (const [role, actor] of Object.entries(this.actors)) {
      if (actor === actorId) {
        return role;
      }
    }

    return null;
  }

  hasActor(checkedActorId: PersonId|OrganizationId) {
    return this.roleOf(checkedActorId) !== null;
  }

  onStep({gameState}: {gameState: GameState}) {
    const factory = gameState.arcFactories[this.factoryId];
    factory.onStep({arc: this, gameState});
  }

  onPublication({gameState, opinions}: {gameState: GameState, opinions: TopicOpinion[]}) {
    const factory = gameState.arcFactories[this.factoryId];
    factory.onPublication({arc: this, gameState, opinions});
  }

}


export interface GameState {
  organizations: {[key: OrganizationId]: Organization}
  persons: {[key: PersonId]: Person}
}


function themesToTopicId(themes: MaterialTheme[]): TopicId {
  themes.sort();

  let id = "topic#";
  for (const theme of themes) {
    id += theme;
  }

  return id as TopicId;
}


export class Topic {
  readonly themes: MaterialTheme[];

  readonly id: TopicId;

  positivePoints: number;
  negativePoints: number;
  hotness: number;

  constructor({themes, positivePoints, negativePoints, hotness}:
              {themes: MaterialTheme[], positivePoints: number, negativePoints: number, hotness: number}) {
    this.themes = themes.slice();
    this.themes.sort();

    this.id = themesToTopicId(themes);

    this.positivePoints = positivePoints;
    this.negativePoints = negativePoints;
    this.hotness = hotness;
  }

  connotation() {
    // TODO: add fraction (0.9 look at the code),
    if (this.positivePoints > this.negativePoints) {
      return MaterialThemeConnotation.positive;
    }

    if (this.negativePoints > this.positivePoints) {
      return MaterialThemeConnotation.negative;
    }

    return MaterialThemeConnotation.neutral;
  }

  clone() {
    return new Topic({themes: this.themes.slice(),
                      positivePoints: this.positivePoints,
                      negativePoints: this.negativePoints,
                      hotness: this.hotness});
  }

  update(other: Topic) {
    if (!_.isEqual(this.themes, other.themes)) {
      throw new Error("Themes are not the same");
    }

    this.positivePoints += other.positivePoints;
    this.negativePoints += other.negativePoints;
    this.hotness += other.hotness;
  }

  isPositive() {
    return this.positivePoints > this.negativePoints;
  }

  isNegative() {
    return this.negativePoints > this.positivePoints;
  }

};

function constructTopic({themes, hotness, connation}:
                        {themes: MaterialTheme[], hotness: number, connation: MaterialThemeConnotation}): Topic {
  return new Topic({themes: themes,
                    positivePoints: connation === MaterialThemeConnotation.positive ? 1 : 0,
                    negativePoints: connation === MaterialThemeConnotation.negative ? 1 : 0,
                    hotness: hotness});
}


export class TopicSummary {
  readonly themes: MaterialTheme[];
  readonly id: TopicId;

  positivePersons: number;
  negativePersons: number;
  neutralPersons: number;

  hotness: number;

  constructor({themes}: {themes: MaterialTheme[]}) {
    this.themes = themes.slice();
    this.themes.sort();

    this.id = themesToTopicId(themes);

    this.positivePersons = 0;
    this.negativePersons = 0;
    this.neutralPersons = 0;
    this.hotness = 0;
  }

  update({topic, person}: {topic: Topic, person: Person}) {
    if (!_.isEqual(this.themes, topic.themes)) {
      throw new Error("Themes are not the same");
    }

    const neutralFraction = 0.9;
    const hotness = Math.min(10, topic.hotness);
    const hotnessFraction = hotness / 10;

    if (topic.positivePoints > topic.negativePoints * neutralFraction) {
      this.positivePersons += person.followers() * hotnessFraction;
    }
    else if (topic.negativePoints > topic.positivePoints * neutralFraction) {
      this.negativePersons += person.followers() * hotnessFraction;
    }
    else {
      this.neutralPersons += person.followers() * hotnessFraction;
    }

    this.hotness += hotness;
  }

  nonNeutralPersons() {
    return Math.max(this.positivePersons, this.negativePersons);
  }

  isNegative() {
    return this.negativePersons > this.positivePersons;
  }

  isPositive() {
    return this.positivePersons > this.negativePersons;
  }
};


class TopicOpinion {
  readonly topic: Topic;
  readonly personId: PersonId;

  constructor({topic, personId}:
              {topic: Topic, personId: PersonId}) {
    this.topic = topic;
    this.personId = personId;
  }
}
