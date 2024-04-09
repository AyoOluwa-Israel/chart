import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ResultObject {
  [key: string]:
    | {
        [key: string]: number;
      }
    | object;
}

interface ChartObject {
  title: string;
  description: string;
  result: Record<string, never> | ResultObject | object;
  totalCount: number;
  chartType: string;
  status: boolean;
}

const generateBarChartsFromData = (
  chartDataArray: ChartObject[]
): JSX.Element[] => {
  const barCharts: JSX.Element[] = [];

  chartDataArray.forEach((chartData, i) => {
    const { title, description, result } = chartData;
    if (result !== undefined && Object.keys(result).length > 0) {
      const locations = Object.keys(result as ResultObject);

      const r = locations[0];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      const categories = Object.keys(result[r]);

      const datasets = categories.map((category) => {
        const data = locations.map(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          (location) => (result[location][category] as number) || 0
        );
        const backgroundColor = getBackgroundColor(); // Use dynamic color if needed
        return {
          label: category,
          data: data,
          backgroundColor: backgroundColor,
          borderWidth: 1,
        };
      });

      const chartChartData = {
        labels: locations,
        datasets: datasets,
      };

      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      console.log(chartChartData);

      const barChart = (
        <div
          key={`${title}-${i}`}
          className="text-center flex flex-col justify-center items-center space-y-4 "
        >
          <h2 className="text-xl">{title}</h2>
          <p className="text-sm">{description}</p>
          <Bar data={chartChartData} options={options} />
        </div>
      );

      barCharts.push(barChart);
    }
  });

  return barCharts;
};

const getBackgroundColor = () => {
  const randomRed = Math.floor(Math.random() * 256);
  const randomGreen = Math.floor(Math.random() * 256);
  const randomBlue = Math.floor(Math.random() * 256);

  // Adjust opacity as needed (0.5 in this example)
  return `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, 0.5)`;
};

export default generateBarChartsFromData;
