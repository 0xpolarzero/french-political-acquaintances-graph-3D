import { Tabs } from 'antd';
import { ChartBar, ChartRadar } from './Charts';

const StatsVisualization = ({ data, name, color }) => {
  const tabItems = [
    {
      key: '1',
      label: 'Graphique barres',
      children: <ChartBar data={data} name={name} color={color} />,
    },
    {
      key: '2',
      label: 'Graphique radar',
      children: <ChartRadar data={data} name={name} color={color} />,
    },
    {
      key: '3',
      label: 'A propos des statistiques',
      children: <StatsHelp />,
    },
  ];

  return <Tabs defaultActiveKey='1' items={tabItems} />;
};

const StatsHelp = () => {
  return (
    <>
      <p>
        Les statistiques du groupe sont calculées à partir des données de tous
        les membres du groupe. Il s'agit de la moyenne des scores de chaque
        membre.
      </p>
      <br />
      <p>
        Ces données sont mises en forme par Datan, et{' '}
        <a
          href='https://data.assemblee-nationale.fr/licence-ouverte-open-licence'
          target='_blank'
          rel='noreferrer'
        >
          distribuées par l'Assemblée Nationale
        </a>
        .<br />
        <a
          href='https://datan.fr/statistiques/aide'
          target='_blank'
          rel='noreferrer'
        >
          Cliquez ici pour des informations détaillées à propos des
          statistiques.
        </a>
      </p>
      <br />
      <p>
        <b>Loyauté</b>: le score de loyauté est calculé à partir de la
        proportion de votes du député dans la même ligne que celle de son
        groupe. C'est-à-dire que si le groupe vote majoritairement pour une
        proposition de loi, et que le député vote pour, il est considéré comme
        loyal. Dans le cas contraire, il est considéré comme rebelle.
      </p>
      <br />
      <p>
        <b>Majorité</b>: le score est calculé à partir de la proportion de votes
        du député dans la même ligne que celle de la majorité présidentielle. Il
        s'agit donc de sa proximité avec la majorité présidentielle.
      </p>
      <br />
      <p>
        <b>Participation</b>: le score est calculé à partir du taux de
        participation du député à tous les votes de l'hémicycle. La site Datan
        met à disposition un score de participation aux scrutins solennels, qui
        représentent les votes sur les projets de loi significatifs et fortement
        discutés.
      </p>
      <br />
      <p>
        <b>Participation (spécialité)</b>: le score est calculé à partir du taux
        de participation du député aux scrutins liés à son domaine de
        spécialisation. C'est-à-dire les votes sur des textes précédemments
        examinés dans sa commission parlementaire.
      </p>
    </>
  );
};

export default StatsVisualization;
