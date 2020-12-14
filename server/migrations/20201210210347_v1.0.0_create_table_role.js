
exports.up = async function(knex) {
    return await knex.raw(`

    ALTER DATABASE hqt_webnc SET timezone TO 'Asia/Ho_Chi_Minh';

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
