import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, UserPlus, Edit3, Trash2, X, Check, AlertCircle, Users } from "lucide-react";

const Etudiant = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [form, setForm] = useState({
    id: "",
    matricule: "",
    nom: "",
    prenoms: "",
    sexe: "",
    age: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = "http://localhost:8080/api/etudiant";

  // Toast notification function
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  // Fetch all students from API
  const fetchEtudiants = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      setEtudiants(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement:", err);
      addToast("Erreur lors du chargement des étudiants", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEtudiants();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ id: "", matricule: "", nom: "", prenoms: "", sexe: "", age: "" });
    setIsEditing(false);
    setShowModal(false);
  };

  const handleAdd = async () => {
    if (!form.matricule || !form.nom || !form.prenoms || !form.sexe || !form.age) {
      addToast("Veuillez remplir tous les champs", "error");
      return;
    }

    setLoading(true);
    try {
      await axios.post(apiUrl, {
        matricule: form.matricule,
        nom: form.nom,
        prenoms: form.prenoms,
        sexe: form.sexe,
        age: parseInt(form.age)
      });
      
      resetForm();
      addToast("Étudiant ajouté avec succès", "success");
      await fetchEtudiants();
    } catch (err) {
      console.error("Erreur lors de l'ajout:", err);
      addToast("Erreur lors de l'ajout de l'étudiant", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!form.matricule || !form.nom || !form.prenoms || !form.sexe || !form.age) {
      addToast("Veuillez remplir tous les champs", "error");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${apiUrl}/${form.id}`, {
        matricule: form.matricule,
        nom: form.nom,
        prenoms: form.prenoms,
        sexe: form.sexe,
        age: parseInt(form.age)
      });
      
      resetForm();
      addToast("Étudiant modifié avec succès", "success");
      await fetchEtudiants();
    } catch (err) {
      console.error("Erreur lors de la modification:", err);
      addToast("Erreur lors de la modification de l'étudiant", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/${id}`);
      
      setShowDeleteModal(false);
      setDeleteId(null);
      addToast("Étudiant supprimé avec succès", "success");
      await fetchEtudiants();
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      addToast("Erreur lors de la suppression de l'étudiant", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (etudiant) => {
    setForm({
      id: etudiant.id,
      matricule: etudiant.matricule,
      nom: etudiant.nom,
      prenoms: etudiant.prenoms,
      sexe: etudiant.sexe,
      age: etudiant.age
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const Toast = ({ toast, onRemove }) => {
    const icons = {
      success: <Check className="w-5 h-5" />,
      error: <AlertCircle className="w-5 h-5" />,
      info: <AlertCircle className="w-5 h-5" />
    };

    const colors = {
      success: "bg-blue-600 border-blue-700",
      error: "bg-red-600 border-red-700",
      info: "bg-gray-600 border-gray-700"
    };

    return (
      <div className={`${colors[toast.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 mb-2 animate-slide-in`}>
        {icons[toast.type]}
        <span className="flex-1">{toast.message}</span>
        <button onClick={() => onRemove(toast.id)} className="text-white hover:text-gray-300">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            toast={toast} 
            onRemove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} 
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Gestion des Étudiants</h1>
                  <p className="text-gray-600">Gérez votre liste d'étudiants</p>
                </div>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <UserPlus className="w-5 h-5" />
                <span>Nouvel Étudiant</span>
              </button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matricule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Étudiant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sexe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Âge
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {etudiants.map((etudiant) => (
                  <tr key={etudiant.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-mono font-semibold bg-gray-100 text-gray-800 rounded">
                        {etudiant.matricule}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {etudiant.nom}
                          </div>
                          <div className="text-sm text-gray-500">
                            {etudiant.prenoms}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        etudiant.sexe === 'M' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-pink-100 text-pink-800'
                      }`}>
                        {etudiant.sexe === 'M' ? 'Masculin' : 'Féminin'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {etudiant.age} ans
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(etudiant)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(etudiant.id)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {loading && etudiants.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-500 text-lg">Chargement...</p>
                      </div>
                    </td>
                  </tr>
                ) : etudiants.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <Users className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-gray-500 text-lg">Aucun étudiant trouvé</p>
                        <p className="text-gray-400">Commencez par ajouter votre premier étudiant</p>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {isEditing ? 'Modifier Étudiant' : 'Nouvel Étudiant'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Matricule
                </label>
                <input
                  type="text"
                  name="matricule"
                  placeholder="Ex: 1555H-F"
                  value={form.matricule}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom de famille"
                  value={form.nom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénoms
                </label>
                <input
                  type="text"
                  name="prenoms"
                  placeholder="Prénoms"
                  value={form.prenoms}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sexe
                </label>
                <select
                  name="sexe"
                  value={form.sexe}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sélectionner</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Âge
                </label>
                <input
                  type="number"
                  name="age"
                  placeholder="Âge"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
              <button
                onClick={resetForm}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={isEditing ? handleUpdate : handleAdd}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg flex items-center space-x-2 transition-colors"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Check className="w-4 h-4" />
                )}
                <span>{loading ? 'En cours...' : (isEditing ? 'Modifier' : 'Ajouter')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Confirmer la suppression
                  </h2>
                  <p className="text-gray-600">
                    Êtes-vous sûr de vouloir supprimer cet étudiant ? Cette action est irréversible.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={loading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg flex items-center space-x-2 transition-colors"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                <span>{loading ? 'Suppression...' : 'Supprimer'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Etudiant;