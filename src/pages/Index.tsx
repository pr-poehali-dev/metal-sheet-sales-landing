import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const stockData = [
  { thickness: '0.3мм', stock: 1026, atCutter: 0 },
  { thickness: '0.4мм', stock: 3080, atCutter: 0 },
  { thickness: '0.5мм', stock: 24177, atCutter: 0 },
  { thickness: '0.6мм', stock: 73522, atCutter: 0 },
  { thickness: '0.7мм', stock: 35920, atCutter: 0 },
  { thickness: '1мм', stock: 50328, atCutter: 0 },
  { thickness: '1.35мм', stock: 25222, atCutter: 0 },
  { thickness: '1.8мм', stock: 4540, atCutter: 0 },
  { thickness: '2мм', stock: 77084, atCutter: 558 },
  { thickness: '2мм узкий', stock: 918, atCutter: 0 },
  { thickness: '2.5мм узкий', stock: 634, atCutter: 0 },
  { thickness: '2.5мм', stock: 0, atCutter: 398 },
  { thickness: '2.8мм', stock: 40958, atCutter: 0 },
];

const applications = [
  {
    title: 'Почтовые ящики',
    description: 'Металл толщиной 0.5-1мм идеален для производства почтовых ящиков',
    icon: 'Mail'
  },
  {
    title: 'Кровельные работы',
    description: 'Листы 0.4-0.7мм используются для кровли и фасадных работ',
    icon: 'Home'
  },
  {
    title: 'Промышленные изделия',
    description: 'Толщины 1-2.8мм применяются в производстве оборудования и конструкций',
    icon: 'Factory'
  },
  {
    title: 'Изделия из листа',
    description: 'Любая толщина для изготовления деталей, корпусов и элементов',
    icon: 'Package'
  }
];

