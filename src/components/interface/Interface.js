import { Hints, Overlay } from './UI';
import GroupDrawer from './Drawer/GroupDrawer';
import IndividualDrawer from './Drawer/IndividualDrawer';

const Interface = () => {
  return (
    <>
      <Overlay />
      <Hints />

      <GroupDrawer />
      <IndividualDrawer />
    </>
  );
};

export default Interface;
