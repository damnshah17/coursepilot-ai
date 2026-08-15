export interface ApiSuccessResponse<TData, TMeta = Record<string, never>> {
  success: true;
  data: TData;
  meta: TMeta;
}

export interface ApiErrorDetails {
  [key: string]: unknown;
}

export interface ApiErrorBody {
  code: string;
  message: string;
  details: ApiErrorDetails;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorBody;
}

export function createSuccessResponse<TData, TMeta = Record<string, never>>(
  data: TData,
  meta = {} as TMeta,
): ApiSuccessResponse<TData, TMeta> {
  return {
    success: true,
    data,
    meta,
  };
}

export function createErrorResponse(
  code: string,
  message: string,
  details: ApiErrorDetails = {},
): ApiErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
  };
}
