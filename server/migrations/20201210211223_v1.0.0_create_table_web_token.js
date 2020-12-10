
exports.up = async function(knex) {
  return await knex.raw(`
    CREATE TABLE web_token(
        id bigserial PRIMARY KEY,
        account_id int8 NOT NULL,
        token text NOT NULL,
        logout_at timestamp,
        expired_at timestamp,
        created_at timestamp default now(),
        updated_at timestamp default now(),
        CONSTRAINT fk_account_id
            FOREIGN KEY (account_id)
                REFERENCES account(id)
    );
  `);
};

exports.down = function(knex) {
  
};
