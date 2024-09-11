// src/pages/AssignSubjects.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AssignSubjects = () => {
  const [assignment, setAssignment] = useState({
    studentID: '',
    subjects: [],
  });

  // Ejemplos de datos; estos se pueden sustituir con datos reales desde un backend o API
  const students = [
    { ID: '1', Name: 'Student 1' },
    { ID: '2', Name: 'Student 2' },
    { ID: '3', Name: 'Student 3' },
  ];

  const subjects = [
    { ID: '101', SubName: 'Math' },
    { ID: '102', SubName: 'Science' },
    { ID: '103', SubName: 'History' },
  ];

  const handleStudentChange = (e) => {
    setAssignment({
      ...assignment,
      studentID: e.target.value,
    });
  };

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    setAssignment((prev) => {
      const newSubjects = checked
        ? [...prev.subjects, value]
        : prev.subjects.filter((sub) => sub !== value);
      return { ...prev, subjects: newSubjects };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos a tu backend
    console.log('Assignment data submitted:', assignment);
  };

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold mb-6">Assign Subjects For Student</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Student</label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="studentID"
              value={assignment.studentID}
              onChange={handleStudentChange}
              required
            >
              <option value="">Select a Student</option>
              {students.map((student) => (
                <option key={student.ID} value={student.ID}>
                  {student.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Subjects</label>
            <ul className="mt-1">
              {subjects.map((subject) => (
                <li key={subject.ID} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    value={subject.ID}
                    checked={assignment.subjects.includes(subject.ID)}
                    onChange={handleSubjectChange}
                  />
                  <span className="text-gray-700">{subject.SubName}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
              Assign
            </button>
            <Link className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-400" to="/">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignSubjects;
