/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiResponseString {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: string;
}

export interface GenerateImageV4Request {
  /** @format int64 */
  floorPlanId: number;
  floorPlanView: string;
  isMirror: boolean;
  /**
   * @maxItems 5
   * @minItems 1
   */
  moodBoardIds: number[];
  activity: string;
  /**
   * @maxItems 6
   * @minItems 0
   */
  furnitureIds: number[];
}

export interface ApiResponseBannerGenerateImageResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: BannerGenerateImageResponse;
}

export interface BannerGenerateImageResponse {
  /** @format int64 */
  imageId?: number;
}

export interface FloorPlanInfo {
  /** @format int64 */
  floorPlanId: number;
  isMirror: boolean;
}

export interface GenerateImageRequest {
  /** @format int64 */
  houseId: number;
  equilibrium: string;
  floorPlan: FloorPlanInfo;
  /**
   * @maxItems 5
   * @minItems 1
   */
  moodBoardIds: number[];
  activity: string;
  /**
   * @maxItems 6
   * @minItems 0
   */
  selectiveIds?: number[];
}

export interface ApiResponseImageInfoListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: ImageInfoListResponse;
}

export interface ImageInfoListResponse {
  imageInfoResponses?: ImageInfoResponse[];
}

export interface ImageInfoResponse {
  /** @format int64 */
  imageId?: number;
  imageUrl?: string;
  isMirror?: boolean;
  equilibrium?: string;
  houseForm?: string;
  tagName?: string;
  name?: string;
}

export interface SocialSignUpV2Request {
  signupToken: string;
  /** @pattern ^[가-힣a-zA-Z0-9]+$ */
  nickname: string;
  /** @pattern MALE|FEMALE|NONBINARY */
  gender: string;
  birthday: string;
}

export interface PromptFurnitureListDTO {
  furnitureTagIds?: number[];
}

export interface PromptRequestDTO {
  /** @format int64 */
  floorPlanId?: number;
  /** @format int64 */
  tagId?: number;
  equilibrium?: "UNDER_5" | "BETWEEN_6_10" | "BETWEEN_11_15" | "OVER_16";
  promptFurnitureListDTO?: PromptFurnitureListDTO;
}

export interface ApiResponseImageInfoResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: ImageInfoResponse;
}

export interface ApiResponseJjymToggleResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: JjymToggleResponse;
}

export interface JjymToggleResponse {
  favorited?: boolean;
}

export interface SocialSignUpRequest {
  signupToken: string;
  /** @pattern ^[가-힣a-zA-Z]+$ */
  name: string;
  /** @pattern MALE|FEMALE|NONBINARY */
  gender: string;
  birthday: string;
}

export interface HouseSelectRequest {
  houseType: string;
  roomType: string;
  areaType: string;
  isValid: boolean;
}

export interface ApiResponseHouseIdResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: HouseIdResponse;
}

export interface HouseIdResponse {
  /** @format int64 */
  houseId?: number;
}

export interface IsLikeRequest {
  isLike?: boolean;
}

export interface ApiResponseVoid {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: object;
}

export interface OtherStyleGenerateImageRequest {
  /** @format int64 */
  bannerId: number;
  /** @format int64 */
  floorPlanId: number;
  floorPlanView: string;
  isMirror: boolean;
}

export interface ApiResponseOtherStyleGenerateImageResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: OtherStyleGenerateImageResponse;
}

export interface OtherStyleGenerateImageResponse {
  /** @format int64 */
  imageId?: number;
}

export interface BannerGenerateImageRequest {
  /** @format int64 */
  bannerId: number;
  /** @format int64 */
  answerId: number;
  /** @format int64 */
  floorPlanId: number;
  floorPlanView: string;
  isMirror: boolean;
}

export interface AdminTagRequestDTO {
  /** @format int32 */
  priority?: number;
  tagName?: string;
  tag_name_kr?: string;
  tag_prompt?: string;
}

export interface AdminStyleCreateRequest {
  bannerImageUrl: string;
  bannerTitle: string;
  styleDescription: string;
  stylePrompt: string;
  mappedRawProductIds: number[];
}

export interface AdminBannerMappedRawProductResponse {
  /** @format int64 */
  id?: number;
  source?: string;
  category?:
    | "MINI_ELECTRONICS"
    | "FURNITURE"
    | "LIGHTING"
    | "LIVING_GOODS"
    | "HOME_FABRIC"
    | "ACCESSORY";
  /** @format int64 */
  productId?: number;
  productName?: string;
  productImageUrl?: string;
  brand?: string;
}

export interface AdminStyleResponse {
  /** @format int64 */
  id?: number;
  bannerImageUrl?: string;
  bannerTitle?: string;
  styleDescription?: string;
  stylePrompt?: string;
  mappedRawProducts?: AdminBannerMappedRawProductResponse[];
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface ApiResponseAdminStyleResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminStyleResponse;
}

export interface AdminBannerImageUploadRequest {
  /** @pattern ^(?i)(jpg|jpeg|png|gif|webp)$ */
  imageExtension: string;
}

export interface AdminBannerImageUploadResponse {
  uploadUrl?: string;
  publicUrl?: string;
}

export interface ApiResponseAdminBannerImageUploadResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminBannerImageUploadResponse;
}

export interface AdminMoodBoardCreateRequestDTO {
  imageExtension?: string;
  originalFilename?: string;
  /** @format int64 */
  tagId?: number;
}

export interface AdminMoodBoardCreateResponseDTO {
  presignedUrl?: string;
  /** @format int64 */
  tasteId?: number;
}

export interface ApiResponseAdminMoodBoardCreateResponseDTO {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminMoodBoardCreateResponseDTO;
}

export interface AdminLandingCreateRequest {
  bannerImageUrl: string;
  bannerTitle: string;
}

export interface AdminLandingResponse {
  /** @format int64 */
  id?: number;
  bannerImageUrl?: string;
  bannerTitle?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface ApiResponseAdminLandingResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminLandingResponse;
}

export interface AdminFurnitureRequestDTO {
  /** 추가되는 가구의 한글명 입니다 */
  furnitureNameKr?: string;
  /** 추가되는 가구의 영어명 입니다 */
  furnitureNameEng?: string;
  /**
   * 추가되는 가구의 가구 타입 입니다
   * @format int64
   */
  furnitureType?: number;
}

