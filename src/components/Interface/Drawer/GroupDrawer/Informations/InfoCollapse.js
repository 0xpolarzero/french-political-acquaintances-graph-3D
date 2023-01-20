import { Collapse, Table } from 'antd';

const { Panel } = Collapse;

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

export default InfoCollapse;
