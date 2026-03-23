import IntroSection from './IntroSection/IntroSection';
import * as styles from './ProductTab.css';
import SearchSection from './SearchSection/SearchSection';

const ProductTab = () => {
  return (
    <div className={styles.container}>
      <SearchSection />
      <IntroSection />
    </div>
  );
};

export default ProductTab;
