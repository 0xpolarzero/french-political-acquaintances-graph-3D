import { Drawer } from 'antd';
import useInterface from '../../../stores/useInterface';

const IndividualStats = () => {
  const { drawer, closeDrawer } = useInterface();
  const { data, type, isOpen } = drawer;

  if (!data) return null;
  console.log(data);

  return (
    <Drawer
      className='stats individual'
      width='80%'
      open={isOpen && type === 'individual'}
      onClose={closeDrawer}
      destroyOnClose
    >
      <h1>
        {data.firstName} {data.lastName}
      </h1>
    </Drawer>
  );
};

export default IndividualStats;
