const db = require("../config/db");

// Windsurf: Refactor | Explain | Generate JSDoc | X
const getAllProjects = (req, res) => {
    const query = "SELECT * FROM projects ORDER BY created_at DESC";

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                messages: "Gagal mengambil data proyek",
                error: err.message,
            });
        }

        res.status(200).json({
            success: true,
            messages: "Berhasil mengambil semua proyek",
            data: results,
        });
    });
};

// Windsurf: Refactor | Explain | Generate JSDoc | X
const getProjectById = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM projects WHERE id = ?";

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data proyek",
                error: err.message,
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                messages: `Proyek dengan ID ${id} tidak ditemukan`,
            });
        }

        res.status(200).json({
            success: true,
            messages: "Berhasil mengambil data proyek",
            data: results[0],
        });
    });
};

// POST /projects - Tambah proyek baru
const createProject = (req, res) => {
    const { title, description, image } = req.body;

    // Validasi input
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Field title wajib diisi",
        });
    }

    const query =
        "INSERT INTO projects (title, description, image) VALUES (?, ?, ?)";

    db.query(
        query,
        [title, description || null, image || null],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Gagal menambahkan proyek",
                    error: err.message,
                });
            }

            res.status(201).json({
                success: true,
                message: "Proyek berhasil ditambahkan!",
                data: {
                    id: result.insertId,
                    title,
                    description,
                    image,
                },
            });
        }
    );
};

// PUT /projects/:id - Edit proyek yang ada
const updateProject = (req, res) => {
    const { id } = req.params;
    const { title, description, image } = req.body;

    // Validasi input minimal title harus ada jika diupdate
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Field title wajib diisi untuk melakukan update",
        });
    }

    // Cek dulu apakah data dengan ID tersebut ada
    const checkQuery = "SELECT * FROM projects WHERE id = ?";

    db.query(checkQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mendeteksi proyek",
                error: err.message,
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Proyek dengan ID ${id} tidak ditemukan`,
            });
        }

        // Query untuk update data
        const updateQuery =
            "UPDATE projects SET title = ?, description = ?, image = ? WHERE id = ?";

        db.query(
            updateQuery,
            [title, description || null, image || null, id],
            (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Gagal mengupdate proyek",
                        error: err.message,
                    });
                }

                res.status(200).json({
                    success: true,
                    message: "Proyek berhasil diupdate!",
                    data: {
                        id: parseInt(id),
                        title,
                        description,
                        image,
                    },
                });
            }
        );
    });
};

// DELETE /projects/:id - Hapus proyek
const deleteProject = (req, res) => {
    const { id } = req.params;

    // Cek dulu apakah data dengan ID tersebut ada
    const checkQuery = "SELECT * FROM projects WHERE id = ?";

    db.query(checkQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mendeteksi proyek",
                error: err.message,
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Proyek dengan ID ${id} tidak ditemukan`,
            });
        }

        // Jalankan delete jika ada
        const deleteQuery = "DELETE FROM projects WHERE id = ?";

        db.query(deleteQuery, [id], (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Gagal menghapus proyek",
                    error: err.message,
                });
            }

            res.status(200).json({
                success: true,
                message: `Proyek dengan ID ${id} berhasil dihapus!`,
            });
        });
    });
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
};