import { useMutation } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';

export const postFurnitureLog = async (): Promise<void> => {
  return request({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.ANALYTICS.FURNITURE_LOGS,
  });
};

export const useFurnitureLogMutation = () => {
  return useMutation({
    mutationFn: postFurnitureLog,
  });
};
