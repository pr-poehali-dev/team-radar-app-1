import { useState } from "react";
import Icon from "@/components/ui/icon";

const departments = ["Разработка", "Продажи", "Маркетинг", "Поддержка", "HR"];

const weekData = [
  { week: "Пн", dev: 7.2, sales: 5.8, marketing: 8.1, support: 7.5, hr: 8.0 },
  { week: "Вт", dev: 6.8, sales: 6.2, marketing: 7.9, support: 7.2, hr: 7.8 },
  { week: "Ср", dev: 7.5, sales: 5.5, marketing: 8.3, support: 7.8, hr: 8.2 },
  { week: "Чт", dev: 7.1, sales: 5.9, marketing: 8.0, support: 7.4, hr: 7.9 },
  { week: "Пт", dev: 7.4, sales: 6.1, marketing: 8.2, support: 7.6, hr: 8.1 },
];

const colors = ["#3b9eff", "#ef4444", "#22c55e", "#00d4ff", "#a855f7"];

const insights = [
  {
    icon: "TrendingDown",
    color: "text-radar-red",
    bg: "bg-radar-red/10 border-radar-red/20",
    text: "В отделе продаж уровень стресса на 30% выше среднего — рекомендуем проверить нагрузку",
  },
  {
    icon: "TrendingUp",
    color: "text-radar-green",
    bg: "bg-radar-green/10 border-radar-green/20",
    text: "Команда маркетинга высоко оценивает поддержку руководства — закрепите практики",
  },
  {
    icon: "AlertCircle",
    color: "text-radar-amber",
    bg: "bg-radar-amber/10 border-radar-amber/20",
    text: "В среду у разработчиков наблюдается пик напряжения — возможно, день sync-митингов",
  },
];

const tags = ["Дедлайны", "Коллеги", "Здоровье", "Неясность задач", "Инструменты", "Поддержка", "Нагрузка"];

export default function PulsePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyDone, setSurveyDone] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const maxVal = 10;
  const chartH = 120;

  return (
    <div className="p-4 md:p-6 space-y-5 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Heatmap */}
        <div className="lg:col-span-2 metric-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Тепловая карта настроений</h2>
            <span className="tag-chip bg-secondary text-muted-foreground text-[10px] font-mono">
              Текущая неделя
            </span>
          </div>

          {/* Chart */}
          <div className="relative">
            <svg viewBox={`0 0 500 ${chartH + 30}`} className="w-full">
              {/* Grid lines */}
              {[0, 2.5, 5, 7.5, 10].map((v) => (
                <g key={v}>
                  <line
                    x1={40} y1={chartH - (v / maxVal) * chartH}
                    x2={490} y2={chartH - (v / maxVal) * chartH}
                    stroke="hsl(220 15% 18%)" strokeWidth="1"
                  />
                  <text x={32} y={chartH - (v / maxVal) * chartH + 4}
                    fill="hsl(215 15% 55%)" fontSize="9" textAnchor="end"
                  >{v}</text>
                </g>
              ))}

              {/* Lines per department */}
              {departments.map((dept, di) => {
                const key = dept.toLowerCase().replace("ь", "").slice(0, 4) as keyof typeof weekData[0];
                const points = weekData.map((d, i) => {
                  const val = (d[key] as number) ?? 7;
                  const x = 40 + (i / (weekData.length - 1)) * 450;
                  const y = chartH - (val / maxVal) * chartH;
                  return `${x},${y}`;
                });
                return (
                  <polyline
                    key={dept}
                    points={points.join(" ")}
                    fill="none"
                    stroke={colors[di]}
                    strokeWidth="2"
                    strokeOpacity="0.8"
                    strokeLinejoin="round"
                  />
                );
              })}

              {/* X labels */}
              {weekData.map((d, i) => (
                <text
                  key={d.week}
                  x={40 + (i / (weekData.length - 1)) * 450}
                  y={chartH + 18}
                  fill="hsl(215 15% 55%)"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {d.week}
                </text>
              ))}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-2">
              {departments.map((dept, i) => (
                <div key={dept} className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 rounded-full inline-block" style={{ backgroundColor: colors[i] }} />
                  <span className="text-[11px] text-muted-foreground">{dept}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="metric-card">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Sparkles" size={14} className="text-primary" />
            <h2 className="text-sm font-semibold">Инсайты Alice AI</h2>
          </div>
          <div className="space-y-2.5">
            {insights.map((ins, i) => (
              <div key={i} className={`flex items-start gap-2.5 p-2.5 rounded-lg border ${ins.bg} animate-fade-in stagger-${i + 1}`}>
                <Icon name={ins.icon} size={14} className={`${ins.color} shrink-0 mt-0.5`} />
                <p className="text-[11px] leading-relaxed text-foreground">{ins.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick survey */}
      <div className="metric-card glow-cyan">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="Zap" size={14} className="text-radar-cyan" />
            <h2 className="text-sm font-semibold">Микро-опрос · 90 секунд</h2>
          </div>
          {!surveyDone && (
            <span className="text-xs font-mono text-muted-foreground">
              {surveyStep + 1} / 3
            </span>
          )}
        </div>

        {surveyDone ? (
          <div className="flex flex-col items-center gap-2 py-4 animate-scale-in">
            <div className="w-10 h-10 rounded-full bg-radar-green/20 flex items-center justify-center">
              <Icon name="CheckCircle2" size={20} className="text-radar-green" />
            </div>
            <p className="text-sm font-medium">Спасибо! Ответы записаны</p>
            <p className="text-xs text-muted-foreground">Следующий опрос через 7 дней</p>
            <button onClick={() => { setSurveyDone(false); setSurveyStep(0); setSelectedTags([]); }}
              className="mt-2 text-xs text-primary hover:underline">
              Пройти снова
            </button>
          </div>
        ) : surveyStep === 0 ? (
          <div className="animate-fade-in">
            <p className="text-sm text-muted-foreground mb-3">Как вы оцениваете атмосферу в команде сегодня?</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <button
                  key={n}
                  onClick={() => setSurveyStep(1)}
                  className="flex-1 py-2 rounded-lg text-xs font-mono font-medium border border-border hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-150"
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-muted-foreground">Плохо</span>
              <span className="text-[10px] text-muted-foreground">Отлично</span>
            </div>
          </div>
        ) : surveyStep === 1 ? (
          <div className="animate-fade-in">
            <p className="text-sm text-muted-foreground mb-3">Что влияет на вашу работу сегодня? (выберите теги)</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs border transition-all duration-150 ${
                    selectedTags.includes(tag)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <button
              onClick={() => setSurveyStep(2)}
              className="px-4 py-2 bg-primary text-primary-foreground text-xs rounded-lg hover:bg-primary/90 transition-colors"
            >
              Далее →
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <p className="text-sm text-muted-foreground mb-3">Есть что-то важное, что хотите передать команде?</p>
            <textarea
              placeholder="Необязательно — напишите анонимно..."
              className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 resize-none h-20"
            />
            <button
              onClick={() => setSurveyDone(true)}
              className="mt-3 px-4 py-2 bg-primary text-primary-foreground text-xs rounded-lg hover:bg-primary/90 transition-colors"
            >
              Отправить
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
