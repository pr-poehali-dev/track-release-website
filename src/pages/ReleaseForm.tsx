import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Music, Info, Users, Globe } from "lucide-react";
import MusicDistributionHeader from "@/components/MusicDistributionHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const releaseFormSchema = z.object({
  title: z.string().min(1, "Введите название релиза"),
  artistName: z.string().min(1, "Введите имя исполнителя"),
  genre: z.string().min(1, "Выберите жанр"),
  releaseDate: z.string().min(1, "Выберите дату релиза"),
  description: z.string().optional(),
  coverArt: z.string().min(1, "Загрузите обложку"),
  trackFiles: z.array(z.string()).min(1, "Загрузите хотя бы один трек"),
  platforms: z.array(z.string()).min(1, "Выберите хотя бы одну платформу"),
});

type ReleaseFormValues = z.infer<typeof releaseFormSchema>;

const platforms = [
  { id: "spotify", name: "Spotify" },
  { id: "apple", name: "Apple Music" },
  { id: "youtube", name: "YouTube Music" },
  { id: "deezer", name: "Deezer" },
  { id: "tidal", name: "Tidal" },
  { id: "vk", name: "VK Музыка" },
  { id: "yandex", name: "Яндекс Музыка" },
  { id: "amazon", name: "Amazon Music" },
];

const ReleaseForm = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");
  const [tracks, setTracks] = useState<{ name: string; duration: string }[]>([]);
  const [coverPreview, setCoverPreview] = useState("");

  const form = useForm<ReleaseFormValues>({
    resolver: zodResolver(releaseFormSchema),
    defaultValues: {
      title: "",
      artistName: "",
      genre: "",
      releaseDate: "",
      description: "",
      coverArt: "",
      trackFiles: [],
      platforms: [],
    },
  });

  const nextTab = () => {
    if (activeTab === "info") setActiveTab("upload");
    else if (activeTab === "upload") setActiveTab("platforms");
    else if (activeTab === "platforms") submitForm();
  };

  const prevTab = () => {
    if (activeTab === "platforms") setActiveTab("upload");
    else if (activeTab === "upload") setActiveTab("info");
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("coverArt", file.name);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCoverPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTrackUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const trackNames = Array.from(files).map(file => file.name);
      form.setValue("trackFiles", trackNames);
      
      // Mock track data
      const mockTracks = Array.from(files).map(file => ({
        name: file.name,
        duration: "3:45" // Mock duration
      }));
      setTracks(mockTracks);
    }
  };

  const submitForm = () => {
    form.handleSubmit((data) => {
      console.log("Form submitted:", data);
      toast({
        title: "Релиз отправлен!",
        description: "Ваш релиз успешно отправлен на обработку",
        variant: "default",
      });
    })();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MusicDistributionHeader />
      <div className="flex-1 py-10 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Выпустить новый релиз</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Info size={18} /> Информация
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload size={18} /> Загрузка
              </TabsTrigger>
              <TabsTrigger value="platforms" className="flex items-center gap-2">
                <Globe size={18} /> Платформы
              </TabsTrigger>
            </TabsList>

            <Form {...form}>
              <TabsContent value="info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Информация о релизе</CardTitle>
                    <CardDescription>
                      Заполните основную информацию о вашем релизе
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Название релиза</FormLabel>
                          <FormControl>
                            <Input placeholder="Введите название релиза" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="artistName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Исполнитель</FormLabel>
                          <FormControl>
                            <Input placeholder="Имя исполнителя или группы" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Жанр</FormLabel>
                            <FormControl>
                              <Input placeholder="Выберите жанр" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="releaseDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Дата релиза</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Описание (необязательно)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Расскажите о своем релизе" 
                              className="resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                <div className="flex justify-end">
                  <Button type="button" onClick={nextTab}>
                    Далее
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="upload" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Загрузка файлов</CardTitle>
                    <CardDescription>
                      Загрузите обложку и треки вашего релиза
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <FormField
                          control={form.control}
                          name="coverArt"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Обложка релиза</FormLabel>
                              <FormControl>
                                <div className="space-y-4">
                                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative">
                                    <Input 
                                      type="file" 
                                      accept="image/*" 
                                      onChange={handleCoverUpload} 
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                    />
                                    <div className="py-4 flex flex-col items-center">
                                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Перетащите изображение сюда или кликните для выбора
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                        JPG, PNG или GIF, минимум 1400x1400px
                                      </p>
                                    </div>
                                  </div>
                                  {field.value && (
                                    <p className="text-sm text-green-600">
                                      Выбран файл: {field.value}
                                    </p>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div>
                        {coverPreview && (
                          <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img 
                              src={coverPreview} 
                              alt="Предпросмотр обложки" 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        )}
                        {!coverPreview && (
                          <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Music size={48} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="trackFiles"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Треки</FormLabel>
                          <FormControl>
                            <div className="space-y-4">
                              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative">
                                <Input 
                                  type="file" 
                                  accept="audio/*" 
                                  multiple 
                                  onChange={handleTrackUpload} 
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                />
                                <div className="py-4 flex flex-col items-center">
                                  <Music className="h-10 w-10 text-gray-400 mb-2" />
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Перетащите аудио файлы сюда или кликните для выбора
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                    MP3 или WAV, максимум 10 треков
                                  </p>
                                </div>
                              </div>
                              
                              {tracks.length > 0 && (
                                <div className="space-y-2">
                                  <h4 className="text-sm font-medium">Загруженные треки:</h4>
                                  {tracks.map((track, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                      <div className="flex items-center">
                                        <span className="text-gray-500 dark:text-gray-400 mr-2">{index + 1}.</span>
                                        <span className="font-medium">{track.name}</span>
                                      </div>
                                      <span className="text-gray-500 dark:text-gray-400">{track.duration}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Загрузите один или несколько треков для вашего релиза
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Назад
                  </Button>
                  <Button type="button" onClick={nextTab}>
                    Далее
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="platforms" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Выбор платформ</CardTitle>
                    <CardDescription>
                      Выберите платформы, на которых вы хотите опубликовать свой релиз
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="platforms"
                      render={() => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {platforms.map((platform) => (
                              <FormField
                                key={platform.id}
                                control={form.control}
                                name="platforms"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={platform.id}
                                      className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(platform.id)}
                                          onCheckedChange={(checked) => {
                                            const updatedPlatforms = checked
                                              ? [...field.value, platform.id]
                                              : field.value.filter(
                                                  (value) => value !== platform.id
                                                );
                                            field.onChange(updatedPlatforms);
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {platform.name}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Назад
                  </Button>
                  <Button type="button" onClick={submitForm}>
                    Отправить релиз
                  </Button>
                </div>
              </TabsContent>
            </Form>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReleaseForm;