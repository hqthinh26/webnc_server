
exports.up = async function(knex) {
    return await knex.raw(`

    CREATE TABLE role(
        id bigserial primary key,
        name text,
        is_deleted boolean default false,
        created_at timestamp default now(),
        updated_at timestamp default now()
    );
    `);
};

exports.down = function(knex) {
  
};
