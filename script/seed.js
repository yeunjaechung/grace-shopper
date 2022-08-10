"use strict";
const pokemon = require("pokemontcgsdk");
const {
  db,
  models: { User, Product, Order },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

pokemon.configure({ apiKey: "d4d5f2db-a789-46db-a495-a503876544ed" });

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating cards

  const cards = await pokemon.card
    .all({ q: "nationalPokedexNumbers:[1 to 2]" })
    .then((cards) => {
      return cards;
    });

  const filterCards = cards.filter((card) => {
    if (card.flavorText && card.cardmarket) {
      if (card.cardmarket.prices.averageSellPrice) return card;
    }
  });

  const [yj, ethan, warren, ryan] = await Promise.all([
    User.create({
      email: "ethan@123.com",
      password: "Hello123!!",
      firstName: "Ethan",
      lastName: "Nair",
      userType: "admin",
    }),
    User.create({
      email: "a920cyj@gmail.com",
      password: "123",
      firstName: "Yeun Jae",
      lastName: "Chung",
      userType: "admin",
    }),
    User.create({
      email: "onsenkame@gmail.com",
      password: "Hello123!!",
      firstName: "Warren",
      lastName: "Au",
      userType: "admin",
    }),
    User.create({
      email: "rscoville29@gmail.com",
      password: "Hello123!!",
      firstName: "Ryan",
      lastName: "Scoville",
      userType: "admin",
    }),
  ]);

  await Promise.all(
    filterCards.map(async (card) => {
      await Product.create({
        name: card.name,
        price: card.cardmarket.prices.averageSellPrice,
        flavorText: card.flavorText,
        imageSmall: card.images.small,
        imageLarge: card.images.large,
        nationalPokedexNumbers: card.nationalPokedexNumbers[0],
      });
    })
  );

  const [
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
    product9,
  ] = await Promise.all([
    Product.create({
      quantity: 1,
      name: "12",
      price: 12,
      flavorText: "12",
      imageSmall: "https://images.pokemontcg.io/pl1/1.png",
    }),
    Product.create({
      quantity: 1,
      name: "21",
      price: 21,
      flavorText: "21",
      imageSmall: "https://images.pokemontcg.io/det1/1.png",
    }),
    Product.create({
      quantity: 1,
      name: "34",
      price: 34,
      flavorText: "34",
      imageSmall: "https://images.pokemontcg.io/mcd19/1.png",
    }),
    Product.create({
      quantity: 1,
      name: "93",
      price: 93,
      flavorText: "93",
      imageSmall: "https://images.pokemontcg.io/dv1/1.png",
    }),
    Product.create({
      quantity: 1,
      name: "56",
      price: 56,
      flavorText: "56",
      imageSmall: "https://images.pokemontcg.io/xy5/1.png",
    }),
    Product.create({
      quantity: 1,
      name: "61",
      price: 61,
      flavorText: "61",
      imageSmall: "https://images.pokemontcg.io/ex7/1.png",
    }),
    Product.create({
      quantity: 1,
      name: "17",
      price: 17,
      flavorText: "17",
      imageSmall: "https://images.pokemontcg.io/ecard2/H1.png",
    }),
    Product.create({
      quantity: 1,
      name: "50",
      price: 50,
      flavorText: "50",
      imageSmall: "https://images.pokemontcg.io/ex3/1.png",
    }),
    Product.create({
      quantity: 1,
      name: "81",
      price: 81,
      flavorText: "81",
      imageSmall: "https://images.pokemontcg.io/hgss4/1.png",
    }),
  ]);
  const yjOrder1 = await yj.getCart();
  const yjOrder2 = await Order.create({ status: "closed", userId: yj.id });
  const ethanOrder1 = await ethan.getCart();
  const ethanOrder2 = await Order.create({
    status: "closed",
    userId: ethan.id,
  });
  const ethanOrder3 = await Order.create({
    status: "closed",
    userId: ethan.id,
  });
  await yjOrder1.addProducts([product1, product2, product5, product3]);

  await yjOrder2.addProducts([
    product6,
    product3,
    product5,
    product9,
    product2,
  ]);
  await ethanOrder1.addProducts([
    product6,
    product3,
    product5,
    product9,
    product7,
    product8,
    product2,
  ]);
  await ethanOrder2.addProducts([
    product6,
    product3,
    product5,
    product4,
    product2,
  ]);
  await ethanOrder3.addProducts([
    product2,
    product7,
    product1,
    product7,
    product4,
    product6,
  ]);

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
