
exports.seed = async function(knex) {
  const checkRole = await knex("role");
  if (checkRole.length > 0) return;
  else {
    await knex.raw(`
    INSERT INTO role(name) VALUES
        ('Học Viên'),
        ('Giảng Viên'),
        ('Quản Trị Viên');
  `);
  }
};
