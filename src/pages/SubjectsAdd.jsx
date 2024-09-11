// src/pages/SubjectsAdd.jsx
import React, { useState } from 'react';
import axios from '../config/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

const SubjectsAdd = () => {
  const [subject, setSubject] = useState({ name: '', groupNumber: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject({ ...subject, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Asegúrate de que la URL de Axios esté correctamente configurada
      await axios.post('/subjects', subject);
      console.log('Subject added successfully');
      navigate('/show-subjects'); // Ajusta la redirección según tu estructura
    } catch (error) {
      console.error('Error adding subject:', error);
      // Revisa aquí los detalles del error para mayor depuración
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold mb-6">Add Subject</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              name="name"
              value={subject.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Group Number</label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              name="groupNumber"
              value={subject.groupNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
              Add Subject
            </button>
            <button
              type="reset"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-400"
              onClick={() => setSubject({ name: '', groupNumber: '' })}
            >
              Reset
            </button>
            <Link to="/" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-400">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectsAdd;
