export const getAverage = (groups) => {
  let averages = {};

  groups.forEach((group) => {
    const groupData = group.data;
    let participationScore = 0;
    let specParticipationScore = 0;
    let majorityScore = 0;
    let loyaltyScore = 0;

    groupData.forEach((d) => {
      participationScore += Number(d.participationScore);
      specParticipationScore += Number(d.specParticipationScore);
      majorityScore += Number(d.majorityScore);
      loyaltyScore += Number(d.loyaltyScore);
    });

    averages[group.shortName] = {
      participation: (participationScore / groupData.length).toFixed(2),
      specParticipation: (specParticipationScore / groupData.length).toFixed(2),
      majority: (majorityScore / groupData.length).toFixed(2),
      loyalty: (loyaltyScore / groupData.length).toFixed(2),
    };
  });

  return averages;
};

export const getGroupPower = (groups, averages) => {
  let powers = {};
  let totalPower = 0;

  groups.forEach((group) => {
    const groupData = group.data;
    const groupAverage = averages[group.shortName];

    const power = groupData.length * groupAverage.participation;
    totalPower += power;

    powers[group.shortName] = {
      value: power,
    };
  });

  groups.forEach((group) => {
    powers[group.shortName].percentage = (
      (powers[group.shortName].value / totalPower) *
      100
    ).toFixed(2);
  });

  return powers;
};
