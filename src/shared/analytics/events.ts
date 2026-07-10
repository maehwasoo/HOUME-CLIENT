/**
 * GA4 Event Code 상수 (Notion v2.0.0)
 *
 * B-2 전체 이벤트 카탈로그
 * - Page Code 있음 → 페이지 namespace
 * - Page Code 없음 → component namespace (topNav, 공통 모달/토스트)
 * 화면별 trackEvent 연결은 각 페이지/컴포넌트에서 단계별 진행
 */

export const GA_EVENTS = {
  landing: {
    BTN_CTA_CLICK: 'landing_btnCTA_click',
    PAGE_VIEW: 'landing_page_view',
  },

  component: {
    TOP_NAV_CREATE_IMG_CLICK: 'topNavCreateImg_click',
    TOP_NAV_LOGIN_CLICK: 'topNavLogin_click',
    TOP_NAV_MYPAGE_CLICK: 'topNavMypage_click',
    TOP_NAV_LOGO_CLICK: 'topNavLogo_click',
    SUCCESSION_MD_CANCEL_CLICK: 'successionMDCancel_click',
    SUCCESSION_MD_BYE_CLICK: 'successionMDBye_click',
    TOAST_SAVE_VIEW: 'toastSave_view',
    TOAST_UNSAVE_VIEW: 'toastUnsave_view',
    SAVE_TOAST_TO_SEE_CLICK: 'saveToastToSee_click',
    SAVE_TOAST_CANCEL_CLICK: 'saveToastCancel_click',
    GEN_IMG_QUIT_MD_KEEP_CLICK: 'GenImgQuitMDKeep_click',
    GEN_IMG_QUIT_MD_QUIT_CLICK: 'GenImgQuitMDQuit_click',
    RESET_INFO_MD_QUIT_CLICK: 'ResetInfoMDQuit_click',
    RESET_INFO_MD_KEEP_CLICK: 'ResetInfoMDKeep_click',
  },

  home: {
    PAGE_VIEW: 'home_page_view',
    TAP_EXPLORE_CLICK: 'home_tapExplore_click',
    TAP_SHOP_CLICK: 'home_tapShop_click',
    BANNER_BG_IMG_CLICK: 'home_bannerBgImg_click',
    BANNER_LEFT_SWIPE: 'home_bannerLeft_swipe',
    BANNER_RIGHT_SWIPE: 'home_bannerRight_swipe',
    SPACE_MORE_CLICK: 'home_spaceMore_click',
    SPACE_CARD_CLICK: 'home_spaceCard_click',
    SPACE_CARD_SLIDE_SCROLL: 'home_spaceCardSlide_scroll',
    SPACE_MORE_CARD_CLICK: 'home_spaceMoreCard_click',
    STYLE_MORE_CLICK: 'home_styleMore_click',
    STYLE_CARD_CLICK: 'home_styleCard_click',
    WEB_BANNER_CLICK: 'home_webBanner_click',
    PAGE_SCROLL: 'home_page_scroll',
  },

  shop: {
    PAGE_VIEW: 'shop_page_view',
    SEARCH_BAR_CLICK: 'shop_searchBar_click',
    SEARCH_SUBMIT: 'shop_search_submit',
    SEARCH_CLEAR: 'shop_search_clear',
    FILTER_SHT_VIEW: 'shop_filterSht_view',
    FILTER_LIST_CLICK: 'shop_filterList_click',
    FILTER_SHT_RESET_CLICK: 'shop_filterShtReset_click',
    LIST_PRODUCT_VIEW: 'shop_listProduct_view',
    LIST_EMPTY_VIEW: 'shop_listEmpty_view',
    FEED_CARD_SELECT_CLICK: 'shop_feedCardSelect_click',
    FEED_CARD_DETAIL_CLICK: 'shop_feedCardDetail_click',
    FEED_DETAIL_MD_VIEW: 'shop_feedDetailMD_view',
    FEED_DETAIL_MD_SELECT_CLICK: 'shop_feedDetailMDSelect_click',
    FEED_DETAIL_MD_SAVE_CLICK: 'shop_feedDetailMDSave_click',
    FEED_DETAIL_MD_GO_SITE_CLICK: 'shop_feedDetailMDGoSite_click',
    FEED_DETAIL_MD_UNSAVE_CLICK: 'shop_feedDetailMDUnsave_click',
    FEED_DETAIL_MD_CLOSE_CLICK: 'shop_feedDetailMDClose_click',
    FEED_CARD_UNSELECT_CLICK: 'shop_feedCardUnselect_click',
    SELECT_SHEET_SWIPE_UP: 'shop_selectSheet_swipeUp',
    SELECT_SHEET_SWIPE_DOWN: 'shop_selectSheet_swipeDown',
    SELECT_SHEET_ITEM_CLICK: 'shop_selectSheetItem_click',
    SELECT_SHEET_ADD_ITEM_CLICK: 'shop_selectSheetAddItem_click',
    SELECT_SHEET_REMOVE_CLICK: 'shop_selectSheetRemove_click',
    SELECT_SHEET_CTA_CLICK: 'shop_selectSheetCTA_click',
    SELECT_SHEET_ITEM_COUNT_CHANGE: 'shop_selectSheetItemCount_change',
    FILTER_SHT_SUBMIT: 'shop_filterSht_submit',
  },

  bannerDetail: {
    PAGE_VIEW: 'bannerDetail_page_view',
    PAGE_SCROLL: 'bannerDetail_page_scroll',
    CHIP_CLICK: 'bannerDetail_chip_click',
    BTN_CTA_CLICK: 'bannerDetail_btnCTA_click',
    BTN_BACK_CLICK: 'bannerDetail_btnBack_click',
  },

  styleList: {
    PAGE_VIEW: 'styleList_page_view',
    PAGE_SCROLL: 'styleList_page_scroll',
    CARD_STYLE_CLICK: 'styleList_cardStyle_click',
    BTN_BACK_CLICK: 'styleList_btnBack_click',
  },

  styleDetail: {
    PAGE_VIEW: 'styleDetail_page_view',
    PAGE_SCROLL: 'styleDetail_page_scroll',
    BTN_BACK_CLICK: 'styleDetail_btnBack_click',
    BTN_CTA_CLICK: 'styleDetail_btnCTA_click',
  },

  loginSocial: {
    PAGE_VIEW: 'loginSocial_page_view',
    BTN_CTA_CLICK: 'loginSocial_btnCTA_click',
    BTN_SERVICE_TERM_CLICK: 'loginSocial_btnserviceTerm_click',
    BTN_PRIVACY_POLICY_CLICK: 'loginSocial_btnprivacyPolicy_click',
    TOAST_LOGIN_ERROR_VIEW: 'loginSocial_toastLoginError_view',
  },

  signupForm: {
    PAGE_VIEW: 'signupForm_page_view',
    BROWSER_BACK_CLICK: 'signupForm_browserBack_click',
    BROWSER_BACK_SWIPE: 'signupForm_browserBack_swipe',
    INPUT_NICKNAME_FOCUS: 'signupForm_inputNickname_focus',
    BTN_NICK_RANDOM_CLICK: 'signupForm_btnNickRandom_click',
    BTN_NICK_CLEAR_CLICK: 'signupForm_btnNickClear_click',
    INPUT_BIRTH_FOCUS: 'signupForm_inputBirth_focus',
    ERROR_NICK_SIGN_VIEW: 'signupForm_errorNickSign_view',
    ERROR_NICK_NUM_VIEW: 'signupForm_errorNickNum_view',
    ERROR_BIRTH_INCORRECT_VIEW: 'signupForm_errorBirthIncorrect_view',
    ERROR_BIRTH_UNDER14_VIEW: 'signupForm_errorBirthUnder14_view',
    BTNGENDER_CLICK: 'signupForm_btngender_click',
    /** Action 컬럼 없음 — 노션 Event Code 그대로 */
    BTN_CTA: 'signupForm_btnCTA',
    NOT_COMP_MD_VIEW: 'signupForm_notCompMD_view',
    NOT_COMP_MD_QUIT_CLICK: 'signupForm_notCompMDQuit_click',
    NOT_COMP_MD_KEEP_CLICK: 'signupForm_notCompMDKeep_click',
  },

  signupComp: {
    PAGE_VIEW: 'signupComp_page_view',
    /** Action 컬럼 없음 — 노션 Event Code 그대로 */
    BTN_CTA: 'signupComp_btnCTA',
  },

  roomType: {
    PAGE_VIEW: 'roomType_page_view',
    CARD_ROOM_CLICK: 'roomType_cardRoom_click',
    FILTER_SHT_SUBMIT: 'roomType_filterSht_submit',
    PAGE_SCROLL: 'roomType_page_scroll',
    BTN_BACK_CLICK: 'roomType_btnBack_click',
    VIEW_SHT_VIEW: 'roomType_viewSht_view',
    FILTER_SHT_RESET: 'roomType_filterSht_reset',
    FILTER_SHT_CLOSE_CLICK: 'roomType_filterShtClose_click',
    FILTER_SHT_DIMMED_CLICK: 'roomType_filterShtDimmed_click',
    LIST_ROOM_CARD_VIEW: 'roomType_listRoomCard_view',
    LIST_EMPTY_VIEW: 'roomType_listEmpty_view',
    EMPTY_LIST_REC_CARD_VIEW: 'roomType_emptyListRecCard_view',
    EMPTY_LIST_REC_CARD_CLICK: 'roomType_emptyListRecCard_click',
    VIEW_SHT_ARROW_RIGHT_CLICK: 'roomType_viewShtArrowRight_click',
    VIEW_SHT_ARROW_LEFT_CLICK: 'roomType_viewShtArrowLeft_click',
    VIEW_SHT_FLIP_CLICK: 'roomType_viewShtFlip_click',
    VIEW_SHT_SUBMIT: 'roomType_viewSht_submit',
    MD_RESET_INFO_VIEW: 'roomType_mdResetInfo_view',
  },

  selectMoodboard: {
    BTN_CTA_INACTIVE_CLICK: 'selectMoodboard_btnCTAInactive_click',
    BTN_CTA_CLICK: 'selectMoodboard_btnCTA_click',
    PAGE_VIEW: 'selectMoodboard_page_view',
    PAGE_SCROLL: 'selectMoodboard_page_scroll',
    CARD_CLICK: 'selectMoodboard_card_click',
  },

  selectFurniture: {
    PAGE_VIEW: 'selectFurniture_page_view',
    PAGE_SCROLL: 'selectFurniture_page_scroll',
    DROP_DOWN_ACTIVITY_CLICK: 'selectFurniture_dropDownActivity_click',
    ACTIVITY_SHEET_VIEW: 'selectFurniture_activitySheet_view',
    ACTIVITY_SHEET_CTA_CLICK: 'selectFurniture_activitySheetCTA_click',
    CHIP_FURNITURE_CLICK: 'selectFurniture_chipFurniture_click',
    CHIP_FURNITURE_CLEAR: 'selectFurniture_chipFurniture_clear',
    BTN_CTA_CLICK: 'selectFurniture_btnCTA_click',
    ERROR_TOAST_DESELECT_VIEW: 'selectFurniture_errorToastDeselect_view',
  },

  loadImg: {
    PAGE_VIEW: 'loadImg_page_view',
    PAGE_REFRESH: 'loadImg_page_refresh',
    PAGE_BACK_SWIPE: 'loadImg_pageBack_swipe',
    CARD_PREFERENCE_VIEW: 'loadImg_cardPreference_view',
    CARD_PREFERENCE_CLICK: 'loadImg_cardPreference_click',
    MD_GEN_IMG_QUIT_VIEW: 'loadImg_mdGenImgQuit_view',
  },

  resultRec: {
    PAGE_VIEW: 'resultRec_page_view',
    PAGE_SCROLL: 'resultRec_page_scroll',
    BTN_BACK_CLICK: 'resultRec_btnBack_click',
    FEED_CARDON_CARD_CLICK: 'resultRec_feedCardonCard_click',
    LIST_REC_VIEW: 'resultRec_listRec_view',
    FEED_CARD_GO_SITE_CLICK: 'resultRec_feedCardGoSite_click',
    FEED_CARD_SAVE_CLICK: 'resultRec_feedCardSave_click',
    FEED_CARD_UNSAVE_CLICK: 'resultRec_feedCardUnsave_click',
    BTN_ARROW_RIGHT_CLICK: 'resultRec_btnArrowRight_click',
    BTN_ARROW_LEFT_CLICK: 'resultRec_btnArrowLeft_click',
    SLIDE_FILTER_COMB_VIEW: 'resultRec_slideFilterComb_view',
    CHIP_FILTER_SELECTED: 'resultRec_chipFilter_selected',
    BTN_MORE_IMG_CLICK: 'resultRec_btnMoreImg_click',
    MD_NOT_YET_VIEW: 'resultRec_mdNotYet_view',
    BTN_PREFERENCE_CLICK: 'resultRec_btnPreference_click',
    TOAST_THX_OPINION_VIEW: 'resultRec_toastThxOpinion_view',
  },

  resultList: {
    PAGE_VIEW: 'resultList_page_view',
    PAGE_SCROLL: 'resultList_page_scroll',
    LIST_CARD_CLICK: 'resultList_listCard_click',
    BTN_BACK_CLICK: 'resultList_btnBack_click',
    LIST_CARD_GO_SITE_CLICK: 'resultList_listCardGoSite_click',
    LIST_CARD_SAVE_CLICK: 'resultList_listCardSave_click',
    LIST_CARD_UNSAVE_CLICK: 'resultList_listCardUnsave_click',
    LIST_SELECTED_VIEW: 'resultList_listSelected_view',
    FEED_CARDON_CARD_CLICK: 'resultList_feedCardonCard_click',
    FEED_CARD_GO_SITE_CLICK: 'resultList_feedCardGoSite_click',
    FEED_CARD_SAVE_CLICK: 'resultList_feedCardSave_click',
    FEED_CARD_UNSAVE_CLICK: 'resultList_feedCardUnsave_click',
    BTN_RESELECT_CLICK: 'resultList_btnReselect_click',
    LIST_LOOK_AROUND_VIEW: 'resultList_listLookAround_view',
    IMG_CARDON_CARD_CLICK: 'resultList_imgCardonCard_click',
    LIST_OTHERS_IMG_VIEW: 'resultList_listOthersImg_view',
  },

  mypage: {
    FEED_CARD_VIEW: 'mypage_feedCard_view',
    FEED_CARD_GO_SITE_CLICK: 'mypage_feedCardGoSite_click',
    FEED_CARD_SAVE_CLICK: 'mypage_feedCardSave_click',
    FEED_CARD_UNSAVE_CLICK: 'mypage_feedCardUnsave_click',
    LIST_CARD_CLICK: 'mypage_listCard_click',
    LIST_CARD_GO_SITE_CLICK: 'mypage_listCardGoSite_click',
    LIST_CARD_SAVE_CLICK: 'mypage_listCardSave_click',
    LIST_CARD_UNSAVE_CLICK: 'mypage_listCardUnsave_click',
    TAB_SAVED_ITEM_CLICK: 'mypage_tabSavedItem_click',
    TAB_GEN_IMG_CLICK: 'mypage_tabGenImg_click',
    BTN_BACK_CLICK: 'mypage_btnBack_click',
    CARD_GEN_IMG_CLICK: 'mypage_cardGenImg_click',
    LIST_GEN_IMG_VIEW: 'mypage_listGenImg_view',
    LIST_SAVED_ITEM_VIEW: 'mypage_listSavedItem_view',
    BTN_MORE_GEN_IMG_CLICK: 'mypage_btnMoreGenImg_click',
    FEED_CARDON_CARD_CLICK: 'mypage_feedCardonCard_click',
    SLIDE_GEN_IMG_ITEM_SCROLL: 'mypage_slideGenImgItem_scroll',
    BTN_SETTING_CLICK: 'mypage_btnSetting_click',
    LIST_EMPTY_GEN_IMG_VIEW: 'mypage_listEmptyGenImg_view',
    LIST_EMPTY_SAVED_ITEM_VIEW: 'mypage_listEmptySavedItem_view',
    BTN_CTA_EMPTY_GEN_IMG_CLICK: 'mypage_btnCTAEmptyGenImg_click',
    BTN_TEXT_EMPTY_GEN_IMG_CLICK: 'mypage_btnTextEmptyGenImg_click',
    BTN_CTA_EMPTY_SAVED_ITEM_CLICK: 'mypage_btnCTAEmptySavedItem_click',
    BTN_TEXT_EMPTY_SAVED_ITEM_CLICK: 'mypage_btnTextEmptySavedItem_click',
  },

  setting: {
    PAGE_VIEW: 'setting_page_view',
    BTN_LOGOUT_CLICK: 'setting_btnLogout_click',
    BTN_SUCCESSION_CLICK: 'setting_btnSuccession_click',
    MD_SUCCESSION_VIEW: 'setting_mdSuccession_view',
  },

  editProfile: {
    PAGE_VIEW: 'editProfile_page_view',
    BTN_CTA_CLICK: 'editProfile_btnCTA_click',
  },

  privacyPolicy: {
    PAGE_VIEW: 'privacyPolicy_page_view',
  },

  serviceTerm: {
    PAGE_VIEW: 'serviceTerm_page_view',
  },
} as const;

type EventValue<T> =
  T extends Record<string, infer V>
    ? V extends string
      ? V
      : EventValue<V>
    : never;

/** 모든 Event Code 문자열 유니온 */
export type GaEventName = EventValue<typeof GA_EVENTS>;