export interface AdminFurnitureTypeRequest {
  /** 추가할 가구 타입 한글명 */
  furnitureTypeNameKr?: string;
  /** 추가할 가구 타입 영어명 */
  furnitureTypeNameEng?: string;
}

export interface AdminFurniturePromptRequestDTO {
  /** 가구의 한글명 입니다 */
  furnitureNameKr?: string;
  /** 가구에 대한 프롬프트 입니다 */
  prompt?: string;
  /**
   * 가구의 스타일 태그 입니다
   * @format int64
   */
  tagId?: number;
  /** 가구의 검색 키워드입니다 */
  searchKeyword?: string;
  /**
   * 가구의 우선순위입니다
   * @format int32
   */
  priority?: number;
  imageExtension?: string;
  originalFilename?: string;
}

export interface AdminFurniturePromptCreateResponseDTO {
  presignedUrl?: string;
  /** @format int64 */
  furnitureTagId?: number;
}

export interface ApiResponseAdminFurniturePromptCreateResponseDTO {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminFurniturePromptCreateResponseDTO;
}

export interface AdminFloorPlanCreateRequest {
  name: string;
  forms: ("OFFICETEL" | "VILLA" | "APARTMENT" | "ETC")[];
  structures: (
    | "OPEN_ONE_ROOM"
    | "SEPARATED_ONE_ROOM"
    | "DUPLEX"
    | "TWO_ROOM"
    | "THREE_ROOM_OVER"
  )[];
  equilibriums: ("UNDER_5" | "BETWEEN_6_10" | "BETWEEN_11_15" | "OVER_16")[];
  floorPlanPrompt: string;
  images: AdminFloorPlanImageRequest[];
}

export interface AdminFloorPlanImageRequest {
  url: string;
  filename: string;
  originalFilename: string;
  fileExtension: string;
  /**
   * @format int32
   * @min 1
   */
  sortOrder: number;
  view?: string;
}

export interface AdminFloorPlanImageResponse {
  url?: string;
  filename?: string;
  originalFilename?: string;
  fileExtension?: string;
  /** @format int32 */
  sortOrder?: number;
  view?: string;
}

export interface AdminFloorPlanResponse {
  /** @format int64 */
  id?: number;
  name?: string;
  forms?: ("OFFICETEL" | "VILLA" | "APARTMENT" | "ETC")[];
  structures?: (
    | "OPEN_ONE_ROOM"
    | "SEPARATED_ONE_ROOM"
    | "DUPLEX"
    | "TWO_ROOM"
    | "THREE_ROOM_OVER"
  )[];
  equilibriums?: ("UNDER_5" | "BETWEEN_6_10" | "BETWEEN_11_15" | "OVER_16")[];
  floorPlanPrompt?: string;
  representativeImageUrl?: string;
  images?: AdminFloorPlanImageResponse[];
}

export interface ApiResponseAdminFloorPlanResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminFloorPlanResponse;
}

export interface AdminFloorPlanImageUploadRequest {
  imageExtension: string;
}

export interface AdminFloorPlanImageUploadResponse {
  uploadUrl?: string;
  publicUrl?: string;
}

export interface ApiResponseAdminFloorPlanImageUploadResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminFloorPlanImageUploadResponse;
}

export interface ApiResponseSoozipRawProductSaveResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: SoozipRawProductSaveResponse;
}

export interface SoozipRawProductSaveResponse {
  source?: string;
  category?:
    | "MINI_ELECTRONICS"
    | "FURNITURE"
    | "LIGHTING"
    | "LIVING_GOODS"
    | "HOME_FABRIC"
    | "ACCESSORY";
  /** @format int32 */
  productCount?: number;
  /** @format int32 */
  insertedCount?: number;
  /** @format int32 */
  updatedCount?: number;
  /** @format int32 */
  skippedCount?: number;
}

export interface AdminCurationRawProductCreateRequest {
  /** @pattern ^[a-zA-Z0-9][a-zA-Z0-9_-]{0,49}$ */
  source: string;
  category:
    | "MINI_ELECTRONICS"
    | "FURNITURE"
    | "LIGHTING"
    | "LIVING_GOODS"
    | "HOME_FABRIC"
    | "ACCESSORY";
  /** @format int64 */
  productId: number;
  productImageUrl: string;
  productSiteUrl: string;
  productName: string;
  productMallName?: string;
  brand?: string;
  /** @format int64 */
  listPrice?: number;
  /**
   * @format int32
   * @min 0
   * @max 100
   */
  discountRate?: number;
  /** @format int64 */
  discountPrice?: number;
  /** @format int64 */
  baseShippingFee?: number;
  /** @format int64 */
  freeShippingCondition?: number;
  isExposed?: boolean;
  /** @format date-time */
  fetchedAt?: string;
}

export interface AdminCurationRawProductColorResponse {
  /** @format int64 */
  id?: number;
  rawColorName?: string;
  clientColorName?: string;
}

export interface AdminCurationRawProductFurnitureTagResponse {
  /** @format int64 */
  mappingId?: number;
  /** @format int64 */
  furnitureTagId?: number;
  /** @format int64 */
  furnitureId?: number;
  furnitureNameKr?: string;
  /** @format int64 */
  furnitureTypeId?: number;
  furnitureTypeNameKr?: string;
  /** @format int64 */
  tagId?: number;
  tagNameKr?: string;
  /** @format int32 */
  priority?: number;
  searchKeyword?: string;
}

export interface AdminCurationRawProductResponse {
  /** @format int64 */
  id?: number;
  source?: string;
  category?:
    | "MINI_ELECTRONICS"
    | "FURNITURE"
    | "LIGHTING"
    | "LIVING_GOODS"
    | "HOME_FABRIC"
    | "ACCESSORY";
  /** @format int64 */
  productId?: number;
  productImageUrl?: string;
  productSiteUrl?: string;
  productName?: string;
  productMallName?: string;
  brand?: string;
  /** @format int64 */
  listPrice?: number;
  /** @format int32 */
  discountRate?: number;
  /** @format int64 */
  discountPrice?: number;
  /** @format int64 */
  baseShippingFee?: number;
  /** @format int64 */
  freeShippingCondition?: number;
  /** @format date-time */
  fetchedAt?: string;
  isExposed?: boolean;
  colors?: AdminCurationRawProductColorResponse[];
  furnitureTags?: AdminCurationRawProductFurnitureTagResponse[];
}

export interface ApiResponseAdminCurationRawProductResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminCurationRawProductResponse;
}

export interface AdminCurationRawProductFurnitureTagCreateRequest {
  /** @format int64 */
  furnitureTagId: number;
}

export interface ApiResponseAdminCurationRawProductFurnitureTagResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminCurationRawProductFurnitureTagResponse;
}

export interface AdminBannerCreateRequest {
  bannerImageUrl: string;
  bannerTitle: string;
  styleDescription: string;
  styleQuestion: string;
  stylePrompt: string;
  /**
   * @maxItems 4
   * @minItems 0
   */
  styleAnswerChips: AdminBannerStyleAnswerChipRequest[];
  mappedRawProductIds: number[];
}

export interface AdminBannerStyleAnswerChipRequest {
  /**
   * @format int32
   * @min 1
   * @max 4
   */
  order: number;
  label: string;
  selectedPrompt: string;
  /** @format int64 */
  curationRawProductId: number;
}

export interface AdminBannerResponse {
  /** @format int64 */
  id?: number;
  bannerImageUrl?: string;
  bannerTitle?: string;
  styleDescription?: string;
  styleQuestion?: string;
  stylePrompt?: string;
  styleAnswerChips?: AdminBannerStyleAnswerChipResponse[];
  mappedRawProducts?: AdminBannerMappedRawProductResponse[];
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface AdminBannerStyleAnswerChipResponse {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  order?: number;
  label?: string;
  selectedPrompt?: string;
  /** @format int64 */
  curationRawProductId?: number;
  curationRawProductName?: string;
  curationRawProductImageUrl?: string;
}

export interface ApiResponseAdminBannerResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminBannerResponse;
}

export interface AddressRequest {
  sigungu: string;
  roadName: string;
}

export interface CreateUserV2Request {
  /**
   * @minLength 2
   * @maxLength 20
   * @pattern ^[가-힣a-zA-Z0-9]+$
   */
  nickname: string;
  /** @pattern MALE|FEMALE|NONBINARY */
  gender: string;
  birthday: string;
}

export interface CreateUserRequest {
  /** @pattern ^[가-힣a-zA-Z]+$ */
  name: string;
  /** @pattern MALE|FEMALE|NONBINARY */
  gender: string;
  birthday: string;
}

export interface AdminTagUpdateRequestDTO {
  /** @format int64 */
  tagId: number;
  /** @format int32 */
  newPriority?: number;
  /** @pattern ^[a-zA-Z0-9\s\-_.()&/]*$ */
  newTagNameEng?: string;
  newTagPrompt?: string;
  newTagNameKr?: string;
}

export interface AdminStyleUpdateRequest {
  bannerImageUrl?: string;
  bannerTitle?: string;
  styleDescription?: string;
  stylePrompt?: string;
  mappedRawProductIds?: number[];
}

export interface AdminLandingUpdateRequest {
  bannerImageUrl?: string;
  bannerTitle?: string;
}

export interface AdminFurnitureUpdateRequestDTO {
  /** 업데이트할 가구의 한글 이름(식별자) */
  furnitureNameKr?: string;
  /**
   * 업데이트할 가구의 태그 ID(식별자)
   * @format int64
   */
  tagId?: number;
  /** 새로운 가구 영어 이름 */
  newFurnitureNameEng?: string;
  /** 새로운 프롬프트 */
  newPrompt?: string;
  /** 새로운 검색 키워드 */
  newSearchKeyword?: string;
  /**
   * 새로운 우선순위
   * @format int32
   */
  newPriority?: number;
  /** 이미지 업데이트 시 사용할 확장자 (예: jpg, png) */
  imageExtension?: string;
  /** 이미지 업데이트 시 표시용 원본 파일명 */
  originalFilename?: string;
}

export interface AdminFurnitureUpdateResponseDTO {
  presignedUrl?: string;
  /** @format int64 */
  furnitureTagId?: number;
}

export interface ApiResponseAdminFurnitureUpdateResponseDTO {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminFurnitureUpdateResponseDTO;
}

export interface AdminUpdateFurnitureTypeRequest {
  /**
   * 수정할 가구 타입 식별자
   * @format int64
   */
  id?: number;
  /** 새로운 가구 타입 한글명 */
  furnitureTypeNameKr?: string;
  /** 새로운 가구 타입 영어명 */
  furnitureTypeNameEng?: string;
}

export interface AdminFloorPlanUpdateRequest {
  name?: string;
  forms?: ("OFFICETEL" | "VILLA" | "APARTMENT" | "ETC")[];
  structures?: (
    | "OPEN_ONE_ROOM"
    | "SEPARATED_ONE_ROOM"
    | "DUPLEX"
    | "TWO_ROOM"
    | "THREE_ROOM_OVER"
  )[];
  equilibriums?: ("UNDER_5" | "BETWEEN_6_10" | "BETWEEN_11_15" | "OVER_16")[];
  floorPlanPrompt: string;
  images?: AdminFloorPlanImageRequest[];
}

export interface AdminCurationRawProductUpdateRequest {
  /** @pattern ^[a-zA-Z0-9][a-zA-Z0-9_-]{0,49}$ */
  source?: string;
  category?:
    | "MINI_ELECTRONICS"
    | "FURNITURE"
    | "LIGHTING"
    | "LIVING_GOODS"
    | "HOME_FABRIC"
    | "ACCESSORY";
  /** @format int64 */
  productId?: number;
  productImageUrl?: string;
  productSiteUrl?: string;
  productName?: string;
  productMallName?: string;
  brand?: string;
  /** @format int64 */
  listPrice?: number;
  /**
   * @format int32
   * @min 0
   * @max 100
   */
  discountRate?: number;
  /** @format int64 */
  discountPrice?: number;
  /** @format int64 */
  baseShippingFee?: number;
  /** @format int64 */
  freeShippingCondition?: number;
  isExposed?: boolean;
  /** @format date-time */
  fetchedAt?: string;
}

export interface AdminCurationRawProductFurnitureTagUpdateRequest {
  /** @format int64 */
  furnitureTagId: number;
}

