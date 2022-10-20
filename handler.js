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

  const { bookId } = request.params;
  const findId = notes.findIndex((note) => note.id == bookId);

  if (!name) {
    return h
      .response({
        status: 'fail',
        message: `Gagal ${
          bookId ? 'memperbarui' : 'menambahkan'
        } buku. Mohon isi nama buku`,
      })
      .code(400);
  } else if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message: `Gagal ${
          bookId ? 'memperbarui' : 'menambahkan'
        } buku. readPage tidak boleh lebih besar dari pageCount`,
      })
      .code(400);
  } else if (findId < 0 && request.method == 'put') {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
      .code(404);
  } else if (name && readPage <= pageCount) {
    if (findId >= 0) {
      notes[findId] = {
        ...notes[findId],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        updatedAt: new Date().toISOString(),
      };
      return h
        .response({ status: 'success', message: 'Buku berhasil diperbarui' })
        .code(200);
    }
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

  const noteDetail = notes.filter((note) => note.id == bookId)[0];

  if (!noteDetail) {
    return h
      .response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      })
      .code(404);
  }

  const response = h.response({
    status: 'success',
    data: {
      book: noteDetail,
    },
  });
  response.code(200);
  return response;
};

const removeNoteHandler = (request, h) => {
  const { bookId } = request.params;

  const findId = notes.findIndex((note) => note.id == bookId);

  if (findId < 0) {
    return h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
      .code(404);
  }

  notes.splice(findId, 1);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  response.code(200);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteDetailHandler,
  removeNoteHandler,
};
