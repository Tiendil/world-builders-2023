import * as t from "@/logic/types";
import * as s from "@/logic/statements";
import * as challenges from "@/logic/challenges";

////////////////
// organizations
////////////////

// TODO: how to separate challenges in oficial events (police fighting crime)
//       from challenges in personal events (divorse of police officer)?
//       It looks like a final list of challenges muse highly depend on concrete story/event
// Ather example: Lola actor, who is a mayor assistant, but should be incompetent.
//
// TODO: maybe we should form events in two steps: trigger set "tags" for event, and then
//       we set challenges according to tags => we break connection between most of entities and events
//       It will help to manage challenges easier and allows (maybe) to generate them conditionally (see previous TODO)
// OR: create challenges fabrics, which will build challenges based on event, actors & statements
export const playerAgency = new t.Organization({
  id: "organization#1" as t.OrganizationId,
  name: "Lost Town News",
  color: "#ffcccc",
  challengeTypes: [challenges.navigatingProfessionalBoundaries.id,
                   challenges.handlingRepercussionsInTheWorkplace.id]});


export const policeDepartment = new t.Organization({
  id: "organization#2" as t.OrganizationId,
  name: "Police Department",
  color: "#ccffcc",
  challengeTypes: [challenges.navigateBureaucraticRedTape.id,
                   challenges.interpretLegalJargon.id,
                   challenges.earnTrustOfThePolice.id,
                   challenges.negotiateForEvidenceAccess.id,
                   challenges.challengePoliceNarratives.id,
                   challenges.syncInterviewSchedule.id]});


export const mayorOffice = new t.Organization({
  id: "organization#3" as t.OrganizationId,
  name: "Mayor's Office",
  color: "#ccccff",
  challengeTypes: [challenges.navigateBureaucraticRedTape.id,
                   challenges.interpretLegalJargon.id,
                   challenges.challengingPoliticalNarratives.id,
                   challenges.understandingUrbanPolicy.id,
                   challenges.analyzingBudgetAndSpending.id,
                   challenges.syncInterviewSchedule.id]});


export const school = new t.Organization({
  id: "organization#4" as t.OrganizationId,
  name: "School",
  color: "#ffffcc",
  challengeTypes: [challenges.buildingRapportWithTeenagers.id,
                   challenges.navigatingSchoolPolicies.id,
                   challenges.ensuringParentalConsent.id,
                   challenges.understandingTeenageTrends.id]});


export const schoolWitchClub = new t.Organization({
  id: "organization#5" as t.OrganizationId,
  name: "School's Witch Club",
  color: "#ffccff",
  challengeTypes: [challenges.decipheringMagicalSymbolsAndTexts.id,
                   challenges.gainingAccessToWitchClubMeetings.id,
                   challenges.interviewingReluctantClubMembers.id,
                   challenges.evaluatingTheEthicsOfMagicUse.id,
                   challenges.handlingMagicalMishaps.id,]});


export const church = new t.Organization({
  id: "organization#6" as t.OrganizationId,
  name: "Church",
  color: "#ccffff",
  challengeTypes: [challenges.navigateReligiousHierarchy.id,
                   challenges.understandingReligiousTexts.id,
                   challenges.dealingWithReligiousCriticism.id,
                   challenges.syncInterviewSchedule.id]});


export const predefinedOrganizations: t.Organization[] = [
  playerAgency,
  policeDepartment,
  mayorOffice,
  school,
  schoolWitchClub,
  church,
];

////////////////
// statements
////////////////

// TODO: most (all) of age challenges could be binned to more specific statements instead

export const ageChild = new s.Status({status: "child", // (0-12)
                                      followersMultiplier: -0.5,
                                      personAttributes: {logic: -2,
                                                         knowledge: -2,
                                                         divination: 2,
                                                         empathy: -2,
                                                         willpower: -2,
                                                         sensitivity: 2,
                                                         agility: -1,
                                                         endurance: -1,
                                                         strength: -2,
                                                         witchery: 2},
                                      challengeTypes: [challenges.buildTrustWithChild.id,
                                                       challenges.dealWithChildRepresantative.id,
                                                       challenges.separateFantasyFromReality.id,]});

