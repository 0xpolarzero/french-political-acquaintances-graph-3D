import * as CHARTS from 'recharts';
import { ErrorComponent } from './Utils';
import { formatStatsForChart } from 'src/systems';

const ChartRadar = ({
  individualData,
  groupData,
  individualLabel,
  groupLabel,
}) => {
  const data = formatStatsForChart.radar(individualData, groupData);

  return (
    <>
      <ErrorComponent data={individualData} />
      <CHARTS.ResponsiveContainer width='100%' height={400}>
        <CHARTS.RadarChart cx='50%' cy='50%' outerRadius='80%' data={data}>
          <CHARTS.PolarGrid />
          <CHARTS.PolarAngleAxis dataKey='type' />
          <CHARTS.PolarRadiusAxis angle={45} domain={[0, 100]} />
          <CHARTS.Radar
            name={individualLabel}
            dataKey='A'
            stroke='#8884d8'
            color='#8884d8'
            fillOpacity={0.7}
          />
          <CHARTS.Radar
            name={groupLabel}
            dataKey='B'
            stroke='#82ca9d'
            color='#82ca9d'
            fillOpacity={0.5}
          />
          <CHARTS.Legend />
        </CHARTS.RadarChart>
      </CHARTS.ResponsiveContainer>
    </>
  );
};

const ChartBar = ({
  individualData,
  groupData,
  individualLabel,
  groupLabel,
}) => {
  const data = formatStatsForChart.bar(
    individualData,
    groupData,
    individualLabel,
    groupLabel,
  );

  return (
    <>
      <ErrorComponent data={individualData} />
      <CHARTS.ResponsiveContainer width='100%' height='100%'>
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
          <CHARTS.XAxis dataKey='name' />
          <CHARTS.YAxis />
          <CHARTS.Tooltip />
          <CHARTS.Legend />
          <CHARTS.Bar dataKey='A' name={individualLabel} fill='#8884d8' />
          <CHARTS.Bar dataKey='B' name={groupLabel} fill='#82ca9d' />
        </CHARTS.BarChart>
      </CHARTS.ResponsiveContainer>
    </>
  );
};

export { ChartRadar, ChartBar };
