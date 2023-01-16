import { useEffect, useState } from 'react';
import { GiClick, GiHolosphere } from 'react-icons/gi';
import { ImSphere, ImUser } from 'react-icons/im';
import { Popover } from 'antd';
import useData from '../stores/useData';
import useInterface from '../stores/useInterface';
import useInteract from '../stores/useInteract';

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
  const { isInterfaceVisible, setIsInterfaceVisible } = useInterface();
  const { hovered, group } = useInteract();

  return (
    <div className='interface hints'>
      <div className='left'>
        <div className='individual'>
          <ImUser className={isInterfaceVisible ? '' : 'hidden'} />
          {hovered && !!hovered.nom ? `${hovered.prenom} ${hovered.nom}` : '_'}
        </div>
        <div className='group'>
          <GiHolosphere
            className={isInterfaceVisible ? '' : 'hidden'}
            onClick={() => setIsInterfaceVisible(false)}
          />
          <Popover content={group?.libelle} key={group?.id}>
            {hovered && !!hovered.libelle
              ? hovered.libelleAbrev
              : group
              ? group.libelleAbrev
              : '_'}
          </Popover>
        </div>
      </div>

      <div className='right'>
        <GiClick
          className={isInterfaceVisible ? 'hidden' : ''}
          onClick={() => setIsInterfaceVisible(true)}
        />
        Afficher le menu/légende
      </div>
    </div>
  );
};

export default Interface;
