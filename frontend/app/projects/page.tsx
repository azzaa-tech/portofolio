"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  created_at: string;
}

const API_URL = "http://localhost:3000";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/projects`);
      const data = await response.json();

      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("GAGAL MENGAMBIL DATA PROYEK:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="container">
      <section
        className="section"
        style={{ marginTop: "2rem" }}
      >
        <h2 className="section-title">Semua Project</h2>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Memuat project...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <p>Belum ada project.</p>
          </div>
        ) : (
          <div className="project-grid">
            {projects.map((project) => (
              <Link
                href={`/projects/${project.id}`}
                key={project.id}
                style={{ textDecoration: "none" }}
              >
                <div className="project-card">
                  <h3>{project.title}</h3>

                  <p>
                    {project.description
                      ? project.description.substring(0, 100) + "..."
                      : "Tidak ada deskripsi."}
                  </p>

                  <div className="card-footer">
                    <span>
                      {formatDate(project.created_at)}
                    </span>

                    <span className="view-detail">
                      Lihat Detail →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}