import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCustomers, Customer } from "../hooks/useCustomers";
import { CustomerCard } from "./CustomerCard";
import { CustomerDetailSidebar } from "./CustomerDetailSidebar";
import { RefreshCw, Eye, EyeOff, Archive } from "lucide-react";

export function CustomersBoard() {
  const { data: customers = [], isLoading, isError, refetch } = useCustomers();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCustomerId = searchParams.get("customer");
  const [showInactive, setShowInactive] = useState(false);

  // Main 3 Client Sections (Active, Regular, Onboarding)
  const columns = [
    { title: "Active Clients", status: "Active", count: customers.filter((c) => c.status === "Active").length },
    { title: "Regular Clients", status: "Regular", count: customers.filter((c) => c.status === "Regular").length },
    { title: "Onboarding", status: "Onboarding", count: customers.filter((c) => c.status === "Onboarding").length },
  ];

  const inactiveCustomers = customers.filter((c) => c.status === "Inactive");

  const handleSelectCustomer = (customer: Customer) => {
    setSearchParams({ customer: customer.id });
  };

  const handleCloseSidebar = () => {
    searchParams.delete("customer");
    setSearchParams(searchParams);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 text-[var(--color-muted)]">
        <RefreshCw size={24} className="animate-spin mr-2" /> Loading customers...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-[var(--color-muted)]">
        <p className="mb-4">Failed to load customers.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-[var(--color-ink)] text-white rounded-lg text-sm font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pr-8">
      {/* Action Header bar for toggling Past / Inactive clients */}
      <div className="flex justify-end items-center">
        <button
          onClick={() => setShowInactive(!showInactive)}
          className="px-4 py-2 bg-white border border-[var(--color-border)] rounded-xl text-xs font-semibold text-[var(--color-ink)] hover:bg-[#F5F5F5] transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
        >
          {showInactive ? <EyeOff size={15} /> : <Eye size={15} />}
          <span>{showInactive ? "Hide Past / Inactive Clients" : `Show Past / Inactive Clients (${inactiveCustomers.length})`}</span>
        </button>
      </div>

      {/* Main 3 Section Columns: Active, Regular, Onboarding */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colCustomers = customers.filter((c) => c.status === col.status);

          return (
            <div key={col.title} className="flex-1 min-w-[280px]">
              {/* Column Header */}
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-[var(--color-ink)] text-xl font-medium">{col.title}</h3>
                <span className="bg-[var(--color-ink)] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
                  {col.count}
                </span>
              </div>

              {/* Column Customer Cards */}
              <div className="flex flex-col gap-4">
                {colCustomers.length === 0 ? (
                  <div className="p-6 border-2 border-dashed border-[var(--color-border)] rounded-[20px] text-center text-xs text-[var(--color-muted)]">
                    No {col.title.toLowerCase()}
                  </div>
                ) : (
                  colCustomers.map((cust) => (
                    <CustomerCard key={cust.id} customer={cust} onSelect={handleSelectCustomer} />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hidden Inactive / Past Clients Section (toggled by button) */}
      {showInactive && (
        <div className="pt-6 border-t border-[var(--color-border)] animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#F2F2F2] flex items-center justify-center text-[var(--color-ink)]">
              <Archive size={16} />
            </div>
            <div>
              <h3 className="text-xl font-medium text-[var(--color-ink)]">Past / Inactive Clients</h3>
              <p className="text-xs text-[var(--color-muted)]">Archived accounts and terminated contracts</p>
            </div>
            <span className="bg-[var(--color-muted)] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ml-2">
              {inactiveCustomers.length}
            </span>
          </div>

          {inactiveCustomers.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-[var(--color-border)] rounded-[20px] text-center text-xs text-[var(--color-muted)] max-w-md">
              No inactive or past clients found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inactiveCustomers.map((cust) => (
                <CustomerCard key={cust.id} customer={cust} onSelect={handleSelectCustomer} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Customer Detail Sidebar */}
      {activeCustomerId && (
        <CustomerDetailSidebar customerId={activeCustomerId} onClose={handleCloseSidebar} />
      )}
    </div>
  );
}
