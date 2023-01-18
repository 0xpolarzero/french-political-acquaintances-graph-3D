import { Drawer } from 'antd';
import { useInterface } from 'src/stores';

const GroupDrawer = () => {
  const { drawer, closeDrawer } = useInterface();
  const { data, type, isOpen } = drawer;

  if (!data) return null;

  return (
    <Drawer
      className='stats group'
      width='80%'
      open={isOpen && type === 'group'}
      onClose={closeDrawer}
      destroyOnClose
    >
      <h1>{data.shortName}</h1>
    </Drawer>
  );
};

export default GroupDrawer;
