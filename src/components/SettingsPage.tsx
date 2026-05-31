import Icon from "@/components/ui/icon";

const integrations = [
  { name: "Slack", icon: "MessageSquare", connected: true, color: "text-radar-green" },
  { name: "Telegram", icon: "Send", connected: false, color: "text-primary" },
  { name: "Jira", icon: "Trello", connected: true, color: "text-radar-blue" },
  { name: "Google Workspace", icon: "Grid3x3", connected: false, color: "text-radar-amber" },
];

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-6 space-y-5 animate-fade-in max-w-2xl">
      {/* Profile */}
      <div className="metric-card">
        <h2 className="text-sm font-semibold mb-4">Профиль компании</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-background">
            К
          </div>
          <div>
            <p className="font-semibold">Команда</p>
            <p className="text-xs text-muted-foreground">24 участника · Тариф Pro</p>
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
          {integrations.map((int) => (
            <div key={int.name} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
              <Icon name={int.icon} size={18} className={int.connected ? int.color : "text-muted-foreground"} />
              <div className="flex-1">
                <p className="text-sm font-medium">{int.name}</p>
                <p className={`text-xs ${int.connected ? "text-radar-green" : "text-muted-foreground"}`}>
                  {int.connected ? "Подключено" : "Не подключено"}
                </p>
              </div>
              <button className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                int.connected
                  ? "border-border text-muted-foreground hover:border-radar-red/50 hover:text-radar-red"
                  : "border-primary/50 text-primary hover:bg-primary/10"
              }`}>
                {int.connected ? "Отключить" : "Подключить"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Alice AI */}
      <div className="metric-card border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Sparkles" size={14} className="text-primary" />
          <h2 className="text-sm font-semibold">Alice AI</h2>
          <span className="tag-chip bg-primary/10 text-primary text-[10px]">Активен</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          ИИ-ассистент анализирует данные вашей команды и предлагает рекомендации в реальном времени
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Анализ пульса", on: true },
            { label: "Подсказки для диаграмм", on: true },
            { label: "Прогнозы рисков", on: false },
          ].map((f) => (
            <div key={f.label} className={`p-2.5 rounded-lg border text-center text-[11px] font-medium transition-colors ${
              f.on ? "border-primary/30 bg-primary/5 text-primary" : "border-border text-muted-foreground"
            }`}>
              {f.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
