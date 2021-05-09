import { Task } from '../../../../types';
import { API_OBJECTS_LIMIT } from '../../../../constants';
import { makeRequest, RequestConfig } from '../../make-request';
import { userGraphApi, FacebookUser, FacebookPage } from '../user-grap-api';

jest.mock('../../make-request');
const makeRequestMock = makeRequest as jest.MockedFunction<typeof makeRequest>;

afterEach(() => {
  makeRequestMock.mockClear();
});

describe('#getUserRelatedToAccessToken()', () => {
  const accessToken = 'xyz';
  const requestConfig: RequestConfig = {
    url: '/me',
    params: {
      access_token: accessToken,
      fields: [
        'id',
        'name',
        'picture.width(200).height(200)',
        `accounts.limit(${API_OBJECTS_LIMIT}){id,name,access_token,tasks}`,
      ],
    },
  };
  const requiredUserData: FacebookUser = {
    id: '123',
    name: 'John Doe',
  };
  const requiredPageData: FacebookPage = {
    id: '456',
    name: 'Test Page',
    access_token: 'abc',
  };

  it('should return user only with required fields', async () => {
    const expectedUserData = { ...requiredUserData };
    makeRequestMock.mockResolvedValue(expectedUserData);

    const user = await userGraphApi.getUserRelatedToAccessToken(accessToken);

    expect(makeRequestMock).toHaveBeenCalledTimes(1);
    expect(makeRequestMock).toHaveBeenCalledWith(requestConfig);
    expect(user).toEqual({
      accessToken,
      id: expectedUserData.id,
      name: expectedUserData.name,
      addedAt: expect.any(Date),
      pictureUrl: undefined,
      pages: [],
    });
  });

  it('should return user with required fields and pictureUrl', async () => {
    const expectedUserData = {
      ...requiredUserData,
      picture: {
        data: {
          width: 200,
          height: 200,
          url: 'https://test.local/john-doe.png',
        },
      },
    };
    makeRequestMock.mockResolvedValue(expectedUserData);

    const user = await userGraphApi.getUserRelatedToAccessToken(accessToken);

    expect(makeRequestMock).toHaveBeenCalledTimes(1);
    expect(makeRequestMock).toHaveBeenCalledWith(requestConfig);
    expect(user).toEqual({
      accessToken,
      id: expectedUserData.id,
      name: expectedUserData.name,
      addedAt: expect.any(Date),
      pictureUrl: expectedUserData.picture.data.url,
      pages: [],
    });
  });

  it('should return user with required fields and list of pages', async () => {
    const expectedUserData = {
      ...requiredUserData,
      accounts: {
        data: [requiredPageData],
      },
    };
    makeRequestMock.mockResolvedValue(expectedUserData);

    const user = await userGraphApi.getUserRelatedToAccessToken(accessToken);

    expect(makeRequestMock).toHaveBeenCalledTimes(1);
    expect(makeRequestMock).toHaveBeenCalledWith(requestConfig);
    expect(user).toEqual({
      accessToken,
      id: expectedUserData.id,
      name: expectedUserData.name,
      addedAt: expect.any(Date),
      pictureUrl: undefined,
      pages: [
        {
          id: expectedUserData.accounts.data[0].id,
          name: expectedUserData.accounts.data[0].name,
          accessToken: expectedUserData.accounts.data[0].access_token,
          tasks: undefined,
        },
      ],
    });
  });

  it('should return user with required fields and list of pages with tasks', async () => {
    const expectedUserData = {
      ...requiredUserData,
      accounts: {
        data: [
          {
            ...requiredPageData,
            tasks: [Task.MANAGE, Task.MODERATE],
          },
        ],
      },
    };
    makeRequestMock.mockResolvedValue(expectedUserData);

    const user = await userGraphApi.getUserRelatedToAccessToken(accessToken);

    expect(makeRequestMock).toHaveBeenCalledTimes(1);
    expect(makeRequestMock).toHaveBeenCalledWith(requestConfig);
    expect(user).toEqual({
      accessToken,
      id: expectedUserData.id,
      name: expectedUserData.name,
      addedAt: expect.any(Date),
      pictureUrl: undefined,
      pages: [
        {
          id: expectedUserData.accounts.data[0].id,
          name: expectedUserData.accounts.data[0].name,
          accessToken: expectedUserData.accounts.data[0].access_token,
          tasks: expectedUserData.accounts.data[0].tasks,
        },
      ],
    });
  });
});
