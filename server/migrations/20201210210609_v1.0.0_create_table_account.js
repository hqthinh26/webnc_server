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
        profile_image text,
        is_deleted boolean default false,
        created_at timestamp default now(),
        updated_at timestamp default now(),
        CONSTRAINT fk_role_id
            FOREIGN KEY (role_id)
                REFERENCES role(id)
  );

  INSERT INTO account(account_name, pw, full_name, email, age, role_id, profile_image) VALUES
  ('thinhhq', 'admin1', 'Huỳnh Quốc Thịnh', 'quocthinh.huynh26@gmail.com', 22, 3, 'https://www.pngkit.com/png/full/133-1337492_google-employee-amanda-avatar.png'),
  ('themd', 'admin2', 'Đỗ Minh Thế', 'Dominhthe110@gmail.com', 23, 3, 'https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg'),
  ('Jose Portilla', 'sample', 'Jose Portilla', 'Jose Portilla@gmail.com', 20, 2, 'https://cdn2.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg'),
  ('Kirill Eremenko, Hadelin de Pnateves', 'sample', 'Kirill Eremenko@gmail.com', '', 20, 2, 'https://4.bp.blogspot.com/-txKoWDBmvzY/XHAcBmIiZxI/AAAAAAAAC5o/wOkD9xoHn28Dl0EEslKhuI-OzP8_xvTUwCLcBGAs/s1600/2.jpg');
  
  `);
};

exports.down = function (knex) {};
