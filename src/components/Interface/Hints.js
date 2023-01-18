import { AutoComplete } from 'antd';
import { GiClick, GiHolosphere } from 'react-icons/gi';
import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs';
import { ImUser } from 'react-icons/im';
import useData from '../../stores/useData';
import useInterface from '../../stores/useInterface';
import useInteraction from '../../stores/useInteraction';
import { searchSystem } from '../../systems';

const Hints = () => {
  const { organizedData: data } = useData();
  const { isOverlayVisible, setIsOverlayVisible } = useInterface();
  const {
    hovered,
    group,
    onSearch,
    onClear,
    search: searchValue,
  } = useInteraction();

  const search = searchSystem(data, onSearch, onClear);

  return (
    <>
      <div
        className={
          isOverlayVisible ? 'interface search hidden' : 'interface search'
        }
      >
        <div className={searchValue ? 'more' : 'more hidden'}>
          <BsArrowBarRight />
          Afficher les détails de {searchValue ? searchValue.value : ''}
        </div>
        <AutoComplete {...search} />
      </div>
      <div
        className={
          isOverlayVisible ? 'interface hints hidden' : 'interface hints'
        }
      >
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
