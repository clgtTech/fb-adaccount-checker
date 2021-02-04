import { AdAccount } from '../stores/entities';
import { Formatters } from '../services/intl';
import { AccountDisableReason, AccountStatus } from '../types';

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
    this.status = AdAccountPresenter.getDisplayedStatus(adAccount.status);
    this.disableReason = AdAccountPresenter.getDisplayedDisableReason(
      adAccount.disableReason
    );
    this.shouldShowDisableReason = adAccount.disableReason !== 0;
    this.isActive = adAccount.isAdRunningOrInReview();
  }

  static getDisplayedStatus(status: AccountStatus): string {
    switch (status) {
      case AccountStatus.ACTIVE:
        return 'Active';
      case AccountStatus.DISABLED:
        return 'Disabled';
      case AccountStatus.UNSETTLED:
        return 'Unsettled';
      case AccountStatus.PENDING_RISK_REVIEW:
        return 'Pending Risk Review';
      case AccountStatus.PENDING_SETTLEMENT:
        return 'Pending Settlement';
      case AccountStatus.IN_GRACE_PERIOD:
        return 'In Grace Period';
      case AccountStatus.PENDING_CLOSURE:
        return 'Pending Closure';
      case AccountStatus.CLOSED:
        return 'Closed';
      case AccountStatus.ANY_ACTIVE:
        return 'Any Active';
      case AccountStatus.ANY_CLOSED:
        return 'Any Closed';
      default:
        return '';
    }
  }

  static getDisplayedDisableReason(
    disableReason: AccountDisableReason
  ): string {
    switch (disableReason) {
      case AccountDisableReason.NONE:
        return 'None';
      case AccountDisableReason.ADS_INTEGRITY_POLICY:
        return 'Ads Integrity Policy';
      case AccountDisableReason.ADS_IP_REVIEW:
        return 'Ads Ip Review';
      case AccountDisableReason.RISK_PAYMENT:
        return 'Risk Payment';
      case AccountDisableReason.GRAY_ACCOUNT_SHUT_DOWN:
        return 'Gray Account Shut Down';
      case AccountDisableReason.ADS_AFC_REVIEW:
        return 'Ads Afc Review';
      case AccountDisableReason.BUSINESS_INTEGRITY_RAR:
        return 'Business Integrity Rar';
      case AccountDisableReason.PERMANENT_CLOSE:
        return 'Permanent Close';
      case AccountDisableReason.UNUSED_RESELLER_ACCOUNT:
        return 'Unused Reseller Account';
      case AccountDisableReason.UNUSED_ACCOUNT:
        return 'Unused Account';
      default:
        return '';
    }
  }
}
