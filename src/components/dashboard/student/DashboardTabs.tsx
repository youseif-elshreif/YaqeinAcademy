import styles from "./DashboardTabs.module.css";
import { DashboardTabsProps } from "@/src/types";

const DashboardTabs = ({
  tabs,
  activeTab,
  onTabChange,
}: DashboardTabsProps) => {
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.activeTab : ""
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardTabs;
