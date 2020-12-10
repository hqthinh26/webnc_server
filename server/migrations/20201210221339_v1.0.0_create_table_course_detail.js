
exports.up = async function(knex) {
    return knex.raw(`
    CREATE TABLE course_detail(
        id bigserial PRIMARY KEY,
        course_id int8,
        course_full_image text,
        course_full_name text,
        course_short_description text,
        course_full_description text,
        is_deleted boolean default false,
        created_at timestamp default now(),
        updated_at timestamp default now(),

        CONSTRAINT fk_course_id
        FOREIGN KEY (course_id)
            REFERENCES course(id)
    );
    `);
};

exports.down = function(knex) {
  
};
