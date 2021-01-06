exports.up = async function (knex) {
  return await knex.raw(`
  CREATE TABLE permission(
      id bigserial primary key,
      name_sort text, 
      name text,
      screen text,
      screen_function text,
      is_deleted boolean default false,
      created_at timestamptz default now(),
      updated_at timestamptz default now()
  );
  `);
};

exports.down = function (knex) {};
