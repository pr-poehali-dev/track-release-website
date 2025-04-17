import { Card, CardContent } from "@/components/ui/card";

interface Platform {
  name: string;
  icon: string;
  description: string;
}

const platforms: Platform[] = [
  { 
    name: "Spotify", 
    icon: "🎧", 
    description: "Самый популярный стриминговый сервис для музыки"
  },
  { 
    name: "Apple Music", 
    icon: "🍎", 
    description: "Музыкальный сервис от Apple с миллионами слушателей"
  },
  { 
    name: "YouTube Music", 
    icon: "▶️", 
    description: "Музыкальный стриминг от платформы YouTube"
  },
  { 
    name: "BOOM", 
    icon: "💥", 
    description: "Популярный музыкальный сервис в России" 
  },
  { 
    name: "Яндекс Музыка", 
    icon: "🎵", 
    description: "Ведущий музыкальный сервис Яндекса" 
  },
  { 
    name: "Deezer", 
    icon: "🎶", 
    description: "Популярный европейский музыкальный сервис" 
  },
  { 
    name: "TikTok", 
    icon: "📱", 
    description: "Платформа коротких видео с огромной аудиторией" 
  },
  { 
    name: "Amazon Music", 
    icon: "📦", 
    description: "Музыкальный сервис от Amazon" 
  },
  { 
    name: "VK Music", 
    icon: "💬", 
    description: "Музыкальный сервис ВКонтакте" 
  }
];

const PlatformsSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Доступные площадки</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Мы сотрудничаем с самыми популярными музыкальными платформами, 
            чтобы ваша музыка могла быть услышана во всем мире
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3 text-2xl">
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-xl">{platform.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{platform.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            И еще более 150 других музыкальных площадок по всему миру
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;
