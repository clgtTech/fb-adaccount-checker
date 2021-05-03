import * as React from 'react';
import { classNames, uniqueId } from 'draft-components';
import { EntityGroup } from '../../stores/entities';
import styles from './color-picker.module.scss';

export interface ColorPickerProps
  extends React.ComponentPropsWithoutRef<'div'> {
  colors?: string[];
  name?: string;
  selectedColor: string;
  onColorChange(color: string): void;
}

export function ColorPicker({
  className,
  colors = EntityGroup.Colors,
  name = uniqueId('color-picker-'),
  selectedColor,
  onColorChange,
  ...props
}: ColorPickerProps) {
  return (
    <div {...props} className={classNames(className, styles.container)}>
      {colors?.map((color) => {
        return (
          <label key={color} className={styles.color}>
            <input
              className={styles.itemInput}
              type="radio"
              name={name}
              value={color}
              checked={color === selectedColor}
              onChange={() => {
                onColorChange(color);
              }}
            />
            <span
              style={{ color }}
              className={styles.itemColor}
              aria-hidden={true}
            />
          </label>
        );
      })}
    </div>
  );
}
