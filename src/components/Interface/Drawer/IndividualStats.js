import { Collapse, Drawer, Table } from 'antd';
import { useEffect, useState } from 'react';
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import useData from '../../../stores/useData';
import useInterface from '../../../stores/useInterface';
import { getOppositeColor, organizeDrawerData } from '../../../systems';

const { Panel } = Collapse;

const IndividualStats = () => {
  const { drawer, closeDrawer } = useInterface();
  const { organizedData: groupsData } = useData();
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

    const groupData = groupsData.find(
      (group) => group.shortName === data.groupShort,
    );

    const { generalData, politicalData, contactData, statsData } =
      organizeDrawerData(curated, groupData.stats.average);

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
        {/* <Panel
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
        </Panel> */}
      </Collapse>
      {/* Stats */}
      <Chart
        data={dataCurated.stats}
        individualName={`${data.firstName} ${data.lastName}`}
        groupName={`${data.groupShort} (moyenne)`}
      />
    </Drawer>
  );
};

const Chart = ({ data, individualName, groupName }) => {
  const [missingData, setMissingData] = useState(null);

  useEffect(() => {
    if (!data) return;

    const errors = Object.values(data).reduce((acc, value) => {
      const keys = Object.keys(value);
      keys.forEach((key) => {
        if (key !== 'type' && isNaN(value[key])) acc[value.type] = value[key];
      });
      return acc;
    }, {});

    Object.keys(errors).length === 0
      ? setMissingData(null)
      : setMissingData(errors);
  }, [data]);

  return (
    <>
      {missingData && (
        <>
          <p className='error' style={{ textAlign: 'center' }}>
            Certaines données sont manquantes pour ce député:
          </p>
          <p className='error' style={{ textAlign: 'center', fontWeight: 400 }}>
            {Object.keys(missingData).join(' - ')}
          </p>
        </>
      )}
      <ResponsiveContainer width='100%' height={400}>
        <RadarChart cx='50%' cy='50%' outerRadius='80%' data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey='type' />
          <PolarRadiusAxis angle={45} domain={[0, 100]} />
          <Radar
            name={individualName}
            dataKey='A'
            stroke='#8884d8'
            color='#8884d8'
            fillOpacity={0.7}
          />
          <Radar
            name={groupName}
            dataKey='B'
            stroke='#82ca9d'
            color='#82ca9d'
            fillOpacity={0.5}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

export default IndividualStats;
