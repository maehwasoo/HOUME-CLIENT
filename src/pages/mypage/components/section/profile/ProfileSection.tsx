import ProfileImage from '@assets/images/profileImg.svg?react';

import CreditChip from '@components/creditChip/CreditChip';

import * as styles from './ProfileSection.css';

interface ProfileSectionProps {
  userName: string;
  credit: number;
  maxCredit: number;
}

const ProfileSection = ({
  userName,
  credit,
  maxCredit,
}: ProfileSectionProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.profileBox}>
        <ProfileImage className={styles.profileImage} />
        <p className={styles.userName}>{userName}님</p>
      </div>
      <CreditChip creditCount={credit} maxCredit={maxCredit} />
    </section>
  );
};

export default ProfileSection;
