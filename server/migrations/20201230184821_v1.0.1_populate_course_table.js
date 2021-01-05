
exports.up = async function(knex) {
  return await knex.raw(`
  INSERT INTO course(name, course_type_id, lecturer_id, clickbait_image, price, rating, rating_count, is_best_seller) VALUES
  ('2020 Complete Guide on How To Love Cat', 1, 3, 'https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg', '129.99', 4.6, 335440, true),
  ('A Complete Beginner Guide to JavaScript', 1, 4, 'https://miro.medium.com/max/2562/1*_Xqei5CDKIPJ7VewFuAPjA.png', '119.99', 3.2, 150000, false),
  ('Learn Python Programming Masterclass', 2, 3, 'https://datawider.com/wp-content/uploads/2019/11/How-to-Learn-Python.jpg', '99.99', 4.5, 56321, false),
  ('2020 Complete Python Bootcamp From Zero to Hero in Python', 2, 3, 'https://engineering.fb.com/wp-content/uploads/2015/06/1522635669452_11.jpg', '112.99', 3.7, 87654, true),
  ('Entrance level: A Guide to Python & Django Latest 2020', 1, 3, 'https://lh6.googleusercontent.com/rU8dZ0x67y63AeujFhM79UG_I3ZagEqTmDffagrUVuBI5eXPHtW2Z7zP1KU1MLKtl0wU5eNS_QHU-9v3GUJgxlKYeAR1yKADY8xCj7xMrpL8z9Rr2Zde9_OGsmXTigvBr7DEWggV', '89.99', 2.8, 98767, false),
  ('NoSQL Database: MongoDB Guide', 1, 4, 'https://www.filepicker.io/api/file/BPuxT72TDetZjNxyG4gh', '125.99', 4.5, 765434, true);
  `);
};

exports.down = function(knex) {
  
};
