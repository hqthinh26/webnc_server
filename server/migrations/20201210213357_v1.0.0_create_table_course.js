
exports.up = async function(knex) {
    return await knex.raw(`
    CREATE TABLE course(
        id bigserial PRIMARY KEY,
        name text NOT NULL,
        course_type_id int8,
        lecturer_id int8,
        clickbait_image text,
        price text,
        rating numeric(2,1),
        rating_count int4,
        is_best_seller boolean default false,
        is_deleted boolean default false,
        created_at timestamptz default now(),
        updated_at timestamptz default now(),

        CONSTRAINT fk_course_type_id
            FOREIGN KEY (course_type_id)
                REFERENCES course_type(id),

        CONSTRAINT fk_lecture_id
            FOREIGN KEY (lecturer_id)
                REFERENCES account(id)
    );
    `);
};

exports.down = function(knex) {
  
};
