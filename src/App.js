import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  // Cambiar entre light y dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Función para cambiar el idioma
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className={`transition-colors duration-500 ${darkMode ? 'bg-blue-900' : 'bg-white'} shadow-md`}>
      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1 lg:px-8">
        {/* Logo */}
        <div className="flex items-center lg:flex-1">
          <a href="#" className="p-1.5">
            <span className="sr-only">Your Company</span>
            <img 
              alt="Logo" 
              src="https://scontent.fvvi1-2.fna.fbcdn.net/v/t39.30808-6/347614033_1360768634481305_1203117560956859345_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=5RXoap60EwcQ7kNvgElRyRn&_nc_ht=scontent.fvvi1-2.fna&oh=00_AYD_xsBkeek102nKjdbSnFm62C1DYM9VCaWJIRyHlpgMhQ&oe=66E78ECA" 
              className="h-16 w-16 rounded-full object-cover" 
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`-m-2 inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'text-white' : 'text-blue-800'}`}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex lg:gap-x-6">
          <Link to="/show-student" className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-blue-800'} hover:text-blue-600 transition duration-300 no-underline`}>
            {t('Students')}
          </Link>
          <Link to="/show-teacher" className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-blue-800'} hover:text-blue-600 transition duration-300 no-underline`}>
            {t('Teachers')}
          </Link>
          <Link to="/show-subjects" className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-blue-800'} hover:text-blue-600 transition duration-300 no-underline`}>
            {t('Subjects')}
          </Link>
        </div>

        {/* Language and Dark Mode Selector */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
          <button onClick={() => changeLanguage('es')} className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-blue-800'} hover:text-indigo-600 transition duration-300`}>
            ES
          </button>
          <button onClick={() => changeLanguage('en')} className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-blue-800'} hover:text-indigo-600 transition duration-300`}>
            EN
          </button>

          {/* Toggle Button for Dark Mode */}
          <div className="flex items-center">
            <label htmlFor="toggle" className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                id="toggle"
                className="sr-only"
                onChange={() => setDarkMode(!darkMode)}
                checked={darkMode}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-600 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer">
                <span className="dot absolute w-4 h-4 bg-white rounded-full shadow left-1 top-1 dark:translate-x-5 transform transition-transform"></span>
              </div>
              <span className={`ml-3 text-sm font-medium ${darkMode ? 'text-white' : 'text-blue-800'}`}>
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
            </label>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-50 dark:bg-gray-800 shadow-md">
          <div className="space-y-2 px-4 py-3">
            <Link to="/show-student" className="block text-lg font-semibold text-blue-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-300 no-underline">
              {t('Students')}
            </Link>
            <Link to="/show-teacher" className="block text-lg font-semibold text-blue-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-300 no-underline">
              {t('Teachers')}
            </Link>
            <Link to="/show-subjects" className="block text-lg font-semibold text-blue-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-300 no-underline">
              {t('Subjects')}
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section (Imagen grande) */}
      <div className="mt-4">
        <img 
          alt="UMSS" 
          src="https://i.postimg.cc/B68y447v/Screenshot-2024-09-11-154242.png" 
          className="w-full h-[85vh] object-cover rounded-lg shadow-lg" 
        />
      </div>
    </header>
  );
};

// Rutas de la App
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