export interface AdminCurationRawProductExposureUpdateRequest {
  rawProductIds: number[];
  isExposed: boolean;
}

export interface AdminBannerUpdateRequest {
  bannerImageUrl?: string;
  bannerTitle?: string;
  styleDescription?: string;
  styleQuestion?: string;
  stylePrompt?: string;
  /**
   * @maxItems 4
   * @minItems 0
   */
  styleAnswerChips?: AdminBannerStyleAnswerChipRequest[];
  mappedRawProductIds?: number[];
}

export interface ApiResponseKakaoLoginResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: KakaoLoginResponse;
}

export interface KakaoLoginResponse {
  isNewUser?: boolean;
  signupToken?: string;
  prefill?: Prefill;
}

export interface Prefill {
  email?: string;
  nickname?: string;
}

export interface ApiResponseRecentFloorPlanResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: RecentFloorPlanResponse;
}

export interface RecentFloorPlanResponse {
  hasRecentImage?: boolean;
  floorPlan?: object;
}

export interface ApiResponseMyPageGeneratedImageV2Response {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: MyPageGeneratedImageV2Response;
}

export interface DateGroupResponse {
  /** @format date */
  date?: string;
  items?: ItemResponse[];
}

export interface ItemResponse {
  /** @format int64 */
  imageId?: number;
  viewType?: "LIST" | "RECOMMEND";
  generatedImageUrl?: string;
  /** @format date-time */
  generatedAt?: string;
  bannerTitle?: string | null;
  productSummaryText?: string | null;
  usedProducts?: UsedProductResponse[];
}

export interface MyPageGeneratedImageV2Response {
  groups?: DateGroupResponse[];
}

export interface UsedProductResponse {
  /** @format int64 */
  rawProductId?: number;
  productImageUrl?: string;
  colors?: string[];
  productName?: string;
  /** @format int64 */
  listPrice?: number;
  /** @format int32 */
  discountRate?: number;
  /** @format int64 */
  discountPrice?: number;
  productSiteUrl?: string;
  isJjym?: boolean;
}

export interface ApiResponseJjymV2ListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: JjymV2ListResponse;
}

export interface JjymV2ItemResponse {
  /** @format int64 */
  rawProductId?: number;
  isJjym?: boolean;
  productImageUrl?: string;
  productSiteUrl?: string;
  colors?: string[];
  brandName?: string;
  productName?: string;
  /** @format int64 */
  listPrice?: number;
  /** @format int32 */
  discountRate?: number;
  /** @format int64 */
  discountPrice?: number;
  /** @format int64 */
  jjymCount?: number;
}

export interface JjymV2ListResponse {
  items?: JjymV2ItemResponse[];
}

export interface ApiResponseExploreHouseTemplateListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: ExploreHouseTemplateListResponse;
}

export interface ExploreHouseTemplateItemResponse {
  /** @format int64 */
  id?: number;
  name?: string;
  imageUrl?: string;
  isLatest?: boolean;
}

export interface ExploreHouseTemplateListResponse {
  isExact?: boolean;
  floorPlans?: ExploreHouseTemplateItemResponse[];
}

export interface ApiResponseExploreHouseTemplateDetailResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: ExploreHouseTemplateDetailResponse;
}

export interface ExploreHouseTemplateDetailItemResponse {
  imageUrl?: string;
  view?: string;
}

export interface ExploreHouseTemplateDetailResponse {
  /** @format int64 */
  floorPlanId?: number;
  floorPlanName?: string;
  equilibrium?: string;
  floorPlans?: ExploreHouseTemplateDetailItemResponse[];
}

export interface ApiResponseDashboardCategoriesResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: DashboardCategoriesResponse;
}

export interface DashboardCategoriesResponse {
  categories?: FurnitureCategoryGroup[];
}

export interface FurnitureCategoryGroup {
  /** @format int64 */
  categoryId?: number;
  nameKr?: string;
  nameEng?: string;
  furnitures?: FurnitureItem[];
}

export interface FurnitureItem {
  /** @format int64 */
  id?: number;
  code?: string;
  label?: string;
  /** @format int32 */
  priority?: number;
}

export interface ActivityFurnitureMappingsResponse {
  activities?: ActivityWithFurnitureResponse[];
}

export interface ActivityWithFurnitureResponse {
  code?: string;
  label?: string;
  furnitures?: FurnitureItem[];
}

export interface ApiResponseActivityFurnitureMappingsResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: ActivityFurnitureMappingsResponse;
}

export interface ApiResponseGetCarouselV2ListResponseDTO {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: GetCarouselV2ListResponseDTO;
}

export interface GetCarouselResponseDTO {
  /** @format int64 */
  carouselId?: number;
  url?: string;
}

export interface GetCarouselV2ListResponseDTO {
  carousels?: GetCarouselResponseDTO[];
}

export interface ApiResponseOtherStyleListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: OtherStyleListResponse;
}

export interface OtherStyleListResponse {
  otherStyles?: OtherStyleResponse[];
}

export interface OtherStyleResponse {
  /** @format int64 */
  id?: number;
  name?: string;
  imageUrl?: string;
}

export interface ApiResponseOtherStyleDetailResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: OtherStyleDetailResponse;
}

export interface OtherStyleDetailProductResponse {
  /** @format int64 */
  id?: number;
  name?: string;
  imageUrl?: string;
  /** @format int64 */
  originalPrice?: number;
  /** @format int32 */
  discountRate?: number;
  /** @format int64 */
  finalPrice?: number;
  linkUrl?: string;
  colors?: ProductColorResponse[];
  isLiked?: boolean;
}

export interface OtherStyleDetailResponse {
  styleName?: string;
  styleImageUrl?: string;
  styleDescription?: string;
  products?: OtherStyleDetailProductResponse[];
}

export interface ProductColorResponse {
  name?: string;
  value?: string;
}

export interface ApiResponseMyPageInfoResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: MyPageInfoResponse;
}

export interface MyPageInfoResponse {
  /** @format int64 */
  userId?: number;
  name?: string;
  /** @format int64 */
  CreditCount?: number;
}

export interface ApiResponseUserImageHistoryListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: UserImageHistoryListResponse;
}

