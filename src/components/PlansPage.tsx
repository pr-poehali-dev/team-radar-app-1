import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Plan } from "@/components/PricingPage";

interface PlansPageProps {
  plan: Plan;
  onChangePlan: (plan: Plan) => void;
}

const plans = [
  {
    id: "standard" as Plan,
    name: "Стандарт",
    tagline: "Для малых команд",
    price: { monthly: 2900, yearly: 2320 },
    limit: "до 10 человек",
    colorClass: "text-primary",
    borderClass: "border-primary/40",
    bgClass: "bg-primary/5",
    activeBg: "bg-primary/10",
    icon: "Users",
    features: [
      { text: "До 10 участников команды", included: true },
      { text: "Диаграммы «Рыбья кость»", included: true },
      { text: "Еженедельный пульс команды", included: true },
      { text: "OKR до 5 целей", included: true },
      { text: "Ритуалы и календарь", included: true },
      { text: "Экспорт в PDF", included: true },
      { text: "Коллаборативный режим", included: false },
      { text: "Alice AI — расширенный анализ", included: false },
      { text: "Интеграции (Slack, Jira, Trello)", included: false },
      { text: "Приоритетная поддержка", included: false },
    ],
  },
  {
    id: "premium" as Plan,
    name: "Премиум",
    tagline: "Для растущего бизнеса",
    price: { monthly: 7900, yearly: 6320 },
    limit: "до 50 человек",
    colorClass: "text-radar-cyan",
    borderClass: "border-radar-cyan/50",
    bgClass: "bg-radar-cyan/5",
    activeBg: "bg-radar-cyan/10",
    icon: "Building2",
    badge: "Популярный",
    features: [
      { text: "До 50 участников команды", included: true },
      { text: "Диаграммы «Рыбья кость»", included: true },
      { text: "Еженедельный пульс команды", included: true },
      { text: "OKR — без ограничений", included: true },
      { text: "Ритуалы и календарь", included: true },
      { text: "Экспорт в PDF", included: true },
      { text: "Коллаборативный режим", included: true },
      { text: "Alice AI — расширенный анализ", included: true },
      { text: "Интеграции (Slack, Jira, Trello)", included: true },
      { text: "Приоритетная поддержка", included: true },
    ],
  },
];