export const ageTeen = new s.Status({status: "teen", // (13-19)
                                     followersMultiplier: -0.25,
                                     personAttributes: {logic: -1,
                                                        knowledge: -1,
                                                        divination: 1,
                                                        empathy: -1,
                                                        willpower: -1,
                                                        sensitivity: 1,
                                                        strength: -1,
                                                        witchery: 1},
                                     challengeTypes: [challenges.buildTrustWithChild.id,
                                                      challenges.buildTrustWithAdult.id,
                                                      challenges.dealWithChildRepresantative.id,
                                                      challenges.separateFantasyFromReality.id,
                                                      challenges.dealWithEmotionalBurst.id]});

export const ageYungAdult = new s.Status({status: "young adult",  // (20-29)
                                          personAttributes: {agility: 1,
                                                             endurance: 1,
                                                             strength: 1},
                                          challengeTypes: [challenges.buildTrustWithAdult.id,
                                                           challenges.dealWithEmotionalBurst.id,
                                                           challenges.dealWithIdeologicalConflict.id]});

export const ageAdult = new s.Status({status: "adult", // (30-39)
                                      personAttributes: {logic: 1,
                                                         knowledge: 1,
                                                         empathy: 1,
                                                         willpower: 1,
                                                         endurance: 1},
                                      challengeTypes: [challenges.buildTrustWithAdult.id,
                                                       challenges.dealWithIdeologicalConflict.id,
                                                       challenges.syncInterviewSchedule.id]});

export const ageMiddleAge = new s.Status({status: "middle age", // (40-49)
                                          personAttributes: {logic: 1,
                                                             knowledge: 2,
                                                             empathy: 2,
                                                             willpower: 2},
                                          challengeTypes: [challenges.buildTrustWithAdult.id,
                                                           challenges.syncInterviewSchedule.id]});

export const ageOlderAdult = new s.Status({status: "older adult", // (50-59)
                                           personAttributes: {knowledge: 2,
                                                              empathy: 1,
                                                              willpower: 1},
                                           challengeTypes: [challenges.buildTrustWithAdult.id,
                                                            challenges.buildTrustWithSenior.id,
                                                            challenges.syncInterviewSchedule.id]});

export const ageSenior = new s.Status({status: "senior", // (60+)
                                       personAttributes: {logic: -1,
                                                          awareness: -1,
                                                          charisma: -1,
                                                          willpower: -1,
                                                          agility: -1,
                                                          endurance: -2,
                                                          strength: -1},
                                       challengeTypes: [challenges.buildTrustWithSenior.id,
                                                        challenges.dealWithSeniorRepresantative.id,
                                                        challenges.separateFantasyFromReality.id]});

export const playerAgencyWorker = new s.Employee({organizationId: playerAgency.id,
                                                  role: "journalist",
                                                  followersMultiplier: 0.1,
                                                  challengeTypes: [challenges.resolveConflictsOverStoryOwnership.id,
                                                                   challenges.balancingPersonalRelationships.id]});

export const playerAgencyChiefEditor = new s.Employee({organizationId: playerAgency.id,
                                                       role: "chief editor",
                                                       followersMultiplier: 0.5,
                                                       challengeTypes: [challenges.resolveConflictsOverStoryOwnership.id,
                                                                        challenges.balancingPersonalRelationships.id]});

export const policeOfficer = new s.Employee({organizationId: policeDepartment.id,
                                             role: "police officer",
                                             challengeTypes: [challenges.interpretBodyWornCameraFootage.id]});
export const policeDetective = new s.Employee({organizationId: policeDepartment.id,
                                               role: "detective",
                                               challengeTypes: [challenges.analyzingForensicEvidence.id]});

export const stateMayour = new s.Employee({organizationId: mayorOffice.id,
                                           role: "mayor",
                                           followersMultiplier: 0.5,
                                           challengeTypes: []});