export interface UserImageHistoryDTO {
  /** @format int64 */
  houseId?: number;
  /** @format int64 */
  imageId?: number;
  generatedImageUrl?: string;
  tasteTag?: string;
  equilibrium?: string;
  houseForm?: string;
  isMirror?: boolean;
}

export interface UserImageHistoryListResponse {
  histories?: UserImageHistoryDTO[];
}

export interface ApiResponseImageHistoriesResultPageResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: ImageHistoriesResultPageResponse;
}

export interface ImageHistoriesResultPageResponse {
  histories?: ImageHistoryResultPageResponse[];
}

export interface ImageHistoryResultPageResponse {
  /** @format int64 */
  imageId?: number;
  equilibrium?: string;
  houseForm?: string;
  tasteTag?: string;
  name?: string;
  generatedImageUrl?: string;
  /** 좋아요 여부 */
  isLike?: boolean | null;
  /**
   * 선호도 요인 식별자
   * @format int64
   */
  factorId?: number | null;
  /** 선호도 요인 */
  factorText?: string | null;
}

export interface ApiResponseMoodBoardListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: MoodBoardListResponse;
}

export interface MoodBoardListResponse {
  moodBoardResponseList?: MoodBoardResponse[];
}

export interface MoodBoardResponse {
  /** @format int64 */
  id?: number;
  imageUrl?: string;
  fileExtension?: string;
}

export interface ApiResponseLandingListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: LandingListResponse;
}

export interface LandingListResponse {
  landings?: LandingResponse[];
}

export interface LandingResponse {
  /** @format int64 */
  id?: number;
  name?: string;
  imageUrl?: string;
}

export interface ApiResponseJjymListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: JjymListResponse;
}

export interface JjymItemResponse {
  /** @format int64 */
  id?: number;
  furnitureProductImageUrl?: string;
  furnitureProductSiteUrl?: string;
  furnitureProductName?: string;
  /** @format int64 */
  furnitureProductId?: number;
}

export interface JjymListResponse {
  items?: JjymItemResponse[];
}

export interface ApiResponseHouseOptionsResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: HouseOptionsResponse;
}

export interface HouseOptionDTO {
  code?: string;
  label?: string;
}

export interface HouseOptionsResponse {
  houseTypes?: HouseOptionDTO[];
  roomTypes?: HouseOptionDTO[];
  areaTypes?: HouseOptionDTO[];
}

export interface ApiResponseFloorPlanListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: FloorPlanListResponse;
}

export interface FloorPlanListResponse {
  floorPlanList?: FloorPlanResponse[];
}

export interface FloorPlanResponse {
  /** @format int64 */
  id?: number;
  form?: "OFFICETEL" | "VILLA" | "APARTMENT" | "ETC";
  structure?:
    | "OPEN_ONE_ROOM"
    | "SEPARATED_ONE_ROOM"
    | "DUPLEX"
    | "TWO_ROOM"
    | "THREE_ROOM_OVER";
  floorPlanImage?: string;
}

export interface ApiResponseFurnitureProductsInfoResponseForPlan {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: FurnitureProductsInfoResponseForPlan;
}

export interface FurnitureProductInfo {
  baseFurnitureImageUrl?: string;
  furnitureProductImageUrl?: string;
  furnitureProductSiteUrl?: string;
  furnitureProductName?: string;
  furnitureProductMallName?: string;
  furnitureProductId?: string;
  /** @format double */
  similarity?: number;
}

export interface FurnitureProductsInfoResponseForPlan {
  userName?: string;
  products?: FurnitureProductInfo[];
}

export interface ApiResponseFurnitureProductsInfoResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: FurnitureProductsInfoResponse;
}

export interface FurnitureProductsInfoResponse {
  userName?: string;
  products?: FurnitureProductInfo[];
}

export interface ApiResponseFurnitureCategoriesResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: FurnitureCategoriesResponse;
}

export interface FurnitureCategoriesResponse {
  categories?: FurnitureCategoryResponse[];
}

export interface FurnitureCategoryResponse {
  /** @format int64 */
  id?: number;
  categoryName?: string;
}

export interface ApiResponseSimilarItemsResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: SimilarItemsResponse;
}

export interface SimilarItemResponse {
  /** @format int64 */
  id?: number;
  brand?: string;
  name?: string;
  imageUrl?: string;
  /** @format int64 */
  originalPrice?: number;
  /** @format int32 */
  discountRate?: number;
  /** @format int64 */
  finalPrice?: number;
  linkUrl?: string;
  colors?: ProductColorResponse[];
  isLiked?: boolean;
}

export interface SimilarItemsResponse {
  products?: SimilarItemResponse[];
}

export interface ApiResponseRelatedImagesResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: RelatedImagesResponse;
}

export interface RelatedImageResponse {
  /** @format int64 */
  id?: number;
  imageUrl?: string;
  resultType?: string;
}

export interface RelatedImagesResponse {
  name?: string;
  images?: RelatedImageResponse[];
}

export interface ApiResponseGenerateImageResultResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: GenerateImageResultResponse;
}

export interface GenerateImageResultProductResponse {
  /** @format int64 */
  id?: number;
  name?: string;
  imageUrl?: string;
  /** @format int64 */
  originalPrice?: number;
  /** @format int32 */
  discountRate?: number;
  /** @format int64 */
  finalPrice?: number;
  linkUrl?: string;
  colors?: ProductColorResponse[];
  isLiked?: boolean;
}

export interface GenerateImageResultResponse {
  /** @format int64 */
  imageId?: number;
  imageUrl?: string;
  isMirror?: boolean;
  products?: GenerateImageResultProductResponse[];
}

export interface ApiResponseFactorsResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: FactorsResponse;
}

export interface FactorItem {
  /** @format int64 */
  id?: number;
  text?: string;
}

export interface FactorsResponse {
  factors?: FactorItem[];
}

export interface ActivityItem {
  code?: string;
  label?: string;
}

export interface ApiResponseFurnitureAndActivityResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: FurnitureAndActivityResponse;
}

export interface FurnitureAndActivityResponse {
  activities?: ActivityItem[];
  categories?: FurnitureCategoryGroup[];
}

export interface ApiResponseCurationProductListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: CurationProductListResponse;
}

export interface CurationProductAppliedFilterResponse {
  category?: string;
  id?: string;
  label?: string;
  value?: string;
}

