import { useEffect } from 'react';
import { Collapse, Tooltip } from 'antd';
import { GiClick, GiHolosphere } from 'react-icons/gi';
import { BsArrowBarRight } from 'react-icons/bs';
import { ImCancelCircle, ImSearch, ImWarning } from 'react-icons/im';
import {
  TbArrowLeft,
  TbArrowRight,
  TbGridDots,
  TbQuestionMark,
  TbSelect,
} from 'react-icons/tb';
import { useData, useInterface } from 'src/stores';

const { Panel } = Collapse;

const Overlay = () => {
  const { organizedData: data } = useData();
  const { isOverlayVisible, setIsOverlayVisible } = useInterface();

  const closeInterface = (e) => {
    if (e.key === 'Escape') setIsOverlayVisible(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', (e) => closeInterface(e));

    return () =>
      window.removeEventListener('keydown', (e) => closeInterface(e));
  }, []);

  return (
    <div className={isOverlayVisible ? 'overlay visible' : 'overlay'}>
      <div
        className='interface close'
        onClick={() => setIsOverlayVisible(false)}
      >
        <ImCancelCircle />
      </div>
      <Collapse defaultActiveKey={['1']} accordion ghost>
        <Panel
          header={<span className='panel-header'>Informations</span>}
          key='1'
        >
          <Informations />
        </Panel>
        <Panel header={<span className='panel-header'>Légende</span>} key='2'>
          <Caption data={data} />
        </Panel>
        <Panel
          header={<span className='panel-header'>Utilisation</span>}
          key='3'
        >
          <Instructions />
        </Panel>
        <Panel header={<span className='panel-header'>Sources</span>} key='4'>
          <Sources />
        </Panel>
      </Collapse>

      <Credits />
    </div>
  );
};

const Informations = () => {
  return (
    <div className='interface section informations'>
      <ImWarning />
      <span>
        Cette application a pour objet d'offrir une représentation visuelle des
        données, <b>en utilisant des échelles arbitraires.</b>
        <br />
        En aucun cas, elle ne prétend fournir une analyse statistique ou une
        interprétation des données.
        <Tooltip
          title={
            <span>
              Les données des sphères comme la taille, la position ou la couleur
              correspondent bien à des données réelles, et représentent un moyen
              de comparaison efficace.
              <br />
              <br /> Seulement, elles sont adaptées en facteurs de pondération
              pour une meilleure lisibilité. Par exemple, la proximité des
              groupes par rapport au centre ne correspond pas purement au
              facteur de similarité des votes, mais à une distance initiale
              pondérée par ce facteur.
            </span>
          }
        >
          <TbQuestionMark className='info' />
        </Tooltip>
      </span>

      <GiHolosphere />
      <span>
        Les sphères les plus grosses représentent les différents groupes de
        l'Assemblée Nationale.
        <br />
        Leur <span className='warning'>taille</span> représente leur "pouvoir
        décisionnel" <code>(nombre de membres * taux de participation)</code>.
        <br />
        Leur <span className='warning'>proximité au centre</span> représente
        leur proximité politique avec le groupe majoritaire (le taux moyen de
        similarité des votes).
      </span>

      <TbGridDots />
      <span>
        Les sphères qui gravitent autour des groupes représentent les députés
        qui les composent.
        <br />
        Leur <span className='warning'>taille</span> représente leur taux de
        participation aux votes.
        <br />
        Leur <span className='warning'>attraction au centre</span> représente
        leur proximité politique avec le groupe majoritaire (la similarité des
        votes).
        <br />
        Leur <span className='warning'>couleur</span> représente leur loyauté à
        leur groupe politique (la similarité des votes avec la moyenne).
      </span>
    </div>
  );
};

