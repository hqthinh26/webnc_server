
exports.up = async function(knex) {
  return await knex.raw(`
    CREATE TABLE token(
        id bigserial PRIMARY KEY,
        account_id int8 NOT NULL,
        token text NOT NULL,
        expired_at timestamptz,
        logout_at timestamptz,
        created_at timestamptz default now(),
        updated_at timestamptz default now(),
        CONSTRAINT fk_account_id
            FOREIGN KEY (account_id)
                REFERENCES account(id)
    );
  `);
};

exports.down = function(knex) {
  
};
