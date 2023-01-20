import { AutoComplete, Drawer } from 'antd';
import { InfoGroup, InfoIndividual } from './Informations';
import { getLighterColor } from 'src/systems/utils';
import { useData, useInterface, useStats } from 'src/stores';
import { searchSystem } from 'src/systems';

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

  const search = searchSystem(organizedData, null, null);

  console.log(compareBase, compareTarget);

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
            (compareBase.type === 'individual' ? (
              <InfoIndividual data={compareBase.data} />
            ) : (
              <InfoGroup data={compareBase.data} />
            ))}
        </div>

        <div className='compare-info'>
          {/* If there is a target */}
          {compareTarget &&
            (compareTarget.type === 'individual' ? (
              <InfoIndividual data={compareTarget.data} />
            ) : (
              <InfoGroup data={compareTarget.data} />
            ))}
        </div>

        <div className='compare-stats'>
          {/* If there is a base and a target */}
          {compareBase && compareTarget
            ? 'Stats component here (that includes the div around)'
            : compareBase || compareTarget
            ? 'Choisissez un autre élément à comparer (groupe ou député)'
            : 'Choisissez des éléments à comparer (groupe.s ou député.s)'}
        </div>
      </div>
    </Drawer>
  );
};

export default CompareDrawer;
