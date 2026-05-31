import { NavPage } from "@/pages/Index";
import Icon from "@/components/ui/icon";
import { Plan } from "@/components/PricingPage";

interface DashboardProps {
  onNavigate: (page: NavPage) => void;
  plan: Plan;
}

const metrics = [
  {
    label: "Уровень стресса",
    value: "34%",
    change: "-8%",
    trend: "down",
    color: "text-radar-green",
    bg: "bg-radar-green/10",
    icon: "HeartPulse",
  },
  {
    label: "Выполнение OKR",
    value: "72%",
    change: "+5%",
    trend: "up",
    color: "text-primary",
    bg: "bg-primary/10",
    icon: "Target",
  },
  {
    label: "Активных диаграмм",
    value: "4",
    change: "+1",
    trend: "up",
    color: "text-radar-cyan",
    bg: "bg-radar-cyan/10",
    icon: "GitFork",
  },
  {
    label: "Пульс команды",
    value: "8.1",
    change: "+0.3",
    trend: "up",
    color: "text-radar-amber",
    bg: "bg-radar-amber/10",
    icon: "Activity",
  },
];

const recentDiagrams = [
  { title: "Срыв сроков Q2", causes: 7, status: "active", updated: "2 ч назад" },
  { title: "Текучесть кадров", causes: 5, status: "review", updated: "Вчера" },
  { title: "Снижение продаж", causes: 9, status: "resolved", updated: "3 дня назад" },
];

const teamPulse = [
  { dept: "Разработка", score: 7.4, stress: 42, color: "bg-primary" },
  { dept: "Продажи", score: 6.1, stress: 68, color: "bg-radar-red" },
  { dept: "Маркетинг", score: 8.2, stress: 28, color: "bg-radar-green" },
  { dept: "Поддержка", score: 7.8, stress: 35, color: "bg-radar-cyan" },
];

const statusColors: Record<string, string> = {
  active: "text-primary bg-primary/10",
  review: "text-radar-amber bg-radar-amber/10",
  resolved: "text-radar-green bg-radar-green/10",
};

const statusLabels: Record<string, string> = {
  active: "Активна",
  review: "На ревью",
  resolved: "Закрыта",
};

export default function Dashboard({ onNavigate, plan }: DashboardProps) {
  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      {/* Plan info banner for standard */}
      {plan === "standard" && (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/20 animate-fade-in">
          <Icon name="Users" size={14} className="text-primary shrink-0" />
          <p className="text-xs text-muted-foreground flex-1">
            Тариф <span className="text-primary font-medium">Стандарт</span> · до 10 участников · коллаборация и Alice AI недоступны
          </p>
          <button
            onClick={() => onNavigate("settings")}
            className="text-xs text-primary font-medium hover:underline shrink-0"
          >
            Улучшить →
          </button>
        </div>
      )}

      {/* Metrics row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m, i) => (
          <div key={m.label} className={`metric-card animate-fade-in stagger-${i + 1}`}>
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${m.bg}`}>
                <Icon name={m.icon} size={16} className={m.color} />
              </div>
              <span className={`tag-chip text-[10px] ${m.trend === "up" ? "text-radar-green bg-radar-green/10" : "text-radar-red bg-radar-red/10"}`}>
                {m.change}
              </span>
            </div>
            <div className={`text-2xl font-bold font-mono ${m.color}`}>{m.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent diagrams */}
        <div className="lg:col-span-2 metric-card animate-fade-in stagger-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Активные диаграммы</h2>
            <button
              onClick={() => onNavigate("fishbone")}
              className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              <Icon name="Plus" size={12} />
              Новая
            </button>
          </div>

          <div className="space-y-2">
            {recentDiagrams.map((d, i) => (
              <div
                key={d.title}
                className={`flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/30 cursor-pointer transition-all duration-200 animate-fade-in stagger-${i + 2}`}
                onClick={() => onNavigate("fishbone")}
              >
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Icon name="GitFork" size={14} className="text-muted-foreground rotate-90" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{d.title}</div>
                  <div className="text-xs text-muted-foreground">{d.causes} причин · {d.updated}</div>
                </div>
                <span className={`tag-chip ${statusColors[d.status]}`}>
                  {statusLabels[d.status]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Team pulse */}
        <div className="metric-card animate-fade-in stagger-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Пульс по отделам</h2>
            <button
              onClick={() => onNavigate("pulse")}
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              Детали →
            </button>
          </div>
          <div className="space-y-3">
            {teamPulse.map((t) => (
              <div key={t.dept}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{t.dept}</span>
                  <span className="text-xs font-mono text-muted-foreground">{t.score}/10</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${t.color} transition-all duration-700`}
                    style={{ width: `${t.score * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/20">
              <Icon name="Sparkles" size={12} className="text-primary mt-0.5 shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                В отделе продаж уровень стресса на <span className="text-radar-red font-medium">30% выше</span> среднего — проверьте нагрузку
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in stagger-5">
        {[
          { icon: "GitFork", label: "Новая диаграмма", page: "fishbone" as NavPage, color: "text-primary" },
          { icon: "Activity", label: "Запустить пульс", page: "pulse" as NavPage, color: "text-radar-cyan" },
          { icon: "Target", label: "Добавить OKR", page: "okr" as NavPage, color: "text-radar-amber" },
          { icon: "CalendarDays", label: "Создать ритуал", page: "rituals" as NavPage, color: "text-radar-purple" },
        ].map((action) => (
          <button
            key={action.label}
            onClick={() => onNavigate(action.page)}
            className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 text-left"
          >
            <Icon name={action.icon} size={18} className={action.color} />
            <span className="text-xs font-medium text-foreground">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}