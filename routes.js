const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteDetailHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getNoteDetailHandler,
  },
];

module.exports = routes;
