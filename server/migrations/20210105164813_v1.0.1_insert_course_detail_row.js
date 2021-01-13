exports.up = async function (knex) {
  return await knex.raw(`
    INSERT INTO course_detail(course_id,full_description, bio, will_learn_list) VALUES
    (4, 'Hello world','Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games','');
    `);
};

exports.down = function (knex) {};
