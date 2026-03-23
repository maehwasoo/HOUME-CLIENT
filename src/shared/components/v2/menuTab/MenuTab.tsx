import * as styles from './MenuTab.css';

interface MenuTabItem<T extends string = string> {
  value: T;
  label: string;
}

interface MenuTabProps<T extends string> {
  tabs: MenuTabItem<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
}

const MenuTab = <T extends string>({
  tabs,
  activeTab,
  onTabChange,
}: MenuTabProps<T>) => {
  return (
    <div className={styles.menuTabBar} role="tablist">
      {tabs.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={activeTab === value}
          className={styles.tabButton({
            state: activeTab === value ? 'active' : 'inactive',
          })}
          onClick={() => onTabChange(value)}
        >
          <span className={styles.tabButtonText}>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default MenuTab;
