import { useState } from "react";
import Icon from "@/components/ui/icon";

const rituals = [
  {
    id: "r1",
    title: "Еженедельная ретроспектива",
    emoji: "🔄",
    day: "Пятница",
    time: "17:00",
    participants: 8,
    streak: 12,
    category: "review",
    active: true,
  },
  {
    id: "r2",
    title: "День без митингов",
    emoji: "🧘",
    day: "Среда",
    time: "Весь день",
    participants: 24,
    streak: 6,
    category: "wellbeing",
    active: true,
  },
  {
    id: "r3",
    title: "Встреча 1-on-1",
    emoji: "💬",
    day: "Понедельник",
    time: "10:00",
    participants: 2,
    streak: 20,
    category: "feedback",
    active: true,
  },
  {
    id: "r4",
    title: "Встреча без повестки",
    emoji: "☕",
    day: "Четверг",
    time: "12:00",
    participants: 12,
    streak: 4,
    category: "culture",
    active: false,
  },
];

const ideas = [
  { id: "i1", text: "Добавить 15-минутный утренний стендап в Zoom", votes: 14, author: "Алексей М.", mine: false },
  { id: "i2", text: "Раз в месяц показывать стикер «Мой главный результат»", votes: 9, author: "Ольга С.", mine: true },
  { id: "i3", text: "Библиотека книг с обменом внутри команды", votes: 21, author: "Иван К.", mine: false },
];

const thanks = [
  { from: "Мария Т.", to: "Алексей М.", value: "Взаимопомощь", text: "Спасибо за помощь с деплоем в пятницу вечером!" },
  { from: "Игорь В.", to: "Команда поддержки", value: "Забота о клиентах", text: "Вы обработали рекордные 300 тикетов за неделю 💪" },
];

const categoryColors: Record<string, string> = {
  review: "text-primary bg-primary/10",
  wellbeing: "text-radar-green bg-radar-green/10",
  feedback: "text-radar-cyan bg-radar-cyan/10",
  culture: "text-radar-purple bg-radar-purple/10",
};

export default function RitualsPage() {
  const [votedIds, setVotedIds] = useState<string[]>([]);

  const vote = (id: string) => {
    setVotedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  return (
    <div className="p-4 md:p-6 space-y-5 animate-fade-in">
      {/* Calendar strip */}
      <div className="metric-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="CalendarDays" size={14} className="text-radar-purple" />
            <h2 className="text-sm font-semibold">Календарь ритуалов</h2>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
            <Icon name="Plus" size={12} />
            Новый ритуал
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {rituals.map((r, i) => (
            <div
              key={r.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 animate-fade-in stagger-${i + 1} ${
                r.active ? "border-border bg-muted/20 hover:border-primary/30" : "border-border/50 bg-muted/10 opacity-60"
              }`}
            >
              <div className="text-2xl shrink-0">{r.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium truncate">{r.title}</p>
                  <span className={`tag-chip text-[10px] shrink-0 ${categoryColors[r.category]}`}>
                    {r.category === "review" ? "Ретро" : r.category === "wellbeing" ? "WB" : r.category === "feedback" ? "1:1" : "Культура"}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {r.day} · {r.time}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-radar-amber">
                    <Icon name="Flame" size={10} />
                    {r.streak} нед
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Icon name="Users" size={10} className="text-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground">{r.participants} участников</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Ideas bank */}
        <div className="metric-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="Lightbulb" size={14} className="text-radar-amber" />
              <h2 className="text-sm font-semibold">Банк идей</h2>
            </div>
            <button className="text-xs text-primary hover:underline">Предложить</button>
          </div>
          <div className="space-y-2">
            {ideas.map((idea, i) => (
              <div key={idea.id} className={`flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border animate-fade-in stagger-${i + 1}`}>
                <button
                  onClick={() => vote(idea.id)}
                  className={`flex flex-col items-center gap-0.5 shrink-0 p-1 rounded-lg transition-all duration-150 ${
                    votedIds.includes(idea.id)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <Icon name="ChevronUp" size={14} />
                  <span className="text-[10px] font-mono font-bold">
                    {idea.votes + (votedIds.includes(idea.id) ? 1 : 0)}
                  </span>
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium leading-relaxed">{idea.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {idea.author} {idea.mine && <span className="text-primary">· ваша идея</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gratitude wall */}
        <div className="metric-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="Heart" size={14} className="text-radar-red" />
              <h2 className="text-sm font-semibold">Доска признательности</h2>
            </div>
            <button className="text-xs text-primary hover:underline">Поблагодарить</button>
          </div>
          <div className="space-y-2">
            {thanks.map((t, i) => (
              <div key={i} className={`p-3 rounded-xl bg-gradient-to-br from-muted/40 to-transparent border border-border animate-fade-in stagger-${i + 1}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-bold text-background shrink-0">
                    {t.from[0]}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{t.from}</span>
                    <Icon name="ArrowRight" size={10} />
                    <span className="font-medium text-foreground">{t.to}</span>
                  </div>
                </div>
                <p className="text-xs text-foreground leading-relaxed">"{t.text}"</p>
                <span className="tag-chip mt-1.5 bg-primary/10 text-primary text-[10px]">
                  {t.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
