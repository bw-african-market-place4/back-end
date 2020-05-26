exports.seed = function (knex) {
  return knex("items")
    .del()
    .then(function () {
      return knex("items").insert([
        {
          location: "Los Angeles",
          name: "cereal",
          description: "breakfast",
          price: 2.99,
          userId: 1
          
        },
        {
          location: "New York",
          name: "African painting",
          description: "work of art",
          price: 25.72,
          userId: 2
        },
        {
          location: "Seattle",
          name: "beans",
          description: "lunch",
          price: 6.99,
          userId:3
        },
        {
          location: "Chicago",
          name: "costume",
          description: "traditional costume",
          price: 30.25,
          userId: 1
        },
        {
          location: "San Diego",
          name: "chicken",
          description: "dinner",
          price: 17,
          userId:2
        },
        {
          location: "San Francisco",
          name: "table",
          description: "traditional table",
          price: 50,
          userId: 3
        },
        {
          location: "Los Angeles",
          name: "decoration",
          description: "traditional decoration",
          price: 12,
          userId:1
          
        },
      ]);
    });
};
