import * as styles from './TitleStep.css';

interface TitleStepProps {
  stepNumber: number;
  title: string;
}

const TitleStep = ({ stepNumber, title }: TitleStepProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.stepLabelBox}>
        <span className={styles.stepLabel}>STEP {stepNumber}</span>
      </div>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export default TitleStep;