export interface CurationProductListResponse {
  products?: CurationProductResponse[];
  meta?: CurationProductMetaResponse;
}

export interface CurationProductMetaResponse {
  /** @format int64 */
  nextCursor?: number;
  hasNext?: boolean;
  appliedFilters?: CurationProductAppliedFilterResponse[];
}

export interface CurationProductResponse {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  productId?: number;
  categoryName?: string;
  source?: string;
  brand?: string;
  name?: string;
  imageUrl?: string;
  /** @format int64 */
  originalPrice?: number;
  /** @format int32 */
  discountRate?: number;
  /** @format int64 */
  finalPrice?: number;
  mallName?: string;
  linkUrl?: string;
}

export interface ApiResponseCurationProductDetailResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: CurationProductDetailResponse;
}

export interface CurationProductDetailResponse {
  product?: ProductDetail;
}

export interface ProductColorDetail {
  name?: string;
  value?: string;
}

export interface ProductDetail {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  productId?: number;
  categoryName?: string;
  source?: string;
  brand?: string;
  name?: string;
  imageUrl?: string;
  /** @format int64 */
  originalPrice?: number;
  /** @format int32 */
  discountRate?: number;
  /** @format int64 */
  finalPrice?: number;
  mallName?: string;
  linkUrl?: string;
  colors?: ProductColorDetail[];
  isLiked?: boolean;
}

export interface ApiResponseCurationProductFilterResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: CurationProductFilterResponse;
}

export interface ColorFilterResponse {
  /** @format int64 */
  id?: number;
  label?: string;
  value?: string;
}

export interface CurationProductFilterResponse {
  furnitureTypes?: FurnitureTypeFilterResponse[];
  priceRanges?: PriceRangeFilterResponse[];
  colors?: ColorFilterResponse[];
}

export interface FurnitureTypeFilterResponse {
  /** @format int64 */
  id?: number;
  nameKr?: string;
  nameEng?: string;
}

export interface PriceRangeFilterResponse {
  id?: string;
  label?: string;
  /** @format int64 */
  min?: number;
  /** @format int64 */
  max?: number;
}

export interface ApiResponseBoolean {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: boolean;
}

export interface ApiResponseGetCarouselListResponseDTO {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: GetCarouselListResponseDTO;
}

export interface GetCarouselListResponseDTO {
  carouselResponseDTOS?: GetCarouselResponseDTO[];
}

export interface ApiResponseBannerExploreListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: BannerExploreListResponse;
}

export interface BannerExploreListResponse {
  banners?: BannerExploreResponse[];
}

export interface BannerExploreResponse {
  /** @format int64 */
  id?: number;
  name?: string;
  imageUrl?: string;
}

export interface ApiResponseBannerDetailResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: BannerDetailResponse;
}

export interface BannerDetailAnswerResponse {
  /** @format int64 */
  id?: number;
  text?: string;
}

export interface BannerDetailResponse {
  bannerName?: string;
  bannerImageUrl?: string;
  question?: string;
  answers?: BannerDetailAnswerResponse[];
}

export interface AdminTagGetAllResponseDTO {
  tagGetResponseDTOS?: AdminTagGetResponseDTO[];
}

export interface AdminTagGetResponseDTO {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  priority?: number;
  tagName?: string;
  tag_name_kr?: string;
  tag_prompt?: string;
}

export interface ApiResponseAdminTagGetAllResponseDTO {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminTagGetAllResponseDTO;
}

export interface AdminStyleListResponse {
  styles?: AdminStyleResponse[];
}

export interface ApiResponseAdminStyleListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminStyleListResponse;
}

export interface AdminBannerRawProductSearchResponse {
  rawProducts?: AdminBannerMappedRawProductResponse[];
}

export interface ApiResponseAdminBannerRawProductSearchResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminBannerRawProductSearchResponse;
}

export interface AdminMoodBoardGetAllResponseDTO {
  dtos?: AdminMoodBoardGetResponseDTO[];
}

export interface AdminMoodBoardGetResponseDTO {
  filename?: string;
  originalFilename?: string;
  url?: string;
}

export interface ApiResponseAdminMoodBoardGetAllResponseDTO {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminMoodBoardGetAllResponseDTO;
}

export interface AdminLandingListResponse {
  landings?: AdminLandingResponse[];
}

export interface ApiResponseAdminLandingListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminLandingListResponse;
}

export interface AdminFurnitureGetDTO {
  furnitures?: FurnitureInfo[];
}

export interface ApiResponseAdminFurnitureGetDTO {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminFurnitureGetDTO;
}

export interface FurnitureInfo {
  /**
   * 가구 ID
   * @format int64
   */
  furnitureId?: number;
  /** 가구 한글 이름 */
  furnitureNameKr?: string;
  /** 연결된 태그 정보 리스트 */
  tags?: TagInfo[];
}

/** 연결된 태그 정보 리스트 */
export interface TagInfo {
  /**
   * 가구-태그 매핑 ID (FurnitureTag ID)
   * @format int64
   */
  furnitureTagId?: number;
  /**
   * 태그 ID
   * @format int64
   */
  tagId?: number;
  /** 태그 이름 */
  tagName?: string;
  /** 가구 대표 이미지 URL */
  imageUrl?: string;
  /** 검색 키워드 */
  searchKeyword?: string;
  /**
   * 우선순위
   * @format int32
   */
  priority?: number;
}

export interface AdminFurnitureTypeListResponse {
  /** 전체 가구 타입 */
  furnitureTypeList?: AdminFurnitureTypeResponse[];
}

/** 전체 가구 타입 */
export interface AdminFurnitureTypeResponse {
  /**
   * 가구 타입 식별자
   * @format int64
   */
  furnitureTypeId?: number;
  /** 가구 타입 한글명 */
  furnitureTypeNameKr?: string;
  /** 가구 타입 영어명 */
  furnitureTypeNameEng?: string;
}

export interface ApiResponseAdminFurnitureTypeListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminFurnitureTypeListResponse;
}

export interface AdminFurnitureTagOptionListResponse {
  /** 선택한 가구 타입에 연결된 가구 태그 목록 */
  furnitureTags?: AdminFurnitureTagOptionResponse[];
}

