import { periodToNumber } from './utils';

const formatContact = {
  email: (value) =>
    value === 'N/A' ? 'N/A' : <a href={`mailto:${value}`}>{value}</a>,
  twitter: (value) => {
    if (value === 'N/A') return 'N/A';

    const twitterHandle = value.replace(
      /(@|https?:\/\/(www\.)?twitter\.com\/)/g,
      '',
    );
    return (
      <a
        href={`https://twitter.com/${twitterHandle}`}
        target='_blank'
        rel='noreferrer'
      >
        @{twitterHandle}
      </a>
    );
  },
  facebook: (value) => {
    if (value === 'N/A') return 'N/A';

    const facebookHandle = value.replace(
      /(https?:\/\/(www\.)?facebook\.com\/)/g,
      '',
    );
    return (
      <a
        href={`https://facebook.com/${facebookHandle}`}
        target='_blank'
        rel='noreferrer'
      >
        {facebookHandle}
      </a>
    );
  },
  website: (value) => {
    if (value === 'N/A') return 'N/A';

    return (
      <a href={value} target='_blank' rel='noreferrer'>
        {value}
      </a>
    );
  },
};

export const organizeDrawerData = {
  individual: (data) => {
    const generalData = {
      // gender: { type: 'Genre', value: data.gender },
      firstName: { type: 'Prénom', value: data.firstName },
      lastName: { type: 'Nom', value: data.lastName },
      age: {
        type: 'Âge',
        value: `${data.age} ans (${new Date(
          data.birthDate,
        ).toLocaleDateString()})`,
      },
      department: {
        type: 'Département',
        value: `${data.departmentName} (${data.departmentCode})`,
      },
      job: { type: 'Profession', value: data.job },
    };

    const politicalData = {
      group: {
        type: 'Groupe',
        value: `${data.group} (${data.groupShort})`,
      },
      majority: {
        type: 'Groupe déclaré',
        value: data.maj
          ? 'Majorité présidentielle'
          : 'Opposition à la majorité présidentielle',
      },
      start: {
        type: 'Début du mandat',
        value: new Date(data.startDate).toLocaleDateString(),
      },
      experience: {
        type: 'Expérience',
        value: `${data.experience} (${data.mandatesAmount} mandats)`,
      },
      district: { type: 'Circonscription', value: data.district },
      legislature: { type: 'Législature', value: data.legislature },
    };

    const contactData = {
      email: {
        type: 'Email',
        value: formatContact.email(data.email),
      },
      twitter: { type: 'Twitter', value: formatContact.twitter(data.twitter) },
      facebook: {
        type: 'Facebook',
        value: formatContact.facebook(data.facebook),
      },
      website: { type: 'Site web', value: formatContact.website(data.website) },
    };

    const statsData = {
      loyalty: { type: 'Loyauté', value: data.loyaltyScore },
      majority: { type: 'Majorité', value: data.majorityScore },
      participation: {
        type: 'Participation',
        value: data.participationScore,
      },
      specParticipation: {
        type: 'Participation (spécialité)',
        value: data.specParticipationScore,
      },
    };

    return {
      generalData,
      politicalData,
      contactData,
      statsData,
    };
  },
  group: (data) => {
    const generalData = {
      // name, shortName, age + startData, membersAmount, politicalPosition
      name: { type: 'Nom', value: data.name },
      shortName: { type: 'Nom court', value: data.shortName },
      age: {
        type: 'Âge',
        value: `${Number(data.age).toFixed()} ans (${new Date(
          data.startDate,
        ).toLocaleDateString()})`,
      },
      membersAmount: {
        type: 'Nombre de membres',
        value: data.membersAmount,
      },
      politicalPosition: {
        type: 'Position politique',
        value: data.politicalPosition,
      },
    };

    const types = {
      name: 'Nom',
      age: 'Âge',
      department: 'Département',
      job: 'Profession',
      experience: 'Expérience',
      participationScore: 'Participation',
      loyaltyScore: 'Loyauté',
      majorityScore: 'Majorité',
      image: 'Image',
      raw: 'raw',
    };

    const members = data.data.map((member) => {
      return {
        name: {
          type: types.name,
          value: `${member.gender} ${member.firstName} ${member.lastName}`,
        },
        age: {
          type: types.age,
          value: `${Number(member.age)}`,
        },
        department: {
          type: types.department,
          value: `${member.departmentName} (${member.departmentCode})`,
        },
        job: {
          type: types.job,
          value: member.job,
        },
        experience: {
          type: types.experience,
          value: periodToNumber(member.experience),
        },
        participationScore: {
          type: types.participationScore,
          value: Number(member.participationScore * 100).toFixed(),
        },
        loyaltyScore: {
          type: types.loyaltyScore,
          value: Number(member.loyaltyScore * 100).toFixed(),
        },
        majorityScore: {
          type: types.majorityScore,
          value: Number(member.majorityScore * 100).toFixed(),
        },
        image: {
          type: types.image,
          value: member.image,
        },
        raw: { type: types.raw, value: member },
      };
    });

    const membersData = Object.keys(types).reduce((acc, key) => {
      acc[key] = {
        type: types[key],
        value: members.map((member) => member[key].value),
      };
      return acc;
    }, {});

    let statsData = {};
    const groupStats = data.stats.average;
    const globalStats = data.stats.global;

    const stats = [
      { key: 'participation', type: 'Participation' },
      { key: 'specParticipation', type: 'Participation (spécialité)' },
      { key: 'loyalty', type: 'Loyauté' },
      { key: 'majority', type: 'Majorité' },
      { key: 'cohesion', type: 'Cohésion' },
      { key: 'power', type: 'Pouvoir' },
      { key: 'women', type: 'Pourcentage de femmes' },
      // { key: 'membersAmount', type: 'Nombre de membres' },
    ];

    stats.forEach((stat) => {
      statsData[stat.key] = {
        type: stat.type,
        group: groupStats[stat.key],
        global: globalStats[stat.key],
      };
    });

    return {
      generalData,
      membersData,
      statsData,
    };
  },
};

export const formatStatsForChart = {
  individual: (baseData, compareData, graph) => {
    const max = 100;

    const formatted = Object.keys(baseData).map((key) => {
      const type = baseData[key].type;
      const individualValue = baseData[key].value;
      const groupValue = compareData[key];

      const ref = graph === 'radar' ? { fullMark: max } : { amt: max };

      return {
        type,
        A: Number((individualValue * 100).toFixed(2)),
        B: Number(groupValue).toFixed(2),
        ...ref,
      };
    });

    return formatted;
  },

  group: (data, graph) => {
    const max = 100;

    const formatted = Object.keys(data).map((key) => {
      const type = data[key].type;
      const groupValue = data[key].group;
      const globalValue = data[key].global;

      const ref = graph === 'radar' ? { fullMark: max } : { amt: max };

      return {
        type,
        A: Number(Number(groupValue).toFixed(2)),
        B: Number(Number(globalValue).toFixed(2)),
        ...ref,
      };
    });

    return formatted;
  },
};
