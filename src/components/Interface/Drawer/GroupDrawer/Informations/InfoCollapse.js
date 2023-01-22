import { Collapse, Table } from 'antd';
import { numberToPeriod } from 'src/systems/utils';
import { useInterface } from 'src/stores';

const { Panel } = Collapse;

const InfoCollapse = ({ data, onlyInfo = true }) => {
  const { setDrawer } = useInterface();

  const columnsGeneral = [
    {
      key: 'type',
      title: '',
      dataIndex: 'type',
      render: (value, index) => (
        <span key={index} style={{ fontWeight: 600 }}>
          {value}
        </span>
      ),
    },
    {
      key: 'value',
      title: '',
      dataIndex: 'value',
    },
  ];

  const sortableKeys = [
    'age',
    'experience',
    'participationScore',
    'loyaltyScore',
    'majorityScore',
  ];

  const columnsMembers =
    !onlyInfo &&
    Object.keys(data.members).map((key) => ({
      key,
      title: data.members[key].type,
      dataIndex: key,
      sorter: sortableKeys.includes(key)
        ? (a, b) => Number(a[key]) - Number(b[key])
        : false,
      render: (value, index) => {
        if (key === 'raw') return null;
        if (key === 'experience') return numberToPeriod(value);
        if (
          key === 'participationScore' ||
          key === 'loyaltyScore' ||
          key === 'majorityScore'
        ) {
          return `${value} %`;
        }
        if (key === 'image') {
          return (
            <img
              key={index}
              src={value}
              alt='member'
              style={{ width: 'auto', height: 100 }}
            />
          );
        }
        return value;
      },
      onCell: (record) => {
        return {
          onClick: () => {
            setDrawer(null, record.raw, 'individual');
          },
          colSpan: key === 'raw' ? 0 : 1,
        };
      },
      colSpan: key === 'raw' ? 0 : 1,
    }));

  const dataSource =
    !onlyInfo &&
    data.members?.length !== 0 &&
    data.members[Object.keys(data.members)[0]].value.map((_, index) => {
      return Object.keys(data.members).reduce((acc, key) => {
        acc[key] = data.members[key].value[index];
        return acc;
      }, {});
    });

  return (
    <Collapse defaultActiveKey={['1']} accordion ghost>
      {/* General informations */}
      <Panel
        header={<span className='panel-header'>Informations générales</span>}
        key='1'
      >
        <Table
          dataSource={Object.values(data.general)}
          columns={columnsGeneral}
          pagination={false}
        />
      </Panel>

      {/* Members informations */}
      {data.members.length !== 0 && !onlyInfo && (
        <Panel
          header={<span className='panel-header'>Membres du groupe</span>}
          key='2'
        >
          <Table
            dataSource={dataSource}
            columns={columnsMembers}
            className='cursor'
          />
        </Panel>
      )}
    </Collapse>
  );
};

export default InfoCollapse;