/** 선택한 가구 타입에 연결된 가구 태그 목록 */
export interface AdminFurnitureTagOptionResponse {
  /**
   * 가구 태그 식별자
   * @format int64
   */
  furnitureTagId?: number;
  /**
   * 가구 식별자
   * @format int64
   */
  furnitureId?: number;
  /** 가구 한글 이름 */
  furnitureNameKr?: string;
  /**
   * 가구 타입 식별자
   * @format int64
   */
  furnitureTypeId?: number;
  /** 가구 타입 한글 이름 */
  furnitureTypeNameKr?: string;
  /**
   * 스타일 태그 식별자
   * @format int64
   */
  tagId?: number;
  /** 스타일 태그 한글 이름 */
  tagNameKr?: string;
  /** 검색 키워드 */
  searchKeyword?: string;
  /**
   * 우선순위
   * @format int32
   */
  priority?: number;
}

export interface ApiResponseAdminFurnitureTagOptionListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminFurnitureTagOptionListResponse;
}

export interface AdminFurnitureTagGetDTO {
  /** tag 식별자 입니다 */
  tagId?: number[];
  /** tag의 한글 이름 입니다 */
  tagNameKr?: string[];
}

export interface ApiResponseAdminFurnitureTagGetDTO {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminFurnitureTagGetDTO;
}

export interface AdminFurnitureDetailsResponseDTO {
  prompt?: string;
}

export interface ApiResponseAdminFurnitureDetailsResponseDTO {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminFurnitureDetailsResponseDTO;
}

export interface AdminFloorPlanListResponse {
  floorPlans?: AdminFloorPlanResponse[];
}

export interface ApiResponseAdminFloorPlanListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminFloorPlanListResponse;
}

export interface AdminCurationRawProductListResponse {
  products?: AdminCurationRawProductResponse[];
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export interface ApiResponseAdminCurationRawProductListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminCurationRawProductListResponse;
}

export interface AdminBannerListResponse {
  banners?: AdminBannerResponse[];
}

export interface ApiResponseAdminBannerListResponse {
  /** @format int32 */
  code?: number;
  msg?: string;
  data?: AdminBannerListResponse;
}

export interface AdminTagDeleteRequestDTO {
  /** @format int64 */
  tagId: number;
}

export interface AdminFurnitureDeleteDTO {
  /** 업데이트할 가구의 한글 이름(식별자) */
  furnitureNameKr?: string;
}

export interface AdminDeleteFurnitureTypeRequest {
  /**
   * 삭제할 가구 타입 식별자
   * @format int64
   */
  furnitureTypeId?: number;
}

export interface AdminFurnitureTagDeleteDTO {
  /** 업데이트할 가구의 한글 이름(식별자) */
  furnitureNameKr?: string;
  /**
   * 업데이트할 가구의 태그 ID(식별자)
   * @format int64
   */
  tagId?: number;
}

export type ReissueData = ApiResponseString;

export type LogoutData = ApiResponseString;

export type GenerateImageV4ByGeminiData =
  ApiResponseBannerGenerateImageResponse;

export type Generate2ImageByFastApiData = ApiResponseImageInfoListResponse;

export type Generate2ImageByFastApiGeminiData =
  ApiResponseImageInfoListResponse;

export type SignUpData = ApiResponseString;

export type UpdateUserData = ApiResponseString;

export type GenerateData = ApiResponseString;

export type GenerateImageByFastApiData = ApiResponseImageInfoResponse;

export type GenerateImageByFastApiGeminiData = ApiResponseImageInfoResponse;

export type ToggleRawProductJjymData = ApiResponseJjymToggleResponse;

export type LikeCarouselV2Data = ApiResponseString;

export type HateCarouselV2Data = ApiResponseString;

export type SignUp1Data = ApiResponseString;

export type UpdateUser1Data = ApiResponseString;

export type ToggleJjymData = ApiResponseJjymToggleResponse;

export type Generate1Data = ApiResponseString;

export type HousingSelectionsData = ApiResponseHouseIdResponse;

export type GenerateImagePreferenceData = ApiResponseVoid;

export type DeleteGenerateImagePreferenceData = ApiResponseVoid;

export type ToggleFactorLogData = ApiResponseVoid;

export type GetImageFallbackData = ApiResponseImageInfoResponse;

export type GenerateImageData = ApiResponseImageInfoResponse;

export type GenerateOtherStyleImageByGeminiData =
  ApiResponseOtherStyleGenerateImageResponse;

export type GenerateImageByGeminiData = ApiResponseImageInfoResponse;

export type GenerateBannerImageByGeminiData =
  ApiResponseBannerGenerateImageResponse;

export type CreateFurnitureRecommendBtnClickLogData = ApiResponseVoid;

export type CreatePaymentBtnClickLogData = ApiResponseVoid;

export type LikeCarouselData = ApiResponseString;

export type HateCarouselData = ApiResponseString;

export type CreateTagData = ApiResponseString;

export type DeleteTagData = ApiResponseString;

export type UpdateTagData = ApiResponseString;

export type GetStylesData = ApiResponseAdminStyleListResponse;

export type CreateStyleData = ApiResponseAdminStyleResponse;

export type CreateStyleImageUploadUrlData =
  ApiResponseAdminBannerImageUploadResponse;

export type CreateMoodBoardData = ApiResponseAdminMoodBoardCreateResponseDTO;

export type DeleteMoodBoardData = ApiResponseString;

export type GetLandings1Data = ApiResponseAdminLandingListResponse;

export type CreateLandingData = ApiResponseAdminLandingResponse;

export type CreateLandingImageUploadUrlData =
  ApiResponseAdminBannerImageUploadResponse;

export type AdminFurnitureData = ApiResponseString;

export type DeleteFurnitureData = ApiResponseString;

export type UpdateFurnitureData = ApiResponseAdminFurnitureUpdateResponseDTO;

export type AdminFurnitureTypeData = ApiResponseString;

export type DeleteFurnitureTypeData = ApiResponseString;

export type UpdateFurnitureTypeData = ApiResponseString;

export type GetFurniturePromptData =
  ApiResponseAdminFurnitureDetailsResponseDTO;

export type AdminFurniturePromptData =
  ApiResponseAdminFurniturePromptCreateResponseDTO;

export type GetFloorPlansData = ApiResponseAdminFloorPlanListResponse;

export type CreateFloorPlanData = ApiResponseAdminFloorPlanResponse;

