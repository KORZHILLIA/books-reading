import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, Tooltip, Label } from "recharts";
import useBreakpoints from "../../hooks/useBreakpoints";
import CustomTooltip from "./CustomTooltip";
import trainingSelectors from "../../../redux/training/training-selectors";
import styles from "./chart.module.scss";

const Chart = () => {
  const { content } = useSelector(trainingSelectors.training);
  const { bigger1280px, bigger768px } = useBreakpoints();

  const start = new Date(content?.start).getTime();
  const finish = new Date(content?.finish).getTime();
  const preparedStart = content.start.slice(0, 10);
  const preparedFinish = content.finish.slice(0, 10);
  const days = Math.floor((finish - start) / (1000 * 3600 * 24));
  const totalPages = content?.books.reduce((acc, { pages }) => acc + pages, 0);
  const planPages = Math.round(totalPages / (days + 1));

  const defineChartWidth = () => {
    return bigger1280px ? 810 : bigger768px ? 600 : 240;
  };

  const daysInResults = content.results
    .map(({ date }) => {
      const day = date.split(" ")[0];
      return day;
    })
    .filter((day, idx, arr) => arr.indexOf(day) === idx);

  const preparedData = daysInResults
    .map((day) => {
      const totalDayPages = content.results.reduce((acc, { date, pages }) => {
        return date.includes(day) ? acc + pages : acc;
      }, 0);
      return { date: day, pages: totalDayPages, planPages };
    })
    .sort((result1, result2) => (result1.date > result2.date ? 1 : -1));

  const isLastDayPresentsInResults = content.results.some(({ date }) =>
    date.includes(preparedFinish)
  );

  const fullData = content.results.length
    ? [
        ...preparedData,
        !isLastDayPresentsInResults && { date: preparedFinish, planPages },
      ]
    : [
        { date: preparedStart, planPages },
        { date: preparedFinish, planPages },
      ];

  return (
    <div className={styles.general}>
      <LineChart width={defineChartWidth()} height={280} data={fullData}>
        <Line type="monotone" dataKey="pages" stroke="#4735af" />
        <Line
          type="monotone"
          dataKey="planPages"
          stroke="#f25137"
          connectNulls={true}
        />
        <XAxis dataKey="date">
          <Label
            value="TIME"
            position="bottom"
            offset={-5}
            stroke="#242A37"
            strokeWidth={0.3}
          />
        </XAxis>
        <YAxis>
          <Label
            value="PAGES"
            position="top"
            offset={-120}
            angle={-90}
            stroke="#242A37"
            strokeWidth={0.3}
          />
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </div>
  );
};

export default Chart;
