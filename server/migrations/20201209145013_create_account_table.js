
exports.up = async function(knex) {
  await knex.raw(`
    CREATE TABLE account(
        id bigserial primary key,
        account_name text NOT NULL,
        pw text NOT NULL,
        full_name text NOT NULL,
        age integer,
        email text,
        updated_at timestamp default now(),
        created_at timestamp default now(),
        role_id int8 default 1
    );
  `)
};

exports.down = function(knex) {
  
};
