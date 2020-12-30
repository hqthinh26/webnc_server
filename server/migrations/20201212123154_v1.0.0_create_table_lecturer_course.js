
exports.up = async function(knex) {
  await knex.raw(`
    CREATE TABLE lecturer_course(
        id bigserial PRIMARY KEY,
        lecturer_id int8,
        course_id int8,
        is_deleted boolean default false,
        created_at timestamp default now(),
        updated_at timestamp default now(),

        CONSTRAINT fk_lecturer_id 
            FOREIGN KEY (lecturer_id)
                REFERENCES account(id),

        CONSTRAINT fk_course_id
            FOREIGN KEY (course_id)
                REFERENCES course(id)
    );
  `);
};

exports.down = function(knex) {
  
};
