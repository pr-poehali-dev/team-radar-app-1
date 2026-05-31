import Icon from "@/components/ui/icon";
import { NavPage } from "@/pages/Index";

const pageTitles: Record<NavPage, { title: string; subtitle: string }> = {
  home: { title: "Командный радар", subtitle: "Обзор состояния команды" },
  fishbone: { title: "Рыбья кость", subtitle: "Анализ корневых причин" },
  pulse: { title: "Пульс команды", subtitle: "Еженедельные микро-опросы" },
  okr: { title: "OKR & Цели", subtitle: "Стратегические цели и результаты" },
  rituals: { title: "Ритуалы", subtitle: "Культура и регулярные практики" },
  settings: { title: "Настройки", subtitle: "Параметры команды и профиля" },
  docs: { title: "Документация", subtitle: "Гайды и лучшие практики" },
};

interface TopBarProps {
  activePage: NavPage;
}

export default function TopBar({ activePage }: TopBarProps) {
  const { title, subtitle } = pageTitles[activePage];

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-4 md:px-6 gap-4 shrink-0 z-10">
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <h1 className="text-sm font-semibold text-foreground truncate">{title}</h1>
          <span className="text-xs text-muted-foreground hidden sm:block truncate">/ {subtitle}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground">
          <Icon name="Sparkles" size={12} className="text-primary" />
          <span>Alice AI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-radar-green" />
        </div>

        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <Icon name="Bell" size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
        </button>

        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <Icon name="Search" size={16} />
        </button>
      </div>
    </header>
  );
}
