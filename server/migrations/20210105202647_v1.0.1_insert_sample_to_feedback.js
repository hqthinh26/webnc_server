
exports.up = async function(knex) {
  return await knex.raw(`
  INSERT INTO feedback(account_id, course_id, comment, voting_star) VALUES 
  (1, 4, 'This course is fantastic! I learned so much so far, and I knew nothing about any programming languages. Thanks Jose!!', 3.5),
  (2, 4,'The words -Thank you- dont even begin to express my gratitude for the experience that Ive had just by attending your online course. You have been an excellent teacher. And because of your liveliness, care and understanding you have undoubtedly made python a really interesting that once seemed sort of boring for me. I am really grateful to you and now have a liking towards python.',4.5),
  (4, 4,'Excelent course. Support material and lectures very well prepared. Explanations are clear and objective. It is really possible to learn a lot of Pyhton, specially if you start from zero. Looking forward to go deeply in Python by taking other courses from the author.',4),
  (2, 4,'I learned a lot in this course, however, towards the middle of the course, it feels a bit rushed. It took a long time to wrap my head around functions and classes before being able to complete the Milestone projects. Had to go through various external sources before coming back to this course.',2),
  (1, 4,'A Great course for someone who wants to get started with Python. /nThe exercises and challenges really helped and forced me to apply what was taught in each section./nThe puzzlers in between also helped keep things interesting from time to time',1.6);
  `);
};

exports.down = function(knex) {
  
};
