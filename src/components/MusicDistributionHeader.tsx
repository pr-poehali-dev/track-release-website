import { Music, Upload, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MusicDistributionHeader = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-white">
            <Music size={32} />
            <h1 className="text-2xl font-bold">МузыкаПлюс</h1>
          </div>
          
          <nav className="mt-4 md:mt-0">
            <ul className="flex gap-6 items-center">
              <li>
                <Link to="/" className="text-white hover:text-blue-200 transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/platforms" className="text-white hover:text-blue-200 transition-colors">
                  Площадки
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white hover:text-blue-200 transition-colors">
                  Тарифы
                </Link>
              </li>
              <li>
                <Button variant="outline" className="bg-white text-purple-600 hover:bg-blue-100">
                  Войти
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default MusicDistributionHeader;
