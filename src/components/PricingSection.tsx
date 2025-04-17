import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const pricingPlans = [
  {
    name: "Базовый",
    price: "499 ₽",
    period: "за трек",
    description: "Идеально для начинающих артистов",
    features: [
      "Размещение на 50+ площадках",
      "100% выплаты с прослушиваний",
      "Базовая аналитика",
      "Срок размещения - 1 год"
    ],
    recommended: false,
    buttonText: "Выбрать план"
  },
  {
    name: "Профессиональный",
    price: "1 499 ₽",
    period: "за трек",
    description: "Для опытных музыкантов",
    features: [
      "Размещение на 150+ площадках",
      "100% выплаты с прослушиваний",
      "Продвинутая аналитика",
      "Срок размещения - бессрочно",
      "Приоритетное размещение",
      "Поддержка 24/7"
    ],
    recommended: true,
    buttonText: "Выбрать план"
  },
  {
    name: "Лейбл",
    price: "4 999 ₽",
    period: "в месяц",
    description: "Для музыкальных лейблов",
    features: [
      "Неограниченное количество треков",
      "100% выплаты с прослушиваний",
      "Премиум аналитика и отчеты",
      "Бессрочное размещение",
      "Приоритетная поддержка",
      "API для интеграции"
    ],
    recommended: false,
    buttonText: "Связаться с нами"
  }
];

const PricingSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Простые и прозрачные тарифы</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Выберите подходящий тариф для ваших музыкальных амбиций
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden ${plan.recommended ? 'border-2 border-purple-500 shadow-lg' : 'border border-gray-200 dark:border-gray-800'}`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 text-sm font-medium">
                  Рекомендуемый
                </div>
              )}
              <CardHeader className="pb-2">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-2 mb-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1 text-sm">{plan.period}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full py-5 ${plan.recommended ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                  variant={plan.recommended ? 'default' : 'outline'}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
