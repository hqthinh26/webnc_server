exports.up = async function (knex) {
  return await knex.raw(`
  INSERT INTO role_permission(role_id, permission_id) VALUES 
    (1, 1),
    (2, 1),
    (2, 101),
    (3, 1),
    (3, 101);
  `);
};

exports.down = function (knex) {};
