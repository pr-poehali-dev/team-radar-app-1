import Icon from "@/components/ui/icon";
import { Plan } from "@/components/PricingPage";

interface PlanBadgeProps {
  plan: Plan;
  trialDaysLeft: number;
  onUpgrade: () => void;
}

export default function PlanBadge({ plan, trialDaysLeft, onUpgrade }: PlanBadgeProps) {
  if (plan === "premium" && trialDaysLeft === 0) return null;

  const isTrialEnding = trialDaysLeft > 0 && trialDaysLeft <= 3;

  return (
    <div className={`border-t px-4 py-2 flex items-center gap-3 transition-colors ${
      isTrialEnding
        ? "border-radar-amber/30 bg-radar-amber/5"
        : "border-border bg-muted/30"
    }`}>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {trialDaysLeft > 0 ? (
          <>
            <Icon name="Clock" size={12} className={isTrialEnding ? "text-radar-amber" : "text-radar-green"} />
            <span>
              Пробный период: <span className={`font-semibold ${isTrialEnding ? "text-radar-amber" : "text-radar-green"}`}>
                {trialDaysLeft} {trialDaysLeft === 1 ? "день" : trialDaysLeft < 5 ? "дня" : "дней"}
              </span> осталось
              {plan === "standard" && <span className="ml-1 text-muted-foreground">· тариф Стандарт</span>}
              {plan === "premium" && <span className="ml-1 text-muted-foreground">· тариф Премиум</span>}
            </span>
          </>
        ) : (
          <>
            <Icon name="Users" size={12} className="text-primary" />
            <span>Тариф <span className="text-primary font-medium">Стандарт</span> · до 10 участников</span>
          </>
        )}
      </div>
      <button
        onClick={onUpgrade}
        className={`ml-auto flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
          isTrialEnding
            ? "bg-radar-amber/15 border border-radar-amber/40 text-radar-amber hover:bg-radar-amber/25"
            : "bg-radar-cyan/10 border border-radar-cyan/30 text-radar-cyan hover:bg-radar-cyan/20"
        }`}
      >
        <Icon name={isTrialEnding ? "Zap" : "ArrowUp"} size={11} />
        {isTrialEnding ? "Оформить подписку" : plan === "premium" ? "Управление тарифом" : "Перейти на Премиум"}
      </button>
    </div>
  );
}