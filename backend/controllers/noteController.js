const Note = require('../models/noteModels');

// 1. GET: Ambil semua catatan
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.findAll({
            order: [['tanggal_dibuat', 'DESC']] // Mengurutkan dari yang terbaru
        });
        res.status(200).json({
            success: true,
            data: notes
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil catatan',
            error: err.message
        });
    }
};

// 2. GET: Ambil satu catatan berdasarkan ID
exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findByPk(req.params.id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Catatan tidak ditemukan'
            });
        }
        res.status(200).json({
            success: true,
            data: note
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan',
            error: err.message
        });
    }
};

// 3. POST: Tambah catatan baru
exports.createNote = async (req, res) => {
    try {
        const { judul, isi } = req.body;
        const newNote = await Note.create({ judul, isi });
        res.status(201).json({
            success: true,
            message: 'Catatan berhasil disimpan! ✨',
            data: newNote
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Gagal menyimpan catatan',
            error: err.message
        });
    }
};

// 4. PUT: Update catatan (Fitur Edit)
exports.updateNote = async (req, res) => {
    try {
        const { judul, isi } = req.body;
        const note = await Note.findByPk(req.params.id);
        
        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Catatan tidak ditemukan'
            });
        }

        await note.update({ judul, isi });
        res.status(200).json({
            success: true,
            message: 'Catatan berhasil diperbarui! 🛠️'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui catatan',
            error: err.message
        });
    }
};

// 5. DELETE: Hapus catatan
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findByPk(req.params.id);
        
        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Catatan tidak ditemukan'
            });
        }

        await note.destroy();
        res.status(200).json({
            success: true,
            message: 'Catatan berhasil dihapus ☁️'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus catatan',
            error: err.message
        });
    }
};