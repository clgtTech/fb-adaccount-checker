import { Task } from '../../../types';
import { UserApi } from '../../../stores/entities';
import { makeRequest } from '../make-request';
import { API_OBJECTS_LIMIT } from '../../../constants';

/**
 * @see https://developers.facebook.com/docs/graph-api/reference/page
 * @see https://developers.facebook.com/docs/facebook-login/access-tokens/#pagetokens
 */
export interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
  tasks?: Task[];
}

/**
 * @see https://developers.facebook.com/docs/graph-api/using-graph-api#me
 * @see https://developers.facebook.com/docs/graph-api/reference/user
 */
export interface FacebookUser {
  id: string;
  name: string;
  picture?: {
    data: {
      width: number;
      height: number;
      url: string;
    };
  };
  accounts?: {
    data: FacebookPage[];
  };
}

const getUserRelatedToAccessToken: UserApi['getUserRelatedToAccessToken'] = async (
  accessToken
) => {
  const user = await makeRequest<FacebookUser>({
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
  });
  const pages = user.accounts?.data;
  return {
    accessToken,
    id: user.id,
    name: user.name,
    addedAt: new Date(),
    pictureUrl: user.picture?.data?.url,
    pages: Array.isArray(pages)
      ? pages.map((page) => ({
          id: page.id,
          name: page.name,
          accessToken: page.access_token,
          tasks: page.tasks,
        }))
      : [],
  };
};

export const userGraphApi = {
  getUserRelatedToAccessToken,
};
