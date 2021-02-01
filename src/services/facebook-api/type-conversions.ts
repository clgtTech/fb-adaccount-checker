import { ActionIndicator, ActionType } from '../../types';

export function toNumber(value: string | number | null | undefined): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function toActionType(indicator: ActionIndicator): ActionType {
  return indicator.replace('actions:', '') as ActionType;
}
