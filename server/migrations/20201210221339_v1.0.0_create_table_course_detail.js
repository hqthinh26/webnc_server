
exports.up = async function(knex) {
    return knex.raw(`
    CREATE TABLE course_detail(
        id bigserial PRIMARY KEY,
        lecturer_id int8,
        course_id int8,
        full_image text,
        full_name text,
        bio text,
        full_description text,
        is_deleted boolean default false,
        created_at timestamptz default now(),
        updated_at timestamptz default now(),

        CONSTRAINT fk_course_id
        FOREIGN KEY (course_id)
            REFERENCES course(id),

        CONSTRAINT fk_lecturer_id
        FOREIGN KEY (lecturer_id)
            REFERENCES account(id)
    );
    `);
};

exports.down = function(knex) {
  
};
