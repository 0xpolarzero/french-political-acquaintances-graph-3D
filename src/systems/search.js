export const searchSystem = (data, onSearch, onClear) => {
  const searchableData = data.map((group) => {
    // Return items with value and type for all groups, and all individuals in groups
    return [
      {
        value: group.libelleAbrev,
        type: 'group',
        item: group,
      },
      ...group.data.map((depute) => {
        return {
          value: `${depute.prenom} ${depute.nom}`,
          type: 'individual',
          item: depute,
          group: group,
        };
      }),
    ];
  });
  // Merge all arrays into one
  const unifiedData = searchableData.flat();
  // Sort in alphabetical order
  const sortedData = unifiedData.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  });

  return {
    placeholder: 'Rechercher un député ou un groupe...',
    options: sortedData,
    onSelect: onSearch,
    onClear: onClear,
    filterOption: (inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1,
    style: { width: 300 },
    allowClear: true,
  };
};
