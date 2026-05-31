import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Plan } from "@/components/PricingPage";

interface KeyResult {
  text: string;
  progress: number;
  unit: string;
}

interface Objective {
  id: string;
  title: string;
  category: "strategic" | "wellbeing";
  owner: string;
  keyResults: KeyResult[];
  color: string;
}

const objectives: Objective[] = [
  {
    id: "o1",
    title: "Запустить новый продукт",
    category: "strategic",
    owner: "Команда продукта",
    color: "#3b9eff",
    keyResults: [
      { text: "Выпустить MVP до 30 июня", progress: 65, unit: "%" },
      { text: "Получить 100 тестовых пользователей", progress: 42, unit: "%" },
      { text: "NPS не ниже 7.0", progress: 80, unit: "%" },
    ],
  },
  {
    id: "o2",
    title: "Улучшить культуру работы",
    category: "wellbeing",
    owner: "HR + Руководство",
    color: "#22c55e",
    keyResults: [
      { text: "Снизить переработки на 20%", progress: 55, unit: "%" },
      { text: "eNPS выше 30", progress: 70, unit: "%" },
      { text: "100% команды с ментором", progress: 30, unit: "%" },
    ],
  },
  {
    id: "o3",
    title: "Масштабировать продажи",
    category: "strategic",
    owner: "Отдел продаж",
    color: "#f59e0b",
    keyResults: [
      { text: "Выручка +40% к Q3", progress: 28, unit: "%" },
      { text: "10 новых корпоративных клиентов", progress: 50, unit: "%" },
      { text: "Конверсия лидов 15%", progress: 60, unit: "%" },
    ],
  },
];

function getProgressColor(p: number) {
  if (p >= 70) return "#22c55e";
  if (p >= 40) return "#f59e0b";
  return "#ef4444";
}

export default function OKRPage({ plan }: { plan: Plan }) {
  const [filter, setFilter] = useState<"all" | "strategic" | "wellbeing">("all");
  const [expandedId, setExpandedId] = useState<string | null>("o1");

  const OKR_LIMIT = plan === "standard" ? 5 : Infinity;
  const filtered = objectives
    .filter((o) => filter === "all" || o.category === filter)
    .slice(0, OKR_LIMIT);

  const avgProgress = Math.round(
    objectives.flatMap((o) => o.keyResults).reduce((sum, kr) => sum + kr.progress, 0) /
    objectives.flatMap((o) => o.keyResults).length
  );

  return (
    <div className="p-4 md:p-6 space-y-5 animate-fade-in">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Всего целей", value: objectives.length, icon: "Target", color: "text-primary", bg: "bg-primary/10" },
          { label: "Средний прогресс", value: `${avgProgress}%`, icon: "TrendingUp", color: "text-radar-green", bg: "bg-radar-green/10" },
          { label: "До конца квартала", value: "30 дн", icon: "Clock", color: "text-radar-amber", bg: "bg-radar-amber/10" },
        ].map((m, i) => (
          <div key={m.label} className={`metric-card animate-fade-in stagger-${i + 1}`}>
            <div className={`p-2 rounded-lg ${m.bg} w-fit mb-2`}>
              <Icon name={m.icon} size={16} className={m.color} />
            </div>
            <div className={`text-xl font-bold font-mono ${m.color}`}>{m.value}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["all", "strategic", "wellbeing"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {f === "all" ? "Все цели" : f === "strategic" ? "Стратегические" : "Well-being OKR"}
          </button>
        ))}
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-border text-xs text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
          <Icon name="Plus" size={12} />
          Добавить OKR
        </button>
      </div>

      {/* OKR List */}
      <div className="space-y-3">
        {filtered.map((obj, i) => {
          const avgKR = Math.round(obj.keyResults.reduce((s, kr) => s + kr.progress, 0) / obj.keyResults.length);
          const isExpanded = expandedId === obj.id;

          return (
            <div
              key={obj.id}
              className={`metric-card animate-fade-in stagger-${i + 1} transition-all duration-200`}
            >
              <div
                className="flex items-start gap-3 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : obj.id)}
              >
                <div
                  className="w-1 rounded-full self-stretch shrink-0"
                  style={{ backgroundColor: obj.color, minHeight: 40 }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span
                        className="tag-chip text-[10px] mb-1"
                        style={{ color: obj.color, backgroundColor: obj.color + "18" }}
                      >
                        {obj.category === "strategic" ? "Стратегия" : "Well-being"}
                      </span>
                      <h3 className="text-sm font-semibold mt-1">{obj.title}</h3>
                      <p className="text-xs text-muted-foreground">{obj.owner}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <div className="text-sm font-bold font-mono" style={{ color: getProgressColor(avgKR) }}>
                          {avgKR}%
                        </div>
                        <div className="text-[10px] text-muted-foreground">прогресс</div>
                      </div>
                      <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={14} className="text-muted-foreground" />
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${avgKR}%`, backgroundColor: getProgressColor(avgKR) }}
                    />
                  </div>
                </div>
              </div>

              {/* Key Results */}
              {isExpanded && (
                <div className="mt-4 pl-4 space-y-3 animate-fade-in">
                  {obj.keyResults.map((kr, ki) => (
                    <div key={ki} className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium">{kr.text}</span>
                        <span className="text-xs font-mono font-bold" style={{ color: getProgressColor(kr.progress) }}>
                          {kr.progress}%
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${kr.progress}%`, backgroundColor: getProgressColor(kr.progress) }}
                        />
                      </div>
                    </div>
                  ))}
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <Icon name="Plus" size={12} />
                    Добавить ключевой результат
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Flow Road */}
      <div className="metric-card">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Kanban" size={14} className="text-radar-purple" />
          <h2 className="text-sm font-semibold">Дорога потока — задачи по уровню стресса</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "В работе", color: "border-primary/30 bg-primary/5", items: ["Дизайн MVP", "Найм аналитика"] },
            { label: "Под давлением", color: "border-radar-amber/30 bg-radar-amber/5", items: ["Фичи для клиента X", "Q2 отчёт"] },
            { label: "Критично", color: "border-radar-red/30 bg-radar-red/5", items: ["Исправить баги прода"] },
          ].map((col) => (
            <div key={col.label} className={`rounded-lg border p-3 ${col.color}`}>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">{col.label}</p>
              <div className="space-y-1.5">
                {col.items.map((item) => (
                  <div key={item} className="text-xs p-2 rounded-md bg-card border border-border">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}