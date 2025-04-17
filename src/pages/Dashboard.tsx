import { useState } from "react";
import { BarChart, RefreshCw, Calendar, Filter, CreditCard, ArrowUp, Lock, DownloadCloud } from "lucide-react";
import MusicDistributionHeader from "@/components/MusicDistributionHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// Mock data for the dashboard
const mockReleases = [
  {
    id: "1",
    title: "Летний альбом",
    coverUrl: "/placeholder.svg",
    releaseDate: "15.07.2023",
    status: "released",
    plays: 12500,
    platforms: ["spotify", "apple", "youtube"],
    revenue: 15600,
  },
  {
    id: "2",
    title: "Зимние мотивы",
    coverUrl: "/placeholder.svg",
    releaseDate: "10.12.2023",
    status: "released",
    plays: 8200,
    platforms: ["spotify", "vk", "yandex"],
    revenue: 9800,
  },
  {
    id: "3",
    title: "Новый сингл",
    coverUrl: "/placeholder.svg",
    releaseDate: "05.06.2024",
    status: "pending",
    plays: 0,
    platforms: ["spotify", "apple", "youtube", "deezer"],
    revenue: 0,
  },
];

const mockTransactions = [
  { id: "tr1", date: "15.07.2024", amount: 12500, status: "completed", description: "Выплата роялти (Spotify, Apple Music)" },
  { id: "tr2", date: "15.06.2024", amount: 8900, status: "completed", description: "Выплата роялти (Все платформы)" },
  { id: "tr3", date: "15.05.2024", amount: 7350, status: "completed", description: "Выплата роялти (Все платформы)" },
  { id: "tr4", date: "15.04.2024", amount: 6100, status: "completed", description: "Выплата роялти (Все платформы)" },
];

const platformIcons: Record<string, string> = {
  spotify: "🎧",
  apple: "🍎",
  youtube: "▶️",
  deezer: "🎵",
  tidal: "🌊",
  vk: "✌️",
  yandex: "🔍",
  amazon: "📦",
};

