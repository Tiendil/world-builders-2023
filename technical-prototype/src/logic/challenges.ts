import * as uuid from 'uuid';
import * as t from "@/logic/types";
import * as _ from "lodash";


// TODO: for better challenges we should attach them to personalitites
//       because often it is not clear about what they are
//       also that make understanding stories harder
//       For example "deal with emotional burst" — it is not clear who has emotional burst:
//       journalist, one of event participants, or someone else

export const drunkFight = new t.ChallengeType({
  name: "Drunk fight",
  attribute: 'strength'});

export const interviewWithDrunk = new t.ChallengeType({
  name: "Interview with drunk",
  attribute: 'empathy'});

export const interviewWithPolice = new t.ChallengeType({
  name: "Interview with police officer",
  attribute: 'charisma'});

export const policeReportAnalysis = new t.ChallengeType({
  name: "Police report analysis",
  attribute: 'logic'});

export const roadCameraAnalysis = new t.ChallengeType({
  name: "Road camera analysis",
  attribute: 'awareness'});

export const buildTrustWithChild = new t.ChallengeType({
  name: "Build trust with child",
  attribute: 'empathy'});

export const buildTrustWithAdult = new t.ChallengeType({
  name: "Build trust with adult",
  attribute: 'empathy'});

export const buildTrustWithSenior = new t.ChallengeType({
  name: "Build trust with senior",
  attribute: 'empathy'});

export const dealWithChildRepresantative = new t.ChallengeType({
  name: "Deal with child representative",
  attribute: 'willpower'});

export const dealWithSeniorRepresantative = new t.ChallengeType({
  name: "Deal with senior representative",
  attribute: 'willpower'});

export const separateFantasyFromReality = new t.ChallengeType({
  name: "Separate fantasy from reality",
  attribute: 'sensitivity'});

export const dealWithEmotionalBurst = new t.ChallengeType({
  name: "Deal with emotional burst",
  attribute: 'empathy'});

export const dealWithIdeologicalConflict = new t.ChallengeType({
  name: "Deal with ideological conflict",
  attribute: 'willpower'});

export const syncInterviewSchedule = new t.ChallengeType({
  name: "Sync interview schedule",
  attribute: 'logic'});

export const resolveConflictsOverStoryOwnership = new t.ChallengeType({
  name: "Resolve conflicts over story ownership",
  attribute: 'charisma'});

export const navigatingProfessionalBoundaries = new t.ChallengeType({
  name: "Navigating professional boundaries",
  attribute: 'awareness'});

export const handlingRepercussionsInTheWorkplace = new t.ChallengeType({
  name: "Handling repercussions in the workplace",
  attribute: 'willpower'});

export const balancingPersonalRelationships = new t.ChallengeType({
  name: "Balancing personal relationships",
  attribute: 'empathy'});

export const navigateBureaucraticRedTape = new t.ChallengeType({
  name: "Navigate bureaucratic red tape",
  attribute: 'logic'});

export const interpretLegalJargon = new t.ChallengeType({
  name: "Interpret legal jargon",
  attribute: 'knowledge'});

export const earnTrustOfThePolice = new t.ChallengeType({
  name: "Earn trust of the police",
  attribute: 'charisma'});

export const uncoverHiddenDetailsInPoliceReports = new t.ChallengeType({
  name: "Uncover hidden details in police reports",
  attribute: 'awareness'});

export const handlePoliceMisinformation = new t.ChallengeType({
  name: "Handle police misinformation",
  attribute: 'logic'});

export const maintainObjectivity = new t.ChallengeType({
  name: "Maintain Objectivity",
  attribute: 'willpower'});

export const deescalateATenseInterview = new t.ChallengeType({
  name: "De-escalate a Tense Interview",
  attribute: 'empathy'});

export const negotiateForEvidenceAccess = new t.ChallengeType({
  name: "Negotiate for Evidence Access",
  attribute: 'charisma'});

export const challengePoliceNarratives = new t.ChallengeType({
  name: "Challenge Police Narratives",
  attribute: 'logic'});

export const interpretBodyWornCameraFootage = new t.ChallengeType({
  name: "Interpret Body-Worn Camera Footage",
  attribute: 'awareness'});

export const analyzingForensicEvidence = new t.ChallengeType({
  name: "Analyzing Forensic Evidence",
  attribute: 'logic'});

export const crossReferencingLeads = new t.ChallengeType({
  name: "Cross-Referencing Leads",
  attribute: 'logic'});

