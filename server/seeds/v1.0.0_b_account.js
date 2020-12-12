
exports.seed = async function(knex) {
  const checkAccount = await knex("account");
  if ( checkAccount.length > 0) return;
  else {
      await knex.raw(`
        INSERT INTO account(account_name, pw, full_name, email, age, role_id) VALUES
        ('thinhhq', 'admin1', 'Huỳnh Quốc Thịnh', 'quocthinh.huynh26@gmail.com', 22, 3),
        ('themd', 'admin2', 'Đỗ Minh Thế', 'Dominhthe110@gmail.com', 23, 3);
  `);
  }

};
