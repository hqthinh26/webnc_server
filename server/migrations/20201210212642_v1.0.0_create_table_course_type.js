
exports.up = async function(knex) {
  return await knex.raw(`
    CREATE TABLE course_type(
        id bigserial PRIMARY KEY,
        name text unique NOT NULL,
        is_deleted boolean default false,
        created_at timestamptz default now(),
        updated_at  timestamptz default now()
    );
    
    INSERT INTO course_type(name) VALUES 
    ('Lập trình Web'),
    ('Lập trình thiết bị di động');
  `)
};

exports.down = function(knex) {
  
};
