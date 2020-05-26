exports.up = function (knex) {
    return knex.schema
      .createTable("users", (tbl) => {
        tbl.increments("id").primary();
        tbl.text("username", 250).unique().notNullable();
        tbl.text("password", 250).notNullable();
        tbl.text("email", 250).unique().notNullable();
        tbl.text("name", 250).notNullable();
        tbl.text("businessName").notNullable();
        tbl.boolean("terms").defaultTo(false);
      })
      .createTable("items", (tbl) => {
        tbl.increments("id").primary();
        tbl.text("location", 250).notNullable();
        tbl.text("name", 250).notNullable();
        tbl.text("description", 250).notNullable();
        tbl.integer("price").notNullable();
        tbl.integer("userId")
        .references("users.id")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      
      })
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists("items")
      .dropTableIfExists("users");
  };
  