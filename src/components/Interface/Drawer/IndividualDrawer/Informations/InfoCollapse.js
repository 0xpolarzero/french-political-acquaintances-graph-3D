import { Collapse, Table } from 'antd';

const { Panel } = Collapse;

const InfoCollapse = ({ data }) => {
  const columns = [
    {
      title: '',
      dataIndex: 'type',
      render: (value) => <span style={{ fontWeight: 600 }}>{value}</span>,
    },
    {
      title: '',
      dataIndex: 'value',
    },
  ];
  return (
    <Collapse defaultActiveKey={['1']} accordion ghost>
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
          {/* Another column but only for the image */}
          {data.image && (
            <Table.Column
              dataIndex='image'
              rowSpan={Object.values(data.general).length}
              render={() => (
                <img
                  src={data.image}
                  alt='profile'
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            />
          )}
        </Table>
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
