import { User, UserApi } from '../../../stores/user-store';
import { makeRequest } from '../make-request';

/**
 * @see https://developers.facebook.com/docs/graph-api/using-graph-api#me
 * @see https://developers.facebook.com/docs/graph-api/reference/user
 */
export type FacebookUser = {
  id: string;
  name: string;
  picture: {
    data: {
      width: number;
      height: number;
      url: string;
    };
  };
};

export class UserGraphApi implements UserApi {
  async getUserRelatedToAccessToken(accessToken: string): Promise<User> {
    const response = await makeRequest<FacebookUser>({
      url: '/me',
      params: {
        access_token: accessToken,
        fields: ['id', 'name', 'picture.width(200).height(200)'],
      },
    });
    return new User({
      accessToken,
      id: response.id,
      name: response.name,
      pictureUrl: response.picture?.data?.url,
      addedAt: new Date(),
    });
  }
}
