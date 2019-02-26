// Данные путешествий (массив объектов). Каждый объект состоит из полей:
// иконка, название, цена, специальные предложения (массив)
export const tripsData = [
  {
    icon: `🚕`,
    title: `Taxi to Airport`,
    price: `€ 10`,
    offers: [
      `Upgrade to business +&euro;&nbsp;20`,
      `Order UBER +&euro;&nbsp;20`
    ]
  },
  {
    icon: `✈️`,
    title: `Flight to Geneva`,
    price: `€ 80`,
    offers: [
      `Upgrade to business +&euro;&nbsp;20`,
      `Select meal +&euro;&nbsp;20`
    ]
  },
  {
    icon: `🚗`,
    title: `Drive to Chamonix`,
    price: `€ 20`,
    offers: [`Rent a car +&euro;&nbsp;200`]
  },
  {
    icon: `🏨`,
    title: `Check into a hotel`,
    price: `€ 50`,
    offers: [`Add breakfast +&euro;&nbsp;20`]
  }
];
