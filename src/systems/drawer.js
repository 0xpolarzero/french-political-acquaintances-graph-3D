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

const formatStats = (individualStats, groupStats) => {
  const max = 100;

  const data = Object.keys(individualStats).map((key) => {
    const type = individualStats[key].type;
    const individualValue =
      /* isNaN(individualStats[key].value)
      ? 0
      :  */ individualStats[key].value;
    const groupValue = groupStats[key];

    return {
      type,
      A: individualValue * 100,
      B: groupValue * 100,
      fullMark: max,
    };
  });

  return data;
};

export const organizeDrawerData = (data, groupsData) => {
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
    participation: {
      type: 'Participation',
      value: data.participationScore,
    },
    specParticipation: {
      type: 'Participation aux séances liées à la spécialité',
      value: data.specParticipationScore,
    },
    majority: { type: 'Majorité', value: data.majorityScore },
  };

  const statsFormatted = formatStats(statsData, groupsData);

  return {
    generalData,
    politicalData,
    contactData,
    statsData: statsFormatted,
  };
};

export const getOppositeColor = (color) => {
  const colorHex = color.replace('#', '');
  const colorHexOpposite = (0xffffff ^ parseInt(colorHex, 16)).toString(16);
  const colorOpposite = `#${colorHexOpposite}`;

  return colorOpposite;
};
