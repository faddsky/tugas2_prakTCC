// 1. Load Environment Variables (WAJIB paling atas)
require("dotenv").config();

// 2. Import Package
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const notesRoutes = require("./routes/notes");

// 3. Inisialisasi App
const app = express();

// 4. Konfigurasi CORS
// Sesuaikan dengan origin frontend kamu agar tidak kena blokir browser
app.use(cors({
  origin: ['http://localhost', 'http://localhost:5173', 'http://127.0.0.1:5500', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// 5. Middleware
app.use(express.json()); // Untuk membaca body berformat JSON
app.use(express.urlencoded({ extended: true })); // Untuk membaca body dari form

// 6. Route Dasar (Landing Page API)
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: 'Selamat datang di Notes API! ✨',
    endpoints: {
      'GET /api/notes': 'Lihat semua catatan',
      'GET /api/notes/:id': 'Lihat detail catatan',
      'POST /api/notes': 'Tambah catatan baru',
      'PUT /api/notes/:id': 'Edit catatan',
      'DELETE /api/notes/:id': 'Hapus catatan'
    }
  });
});

// 7. Setting Routes & Schema
// Memastikan skema Note dipanggil agar tabel terbuat otomatis jika belum ada
require("./schema/Note"); 
app.use("/api/notes", notesRoutes);

// 8. Error Handling (404 Not Found)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Maaf, endpoint tidak ditemukan'
  });
});

// 9. Error Handling (Global Server Error)
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server',
    error: err.message
  });
});

// 10. Sinkronisasi Database dan Jalankan Server
const port = process.env.PORT || 3000;

// Jalankan server terlebih dahulu dengan host '0.0.0.0'
app.listen(port, '0.0.0.0', () => {
  console.log(` Server running on port ${port}`);
  
  // Lakukan sinkronisasi database setelah server berhasil menyala
  sequelize.sync().then(() => {
    console.log(" Database synced successfully!");
  }).catch(err => {
    console.error(" Gagal sinkronisasi database:", err);
  });
});