import { Collapse, Table } from 'antd';

const { Panel } = Collapse;

const InfoCollapse = ({ data }) => {
  const columns = [
    {
      key: 'type',
      title: '',
      dataIndex: 'type',
      render: (value) => <span style={{ fontWeight: 600 }}>{value}</span>,
    },
    {
      key: 'value',
      title: '',
      dataIndex: 'value',
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
