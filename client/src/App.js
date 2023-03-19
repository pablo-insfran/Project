import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import StudentsList from './components/StudentsList';
import StudentsNew from './components/StudentsNew';
import StundentsNote from './components/StundentsNote';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginRegister />} />
          <Route path='/students' element={<StudentsList />} />
          <Route path='/students/new' element={<StudentsNew />} />
          <Route path='/students/:id' element={<StundentsNote />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
