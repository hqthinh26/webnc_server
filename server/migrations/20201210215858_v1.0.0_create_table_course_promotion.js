
exports.up = async function(knex) {
    return await knex.raw(`
    CREATE TABLE course_promotion(
        id bigserial PRIMARY KEY,
        course_id int8,
        promotion_id int8,
        is_deleted boolean default false,
        created_at timestamptz default now(),
        updated_at timestamptz default now(),

        CONSTRAINT fk_course_id
            FOREIGN KEY (course_id)
                REFERENCES course(id),

        CONSTRAINT fk_promotion_id
            FOREIGN KEY (promotion_id)
                REFERENCES promotion(id)
    );
    `);
};

exports.down = function(knex) {
  
};
