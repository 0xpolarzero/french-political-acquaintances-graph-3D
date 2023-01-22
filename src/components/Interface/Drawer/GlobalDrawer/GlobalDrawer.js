import { useEffect, useState } from 'react';
import { Collapse, Drawer, Tooltip } from 'antd';
import * as CHARTS from 'recharts';
import { TbQuestionMark } from 'react-icons/tb';
import { organizeDrawerData, renderLabel } from 'src/systems';
import { useData, useInterface } from 'src/stores';

const { Panel } = Collapse;

const GlobalDrawer = () => {
  const { organizedData } = useData();
  const { drawer, closeDrawer } = useInterface();
  const { type, isOpen } = drawer;
  const [formattedData, setFormattedData] = useState(null);

  const organizeData = () => {
    const organized = organizedData
      .sort((a, b) => {
        return b.membersAmount - a.membersAmount;
      })
      .map((groupData) => {
        const { statsData } = organizeDrawerData.group(groupData);
        return {
          data: statsData.group,
          name: groupData.shortName,
          color: groupData.associatedColor,
        };
      });

    return organized.reduce((acc, group) => {
      Object.keys(group.data).forEach((type) => {
        if (!acc[type]) acc[type] = { type: null, data: [] };
        if (!acc[type].type) acc[type].type = group.data[type].type;

        acc[type].data.push({
          name: group.name,
          value: Number(group.data[type].value),
          color: group.color,
          amt: 100,
        });
      });
      return acc;
    }, {});
  };

  useEffect(() => {
    if (!organizedData) return;

    const organized = organizeData();
    setFormattedData(organized);
  }, [organizedData]);

  if (type !== 'global') return null;

  return (
    <Drawer
      className='stats global'
      width='80%'
      open={isOpen && type === 'global'}
      onClose={() => closeDrawer()}
      destroyOnClose
      title='Statistiques globales'
    >
      <div className='compare-global'>
        {formattedData && (
          <>
            <ChartsPie
              data={formattedData.power.data}
              type='Répartition du pouvoir (%)'
            />
            <Collapse defaultActiveKey={['1']} ghost accordion>
              {formattedData &&
                Object.keys(formattedData).map((key) => {
                  const { type, data } = formattedData[key];
                  return (
                    <Panel header={type} key={key}>
                      <ChartsBar data={data} type={type} />
                    </Panel>
                  );
                })}
            </Collapse>
          </>
        )}
      </div>
    </Drawer>
  );
};

const ChartsBar = ({ data, type }) => {
  return (
    <CHARTS.ResponsiveContainer width='100%' height={400}>
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
        <CHARTS.Bar dataKey='value' name={type}>
          {data.map((entry, index) => (
            <CHARTS.Cell key={index} fill={entry.color} />
          ))}
        </CHARTS.Bar>
      </CHARTS.BarChart>
    </CHARTS.ResponsiveContainer>
  );
};

const ChartsPie = ({ data, type }) => {
  return (
    <>
      <div style={{ textAlign: 'center', fontWeight: 600 }}>
        {type}{' '}
        <Tooltip
          title={
            <>
              Pour chaque groupe:
              <br />
              <code>nombre de membres * participation moyenne</code>
            </>
          }
        >
          <TbQuestionMark cursor='pointer' />
        </Tooltip>
      </div>

      <CHARTS.ResponsiveContainer width='100%' height={450}>
        <CHARTS.PieChart width={400} height={400}>
          <CHARTS.Pie
            data={data}
            dataKey='value'
            cx='50%'
            cy='50%'
            outerRadius={180}
            label={renderLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <CHARTS.Cell key={index} fill={entry.color} />
            ))}
          </CHARTS.Pie>
          <CHARTS.Tooltip />
        </CHARTS.PieChart>
      </CHARTS.ResponsiveContainer>
    </>
  );
};

export default GlobalDrawer;
