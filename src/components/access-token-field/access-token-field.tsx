import * as React from 'react';
import {
  classNames,
  uniqueId,
  Spinner,
  TextField,
  TextFieldHtmlAttrs,
} from 'draft-components';
import { BoxIcon } from 'components/box-icon';
import styles from './access-token-field.module.scss';

export interface TokenFieldProps extends TextFieldHtmlAttrs {
  label?: React.ReactNode;
  isLoading?: boolean;
  delay?: number;
  value: string;
  onValueChange: (value: string) => void;
}

export function AccessTokenField({
  id,
  className,
  readOnly,
  label = 'Токен доступа:',
  placeholder = 'введите токен доступа',
  isLoading,
  delay = 500,
  value,
  onChange,
  onValueChange,
  ...props
}: TokenFieldProps) {
  const [inputValue, setInputValue] = React.useState(value || '');
  const inputId = React.useRef(id || uniqueId('access-token-'));
  const debouncedOnValueChange = React.useMemo(() => {
    let timeout: number;

    return (value: string): void => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        onValueChange(value);
      }, delay);
    };
  }, [onValueChange, delay]);

  React.useEffect(() => {
    setInputValue((inputValue) => (inputValue !== value ? value : inputValue));
  }, [value]);

  return (
    <TextField
      {...props}
      className={classNames(className, styles.wrapper)}
      hasFullWidth={true}
      size="lg"
      id={inputId.current}
      readOnly={readOnly || isLoading}
      placeholder={placeholder}
      leadingAddOn={
        <label className={styles.label} htmlFor={inputId.current}>
          <BoxIcon
            className={styles.fbIcon}
            icon="facebook-circle"
            linearGradient={['to bottom', '#19afff', '#0062e0']}
          />
          <span className={styles.labelText}>{label}</span>
        </label>
      }
      trailingAddOn={isLoading ? <Spinner size={18} /> : null}
      value={inputValue}
      onChange={(event) => {
        const value = event.target.value;
        setInputValue(value);
        debouncedOnValueChange(value);
        onChange?.(event);
      }}
    />
  );
}
