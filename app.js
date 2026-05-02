const API_URL = 'https://notes-123230006-be-435877963894.us-central1.run.app/api/notes';
let editId = null;

document.addEventListener('DOMContentLoaded', loadNotes);

async function loadNotes() {
    try {
        const res = await fetch(API_URL);
        const result = await res.json();
        const container = document.getElementById('notes-container');
        container.innerHTML = '';

        if (result.success && result.data) {
            result.data.forEach(note => {
                const div = document.createElement('div');
                div.className = 'note-card';
                div.innerHTML = `
                    <h3>${note.judul}</h3>
                    <p>${note.isi}</p>
                    <small>Dibuat pada: ${new Date(note.tanggal_dibuat).toLocaleString('id-ID')}</small>
                    <div class="card-actions">
                        <button class="btn-edit" onclick="prepareEdit(${note.id}, '${note.judul}', '${note.isi}')">Edit</button>
                        <button class="btn-delete" onclick="deleteNote(${note.id})">Hapus</button>
                    </div>
                `;
                container.appendChild(div);
            });
        }
    } catch (err) {
        console.error('Gagal memuat data:', err);
    }
}

async function saveNote() {
    const judul = document.getElementById('judul').value;
    const isi = document.getElementById('isi').value;
    const btnSimpan = document.getElementById('btnSimpan');

    if (!judul || !isi) return alert('Harap isi judul dan deskripsi.');

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    try {
        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ judul, isi })
        });

        document.getElementById('judul').value = '';
        document.getElementById('isi').value = '';
        btnSimpan.innerText = 'Simpan Catatan';
        editId = null;
        loadNotes();
    } catch (err) {
        alert('Gagal memproses data.');
    }
}

function prepareEdit(id, judul, isi) {
    document.getElementById('judul').value = judul;
    document.getElementById('isi').value = isi;
    document.getElementById('btnSimpan').innerText = 'Update Catatan';
    editId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteNote(id) {
    if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadNotes();
    }
}