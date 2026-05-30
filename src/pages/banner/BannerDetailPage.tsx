import { useEffect, useId, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useBannerDetailQuery } from '@pages/home/apis/queries/useBannerDetailQuery';

import { ROUTES } from '@routes/paths';

import { ENTRY_ROUTE, useImageFlowStore } from '@store/useImageFlowStore';

import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';
import Icon from '@shared/components/v2/icon/Icon';
import TitleNavBar from '@shared/components/v2/navBar/TitleNavBar';

import InlineError from '@components/inlineError/InlineError';
import Loading from '@components/loading/Loading';

import { useLoginGate } from '@hooks/useLoginGate';

import StyleCard from '@/shared/components/v2/styleCard/StyleCard';

import * as styles from './BannerDetailPage.css';

const BannerDetailPage = () => {
  const navigate = useNavigate();
  const { requireLogin } = useLoginGate();
  const { bannerId = '' } = useParams<{ bannerId: string }>();
  const questionId = useId();
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const parsedBannerId = Number(bannerId);
  const {
    data: bannerDetail,
    isPending,
    isError,
    refetch,
  } = useBannerDetailQuery(parsedBannerId);

  useEffect(() => {
    setSelectedAnswerId(null);
  }, [parsedBannerId]);

  if (isPending) {
    return (
      <div className={styles.page}>
        <TitleNavBar
          title="원하는 공간 선택하기"
          backLabel="이전"
          onBackClick={() => navigate(-1)}
        />
        <main className={styles.body}>
          <Loading />
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <TitleNavBar
          title="원하는 공간 선택하기"
          backLabel="이전"
          onBackClick={() => navigate(-1)}
        />
        <main className={styles.body}>
          <InlineError onRetry={refetch} />
        </main>
      </div>
    );
  }

  if (!bannerDetail) {
    throw new Response('Banner detail not found', { status: 404 });
  }

  // 배너 상세 CTA: setFlow(HOME_BANNER) → 로그인 체크 → 배너 상세로 복귀
  const handleCta = () => {
    if (selectedAnswerId === null) return;

    useImageFlowStore.getState().setFlow({
      entryRoute: ENTRY_ROUTE.HOME_BANNER,
      preset: {
        type: 'banner',
        bannerId: parsedBannerId,
        answerId: selectedAnswerId,
      },
    });

    requireLogin(() => navigate(ROUTES.IMAGE_SETUP));
  };

  return (
    <div className={styles.page} key={bannerId}>
      <TitleNavBar
        title="원하는 공간 선택하기"
        backLabel="이전"
        onBackClick={() => navigate(-1)}
      />
      <main className={styles.body}>
        <div className={styles.bannerContainer}>
          <StyleCard
            size="L"
            scaleOnPress={false}
            imageSrc={bannerDetail.bannerImageUrl ?? ''}
            title={bannerDetail.bannerName ?? '배너'}
          />
        </div>

        <div className={styles.questionContainer}>
          <h2 className={styles.question} id={questionId}>
            {bannerDetail.question ?? ''}
          </h2>
          <ul
            className={styles.optionList}
            role="radiogroup"
            aria-labelledby={questionId}
          >
            {(bannerDetail.answers ?? []).map((answer) => {
              if (answer.id == null) return null;
              const answerId = answer.id;
              const label = answer.text ?? '';
              const selected = selectedAnswerId === answerId;

              return (
                <li key={`${answerId}-${label}`}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={styles.optionRow}
                    onClick={() => setSelectedAnswerId(answerId)}
                  >
                    <span className={styles.optionIcon} aria-hidden>
                      <Icon
                        name={selected ? 'RadioSelected' : 'RadioDefault'}
                        size="20"
                      />
                    </span>
                    <span className={styles.optionLabel}>{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </main>

      <div className={styles.ctaBar}>
        <ActionButton
          variant="solid"
          color="primary"
          size="2XL"
          fullWidth
          disabled={selectedAnswerId === null}
          onClick={handleCta}
        >
          이 스타일로 우리 집 꾸미기
        </ActionButton>
      </div>
    </div>
  );
};

export default BannerDetailPage;
