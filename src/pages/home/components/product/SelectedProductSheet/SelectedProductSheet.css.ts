import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: unitVars.unit.gapPadding['300'],
  width: '100%',
});

export const headerRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['100'],
  padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['200']}`,
});

export const title = style({
  color: colorVars.color.text.primary,
  ...fontVars.font.title_sb_18,
});

export const count = style({
  color: colorVars.color.text.tertiary,
  ...fontVars.font.body_r_14,
});

export const selectedCount = style({
  color: colorVars.color.text.primary,
  ...fontVars.font.title_sb_14,
});

export const compactRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: unitVars.unit.gapPadding['050'],
  padding: `0 ${unitVars.unit.gapPadding['050']}`,
  width: '100%',
});

export const compactSlot = style({
  aspectRatio: '1 / 1',
  border: `1px solid ${colorVars.color.border.tertiary}`,
  borderRadius: unitVars.unit.radius['300'],
  backgroundColor: colorVars.color.bg.primary,
});

export const compactSlotFilled = style([
  compactSlot,
  {
    overflow: 'hidden',
  },
]);

export const compactSlotContainer = style({
  aspectRatio: '1 / 1',
  position: 'relative',
  width: '100%',
});

export const compactImageWrap = style({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const compactImage = style({
  display: 'block',
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

export const compactImageFallback = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  color: colorVars.color.text.disabled,
});

export const expandedGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: unitVars.unit.gapPadding['200'],
  padding: `0 ${unitVars.unit.gapPadding['100']}`,
  width: '100%',
});

export const addCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: unitVars.unit.gapPadding['200'],
  width: '100%',
});

export const addImageWrap = style({
  aspectRatio: '1 / 1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${colorVars.color.border.tertiary}`,
  borderRadius: unitVars.unit.radius['300'],
  backgroundColor: colorVars.color.bg.primary,
  width: '100%',
});

export const addCardSquare = style({
  aspectRatio: '1 / 1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${colorVars.color.border.tertiary}`,
  borderRadius: unitVars.unit.radius['300'],
  backgroundColor: colorVars.color.bg.primary,
  width: '100%',
});

export const addCardContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: unitVars.unit.gapPadding['100'],
});

export const addLabel = style({
  margin: 0,
  textAlign: 'left',
  ...fontVars.font.caption_r_12,
  color: colorVars.color.text.disabled,
});

export const selectedCard = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const selectedCardContainer = style({
  position: 'relative',
  width: '100%',
  minWidth: 0,
});

export const selectedImage = style({
  display: 'block',
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

export const selectedImageWrap = style({
  aspectRatio: '1 / 1',
  position: 'relative',
  outline: `1px solid ${colorVars.color.border.tertiary}`,
  borderRadius: unitVars.unit.radius['300'],
  backgroundColor: colorVars.color.bg.primary,
  width: '100%',
  overflow: 'hidden',
});

export const selectedImageFallback = style({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  color: colorVars.color.text.disabled,
});

export const closeButton = recipe({
  base: {
    position: 'absolute',
    zIndex: 2,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: unitVars.unit.radius.full,
    padding: 0,
  },
  variants: {
    layout: {
      expanded: {
        top: '-0.4rem',
        right: '-0.4rem',
      },
      compact: {
        top: '-0.25rem',
        right: '-0.25rem',
      },
    },
  },
});

export const selectedInfoSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: unitVars.unit.gapPadding['050'],
  padding: `calc(${unitVars.unit.gapPadding['200']} + ${unitVars.unit.gapPadding['050']}) ${unitVars.unit.gapPadding['050']}`,
  width: '100%',
  minWidth: 0,
  minHeight: '7.2rem',
});

export const selectedTitle = style({
  overflow: 'hidden',
  wordBreak: 'break-all',
  color: colorVars.color.text.primary,
  ...fontVars.font.caption_r_12,
});

export const addInfoPlaceholder = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: `0 ${unitVars.unit.gapPadding['100']} ${unitVars.unit.gapPadding['100']}`,
  width: '100%',
  minHeight: '7.2rem',
});

export const selectedPriceRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.1rem',
});

export const selectedDiscountRate = style({
  ...fontVars.font.body_m_13,
  color: colorVars.color.text.brand,
});

export const selectedPrice = style({
  ...fontVars.font.body_m_13,
  color: colorVars.color.text.primary,
});
