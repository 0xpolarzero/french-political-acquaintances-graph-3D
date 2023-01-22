import { useEffect, useState } from 'react';
import { useStats } from 'src/stores';
import { formatStatsForChart, organizeDrawerData } from 'src/systems';
import { getLighterColor } from 'src/systems/utils';
import { ChartBar } from './Charts';

const StatsVisualization = () => {
  const { compareBase, compareTarget } = useStats();
  const [dataFormatted, setDataFormatted] = useState(null);

  const baseColor =
    compareBase.type === 'individual'
      ? compareBase.data.color
      : compareBase.data.associatedColor;
  let targetColor =
    compareTarget.type === 'individual'
      ? compareTarget.data.color
      : compareTarget.data.associatedColor;

  targetColor =
    baseColor === targetColor ? getLighterColor(baseColor) : targetColor;

  useEffect(() => {
    if (!compareBase || !compareTarget) return;
    const baseCurated =
      compareBase.type === 'individual'
        ? organizeDrawerData.individual(compareBase.data)
        : organizeDrawerData.group(compareBase.data);
    const targetCurated =
      compareTarget.type === 'individual'
        ? organizeDrawerData.individual(compareTarget.data)
        : organizeDrawerData.group(compareTarget.data);

    // const formatted =

    const baseFormatted =
      compareBase.type === 'individual'
        ? formatStatsForChart.individual(baseCurated)
        : formatStatsForChart.group(targetCurated);
    const targetFormatted =
      compareTarget.type === 'individual'
        ? formatStatsForChart.individual(compareTarget.data)
        : formatStatsForChart.group(compareTarget.data);

    setDataFormatted({ base: baseFormatted, target: targetFormatted });
  }, [compareBase, compareTarget]);

  console.log(compareBase, compareTarget);

  return (
    // <ChartBar data={dataFormatted}
    null
  );
};

export default StatsVisualization;
