const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteDetailHandler,
  removeNoteHandler,
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
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: addNoteHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: removeNoteHandler,
  },
];

module.exports = routes;
