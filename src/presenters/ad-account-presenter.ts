import { AdAccount } from '../stores/ad-account-store';
import { Formatters } from '../services/intl';

export class AdAccountPresenter {
  id: string;
  name: string;
  spend: string;
  ctr: string;
  status: string;
  isActive: boolean;
  disableReason: string;
  shouldShowDisableReason: boolean;

  constructor(adAccount: AdAccount) {
    this.id = adAccount.id;
    this.name = adAccount.name;
    this.spend = Formatters.formatMonetaryValue(
      adAccount.spend,
      adAccount.currency
    );
    this.ctr = Formatters.formatNumericValue(adAccount.ctr, 3);
    this.status = AdAccountPresenter.Status[adAccount.status];
    this.isActive = adAccount.isAdRunningOrInReview();
    this.disableReason =
      AdAccountPresenter.DisableReason[adAccount.disableReason];
    this.shouldShowDisableReason = adAccount.disableReason !== 0;
  }

  static Status: Record<AdAccount['status'], string> = {
    1: 'Active',
    2: 'Disabled',
    3: 'Unsettled',
    7: 'Pending Risk Review',
    8: 'Pending Settlement',
    9: 'In Grace Period',
    100: 'Pending Closure',
    101: 'Closed',
    201: 'Any Active',
    202: 'Any Closed',
  };

  static DisableReason: Record<AdAccount['disableReason'], string> = {
    0: 'None',
    1: 'Ads Integrity Policy',
    2: 'Ads Ip Review',
    3: 'Risk Payment',
    4: 'Gray Account Shut Down',
    5: 'Ads Afc Review',
    6: 'Business Integrity Rar',
    7: 'Permanent Close',
    8: 'Unused Reseller Account',
    9: 'Unused Account',
  };
}
