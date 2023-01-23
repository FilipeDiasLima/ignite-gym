exports.up = knex => knex.schema.createTable("monday", table => {
  table.increments("id");

  table.integer("user_id").references("id").inTable("users");
  table.integer("exercise_id").references("id").inTable("exercises");
  table.text("series").notNullable();
  table.text("repetitions").notNullable();

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("monday");