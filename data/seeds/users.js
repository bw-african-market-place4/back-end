exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          username: "sparkyperch",
          password: "pass",
          email: "sparky@email.com",
          name: "John Smith",
          businessName: "South African Food",
          terms: true,
        },
        {
          username: "lionking",
          password: "pass2",
          email: "lion@email.com",
          name: "Simba",
          businessName: "Hakuna Matata",
          terms: true,
        },
        {
          username: "potatohead",
          password: "pass3",
          email: "potato@email.com",
          name: "Potato",
          businessName: "Potato Chips",
          terms: true,
        },
        {
          username: "luffy",
          password: "pass4",
          email: "luffy@email.com",
          name: "Monkey D. Luffy",
          businessName: "Strawhat Pirates",
          terms: true,
        },
        {
          username: "random",
          password: "pass5",
          email: "random@email.com",
          name: "John Random",
          businessName: "Random World",
          terms: true,
        },
        {
          username: "octopus",
          password: "pass6",
          email: "octopus@email.com",
          name: "Otto Octavius",
          businessName: "Grilled Octopus",
          terms: true,
        },
        {
          username: "ash123",
          password: "pass7",
          email: "ash123@email.com",
          name: "Ash Ketchum",
          businessName: "Gotta Catch",
          terms: true,
        },
      ]);
    });
};
