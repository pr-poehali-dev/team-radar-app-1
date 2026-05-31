import { useState } from "react";
import Icon from "@/components/ui/icon";

const docs = [
  {
    category: "Рыбья кость",
    icon: "GitFork",
    color: "text-primary",
    bg: "bg-primary/10",
    articles: [
      { title: "Как создать диаграмму за 3 шага", time: "3 мин", new: true },
      { title: "Техника 5 почему: полное руководство", time: "7 мин", new: false },
      { title: "Совместное редактирование в команде", time: "4 мин", new: false },
    ],
  },
  {
    category: "Пульс команды",
    icon: "Activity",
    color: "text-radar-cyan",
    bg: "bg-radar-cyan/10",
    articles: [
      { title: "Настройка микро-опросов", time: "5 мин", new: false },
      { title: "Интерпретация тепловой карты", time: "6 мин", new: true },
    ],
  },
  {
    category: "OKR",
    icon: "Target",
    color: "text-radar-amber",
    bg: "bg-radar-amber/10",
    articles: [
      { title: "OKR для малого бизнеса: старт", time: "8 мин", new: false },
      { title: "Well-being OKR: что это и зачем", time: "5 мин", new: false },
      { title: "Визуализация «Дорога потока»", time: "4 мин", new: true },
    ],
  },
  {
    category: "Практики лидера",
    icon: "Award",
    color: "text-radar-purple",
    bg: "bg-radar-purple/10",
    articles: [
      { title: "Дневник управленческих решений", time: "6 мин", new: false },
      { title: "Когнитивные искажения в управлении", time: "10 мин", new: false },
    ],
  },
];

export default function DocsPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>("Рыбья кость");

  const filtered = docs
    .map((d) => ({
      ...d,
      articles: d.articles.filter((a) =>
        !search || a.title.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((d) => d.articles.length > 0);

  return (
    <div className="p-4 md:p-6 space-y-5 animate-fade-in max-w-2xl">
      {/* Search */}
      <div className="relative">
        <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по документации..."
          className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary/50 placeholder:text-muted-foreground transition-colors"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Статей", value: docs.flatMap(d => d.articles).length, icon: "FileText", color: "text-primary" },
          { label: "Новых", value: docs.flatMap(d => d.articles).filter(a => a.new).length, icon: "Sparkles", color: "text-radar-green" },
          { label: "Категорий", value: docs.length, icon: "FolderOpen", color: "text-radar-purple" },
        ].map((s) => (
          <div key={s.label} className="metric-card text-center">
            <Icon name={s.icon} size={16} className={`${s.color} mx-auto mb-1`} />
            <div className={`text-lg font-bold font-mono ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Doc sections */}
      <div className="space-y-3">
        {filtered.map((section) => (
          <div key={section.category} className="metric-card">
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() => setExpanded(expanded === section.category ? null : section.category)}
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg ${section.bg}`}>
                  <Icon name={section.icon} size={14} className={section.color} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{section.category}</p>
                  <p className="text-xs text-muted-foreground">{section.articles.length} статьи</p>
                </div>
              </div>
              <Icon
                name={expanded === section.category ? "ChevronUp" : "ChevronDown"}
                size={14}
                className="text-muted-foreground"
              />
            </button>

            {expanded === section.category && (
              <div className="mt-3 space-y-1.5 animate-fade-in">
                {section.articles.map((article) => (
                  <button
                    key={article.title}
                    className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-muted/30 transition-colors text-left group"
                  >
                    <Icon name="FileText" size={13} className="text-muted-foreground shrink-0" />
                    <span className="flex-1 text-xs font-medium group-hover:text-foreground text-foreground/80 transition-colors">
                      {article.title}
                    </span>
                    {article.new && (
                      <span className="tag-chip bg-radar-green/10 text-radar-green text-[9px]">Новое</span>
                    )}
                    <span className="text-[10px] text-muted-foreground font-mono shrink-0">{article.time}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
