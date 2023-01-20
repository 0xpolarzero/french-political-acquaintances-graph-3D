import { Drawer } from 'antd';
import { useEffect, useState } from 'react';
import InfoCollapse from './Informations';
import StatsVisualization from './Stats';
import { organizeDrawerData } from 'src/systems';
import { useData, useInterface } from 'src/stores';

const IndividualDrawer = () => {
  const { drawer, setDrawer, closeDrawer } = useInterface();
  const { organizedData: groupsData } = useData();
  const { data, type, isOpen } = drawer;
  const [dataCurated, setDataCurated] = useState({
    general: {},
    political: {},
    contact: {},
    individualStats: {},
    groupStats: {},
  });

  const groupData =
    data && groupsData.find((group) => group.shortName === data.groupShort);

  useEffect(() => {
    if (!data || type !== 'individual') return;

    const curated = Object.keys(data).reduce((acc, key) => {
      if (!data[key]) acc[key] = 'N/A';
      else acc[key] = data[key];
      return acc;
    }, {});

    const { generalData, politicalData, contactData, statsData } =
      organizeDrawerData.individual(curated);

    setDataCurated({
      general: generalData,
      political: politicalData,
      contact: contactData,
      individualStats: statsData,
      groupStats: groupData.stats.average,
      image: data.image,
    });
  }, [data]);

  if (!data || type !== 'individual') return null;

  return (
    <Drawer
      className='stats individual'
      width='80%'
      open={isOpen && type === 'individual'}
      onClose={closeDrawer}
      destroyOnClose
      title={`${data.firstName} ${data.lastName} (${data.groupShort})`}
      extra={
        <button
          onClick={() => setDrawer(null, groupData, 'group')}
          // style={{ color: groupData.associatedColor }}
        >
          Voir la fiche du groupe
        </button>
      }
    >
      <InfoCollapse data={dataCurated} groupData={groupData} />
      {/* Stats */}
      <StatsVisualization
        individualData={dataCurated.individualStats}
        groupData={dataCurated.groupStats}
        individualLabel={`${data.firstName} ${data.lastName}`}
        groupLabel={`${data.groupShort} (moyenne)`}
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

export default IndividualDrawer;
