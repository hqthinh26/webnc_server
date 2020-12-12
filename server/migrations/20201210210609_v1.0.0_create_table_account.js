exports.up = async function (knex) {
  return await knex.raw(`
  CREATE TABLE account(
        id bigserial PRIMARY KEY,
        account_name text UNIQUE NOT NULL,
        pw text NOT NULL,
        full_name text NOT NULL,
        email text,
        age integer,
        role_id int8,
        is_deleted boolean default false,
        created_at timestamp default now(),
        updated_at timestamp default now(),
        CONSTRAINT fk_role_id
            FOREIGN KEY (role_id)
                REFERENCES role(id)
  );
  `);
};

exports.down = function (knex) {};
