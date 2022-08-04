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
    .all({ q: "nationalPokedexNumbers:[1 to 25]" })
    .then((cards) => {
      return cards;
    });

  const filterCards = cards.filter((card) => {
    if (card.flavorText && card.cardmarket) {
      if (card.cardmarket.prices.averageSellPrice) return card;
    }
  });

  const users = await Promise.all([
    User.create({
      email: "ethan@123.com",
      password: "Hello123!!",
      firstName: "Ethan",
      lastName: "Nair",
      userType: "admin",
    }),
    User.create({
      email: "a920cyj@gmail.com",
      password: "Hello123!!",
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

  // [Yj, ethan, warren, ryan] = users;

  // const yjOrder = Order.create({ status: "open" });

  // Yj.addOrder(yjOrder);

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
