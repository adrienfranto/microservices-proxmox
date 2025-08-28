// src/components/Groupe.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8081/api/groupe";

export default function Groupe() {
  const [groupes, setGroupes] = useState([]);
  const [formData, setFormData] = useState({ id: null, nomGroup: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);

  // 🔹 Charger tous les groupes
  useEffect(() => {
    fetchGroupes();
  }, []);

  const fetchGroupes = async () => {
    try {
      const res = await axios.get(API_URL);
      setGroupes(res.data);
    } catch (error) {
      console.error("Erreur GET:", error);
    }
  };

  // 🔹 Gérer le formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Ajouter ou modifier
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${formData.id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ id: null, nomGroup: "", description: "" });
      setIsEditing(false);
      fetchGroupes();
    } catch (error) {
      console.error("Erreur POST/PUT:", error);
    }
  };

  // 🔹 Préparer modification
  const handleEdit = (g) => {
    setFormData(g);
    setIsEditing(true);
  };

  // 🔹 Supprimer
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous supprimer ce groupe ?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchGroupes();
      } catch (error) {
        console.error("Erreur DELETE:", error);
      }
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h2>📌 Gestion des Groupes</h2>

      {/* 🔹 Formulaire */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="nomGroup"
          placeholder="Nom du groupe"
          value={formData.nomGroup}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit">
          {isEditing ? "✅ Mettre à jour" : "➕ Ajouter"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setFormData({ id: null, nomGroup: "", description: "" });
            }}
            style={{ marginLeft: "10px" }}
          >
            ❌ Annuler
          </button>
        )}
      </form>

      {/* 🔹 Liste des groupes */}
      <table border="1" width="100%" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom du Groupe</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groupes.length > 0 ? (
            groupes.map((g) => (
              <tr key={g.id}>
                <td>{g.id}</td>
                <td>{g.nomGroup}</td>
                <td>{g.description}</td>
                <td>
                  <button onClick={() => handleEdit(g)}>✏️ Modifier</button>
                  <button
                    onClick={() => handleDelete(g.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    🗑️ Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" align="center">
                Aucun groupe trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
