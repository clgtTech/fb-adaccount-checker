import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  classNames,
  uniqueId,
  Spinner,
  SvgIcon,
  Icons,
  TextField,
  TextFieldHtmlAttrs,
} from 'draft-components';
import styles from './access-token-field.module.scss';

export interface TokenFieldProps extends TextFieldHtmlAttrs {
  label?: React.ReactNode;
  isLoading?: boolean;
  delay?: number;
  value: string;
  onValueChange: (value: string) => void;
}

export function AccessTokenField({
  id = '',
  className,
  readOnly,
  label,
  placeholder,
  isLoading,
  delay = 500,
  value,
  onChange,
  onValueChange,
  ...props
}: TokenFieldProps) {
  const intl = useIntl();
  const inputId = React.useRef(id);
  const [inputValue, setInputValue] = React.useState(value || '');
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
      id={inputId.current || (inputId.current = uniqueId('access-token-'))}
      readOnly={readOnly || isLoading}
      placeholder={
        placeholder ??
        intl.formatMessage({
          id: 'components.AccessTokenField.placeholder',
          defaultMessage: 'paste access token',
        })
      }
      leadingAddOn={
        <label className={styles.label} htmlFor={inputId.current}>
          <SvgIcon
            icon={Icons.facebookCircle}
            linearGradient={['to bottom', '#19afff', '#0062e0']}
            size="lg"
          />
          <span className={styles.labelText}>
            {label ?? (
              <FormattedMessage
                id="components.AccessTokenField.label"
                defaultMessage="Access Token:"
              />
            )}
          </span>
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
