
exports.up = async function(knex) {
    return await knex.raw(`
    CREATE TABLE promotion(
        id bigserial PRIMARY KEY,
        content text,
        from_date timestamp,
        to_date timestamp,
        discount_percent decimal(3,2),
        is_deleted boolean default false,
        created_at timestamp default now(),
        update_at timestamp default now()
    );
    `);
};

exports.down = function(knex) {
  
};
