exports.up = async function (knex) {
  return await knex.raw(`
    INSERT INTO course_detail(lecturer_id, course_id, full_image, full_name, bio, full_description) VALUES
    (3, 4, 'https://engineering.fb.com/wp-content/uploads/2015/06/1522635669452_11.jpg', '2020 Complete Python Bootcamp From Zero to Hero in Python', 'Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games', 'Learn to use Python professionally, learning both Python 2 and Python 3!-Learn advanced Python features, like the collections module and how to work with timestamps!-Understand complex topics, like decorators.-Get an understanding of how to create GUIs in the Jupyter Notebook system!-Create games with Python, like Tic Tac Toe and Blackjack!-Learn to use Object Oriented Programming with classes!Learn to use Object Oriented Programming with classes!Build a complete understanding of Python from the ground up!');
    `);
};

exports.down = function (knex) {};
