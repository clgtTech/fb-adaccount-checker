import {
  AccountDisableReason,
  AccountStatus,
  Currency,
  FundingSourceType,
} from '../../../../types';
import { API_OBJECTS_LIMIT } from '../../../../constants';
import { makeRequest, RequestConfig } from '../../make-request';
import { adAccountGraphApi, FacebookAdAccount } from '../ad-account-graph-api';

jest.mock('../../make-request');
const makeRequestMock = makeRequest as jest.MockedFunction<typeof makeRequest>;

afterEach(() => {
  makeRequestMock.mockClear();
});

describe('#helpers.getActId()', () => {
  it('should return account id which suitable for API request', () => {
    expect(adAccountGraphApi.helpers.getActId('123')).toBe('act_123');
  });
});

describe('#getAdAccounts()', () => {
  const userId = '123';
  const requestConfig: RequestConfig = {
    url: `/${userId}/adaccounts`,
    params: {
      limit: API_OBJECTS_LIMIT,
      fields: [
        'account_id',
        'account_status',
        'disable_reason',
        'name',
        'currency',
        'timezone_id',
        'timezone_name',
        'adtrust_dsl',
        'funding_source_details{id,type,display_string}',
        'insights.date_preset(lifetime){spend,ctr,cpc,cpm}',
      ],
    },
    options: {
      shouldUseUserAccessToken: true,
    },
  };
  const requiredAdAccountData: FacebookAdAccount = {
    account_id: '123',
    account_status: AccountStatus.ACTIVE,
    disable_reason: AccountDisableReason.NONE,
    name: 'Test Ad Account',
    currency: Currency.USD,
    timezone_id: 1,
    timezone_name: 'UTC',
    adtrust_dsl: 250,
  };

  it('should return list of ad accounts with required fields', async () => {
    const expectedAdAccountData = { ...requiredAdAccountData };
    makeRequestMock.mockResolvedValue({
      data: [expectedAdAccountData],
    });

    const adAccount = await adAccountGraphApi.getAdAccounts(userId);

    expect(makeRequestMock).toHaveBeenCalledTimes(1);
    expect(makeRequestMock).toHaveBeenCalledWith(requestConfig);
    expect(adAccount).toEqual([
      {
        id: expectedAdAccountData.account_id,
        status: expectedAdAccountData.account_status,
        disableReason: expectedAdAccountData.disable_reason,
        name: expectedAdAccountData.name,
        currency: expectedAdAccountData.currency,
        limitPerDay: expectedAdAccountData.adtrust_dsl,
        timeZone: expectedAdAccountData.timezone_name,
        fundingSourceType: undefined,
        displayedPaymentMethod: undefined,
        spend: 0,
        ctr: 0,
        cpc: 0,
        cpm: 0,
      },
    ]);
  });

  it('should return list of ad accounts with required fields and funding source', async () => {
    const expectedAdAccountData = {
      ...requiredAdAccountData,
      funding_source_details: {
        id: '456',
        type: FundingSourceType.CREDIT_CARD,
        display_string: 'Visa *1234',
      },
    };
    makeRequestMock.mockResolvedValue({
      data: [expectedAdAccountData],
    });

    const adAccount = await adAccountGraphApi.getAdAccounts(userId);

    expect(makeRequestMock).toHaveBeenCalledTimes(1);
    expect(makeRequestMock).toHaveBeenCalledWith(requestConfig);
    expect(adAccount).toEqual([
      {
        id: expectedAdAccountData.account_id,
        status: expectedAdAccountData.account_status,
        disableReason: expectedAdAccountData.disable_reason,
        name: expectedAdAccountData.name,
        currency: expectedAdAccountData.currency,
        limitPerDay: expectedAdAccountData.adtrust_dsl,
        timeZone: expectedAdAccountData.timezone_name,
        fundingSourceType: expectedAdAccountData.funding_source_details.type,
        displayedPaymentMethod:
          expectedAdAccountData.funding_source_details.display_string,
        spend: 0,
        ctr: 0,
        cpc: 0,
        cpm: 0,
      },
    ]);
  });

  it('should return list of ad accounts with required fields and insights', async () => {
    const expectedLimit = 10;
    const expectedAdAccountData = {
      ...requiredAdAccountData,
      insights: {
        data: [
          {
            date_start: new Date().toISOString(),
            date_stop: new Date().toISOString(),
            spend: '250.58',
            ctr: '0.34',
            cpc: '0.08',
            cpm: '1.27',
          },
        ],
        paging: {
          cursors: {
            before: 'abc',
            after: 'def',
          },
        },
      },
    };
    makeRequestMock.mockResolvedValue({
      data: [expectedAdAccountData],
    });

    const adAccount = await adAccountGraphApi.getAdAccounts(
      userId,
      expectedLimit
    );

    expect(makeRequestMock).toHaveBeenCalledTimes(1);
    expect(makeRequestMock).toHaveBeenCalledWith({
      ...requestConfig,
      params: {
        ...requestConfig.params,
        limit: expectedLimit,
      },
    });
    expect(adAccount).toEqual([
      {
        id: expectedAdAccountData.account_id,
        status: expectedAdAccountData.account_status,
        disableReason: expectedAdAccountData.disable_reason,
        name: expectedAdAccountData.name,
        currency: expectedAdAccountData.currency,
        limitPerDay: expectedAdAccountData.adtrust_dsl,
        timeZone: expectedAdAccountData.timezone_name,
        fundingSourceType: undefined,
        displayedPaymentMethod: undefined,
        spend: Number(expectedAdAccountData.insights.data[0].spend),
        ctr: Number(expectedAdAccountData.insights.data[0].ctr),
        cpc: Number(expectedAdAccountData.insights.data[0].cpc),
        cpm: Number(expectedAdAccountData.insights.data[0].cpm),
      },
    ]);
  });
});
