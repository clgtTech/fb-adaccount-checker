import { AdAccount } from '../stores/ad-account-store';
import { Adset } from '../stores/adset-store';
import { Formatters } from '../services/intl';
import { CampaignPresenter } from './campaign-presenter';

export class AdsetPresenter {
  id: string;
  name: string;
  effectiveStatus: string;
  status: string;
  bidStrategy: string;
  lifetimeBudget: string;
  dailyBudget: string;
  insights?: {
    spend: string;
    actionType: string;
    actionTypeResult: string;
    costPerActionType: string;
    cpc: string;
    cpm: string;
    ctr: string;
  };

  constructor(adset: Adset, adAccount: AdAccount) {
    this.id = adset.id;
    this.name = adset.name;
    this.effectiveStatus = Formatters.formatEnumValue(adset.status);
    this.status = Formatters.formatEnumValue(adset.status);
    this.bidStrategy = adset.bidStrategy
      ? CampaignPresenter.formatBidStrategy(adset.bidStrategy)
      : '';
    this.lifetimeBudget = adset.lifetimeBudget
      ? Formatters.formatCurrencyAmount(adset.lifetimeBudget)
      : '';
    this.dailyBudget = adset.dailyBudget
      ? Formatters.formatCurrencyAmount(adset.dailyBudget)
      : '';

    if (adset.insights) {
      this.insights = {
        spend: Formatters.formatMonetaryValue(
          adset.insights.spend,
          adAccount.currency
        ),
        actionType: CampaignPresenter.formatActionType(
          adset.insights.actionType
        ),
        actionTypeResult: Formatters.formatNumericValue(
          adset.insights.actionTypeResult
        ),
        costPerActionType: Formatters.formatMonetaryValue(
          adset.insights.costPerActionType,
          adAccount.currency
        ),
        cpc: Formatters.formatMonetaryValue(
          adset.insights.cpc,
          adAccount.currency
        ),
        cpm: Formatters.formatMonetaryValue(
          adset.insights.cpm,
          adAccount.currency
        ),
        ctr: Formatters.formatNumericValue(adset.insights.ctr),
      };
    }
  }
}
