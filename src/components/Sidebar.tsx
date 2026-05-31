import Icon from "@/components/ui/icon";
import { NavPage } from "@/pages/Index";

interface NavItem {
  id: NavPage;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", icon: "LayoutDashboard", label: "Главная" },
  { id: "fishbone", icon: "GitFork", label: "Рыбья кость" },
  { id: "pulse", icon: "Activity", label: "Пульс" },
  { id: "okr", icon: "Target", label: "OKR" },
  { id: "rituals", icon: "CalendarDays", label: "Ритуалы" },
  { id: "docs", icon: "BookOpen", label: "Документы" },
];

interface SidebarProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-[72px] bg-sidebar border-r border-sidebar-border py-4 items-center gap-1 shrink-0">
      <div className="mb-4 flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
        <Icon name="Radar" size={20} className="text-primary" />
      </div>

      <nav className="flex flex-col gap-1 w-full px-2 flex-1">
        {navItems.slice(0, 6).map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`nav-item w-full ${activePage === item.id ? "active" : ""}`}
            title={item.label}
          >
            <Icon name={item.icon} size={20} />
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="flex flex-col gap-1 w-full px-2">
        <button
          onClick={() => onNavigate("pricing")}
          className={`nav-item w-full ${activePage === "pricing" ? "active" : ""}`}
          title="Тарифы"
        >
          <Icon name="CreditCard" size={20} />
          <span className="text-[10px] font-medium leading-none">Тарифы</span>
        </button>

        <button
          onClick={() => onNavigate("settings")}
          className={`nav-item w-full ${activePage === "settings" ? "active" : ""}`}
          title="Настройки"
        >
          <Icon name="Settings2" size={20} />
          <span className="text-[10px] font-medium leading-none">Настройки</span>
        </button>

        <div className="flex items-center justify-center mt-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-background">
            АИ
          </div>
        </div>
      </div>
    </aside>
  );
}