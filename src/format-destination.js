
const setOptions = (array) => {
  return [...array].map((el) => `<option value="${el}"></option>`).join(``);
};

const makeDestination = (cities, selectedTripType, city, place) => {

  const labelText = selectedTripType.transport ? `${selectedTripType.name} to` : `${selectedTripType.name} in`;
  const labelHasPlace = selectedTripType.place ? `${labelText} ${place} in` : `${labelText}`;

  return (
    `<div class="point__destination-wrap">
      <label class="point__destination-label" for="destination">${labelHasPlace}</label>
      <input class="point__destination-input"
             list="destination-select"
             id="destination"
             name="destination"
             value="${city}"
      >
      <datalist id="destination-select">
        ${setOptions([...cities])}
      </datalist>
    </div>`
  );
};

export {makeDestination};
