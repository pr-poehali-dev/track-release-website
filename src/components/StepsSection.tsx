import { Upload, FileAudio, Music, Globe } from "lucide-react";

const steps = [
  {
    icon: <Upload className="h-8 w-8 text-purple-600" />,
    title: "Загрузите файл",
    description: "Загрузите вашу композицию в формате WAV или MP3"
  },
  {
    icon: <FileAudio className="h-8 w-8 text-purple-600" />,
    title: "Заполните информацию",
    description: "Добавьте название, обложку, исполнителей и другие метаданные"
  },
  {
    icon: <Globe className="h-8 w-8 text-purple-600" />,
    title: "Выберите площадки",
    description: "Отметьте, где вы хотите опубликовать свою музыку"
  }
];

const StepsSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Как это работает</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Всего три простых шага отделяют вас от миллионов слушателей по всему миру
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              <div className="mt-4 bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block p-6 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3">
              <Music className="text-purple-600" size={24} />
              <p className="text-lg font-medium">
                После проверки ваш трек появится на всех выбранных площадках в течение 24-48 часов
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
