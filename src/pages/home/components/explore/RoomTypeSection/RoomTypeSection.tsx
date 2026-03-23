import RoomTypeCard from '@components/v2/roomTypeCard/RoomTypeCard';

import TextButton from '@/shared/components/v2/btnText/TextButton';
import Icon from '@/shared/components/v2/icon/Icon';

import * as styles from './RoomTypeSection.css';

const ROOM_TYPE_MOCK = [
  {
    id: 'living',
    label: '거실',
    imageSrc: ' ',
  },
  {
    id: 'bedroom',
    label: '침실',
    imageSrc: ' ',
  },
  {
    id: 'kitchen',
    label: '주방',
    imageSrc: ' ',
  },
  {
    id: 'study',
    label: '서재',
    imageSrc: ' ',
  },
  {
    id: 'bathroom',
    label: '욕실',
    imageSrc: ' ',
  },
] as const;

const RoomTypeSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.sectionTitle}>우리 집 공간으로 시작하기</h2>
        <TextButton
          color="secondary"
          size="s"
          rightIcon={<Icon name="ArrowRight" size="16" />}
          onClick={() => {}}
        >
          더보기
        </TextButton>
      </div>
      <div className={styles.cardScroll}>
        <div className={styles.cardList}>
          {ROOM_TYPE_MOCK.map((room) => (
            <RoomTypeCard
              key={room.id}
              type="default"
              size="s"
              label={room.label}
              imageSrc={room.imageSrc}
              onClick={() => {}}
            />
          ))}
          <RoomTypeCard type="more" size="s" onClick={() => {}} />
        </div>
      </div>
    </section>
  );
};

export default RoomTypeSection;
