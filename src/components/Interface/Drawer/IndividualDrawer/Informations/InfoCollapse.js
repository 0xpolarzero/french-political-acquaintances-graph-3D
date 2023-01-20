import { Collapse, Table } from 'antd';
import { useInterface } from 'src/stores';

const { Panel } = Collapse;

const InfoCollapse = ({ data, groupData }) => {
  const { setDrawer } = useInterface();

  const columns = [
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
      onCell: (record, index) => {
        if (record.type === 'Groupe')
          return {
            onClick: () => setDrawer(null, groupData, 'group'),
          };
      },
    },
  ];

  const columnsWithImage = [
    ...columns,
    {
      key: 'image',
      title: '',
      dataIndex: 'image',
      render: () => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <img
            src={data.image}
            alt='profile'
            style={{ width: 'auto', height: 200 }}
          />
        </div>
      ),
      onCell: (_, index) => {
        if (index !== 0) return { rowSpan: 0 };
        return {
          rowSpan: Object.values(data.general).length,
        };
      },
    },
  ];

  return (
    <Collapse defaultActiveKey={['1']} accordion ghost>
      {/* General informations */}
      <Panel
        header={<span className='panel-header'>Informations générales</span>}
        key='1'
      >
        <Table
          dataSource={Object.values(data.general)}
          columns={columnsWithImage}
          pagination={false}
        ></Table>
      </Panel>

      {/* Political informations */}
      <Panel
        header={<span className='panel-header'>Informations politique</span>}
        key='2'
      >
        <Table
          dataSource={Object.values(data.political)}
          columns={columns}
          pagination={false}
          rowClassName={(record, index) => {
            if (record.type === 'Groupe') return 'cursor';
          }}
        />
      </Panel>

      {/* Contact informations */}
      <Panel
        header={<span className='panel-header'>Contact / Réseaux sociaux</span>}
        key='3'
      >
        <Table
          dataSource={Object.values(data.contact)}
          columns={columns}
          pagination={false}
        />
      </Panel>
    </Collapse>
  );
};

export default InfoCollapse;
