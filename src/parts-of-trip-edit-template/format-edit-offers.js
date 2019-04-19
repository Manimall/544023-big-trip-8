const OFFER_CURRENCY = `€`;

const formatEditOffers = (offers) => {
  const getAllOffers = [...offers].reduce((acc, offer) => {
    acc += `
      <input class="point__offers-input visually-hidden"
            type="checkbox"
            id="${offer.name}"
            name="offer"
            value="${offer.name}"
            ${offer.chosen ? `checked` : ``}
      >
      <label for="${offer.name}" class="point__offers-label">
        <span class="point__offer-service">
          ${offer.name}
        </span>
          + ${OFFER_CURRENCY}
        <span class="point__offer-price">
          ${offer.price}
        </span>
      </label>`.trim();
    return acc;
  }, ``);

  return (
    `<div class="point__offers-wrap">
      ${getAllOffers}
    </div>
    `.trim()
  );
};

export {formatEditOffers};
