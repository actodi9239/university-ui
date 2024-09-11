import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axiosConfig';

const ShowSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const subjectsPerPage = 8;

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('/subjects'); // Ajusta la ruta según tu backend
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastSubject = currentPage * subjectsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
  const currentSubjects = filteredSubjects.slice(indexOfFirstSubject, indexOfLastSubject);

  const totalPages = Math.ceil(filteredSubjects.length / subjectsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-blue-100 min-h-screen p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-4">Subject List of University</h2>

      <div className="w-full max-w-5xl flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search by Subject Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-sm w-64"
        /> 
        </div>
        <div className="flex space-x-2">
        <Link to="/" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-400">
            Back
          </Link>
        <Link to="/add-subject" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
          Add Subject
        </Link>
        </div>
      </div>

      <div className="w-full max-w-5xl bg-white p-4 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Group</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentSubjects.map((subject) => (
              <tr key={subject.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.groupNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/edit-subject/${subject.id}`} className="text-blue-600 hover:text-blue-900 mx-1">
                    Edit
                  </Link>
                  <Link to={`/delete-subject/${subject.id}`} className="text-red-600 hover:text-red-900 mx-1">
                    Delete
                  </Link>
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
            className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowSubjects;
