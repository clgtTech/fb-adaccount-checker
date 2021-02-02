import { ActionType, BidStrategy, BuyingType, Objective } from '../types';
import { Campaign } from '../stores/campaign-store';
import { AdAccount } from '../stores/ad-account-store';
import { Formatters, Messages } from '../services/intl';

export class CampaignPresenter {
  id: string;
  name: string;
  status: string;
  buyingType: string;
  objective: string;
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

  constructor(campaign: Campaign, adAccount: AdAccount) {
    this.id = campaign.id;
    this.name = campaign.name;
    this.status = Formatters.formatEnumValue(campaign.status);
    this.buyingType = CampaignPresenter.formatBuyingType(campaign.buyingType);
    this.objective = CampaignPresenter.formatObjective(campaign.objective);
    this.bidStrategy = campaign.bidStrategy
      ? CampaignPresenter.formatBidStrategy(campaign.bidStrategy)
      : '';
    this.lifetimeBudget = campaign.lifetimeBudget
      ? Formatters.formatCurrencyAmount(campaign.lifetimeBudget)
      : '';
    this.dailyBudget = campaign.dailyBudget
      ? Formatters.formatCurrencyAmount(campaign.dailyBudget)
      : '';

    if (campaign.insights) {
      this.insights = {
        spend: Formatters.formatMonetaryValue(
          campaign.insights.spend,
          adAccount.currency
        ),
        actionType: CampaignPresenter.formatActionType(
          campaign.insights.actionType
        ),
        actionTypeResult: Formatters.formatNumericValue(
          campaign.insights.actionTypeResult
        ),
        costPerActionType: Formatters.formatMonetaryValue(
          campaign.insights.costPerActionType,
          adAccount.currency
        ),
        cpc: Formatters.formatMonetaryValue(
          campaign.insights.cpc,
          adAccount.currency
        ),
        cpm: Formatters.formatMonetaryValue(
          campaign.insights.cpm,
          adAccount.currency
        ),
        ctr: Formatters.formatNumericValue(campaign.insights.ctr),
      };
    }
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

  static formatActionType(actionType: ActionType): string {
    return Formatters.formatEnumValue(actionType, Messages.Enums.ActionTypes);
  }
}
