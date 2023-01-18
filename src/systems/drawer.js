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

export const organizeDrawerData = (data) => {
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
    participation: {
      type: 'Participation',
      value: data.participationScore,
    },
    participationSpecialites: {
      type: 'Participation aux séances liées à la spécialité',
      value: data.specParticipationScore,
    },
    loyalty: { type: 'Loyauté', value: data.loyaltyScore },
    majority: { type: 'Majorité', value: data.majorityScore },
  };

  return {
    generalData,
    politicalData,
    contactData,
    statsData,
  };
};
