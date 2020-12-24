import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import focusManager from 'focus-manager';
import { usePopper } from 'react-popper';
import styles from './inline-edit.module.css';

export type InlineEditProps = {
  className?: string;
  a11yTitle?: string;
  label?: React.ReactNode;
  cancelButtonLabel?: React.ReactNode;
  saveButtonLabel?: React.ReactNode;
  children: React.ReactNode;
  initialValue: string;
  onValueChange: (value: string) => void;
};

export function InlineEdit({
  className,
  a11yTitle,
  label,
  cancelButtonLabel = 'Отменить',
  saveButtonLabel = 'Сохранить',
  children,
  initialValue,
  onValueChange,
}: InlineEditProps) {
  type MaybeElement = HTMLElement | null;
  const [referenceElement, setReferenceElement] = useState<MaybeElement>(null);
  const [popperElement, setPopperElement] = useState<MaybeElement>(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
    }
  );

  const idRef = useRef(uniqueId('INPUT-'));
  const [isInputShown, setIsInputShown] = useState(false);
  const [value, setValue] = useState(initialValue);
  const closeMenu = useCallback(() => {
    setValue(initialValue);
    setIsInputShown(false);
  }, [initialValue]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!referenceElement || !popperElement) {
      return;
    }

    const onWindowKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };
    const onBodyClick = (event: MouseEvent) => {
      if (!popperElement.contains(event.target as Node)) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', onWindowKeydown);
    window.document.body.addEventListener('click', onBodyClick);
    setTimeout(() => {
      focusManager.capture(popperElement);
    });

    return () => {
      window.removeEventListener('keydown', onWindowKeydown);
      window.document.body.removeEventListener('click', onBodyClick);
      focusManager.release(referenceElement);
    };
  }, [referenceElement, popperElement, closeMenu]);

  return (
    <div className={classNames(className, styles.container)}>
      <div
        ref={setReferenceElement}
        className={classNames(styles.contents, {
          [styles.contents_editing]: isInputShown,
        })}
        title={a11yTitle || 'Редактировать'}
        tabIndex={0}
        onClick={() => {
          setIsInputShown(true);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            setIsInputShown(true);
          }
        }}
      >
        {children}
      </div>
      {isInputShown
        ? ReactDOM.createPortal(
            <div
              {...attributes.popper}
              ref={setPopperElement}
              style={popperStyles.popper}
              className={styles.menu}
            >
              {label ? (
                <label className={styles.label} htmlFor={idRef.current}>
                  {label}
                </label>
              ) : null}

              <input
                id={idRef.current}
                className={styles.input}
                type="text"
                value={value}
                onChange={(event) => {
                  setValue(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.stopPropagation();
                    setIsInputShown(false);
                    onValueChange(value);
                  }
                }}
              />

              <div className={styles.actions}>
                <button className={styles.actionBtn} onClick={closeMenu}>
                  {cancelButtonLabel}
                </button>
                <button
                  className={classNames(
                    styles.actionBtn,
                    styles.actionBtn_primary
                  )}
                  onClick={() => {
                    setIsInputShown(false);
                    onValueChange(value);
                  }}
                >
                  {saveButtonLabel}
                </button>
              </div>
            </div>,
            document.getElementById('popper-root') || document.body
          )
        : null}
    </div>
  );
}