export default function PlansPage({ plan, onChangePlan }: PlansPageProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [confirmPlan, setConfirmPlan] = useState<Plan | null>(null);

  const handleSelect = (id: Plan) => {
    if (id === plan) return;
    setConfirmPlan(id);
  };

  const handleConfirm = () => {
    if (confirmPlan) {
      onChangePlan(confirmPlan);
      setConfirmPlan(null);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in max-w-4xl">

      {/* Current plan banner */}
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
        plan === "premium"
          ? "border-radar-cyan/30 bg-radar-cyan/5"
          : "border-primary/30 bg-primary/5"
      }`}>
        <Icon name={plan === "premium" ? "Building2" : "Users"} size={16} className={plan === "premium" ? "text-radar-cyan" : "text-primary"} />
        <div className="flex-1">
          <span className="text-sm font-semibold">
            Текущий тариф: «{plan === "premium" ? "Премиум" : "Стандарт"}»
          </span>
          <span className="text-xs text-muted-foreground ml-2">
            · {plan === "premium" ? "до 50 участников" : "до 10 участников"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-radar-green/10 border border-radar-green/30">
          <span className="w-1.5 h-1.5 rounded-full bg-radar-green" />
          <span className="text-xs font-semibold text-radar-green">Активен</span>
        </div>
      </div>

      {/* Billing toggle */}
      <div className="flex items-center gap-3">
        <span className={`text-sm ${billing === "monthly" ? "text-foreground font-medium" : "text-muted-foreground"}`}>
          Ежемесячно
        </span>
        <button
          onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${billing === "yearly" ? "bg-primary" : "bg-secondary"}`}
        >
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${billing === "yearly" ? "translate-x-7" : "translate-x-1"}`} />
        </button>
        <span className={`text-sm ${billing === "yearly" ? "text-foreground font-medium" : "text-muted-foreground"}`}>
          Ежегодно
        </span>
        {billing === "yearly" && (
          <span className="tag-chip bg-radar-green/10 text-radar-green text-[10px] animate-scale-in">−20%</span>
        )}
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((p, i) => {
          const isActive = p.id === plan;
          const price = billing === "yearly" ? p.price.yearly : p.price.monthly;

          return (
            <div
              key={p.id}
              className={`relative rounded-2xl border p-5 flex flex-col transition-all duration-200 animate-fade-in stagger-${i + 1}
                ${isActive ? `${p.borderClass} ${p.activeBg}` : "border-border bg-card hover:border-border/80"}
              `}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-3 left-5">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                    p.id === "premium" ? "bg-radar-cyan text-background" : "bg-primary text-primary-foreground"
                  }`}>
                    Ваш тариф
                  </span>
                </div>
              )}

              {!isActive && p.badge && (
                <div className="absolute -top-3 left-5">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-radar-cyan text-background">
                    {p.badge}
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Icon name={p.icon} size={15} className={p.colorClass} />
                    <h3 className="text-base font-bold">{p.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.tagline}</p>
                </div>
                <span className={`tag-chip text-[10px] font-mono ${p.colorClass}`}
                  style={{ backgroundColor: p.id === "premium" ? "hsl(195 100% 50% / 0.1)" : "hsl(210 100% 56% / 0.1)" }}>
                  {p.limit}
                </span>
              </div>

              <div className="mb-5">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-2xl font-bold text-radar-green font-mono">0 ₽</span>
                  <span className="text-xs text-muted-foreground">· 14 дней</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-muted-foreground">Затем</span>
                  <span className={`text-2xl font-bold font-mono ${p.colorClass}`}>
                    {price.toLocaleString("ru-RU")}
                  </span>
                  <span className="text-xs text-muted-foreground">₽ / мес</span>
                </div>
                {billing === "yearly" && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {(price * 12).toLocaleString("ru-RU")} ₽ в год
                  </p>
                )}
              </div>

              <ul className="space-y-2 mb-5 flex-1">
                {p.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      f.included
                        ? p.id === "premium" ? "bg-radar-cyan/20" : "bg-primary/20"
                        : "bg-muted"
                    }`}>
                      <Icon
                        name={f.included ? "Check" : "Minus"}
                        size={10}
                        className={f.included ? p.colorClass : "text-muted-foreground"}
                      />
                    </div>
                    <span className={`text-xs ${f.included ? "text-foreground" : "text-muted-foreground line-through decoration-muted-foreground/40"}`}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelect(p.id)}
                disabled={isActive}
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
                  ${isActive
                    ? "bg-muted text-muted-foreground cursor-default"
                    : p.id === "premium"
                      ? "bg-radar-cyan text-background hover:bg-radar-cyan/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
              >
                {isActive ? "Активный тариф" : `Перейти на «${p.name}»`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Trust row */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        {[
          { icon: "Shield", label: "Шифрование AES-256", color: "text-radar-green" },
          { icon: "Server", label: "Серверы в РФ (ФЗ-152)", color: "text-primary" },
          { icon: "RefreshCw", label: "Отмена в любой момент", color: "text-radar-amber" },
        ].map((t) => (
          <div key={t.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name={t.icon} size={12} className={t.color} />
            {t.label}
          </div>
        ))}
      </div>

      {/* Confirm modal */}
      {confirmPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-xl ${confirmPlan === "premium" ? "bg-radar-cyan/10" : "bg-primary/10"}`}>
                <Icon name={confirmPlan === "premium" ? "Building2" : "Users"} size={20} className={confirmPlan === "premium" ? "text-radar-cyan" : "text-primary"} />
              </div>
              <div>
                <h3 className="font-bold text-base">Сменить тариф</h3>
                <p className="text-xs text-muted-foreground">
                  На «{confirmPlan === "premium" ? "Премиум" : "Стандарт"}»
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Вы переходите на тариф <span className="font-semibold text-foreground">«{confirmPlan === "premium" ? "Премиум" : "Стандарт"}»</span>.{" "}
              {confirmPlan === "premium"
                ? "Все функции будут разблокированы немедленно."
                : "Часть функций станет недоступна."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmPlan(null)}
                className="flex-1 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${
                  confirmPlan === "premium"
                    ? "bg-radar-cyan text-background hover:bg-radar-cyan/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
