import { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { organizeDrawerData } from 'src/systems';
import { useInterface } from 'src/stores';
import InfoCollapse from './Informations';
import StatsVisualization from './Stats';

const GroupDrawer = () => {
  const { drawer, closeDrawer } = useInterface();
  const { data, type, isOpen } = drawer;
  const [dataCurated, setDataCurated] = useState({
    general: {},
    members: [],
    stats: {},
  });

  useEffect(() => {
    if (!data || type !== 'group') return;

    const curated = Object.keys(data).reduce((acc, key) => {
      if (!data[key]) acc[key] = 'N/A';
      else acc[key] = data[key];
      return acc;
    }, {});

    const { generalData, membersData, statsData } =
      organizeDrawerData.group(curated);

    setDataCurated({
      general: generalData,
      members: membersData,
      stats: statsData,
    });
  }, [data]);

  if (!data || type !== 'group') return null;

  return (
    <Drawer
      className='stats individual'
      width='80%'
      open={isOpen && type === 'group'}
      onClose={closeDrawer}
      destroyOnClose
      title={`${data.name} (${data.shortName})`}
    >
      <InfoCollapse
        data={{ general: dataCurated.general, members: dataCurated.members }}
      />
      <StatsVisualization
        data={dataCurated.stats}
        name={data.shortName}
        color={data.associatedColor}
      />

      <div className='last-update' style={{ marginTop: '1rem', opacity: 0.7 }}>
        <p>
          Dernière mise à jour :{' '}
          {new Date(data.lastUpdate).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </Drawer>
  );
};

export default GroupDrawer;
