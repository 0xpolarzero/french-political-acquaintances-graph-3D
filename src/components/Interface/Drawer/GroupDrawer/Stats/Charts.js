import * as CHARTS from 'recharts';
import { formatStatsForChart } from 'src/systems';
import { ErrorComponent } from './Utils';

const ChartRadar = ({ data, name, color }) => {
  const formattedData = formatStatsForChart.group(data, 'radar');

  return (
    <>
      <ErrorComponent data={formattedData} />
      <CHARTS.ResponsiveContainer width='100%' height={400}>
        <CHARTS.RadarChart
          cx='50%'
          cy='50%'
          outerRadius='80%'
          data={formattedData}
        >
          <CHARTS.PolarGrid />
          <CHARTS.PolarAngleAxis dataKey='type' />
          <CHARTS.PolarRadiusAxis angle={45} domain={[0, 100]} />
          <CHARTS.Radar
            name={name}
            dataKey='A'
            stroke={color}
            fill={color}
            fillOpacity={0.7}
          />
          <CHARTS.Radar
            name='Global'
            dataKey='B'
            stroke='#fff'
            fill='#fff'
            fillOpacity={0.3}
          />
          <CHARTS.Legend />
        </CHARTS.RadarChart>
      </CHARTS.ResponsiveContainer>
    </>
  );
};

const ChartBar = ({ data, name, color }) => {
  const formattedData = formatStatsForChart.group(data, 'bar');

  return (
    <>
      <ErrorComponent data={formattedData} />
      <CHARTS.ResponsiveContainer width='100%' height={400}>
        <CHARTS.BarChart
          width={500}
          height={300}
          data={formattedData}
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
          <CHARTS.Bar dataKey='A' name={name} fill={color} />
          <CHARTS.Bar dataKey='B' name='Global' fill='#848484' />
        </CHARTS.BarChart>
      </CHARTS.ResponsiveContainer>
    </>
  );
};

export { ChartRadar, ChartBar };
