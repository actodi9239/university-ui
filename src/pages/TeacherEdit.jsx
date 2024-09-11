import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';

const TeacherEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({
    name: '',
    age: '',
    address: '',
    ci: '',
    email: '',
    subject: { id: '' }, // Asegúrate de que sea 'subject' en lugar de 'subjects'
  });
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeacher = useCallback(async () => {
    try {
      const response = await axios.get(`/teachers/${id}`);
      setTeacher(response.data || {}); // Fallback to empty object if data is null
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching teacher:', error);
      setIsLoading(false);
    }
  }, [id]);

  const fetchSubjects = useCallback(async () => {
    try {
      const response = await axios.get('/subjects');
      setSubjects(response.data || []); // Fallback to empty array if data is null
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  }, []);

  useEffect(() => {
    fetchTeacher();
    fetchSubjects();
  }, [fetchTeacher, fetchSubjects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSubjectChange = (e) => {
    const { value } = e.target;
    setTeacher({ ...teacher, subject: { id: value } }); // Ajusta según el nombre del campo correcto
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/teachers/${id}`, teacher);
      navigate('/show-teacher');
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  // Mostrar mensaje de carga mientras se obtienen los datos
  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="bg-blue-100 min-h-screen p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Teacher</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-2xl grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={teacher.name || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={teacher.age || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
          <select
            name="subject"
            value={teacher.subject?.id || ''}
            onChange={handleSubjectChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Select a Subject
            </option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name} {/* Ajusta al nombre correcto */}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={teacher.address || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">CI</label>
          <input
            type="text"
            name="ci"
            value={teacher.ci || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={teacher.email || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-between sm:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate('/show-teacher')}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherEdit;
