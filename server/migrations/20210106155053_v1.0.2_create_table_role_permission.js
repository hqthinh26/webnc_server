exports.up = async function (knex) {
  return await knex.raw(`
  CREATE TABLE role_permission(
    id bigserial primary key,
    role_id int8 references role(id),
    permission_id int8 references permission(id),
    is_deleted boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  );
  `);
};

exports.down = function (knex) {};
