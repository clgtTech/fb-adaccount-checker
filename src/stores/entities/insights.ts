import { ActionType } from '../../types';

export class Insights {
  readonly actionType: ActionType;
  readonly actionTypeResult: number;
  readonly costPerActionType: number;
  readonly spend: number;
  readonly cpc: number;
  readonly cpm: number;
  readonly ctr: number;

  constructor(insights: InsightsDTO) {
    this.actionType = insights.actionType;
    this.actionTypeResult = insights.actionTypeResult;
    this.costPerActionType = insights.costPerActionType;
    this.spend = insights.spend;
    this.cpc = insights.cpc;
    this.cpm = insights.cpm;
    this.ctr = insights.ctr;
  }
}

export interface InsightsDTO {
  actionType: ActionType;
  actionTypeResult: number;
  costPerActionType: number;
  spend: number;
  cpc: number;
  cpm: number;
  ctr: number;
}
