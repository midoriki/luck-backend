import { AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from './policy-handler';
import { Action } from '../casl/action';
import { Lottery } from '../lottery/entities/lottery.entity';

export class ReadLotteryPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Lottery);
  }
}

export class CreateLotteryPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, Lottery);
  }
}
