/**
 * Отрисовываем каждое предложение из массива offers (в обьекте trip)
 * @param {Array} offers - массив предложений
 * @return {String} - разметка 1ого предложения с заполненными данными
 */
const OFFER_CURRENCY = `€`;

export const getOffersLayout = (offers) => [...offers].map((offer) => {
  return `
    <li>
        <button class="trip-point__offer">${offer.title || offer.name} +  ${OFFER_CURRENCY}&nbsp;${offer.price}</button>
    </li>
    `;
});
