import generateBarChartsFromData from "./NewBar";
import { chartData } from "./apiResponse";

function App() {
  // const barCharts = generateBarChartsFromData(chartData);

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-[3em]">
        {generateBarChartsFromData( chartData )}
      </div>
    </div>
  );
}

export default App;
