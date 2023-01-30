import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, Tooltip, Label } from "recharts";
import PropTypes from "prop-types";
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
    return bigger1280px ? 810 : bigger768px ? 704 : 280;
  };

  const daysInResults = content.results
    .map(({ date }) => {
      const day = date.split(" ")[0];
      return day;
    })
    .filter((day, idx, arr) => arr.indexOf(day) === idx);
  const preparedData = daysInResults.map((day) => {
    const totalDayPages = content.results.reduce((acc, { date, pages }) => {
      return date.includes(day) ? acc + pages : acc;
    }, 0);
    return { date: day, pages: totalDayPages, planPages };
  });

  const fullData = [...preparedData, { date: preparedFinish, planPages }];

  return (
    <LineChart width={defineChartWidth()} height={280} data={fullData}>
      <Line type="monotone" dataKey="pages" stroke="#4735af" />
      <Line
        type="monotone"
        dataKey="planPages"
        stroke="#f25137"
        connectNulls={true}
        dot={false}
      />
      <XAxis dataKey="date" tick={false}>
        <Label
          value="TIME"
          position="insideBottomRight"
          offset={10}
          stroke="#242A37"
          strokeWidth={0.3}
        />
      </XAxis>
      <YAxis tick={false} mirror={true}>
        <Label
          value="PAGES"
          position="insideTop"
          offset={10}
          stroke="#242A37"
          strokeWidth={0.3}
        />
      </YAxis>
      <Tooltip content={<CustomTooltip />} />
    </LineChart>
  );
};

export default Chart;
