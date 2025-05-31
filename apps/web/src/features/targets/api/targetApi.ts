import apiClient from '../../../common/api/apiClient';
import { Target } from '@maritime/common';

export const fetchTargets = async (): Promise<Target[]> => {
  const { data } = await apiClient.get<Target[]>('/targets');
  return data;
};
