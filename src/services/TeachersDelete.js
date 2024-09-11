import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../config/axiosConfig';

const TeachersDelete = () => {
  const { id } = useParams(); // Usar el parámetro de la ruta
  const navigate = useNavigate(); // Usar para redirigir después de eliminar

  const handleDelete = async () => {
    try {
      await axios.delete(`/teachers/${id}`); // Ajusta la ruta según tu configuración backend
      alert('Teacher deleted successfully');
      navigate('/show-teacher'); // Redirigir a la lista de profesores
    } catch (error) {
      console.error('Error deleting teacher:', error);
      alert('Failed to delete teacher');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h2 className="text-2xl font-bold mb-4">Are you sure you want to delete this teacher?</h2>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
      >
        Delete Teacher
      </button>
      <button
        onClick={() => navigate('/show-teacher')}
        className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-400"
      >
        Cancel
      </button>
    </div>
  );
};

export default TeachersDelete;