export const interpretingPsychologicalProfiles = new t.ChallengeType({
  name: "Interpreting Psychological Profiles",
  attribute: 'kwowledge'});

export const challengingPoliticalNarratives = new t.ChallengeType({
  name: "Challenging Political Narratives",
  attribute: 'logic'});

export const understandingUrbanPolicy = new t.ChallengeType({
  name: "Understanding Urban Policy",
  attribute: 'logic'});

export const analyzingBudgetAndSpending = new t.ChallengeType({
  name: "Analyzing Budget and Spending",
  attribute: 'logic'});

export const collectRumors = new t.ChallengeType({
  name: "Collect rumors",
  attribute: 'awareness'});

export const buildingRapportWithTeenagers = new t.ChallengeType({
  name: "Building Rapport with Teenagers",
  attribute: 'empathy'});

export const navigatingSchoolPolicies = new t.ChallengeType({
  name: "Navigating School Policies",
  attribute: 'willpower'});

export const ensuringParentalConsent = new t.ChallengeType({
  name: "Ensuring Parental Consent",
  attribute: 'willpower'});

export const understandingTeenageTrends = new t.ChallengeType({
  name: "Understanding Teenage Trends",
  attribute: 'knwoledge'});

export const decipheringMagicalSymbolsAndTexts = new t.ChallengeType({
  name: "Deciphering Magical Symbols and Texts",
  attribute: 'divination'});

export const gainingAccessToWitchClubMeetings = new t.ChallengeType({
  name: "Gaining Access to Witch Club Meetings ",
  attribute: 'witchery'});

export const interviewingReluctantClubMembers = new t.ChallengeType({
  name: "Interviewing Reluctant Club Members",
  attribute: 'empathy'});

export const evaluatingTheEthicsOfMagicUse = new t.ChallengeType({
  name: "Evaluating the Ethics of Magic Use",
  attribute: 'divination'});

export const handlingMagicalMishaps = new t.ChallengeType({
  name: "Handling Magical Mishaps",
  attribute: 'sensitivity'});

export const interviewWithAWitch = new t.ChallengeType({
  name: "Interview with a Witch",
  attribute: 'divination'});

export const investigatingMagicalClaims = new t.ChallengeType({
  name: "Investigating Magical Claims",
  attribute: 'sensitivity'});

export const understandingMagicalLore = new t.ChallengeType({
  name: "Understanding Magical Lore",
  attribute: 'divination'});

export const protectingAgainstHexes = new t.ChallengeType({
  name: "Protecting Against Hexes",
  attribute: 'witchery'});

export const debunkingMagicalHoaxes = new t.ChallengeType({
  name: "Debunking Magical Hoaxes",
  attribute: 'logic'});

export const unravelingHistoricalWitchcraftCases = new t.ChallengeType({
  name: "Unraveling Historical Witchcraft Cases",
  attribute: 'divination'});

export const identifyingHiddenMagicalSymbols = new t.ChallengeType({
  name: "Identifying Hidden Magical Symbols",
  attribute: 'sensitivity'});

export const interpretingMagicalPhenomena = new t.ChallengeType({
  name: "Interpreting Magical Phenomena",
  attribute: 'witchery'});

export const challengingWitchStereotypes = new t.ChallengeType({
  name: "Challenging Witch Stereotypes",
  attribute: 'empathy'});

export const navigatingFearAndSuperstition = new t.ChallengeType({
  name: "Navigating Fear and Superstition",
  attribute: 'willpower'});

export const dealWithPhysicalIntimidation = new t.ChallengeType({
  name: "Deal with physical intimidation",
  attribute: 'strength'});

export const solveRiddles = new t.ChallengeType({
  name: "Solve riddles",
  attribute: 'logic'});

export const getThroughTheMindGames = new t.ChallengeType({
  name: "Get through the mind games",
  attribute: 'logic'});

export const decipherUnlogicalStatements = new t.ChallengeType({
  name: "Decipher unlogical statements",
  attribute: 'logic'});

export const keepPatience = new t.ChallengeType({
  name: "Keep patience",
  attribute: 'willpower'});

export const discoverSocialConnectionsNetwork = new t.ChallengeType({
  name: "Discover social connections network",
  attribute: 'awareness'});

export const winDrinkingContest = new t.ChallengeType({
  name: "Win drinking contest",
  attribute: 'endurance'});

export const visitLocalBar = new t.ChallengeType({
  name: "Visit local bar",
  attribute: 'charisma'});

export const mixupCocktails = new t.ChallengeType({
  name: "Mixup cocktails",
  attribute: 'agility'});