const Caption = ({ data }) => {
  return (
    <div className='interface section caption'>
      <div className='caption-groups'>
        {data.map((group) => {
          return (
            <p key={group.id} className='caption-group'>
              <span style={{ color: group.associatedColor }}>
                <GiHolosphere />
              </span>
              {group.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

const Instructions = () => {
  return (
    <div className='interface section instructions'>
      {/* Groups */}
      <span className='title'>Groupes</span>

      <GiClick />
      <span>Cliquez sur un groupe pour le voir de plus près.</span>

      <span>
        <TbArrowLeft />
        <TbArrowRight />
      </span>
      <span>Utilisez les flèches pour tourner autour du groupe.</span>

      <GiClick />
      <span>Cliquez de nouveau sur le groupe pour afficher ses détails.</span>

      <GiClick />
      <span>Cliquez n'importe où pour revenir à la vue globale.</span>

      {/* Deputees */}
      <span className='title'>Députés</span>

      <GiClick />
      <span>Cliquez sur un député pour afficher ses détails.</span>

      {/* Search */}
      <span className='title'>Recherche</span>

      <ImSearch />
      <span>
        Utilisez la barre de recherche pour trouver un député ou un groupe.
      </span>

      <TbSelect />
      <span>
        Cliquez sur le résultat pour le voir clairement dans le graphe.
      </span>

      <BsArrowBarRight />
      <span>
        Cliquez sur "Afficher les détails" pour afficher les détails du
        député/groupe.
      </span>
    </div>
  );
};

const Credits = () => {
  return (
    <div className='interface section credits'>
      <p>
        L'intégralité des données sont fournies par{' '}
        <a href='https://datan.fr/' target='_blank' rel='noreferrer'>
          Datan
        </a>{' '}
        via la plateforme data.gouv.fr (
        <a
          href='https://www.data.gouv.fr/fr/datasets/deputes-actifs-de-lassemblee-nationale-informations-et-statistiques/'
          target='_blank'
          rel='noreferrer'
        >
          Députés actifs
        </a>{' '}
        /{' '}
        <a
          href='https://www.data.gouv.fr/fr/datasets/groupes-politiques-actifs-de-lassemblee-nationale-informations-et-statistiques/'
          target='_blank'
          rel='noreferrer'
        >
          Groupes politiques
        </a>
        ).
      </p>
      <p>Les données sont mises à jour quotidiennement.</p>
    </div>
  );
};

const Sources = () => {
  return (
    <div className='interface section sources'>
      <p>
        Toutes les informations sont issues des{' '}
        <a
          href='https://www.data.gouv.fr/fr/organizations/datan/'
          target='_blank'
          rel='noreferrer'
        >
          jeux de données de Datan
        </a>{' '}
        disponibles sur{' '}
        <a
          href='https://www.data.gouv.fr/fr/datasets/'
          target='_blank'
          rel='noreferrer'
        >
          la plateforme des données publiques françaises
        </a>
        . En particulier:
      </p>

      <p>
        <ul>
          <li>
            <a
              href='https://www.data.gouv.fr/fr/datasets/deputes-actifs-de-lassemblee-nationale-informations-et-statistiques/'
              target='_blank'
              rel='noreferrer'
            >
              Députés actifs de l'Assemblée nationale
            </a>
          </li>
          <li>
            <a
              href='https://www.data.gouv.fr/fr/datasets/groupes-politiques-actifs-de-lassemblee-nationale-informations-et-statistiques/'
              target='_blank'
              rel='noreferrer'
            >
              Groupes politiques actifs de l'Assemblée nationale
            </a>
          </li>
        </ul>
      </p>
      <br />
      <p>
        La plateforme{' '}
        <a href='https://datan.fr/' target='_blank' rel='noreferrer'>
          Datan
        </a>{' '}
        met à disposition des données sur l'activité parlementaire des députés
        français, et{' '}
        <a
          href='https://datan.fr/statistiques'
          target='_blank'
          rel='noreferrer'
        >
          un certain nombre de statistiques supplémentaires
        </a>
        . Ces données sont mises à jour quotidiennement.
      </p>
      <br />
      <p>
        <blockquote cite='https://datan.fr/a-propos'>
          Datan est un outil indépendant visant à mieux rendre compte de
          l’activité parlementaire des députés. Pour ce faire, l’accent est mis
          sur les pratiques de vote, permettant ainsi aux citoyens de comprendre
          le positionnement réel de leurs parlementaires.{' '}
          <a href='https://datan.fr/a-propos' target='_blank' rel='noreferrer'>
            (Référence)
          </a>
        </blockquote>
      </p>
    </div>
  );
};

export default Overlay;
