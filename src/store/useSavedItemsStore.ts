/*
찜하기 
*/

import { create } from 'zustand';

interface SavedItemsState {
  savedProductIds: Set<number>;
  touchedProductIds: Set<number>;
  toggleSaveProduct: (rawProductId: number) => void;
  getSavedState: (rawProductId: number, fallback?: boolean) => boolean;
  setSavedProductIds: (ids: number[] | Set<number>) => void;
}

export const useSavedItemsStore = create<SavedItemsState>((set, get) => ({
  // 초기 상태 (rawProductId Set)
  savedProductIds: new Set(),
  touchedProductIds: new Set(),

  // 상품ID(rawProductId) 기준으로 저장 상태 토글
  toggleSaveProduct: (rawProductId) =>
    set((state) => {
      const newSavedIds = new Set(state.savedProductIds);
      const newTouchedIds = new Set(state.touchedProductIds);

      if (newSavedIds.has(rawProductId)) {
        newSavedIds.delete(rawProductId); // 저장 취소
      } else {
        newSavedIds.add(rawProductId); // 저장
      }

      newTouchedIds.add(rawProductId);

      return { savedProductIds: newSavedIds, touchedProductIds: newTouchedIds };
    }),

  // 찜 상태 읽기
  getSavedState: (rawProductId, fallback = false) => {
    const { savedProductIds, touchedProductIds } = get();

    return touchedProductIds.has(rawProductId)
      ? savedProductIds.has(rawProductId)
      : fallback;
  },

  // 서버 찜 목록으로 전역 상태 초기화(새로고침 시 하트 복구)
  setSavedProductIds: (ids) => {
    const next = new Set(ids);
    const prev = get().savedProductIds; // 현재 전역 상태에 저장되어 있는 set 가져오기

    // 현재와 가져온 set 비교 (크기, 원소)
    const isEqual =
      prev.size === next.size && [...next].every((id) => prev.has(id));
    if (isEqual) return; // no-op (아무 동작 X)
    set({ savedProductIds: next }); // 내용이 달라진 경우에만 새로운 set으로 갱신
  },
}));
