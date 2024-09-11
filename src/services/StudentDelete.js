// src/components/StudentDelete.js
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../config/axiosConfig'; // Asegúrate de importar tu configuración de axios correctamente

const StudentDelete = () => {
  const { id } = useParams(); // Obtiene el ID del estudiante desde la URL
  const navigate = useNavigate();

  useEffect(() => {
    // Función para eliminar el estudiante
    const deleteStudent = async (id) => {
      try {
        await axios.delete(`http://localhost:8080/api/students/${id}`);
        navigate('/show-student'); // Redirige a la lista de estudiantes tras la eliminación
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    };

    deleteStudent(id);
  }, [id, navigate]); // Ejecuta el efecto solo una vez cuando el componente se monta

  return null; // No muestra nada mientras elimina
};

export default StudentDelete;
