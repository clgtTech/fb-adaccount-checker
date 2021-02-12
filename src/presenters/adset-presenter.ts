import { AdAccount, Adset } from '../stores/entities';
import { Formatters } from '../services/intl';
import { CampaignPresenter } from './campaign-presenter';
import { InsightsPresenter } from './insights-presenter';

export class AdsetPresenter {
  id: string;
  name: string;
  effectiveStatus: string;
  bidStrategy?: string;
  lifetimeBudget?: string;
  dailyBudget?: string;
  insights?: InsightsPresenter;

  constructor(adset: Adset, adAccount: AdAccount) {
    this.id = adset.id;
    this.name = adset.name;
    this.effectiveStatus = Formatters.formatEnumValue(adset.status);
    this.bidStrategy = adset.bidStrategy
      ? CampaignPresenter.formatBidStrategy(adset.bidStrategy)
      : undefined;
    this.lifetimeBudget = adset.lifetimeBudget
      ? Formatters.formatCurrencyAmount(adset.lifetimeBudget)
      : undefined;
    this.dailyBudget = adset.dailyBudget
      ? Formatters.formatCurrencyAmount(adset.dailyBudget)
      : undefined;
    this.insights = adset.insights
      ? new InsightsPresenter(adset.insights, adAccount)
      : undefined;
  }
}
