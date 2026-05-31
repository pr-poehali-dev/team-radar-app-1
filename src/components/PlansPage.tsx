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

type Tab = "plans" | "billing" | "history";

const payments = [
  { id: "INV-0012", date: "01 мая 2026", plan: "Премиум", amount: 7900, status: "paid" },
  { id: "INV-0011", date: "01 апр 2026", plan: "Премиум", amount: 7900, status: "paid" },
  { id: "INV-0010", date: "01 мар 2026", plan: "Стандарт", amount: 2900, status: "paid" },
  { id: "INV-0009", date: "01 фев 2026", plan: "Стандарт", amount: 2900, status: "paid" },
  { id: "INV-0008", date: "01 янв 2026", plan: "Стандарт", amount: 2900, status: "refunded" },
];

export default function PlansPage({ plan, onChangePlan }: PlansPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>("plans");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [confirmPlan, setConfirmPlan] = useState<Plan | null>(null);
  const [invoiceForm, setInvoiceForm] = useState({ company: "", inn: "", email: "", address: "" });
  const [invoiceSent, setInvoiceSent] = useState(false);

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

      {/* Tab navigation */}
      <div className="flex gap-1 p-1 bg-muted/40 border border-border rounded-xl w-fit">
        {([
          { id: "plans", icon: "CreditCard", label: "Тарифы" },
          { id: "billing", icon: "FileText", label: "Счёт" },
          { id: "history", icon: "Clock", label: "История" },
        ] as { id: Tab; icon: string; label: string }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              activeTab === t.id
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon name={t.icon} size={13} />
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "plans" && (<>

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

      </>)}

      {/* ── Billing tab ── */}
      {activeTab === "billing" && (
        <div className="space-y-5 animate-fade-in">
          {invoiceSent ? (
            <div className="metric-card flex flex-col items-center gap-3 py-10 animate-scale-in">
              <div className="w-12 h-12 rounded-full bg-radar-green/15 flex items-center justify-center">
                <Icon name="CheckCircle2" size={24} className="text-radar-green" />
              </div>
              <p className="font-semibold text-base">Счёт отправлен</p>
              <p className="text-xs text-muted-foreground text-center max-w-xs">
                Счёт на оплату отправлен на <span className="text-foreground font-medium">{invoiceForm.email}</span>.<br />
                Обычно приходит в течение 5 минут.
              </p>
              <button
                onClick={() => setInvoiceSent(false)}
                className="mt-2 text-xs text-primary hover:underline"
              >
                Выставить ещё один счёт
              </button>
            </div>
          ) : (
            <>
              <div className="metric-card">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="FileText" size={14} className="text-primary" />
                  <h2 className="text-sm font-semibold">Выставление счёта для юридических лиц</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: "company", label: "Название организации", placeholder: "ООО «Компания»" },
                    { key: "inn", label: "ИНН / КПП", placeholder: "7700000000 / 770000000" },
                    { key: "email", label: "Email для счёта", placeholder: "buh@company.ru" },
                    { key: "address", label: "Юридический адрес", placeholder: "г. Москва, ул. Примерная, д. 1" },
                  ].map((field) => (
                    <div key={field.key} className={field.key === "address" ? "sm:col-span-2" : ""}>
                      <label className="text-[11px] text-muted-foreground mb-1.5 block">{field.label}</label>
                      <input
                        value={invoiceForm[field.key as keyof typeof invoiceForm]}
                        onChange={(e) => setInvoiceForm((f) => ({ ...f, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full bg-muted/40 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary/50 placeholder:text-muted-foreground/50 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="metric-card">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Receipt" size={14} className="text-radar-amber" />
                  <h2 className="text-sm font-semibold">Счёт к выставлению</h2>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs py-2 border-b border-border">
                    <span className="text-muted-foreground">Тариф</span>
                    <span className="font-medium">{plan === "premium" ? "Премиум" : "Стандарт"}</span>
                  </div>
                  <div className="flex justify-between text-xs py-2 border-b border-border">
                    <span className="text-muted-foreground">Период</span>
                    <span className="font-medium">1 месяц</span>
                  </div>
                  <div className="flex justify-between text-xs py-2 border-b border-border">
                    <span className="text-muted-foreground">Сумма без НДС</span>
                    <span className="font-mono font-medium">
                      {Math.round((plan === "premium" ? 7900 : 2900) / 1.2).toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                  <div className="flex justify-between text-xs py-2 border-b border-border">
                    <span className="text-muted-foreground">НДС 20%</span>
                    <span className="font-mono font-medium">
                      {Math.round((plan === "premium" ? 7900 : 2900) * 0.2 / 1.2).toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                  <div className="flex justify-between text-sm py-2 font-bold">
                    <span>Итого</span>
                    <span className="font-mono text-primary">
                      {(plan === "premium" ? 7900 : 2900).toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => invoiceForm.company && invoiceForm.inn && invoiceForm.email && setInvoiceSent(true)}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    invoiceForm.company && invoiceForm.inn && invoiceForm.email
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="Send" size={14} />
                    Выставить счёт
                  </span>
                </button>
                {(!invoiceForm.company || !invoiceForm.inn || !invoiceForm.email) && (
                  <p className="text-center text-[11px] text-muted-foreground mt-2">
                    Заполните название, ИНН и email
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── History tab ── */}
      {activeTab === "history" && (
        <div className="space-y-4 animate-fade-in">
          <div className="metric-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={14} className="text-radar-purple" />
                <h2 className="text-sm font-semibold">История платежей</h2>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Download" size={12} />
                Скачать всё
              </button>
            </div>

            <div className="space-y-1">
              {/* Header */}
              <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 px-3 py-1.5">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Счёт</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Дата</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider hidden sm:block">Тариф</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Сумма</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Статус</span>
              </div>

              {payments.map((p, i) => (
                <div
                  key={p.id}
                  className={`grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 items-center px-3 py-2.5 rounded-lg hover:bg-muted/30 transition-colors animate-fade-in stagger-${Math.min(i + 1, 6)}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon name="FileText" size={13} className="text-muted-foreground shrink-0" />
                    <span className="text-xs font-mono font-medium truncate">{p.id}</span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{p.date}</span>
                  <span className="text-xs text-muted-foreground hidden sm:block whitespace-nowrap">{p.plan}</span>
                  <span className="text-xs font-mono font-semibold whitespace-nowrap">
                    {p.amount.toLocaleString("ru-RU")} ₽
                  </span>
                  <span className={`tag-chip text-[10px] whitespace-nowrap ${
                    p.status === "paid"
                      ? "bg-radar-green/10 text-radar-green"
                      : "bg-radar-amber/10 text-radar-amber"
                  }`}>
                    {p.status === "paid" ? "Оплачен" : "Возврат"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "Всего потрачено",
                value: payments.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0).toLocaleString("ru-RU") + " ₽",
                icon: "TrendingUp",
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                label: "Платежей",
                value: payments.filter(p => p.status === "paid").length,
                icon: "CheckCircle2",
                color: "text-radar-green",
                bg: "bg-radar-green/10",
              },
              {
                label: "Возвратов",
                value: payments.filter(p => p.status === "refunded").length,
                icon: "RefreshCw",
                color: "text-radar-amber",
                bg: "bg-radar-amber/10",
              },
            ].map((s) => (
              <div key={s.label} className="metric-card text-center">
                <div className={`p-2 rounded-lg ${s.bg} w-fit mx-auto mb-2`}>
                  <Icon name={s.icon} size={14} className={s.color} />
                </div>
                <div className={`text-lg font-bold font-mono ${s.color}`}>{s.value}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

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