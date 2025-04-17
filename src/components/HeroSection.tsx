import { ArrowRight, Globe, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-purple-600/10 to-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Выпускайте свою музыку <span className="text-purple-600">на все площадки</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Простой и надежный сервис для дистрибуции музыки на популярные стриминговые платформы. Начните свою карьеру уже сегодня!
            </p>
            
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <Globe className="text-purple-500" size={20} />
                <span>Доступ к более чем 150 стриминговым сервисам</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="text-purple-500" size={20} />
                <span>Быстрая дистрибуция за 24-48 часов</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-purple-500" size={20} />
                <span>100% защита ваших прав и авторства</span>
              </div>
            </div>
            
            <div className="pt-4 flex items-center gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-6">
                Выпустить трек
                <ArrowRight className="ml-2" size={16} />
              </Button>
              <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50">
                Узнать больше
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-gradient-to-tr from-purple-500 to-blue-500 rounded-2xl p-1">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                  <img 
                    src="/placeholder.svg" 
                    alt="Интерфейс выпуска трека" 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium">Интуитивно понятный процесс</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Загрузите свой трек, добавьте информацию и выберите площадки для дистрибуции всего за несколько минут
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg">
                🎵
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
