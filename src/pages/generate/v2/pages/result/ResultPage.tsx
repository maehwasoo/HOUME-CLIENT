import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import type { GenerateImageData } from '@pages/generate/types/generate';

import TitleNavBar from '@components/v2/navBar/TitleNavBar';

import CurationResult from './components/curation/CurationResult';
import ListResult from './components/list/ListResult';
import * as styles from './ResultPage.css';

/** 라우팅 연동 전: 초기에 보여줄 결과 뷰 (`'curation'` | `'list'`) */
const DEV_UI_DEFAULT_RESULT_VIEW: 'curation' | 'list' = 'curation';

/** 라우팅·API 연동 전 UI 확인용 목 데이터 */
const MOCK_GENERATE_IMAGES: GenerateImageData[] = [
  {
    imageId: 90001,
    imageUrl: 'https://picsum.photos/seed/houme-gen-1/800/800',
    isMirror: false,
    equilibrium: 'mock',
    houseForm: 'mock',
    tagName: 'mock',
    name: 'mock',
  },
  {
    imageId: 90002,
    imageUrl: 'https://picsum.photos/seed/houme-gen-2/800/800',
    isMirror: false,
    equilibrium: 'mock',
    houseForm: 'mock',
    tagName: 'mock',
    name: 'mock',
  },
];

const ResultPage = () => {
  const navigate = useNavigate();
  const [resultView, setResultView] = useState<'curation' | 'list'>(
    DEV_UI_DEFAULT_RESULT_VIEW
  );

  return (
    <main className={styles.pageLayout}>
      <TitleNavBar
        background="transparent"
        placement="overContent"
        onBackClick={() => navigate(-1)}
      />
      <div className={styles.content}>
        <div className={styles.resultBody}>
          {resultView === 'curation' ? (
            <CurationResult images={MOCK_GENERATE_IMAGES} />
          ) : (
            <ListResult image={MOCK_GENERATE_IMAGES[0]} />
          )}
        </div>

        <div
          className={styles.devViewToggle}
          role="group"
          aria-label="개발용 결과 뷰"
        >
          <span className={styles.devViewToggleLabel}>
            (개발) 결과 뷰 — 라우팅 전 임시 전환
          </span>
          <div className={styles.devViewToggleButtons}>
            <button
              type="button"
              className={`${styles.devViewToggleBtn} ${
                resultView === 'curation' ? styles.devViewToggleBtnActive : ''
              }`}
              onClick={() => setResultView('curation')}
            >
              curation
            </button>
            <button
              type="button"
              className={`${styles.devViewToggleBtn} ${
                resultView === 'list' ? styles.devViewToggleBtnActive : ''
              }`}
              onClick={() => setResultView('list')}
            >
              list
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResultPage;
