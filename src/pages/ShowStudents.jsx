// src/pages/ShowStudents.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axiosConfig';
import Popup from '../components/Popup';

const ShowStudents = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const studentsPerPage = 8;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) || student.sis?.includes(searchTerm)
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = (id) => {
    setSelectedStudentId(id);
    setIsPopupOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/students/${selectedStudentId}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    } finally {
      setIsPopupOpen(false);
      setSelectedStudentId(null);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedStudentId(null);
  };

  return (
    <div className="bg-blue-100 min-h-screen p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-4">Student List of University</h2>

      <div className="w-full max-w-5xl flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search by Name or SIS"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm w-64"
          />
        </div>
        <div className="flex space-x-2">
          <Link to="/" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-400">
            Back
          </Link>
          <Link to="/add-student" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
            Add
          </Link>
        </div>
      </div>

      <div className="w-full max-w-5xl bg-white p-4 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">SIS</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.sis}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/edit-student/${student.id}`} className="text-blue-600 hover:text-blue-900 mx-1">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(student.id)}
                    className="text-red-600 hover:text-red-900 mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this student?"
      />
    </div>
  );
};

export default ShowStudents;
