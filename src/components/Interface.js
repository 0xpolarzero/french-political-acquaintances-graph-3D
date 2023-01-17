import { useEffect, useState } from 'react';
import { GiClick, GiHolosphere } from 'react-icons/gi';
import { ImSphere, ImUser } from 'react-icons/im';
import { BsArrowBarLeft } from 'react-icons/bs';
import { AutoComplete, Popover } from 'antd';
import useData from '../stores/useData';
import useInterface from '../stores/useInterface';
import useInteraction from '../stores/useInteraction';
import { searchSystem } from '../systems/search';

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
            <Popover content={group.libelle} key={group.id}>
              {/* <div
                key={group.id}
                style={{ color: group.couleurAssociee, cursor: 'pointer' }}
              > */}
              {group.libelleAbrege}
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
  const { hovered, group, onSearch, onClear } = useInteraction();

  const search = searchSystem(data, onSearch, onClear);

  return (
    <>
      <div className='interface search'>
        <AutoComplete {...search} />
      </div>
      <div className='interface hints'>
        <div className='left'>
          {/* Display deputee name */}
          <div className='individual'>
            <ImUser className={isInterfaceVisible ? '' : 'hidden'} />
            {hovered && hovered.type === 'individual'
              ? `${hovered.item.prenom} ${hovered.item.nom}`
              : '_'}
          </div>
          {/* Display group shortname */}
          <div className='group'>
            <GiHolosphere
              className={isInterfaceVisible ? '' : 'hidden'}
              onClick={() => setIsInterfaceVisible(false)}
            />
            {/* Show complete name on hover */}

            {hovered.item && hovered.type === 'group' ? (
              hovered.item.libelleAbrev
            ) : group ? (
              <Popover content={group.libelle} key={group.id}>
                {group.libelleAbrev}
              </Popover>
            ) : (
              '_'
            )}
          </div>
        </div>

        <div className='right'>
          {/* Show interface on click */}
          <div className='action'>
            {hovered.type === 'group'
              ? group && hovered.item.id === group.id
                ? "Afficher plus d'informations sur le groupe"
                : "Naviguer jusqu'au groupe"
              : hovered.type === 'individual'
              ? 'Afficher les informations du député'
              : '_'}
            <GiClick className={isInterfaceVisible ? 'hidden' : ''} />
          </div>
          <div className='click-interface'>
            Menu / légende
            <BsArrowBarLeft
              className={isInterfaceVisible ? 'hidden' : ''}
              onClick={() => setIsInterfaceVisible(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Interface;