export default function Index() {
  const [weight, setWeight] = useState('');
  const [pricePerKg, setPricePerKg] = useState('50');
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const { toast } = useToast();

  const calculatePrice = () => {
    const w = parseFloat(weight);
    const p = parseFloat(pricePerKg);
    if (w > 0 && p > 0) {
      setCalculatedPrice(w * p);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) {
      toast({
        title: 'Ошибка',
        description: 'Заполните имя и телефон',
        variant: 'destructive'
      });
      return;
    }
    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время'
    });
    setFormName('');
    setFormPhone('');
    setFormMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Boxes" size={28} className="text-accent" />
            <h1 className="text-xl font-bold">МЕТАЛЛКОМ</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#catalog" className="text-sm hover:text-accent transition-colors">Каталог</a>
            <a href="#calculator" className="text-sm hover:text-accent transition-colors">Калькулятор</a>
            <a href="#applications" className="text-sm hover:text-accent transition-colors">Применение</a>
            <a href="#contacts" className="text-sm hover:text-accent transition-colors">Контакты</a>
          </nav>
          <Button>
            <Icon name="Phone" size={16} className="mr-2" />
            Позвонить
          </Button>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Badge className="mb-4" variant="secondary">
            <Icon name="Package" size={14} className="mr-1" />
            Более 400 тонн на складе
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Листовой металлопрокат<br />от производителя
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Прямые поставки листового металла толщиной от 0.3 до 2.8мм. 
            Быстрая доставка и самовывоз. Актуальные остатки в режиме онлайн.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="gap-2">
              <Icon name="FileText" size={18} />
              Прайс-лист
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Icon name="Calculator" size={18} />
              Рассчитать стоимость
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Каталог продукции</h3>
            <p className="text-muted-foreground">Актуальные остатки металлопроката на складе</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {stockData.map((item, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{item.thickness}</CardTitle>
                    <Icon name="Layers" size={20} className="text-accent" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">На складе:</span>
                      <span className="font-semibold">{item.stock.toLocaleString()} кг</span>
                    </div>
                    {item.atCutter > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">За гильотиной:</span>
                        <span className="font-semibold text-accent">{item.atCutter} кг</span>
                      </div>
                    )}
                    <Badge variant={item.stock > 10000 ? 'default' : item.stock > 0 ? 'secondary' : 'outline'} className="w-full justify-center mt-2">
                      {item.stock > 10000 ? 'В наличии' : item.stock > 0 ? 'Ограничено' : 'Под заказ'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="Calculator" size={24} className="text-accent" />
                Калькулятор расчёта стоимости
              </CardTitle>
              <CardDescription>Введите вес металла и цену за килограмм</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="weight">Вес (кг)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Введите вес"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Цена за кг (₽)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Введите цену"
                    value={pricePerKg}
                    onChange={(e) => setPricePerKg(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={calculatePrice} className="w-full mb-6" size="lg">
                <Icon name="Calculator" size={18} className="mr-2" />
                Рассчитать
              </Button>
              {calculatedPrice > 0 && (
                <div className="bg-accent/10 border border-accent rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Итоговая стоимость:</p>
                  <p className="text-4xl font-bold text-accent">{calculatedPrice.toLocaleString()} ₽</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-accent/5 border-y border-accent/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl flex items-center justify-center gap-2">
                <Icon name="Send" size={28} className="text-accent" />
                Быстрая заявка
              </CardTitle>
              <CardDescription className="text-base">Оставьте заявку и мы свяжемся с вами для уточнения деталей</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      placeholder="Ваше имя"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Комментарий</Label>
                  <Textarea
                    id="message"
                    placeholder="Укажите толщину металла, вес и другие пожелания"
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2">
                  <Icon name="Send" size={18} />
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="applications" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Области применения</h3>
            <p className="text-muted-foreground">Где используется листовой металлопрокат</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {applications.map((app, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name={app.icon} size={32} className="text-accent" />
                  </div>
                  <CardTitle className="text-lg">{app.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{app.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Tabs defaultValue="delivery" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="delivery">
                <Icon name="Truck" size={16} className="mr-2" />
                Доставка
              </TabsTrigger>
              <TabsTrigger value="pickup">
                <Icon name="MapPin" size={16} className="mr-2" />
                Самовывоз
              </TabsTrigger>
            </TabsList>
            <TabsContent value="delivery" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Условия доставки</CardTitle>
                  <CardDescription>Привозим металл по всему региону</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5" />
                    <div>
                      <p className="font-semibold">Быстрая доставка</p>
                      <p className="text-sm text-muted-foreground">Доставка в течение 1-2 рабочих дней</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5" />
                    <div>
                      <p className="font-semibold">Бесплатно от 1000 кг</p>
                      <p className="text-sm text-muted-foreground">При заказе от 1 тонны доставка бесплатная</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5" />
                    <div>
                      <p className="font-semibold">Разгрузка на месте</p>
                      <p className="text-sm text-muted-foreground">Помощь в разгрузке металла</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pickup" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Самовывоз со склада</CardTitle>
                  <CardDescription>Забирайте заказ в удобное время</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={20} className="text-accent mt-0.5" />
                    <div>
                      <p className="font-semibold">Режим работы</p>
                      <p className="text-sm text-muted-foreground">Пн-Пт: 8:00 - 18:00, Сб: 9:00 - 15:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={20} className="text-accent mt-0.5" />
                    <div>
                      <p className="font-semibold">Адрес склада</p>
                      <p className="text-sm text-muted-foreground">г. Москва, ул. Промышленная, д. 15</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Car" size={20} className="text-accent mt-0.5" />
                    <div>
                      <p className="font-semibold">Удобный подъезд</p>
                      <p className="text-sm text-muted-foreground">Парковка и погрузка для любого транспорта</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h3 className="text-3xl font-bold mb-6">Свяжитесь с нами</h3>
          <p className="text-lg mb-8 opacity-90">
            Готовы ответить на все вопросы и оформить заказ
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center gap-2">
              <Icon name="Phone" size={24} />
              <p className="font-semibold mx-[1px] px-[3px] text-yellow-800">+7 (495) 123-45-67</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon name="Mail" size={24} />
              <p className="font-semibold">info@metallprokat.ru</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon name="Clock" size={24} />
              <p className="font-semibold">Пн-Пт: 8:00 - 18:00</p>
            </div>
          </div>
          <Button size="lg" variant="secondary" className="gap-2">
            <Icon name="MessageCircle" size={18} />
            Написать в Telegram
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 МЕТАЛЛКОМ. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}