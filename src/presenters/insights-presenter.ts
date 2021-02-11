import { AdAccount, Insights } from '../stores/entities';
import { Formatters, Messages } from '../services/intl';
import { ActionType } from '../types';

export class InsightsPresenter {
  spend: string;
  actionType: string;
  actionTypeResult: string;
  costPerActionType: string;
  cpc: string;
  cpm: string;
  ctr: string;

  constructor(insights: Insights, adAccount: AdAccount) {
    this.spend = Formatters.formatMonetaryValue(
      insights.spend,
      adAccount.currency
    );
    this.actionTypeResult = Formatters.formatNumericValue(
      insights.actionTypeResult
    );
    this.costPerActionType = Formatters.formatMonetaryValue(
      insights.costPerActionType,
      adAccount.currency
    );
    this.actionType = InsightsPresenter.formatActionType(insights.actionType);
    this.cpc = Formatters.formatMonetaryValue(insights.cpc, adAccount.currency);
    this.cpm = Formatters.formatMonetaryValue(insights.cpm, adAccount.currency);
    this.ctr = Formatters.formatNumericValue(insights.ctr);
  }

  static formatActionType(actionType: ActionType): string {
    return Formatters.formatEnumValue(actionType, Messages.Enums.ActionTypes);
  }
}
