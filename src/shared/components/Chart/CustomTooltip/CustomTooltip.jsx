import styles from "./customTooltip.module.scss";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { payload: dataContent, name } = payload[0];
    const { pages, planPages } = dataContent;
    return (
      <div className={styles.general}>
        <p>Day: {label}</p>
        {payload.length === 1 ? (
          name === "pages" ? (
            <p>Pages read: {pages}</p>
          ) : (
            <p>Pages/day: {planPages}</p>
          )
        ) : (
          <>
            <p>Pages read: {pages}</p>
            <p>Pages/day: {planPages}</p>
          </>
        )}
      </div>
    );
  }
};

export default CustomTooltip;
