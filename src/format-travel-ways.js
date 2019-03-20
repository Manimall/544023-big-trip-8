/**
 * 1 объект из массива tripTypes
 * @param {Object} el
 * @param {Element} selectedIcon - выбранная пользователем иконка
 * @return {String} - сгенерированную строку
 */
const renderInput = (el, selectedIcon) => {
  const elName = el.name.toLowerCase();
  return (
    `<input class="travel-way__select-input visually-hidden"
            type="radio" id="travel-way-${elName}"
            name="travel-way" value="${elName}"
            ${selectedIcon === el.icon ? `checked` : ``}
    >
    <label class="travel-way__select-label"
           for="travel-way-${elName}"
    >
      ${el.icon} ${elName}
    </label>`.trim()
  );
};

const getFullTravelWayLayout = (firstGroup, secondGroup) => {
  return (
    `<div class="travel-way__select">
        <div class="travel-way__select-group">
          ${firstGroup}
        </div>

        <div class="travel-way__select-group">
          ${secondGroup}
        </div>
      </div>
    `.trim()
  );
};


const formatTravelWay = (arrayOfWays, selectedIcon) => {

  const reduceInputs = (inputs, filterPredicate) => {
    return inputs.reduce((acc, item) => {
      if (filterPredicate(item)) {
        return `${acc}${renderInput(item, selectedIcon)}`;
      }
      return acc;
    }, ``);
  };

  const firstTravelGroup = reduceInputs(arrayOfWays, (item) => item.transport);
  const secondTravelGroup = reduceInputs(arrayOfWays, (item) => !item.transport);

  return getFullTravelWayLayout(firstTravelGroup, secondTravelGroup);
};

export {formatTravelWay};
