import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@styles/tokens/color.css';
import { zIndex } from '@styles/tokens/zIndex';

export const backdrop = style({
  position: 'fixed',
  zIndex: zIndex.backdrop,
  top: 0,
  left: 0,
  transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
  visibility: 'hidden',
  opacity: 0,
  backgroundColor: colorVars.color.gray999_50,
  pointerEvents: 'none',
  touchAction: 'none',
  width: '100%',
  height: '100%',
});

export const backdropVisible = style({
  visibility: 'visible',
  opacity: 1,
  pointerEvents: 'auto',
});

export const sheetWrapper = style({
  position: 'fixed',
  zIndex: zIndex.sheet,
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, calc(var(--base-y) + var(--drag-y)))',
  transition: 'transform 0.3s ease-in-out',

  willChange: 'transform',
  width: '100%',
  maxWidth: '50rem',

  overscrollBehavior: 'none',

  userSelect: 'none',
  vars: {
    '--base-y': '100%',
    '--drag-y': '0px',
  },
  WebkitOverflowScrolling: 'touch', // iOS에서 부드러운 스크롤
  WebkitUserSelect: 'none', // Safari에서 텍스트 선택 방지
  WebkitTouchCallout: 'none', // iOS에서 터치 콜아웃 방지

  selectors: {
    '&:active': {
      cursor: 'grabbing',
    },
  },
});

export const sheetState = styleVariants({
  expanded: {
    vars: {
      '--base-y': '0%',
    },
  },
  collapsed: {
    vars: {
      '--base-y': '100%',
    },
  },
});

export const contentWrapper = recipe({
  base: {
    backgroundColor: colorVars.color.gray000,
    minHeight: '30rem',
    overflow: 'hidden',
  },
  variants: {
    type: {
      basic: {
        borderRadius: '30px 30px 0 0',
        padding: '0 2rem 2rem 2rem',
      },
      curation: {
        borderRadius: '12px 12px 0 0',
        boxShadow: '0 -10px 14px 0 rgba(209, 213, 219, 0.1)',
        padding: '0 1.6rem',
      },
    },
  },
});

export const dragHandleContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'grab',
    touchAction: 'none',
    width: '100%',
    height: '2.8rem',
    userSelect: 'none',
  },
  variants: {
    type: {
      basic: {
        marginBottom: '2rem',
      },
      curation: {
        marginBottom: '0',
      },
    },
  },
});
