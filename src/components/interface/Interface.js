import { useEffect, useState } from 'react';
import { GiClick, GiHolosphere } from 'react-icons/gi';
import { ImSphere, ImUser } from 'react-icons/im';
import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs';
import { AutoComplete, Popover } from 'antd';
import useData from '../../stores/useData';
import useInterface from '../../stores/useInterface';
import useInteraction from '../../stores/useInteraction';
import { searchSystem } from '../../systems';

const Interface = () => {
  return (
    <>
      <Overlay />
      <Hints />
    </>
  );
};

const Overlay = () => {
  const { organizedData: data } = useData();
  const { isInterfaceVisible } = useInterface();

  return (
    <div className={isInterfaceVisible ? 'overlay visible' : 'overlay'}>
      <div className='interface left'>aa</div>
      <div className='interface center'>bb</div>
      <div className='interface right'>
        Passer la souris sur un groupe pour voir le nom complet
        {data.map((group) => {
          return (
            <Popover content={group.name} key={group.id}>
              {/* <div
                key={group.id}
                style={{ color: group.associatedColor, cursor: 'pointer' }}
              > */}
              {group.briefName}
              <ImSphere />
              {/* </div> */}
            </Popover>
          );
        })}
      </div>
    </div>
  );
};

const Hints = () => {
  const { organizedData: data } = useData();
  const { isInterfaceVisible, setIsInterfaceVisible } = useInterface();
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
      <div className='interface search'>
        <div className={searchValue ? 'more' : 'more hidden'}>
          <BsArrowBarRight />
          Afficher les informations sur {searchValue ? searchValue.value : ''}
        </div>
        <AutoComplete {...search} />
      </div>
      <div className='interface hints'>
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
            <GiClick className={isInterfaceVisible ? 'hidden' : ''} />
          </div>
          <div
            className='click-interface'
            onClick={() => setIsInterfaceVisible(true)}
          >
            <span className='content'>Menu / légende</span>
            <BsArrowBarLeft />
          </div>
        </div>
      </div>
    </>
  );
};

export default Interface;
