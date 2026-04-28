import { generatePath, useNavigate } from 'react-router-dom';

import { useGetStyleListQuery } from '@apis/queries/useGetStyleQuery';

import FallbackImage from '@assets/v2/images/bannerFallback.svg';

import InlineError from '@components/inlineError/InlineError';
import Loading from '@components/loading/Loading';
import TitleNavBar from '@components/v2/navBar/TitleNavBar';
import StyleCard from '@components/v2/styleCard/StyleCard';

import { ROUTES } from '@/routes/paths';

import * as styles from './StyleListPage.css';

const StyleListPage = () => {
  const navigate = useNavigate();

  const handleStyleClick = (styleId: number) => {
    navigate(generatePath(ROUTES.STYLE_DETAIL, { styleId: String(styleId) }));
  };

  const {
    data: stylesData = [],
    isFetching,
    isError,
    refetch,
  } = useGetStyleListQuery();

  return (
    <section className={styles.wrapper}>
      <TitleNavBar
        title="스타일 전체 보기"
        backLabel="이전"
        onBackClick={() => navigate(-1)}
      />

      <div className={styles.cardList}>
        {isFetching ? (
          <Loading />
        ) : isError ? (
          <InlineError
            onRetry={refetch}
            message="스타일 전체 보기를 불러올 수 없습니다"
          />
        ) : (
          <>
            {stylesData.map((style) => (
              <StyleCard
                size="L"
                key={style.id}
                imageSrc={style.imageUrl || FallbackImage}
                title={style.name}
                onClick={() => handleStyleClick(style.id)}
                imageLoading="eager"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default StyleListPage;
