import type {
  ActionButtonColor,
  ActionButtonVariant,
} from '@shared/components/v2/button/actionButton/ActionButton';
import type { IconName } from '@shared/components/v2/icon/Icon';
import type { ABTestGroup } from '@shared/types/abTest';

export interface LandingCtaStyle {
  buttonVariant: ActionButtonVariant;
  color: ActionButtonColor;
  leftIcon?: IconName;
}

/** 랜딩 CTA A/B: A = solid inverse, B = ghost + 아이콘 */
export const LANDING_CTA_BY_VARIANT: Record<ABTestGroup, LandingCtaStyle> = {
  A: {
    buttonVariant: 'solid',
    color: 'inverse',
  },
  B: {
    buttonVariant: 'ghost',
    color: 'primary',
    leftIcon: 'DoubleStar',
  },
};
