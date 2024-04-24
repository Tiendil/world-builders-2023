import * as uuid from 'uuid';
import * as t from "@/logic/types";
import * as utils from "@/logic/utils";


export class BaseStatement extends t.Statement {
  apply({person, organizations}: {person: t.Person, organizations: {[key: t.OrganizationId]: t.Organization}}): void {
    utils.addChallengeTypes({challengeTypes: person.challengeTypes, newChallengeTypes: this.challengeTypes});

    for (const attribute in this.personAttributes) {
      if (!(attribute in person.attributes)) {
        throw new Error(`Person does not have attribute ${attribute}`);
      }

      person.attributes[attribute] += this.personAttributes[attribute];
    }
  }
};


export class Employee extends BaseStatement {
  constructor({organizationId,
               challengeTypes,
               role = "employee",
               followersMultiplier = 0}:
              {organizationId: t.OrganizationId,
               challengeTypes: t.ChallengeTypeId[],
               role?: string,
               followersMultiplier?: number}) {
    super({challengeTypes, personAttributes: {} });
    this.organizationId = organizationId;
    this.role = role;
    this.followersMultiplier = followersMultiplier;
  }

  apply({person, organizations}: {person: t.Person, organizations: {[key: t.OrganizationId]: t.Organization}}): void {
    super.apply({person, organizations});

    if (person.employeeOf.includes(this.organizationId)) {
      throw new Error(`Person is already an employee of organization ${this.organizationId}`);
    }

    utils.addChallengeTypes({challengeTypes: person.challengeTypes, newChallengeTypes: organizations[this.organizationId].challengeTypes});

    person.employeeOf.push(this.organizationId);
    person.employeeRoles[this.organizationId] = this.role;

    person.followersMultiplier += this.followersMultiplier;
  }

  name({gameState}: {gameState: GameState}): string {
    return `${this.role} at ${gameState.organizations[this.organizationId].name}`;
  }

  themes(): MaterialTheme[] {
    const themes = super.themes();

    if (!themes.includes(this.organizationId)) {
      themes.push(this.organizationId);
    }

    return themes;
  }
}


export class Status extends BaseStatement {
  constructor({status,
               challengeTypes,
               personAttributes,
               followersMultiplier = 0}:
              {status: t.StatusId,
               challengeTypes: t.ChallengeTypeId[],
               personAttributes: {[key: t.PersonAttribute]: number},
               followersMultiplier: number}) {
    super({challengeTypes, personAttributes});
    this.status = status;
    this.followersMultiplier = followersMultiplier;
  }

  apply({person, organizations}: {person: t.Person, organizations: organizations}): void {
    super.apply({person, organizations});

    person.followersMultiplier += this.followersMultiplier;
  }

  name({gameState}: {gameState: GameState}): string {
    return this.status;
  }
}
