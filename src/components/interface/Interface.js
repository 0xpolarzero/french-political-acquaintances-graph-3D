import Overlay from './Overlay';
import Hints from './Hints';
import GroupStats from './Drawer/GroupStats';
import IndividualStats from './Drawer/IndividualStats';

const Interface = () => {
  return (
    <>
      <Overlay />
      <Hints />

      <GroupStats />
      <IndividualStats />
    </>
  );
};

export default Interface;