export const stateMayorAssistant = new s.Employee({organizationId: mayorOffice.id,
                                                   role: "mayor assistant",
                                                   followersMultiplier: 0.2,
                                                   challengeTypes: [challenges.collectRumors.id]});

export const schoolStudent = new s.Employee({organizationId: school.id,
                                             role: "student",
                                             challengeTypes: []});

export const memberOfWitchClub = new s.Employee({organizationId: schoolWitchClub.id,
                                                 role: "member",
                                                 challengeTypes: []});


export const priest = new s.Employee({organizationId: church.id,
                                      role: "priest",
                                      challengeTypes: [challenges.interpretingReligiousOmens.id,]});


export const witch = new s.Status({status: "witch",
                                   personAttributes: {divination: 2,
                                                      sensitivity: 2,
                                                      witchery: 2,
                                                      willpower: 1,
                                                      awareness: 1,
                                                      endurance: 1,},
                                   challengeTypes: [challenges.interviewWithAWitch.id,
                                                    challenges.investigatingMagicalClaims.id,
                                                    challenges.understandingMagicalLore.id,
                                                    challenges.protectingAgainstHexes.id,
                                                    challenges.debunkingMagicalHoaxes.id,
                                                    challenges.unravelingHistoricalWitchcraftCases.id,
                                                    challenges.identifyingHiddenMagicalSymbols.id,
                                                    challenges.interpretingMagicalPhenomena.id,
                                                    challenges.challengingWitchStereotypes.id,
                                                    challenges.navigatingFearAndSuperstition.id,]});

export const strong = new s.Status({status: "strong",
                                    personAttributes: {endurance: 2,
                                                       strength: 2,},
                                    challengeTypes: [challenges.dealWithPhysicalIntimidation.id]});
// TODO: what challenges could gibe weak (in any sense) person?
export const weak = new s.Status({status: "weak",
                                  personAttributes: {endurance: -2,
                                                     strength: -2,},
                                  challengeTypes: []});

export const smart = new s.Status({status: "smart",
                                   followersMultiplier: 0.2,
                                   personAttributes: {logic: 2,
                                                      awareness: 1,
                                                      knowledge: 1},
                                   challengeTypes: [challenges.solveRiddles.id,
                                                    challenges.getThroughTheMindGames.id]});
export const dumb = new s.Status({status: "dumb",
                                  followersMultiplier: -0.2,
                                  personAttributes: {logic: -2,
                                                     awareness: -1,
                                                     knowledge: -1},
                                  challengeTypes: [challenges.decipherUnlogicalStatements.id,
                                                   challenges.keepPatience.id]});

export const social = new s.Status({status: "social",
                                    followersMultiplier: 0.5,
                                    personAttributes: {empathy: 1,
                                                       charisma: 1,},
                                    challengeTypes: [challenges.discoverSocialConnectionsNetwork.id]});
// TODO: what challenges could gibe asocial person?
export const asocial = new s.Status({status: "asocial",
                                     followersMultiplier: -0.5,
                                     personAttributes: {empathy: -1,
                                                        charisma: -1},
                                     challengeTypes: []});

// TODO: what challenges could gibe pretty/ugly person?
export const pretty = new s.Status({status: "pretty",
                                    followersMultiplier: 0.2,
                                    personAttributes: {charisma: 2},
                                    challengeTypes: []});
// TODO: what challenges could gibe pretty/ugly person?
export const ugly = new s.Status({status: "ugly",
                                  followersMultiplier: -0.2,
                                  personAttributes: {charisma: -2},
                                  challengeTypes: []});

export const drinker = new s.Status({status: "drinker",
                                     personAttributes: {awareness: -1,
                                                        willpower: -1,
                                                        endurance: 1},
                                     challengeTypes: [challenges.winDrinkingContest.id,
                                                      challenges.visitLocalBar.id,
                                                      challenges.mixupCocktails.id,]});

export const driver = new s.Status({status: "driver",
                                    personAttributes: {},
                                    challengeTypes: [challenges.collectTrafficData.id,
                                                     challenges.participateInStreetRace.id]});


