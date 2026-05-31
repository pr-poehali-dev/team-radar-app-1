import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Plan } from "@/components/PricingPage";

interface Cause {
  id: string;
  text: string;
  subCauses: string[];
}

interface Category {
  id: string;
  label: string;
  color: string;
  causes: Cause[];
}

const defaultCategories: Category[] = [
  {
    id: "people",
    label: "Люди",
    color: "#3b9eff",
    causes: [
      { id: "p1", text: "Перегрузка сотрудников", subCauses: ["Нет замены", "Плохое планирование"] },
      { id: "p2", text: "Нехватка компетенций", subCauses: ["Нет обучения"] },
    ],
  },
  {
    id: "process",
    label: "Процессы",
    color: "#00d4ff",
    causes: [
      { id: "pr1", text: "Нечёткие ТЗ", subCauses: ["Нет шаблонов", "Плохая коммуникация"] },
      { id: "pr2", text: "Долгие согласования", subCauses: [] },
    ],
  },
  {
    id: "tech",
    label: "Технологии",
    color: "#a855f7",
    causes: [
      { id: "t1", text: "Сбои в ПО", subCauses: ["Устаревший стек"] },
    ],
  },
  {
    id: "management",
    label: "Управление",
    color: "#f59e0b",
    causes: [
      { id: "m1", text: "Нет приоритизации", subCauses: ["Всё срочно"] },
      { id: "m2", text: "Слабый контроль", subCauses: [] },
    ],
  },
  {
    id: "environment",
    label: "Среда",
    color: "#22c55e",
    causes: [
      { id: "e1", text: "Удалённая работа", subCauses: ["Разные часовые пояса"] },
    ],
  },
  {
    id: "measurement",
    label: "Измерения",
    color: "#ef4444",
    causes: [
      { id: "ms1", text: "Нет метрик", subCauses: ["Нет KPI"] },
    ],
  },
];

const aiSuggestions = [
  "Перегрузка команды",
  "Нечёткое ТЗ",
  "Смена приоритетов",
  "Зависимость от внешних",
  "Технический долг",
  "Слабая коммуникация",
];

