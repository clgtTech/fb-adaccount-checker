import React from 'react';
import styles from './access-token-input.module.css';

export type AccessTokenInputProps = {
  isDisabled?: boolean;
  isPending?: boolean;
  value: string;
  onValueChange: (accessToken: string) => void;
};

export function AccessTokenInput({
  isDisabled,
  value,
  onValueChange,
}: AccessTokenInputProps) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        id="accessToken"
        title="Токен доступа"
        placeholder="Введите токен доступа"
        disabled={isDisabled}
        value={value}
        onChange={(event) => onValueChange(event.currentTarget.value)}
      />
    </div>
  );
}

export function Test(props: { test: number }) {
  return <div>{props.test}</div>;
}
