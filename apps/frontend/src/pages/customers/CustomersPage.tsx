import { CustomersBoard } from "../../features/customers/components/CustomersBoard";

export function CustomersPage() {
  return (
    <div className="flex flex-col h-full pt-8 pl-8">
      <div className="flex items-center justify-between mb-8 pr-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)]">Customers Management</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Manage client accounts, contracts, NDAs, invoicing, and payment tracking.
          </p>
        </div>
      </div>

      <CustomersBoard />
    </div>
  );
}
