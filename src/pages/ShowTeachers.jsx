import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axiosConfig';
import Popup from '../components/Popup';

const ShowTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const teachersPerPage = 8;

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) || teacher.ci?.includes(searchTerm)
  );

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = (id) => {
    setSelectedTeacherId(id);
    setIsPopupOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/teachers/${selectedTeacherId}`);
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    } finally {
      setIsPopupOpen(false);
      setSelectedTeacherId(null);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedTeacherId(null);
  };

  return (
    <div className="bg-blue-100 min-h-screen p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-4">Teacher List of University</h2>

      <div className="w-full max-w-5xl flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search by Name or CI"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm w-64"
          />
        </div>
        <div className="flex space-x-2">
          <Link to="/" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-400">
            Back
          </Link>
          <Link to="/add-teacher" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
            Add
          </Link>
        </div>
      </div>

      <div className="w-full max-w-5xl bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">CI</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentTeachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.ci}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.email}</td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs truncate">
                  {teacher.subject ? teacher.subject.name : 'N/A'}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/edit-teacher/${teacher.id}`} className="text-blue-600 hover:text-blue-900 mx-1">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(teacher.id)}
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
            className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
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
        message="Are you sure you want to delete this teacher?"
      />
    </div>
  );
};

export default ShowTeachers;
