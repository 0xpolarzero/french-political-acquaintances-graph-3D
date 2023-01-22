import * as CHARTS from 'recharts';
import { ErrorComponent } from './Utils';
import { formatStatsForChart } from 'src/systems';

const ChartRadar = ({ statsA, statsB, labelA, labelB, color }) => {
  const data = formatStatsForChart(statsA, statsB, 'radar');
  const baseColor = color ? color : '#8884d8';
  const compareColor = color ? '#999999' : '#82ca9d';

  return (
    <>
      <ErrorComponent data={data} />
      <CHARTS.ResponsiveContainer width='100%' height={400}>
        <CHARTS.RadarChart cx='50%' cy='50%' outerRadius='80%' data={data}>
          <CHARTS.PolarGrid />
          <CHARTS.PolarAngleAxis dataKey='type' />
          <CHARTS.PolarRadiusAxis angle={60} domain={[0, 100]} />
          <CHARTS.Radar
            name={labelA}
            dataKey='A'
            stroke={baseColor}
            fill={baseColor}
            fillOpacity={0.7}
          />
          <CHARTS.Radar
            name={labelB}
            dataKey='B'
            stroke={compareColor}
            fill={compareColor}
            fillOpacity={0.5}
          />
          <CHARTS.Legend />
        </CHARTS.RadarChart>
      </CHARTS.ResponsiveContainer>
    </>
  );
};

const ChartBar = ({ statsA, statsB, labelA, labelB, color }) => {
  const data = formatStatsForChart(statsA, statsB, 'bar');
  const baseColor = color ? color : '#8884d8';
  const compareColor = color ? '#999999' : '#82ca9d';

  return (
    <>
      <ErrorComponent data={data} />
      <CHARTS.ResponsiveContainer width='100%' height={400}>
        <CHARTS.BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CHARTS.CartesianGrid strokeDasharray='3 3' />
          <CHARTS.XAxis dataKey='type' />
          <CHARTS.YAxis />
          <CHARTS.Tooltip />
          <CHARTS.Legend />
          <CHARTS.Bar dataKey='A' name={labelA} fill={baseColor} />
          <CHARTS.Bar dataKey='B' name={labelB} fill={compareColor} />
        </CHARTS.BarChart>
      </CHARTS.ResponsiveContainer>
    </>
  );
};

export { ChartRadar, ChartBar };
