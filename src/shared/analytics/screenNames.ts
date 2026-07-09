/**
 * screen_name / return_screen_name / previous_screen_name (노션 Page Code 표)
 *
 * | screen_name     | URL (preview.houme.kr 이후)                                      |
 * |-----------------|------------------------------------------------------------------|
 * | landing         | /landing                                                         |
 * | loginSocial     | /login                                                           |
 * | signupForm      | /signup                                                          |
 * | signupComp      | /welcome                                                         |
 * | home            | /                                                                |
 * | bannerDetail    | /banner/:id                                                      |
 * | roomType        | /imageSetup                                                      |
 * | styleList       | /styles                                                          |
 * | styleDetail     | /styles/:id                                                      |
 * | shop            | /?tab=product                                                    |
 * | selectMoodboard | /imageSetup?image-generation-funnel.step=InteriorStyle           |
 * | selectFurniture | /imageSetup?image-generation-funnel.step=ActivityInfo            |
 * | loadImg         | /generate                                                        |
 * | resultRec       | /generate/result?houseId=id&viewType=FULL_FUNNEL                 |
 * | resultList      | /generate/result?houseId=id&viewType=PRODUCT                     |
 * | mypage          | /mypage                                                          |
 * | setting         | /mypage/setting                                                  |
 * | privacyPolicy   | /mypage/setting/privacy                                          |
 * | serviceTerm     | /mypage/setting/service                                          |
 * | editProfile     | /mypage/setting/profileEdit                                      |
 */
export const SCREEN_NAME = {
  LANDING: 'landing',
  LOGIN_SOCIAL: 'loginSocial',
  SIGNUP_FORM: 'signupForm',
  SIGNUP_COMP: 'signupComp',
  HOME: 'home',
  BANNER_DETAIL: 'bannerDetail',
  ROOM_TYPE: 'roomType',
  STYLE_LIST: 'styleList',
  STYLE_DETAIL: 'styleDetail',
  SHOP: 'shop',
  SELECT_MOODBOARD: 'selectMoodboard',
  SELECT_FURNITURE: 'selectFurniture',
  LOAD_IMG: 'loadImg',
  RESULT_REC: 'resultRec',
  RESULT_LIST: 'resultList',
  MYPAGE: 'mypage',
  SETTING: 'setting',
  PRIVACY_POLICY: 'privacyPolicy',
  SERVICE_TERM: 'serviceTerm',
  EDIT_PROFILE: 'editProfile',
} as const;

export type ScreenName = (typeof SCREEN_NAME)[keyof typeof SCREEN_NAME];
