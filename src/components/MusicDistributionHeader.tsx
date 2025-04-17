import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const MusicDistributionHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo-b.svg" alt="Logo" className="h-10 w-auto" />
              <span className="ml-2 font-bold text-xl">МузДистрибуция</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
              Главная
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
              Мои релизы
            </Link>
            <Link to="/settings" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
              Аккаунт
            </Link>
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link to="/release">Выпустить релиз</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </Link>
            <Link 
              to="/dashboard" 
              className="block text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Мои релизы
            </Link>
            <Link 
              to="/settings" 
              className="block text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Аккаунт
            </Link>
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <Link to="/release" onClick={() => setIsMenuOpen(false)}>Выпустить релиз</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default MusicDistributionHeader;