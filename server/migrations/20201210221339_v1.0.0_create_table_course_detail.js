
exports.up = async function(knex) {
    return knex.raw(`
    CREATE TABLE course_detail(
        id bigserial PRIMARY KEY,
        course_id int8,
        bio text,
        full_description text,
        will_learn_list text,
        is_deleted boolean default false,
        created_at timestamptz default now(),
        updated_at timestamptz default now(),

        CONSTRAINT fk_course_id
        FOREIGN KEY (course_id)
            REFERENCES course(id)
    );
    `);
};

exports.down = function(knex) {
  
};
