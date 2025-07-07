import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Calculator, Home, BookOpen, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import HomePage from './pages/HomePage'
import InverseMatrixPage from './pages/InverseMatrixPage'
import JacobiPage from './pages/JacobiPage'
import AboutPage from './pages/AboutPage'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(true); // Default dark mode

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 dark:bg-gray-900">
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        {/* ... rest of the code */}
      </div>
    </Router>
  );
}

// Navigation.jsx (extracted from App.jsx)
function Navigation({ darkMode, setDarkMode }) {
  // ... kode sebelumnya
  
  return (
    <nav className="bg-gray-800 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">Penyelesaian Persamaan Linear</span>
            </Link>
          </div>

          {/* Tambahkan toggle dark mode */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setDarkMode(!darkMode)}
            className="text-gray-300 hover:text-white"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>

          {/* ... rest of navigation code */}
        </div>
      </div>
    </nav>
  );
}