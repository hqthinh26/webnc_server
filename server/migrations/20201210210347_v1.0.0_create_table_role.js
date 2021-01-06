
exports.up = async function(knex) {
    return await knex.raw(`

    SET TIMEZONE='Asia/Ho_Chi_Minh';

    CREATE TABLE role(
        id bigserial primary key,
        name text,
        is_deleted boolean default false,
        created_at timestamptz default now(),
        updated_at timestamptz default now()
    );

    INSERT INTO role(name) VALUES
    ('Học Viên'),
    ('Giảng Viên'),
    ('Quản Trị Viên');
    `);
};

exports.down = function(knex) {
  
};
