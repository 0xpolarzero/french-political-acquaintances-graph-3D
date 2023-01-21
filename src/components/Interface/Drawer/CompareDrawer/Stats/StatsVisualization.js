import { useEffect, useState } from 'react';
import { useStats } from 'src/stores';
import { formatStatsForChart } from 'src/systems';
import { getLighterColor } from 'src/systems/utils';

const StatsVisualization = () => {
  const { compareBase, compareTarget } = useStats();
  const [dataFormatted, setDataFormatted] = useState(null);

  const compareColor = compareTarget.type === 'individual' ?
    compareBase.data.color === compareTarget.data.color
      ? getLighterColor(
          compareTarget.data.color
        )
      : compareTarget.data.color || compareTarget.data.associatedColor;

  useEffect(() => {
    if (!compareBase || !compareTarget) return;
    const baseFormatted =
      compareBase.type === 'individual'
        ? formatStatsForChart.individual(compareBase.data)
        : formatStatsForChart.group(compareBase.data);
    const targetFormatted =
      compareTarget.type === 'individual'
        ? formatStatsForChart.individual(compareTarget.data)
        : formatStatsForChart.group(compareTarget.data);

    setDataFormatted({ base: baseFormatted, target: targetFormatted });
  }, [compareBase, compareTarget]);

  console.log(compareBase, compareTarget);
};

export default StatsVisualization;
