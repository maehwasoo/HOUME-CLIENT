import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useCurationCacheStore } from '@pages/generate/stores/useCurationCacheStore';
import type { FurnitureProductsInfoResponse } from '@pages/generate/types/furniture';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys, type ProductsQueryVariables } from '@constants/queryKey';

type ProductsQueryKey = ReturnType<
  typeof queryKeys.furniture.productsGroup | typeof queryKeys.furniture.products
>;

export const getGeneratedImageProducts = async (
  imageId: number,
  categoryId: number
): Promise<FurnitureProductsInfoResponse> => {
  return request<FurnitureProductsInfoResponse>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.GENERATE.CURATION_PRODUCTS(imageId, categoryId),
  });
};

export const useGeneratedProductsQuery = (
  groupId: number | null,
  imageId: number | null,
  categoryId: number | null
) => {
  const productCacheEntry = useCurationCacheStore((state) =>
    groupId !== null && categoryId !== null
      ? (state.groups[groupId]?.products[categoryId] ?? null)
      : null
  );
  const saveGroupProducts = useCurationCacheStore(
    (state) => state.saveProducts
  );

  const productQueryVars: ProductsQueryVariables = {
    groupId,
    imageId,
    categoryId,
  };

  const productsQueryKey: ProductsQueryKey =
    groupId !== null
      ? queryKeys.furniture.productsGroup(productQueryVars)
      : queryKeys.furniture.products(productQueryVars);

  const initialProductsResponse =
    groupId !== null &&
    imageId !== null &&
    productCacheEntry &&
    productCacheEntry.imageId === imageId
      ? productCacheEntry.response
      : undefined;

  const query = useQuery<
    FurnitureProductsInfoResponse,
    Error,
    FurnitureProductsInfoResponse,
    ProductsQueryKey
  >({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps -- imageId, categoryId는 productsQueryKey(factory) 내부에 포함됨
    queryKey: productsQueryKey,
    queryFn: () => getGeneratedImageProducts(imageId!, categoryId!),
    enabled: Boolean(imageId) && categoryId !== null,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    ...(initialProductsResponse
      ? { initialData: initialProductsResponse }
      : {}),
  });

  useEffect(() => {
    if (groupId === null || imageId === null || categoryId === null) return;
    if (!query.data) return;
    const groupCache = useCurationCacheStore.getState().groups[groupId];
    const existing = groupCache?.products[categoryId] ?? null;
    if (existing?.imageId === imageId && existing.response === query.data) {
      return;
    }
    saveGroupProducts({
      groupId,
      imageId,
      categoryId,
      response: query.data,
    });
  }, [groupId, imageId, categoryId, query.data, saveGroupProducts]);

  return query;
};
