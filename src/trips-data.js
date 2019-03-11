// Данные путешествий (массив объектов). Каждый объект состоит из полей:
// иконка, название, цена, специальные предложения (массив)
export const tripsData = [
  {
    icon: `🚕`,
    title: `Taxi to Airport`,
    price: `€ 10`,
    offers: [
      {
        name: `Upgrade to business`,
        price: `20`
      },
      {
        name: `Order UBER`,
        price: `20`
      }
    ]
  },
  {
    icon: `✈️`,
    title: `Flight to Geneva`,
    price: `€ 80`,
    offers: [
      {
        name: `Upgrade to business`,
        price: `20`
      },
      {
        name: `Select meal`,
        price: `20`
      }
    ]
  },
  {
    icon: `🚗`,
    title: `Drive to Ivanovo`,
    price: `€ 20`,
    offers: [
      {
        name: `Rent a car`,
        price: `200`
      }
    ]
  },
  {
    icon: `🏨`,
    title: `Check into a hotel`,
    price: `€ 50`,
    offers: [
      {
        name: `Add breakfast`,
        price: `20`
      }
    ]
  }
];
