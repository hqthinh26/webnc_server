exports.up = async function (knex) {
  return await knex.raw(`
    CREATE TABLE feedback(
        id bigserial PRIMARY KEY,
        account_id int8,
        comment text,
        voting_star int2 default 0,
        course_id int8,
        is_deleted boolean default false,
        created_at timestamptz default now(),
        updated_at timestamptz default now(),

        CONSTRAINT fk_course_id
            FOREIGN KEY (course_id)
                REFERENCES course(id),

        CONSTRAINT fk_account_id
          FOREIGN KEY (account_id)
            REFERENCES account(id)
    );
  `);
};

exports.down = function (knex) {};
