export type ServiceOptions<TResult, TError> = {
  onSuccess?: (data: TResult) => void;
  onError?: (error: TError) => void;
};
