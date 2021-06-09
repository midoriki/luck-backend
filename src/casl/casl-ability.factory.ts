import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Action } from './action';
import { Lottery } from '../lottery/entities/lottery.entity';
import { User } from '../user/entities/user.entity';

type Subjects = InferSubjects<typeof Lottery | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    }

    // Lottery
    can(Action.Read, Lottery);

    // User
    can(Action.Update, User, { id: user.id });
    can(Action.Read, User, { id: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
