import CompareDrawer from './Drawer/CompareDrawer';
import GroupDrawer from './Drawer/GroupDrawer';
import IndividualDrawer from './Drawer/IndividualDrawer';
import { Hints, Overlay } from './UI';

const Interface = () => {
  return (
    <>
      <Overlay />
      <Hints />

      <GroupDrawer />
      <IndividualDrawer />
      <CompareDrawer />
    </>
  );
};

export default Interface;
