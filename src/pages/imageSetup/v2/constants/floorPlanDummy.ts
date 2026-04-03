import type {
  FilterCategory,
  FloorPlanData,
  FloorPlanDetailView,
  RecentFloorPlanData,
} from '../types/floorPlan';

export const DUMMY_FILTER_CATEGORIES: FilterCategory[] = [
  {
    id: 'residenceType',
    label: '주거 형태',
    options: [
      { id: 'ALL', label: '전체' },
      { id: 'OFFICETEL', label: '오피스텔' },
      { id: 'VILLA', label: '빌라/다세대' },
      { id: 'APARTMENT', label: '아파트' },
      { id: 'ETC', label: '그 외' },
    ],
  },
  {
    id: 'layoutType',
    label: '구조',
    options: [
      { id: 'ALL', label: '전체' },
      { id: 'OPEN_ONE_ROOM', label: '오픈형 원룸' },
      { id: 'SEPARATE_ONE_ROOM', label: '분리형 원룸' },
      { id: 'DUPLEX', label: '복층형' },
      { id: 'TWO_ROOM', label: '투룸' },
      { id: 'THREE_ROOM_PLUS', label: '쓰리룸 이상' },
      { id: 'ETC', label: '그 외' },
    ],
  },
  {
    id: 'areaSize',
    label: '평형',
    options: [
      { id: 'ALL', label: '전체' },
      { id: 'UNDER_4', label: '4평 이하' },
      { id: 'FROM_5_TO_10', label: '5-10평' },
      { id: 'TENS', label: '10평대' },
      { id: 'TWENTIES', label: '20평대' },
      { id: 'OVER_30', label: '30평 이상' },
    ],
  },
];

export const DUMMY_FLOOR_PLANS: FloorPlanData[] = [
  {
    id: 1,
    name: '일자형 원룸',
    imageUrl: 'https://placehold.co/164x164?text=1',
    isLatest: true,
    residenceType: 'OFFICETEL',
    layoutType: 'OPEN_ONE_ROOM',
    areaSize: 'FROM_5_TO_10',
  },
  {
    id: 2,
    name: '분리형 원룸',
    imageUrl: 'https://placehold.co/164x164?text=2',
    isLatest: false,
    residenceType: 'VILLA',
    layoutType: 'SEPARATE_ONE_ROOM',
    areaSize: 'TENS',
  },
  {
    id: 3,
    name: 'ㄱ자형 투룸',
    imageUrl: 'https://placehold.co/164x164?text=3',
    isLatest: false,
    residenceType: 'APARTMENT',
    layoutType: 'TWO_ROOM',
    areaSize: 'TENS',
  },
  {
    id: 4,
    name: '복층형 쓰리룸',
    imageUrl: 'https://placehold.co/164x164?text=4',
    isLatest: false,
    residenceType: 'OFFICETEL',
    layoutType: 'THREE_ROOM_PLUS',
    areaSize: 'TWENTIES',
  },
  {
    id: 5,
    name: '오픈형 원룸',
    imageUrl: 'https://placehold.co/164x164?text=5',
    isLatest: false,
    residenceType: 'OFFICETEL',
    layoutType: 'OPEN_ONE_ROOM',
    areaSize: 'FROM_5_TO_10',
  },
  {
    id: 6,
    name: '소형 원룸',
    imageUrl: 'https://placehold.co/164x164?text=6',
    isLatest: false,
    residenceType: 'ETC',
    layoutType: 'OPEN_ONE_ROOM',
    areaSize: 'UNDER_4',
  },
  {
    id: 7,
    name: '복층형 투룸',
    imageUrl: 'https://placehold.co/164x164?text=7',
    isLatest: false,
    residenceType: 'VILLA',
    layoutType: 'DUPLEX',
    areaSize: 'TENS',
  },
  {
    id: 8,
    name: '대형 아파트',
    imageUrl: 'https://placehold.co/164x164?text=8',
    isLatest: false,
    residenceType: 'APARTMENT',
    layoutType: 'THREE_ROOM_PLUS',
    areaSize: 'OVER_30',
  },
];

// 도면 상세 뷰 더미 (카드 클릭 시 반환, 추후 API 교체)
// key: floorPlanId → value: FloorPlanDetailView[]
export const DUMMY_FLOOR_PLAN_DETAILS: Record<number, FloorPlanDetailView[]> = {
  1: [
    {
      id: 1,
      name: '일자형 원룸',
      imageUrl: 'https://placehold.co/343x343?text=1-A',
      equilibrium: '5-10평',
      view: '정면 뷰',
    },
    {
      id: 1,
      name: '일자형 원룸',
      imageUrl: 'https://placehold.co/343x343?text=1-B',
      equilibrium: '5-10평',
      view: '창가 뷰',
    },
  ],
  2: [
    {
      id: 2,
      name: '분리형 원룸',
      imageUrl: 'https://placehold.co/343x343?text=2-A',
      equilibrium: '10평대',
      view: '정면 뷰',
    },
  ],
  3: [
    {
      id: 3,
      name: 'ㄱ자형 투룸',
      imageUrl: 'https://placehold.co/343x343?text=3-A',
      equilibrium: '10평대',
      view: '정면 뷰',
    },
    {
      id: 3,
      name: 'ㄱ자형 투룸',
      imageUrl: 'https://placehold.co/343x343?text=3-B',
      equilibrium: '10평대',
      view: '창가 뷰',
    },
    {
      id: 3,
      name: 'ㄱ자형 투룸',
      imageUrl: 'https://placehold.co/343x343?text=3-C',
      equilibrium: '10평대',
      view: '주방 뷰',
    },
  ],
  4: [
    {
      id: 4,
      name: '복층형 쓰리룸',
      imageUrl: 'https://placehold.co/343x343?text=4-A',
      equilibrium: '20평대',
      view: '정면 뷰',
    },
  ],
  5: [
    {
      id: 5,
      name: '오픈형 원룸',
      imageUrl: 'https://placehold.co/343x343?text=5-A',
      equilibrium: '5-10평',
      view: '정면 뷰',
    },
    {
      id: 5,
      name: '오픈형 원룸',
      imageUrl: 'https://placehold.co/343x343?text=5-B',
      equilibrium: '5-10평',
      view: '창가 뷰',
    },
  ],
  6: [
    {
      id: 6,
      name: '소형 원룸',
      imageUrl: 'https://placehold.co/343x343?text=6-A',
      equilibrium: '4평 이하',
      view: '정면 뷰',
    },
  ],
  7: [
    {
      id: 7,
      name: '복층형 투룸',
      imageUrl: 'https://placehold.co/343x343?text=7-A',
      equilibrium: '10평대',
      view: '정면 뷰',
    },
  ],
  8: [
    {
      id: 8,
      name: '대형 아파트',
      imageUrl: 'https://placehold.co/343x343?text=8-A',
      equilibrium: '30평 이상',
      view: '정면 뷰',
    },
    {
      id: 8,
      name: '대형 아파트',
      imageUrl: 'https://placehold.co/343x343?text=8-B',
      equilibrium: '30평 이상',
      view: '창가 뷰',
    },
  ],
};

// 최근 생성 도면 (별도 API 응답)
export const DUMMY_RECENT_FLOOR_PLAN: RecentFloorPlanData | null = {
  id: 1,
  name: '일자형 원룸',
  imageUrl: 'https://placehold.co/343x343?text=Recent',
  equilibrium: '5-10평',
  view: '정면 뷰',
};
