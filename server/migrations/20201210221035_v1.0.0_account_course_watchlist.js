exports.up = async function (knex) {
  return await knex.raw(`
    CREATE TABLE account_course_watchlist(
        id bigserial PRIMARY KEY,
        account_id int8,
        course_id int8,
        created_at timestamp default now(),

        CONSTRAINT fk_account_id
            FOREIGN KEY (account_id)
                REFERENCES account(id),

        CONSTRAINT fk_course_id
            FOREIGN KEY (course_id)
                REFERENCES course(id)
    );
    `);
};

exports.down = function (knex) {};
