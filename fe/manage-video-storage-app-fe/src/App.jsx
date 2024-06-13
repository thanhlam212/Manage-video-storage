import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App