export const predefinedStatements: t.Statement[] = [
  ageChild,
  ageTeen,
  ageYungAdult,
  ageAdult,
  ageMiddleAge,
  ageOlderAdult,
  ageSenior,
  playerAgencyWorker,
  playerAgencyChiefEditor,
  policeOfficer,
  policeDetective,
  stateMayour,
  stateMayorAssistant,
  schoolStudent,
  memberOfWitchClub,
  priest,
  witch,
  strong,
  weak,
  smart,
  dumb,
  social,
  asocial,
  pretty,
  ugly,
  drinker,
  driver,
];

////////////////
// persons
////////////////


export let alice =  new t.Person({
  id: "person#1" as t.PersonId,
  name: "Alice",
  color: "#ffcccc",
  statements: [ageYungAdult,
               playerAgencyWorker,
               strong,
               drinker,
               driver]
});

export let bob = new t.Person({
  id: "person#2" as t.PersonId,
  name: "Bob",
  color: "#ccffcc",
  statements: [ageAdult,
               policeOfficer,
               strong,
               driver],
});


export let charlie = new t.Person({
  id: "person#3" as t.PersonId,
  name: "Charlie",
  color: "#ccccff",
  statements: [ageAdult,
               policeDetective,
               smart,
               ugly,
               social,
               drinker,
               driver],
});


export let david = new t.Person({
  id: "person#4" as t.PersonId,
  name: "David",
  color: "#ffffcc",
  statements: [ageMiddleAge,
               weak,
               strong,
               driver]
});


export let eve = new t.Person({
  id: "person#5" as t.PersonId,
  name: "Eve",
  color: "#ffccff",
  statements: [ageMiddleAge,
               playerAgencyWorker,
               asocial,
               witch,],
});


export let frank = new t.Person({
  id: "person#6" as t.PersonId,
  name: "Frank",
  color: "#ccffff",
  statements: [ageOlderAdult,
               stateMayour,
               smart,
               weak,
               ugly,
               social,
               driver,
               drinker],
});


export let lola = new t.Person({
  id: "person#7" as t.PersonId,
  name: "Lola",
  color: "#ffcc99",
  statements: [ageYungAdult,
               stateMayorAssistant,
               dumb,
               social,
               pretty],
});


export let george = new t.Person({
  id: "person#8" as t.PersonId,
  name: "George",
  color: "#ffcccc",
  statements: [ageTeen,
               playerAgencyWorker,
               schoolStudent,
               smart],
});


export let sabrina = new t.Person({
  id: "person#9" as t.PersonId,
  name: "Sabrina",
  color: "#ccffcc",
  statements: [ageTeen,
               schoolStudent,
               witch,
               memberOfWitchClub,
               driver,
               social],
});


export let willow = new t.Person({
  id: "person#10" as t.PersonId,
  name: "Willow",
  color: "#ccccff",
  statements: [ageTeen,
               schoolStudent,
               witch,
               memberOfWitchClub,
               strong,
               driver,
               drinker],
});


export let hermione = new t.Person({
  id: "person#11" as t.PersonId,
  name: "Hermione",
  color: "#ffffcc",
  statements: [ageTeen,
               schoolStudent,
               witch,
               memberOfWitchClub,
               smart],
});


export let smoker = new t.Person({
  id: "person#12" as t.PersonId,
  name: "Smoker",
  color: "#ffccff",
  statements: [ageMiddleAge,
               playerAgencyChiefEditor,
               smart,
               driver,
               drinker],
});


export let constantine = new t.Person({
  id: "person#13" as t.PersonId,
  name: "Constantine",
  color: "#ccffff",
  statements: [ageOlderAdult,
               priest,
               smart,
               driver,
               drinker],
});


export const predefinedPersons: t.Person[] = [
  alice,
  bob,
  charlie,
  david,
  eve,
  frank,
  lola,
  george,
  sabrina,
  willow,
  hermione,
  smoker,
  constantine,
];
