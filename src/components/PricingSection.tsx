import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, X, CreditCard, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const pricingPlans = [
  {
    id: "basic",
    name: "Базовый",
    price: 499,
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
    id: "pro",
    name: "Профессиональный",
    price: 1499,
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
    id: "label",
    name: "Лейбл",
    price: 4999,
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
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof pricingPlans[0] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handlePlanSelect = (plan: typeof pricingPlans[0]) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Имитация процесса оплаты
    setTimeout(() => {
      setIsProcessing(false);
      setIsDialogOpen(false);
      
      // Показываем уведомление об успешной оплате
      toast({
        title: "Оплата прошла успешно!",
        description: `Вы успешно оформили ${isSubscribing ? "подписку" : "покупку"} тарифа "${selectedPlan?.name}"`,
        variant: "default",
      });
      
      // Перенаправляем на страницу выпуска релиза
      if (selectedPlan?.id !== "label") {
        navigate("/release");
      }
    }, 2000);
  };

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
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id} 
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
                  <span className="text-3xl font-bold">{plan.price} ₽</span>
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
                  onClick={() => handlePlanSelect(plan)}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Диалог оплаты */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Оформление {selectedPlan?.id === "label" ? "подписки" : "покупки"}</DialogTitle>
            <DialogDescription>
              Выберите способ оплаты и введите данные карты для {selectedPlan?.id === "label" ? "оформления подписки" : "совершения покупки"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedPlan && (
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                <div>
                  <h4 className="font-medium">{selectedPlan.name}</h4>
                  <p className="text-sm text-gray-500">{selectedPlan.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{selectedPlan.price} ₽</p>
                  <p className="text-xs text-gray-500">{selectedPlan.period}</p>
                </div>
              </div>
            )}
            
            {selectedPlan?.id === "label" && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="subscribe"
                  checked={isSubscribing}
                  onChange={(e) => setIsSubscribing(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="subscribe" className="text-sm text-gray-700 dark:text-gray-300">
                  Оформить автоматическое продление подписки
                </label>
              </div>
            )}
            
            <Tabs defaultValue="card" value={paymentMethod} onValueChange={setPaymentMethod}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card" className="flex items-center gap-2">
                  <CreditCard size={16} /> Банковская карта
                </TabsTrigger>
                <TabsTrigger value="recurring" className="flex items-center gap-2">
                  <Calendar size={16} /> Автоплатеж
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="card" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Номер карты</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Срок действия</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardHolder">Имя владельца</Label>
                  <Input id="cardHolder" placeholder="IVAN IVANOV" />
                </div>
              </TabsContent>
              
              <TabsContent value="recurring" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email для счетов</Label>
                  <Input id="email" type="email" placeholder="example@mail.ru" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Номер телефона</Label>
                  <Input id="phone" placeholder="+7 (999) 123-45-67" />
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md text-sm">
                  После оплаты вы будете перенаправлены на страницу настройки автоплатежа.
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter className="flex sm:justify-between">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Отмена
            </Button>
            <Button onClick={handlePayment} disabled={isProcessing} className="bg-purple-600 hover:bg-purple-700">
              {isProcessing ? (
                <>
                  <div className="spinner mr-2"></div>
                  Обработка...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Оплатить {selectedPlan?.price} ₽
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PricingSection;