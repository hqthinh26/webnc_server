
exports.up = async function(knex) {
  return await knex.raw(`
  CREATE TABLE lesson(
      id bigserial PRIMARY KEY,
      course_id int8,
      lecturer_id int8,
      lession_chapter text,
      lession_name text,
      lession_content text,
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
  `)
};

exports.down = function(knex) {
  
};