export default function FishbonePage({ plan }: { plan: Plan }) {
  const [problem, setProblem] = useState("Срыв сроков проекта Q2");
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newCause, setNewCause] = useState("");
  const [showAI, setShowAI] = useState(true);
  const [editingProblem, setEditingProblem] = useState(false);

  const addCause = (categoryId: string, text: string) => {
    if (!text.trim()) return;
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, causes: [...cat.causes, { id: Date.now().toString(), text, subCauses: [] }] }
          : cat
      )
    );
    setNewCause("");
  };

  const removeCause = (categoryId: string, causeId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, causes: cat.causes.filter((c) => c.id !== causeId) }
          : cat
      )
    );
  };

  const totalCauses = categories.reduce((sum, cat) => sum + cat.causes.length, 0);

  return (
    <div className="p-4 md:p-6 space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <h2 className="text-base font-semibold">Конструктор диаграммы</h2>
          <p className="text-xs text-muted-foreground">{totalCauses} причин в {categories.length} категориях</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={plan === "standard"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors
              ${plan === "standard"
                ? "border-border text-muted-foreground/40 cursor-not-allowed"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            title={plan === "standard" ? "Доступно в тарифе Премиум" : ""}
          >
            <Icon name="Users" size={12} />
            Совместно
            {plan === "standard" && <Icon name="Lock" size={10} className="ml-0.5 opacity-50" />}
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
            <Icon name="Download" size={12} />
            Экспорт PDF
          </button>
        </div>
      </div>

      {/* Problem input */}
      <div className="metric-card glow-blue">
        <div className="flex items-center gap-2 mb-1">
          <Icon name="AlertTriangle" size={14} className="text-radar-red" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Проблема (голова рыбы)</span>
        </div>
        {editingProblem ? (
          <input
            autoFocus
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onBlur={() => setEditingProblem(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingProblem(false)}
            className="w-full bg-transparent text-lg font-bold text-foreground outline-none border-b border-primary pb-1"
          />
        ) : (
          <button
            onClick={() => setEditingProblem(true)}
            className="text-lg font-bold text-foreground hover:text-primary transition-colors text-left"
          >
            {problem}
            <Icon name="Pencil" size={14} className="inline ml-2 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* AI suggestions */}
      {showAI && (
        <div className="metric-card border-primary/30 animate-scale-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary">Alice AI — предлагает причины</span>
            </div>
            <button onClick={() => setShowAI(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="X" size={14} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => selectedCategory && addCause(selectedCategory, s)}
                className="px-2.5 py-1 rounded-lg border border-primary/30 bg-primary/5 text-xs text-primary hover:bg-primary/15 transition-colors"
              >
                + {s}
              </button>
            ))}
          </div>
          {!selectedCategory && (
            <p className="text-[11px] text-muted-foreground mt-2">
              Выберите категорию ниже, чтобы добавить подсказку
            </p>
          )}
        </div>
      )}

      {/* Fishbone SVG diagram */}
      <div className="metric-card overflow-x-auto">
        <FishboneSVG problem={problem} categories={categories} />
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((cat, i) => (
          <div
            key={cat.id}
            className={`metric-card cursor-pointer transition-all duration-200 animate-fade-in stagger-${Math.min(i + 1, 6)} ${selectedCategory === cat.id ? "border-primary/50 bg-primary/5" : "hover:border-border/80"}`}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-sm font-semibold">{cat.label}</span>
              </div>
              <span className="tag-chip text-muted-foreground bg-secondary text-[10px]">
                {cat.causes.length}
              </span>
            </div>

            <div className="space-y-1.5">
              {cat.causes.map((cause) => (
                <div key={cause.id} className="flex items-start gap-2 group">
                  <div className="bone-node flex-1 text-xs">{cause.text}</div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeCause(cat.id, cause.id); }}
                    className="opacity-0 group-hover:opacity-100 mt-2 text-muted-foreground hover:text-radar-red transition-all"
                  >
                    <Icon name="X" size={10} />
                  </button>
                </div>
              ))}
            </div>

            {selectedCategory === cat.id && (
              <div className="mt-3 flex gap-2 animate-scale-in">
                <input
                  value={newCause}
                  onChange={(e) => setNewCause(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCause(cat.id, newCause)}
                  placeholder="Новая причина..."
                  className="flex-1 bg-muted/50 border border-border rounded-lg px-3 py-1.5 text-xs outline-none focus:border-primary/50"
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
                <button
                  onClick={(e) => { e.stopPropagation(); addCause(cat.id, newCause); }}
                  className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs hover:bg-primary/90 transition-colors"
                >
                  <Icon name="Plus" size={12} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 5 Whys panel */}
      <div className="metric-card">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="HelpCircle" size={14} className="text-radar-purple" />
          <span className="text-sm font-semibold">Техника «5 почему»</span>
          <span className="tag-chip bg-radar-purple/10 text-radar-purple text-[10px]">Alice AI</span>
        </div>
        <div className="space-y-2">
          {[
            { q: "Почему сорвались сроки?", a: "Перегрузка сотрудников" },
            { q: "Почему перегрузка?", a: "Нет резервных ресурсов" },
            { q: "Почему нет резервов?", a: "Бюджет не предусматривал" },
            { q: "Почему бюджет не учёл?", a: "Нечёткие требования на старте" },
            { q: "Почему нечёткие требования?", a: "★ Корневая причина: отсутствие шаблонов ТЗ" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-radar-purple/10 text-radar-purple text-[10px] font-mono font-bold shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{item.q}</p>
                <p className={`text-xs font-medium mt-0.5 ${i === 4 ? "text-radar-purple" : "text-foreground"}`}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FishboneSVG({ problem, categories }: { problem: string; categories: Category[] }) {
  const W = 700;
  const H = 300;
  const spineY = H / 2;
  const headX = W - 60;
  const tailX = 60;

  const topCats = categories.slice(0, 3);
  const botCats = categories.slice(3, 6);

  const topPositions = [0.25, 0.5, 0.72];
  const botPositions = [0.25, 0.5, 0.72];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 400 }}>
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="hsl(210 100% 56%)" />
        </marker>
      </defs>

      {/* Spine */}
      <line
        x1={tailX} y1={spineY}
        x2={headX} y2={spineY}
        stroke="hsl(210 100% 56%)"
        strokeWidth="2.5"
        markerEnd="url(#arrow)"
        strokeDasharray="0"
        className="animate-draw"
      />

      {/* Head */}
      <rect x={headX - 2} y={spineY - 28} width={86} height={56} rx="8"
        fill="hsl(0 72% 51% / 0.15)" stroke="hsl(0 72% 51%)" strokeWidth="1.5" />
      <foreignObject x={headX} y={spineY - 22} width={80} height={44}>
        <div className="text-[9px] font-semibold text-center leading-tight" style={{ color: "#ef4444" }}>
          {problem.length > 22 ? problem.slice(0, 22) + "…" : problem}
        </div>
      </foreignObject>

      {/* Top bones */}
      {topCats.map((cat, i) => {
        const bx = tailX + (headX - tailX) * topPositions[i];
        const by = spineY - 80;
        return (
          <g key={cat.id}>
            <line x1={bx} y1={by} x2={bx} y2={spineY}
              stroke={cat.color} strokeWidth="1.5" strokeOpacity="0.7" />
            {cat.causes.slice(0, 2).map((cause, j) => {
              const cx = bx + (j % 2 === 0 ? -40 : 40);
              return (
                <g key={cause.id}>
                  <line x1={cx} y1={by - 20 - j * 18} x2={bx} y2={by - 10}
                    stroke={cat.color} strokeWidth="1" strokeOpacity="0.4" />
                  <foreignObject x={cx - 35} y={by - 30 - j * 18} width={70} height={18}>
                    <div className="text-[8px] text-center" style={{ color: cat.color }}>
                      {cause.text.length > 14 ? cause.text.slice(0, 14) + "…" : cause.text}
                    </div>
                  </foreignObject>
                </g>
              );
            })}
            <foreignObject x={bx - 28} y={by - 44} width={56} height={20}>
              <div className="text-[9px] font-bold text-center rounded px-1"
                style={{ color: cat.color, background: cat.color + "20" }}>
                {cat.label}
              </div>
            </foreignObject>
          </g>
        );
      })}

      {/* Bottom bones */}
      {botCats.map((cat, i) => {
        const bx = tailX + (headX - tailX) * botPositions[i];
        const by = spineY + 80;
        return (
          <g key={cat.id}>
            <line x1={bx} y1={spineY} x2={bx} y2={by}
              stroke={cat.color} strokeWidth="1.5" strokeOpacity="0.7" />
            {cat.causes.slice(0, 2).map((cause, j) => {
              const cx = bx + (j % 2 === 0 ? -40 : 40);
              return (
                <g key={cause.id}>
                  <line x1={cx} y1={by + 10 + j * 18} x2={bx} y2={by + 5}
                    stroke={cat.color} strokeWidth="1" strokeOpacity="0.4" />
                  <foreignObject x={cx - 35} y={by + 12 + j * 18} width={70} height={18}>
                    <div className="text-[8px] text-center" style={{ color: cat.color }}>
                      {cause.text.length > 14 ? cause.text.slice(0, 14) + "…" : cause.text}
                    </div>
                  </foreignObject>
                </g>
              );
            })}
            <foreignObject x={bx - 28} y={by + 24} width={56} height={20}>
              <div className="text-[9px] font-bold text-center rounded px-1"
                style={{ color: cat.color, background: cat.color + "20" }}>
                {cat.label}
              </div>
            </foreignObject>
          </g>
        );
      })}
    </svg>
  );
}