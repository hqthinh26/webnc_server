
exports.seed = async function(knex) {
  await knex.raw(`
    INSERT INTO account(account_name, pw, full_name, age, email) VALUES 
    ('admin', '1998', 'Huynh Quoc Thinh', 23, 'quocthinh@gmail.com');
  `)
}; 
