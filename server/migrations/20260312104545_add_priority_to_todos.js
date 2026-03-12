exports.up = function(knex) {
  return knex.schema.table('todos', function(table) {
    table.integer('priority').defaultTo(1); // 1 = Low, 2 = Medium, 3 = High
  });
};

exports.down = function(knex) {
  return knex.schema.table('todos', function(table) {
    table.dropColumn('priority');
  });
};
