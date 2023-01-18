import { Collapse, Drawer, Table } from 'antd';
import { useEffect, useState } from 'react';
import useInterface from '../../../stores/useInterface';
import { organizeDrawerData } from '../../../systems';

const { Panel } = Collapse;

const IndividualStats = () => {
  const { drawer, closeDrawer } = useInterface();
  const { data, type, isOpen } = drawer;
  const [dataCurated, setDataCurated] = useState({
    general: {},
    political: {},
    contact: {},
    stats: {},
  });

  useEffect(() => {
    if (!data) return;

    const curated = Object.keys(data).reduce((acc, key) => {
      if (!data[key]) acc[key] = 'N/A';
      else acc[key] = data[key];
      return acc;
    }, {});

    const { generalData, politicalData, contactData, statsData } =
      organizeDrawerData(curated);

    console.log('statsData', statsData);

    setDataCurated({
      general: generalData,
      political: politicalData,
      contact: contactData,
      stats: statsData,
    });
  }, [data]);

  if (!data) return null;

  // Image
  // Last update

  return (
    <Drawer
      className='stats individual'
      width='80%'
      open={isOpen && type === 'individual'}
      onClose={closeDrawer}
      destroyOnClose
      title={`${data.firstName} ${data.lastName}`}
    >
      <Collapse accordion ghost>
        {/* General informations */}
        <Panel
          header={<span className='panel-header'>Informations générales</span>}
          key='1'
        >
          <Table
            dataSource={Object.values(dataCurated.general)}
            pagination={false}
          >
            <Table.Column
              dataIndex='type'
              render={(value) => (
                <span style={{ fontWeight: 600 }}>{value}</span>
              )}
            />
            <Table.Column dataIndex='value' />
          </Table>
        </Panel>

        {/* Political informations */}
        <Panel
          header={<span className='panel-header'>Informations politique</span>}
          key='2'
        >
          <Table
            dataSource={Object.values(dataCurated.political)}
            pagination={false}
          >
            <Table.Column
              dataIndex='type'
              render={(value) => (
                <span style={{ fontWeight: 600 }}>{value}</span>
              )}
            />
            <Table.Column dataIndex='value' />
          </Table>
        </Panel>

        {/* Contact informations */}
        <Panel
          header={
            <span className='panel-header'>Contact / Réseaux sociaux</span>
          }
          key='3'
        >
          <Table
            dataSource={Object.values(dataCurated.contact)}
            pagination={false}
          >
            <Table.Column
              dataIndex='type'
              render={(value) => (
                <span style={{ fontWeight: 600 }}>{value}</span>
              )}
            />
            <Table.Column dataIndex='value' />
          </Table>
        </Panel>

        {/* Stats */}
        <Panel
          header={<span className='panel-header'>Statistiques</span>}
          key='4'
        >
          <Table
            dataSource={Object.values(dataCurated.stats)}
            pagination={false}
          >
            <Table.Column
              dataIndex='type'
              render={(value) => (
                <span style={{ fontWeight: 600 }}>{value}</span>
              )}
            />
            <Table.Column dataIndex='value' />
          </Table>
        </Panel>
      </Collapse>
    </Drawer>
  );
};

const Chart = ({ data }) => {
  return null;
};

export default IndividualStats;
