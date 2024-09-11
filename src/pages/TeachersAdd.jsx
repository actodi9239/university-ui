import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axiosConfig'; // Asegúrate de que la configuración de Axios esté correctamente importada

const AddTeacher = () => {
  const [teacher, setTeacher] = useState({
    name: '',    // Asegúrate de que los nombres de los campos coinciden con la base de datos
    age: '',
    address: '',
    ci: '',
    email: '',
  });

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  // Maneja los cambios en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({
      ...teacher,
      [name]: value,
    });
  };

  // Maneja la selección del sujeto
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  // Envía los datos del formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const teacherData = {
        ...teacher,
        subject: selectedSubject ? { id: selectedSubject } : null, // Solo incluir si hay un sujeto seleccionado
      };
      console.log('Teacher data submitted:', teacherData); // Log para revisar datos enviados
      await axios.post('/teachers', teacherData); // Asegúrate que la ruta está correcta
      console.log('Teacher added successfully');
      // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  // Obtener los subjects desde el backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/subjects'); // Asegúrate que la ruta está correcta
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold mb-6">Add Teachers For School</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              value={teacher.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="age"
              value={teacher.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSubject}
              onChange={handleSubjectChange}
              required
            >
              <option value="" disabled>
                Select a Subject
              </option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="address"
              value={teacher.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ci</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="ci"
              value={teacher.ci}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              value={teacher.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
                Add Teacher
              </button>
              <button
                type="reset"
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-400"
                onClick={() => setTeacher({
                  name: '',
                  age: '',
                  address: '',
                  ci: '',
                  email: '',
                })}
              >
                Reset
              </button>
            </div>
            <Link className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-400" to="/">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
