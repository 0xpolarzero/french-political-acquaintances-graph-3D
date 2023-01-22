import { AutoComplete, Drawer } from 'antd';
import StatsVisualization from 'src/components/Interface/Drawer/Stats';
import { organizeDrawerData, searchSystem } from 'src/systems';
import { useData, useInterface, useStats } from 'src/stores';
import { useEffect, useState } from 'react';
import InfoCollapseIndividual from '../IndividualDrawer/Informations';
import InfoCollapseGroup from '../GroupDrawer/Informations';

// When opened, always a compareBase but compareTarget can be null
// If so, let the user select a compareTarget

// Let the user change both compareBase and compareTarget

// If both individuals, or individual/group, stats will be:
// participation, specParticipation, loyalty, majority
// If both groups, stats will be:
// participation, specParticipation, loyalty, majority, cohesion, power, women

// Always include global stats

// If colors are the same, use a different color for the compareTarget

const CompareDrawer = () => {
  const { organizedData } = useData();
  const { compareBase, compareTarget, resetCompare, onSearch, onClear } =
    useStats();
  const { drawer, closeDrawer } = useInterface();
  const { type, isOpen } = drawer;
  const [curatedData, setCuratedData] = useState(null);

  const search = searchSystem(organizedData, null, null);

  const curateData = (data) => {
    return Object.keys(data).reduce((acc, key) => {
      if (!data[key]) acc[key] = 'N/A';
      else acc[key] = data[key];
      return acc;
    }, {});
  };

  const organizeData = (data, type) => {
    if (type === 'individual') {
      const { generalData, politicalData, contactData, statsData } =
        organizeDrawerData.individual(data);
      return {
        stats: statsData,
        general: generalData,
        political: politicalData,
        contact: contactData,
      };
    } else {
      const { generalData, membersData, statsData } =
        organizeDrawerData.group(data);
      return {
        stats: statsData.group,
        global: statsData.global,
        general: generalData,
        members: membersData,
      };
    }
  };

  const getLabel = (data) => {
    if (data.type === 'individual') {
      return `${data.data.firstName} ${data.data.lastName}`;
    } else {
      return data.data.shortName;
    }
  };

  useEffect(() => {
    if (!compareBase || !compareTarget) return;

    // Make sure all data are well formatted
    const baseCurated = curateData(compareBase.data);
    const targetCurated = curateData(compareTarget.data);

    // Organize data for the drawer
    const baseOrganized = organizeData(baseCurated, compareBase.type);
    const targetOrganized = organizeData(targetCurated, compareTarget.type);
    const global = baseOrganized.global || targetOrganized.global || null;

    setCuratedData({
      base: {
        ...baseOrganized,
        label: getLabel(compareBase),
      },
      target: {
        ...targetOrganized,
        label: getLabel(compareTarget),
      },
      global,
    });
  }, [compareBase, compareTarget]);

  if (type !== 'compare') return null;

  return (
    <Drawer
      className='stats compare'
      width='80%'
      open={isOpen && type === 'compare'}
      onClose={() => {
        closeDrawer();
        resetCompare();
      }}
      destroyOnClose
      title='Comparaison'
    >
      <div className='compare-table'>
        <div className='compare-search'>
          <AutoComplete
            {...search}
            onSelect={(value, data) => onSearch(value, data, 'base')}
            onClear={() => onClear('base')}
          />
        </div>
        <div className='compare-search'>
          <AutoComplete
            {...search}
            onSelect={(value, data) => onSearch(value, data, 'target')}
            onClear={() => onClear('target')}
          />
        </div>

        <div className='compare-info'>
          {/* If there is a base */}
          {compareBase &&
            curatedData &&
            (compareBase.type === 'individual' ? (
              <InfoCollapseIndividual
                data={curatedData.base}
                groupData={null}
              />
            ) : (
              <InfoCollapseGroup data={curatedData.base} />
            ))}
        </div>

        <div className='compare-info'>
          {/* If there is a target */}
          {compareTarget &&
            curatedData &&
            (compareTarget.type === 'individual' ? (
              <InfoCollapseIndividual
                data={curatedData.target}
                groupData={null}
              />
            ) : (
              <InfoCollapseGroup data={curatedData.target} />
            ))}
        </div>

        {/* If there is a base and a target */}
        {compareBase && compareTarget && curatedData ? (
          <div
            className='compare-stats'
            style={{ gridColumn: 'span 2', width: '100%' }}
          >
            <StatsVisualization
              statsA={curatedData.base.stats}
              statsB={curatedData.target.stats}
              labelA={curatedData.base.label}
              labelB={curatedData.target.label}
              color={null}
              statsGlobal={curatedData.global}
            />
          </div>
        ) : compareBase || compareTarget ? (
          <div className='compare-stats' style={{ gridColumn: 'span 2' }}>
            Choisissez un autre élément à comparer (groupe ou député).
          </div>
        ) : (
          <div className='compare-stats' style={{ gridColumn: 'span 2' }}>
            Choisissez des éléments à comparer (groupe.s ou député.s).
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CompareDrawer;
