import Icon from "@/components/ui/icon";
import { Plan } from "@/components/PricingPage";

const integrations = [
  { name: "Slack", icon: "MessageSquare", connected: true, color: "text-radar-green", premium: false },
  { name: "Telegram", icon: "Send", connected: false, color: "text-primary", premium: false },
  { name: "Jira", icon: "Trello", connected: true, color: "text-radar-blue", premium: true },
  { name: "Google Workspace", icon: "Grid3x3", connected: false, color: "text-radar-amber", premium: true },
];

interface SettingsPageProps {
  plan: Plan;
  onChangePlan: () => void;
}

export default function SettingsPage({ plan, onChangePlan }: SettingsPageProps) {
  const isPremium = plan === "premium";

  return (
    <div className="p-4 md:p-6 space-y-5 animate-fade-in max-w-2xl">

      {/* Current plan card */}
      <div className={`metric-card border ${isPremium ? "border-radar-cyan/40 bg-radar-cyan/5" : "border-primary/30 bg-primary/5"}`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Icon name={isPremium ? "Building2" : "Users"} size={16} className={isPremium ? "text-radar-cyan" : "text-primary"} />
              <h2 className="text-sm font-semibold">
                Тариф «{isPremium ? "Премиум" : "Стандарт"}»
              </h2>
              <span className={`tag-chip text-[10px] ${isPremium ? "bg-radar-cyan/15 text-radar-cyan" : "bg-primary/15 text-primary"}`}>
                Активен
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {isPremium ? "До 50 участников · все функции включены" : "До 10 участников · базовые функции"}
            </p>
          </div>
          <button
            onClick={onChangePlan}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
              ${isPremium
                ? "border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                : "bg-radar-cyan text-background hover:bg-radar-cyan/90"
              }`}
          >
            {isPremium ? (
              <><Icon name="RefreshCw" size={11} />Сменить тариф</>
            ) : (
              <><Icon name="ArrowUp" size={11} />Улучшить до Премиум</>
            )}
          </button>
        </div>

        {/* Feature comparison for standard */}
        {!isPremium && (
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-2">
            {[
              { label: "Коллаборация", available: false },
              { label: "Alice AI (расширенный)", available: false },
              { label: "Интеграции Jira/Trello", available: false },
              { label: "OKR без ограничений", available: false },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Lock" size={11} className="text-muted-foreground/50 shrink-0" />
                {f.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="metric-card">
        <h2 className="text-sm font-semibold mb-4">Профиль компании</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-background">
            К
          </div>
          <div>
            <p className="font-semibold">Команда</p>
            <p className="text-xs text-muted-foreground">
              {isPremium ? "до 50 участников" : "до 10 участников"} · Тариф {isPremium ? "Премиум" : "Стандарт"}
            </p>
          </div>
          <button className="ml-auto text-xs text-primary hover:underline">Изменить</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Название компании", value: "ООО «Командный радар»" },
            { label: "Часовой пояс", value: "Москва (UTC+3)" },
            { label: "Язык", value: "Русский" },
            { label: "Валюта", value: "RUB (₽)" },
          ].map((f) => (
            <div key={f.label} className="bg-muted/30 rounded-lg p-3 border border-border">
              <p className="text-[10px] text-muted-foreground mb-1">{f.label}</p>
              <p className="text-sm font-medium">{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="metric-card">
        <h2 className="text-sm font-semibold mb-4">Уведомления</h2>
        <div className="space-y-3">
          {[
            { label: "Еженедельный отчёт о пульсе команды", desc: "Каждый понедельник в 9:00", on: true },
            { label: "Напоминания о ритуалах", desc: "За 30 минут до начала", on: true },
            { label: "Новые предложения в банке идей", desc: "Сразу после появления", on: false },
            { label: "Инсайты Alice AI", desc: "При значительных изменениях", on: true },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border">
              <div>
                <p className="text-sm font-medium">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <div className={`w-10 h-5 rounded-full transition-colors duration-200 relative cursor-pointer ${n.on ? "bg-primary" : "bg-muted"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${n.on ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div className="metric-card">
        <h2 className="text-sm font-semibold mb-4">Интеграции</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {integrations.map((int) => {
            const locked = int.premium && !isPremium;
            return (
              <div key={int.name} className={`flex items-center gap-3 p-3 rounded-lg border bg-muted/20 ${locked ? "opacity-50" : "border-border"}`}>
                <Icon name={int.icon} size={18} className={locked ? "text-muted-foreground" : int.connected ? int.color : "text-muted-foreground"} />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium">{int.name}</p>
                    {locked && <Icon name="Lock" size={10} className="text-muted-foreground/60" />}
                  </div>
                  <p className={`text-xs ${locked ? "text-muted-foreground/60" : int.connected ? "text-radar-green" : "text-muted-foreground"}`}>
                    {locked ? "Только Премиум" : int.connected ? "Подключено" : "Не подключено"}
                  </p>
                </div>
                <button
                  disabled={locked}
                  className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                    locked
                      ? "border-border text-muted-foreground/40 cursor-not-allowed"
                      : int.connected
                        ? "border-border text-muted-foreground hover:border-radar-red/50 hover:text-radar-red"
                        : "border-primary/50 text-primary hover:bg-primary/10"
                  }`}
                >
                  {locked ? "Недоступно" : int.connected ? "Отключить" : "Подключить"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alice AI */}
      <div className={`metric-card ${isPremium ? "border-radar-cyan/20" : "border-primary/20"}`}>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Sparkles" size={14} className="text-primary" />
          <h2 className="text-sm font-semibold">Alice AI</h2>
          <span className={`tag-chip text-[10px] ${isPremium ? "bg-radar-cyan/10 text-radar-cyan" : "bg-primary/10 text-primary"}`}>
            {isPremium ? "Расширенный" : "Базовый"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          ИИ-ассистент анализирует данные вашей команды и предлагает рекомендации в реальном времени
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Анализ пульса", on: true },
            { label: "Подсказки для диаграмм", on: true },
            { label: "Прогнозы рисков", on: isPremium },
          ].map((f) => (
            <div key={f.label} className={`p-2.5 rounded-lg border text-center text-[11px] font-medium transition-colors relative ${
              f.on ? "border-primary/30 bg-primary/5 text-primary" : "border-border text-muted-foreground opacity-50"
            }`}>
              {f.label}
              {!f.on && <Icon name="Lock" size={9} className="absolute top-1.5 right-1.5 text-muted-foreground/50" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
