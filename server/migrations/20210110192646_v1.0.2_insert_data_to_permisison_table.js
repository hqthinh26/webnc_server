exports.up = async function (knex) {
  return await knex.raw(`
    INSERT INTO permission(id, name, screen) VALUES 
    (1, 'Tài khoản - Thông tin tài khoản', '/account_detail'),
    (101, 'Khoá học - Tạo khoá học', '/course_creation');
`);
};

exports.down = function (knex) {};
