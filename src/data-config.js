/**
 * @fileoverview Data configuration for the application.
 * It maps data from the provider to more generic categories,
 * so it can be adapted to different data sources, and provide more
 * information.
 */

// See stores/useData.js to see how the data is fetched and organized.

// URLs for fetching data
export const dataUrls = {
  // Deputees
  deputees:
    'https://www.data.gouv.fr/fr/datasets/r/092bd7bb-1543-405b-b53c-932ebb49bb8e',
  // Groups
  groups:
    'https://www.data.gouv.fr/fr/datasets/r/4612d596-9a78-4ec6-b60c-ccc1ee11f8c0',
};

// Map data fetched from Datan to english categories
export const dataConfig = {
  categories: {
    individuals: {
      age: 'age',
      // Circonscription
      circo: 'district',
      // Civilité (M., Mme)
      civ: 'gender',
      dateMaj: 'lastUpdate',
      // Date de prise de fonction -> Start of the mandate
      datePriseFonction: 'startDate',
      departementCode: 'departmentCode',
      departementNom: 'departmentName',
      experienceDepute: 'experience',
      facebook: 'facebook',
      groupe: 'group',
      // Abréviation / Short name, e.g. 'RE' for 'Renaissance'
      groupeAbrev: 'groupShort',
      id: 'id',
      image: 'image',
      job: 'job',
      // Period in which the deputy is in office
      legislature: 'legislature',
      mail: 'email',
      naissance: 'birthDate',
      nom: 'lastName',
      nombreMandats: 'mandatesAmount',
      prenom: 'firstName',
      // A quel point le député vote dans la même ligne que son parti
      // How much the deputy is loyal to his party
      scoreLoyaute: 'loyaltyScore',
      // A quel point le député vote dans la même ligne que le groupe majoritaire
      // How much the deputy votes in the same line as the majority party
      scoreMajorite: 'majorityScore',
      scoreParticipation: 'participationScore',
      // Participation in votes related to their specialities
      scoreParticipationSpecialites: 'specParticipationScore',
      twitter: 'twitter',
      website: 'website',

      // Added in the code
      // maj: Is the deputy in the majority party?
      // position: the [x, y, z] position in the scene
    },
    groups: {
      age: 'age',
      // La couleur associée sur le site de l'Assemblée
      // The color associated with the group on the Assemblée Nationale website
      couleurAssociee: 'associatedColor',
      dateDebut: 'startDate',
      dateMaj: 'lastUpdate',
      effectif: 'membersAmount',
      id: 'id',
      legislature: 'legislature',
      // e.g. Ecologiste - NUPES
      libelle: 'name',
      // e.g. Ecolo - NUPES
      libelleAbrege: 'briefName',
      // e.g. ECOLO
      libelleAbrev: 'shortName',
      // Majoritaire / Opposition - Majority / Opposition
      positionPolitique: 'politicalPosition',
      scoreMajorite: 'majorityScore',
      scoreParticipation: 'participationScore',
      scoreRose: 'roseScore',
      scoreCohesion: 'cohesionScore',
      women: 'womenPercentage',

      // Added in the code
      // data: all individuals in the group
      // stats: custom power stats of the group
      //... includes: power: { ... }
      // ... power.value: (number of members * participation score)
      // ... power.percentage: (power.value / total power.value)
    },
  },
};
