import { useState } from "react";
import Icon from "@/components/ui/icon";

export type Plan = "standard" | "premium";

interface PricingPageProps {
  onSelect: (plan: Plan) => void;
}

const plans = [
  {
    id: "standard" as Plan,
    name: "Стандарт",
    tagline: "Для малых команд",
    price: { monthly: 2900, yearly: 2320 },
    limit: "до 10 человек",
    color: "var(--radar-blue)",
    colorClass: "text-primary",
    borderClass: "border-primary/40",
    bgClass: "bg-primary/5",
    glowClass: "shadow-[0_0_30px_hsl(210_100%_56%/0.1)]",
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
    color: "hsl(195 100% 50%)",
    colorClass: "text-radar-cyan",
    borderClass: "border-radar-cyan/50",
    bgClass: "bg-radar-cyan/5",
    glowClass: "shadow-[0_0_40px_hsl(195_100%_50%/0.12)]",
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

export default function PricingPage({ onSelect }: PricingPageProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [hoveredPlan, setHoveredPlan] = useState<Plan | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 data-grid opacity-40 pointer-events-none" />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-radar-cyan/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl">
        {/* Logo + header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Icon name="Radar" size={20} className="text-primary" />
            </div>
            <span className="text-lg font-bold">Командный радар</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            Выберите тариф для вашей команды
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Инструмент анализа, управления и развития команды. Выберите подходящий план и начните прямо сейчас.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in stagger-1">
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
            <span className="tag-chip bg-radar-green/10 text-radar-green text-[10px] animate-scale-in">
              −20%
            </span>
          )}
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in stagger-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative rounded-2xl border p-6 flex flex-col transition-all duration-300 cursor-default
                ${plan.borderClass} ${plan.bgClass}
                ${hoveredPlan === plan.id ? plan.glowClass : ""}
              `}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-radar-cyan text-background">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name={plan.icon} size={16} className={plan.colorClass} />
                    <h2 className="text-base font-bold">{plan.name}</h2>
                  </div>
                  <p className="text-xs text-muted-foreground">{plan.tagline}</p>
                </div>
                <span
                  className="tag-chip text-[10px] font-mono"
                  style={{ color: plan.color, backgroundColor: plan.color + "18" }}
                >
                  {plan.limit}
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold font-mono ${plan.colorClass}`}>
                    {(billing === "yearly" ? plan.price.yearly : plan.price.monthly).toLocaleString("ru-RU")}
                  </span>
                  <span className="text-muted-foreground text-sm">₽ / мес</span>
                </div>
                {billing === "yearly" && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Списывается {(plan.price.yearly * 12).toLocaleString("ru-RU")} ₽ раз в год
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      f.included
                        ? plan.id === "premium" ? "bg-radar-cyan/20" : "bg-primary/20"
                        : "bg-muted"
                    }`}>
                      <Icon
                        name={f.included ? "Check" : "Minus"}
                        size={10}
                        className={f.included ? plan.colorClass : "text-muted-foreground"}
                      />
                    </div>
                    <span className={`text-xs ${f.included ? "text-foreground" : "text-muted-foreground line-through decoration-muted-foreground/40"}`}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => onSelect(plan.id)}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200
                  ${plan.id === "premium"
                    ? "bg-radar-cyan text-background hover:bg-radar-cyan/90 hover:shadow-[0_0_20px_hsl(195_100%_50%/0.3)]"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(210_100%_56%/0.3)]"
                  }
                `}
              >
                Начать с тарифа «{plan.name}»
              </button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground mt-6 animate-fade-in stagger-3">
          Без скрытых платежей · Отменить можно в любой момент · Безопасная оплата
        </p>

        {/* Compare link */}
        <div className="flex items-center justify-center gap-4 mt-4 animate-fade-in stagger-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="Shield" size={12} className="text-radar-green" />
            Шифрование AES-256
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="Server" size={12} className="text-primary" />
            Серверы в РФ (ФЗ-152)
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="HeadphonesIcon" size={12} className="text-radar-amber" />
            Поддержка 24/7
          </div>
        </div>
      </div>
    </div>
  );
}
