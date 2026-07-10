/** 가구 선택 — selected_activity_chip */
export const ACTIVITY_CHIP = {
  DEFAULT: 'default',
  WORK_REMOTE: 'work_remote',
  READING: 'reading',
  SEDENTARY: 'sedentary',
  HOME_CAFE: 'home_cafe',
} as const;

export type ActivityChip = (typeof ACTIVITY_CHIP)[keyof typeof ACTIVITY_CHIP];

/** 무드보드·가구 선택 파라미터 */
export interface ImageSetupParams {
  selected_moodBoard_ids?: string;
  count_moodBoard?: number;
  selected_activity_chip?: ActivityChip;
  /** ex. "bed_single, sofa_1seater, desk, mirror" */
  selected_furniture_chips?: string;
  count_furniture_chips?: number;
  has_previous_image?: boolean;
}
