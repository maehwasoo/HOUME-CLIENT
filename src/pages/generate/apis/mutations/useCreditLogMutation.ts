import { useMutation } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';

export const postCreditLog = async (): Promise<void> => {
  return request({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.ANALYTICS.CREDIT_LOGS,
  });
};

export const useCreditLogMutation = () => {
  return useMutation({
    mutationFn: postCreditLog,
  });
};
