
exports.up = async function(knex) {
  return await knex.raw(`
    CREATE TABLE feedback(
        id bigserial PRIMARY KEY,
        comment text,
        start int2 default 0,
        course_id int8,
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
