// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SubjectsAdd from './pages/SubjectsAdd';
import SubjectAssign from './pages/SubjectsAssign';
import ShowStudents from './pages/ShowStudents';
import ShowTeachers from './pages/ShowTeachers';
import ShowSubjects from './pages/ShowSubjects';
import AddStudents from './pages/StudentAdd';
import AddTeacher from './pages/TeachersAdd'; 
import StudentEdit from './pages/StudentEdit';
import StudentDelete from './services/StudentDelete'; 
import TeacherEdit from './pages/TeacherEdit'; 
import TeachersDelete from './services/TeachersDelete'; 

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-img-app">
    <nav className="space-x-4 mb-6 flex flex-wrap justify-center">
      <Link to="/show-student" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 m-2">Students</Link>
      <Link to="/show-teacher" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 m-2">Teachers</Link>
      <Link to="/show-subjects" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 m-2">Subjects</Link>
      {/* <Link to="/assign-subject" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 m-2">Assign Subjects</Link> */}

    </nav>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-subject" element={<SubjectsAdd />} />
        <Route path="/assign-subject" element={<SubjectAssign />} />
        <Route path="/show-student" element={<ShowStudents />} />
        <Route path="/show-teacher" element={<ShowTeachers />} />
        <Route path="/show-subjects" element={<ShowSubjects />} /> 
        <Route path="/add-student" element={<AddStudents />} />
        <Route path="/add-teacher" element={<AddTeacher />} />
        <Route path="/edit-student/:id" element={<StudentEdit />} /> 
        <Route path="/studentshow/delete/:id" element={<StudentDelete />} />
        <Route path="/edit-teacher/:id" element={<TeacherEdit />} /> 
        <Route path="/teachershow/delete/:id" element={<TeachersDelete />} /> 
      </Routes>
    </Router>
  );
};

export default App;
