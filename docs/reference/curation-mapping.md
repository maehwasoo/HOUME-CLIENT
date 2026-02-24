# 가구 큐레이션 매핑 노트

파이프라인: 모델 라벨 → (furnitureCategoryMapping.ts) 12개 코드 → `GET /api/v1/generated-images/{imageId}/curations/categories?detectedObjects=...` → `categoryName` 키워드 포함 여부로 코드 재해석 → 선택된 `categoryId`로 `GET /api/v1/generated-images/{imageId}/curations/products/{categoryId}`

## 라벨/코드 매핑 (출처별 분리)

> Cabinet/shelf는 2차 분류를 우선 시도: lowerCabinet/upperCabinet/wardrobe/builtInCloset/storageCabinet/chestOfDrawers로 리파인 후 코드 확정. 리파인 실패 시 `Cabinet/shelf` 문자열 매핑(DISPLAY_CABINET) → obj365 인덱스 매핑(CLOSET) 순으로 fallback.

### A. Obj365 원본 라벨 → 코드

| Obj365 라벨   | Obj365 idx(0-based) | 최종 코드(감지→쿼리)                                                    |
| ------------- | ------------------- | ----------------------------------------------------------------------- |
| Bed           | 75                  | SINGLE                                                                  |
| Desk          | 9                   | OFFICE_DESK                                                             |
| Cabinet/shelf | 12                  | (아래 B 표 참조: refined 우선, 실패 시 DISPLAY_CABINET→CLOSET fallback) |
| Dining Table  | 98                  | DINING_TABLE                                                            |
| Chair         | 2                   | SINGLE_SOFA                                                             |
| Bench         | 24                  | SINGLE_SOFA                                                             |
| Stool         | 47                  | SINGLE_SOFA                                                             |
| Storage box   | 20                  | DRAWER                                                                  |
| Monitor/TV    | 37                  | MOVABLE_TV                                                              |
| Coffee Table  | 167                 | SITTING_TABLE                                                           |
| Side Table    | 168                 | SITTING_TABLE                                                           |
| Mirror        | 79                  | MIRROR                                                                  |
| Couch         | 50                  | TWO_SEATER_SOFA                                                         |

### B. Cabinet/shelf 리파인 결과 → 코드

| refined 결과   | 최종 코드                                                   |
| -------------- | ----------------------------------------------------------- |
| lowerCabinet   | DISPLAY_CABINET                                             |
| upperCabinet   | WHITE_BOOKSHELF                                             |
| wardrobe       | CLOSET                                                      |
| builtInCloset  | CLOSET                                                      |
| storageCabinet | DISPLAY_CABINET                                             |
| chestOfDrawers | DRAWER                                                      |
| (refine 실패)  | DISPLAY_CABINET (문자열 매핑) → 실패 시 CLOSET(인덱스 매핑) |

### C. 문자열/별칭(Obj365에 없는 라벨) → 코드

| 라벨/별칭        | 출처                      | 최종 코드       |
| ---------------- | ------------------------- | --------------- |
| Single Bed       | 모델 className 변형       | SINGLE          |
| one seater sofa  | 수동 alias                | SINGLE_SOFA     |
| Sofa             | 수동 alias                | TWO_SEATER_SOFA |
| two seater sofa  | 수동 alias                | TWO_SEATER_SOFA |
| base cabinet     | 수동 alias                | DISPLAY_CABINET |
| wall cabinet     | 수동 alias                | WHITE_BOOKSHELF |
| wardrobe         | 수동 alias(캐비닛 키워드) | CLOSET          |
| built-in closet  | 수동 alias                | CLOSET          |
| built in closet  | 수동 alias                | CLOSET          |
| storage cabinet  | 수동 alias                | DISPLAY_CABINET |
| chest of drawers | 수동 alias                | DRAWER          |
| drawer           | 수동 alias                | DRAWER          |

## 역매핑 키워드 전체 세트(참고, CategoryName 기준)

- SINGLE: 침대, SINGLE, BED
- OFFICE_DESK: 업무용 책상, OFFICE_DESK
- CLOSET: 옷장, CLOSET
- DINING_TABLE: 식탁, DINING_TABLE
- SINGLE_SOFA: 1인용 소파, SINGLE_SOFA
- DRAWER: 수납장, DRAWER
- MOVABLE_TV: 이동식 TV, MOVABLE_TV
- SITTING_TABLE: 좌식 테이블, SITTING_TABLE
- MIRROR: 전신 거울, MIRROR
- WHITE_BOOKSHELF: 책 선반, WHITE_BOOKSHELF
- DISPLAY_CABINET: 장식장, DISPLAY_CABINET
- TWO_SEATER_SOFA: 2인용 소파, TWO_SEATER_SOFA

## 비활성 처리

- Nightstand(Obj idx 121) 감지·매핑 비활성: OBJ365 가구 인덱스 세트와 문자열 매핑에서 제외.