export const examinVehicleCondition = new t.ChallengeType({
  name: "Examine vehicle condition",
  attribute: 'awareness'});

export const collectTrafficData = new t.ChallengeType({
  name: "Collect traffic data",
  attribute: 'logic'});

export const participateInStreetRace = new t.ChallengeType({
  name: "Participate in street race",
  attribute: 'agility'});

export const navigateReligiousHierarchy = new t.ChallengeType({
  name: "Navigate religious hierarchy",
  attribute: 'knowledge'});

export const understandingReligiousTexts = new t.ChallengeType({
  name: "Understanding religious texts",
  attribute: 'knowledge'});

export const dealingWithReligiousCriticism = new t.ChallengeType({
  name: "Dealing with religious criticism",
  attribute: 'willpower'});


export const interpretingReligiousOmens = new t.ChallengeType({
  name: "Interpreting religious omens",
  attribute: 'divination'});


export const chalellengeTypes: t.ChallengeType[] = [
  drunkFight,
  interviewWithDrunk,
  interviewWithPolice,
  policeReportAnalysis,
  roadCameraAnalysis,
  buildTrustWithChild,
  buildTrustWithAdult,
  buildTrustWithSenior,
  dealWithChildRepresantative,
  dealWithSeniorRepresantative,
  separateFantasyFromReality,
  dealWithEmotionalBurst,
  dealWithIdeologicalConflict,
  syncInterviewSchedule,
  resolveConflictsOverStoryOwnership,
  navigatingProfessionalBoundaries,
  handlingRepercussionsInTheWorkplace,
  balancingPersonalRelationships,
  navigateBureaucraticRedTape,
  interpretLegalJargon,
  earnTrustOfThePolice,
  uncoverHiddenDetailsInPoliceReports,
  handlePoliceMisinformation,
  maintainObjectivity,
  deescalateATenseInterview,
  negotiateForEvidenceAccess,
  challengePoliceNarratives,
  interpretBodyWornCameraFootage,
  analyzingForensicEvidence,
  crossReferencingLeads,
  interpretingPsychologicalProfiles,
  challengingPoliticalNarratives,
  understandingUrbanPolicy,
  analyzingBudgetAndSpending,
  collectRumors,
  buildingRapportWithTeenagers,
  navigatingSchoolPolicies,
  ensuringParentalConsent,
  understandingTeenageTrends,
  decipheringMagicalSymbolsAndTexts,
  gainingAccessToWitchClubMeetings,
  interviewingReluctantClubMembers,
  evaluatingTheEthicsOfMagicUse,
  handlingMagicalMishaps,
  interviewWithAWitch,
  investigatingMagicalClaims,
  understandingMagicalLore,
  protectingAgainstHexes,
  debunkingMagicalHoaxes,
  unravelingHistoricalWitchcraftCases,
  identifyingHiddenMagicalSymbols,
  interpretingMagicalPhenomena,
  challengingWitchStereotypes,
  navigatingFearAndSuperstition,
  dealWithPhysicalIntimidation,
  solveRiddles,
  getThroughTheMindGames,
  decipherUnlogicalStatements,
  keepPatience,
  discoverSocialConnectionsNetwork,
  winDrinkingContest,
  visitLocalBar,
  mixupCocktails,
  collectTrafficData,
  participateInStreetRace,
  navigateReligiousHierarchy,
  understandingReligiousTexts,
  dealingWithReligiousCriticism,
  interpretingReligiousOmens,
];


export const generalChallengeTypes: t.ChallengeType[] = [
  maintainObjectivity.id,
  deescalateATenseInterview.id,
  crossReferencingLeads.id,
  interpretingPsychologicalProfiles.id
];


export const challengeTypes: { [id: t.ChallengeTypeId]: t.ChallengeType } = chalellengeTypes.reduce(
  (acc, challenge) => {
    acc[challenge.id] = challenge;
    // console.log(challenge.name);
    return acc;
  },
  {} as { [id: t.ChallengeTypeId]: t.ChallengeType }
);


export function createChallenges({number, challengeTypeIds}: {number: number, challengeTypeIds: t.ChallengeTypeId[]}): t.Challenge[] {
  const challenges = [];

  for (let i = 0; i < number; i++) {
    const challengeTypeId = _.sample(challengeTypeIds);

    const challengeType = challengeTypes[challengeTypeId];

    const challenge = new t.Challenge({challengeTypeId,
                                       name: challengeType.name,
                                       attribute: challengeType.attribute,})

    challenges.push(challenge);
  }

  return challenges;
}
