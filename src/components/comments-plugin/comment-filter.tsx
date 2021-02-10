import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ScopeButtons, ScopeButtonsProps } from 'draft-components';
import { CommentFilter as Filter } from '../../types';
import { Messages } from '../../services/intl';
import styles from './comment-filter.module.scss';

export interface CommentFilterProps extends ScopeButtonsProps {
  allowedFilters?: Filter[];
  filter: Filter;
  onFilterChange(filter: Filter): void;
}

export function CommentFilter({
  allowedFilters = [Filter.ALL, Filter.VISIBLE, Filter.HIDDEN],
  filter: activeFilter,
  onFilterChange,
  ...props
}: CommentFilterProps) {
  return (
    <ScopeButtons {...props}>
      {allowedFilters?.map((filter) => (
        <ScopeButtons.Button
          key={filter}
          className={styles.scopeButton}
          data-value={filter}
          isActive={filter === activeFilter}
          onClick={() => onFilterChange(filter)}
        >
          <FormattedMessage {...Messages.Enums.CommentFilters[filter]} />
        </ScopeButtons.Button>
      ))}
    </ScopeButtons>
  );
}
