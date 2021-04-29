import { ActionType } from '../../types';

export class Insights {
  readonly targetAction?: ActionType;
  readonly targetActionResult: number;
  readonly targetActionCost: number;
  readonly actions: ActionStats;
  readonly costPerAction: ActionStats;
  readonly spend: number;
  readonly cpc: number;
  readonly cpm: number;
  readonly ctr: number;

  constructor(insightsDTO: InsightsDTO) {
    this.targetAction = insightsDTO.targetAction
      ? insightsDTO.targetAction
      : undefined;
    this.targetActionResult = insightsDTO.targetActionResult;
    this.targetActionCost = insightsDTO.targetActionCost;
    this.actions = insightsDTO.actions;
    this.costPerAction = insightsDTO.costPerAction;
    this.spend = insightsDTO.spend;
    this.cpc = insightsDTO.cpc;
    this.cpm = insightsDTO.cpm;
    this.ctr = insightsDTO.ctr;
  }
}

export type ActionStats = {
  [key in ActionType]?: number;
};

export interface InsightsDTO {
  targetAction?: ActionType | null;
  targetActionResult: number;
  targetActionCost: number;
  actions: ActionStats;
  costPerAction: ActionStats;
  spend: number;
  cpc: number;
  cpm: number;
  ctr: number;
}
