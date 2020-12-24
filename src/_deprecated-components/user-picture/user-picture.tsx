import * as React from 'react';
import classNames from 'classnames';
import { QueryStatus } from 'react-query';
import { Loader } from '_deprecated-components/loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons/faUserSecret';
import styles from './user-picture.module.css';

export type UserPictureProps = {
  className?: string;
  url: string;
  altText: string;
  width?: number;
  height?: number;
};

export function UserPicture({
  className,
  url,
  altText,
  width,
  height,
}: UserPictureProps) {
  const [status, setStatus] = React.useState<QueryStatus>(QueryStatus.Idle);

  React.useEffect(() => {
    const imgEl = document.createElement('img');

    setStatus(QueryStatus.Loading);
    imgEl.setAttribute('src', url);

    imgEl.addEventListener('load', () => {
      setStatus(QueryStatus.Success);
    });

    imgEl.addEventListener('error', () => {
      setStatus(QueryStatus.Error);
    });
  }, [url]);

  if (status === QueryStatus.Idle || status === QueryStatus.Loading) {
    return (
      <div className={classNames(className, styles.skeleton)}>
        <Loader />
      </div>
    );
  }

  if (status === QueryStatus.Error) {
    return (
      <div className={classNames(className, styles.fallback)}>
        <FontAwesomeIcon className={styles.fallbackIcon} icon={faUserSecret} />
      </div>
    );
  }

  return (
    <img
      className={classNames(className, styles.image)}
      src={url}
      alt={altText}
      width={width}
      height={height}
    />
  );
}
