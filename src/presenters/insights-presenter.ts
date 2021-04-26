import { AdAccount, Insights } from '../stores/entities';
import {
  Formatters,
  EnumTexts,
  IntlFactory,
  InsightsTexts,
} from '../services/intl';
import { ActionType } from '../types';

export class InsightsPresenter {
  targetActionTitle: string;
  targetActionCostTitle: string;
  targetActionResult: string;
  targetActionCost: string;
  spend: string;
  cpc: string;
  cpm: string;
  ctr: string;

  constructor(
    private readonly insights: Insights,
    private readonly adAccount: AdAccount
  ) {
    this.targetActionTitle = this.getTextForActionResult(insights.targetAction);
    this.targetActionCostTitle = this.getTextForActionCost(
      insights.targetAction
    );
    this.targetActionResult = Formatters.formatNumericValue(
      insights.targetActionResult
    );
    this.targetActionCost = Formatters.formatMonetaryValue(
      insights.targetActionCost,
      adAccount.currency
    );
    this.spend = Formatters.formatMonetaryValue(
      insights.spend,
      adAccount.currency
    );
    this.cpc = Formatters.formatMonetaryValue(insights.cpc, adAccount.currency);
    this.cpm = Formatters.formatMonetaryValue(insights.cpm, adAccount.currency);
    this.ctr = Formatters.formatNumericValue(insights.ctr);
  }

  getActionResult(actionType: ActionType): string {
    return Formatters.formatNumericValue(
      this.insights.actions[actionType] || 0
    );
  }

  getActionCost(actionType: ActionType): string {
    console.log(this.insights.costPerAction);
    return Formatters.formatMonetaryValue(
      this.insights.costPerAction[actionType] || 0,
      this.adAccount.currency
    );
  }

  getTextForActionResult(action: ActionType): string {
    return Formatters.formatEnumValue(action, EnumTexts.ActionType);
  }

  getTextForActionCost(action: ActionType): string {
    return action in EnumTexts.CostPerActionType
      ? Formatters.formatEnumValue(action, EnumTexts.CostPerActionType)
      : IntlFactory._(InsightsTexts.customActionCost, {
          action: Formatters.formatEnumValue(action),
        });
  }
}
