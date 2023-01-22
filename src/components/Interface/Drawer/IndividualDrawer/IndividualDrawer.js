import { Drawer } from 'antd';
import { useEffect, useState } from 'react';
import InfoCollapse from './Informations';
import StatsVisualization from 'src/components/Interface/Drawer/Stats';
import { organizeDrawerData } from 'src/systems';
import { useData, useInterface, useStats } from 'src/stores';

const IndividualDrawer = () => {
  const { drawer, setDrawer, closeDrawer } = useInterface();
  const { organizedData: groupsData } = useData();
  const { setCompareBase } = useStats();
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
    const { statsData: groupStatsData } = organizeDrawerData.group(groupData);

    setDataCurated({
      general: generalData,
      political: politicalData,
      contact: contactData,
      individualStats: statsData,
      groupStats: groupStatsData.group,
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
        <>
          <button
            onClick={() => {
              setCompareBase({ data, type });
              setDrawer(null, null, 'compare');
            }}
          >
            Comparer
          </button>
          <button onClick={() => setDrawer(null, groupData, 'group')}>
            Voir la fiche du groupe
          </button>
        </>
      }
    >
      <InfoCollapse data={dataCurated} groupData={groupData} />
      {/* Stats */}
      <StatsVisualization
        statsA={dataCurated.individualStats}
        statsB={dataCurated.groupStats}
        labelA={`${data.firstName} ${data.lastName}`}
        labelB={`${data.groupShort} (moyenne)`}
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
