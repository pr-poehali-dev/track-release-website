import { Music, Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Music size={24} className="text-purple-500" />
              <h2 className="text-xl font-bold">МузыкаПлюс</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Ваш надежный партнер в дистрибуции музыки на все популярные стриминговые платформы
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-500 transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/platforms" className="text-gray-400 hover:text-purple-500 transition-colors">
                  Площадки
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-purple-500 transition-colors">
                  Тарифы
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-purple-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Правовые документы</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-purple-500 transition-colors">
                  Условия использования
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-purple-500 transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link to="/copyright" className="text-gray-400 hover:text-purple-500 transition-colors">
                  Авторские права
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@музыкаплюс.рф</li>
              <li>Телефон: +7 (800) 123-45-67</li>
              <li>Адрес: г. Москва, ул. Музыкальная, 42</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p>© 2023 МузыкаПлюс. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
