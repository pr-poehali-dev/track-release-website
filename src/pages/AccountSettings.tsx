import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, CreditCard, Bell, Shield, ArrowRight } from "lucide-react";
import MusicDistributionHeader from "@/components/MusicDistributionHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const profileFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  artistName: z.string().min(2, "Сценическое имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
});

const notificationsFormSchema = z.object({
  newReleases: z.boolean(),
  reports: z.boolean(),
  promotions: z.boolean(),
  payouts: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

const AccountSettings = () => {
  const { toast } = useToast();
  const [avatarPreview, setAvatarPreview] = useState("/placeholder.svg");

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Иван Иванов",
      artistName: "DJ Ivan",
      email: "ivan@example.com",
      bio: "Музыкант и продюсер, создаю электронную музыку с 2015 года.",
      avatarUrl: "",
    },
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      newReleases: true,
      reports: true,
      promotions: false,
      payouts: true,
    },
  });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      profileForm.setValue("avatarUrl", file.name);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log("Profile form submitted:", data);
    toast({
      title: "Профиль обновлен",
      description: "Ваш профиль успешно обновлен",
      variant: "default",
    });
  };

  const onNotificationsSubmit = (data: NotificationsFormValues) => {
    console.log("Notifications form submitted:", data);
    toast({
      title: "Настройки уведомлений обновлены",
      description: "Ваши настройки уведомлений успешно обновлены",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MusicDistributionHeader />
      <div className="flex-1 py-10 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Настройки аккаунта</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            <div className="hidden md:block">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center py-3 px-4 rounded-md bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100">
                      <User className="h-5 w-5 mr-2" />
                      <span className="font-medium">Профиль</span>
                    </div>
                    <div className="flex items-center py-3 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                      <CreditCard className="h-5 w-5 mr-2" />
                      <span>Платежи и счета</span>
                    </div>
                    <div className="flex items-center py-3 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Bell className="h-5 w-5 mr-2" />
                      <span>Уведомления</span>
                    </div>
                    <div className="flex items-center py-3 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Shield className="h-5 w-5 mr-2" />
                      <span>Безопасность</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="mb-6 md:hidden">
                  <TabsTrigger value="profile">Профиль</TabsTrigger>
                  <TabsTrigger value="notifications">Уведомления</TabsTrigger>
                  <TabsTrigger value="billing">Платежи</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                          <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="mb-4 md:mb-0">
                              <Avatar className="h-24 w-24 relative">
                                <AvatarImage src={avatarPreview} />
                                <AvatarFallback className="text-2xl">DJ</AvatarFallback>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  onChange={handleAvatarUpload}
                                />
                              </Avatar>
                              <p className="text-xs text-gray-500 mt-2 text-center">Нажмите для изменения</p>
                            </div>
                            
                            <div className="flex-1 space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                  control={profileForm.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Имя и фамилия</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Ваше имя" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={profileForm.control}
                                  name="artistName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Сценическое имя</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Ваш псевдоним" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              <FormField
                                control={profileForm.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input type="email" placeholder="email@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={profileForm.control}
                                name="bio"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>О себе</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="Расскажите о себе" 
                                        className="resize-none" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Это описание будет видно в вашем публичном профиле.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                              Сохранить изменения
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">Социальные сети</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr_120px] gap-4 items-center">
                          <div className="font-medium">Instagram</div>
                          <Input placeholder="Ваш @username" value="dj_ivan" />
                          <Button variant="outline" className="w-full">Подключить</Button>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr_120px] gap-4 items-center">
                          <div className="font-medium">YouTube</div>
                          <Input placeholder="ID канала или URL" />
                          <Button variant="outline" className="w-full">Подключить</Button>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr_120px] gap-4 items-center">
                          <div className="font-medium">SoundCloud</div>
                          <Input placeholder="Ваш профиль SoundCloud" />
                          <Button variant="outline" className="w-full">Подключить</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <Form {...notificationsForm}>
                        <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                          <h3 className="text-lg font-medium mb-4">Настройки уведомлений</h3>
                          
                          <div className="space-y-4">
                            <FormField
                              control={notificationsForm.control}
                              name="newReleases"
                              render={({ field }) => (
                                <FormItem className="flex justify-between items-center">
                                  <div>
                                    <FormLabel className="text-base">Новые релизы</FormLabel>
                                    <FormDescription>
                                      Уведомления о статусе ваших релизов
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <Separator />
                            
                            <FormField
                              control={notificationsForm.control}
                              name="reports"
                              render={({ field }) => (
                                <FormItem className="flex justify-between items-center">
                                  <div>
                                    <FormLabel className="text-base">Отчеты и аналитика</FormLabel>
                                    <FormDescription>
                                      Еженедельные и месячные отчеты по вашим релизам
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <Separator />
                            
                            <FormField
                              control={notificationsForm.control}
                              name="promotions"
                              render={({ field }) => (
                                <FormItem className="flex justify-between items-center">
                                  <div>
                                    <FormLabel className="text-base">Акции и предложения</FormLabel>
                                    <FormDescription>
                                      Специальные акции и новости сервиса
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <Separator />
                            
                            <FormField
                              control={notificationsForm.control}
                              name="payouts"
                              render={({ field }) => (
                                <FormItem className="flex justify-between items-center">
                                  <div>
                                    <FormLabel className="text-base">Выплаты</FormLabel>
                                    <FormDescription>
                                      Уведомления о поступивших выплатах
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="flex justify-end">
                            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                              Сохранить настройки
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="billing" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-medium">Способы оплаты</h3>
                        <Button>
                          Добавить карту
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-gray-100 p-2 rounded-md mr-4">
                              <CreditCard className="h-6 w-6" />
                            </div>
                            <div>
                              <div className="font-medium">Visa •••• 4242</div>
                              <div className="text-sm text-gray-500">Истекает 04/2025</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Редактировать</Button>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">История платежей</h3>
                        <div className="border rounded-lg overflow-hidden">
                          <div className="grid grid-cols-4 bg-gray-100 dark:bg-gray-800 p-3">
                            <div className="font-medium">Дата</div>
                            <div className="font-medium">Сумма</div>
                            <div className="font-medium">Статус</div>
                            <div className="font-medium">Детали</div>
                          </div>
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="grid grid-cols-4 p-3 border-t">
                              <div className="text-gray-600">{`${i}0.06.2024`}</div>
                              <div>1,500 ₽</div>
                              <div>
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
                                  Оплачено
                                </Badge>
                              </div>
                              <div>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600">
                                  Подробнее <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountSettings;