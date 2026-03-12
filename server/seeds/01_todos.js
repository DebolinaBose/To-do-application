/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('todos').del();
  await knex('todos').insert([
    { title: 'Learn React', description: 'Study components', status: false },
    { title: 'Build ToDo App', description: 'Practice full stack', status: false }
  ]);
};
