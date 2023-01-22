import { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import { GiClick, GiHolosphere } from 'react-icons/gi';
import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs';
import { AiOutlineArrowsAlt } from 'react-icons/ai';
import { ImUser } from 'react-icons/im';
import { useData, useInteraction, useInterface } from 'src/stores';
import { searchSystem } from 'src/systems';

const Hints = () => {
  const { organizedData: data } = useData();
  const { isOverlayVisible, setIsOverlayVisible, drawer, setDrawer } =
    useInterface();
  const {
    hovered,
    group,
    onSearch,
    onClear,
    search: searchValue,
  } = useInteraction();
  const [isHidden, setIsHidden] = useState(false);

  const search = searchSystem(data, onSearch, onClear);

  useEffect(() => {
    setIsHidden(isOverlayVisible || drawer.isOpen);
  }, [isOverlayVisible, drawer.isOpen]);

  return (
    <>
      <div
        className={isHidden ? 'interface search hidden' : 'interface search'}
      >
        <div
          className={searchValue ? 'more' : 'more hidden'}
          onClick={() => setDrawer(null, searchValue.item, searchValue.type)}
        >
          <BsArrowBarRight />
          <span className='content'>
            Afficher les détails de {searchValue ? searchValue.value : ''}
          </span>
        </div>
        <AutoComplete {...search} />
        <div className={searchValue ? 'more' : 'more hidden'} onClick={onClear}>
          <AiOutlineArrowsAlt />
          <span className='content'>Retour à la vue normale</span>
        </div>
      </div>
      <div className={isHidden ? 'interface hints hidden' : 'interface hints'}>
        <div className='left'>
          {/* Display deputee name */}
          <div className='individual'>
            <ImUser />
            {hovered && hovered.type === 'individual' ? (
              <span className='content'>
                {hovered.item.firstName} {hovered.item.lastName}
              </span>
            ) : (
              <span className='content'>_</span>
            )}
          </div>
          {/* Display group shortname */}
          <div className='group'>
            <GiHolosphere />

            {/* Show complete name on hover */}
            {hovered.item && hovered.type === 'group' ? (
              <>
                <span className='content'>{hovered.item.shortName}</span>
              </>
            ) : group ? (
              <span className='content'>{group.shortName}</span>
            ) : (
              <>
                <span className='content'>_</span>
              </>
            )}
          </div>
        </div>

        <div className='right'>
          {/* Show interface on click */}
          <div className='action'>
            {hovered.type === 'group' ? (
              group && hovered.item.id === group.id ? (
                <span className='content'>
                  Afficher plus d'informations sur le groupe
                </span>
              ) : (
                <span className='content'>Naviguer jusqu'au groupe</span>
              )
            ) : hovered.type === 'individual' ? (
              <span className='content'>
                Afficher les informations du député
              </span>
            ) : (
              <span className='content'>_</span>
            )}
            <GiClick className={isOverlayVisible ? 'hidden' : ''} />
          </div>
          <div
            className='click-interface'
            onClick={() => setIsOverlayVisible(true)}
          >
            <span className='content'>Informations / légende</span>
            <BsArrowBarLeft />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hints;
