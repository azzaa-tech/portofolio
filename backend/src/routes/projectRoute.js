const express = require("express");

const router = express.Router();

const projectController = require("../controller/projectController");

// GET /projects - Ambil semua proyek
router.get("/projects", projectController.getAllProjects);

// GET /projects/:id - Ambil proyek berdasarkan ID
router.get("/projects/:id", projectController.getProjectById);

// POST /projects - Tambah proyek baru
router.post("/projects", projectController.createProject);

// PUT /projects/:id - Edit proyek berdasarkan ID
router.put("/projects/:id", projectController.updateProject);

// DELETE /projects/:id - Hapus proyek berdasarkan ID
router.delete("/projects/:id", projectController.deleteProject);

module.exports = router;