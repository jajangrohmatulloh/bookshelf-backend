const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newNote = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
  } else if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  } else if (name && readPage <= pageCount) {
    notes.push(newNote);
    return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      })
      .code(201);
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = (request, h) => {
  const getNotes = notes.map((note) => {
    return { id: note.id, name: note.name, publisher: note.publisher };
  });

  const response = h.response({
    status: 'success',
    data: {
      books: getNotes,
    },
  });
  response.code(200);
  return response;
};

const getNoteDetailHandler = (request, h) => {
  const { bookId } = request.params;
  return h.response(bookId);
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteDetailHandler };
