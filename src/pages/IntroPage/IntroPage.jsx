import IntroPageList from "../../modules/IntroPageList";
import IntroButtons from "../../modules/IntroButtons";
import introPageData from "../../data/intro-page-data";
import styles from "./introPage.module.scss";

const IntroPage = () => {
  const { helpYouTo, youMay } = introPageData;
  return (
    <div className="container">
      <div className={styles.intro}>
        <h1 className={styles.header}>Books Reading</h1>
        <h2 className={styles.subHeader}>Will help you to</h2>
        <IntroPageList items={helpYouTo} />
        <h2 className={styles.subHeaderLower}>You may also</h2>
        <IntroPageList items={youMay} />
        <IntroButtons />
      </div>
    </div>
  );
};

export default IntroPage;
