
exports.up = async function(knex) {
  await knex.raw(`
    CREATE TABLE token(
        id bigserial PRIMARY KEY,
        account_id int8 REFERENCES account(id) NOT NULL,
        token text NOT NULL,
        created_at timestamp default now(),
        update_at timestamp default now()
    );
  `);
};

exports.down = function(knex) {
  
};
