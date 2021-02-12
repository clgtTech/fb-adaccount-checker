import { BidStrategy, BuyingType, Objective } from '../types';
import { AdAccount, Campaign } from '../stores/entities';
import { Formatters, Messages } from '../services/intl';
import { InsightsPresenter } from './insights-presenter';

export class CampaignPresenter {
  id: string;
  name: string;
  effectiveStatus: string;
  buyingType: string;
  objective: string;
  bidStrategy?: string;
  lifetimeBudget?: string;
  dailyBudget?: string;
  insights?: InsightsPresenter;

  constructor(campaign: Campaign, adAccount: AdAccount) {
    this.id = campaign.id;
    this.name = campaign.name;
    this.effectiveStatus = Formatters.formatEnumValue(campaign.effectiveStatus);
    this.buyingType = CampaignPresenter.formatBuyingType(campaign.buyingType);
    this.objective = CampaignPresenter.formatObjective(campaign.objective);
    this.bidStrategy = campaign.bidStrategy
      ? CampaignPresenter.formatBidStrategy(campaign.bidStrategy)
      : undefined;
    this.lifetimeBudget = campaign.lifetimeBudget
      ? Formatters.formatCurrencyAmount(campaign.lifetimeBudget)
      : undefined;
    this.dailyBudget = campaign.dailyBudget
      ? Formatters.formatCurrencyAmount(campaign.dailyBudget)
      : undefined;
    this.insights = campaign.insights
      ? new InsightsPresenter(campaign.insights, adAccount)
      : undefined;
  }

  static formatBuyingType(buyingType: BuyingType): string {
    return Formatters.formatEnumValue(buyingType, Messages.Enums.BuyingTypes);
  }

  static formatObjective(objective: Objective): string {
    return Formatters.formatEnumValue(objective, Messages.Enums.Objectives);
  }

  static formatBidStrategy(bidStrategy: BidStrategy): string {
    return Formatters.formatEnumValue(
      bidStrategy,
      Messages.Enums.BidStrategies
    );
  }
}
