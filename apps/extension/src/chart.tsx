import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { formatTime } from "./lib/format-time";
import { RotateCcw } from "lucide-react";

const data1 = [
  { label: "Group A", value: 400 },
  { label: "Group B", value: 300 },
  { label: "Group C", value: 300 },
  { label: "Group D", value: 200 },
  { label: "Group E", value: 278 },
  { label: "Group F", value: 189 },
];

const data2 = [
  { label: "Group A", value: 2400 },
  { label: "Group B", value: 4567 },
  { label: "Group C", value: 1398 },
  { label: "Group D", value: 9800 },
  { label: "Group E", value: 3908 },
  { label: "Group F", value: 4800 },
];

// type StorageData = {
//   [key: string]: { time: number; frequency: number; elapsed: number };
// };

type ChartData = {
  value: number;
  label: string;
};

export default function Chart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isActive, setActive] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.local.get(["site_data"], (data) => {
      let cData: ChartData[] = Object.keys(data.site_data).map((key) => ({
        value: data.site_data[key].elapsed,
        label: key.replace("https://", "").replace("www.", ""),
      }));
      console.log(cData);
      setChartData(cData);
    });
  }, [isActive]);

  return (
    <div>
      <Button variant={"outline"} onClick={() => setActive((p) => !p)}>
        <RotateCcw />
      </Button>
      <PieChart
        series={[
          {
            data: chartData,
            valueFormatter: (item) => formatTime(item.value),
            innerRadius: 40,
            outerRadius: 80,
            cornerRadius: 4,
            paddingAngle: 2,
            cx: 200,
          },
        ]}
        colors={[
          "#ffa600",
          "#ff7c43",
          "#f95d6a",
          "#d45087",
          "#a05195",
          "#665191",
          "#2f4b7c",
          "#003f5c",
        ]}
        height={400}
        width={400}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "left" },
            padding: 0,
          },
        }}
      />
    </div>
  );
}
