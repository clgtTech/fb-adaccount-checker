import * as React from 'react';
import { Avatar, AvatarProps } from 'draft-components';
import { UserPresenter } from '../../presenters/user-presenter';

export interface UserAvatarProps extends AvatarProps {
  userPresenter: UserPresenter;
}

export function UserAvatar({ userPresenter, ...props }: UserAvatarProps) {
  const [isPictureUrlValid, setIsPictureUrlValid] = React.useState(true);

  const pictureUrl = userPresenter.pictureUrl;
  React.useLayoutEffect(() => {
    if (pictureUrl) {
      const image = document.createElement('img');
      image.addEventListener('load', () => {
        setIsPictureUrlValid(true);
      });
      image.addEventListener('error', () => {
        setIsPictureUrlValid(false);
      });
      image.setAttribute('src', pictureUrl);
    } else {
      setIsPictureUrlValid(false);
    }
  }, [pictureUrl]);

  return (
    <Avatar
      {...props}
      size="lg"
      color={getAvatarColor(userPresenter.id)}
      src={isPictureUrlValid ? pictureUrl : undefined}
      altText={userPresenter.name}
      initials={userPresenter.initials}
    />
  );
}

function getAvatarColor(userId: UserPresenter['id']): AvatarProps['color'] {
  if (userId.endsWith('1')) {
    return 'blue';
  }
  if (userId.endsWith('2')) {
    return 'cyan';
  }
  if (userId.endsWith('3')) {
    return 'red';
  }
  if (userId.endsWith('4')) {
    return 'green';
  }
  if (userId.endsWith('5')) {
    return 'lime';
  }
  if (userId.endsWith('6')) {
    return 'indigo';
  }
  if (userId.endsWith('7')) {
    return 'yellow';
  }
  if (userId.endsWith('8')) {
    return 'orange';
  }
  return 'gray';
}
