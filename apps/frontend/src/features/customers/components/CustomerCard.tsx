import { MoreHorizontal, FileCheck, ShieldCheck, Receipt, CreditCard } from "lucide-react";
import { Customer } from "../hooks/useCustomers";

interface CustomerCardProps {
  customer: Customer;
  onSelect: (customer: Customer) => void;
}

export function CustomerCard({ customer, onSelect }: CustomerCardProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
      case "VIP":
        return "bg-[#E9F7EE] text-[#111111] border border-[#BDE8CB]";
      case "Onboarding":
        return "bg-[#EAF0FF] text-[#111111] border border-[#C6D9FF]";
      default:
        return "bg-[#F2F2F2] text-[#111111]";
    }
  };

  const contractsCount = customer.contracts?.length || 0;
  const ndasCount = customer.ndas?.length || 0;
  const invoicesCount = customer.invoices?.length || 0;
  const paymentsCount = customer.payments?.length || 0;

  return (
    <div
      onClick={() => onSelect(customer)}
      className="rounded-[20px] p-5 border bg-white border-[var(--color-border)] shadow-sm cursor-pointer hover:border-[#111111] transition-all hover:shadow-md"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusStyle(customer.status)}`}>
          {customer.status}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); }}
          className="text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      <h4 className="text-[var(--color-ink)] font-bold text-lg mb-1">{customer.name}</h4>
      <p className="text-xs text-[var(--color-muted)] font-medium mb-3">{customer.company} • {customer.email}</p>

      {customer.description && (
        <p className="text-[var(--color-muted)] text-sm mb-5 leading-relaxed line-clamp-2">
          {customer.description}
        </p>
      )}

      {customer.assigneeName && (
        <div className="flex items-center gap-3 mb-4">
          <img
            src={customer.assigneeAvatar || `https://i.pravatar.cc/150?u=${customer.assigneeName}`}
            alt={customer.assigneeName}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p className="text-[var(--color-ink)] font-bold text-sm">{customer.assigneeName}</p>
            <p className="text-[var(--color-muted)] text-xs">{customer.assigneeRole || "Account Manager"}</p>
          </div>
        </div>
      )}

      {/* Customer Module Metrics Footer */}
      <div className="flex items-center gap-4 pt-3 border-t border-[var(--color-border)] text-xs text-[var(--color-muted)]">
        <div className="flex items-center gap-1" title="Contracts">
          <FileCheck size={15} />
          <span>{contractsCount}</span>
        </div>
        <div className="flex items-center gap-1" title="NDAs">
          <ShieldCheck size={15} />
          <span>{ndasCount}</span>
        </div>
        <div className="flex items-center gap-1" title="Invoices">
          <Receipt size={15} />
          <span>{invoicesCount}</span>
        </div>
        <div className="flex items-center gap-1" title="Payments">
          <CreditCard size={15} />
          <span>{paymentsCount}</span>
        </div>
      </div>
    </div>
  );
}
