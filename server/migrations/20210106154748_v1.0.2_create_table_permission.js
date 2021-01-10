exports.up = async function (knex) {
  return await knex.raw(`
  CREATE TABLE permission(
      id bigint primary key,
      name text,
      screen text,
      is_deleted boolean default false,
      created_at timestamptz default now(),
      updated_at timestamptz default now()
  );
  `);
};

exports.down = function (knex) {};
