import LoginPage from "./pages/LoginPage/LoginPage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:idEmpresa" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
