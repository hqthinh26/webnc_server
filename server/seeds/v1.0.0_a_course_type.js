exports.seed = async function (knex) {
  const checkCourseType = await knex("course_type");
  if (checkCourseType.length > 0) return;
  else {
    await knex.raw(`
      INSERT INTO course_type(name) VALUES 
        ('Lập trình Web'),
        ('Lập trình thiết bị di động');
  `);
  }
};
