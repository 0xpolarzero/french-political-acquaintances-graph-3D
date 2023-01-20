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
      participation: ((participationScore / groupData.length) * 100).toFixed(2),
      specParticipation: (
        (specParticipationScore / groupData.length) *
        100
      ).toFixed(2),
      majority: ((majorityScore / groupData.length) * 100).toFixed(2),
      loyalty: ((loyaltyScore / groupData.length) * 100).toFixed(2),
      cohesion: (group.cohesionScore * 100).toFixed(2),
      women: group.womenPercentage,
      membersAmount: group.membersAmount,
    };
  });

  return averages;
};

export const getGlobalAverage = (averages, powers) => {
  let participationScore = 0;
  let specParticipationScore = 0;
  let majorityScore = 0;
  let loyaltyScore = 0;
  let cohesionScore = 0;
  let womenPercentage = 0;
  let membersAmount = 0;
  let powerScore = 0;

  Object.keys(averages).forEach((key) => {
    const average = averages[key];
    participationScore += Number(average.participation);
    specParticipationScore += Number(average.specParticipation);
    majorityScore += Number(average.majority);
    loyaltyScore += Number(average.loyalty);
    cohesionScore += Number(average.cohesion);
    womenPercentage += Number(average.women);
    membersAmount += Number(average.membersAmount);
    powerScore += Number(powers[key]);
  });

  return {
    participation: (participationScore / Object.keys(averages).length).toFixed(
      2,
    ),
    specParticipation: (
      specParticipationScore / Object.keys(averages).length
    ).toFixed(2),
    majority: (majorityScore / Object.keys(averages).length).toFixed(2),
    loyalty: (loyaltyScore / Object.keys(averages).length).toFixed(2),
    cohesion: (cohesionScore / Object.keys(averages).length).toFixed(2),
    women: (womenPercentage / Object.keys(averages).length).toFixed(2),
    power: (powerScore / Object.keys(averages).length).toFixed(2),
    membersAmount: membersAmount,
  };
};

export const getGroupPower = (groups, averages) => {
  let powers = {};
  let powersPercentage = {};
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
    powersPercentage[group.shortName] = (
      (powers[group.shortName].value / totalPower) *
      100
    ).toFixed(2);
  });

  return powersPercentage;
};
