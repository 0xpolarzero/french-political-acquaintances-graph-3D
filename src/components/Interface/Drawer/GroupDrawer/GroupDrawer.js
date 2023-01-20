import { Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { useData, useInterface } from 'src/stores';

const GroupDrawer = () => {
  const { drawer, closeDrawer } = useInterface();
  const { organizedData: groupsData } = useData();
  const { data, type, isOpen } = drawer;
  const [dataCurated, setDataCurated] = useState({
    general: {},
    political: {},
    contact: {},
    individualStats: {},
    groupStats: {},
  });

  useEffect(() => {
    if (!data || type !== 'group') return;

    const curated = Object.keys(data).reduce((acc, key) => {
      if (!data[key]) acc[key] = 'N/A';
      else acc[key] = data[key];
      return acc;
    }, {});
    console.log(curated);

    // const { generalData, politicalData, contactData, statsData } =
    //   organizeDrawerData(curated);

    setDataCurated({
      // general: generalData,
      // political: politicalData,
      // contact: contactData,
      // individualStats: statsData,
      // groupStats: groupData.stats.average,
    });
  }, [data]);

  if (!data || type !== 'group') return null;

  // Image
  // Last update

  return (
    <Drawer
      className='stats individual'
      width='80%'
      open={isOpen && type === 'group'}
      onClose={closeDrawer}
      destroyOnClose
      title={`${data.name} (${data.shortName})`}
    >
      {/* <InfoCollapse data={dataCurated} /> */}
      {/* Stats */}
    </Drawer>
  );
};

export default GroupDrawer;
