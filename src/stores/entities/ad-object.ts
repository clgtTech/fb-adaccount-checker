import * as mobx from 'mobx';
import { AsyncStatus, OperationResult } from '../../types';

export class AdObject {
  protected fieldStatus = new Map<string, AsyncStatus>();
  protected fieldError = new Map<string, Error | null>();

  constructor() {
    mobx.makeObservable(this, {
    // @ts-ignore
      fieldStatus: mobx.observable,
      fieldError: mobx.observable,
    });
  }

  getFieldStatus(field: string): AsyncStatus {
    return this.fieldStatus.get(field) || AsyncStatus.idle;
  }

  setFieldStatus(field: string, status: AsyncStatus): void {
    this.fieldStatus.set(field, status);
  }

  getFieldError(field: string): Error | null {
    return this.fieldError.get(field) || null;
  }

  setFieldError(field: string, error: Error | null): void {
    this.fieldError.set(field, error);
  }

  isFieldUpdating(field: string): boolean {
    return this.getFieldStatus(field) === AsyncStatus.pending;
  }

  updateFieldValue(config: {
    field: string;
    updater: () => Promise<OperationResult>;
    options?: {
      onSuccess?: () => void;
      onError?: (e: Error) => void;
    };
  }) {
    this.setFieldStatus(config.field, AsyncStatus.pending);
    config
      .updater()
      .then(() => {
        config.options?.onSuccess?.();
        this.setFieldError(config.field, null);
        this.setFieldStatus(config.field, AsyncStatus.success);
      })
      .catch((e) => {
        config.options?.onError?.(e);
        this.setFieldError(config.field, e);
        this.setFieldStatus(config.field, AsyncStatus.error);
      });
  }
}
