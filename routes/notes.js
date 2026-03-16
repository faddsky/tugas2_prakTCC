const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// 1. Route untuk mengambil semua catatan
// Endpoint: GET /api/notes
router.get('/', noteController.getAllNotes);

// 2. Route untuk mengambil satu catatan berdasarkan ID
// Endpoint: GET /api/notes/:id
router.get('/:id', noteController.getNoteById);

// 3. Route untuk menambah catatan baru
// Endpoint: POST /api/notes
router.post('/', noteController.createNote);

// 4. Route untuk memperbarui catatan (Fitur Edit)
// Endpoint: PUT /api/notes/:id
router.put('/:id', noteController.updateNote);

// 5. Route untuk menghapus catatan
// Endpoint: DELETE /api/notes/:id
router.delete('/:id', noteController.deleteNote);

module.exports = router;