export type CreateFloorPlanImageUploadUrlData =
  ApiResponseAdminFloorPlanImageUploadResponse;

export type SaveSoozipRawProductsData = ApiResponseSoozipRawProductSaveResponse;

export type GetRawProductsData = ApiResponseAdminCurationRawProductListResponse;

export type CreateRawProductData = ApiResponseAdminCurationRawProductResponse;

export type CreateRawProductFurnitureTagMappingData =
  ApiResponseAdminCurationRawProductFurnitureTagResponse;

export type GetBannersData = ApiResponseAdminBannerListResponse;

export type CreateBannerData = ApiResponseAdminBannerResponse;

export type CreateBannerImageUploadUrlData =
  ApiResponseAdminBannerImageUploadResponse;

export type CreateAddressData = ApiResponseVoid;

export type GetStyleData = ApiResponseAdminStyleResponse;

export type DeleteStyleData = ApiResponseString;

export type UpdateStyleData = ApiResponseAdminStyleResponse;

export type GetLandingData = ApiResponseAdminLandingResponse;

export type DeleteLandingData = ApiResponseString;

export type UpdateLandingData = ApiResponseAdminLandingResponse;

export type GetFloorPlanData = ApiResponseAdminFloorPlanResponse;

export type DeleteFloorPlanData = ApiResponseString;

export type UpdateFloorPlanData = ApiResponseAdminFloorPlanResponse;

export type GetRawProductData = ApiResponseAdminCurationRawProductResponse;

export type DeleteRawProductData = ApiResponseString;

export type UpdateRawProductData = ApiResponseAdminCurationRawProductResponse;

export type DeleteRawProductFurnitureTagMappingData = ApiResponseString;

export type UpdateRawProductFurnitureTagMappingData =
  ApiResponseAdminCurationRawProductFurnitureTagResponse;

export type UpdateRawProductExposureData = ApiResponseString;

export type GetBannerData = ApiResponseAdminBannerResponse;

export type DeleteBannerData = ApiResponseString;

export type UpdateBannerData = ApiResponseAdminBannerResponse;

export type KakaoOAuthCallbackData = any;

export type KakaoLoginData = ApiResponseKakaoLoginResponse;

export type GetRecentFloorPlanData = ApiResponseRecentFloorPlanResponse;

export type RotateNicknameData = ApiResponseString;

export type GetUserImageHistoryListV2Data =
  ApiResponseMyPageGeneratedImageV2Response;

export type GetMyRawProductJjymsData = ApiResponseJjymV2ListResponse;

export type GetExploreHouseTemplatesData =
  ApiResponseExploreHouseTemplateListResponse;

export type GetExploreHouseTemplateDetailData =
  ApiResponseExploreHouseTemplateDetailResponse;

export type GetDashboardCategoriesData = ApiResponseDashboardCategoriesResponse;

export type GetActivityFurnitureMappingsData =
  ApiResponseActivityFurnitureMappingsResponse;

export type GetCarouselsV2Data = ApiResponseGetCarouselV2ListResponseDTO;

export type GetOtherStylesData = ApiResponseOtherStyleListResponse;

export type GetOtherStyleDetailData = ApiResponseOtherStyleDetailResponse;

export type GetMyPageInfoData = ApiResponseMyPageInfoResponse;

export type GetUserImageHistoryListData =
  ApiResponseUserImageHistoryListResponse;

export type GetImageHistoryResultPageData =
  ApiResponseImageHistoriesResultPageResponse;

export type MoodboardImagesData = ApiResponseMoodBoardListResponse;

export type GetLandingsData = ApiResponseLandingListResponse;

export type GetMyJjymsData = ApiResponseJjymListResponse;

export type HousingOptionsData = ApiResponseHouseOptionsResponse;

export type GetHouseTemplatesData = ApiResponseFloorPlanListResponse;

export type GetFurnitureProductInfoFromNaverApiForPlanData =
  ApiResponseFurnitureProductsInfoResponseForPlan;

export type GetFurnitureProductInfoFromNaverApiForPlanV2Data =
  ApiResponseFurnitureProductsInfoResponseForPlan;

export type GetFurnitureProductInfoFromNaverApiData =
  ApiResponseFurnitureProductsInfoResponse;

export type GetFurnitureCategoriesData = ApiResponseFurnitureCategoriesResponse;

export type GetSimilarItemsData = ApiResponseSimilarItemsResponse;

export type GetRelatedImagesData = ApiResponseRelatedImagesResponse;

export type GetListResultItemsData = ApiResponseGenerateImageResultResponse;

export type GetFactorsData = ApiResponseFactorsResponse;

export type GetEnvData = Record<string, string>;

export type GetFurnitureAndActivityData =
  ApiResponseFurnitureAndActivityResponse;

export type GetProductsData = ApiResponseCurationProductListResponse;

export type GetProductDetailData = ApiResponseCurationProductDetailResponse;

export type GetFiltersData = ApiResponseCurationProductFilterResponse;

export type CheckHasGeneratedImageData = ApiResponseBoolean;

export type GetCarouselsData = ApiResponseGetCarouselListResponseDTO;

export type GetExploreBannersData = ApiResponseBannerExploreListResponse;

export type GetExploreBannerDetailData = ApiResponseBannerDetailResponse;

export type AdminOnlyTestData = ApiResponseString;

export type GetTagsData = ApiResponseAdminTagGetAllResponseDTO;

export type SearchRawProductsData =
  ApiResponseAdminBannerRawProductSearchResponse;

export type GetAllData = ApiResponseAdminMoodBoardGetAllResponseDTO;

export type GetFurnituresData = ApiResponseAdminFurnitureGetDTO;

export type GetFurnitureTypesData = ApiResponseAdminFurnitureTypeListResponse;

export type GetFurnitureTagsByTypeData =
  ApiResponseAdminFurnitureTagOptionListResponse;

export type GetFurnitureTagsData = ApiResponseAdminFurnitureTagGetDTO;

export type SearchRawProducts1Data =
  ApiResponseAdminBannerRawProductSearchResponse;

export type CreateAccessData = ApiResponseString;

export type AccessTestData = ApiResponseString;

export type DeleteUserData = ApiResponseString;

export type DeleteFurnitureTagData = ApiResponseString;
