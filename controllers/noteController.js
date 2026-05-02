const Note = require('../models/noteModels'); // Ini mengarah ke file model buatanmu

// 1. GET: Ambil semua catatan
exports.getAllNotes = async (req, res) => {
    try {
        // Ganti Note.findAll menjadi Note.findAll() sesuai ekspor di model
        const notes = await Note.findAll(); 
        res.status(200).json({ success: true, data: notes });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Gagal', error: err.message });
    }
};

// 2. GET: Ambil berdasarkan ID
exports.getNoteById = async (req, res) => {
    try {
        // GANTI findByPk MENJADI findById
        const note = await Note.findById(req.params.id); 
        if (!note) return res.status(404).json({ success: false, message: 'Tidak ditemukan' });
        res.status(200).json({ success: true, data: note });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 3. POST: Tambah
exports.createNote = async (req, res) => {
    try {
        const { judul, isi } = req.body;
        // Tetap Note.create karena di model namanya 'create'
        const newNote = await Note.create({ judul, isi });
        res.status(201).json({ success: true, data: newNote });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 4. PUT: Update
exports.updateNote = async (req, res) => {
    try {
        const { judul, isi } = req.body;
        // GANTI LOGIKA: Gunakan updateById yang sudah kamu buat di model
        const updated = await Note.updateById(req.params.id, { judul, isi });
        
        if (updated[0] === 0) { // Sequelize update mengembalikan jumlah baris yang terubah
            return res.status(404).json({ success: false, message: 'Gagal update' });
        }
        res.status(200).json({ success: true, message: 'Berhasil diperbarui' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 5. DELETE: Hapus
exports.deleteNote = async (req, res) => {
    try {
        // GANTI LOGIKA: Gunakan deleteById
        const deleted = await Note.deleteById(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: 'Gagal hapus' });
        
        res.status(200).json({ success: true, message: 'Berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};