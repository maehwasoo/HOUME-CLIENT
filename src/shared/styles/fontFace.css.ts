import { globalFontFace } from '@vanilla-extract/css';

globalFontFace('Pretendard', {
  src: `url(/fonts/Pretendard-Regular.woff2)`,
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '400',
});

globalFontFace('Pretendard', {
  src: `url(/fonts/Pretendard-Medium.woff2)`,
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '500',
});

globalFontFace('Pretendard', {
  src: `url(/fonts/Pretendard-SemiBold.woff2)`,
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '600',
});
