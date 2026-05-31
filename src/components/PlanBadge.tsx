import Icon from "@/components/ui/icon";
import { Plan } from "@/components/PricingPage";

interface PlanBadgeProps {
  plan: Plan;
  onUpgrade: () => void;
}

export default function PlanBadge({ plan, onUpgrade }: PlanBadgeProps) {
  if (plan === "premium") return null;

  return (
    <div className="border-t border-border bg-muted/30 px-4 py-2 flex items-center gap-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon name="Users" size={12} className="text-primary" />
        <span>Тариф <span className="text-primary font-medium">Стандарт</span> · до 10 участников</span>
      </div>
      <button
        onClick={onUpgrade}
        className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-lg bg-radar-cyan/10 border border-radar-cyan/30 text-radar-cyan text-xs font-semibold hover:bg-radar-cyan/20 transition-colors"
      >
        <Icon name="ArrowUp" size={11} />
        Перейти на Премиум
      </button>
    </div>
  );
}
