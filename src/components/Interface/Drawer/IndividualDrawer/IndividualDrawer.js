import { Collapse, Drawer, Table, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import * as CHARTS from 'recharts';
import useData from '../../../../stores/useData';
import useInterface from '../../../../stores/useInterface';
import { formatStatsForChart, organizeDrawerData } from '../../../../systems';

const { Panel } = Collapse;

const IndividualDrawer = () => {
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
      organizeDrawerData(curated);

    setDataCurated({
      general: generalData,
      political: politicalData,
      contact: contactData,
      individualStats: statsData,
      groupStats: groupData.stats.average,
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
      <InfoCollapse data={dataCurated} />
      {/* Stats */}
      <StatsVisualization
        individualData={dataCurated.individualStats}
        groupData={dataCurated.groupStats}
        individualLabel={`${data.firstName} ${data.lastName}`}
        groupLabel={`${data.groupShort} (moyenne)`}
      />
    </Drawer>
  );
};

const InfoCollapse = ({ data }) => {
  return (
    <Collapse accordion ghost>
      {/* General informations */}
      <Panel
        header={<span className='panel-header'>Informations générales</span>}
        key='1'
      >
        <Table dataSource={Object.values(data.general)} pagination={false}>
          <Table.Column
            dataIndex='type'
            render={(value) => <span style={{ fontWeight: 600 }}>{value}</span>}
          />
          <Table.Column dataIndex='value' />
        </Table>
      </Panel>

      {/* Political informations */}
      <Panel
        header={<span className='panel-header'>Informations politique</span>}
        key='2'
      >
        <Table dataSource={Object.values(data.political)} pagination={false}>
          <Table.Column
            dataIndex='type'
            render={(value) => <span style={{ fontWeight: 600 }}>{value}</span>}
          />
          <Table.Column dataIndex='value' />
        </Table>
      </Panel>

      {/* Contact informations */}
      <Panel
        header={<span className='panel-header'>Contact / Réseaux sociaux</span>}
        key='3'
      >
        <Table dataSource={Object.values(data.contact)} pagination={false}>
          <Table.Column
            dataIndex='type'
            render={(value) => <span style={{ fontWeight: 600 }}>{value}</span>}
          />
          <Table.Column dataIndex='value' />
        </Table>
      </Panel>
    </Collapse>
  );
};

const StatsVisualization = ({
  individualData,
  groupData,
  individualLabel,
  groupLabel,
}) => {
  const tabItems = [
    {
      key: '1',
      label: 'Graphique barres',
      children: (
        <ChartBar
          individualData={individualData}
          groupData={groupData}
          individualLabel={individualLabel}
          groupLabel={groupLabel}
        />
      ),
    },
    {
      key: '2',
      label: 'Graphique radar',
      children: (
        <ChartRadar
          individualData={individualData}
          groupData={groupData}
          individualLabel={individualLabel}
          groupLabel={groupLabel}
        />
      ),
    },
  ];

  return <Tabs defaultActiveKey='1' items={tabItems} />;
};

const ErrorComponent = ({ data }) => {
  const [missingData, setMissingData] = useState([]);

  useEffect(() => {
    if (Object.keys(data).length === 0) return;

    // Detect errors
    let status = {};
    Object.keys(data).forEach((key) => {
      status[data[key].type] = isNaN(data[key].value);
    });
    // If it's errored, add the key to the errors array
    const errors = Object.keys(status).reduce((acc, key) => {
      if (status[key]) acc.push(key);
      return acc;
    }, []);

    console.log('errors', errors);

    if (errors.length) setMissingData(errors);
  }, [data]);

  if (!missingData.length) return null;

  return (
    <>
      <p className='error' style={{ textAlign: 'center' }}>
        Certaines données sont manquantes pour ce député:
      </p>
      <p className='error' style={{ textAlign: 'center', fontWeight: 400 }}>
        {missingData.join(' - ')}
      </p>
    </>
  );
};

const ChartRadar = ({
  individualData,
  groupData,
  individualLabel,
  groupLabel,
}) => {
  const data = formatStatsForChart.radar(individualData, groupData);

  return (
    <>
      <ErrorComponent data={individualData} />
      <CHARTS.ResponsiveContainer width='100%' height={400}>
        <CHARTS.RadarChart cx='50%' cy='50%' outerRadius='80%' data={data}>
          <CHARTS.PolarGrid />
          <CHARTS.PolarAngleAxis dataKey='type' />
          <CHARTS.PolarRadiusAxis angle={45} domain={[0, 100]} />
          <CHARTS.Radar
            name={individualLabel}
            dataKey='A'
            stroke='#8884d8'
            color='#8884d8'
            fillOpacity={0.7}
          />
          <CHARTS.Radar
            name={groupLabel}
            dataKey='B'
            stroke='#82ca9d'
            color='#82ca9d'
            fillOpacity={0.5}
          />
          <CHARTS.Legend />
        </CHARTS.RadarChart>
      </CHARTS.ResponsiveContainer>
    </>
  );
};

const ChartBar = ({
  individualData,
  groupData,
  individualLabel,
  groupLabel,
}) => {
  const data = formatStatsForChart.bar(
    individualData,
    groupData,
    individualLabel,
    groupLabel,
  );

  return (
    <>
      <ErrorComponent data={individualData} />
      <CHARTS.ResponsiveContainer width='100%' height='100%'>
        <CHARTS.BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CHARTS.CartesianGrid strokeDasharray='3 3' />
          <CHARTS.XAxis dataKey='name' />
          <CHARTS.YAxis />
          <CHARTS.Tooltip />
          <CHARTS.Legend />
          <CHARTS.Bar dataKey='A' name={individualLabel} fill='#8884d8' />
          <CHARTS.Bar dataKey='B' name={groupLabel} fill='#82ca9d' />
        </CHARTS.BarChart>
      </CHARTS.ResponsiveContainer>
    </>
  );
};

export default IndividualDrawer;
