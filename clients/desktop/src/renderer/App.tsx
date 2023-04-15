import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/App.css';
import Login from './views/Login';
import Application from './views/App';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<Application />} />
      </Routes>
    </Router>
  );
}