const Dashboard = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [period, setPeriod] = useState("month");
  const [activeTab, setActiveTab] = useState("releases");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const getStatusLabel = (status: string) => {
    if (status === "released") return "Выпущен";
    if (status === "pending") return "В обработке";
    return "Черновик";
  };

  const getStatusColor = (status: string) => {
    if (status === "released") return "bg-green-500";
    if (status === "pending") return "bg-yellow-500";
    return "bg-gray-500";
  };

  const filteredReleases = mockReleases.filter(release => {
    if (filter === "all") return true;
    return release.status === filter;
  });

  const totalBalance = 45000; // Имитация текущего баланса

  const handleWithdraw = () => {
    if (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0 || parseFloat(withdrawalAmount) > totalBalance) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректную сумму для вывода",
        variant: "destructive",
      });
      return;
    }

    setIsWithdrawing(true);
    
    // Имитация процесса вывода средств
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawalAmount("");
      
      toast({
        title: "Запрос на вывод средств отправлен!",
        description: `Сумма ${withdrawalAmount} ₽ будет зачислена на ваш счет в течение 3 рабочих дней`,
        variant: "default",
      });
    }, 2000);
  };

  const handleGenerateReport = () => {
    toast({
      title: "Отчет сформирован",
      description: "Детальный отчет по вашим доходам был отправлен на вашу электронную почту",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MusicDistributionHeader />
      <div className="flex-1 py-10 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Мои релизы</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Управляйте своими релизами и отслеживайте статистику
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[140px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Период" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Неделя</SelectItem>
                  <SelectItem value="month">Месяц</SelectItem>
                  <SelectItem value="year">Год</SelectItem>
                  <SelectItem value="all">Все время</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <RefreshCw className="h-4 w-4 mr-2" />
                Обновить данные
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="mb-6">
              <TabsTrigger value="releases">Мои релизы</TabsTrigger>
              <TabsTrigger value="earnings">Доходы</TabsTrigger>
            </TabsList>

            <TabsContent value="releases">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Общее количество прослушиваний</CardTitle>
                    <CardDescription>За все время</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{(mockReleases.reduce((acc, release) => acc + release.plays, 0)).toLocaleString()}</div>
                    <div className="text-sm text-green-600 mt-1">+1,250 за последнюю неделю</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Доход</CardTitle>
                    <CardDescription>За все время</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{(mockReleases.reduce((acc, release) => acc + release.revenue, 0)).toLocaleString()} ₽</div>
                    <div className="text-sm text-green-600 mt-1">+1,800 ₽ за последний месяц</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Всего релизов</CardTitle>
                    <CardDescription>На всех платформах</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{mockReleases.length}</div>
                    <Progress value={66} className="h-2 mt-2" />
                    <div className="text-sm text-gray-500 mt-1">2 из 3 релизов активны</div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-xl font-semibold flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-purple-500" />
                    Статистика по платформам
                  </h2>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Фильтры
                  </Button>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {["spotify", "apple", "youtube", "vk", "yandex"].map((platform) => (
                      <div key={platform} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-xl mr-2">{platformIcons[platform]}</span>
                            <span className="font-medium">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                          </div>
                          <span className="text-sm text-gray-500">{Math.floor(Math.random() * 10000).toLocaleString()} прослушиваний</span>
                        </div>
                        <Progress value={Math.random() * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Tabs defaultValue="all" className="mb-6" onValueChange={setFilter}>
                <TabsList>
                  <TabsTrigger value="all">Все релизы</TabsTrigger>
                  <TabsTrigger value="released">Выпущенные</TabsTrigger>
                  <TabsTrigger value="pending">В обработке</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReleases.map((release) => (
                  <Card key={release.id} className="overflow-hidden">
                    <div className="aspect-square">
                      <img 
                        src={release.coverUrl} 
                        alt={release.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{release.title}</CardTitle>
                        <Badge 
                          className={`${getStatusColor(release.status)} text-white`}
                        >
                          {getStatusLabel(release.status)}
                        </Badge>
                      </div>
                      <CardDescription>Релиз от {release.releaseDate}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Прослушивания</div>
                          <div className="font-semibold">{release.plays.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Доход</div>
                          <div className="font-semibold">{release.revenue.toLocaleString()} ₽</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {release.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="flex items-center gap-1">
                            <span>{platformIcons[platform]}</span>
                            <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="earnings" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Текущий баланс</CardTitle>
                    <CardDescription>Доступно для вывода</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{totalBalance.toLocaleString()} ₽</div>
                    <div className="text-sm text-green-600 mt-1">
                      <ArrowUp className="h-3 w-3 inline mr-1" />
                      +12,500 ₽ в этом месяце
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Выплачено всего</CardTitle>
                    <CardDescription>За все время</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">34,850 ₽</div>
                    <Progress value={75} className="h-2 mt-2" />
                    <div className="text-sm text-gray-500 mt-1">Последняя выплата: 15.07.2024</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Вывод средств</CardTitle>
                    <CardDescription>Минимальная сумма: 1,000 ₽</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        placeholder="Сумма" 
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap"
                        onClick={handleWithdraw}
                        disabled={isWithdrawing}
                      >
                        {isWithdrawing ? "Обработка..." : "Вывести"}
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500">Средства поступят на ваш счет в течение 3 рабочих дней</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>История выплат</CardTitle>
                        <Button variant="outline" size="sm" onClick={handleGenerateReport}>
                          <DownloadCloud className="h-4 w-4 mr-2" />
                          Отчет
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockTransactions.map((transaction) => (
                          <div 
                            key={transaction.id} 
                            className="flex justify-between items-center p-3 border rounded-lg"
                          >
                            <div>
                              <div className="font-medium">{transaction.date}</div>
                              <div className="text-sm text-gray-500">{transaction.description}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-green-600">+{transaction.amount.toLocaleString()} ₽</div>
                              <Badge variant="outline" className="text-xs">
                                {transaction.status === "completed" ? "Выполнено" : "В обработке"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <span className="text-sm text-gray-500">Показано последние 4 транзакции</span>
                      <Button variant="link" className="text-sm text-purple-600 p-0">
                        Показать все
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Платежные реквизиты</CardTitle>
                    <CardDescription>Счет для выплат</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="text-sm text-gray-500">Банк</div>
                      <div className="font-medium">Сбербанк</div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="text-sm text-gray-500">Номер карты</div>
                      <div className="font-medium flex items-center">
                        <span>•••• •••• •••• 5678</span>
                        <Lock className="h-3 w-3 ml-1 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="text-sm text-gray-500">Владелец</div>
                      <div className="font-medium">IVAN IVANOV</div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Изменить реквизиты
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Подробная аналитика доходов</CardTitle>
                  <CardDescription>По платформам за {period === "week" ? "неделю" : period === "month" ? "месяц" : period === "year" ? "год" : "все время"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {["spotify", "apple", "youtube", "vk", "yandex"].map((platform) => {
                      const revenue = Math.floor(Math.random() * 5000) + 1000;
                      const percent = Math.floor(Math.random() * 30) - 10;
                      
                      return (
                        <div key={platform} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="text-xl mr-2">{platformIcons[platform]}</span>
                              <span className="font-medium">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{revenue.toLocaleString()} ₽</div>
                              <div className={`text-xs ${percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {percent >= 0 ? '+' : ''}{percent}% по сравнению с прошлым периодом
                              </div>
                            </div>
                          </div>
                          <Progress value={(revenue / 5000) * 100} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;