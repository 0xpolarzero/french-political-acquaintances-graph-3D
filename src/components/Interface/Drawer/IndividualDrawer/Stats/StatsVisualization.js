import { Tabs } from 'antd';
import { ChartBar, ChartRadar } from './Charts';

const StatsVisualization = ({
  individualData,
  groupData,
  individualLabel,
  groupLabel,
}) => {
  const tabItems = [
    {
      key: '1',
      label: 'Graphique barres',
      children: (
        <ChartBar
          individualData={individualData}
          groupData={groupData}
          individualLabel={individualLabel}
          groupLabel={groupLabel}
        />
      ),
    },
    {
      key: '2',
      label: 'Graphique radar',
      children: (
        <ChartRadar
          individualData={individualData}
          groupData={groupData}
          individualLabel={individualLabel}
          groupLabel={groupLabel}
        />
      ),
    },
  ];

  return <Tabs defaultActiveKey='1' items={tabItems} />;
};

export default StatsVisualization;
