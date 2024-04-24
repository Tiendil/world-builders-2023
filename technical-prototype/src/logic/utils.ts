import * as uuid from 'uuid';
import * as t from "@/logic/types";


export function  addChallengeType({challengeTypes, challengeTypeId}: {challengeTypes: t.ChallengeTypeId[], challengeTypeId: t.ChallengeTypeId}) {
  if (challengeTypes.includes(challengeTypeId)) {
    return;
  }

  challengeTypes.push(challengeTypeId);
}


export function addChallengeTypes({challengeTypes, newChallengeTypes}: {challengeTypes: t.ChallengeTypeId[], newChallengeTypes: t.ChallengeTypeId[]}) {
    for (const challengeTypeId of newChallengeTypes) {
      addChallengeType({challengeTypes, challengeTypeId});
    }
}


export function extendThemesForPerson({themes, person}: {themes: t.MaterialTheme[], person: t.Person}) {
  if (!themes.includes(person.id)) {
    themes.push(person.id);
  }

  for (const statement of person.statements) {
    for (const theme of statement.themes()) {
      if (!themes.includes(theme)) {
        themes.push(theme);
      }
    }
  }
}
