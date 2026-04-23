/**
 * MSW가 사용할 가짜 API 응답 정의
 */

import { http, HttpResponse } from 'msw';

// request()는 response.data.data를 반환하므로 BaseResponse<T> 형태로 감싸야 함
// BaseResponse: { code: number; message: string; data: T }
export const handlers = [
  http.get('*/api/v1/housing-options', () => {
    return HttpResponse.json({
      code: 200,
      message: 'OK',
      data: {
        houseTypes: [
          { code: 'APARTMENT', label: '아파트' },
          { code: 'OFFICETEL', label: '오피스텔' },
        ],
        roomTypes: [
          { code: 'ONE_ROOM', label: '원룸' },
          { code: 'TWO_ROOM', label: '투룸' },
        ],
        areaTypes: [
          { code: 'AREA_10', label: '10평대' },
          { code: 'AREA_20', label: '20평대' },
        ],
      },
    });
  }),

  // GET /api/v2/dashboard/activities — 주요활동 + 활동별 필수 가구
  http.get('*/api/v2/dashboard/activities', () => {
    return HttpResponse.json({
      code: 200,
      message: 'OK',
      data: {
        activities: [
          {
            code: 'REMOTE_WORK',
            label: '재택근무형',
            furnitures: [{ id: 7, code: 'DESK', label: '업무용 책상' }],
          },
          {
            code: 'READING',
            label: '독서형',
            furnitures: [{ id: 12, code: 'BOOKSHELF', label: '책 선반' }],
          },
          {
            code: 'FLOOR_LIVING',
            label: '좌식 생활형',
            furnitures: [{ id: 9, code: 'LOW_TABLE', label: '좌식 테이블' }],
          },
          {
            code: 'HOME_CAFE',
            label: '홈카페형',
            furnitures: [{ id: 8, code: 'DINING_TABLE', label: '식탁' }],
          },
        ],
      },
    });
  }),

  // GET /api/v2/dashboard/categories — 가구 카테고리 + 카테고리별 가구
  http.get('*/api/v2/dashboard/categories', () => {
    return HttpResponse.json({
      code: 200,
      message: 'OK',
      data: {
        categories: [
          {
            categoryId: 1,
            nameKr: '침대/프레임',
            nameEng: 'BED',
            furnitures: [
              { id: 1, code: 'BED_SINGLE', label: '싱글' },
              { id: 2, code: 'BED_SUPER_SINGLE', label: '슈퍼싱글' },
              { id: 3, code: 'BED_DOUBLE', label: '더블' },
              { id: 4, code: 'BED_QUEEN_OR_LARGER', label: '퀸 이상' },
            ],
          },
          {
            categoryId: 2,
            nameKr: '소파',
            nameEng: 'SOFA',
            furnitures: [
              { id: 5, code: 'SOFA_SINGLE', label: '1인용' },
              { id: 6, code: 'SOFA_DOUBLE', label: '2인용' },
            ],
          },
          {
            categoryId: 3,
            nameKr: '테이블',
            nameEng: 'TABLE',
            furnitures: [
              { id: 7, code: 'DESK', label: '업무용 책상' },
              { id: 8, code: 'DINING_TABLE', label: '식탁' },
              { id: 9, code: 'LOW_TABLE', label: '좌식 테이블' },
            ],
          },
          {
            categoryId: 4,
            nameKr: '그 외',
            nameEng: 'SELECTIVE',
            furnitures: [
              { id: 10, code: 'MOVABLE_TV', label: '이동식 TV' },
              { id: 11, code: 'FULL_MIRROR', label: '전신 거울' },
              { id: 12, code: 'BOOKSHELF', label: '책 선반' },
              { id: 13, code: 'DISPLAY_CABINET', label: '장식장' },
            ],
          },
        ],
      },
    });
  }),

  // GET /api/v1/moodboard-images — 무드보드 이미지 (prefetchStaticData에서 호출)
  http.get('*/api/v1/moodboard-images', () => {
    return HttpResponse.json({
      code: 200,
      message: 'OK',
      data: {
        moodBoardResponseList: [
          {
            id: 1,
            imageUrl: 'https://example.com/mood1.jpg',
            fileExtension: 'jpg',
          },
          {
            id: 2,
            imageUrl: 'https://example.com/mood2.jpg',
            fileExtension: 'jpg',
          },
        ],
      },
    });
  }),

  // GET /api/v1/house-templates — 도면 목록 (FloorPlan에서 호출)
  http.get('*/api/v1/house-templates', () => {
    return HttpResponse.json({
      code: 200,
      message: 'OK',
      data: {
        floorPlanList: [
          {
            id: 1,
            form: 'SQUARE',
            structure: 'ONE_ROOM',
            floorPlanImage: 'https://example.com/floor1.jpg',
          },
          {
            id: 2,
            form: 'L_SHAPE',
            structure: 'TWO_ROOM',
            floorPlanImage: 'https://example.com/floor2.jpg',
          },
        ],
      },
    });
  }),

  // GET /api/v1/mypage/user — 마이페이지 사용자 정보 (useCreditCheck에서 호출)
  http.get('*/api/v1/mypage/user', () => {
    return HttpResponse.json({
      code: 200,
      message: 'OK',
      data: {
        userId: 1,
        name: '테스트',
        CreditCount: 3,
      },
    });
  }),

  // POST /api/v2/generated-images/generate/gemini — 단일 이미지 (B안)
  http.post('*/api/v2/generated-images/generate/gemini', () => {
    return HttpResponse.json({
      code: 200,
      message: 'OK',
      data: {
        imageId: 1,
        imageUrl: 'https://example.com/image.jpg',
        isMirror: false,
        equilibrium: 'BALANCE',
        houseForm: 'APARTMENT',
        tagName: '모던',
        name: '하우미 이미지',
      },
    });
  }),

  // POST /api/v3/generated-images/generate/gemini — 다중 이미지 (A안)
  http.post('*/api/v3/generated-images/generate/gemini', () => {
    return HttpResponse.json({
      code: 200,
      message: 'OK',
      data: {
        imageInfoResponses: [
          {
            imageId: 1,
            imageUrl: 'https://example.com/image1.jpg',
            isMirror: false,
            equilibrium: 'BALANCE',
            houseForm: 'APARTMENT',
            tagName: '모던',
            name: '하우미 이미지 1',
          },
        ],
      },
    });
  }),
];
