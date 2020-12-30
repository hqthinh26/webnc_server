exports.up = async function (knex) {
  return await knex.raw(`
  CREATE TABLE account(
        id bigserial PRIMARY KEY,
        account_name text UNIQUE NOT NULL,
        pw text NOT NULL,
        full_name text NOT NULL,
        email text,
        age integer,
        role_id int8,
        is_deleted boolean default false,
        created_at timestamp default now(),
        updated_at timestamp default now(),
        CONSTRAINT fk_role_id
            FOREIGN KEY (role_id)
                REFERENCES role(id)
  );

  INSERT INTO account(account_name, pw, full_name, email, age, role_id) VALUES
  ('thinhhq', 'admin1', 'Huỳnh Quốc Thịnh', 'quocthinh.huynh26@gmail.com', 22, 3),
  ('themd', 'admin2', 'Đỗ Minh Thế', 'Dominhthe110@gmail.com', 23, 3),
  ('Jose Portilla', 'sample', 'Jose Portilla', 'Jose Portilla@gmail.com', 20, 2),
  ('Kirill Eremenko, Hadelin de Pnateves', 'sample', 'Kirill Eremenko@gmail.com', '', 20, 2);
  
  `);
};

exports.down = function (knex) {};
