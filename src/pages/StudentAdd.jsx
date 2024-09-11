// src/pages/StudentAdd.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';

const StudentAdd = () => {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    semester: '',
    ci: '',
    address: '',
    sis: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/students', student);
      navigate('/show-student');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Student</h2>
        <div className="grid gap-4 grid-cols-2">
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={student.age}
              onChange={handleChange}
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Semester</label>
            <input
              type="number"
              name="semester"
              value={student.semester}
              onChange={handleChange}
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CI</label>
            <input
              type="text"
              name="ci"
              value={student.ci}
              onChange={handleChange}
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={student.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SIS</label>
            <input
              type="text"
              name="sis"
              value={student.sis}
              onChange={handleChange}
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
            Add Student
          </button>
          <button
            type="button"
            onClick={() => navigate('/show-student')}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentAdd;
