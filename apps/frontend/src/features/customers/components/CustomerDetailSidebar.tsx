import { useState, useEffect } from "react";
import {
  X,
  MoreVertical,
  FileCheck,
  ShieldCheck,
  Receipt,
  CreditCard,
  Building2,
  Mail,
  Phone,
  Plus,
  RefreshCw,
  ExternalLink,
  Edit2,
  Trash2,
} from "lucide-react";
import { useCustomerDetail, useUpdateCustomer, useDeleteCustomer } from "../hooks/useCustomers";

interface CustomerDetailSidebarProps {
  customerId: string;
  onClose: () => void;
}

type TabType = "overview" | "contracts" | "nda" | "invoicing" | "payments";

const STATUS_OPTIONS = ["Active", "Regular", "Onboarding", "Inactive"];

export function CustomerDetailSidebar({ customerId, onClose }: CustomerDetailSidebarProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showMenu, setShowMenu] = useState(false);

  const { data: customer, isLoading, isError, refetch } = useCustomerDetail(customerId);
  const updateCustomerMutation = useUpdateCustomer();
  const deleteCustomerMutation = useDeleteCustomer();

  // Close on Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleStatusChange = (newStatus: string) => {
    if (!customer) return;
    updateCustomerMutation.mutate({
      id: customer.id,
      data: { status: newStatus as any },
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this customer?")) {
      deleteCustomerMutation.mutate(customerId, {
        onSuccess: () => onClose(),
      });
    }
  };

  const getStatusBadgeStyle = (status: string) => {
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/25 transition-opacity animate-fade-in" onClick={onClose} />

      {/* Right Slide-in Panel */}
      <div className="relative z-10 w-full max-w-[440px] bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-220 ease-out animate-slide-in-right">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
          <button
            onClick={onClose}
            className="text-[#6B6B6B] hover:text-[#111111] transition-colors p-1 rounded-md hover:bg-[#F5F5F5]"
            title="Close (Esc)"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
              Customer Profile
            </span>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-[#6B6B6B] hover:text-[#111111] p-1 rounded-md hover:bg-[#F5F5F5] transition-colors"
              >
                <MoreVertical size={20} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E5E5] rounded-xl shadow-lg py-1 z-20">
                  <button
                    onClick={() => { setShowMenu(false); alert("Editing customer details"); }}
                    className="w-full px-4 py-2 text-left text-sm text-[#111111] hover:bg-[#F5F5F5] flex items-center gap-2"
                  >
                    <Edit2 size={16} /> Edit Customer
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 size={16} /> Delete Customer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Body */}
        {isLoading ? (
          <div className="p-6 space-y-4 animate-pulse">
            <div className="h-10 bg-[#F2F2F2] rounded-lg w-3/4"></div>
            <div className="h-6 bg-[#F2F2F2] rounded-lg w-1/2"></div>
            <div className="h-24 bg-[#F2F2F2] rounded-lg w-full mt-6"></div>
          </div>
        ) : isError || !customer ? (
          <div className="p-6 text-center text-[#6B6B6B]">
            <p className="mb-4">Failed to load customer profile.</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium inline-flex items-center gap-2"
            >
              <RefreshCw size={14} /> Retry
            </button>
          </div>
        ) : (
          <>
            {/* Identity Block */}
            <div className="px-6 py-5 border-b border-[#E5E5E5] bg-[#FAFAFA]">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {customer.avatar ? (
                    <img src={customer.avatar} alt={customer.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    getInitials(customer.name)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-[#111111] truncate">{customer.name}</h2>
                  <p className="text-xs text-[#6B6B6B] truncate">{customer.company} • {customer.email}</p>
                </div>
              </div>

              {/* Status & Assignee Badges */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <select
                    value={customer.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className={`text-xs font-semibold px-3 py-1 rounded-full cursor-pointer transition-colors outline-none appearance-none ${getStatusBadgeStyle(
                      customer.status
                    )}`}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-[#E5E5E5] text-[#6B6B6B] bg-white">
                    {customer.tag}
                  </span>
                </div>

                {customer.assigneeName && (
                  <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B]">
                    <span className="w-5 h-5 rounded-full bg-[#E5E5E5] text-[#111111] flex items-center justify-center font-semibold text-[10px]">
                      {getInitials(customer.assigneeName)}
                    </span>
                    <span>{customer.assigneeName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-[#E5E5E5] px-4 bg-white shrink-0 overflow-x-auto scrollbar-none">
              {[
                { id: "overview", label: "Overview" },
                { id: "contracts", label: "Contracts", count: customer.contracts?.length },
                { id: "nda", label: "NDA", count: customer.ndas?.length },
                { id: "invoicing", label: "Invoicing", count: customer.invoices?.length },
                { id: "payments", label: "Payments", count: customer.payments?.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`py-3 px-3 text-xs font-semibold whitespace-nowrap relative transition-colors ${
                    activeTab === tab.id ? "text-[#111111]" : "text-[#6B6B6B] hover:text-[#111111]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {tab.label}
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold">
                        {tab.count}
                      </span>
                    )}
                  </span>
                  {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#111111]" />}
                </button>
              ))}
            </div>

            {/* Tab Contents Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              
              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mb-3">About Account</h4>
                    <p className="text-sm text-[#111111] leading-relaxed bg-[#FAFAFA] p-3.5 rounded-xl border border-[#E5E5E5]">
                      {customer.description || "No account notes provided."}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mb-2">Contact Details</h4>
                    <div className="flex items-center justify-between py-2 border-b border-[#E5E5E5] text-sm">
                      <span className="text-[#6B6B6B] flex items-center gap-2">
                        <Building2 size={14} /> Company
                      </span>
                      <span className="font-medium text-[#111111]">{customer.company}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#E5E5E5] text-sm">
                      <span className="text-[#6B6B6B] flex items-center gap-2">
                        <Mail size={14} /> Email
                      </span>
                      <span className="font-medium text-[#111111]">{customer.email}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#E5E5E5] text-sm">
                      <span className="text-[#6B6B6B] flex items-center gap-2">
                        <Phone size={14} /> Phone
                      </span>
                      <span className="font-medium text-[#111111]">{customer.phone || "Not specified"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTRACTS TAB */}
              {activeTab === "contracts" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">
                      Contracts ({customer.contracts?.length || 0})
                    </span>
                    <button
                      onClick={() => alert("Add contract feature")}
                      className="px-3 py-1.5 bg-[#111111] text-white text-xs font-bold rounded-lg inline-flex items-center gap-1"
                    >
                      <Plus size={14} /> New Contract
                    </button>
                  </div>

                  {!customer.contracts || customer.contracts.length === 0 ? (
                    <div className="py-12 text-center border-2 border-dashed border-[#E5E5E5] rounded-2xl p-6 bg-[#FAFAFA]">
                      <FileCheck size={28} className="mx-auto mb-2 text-[#6B6B6B]" />
                      <p className="text-sm font-semibold text-[#111111]">No active contracts</p>
                      <p className="text-xs text-[#6B6B6B] mt-1">Upload or generate contracts for this customer.</p>
                    </div>
                  ) : (
                    customer.contracts.map((c) => (
                      <div key={c.id} className="p-4 rounded-xl border border-[#E5E5E5] bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#111111]">{c.title}</h4>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#E9F7EE] text-[#111111]">
                            {c.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B6B6B]">Value: ${c.value.toLocaleString()}</p>
                        {c.documentUrl && (
                          <a
                            href={c.documentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-medium text-[#111111] hover:underline inline-flex items-center gap-1"
                          >
                            View Contract PDF <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* NDA TAB */}
              {activeTab === "nda" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">
                      NDA Management ({customer.ndas?.length || 0})
                    </span>
                    <button
                      onClick={() => alert("Add NDA feature")}
                      className="px-3 py-1.5 bg-[#111111] text-white text-xs font-bold rounded-lg inline-flex items-center gap-1"
                    >
                      <Plus size={14} /> New NDA
                    </button>
                  </div>

                  {!customer.ndas || customer.ndas.length === 0 ? (
                    <div className="py-12 text-center border-2 border-dashed border-[#E5E5E5] rounded-2xl p-6 bg-[#FAFAFA]">
                      <ShieldCheck size={28} className="mx-auto mb-2 text-[#6B6B6B]" />
                      <p className="text-sm font-semibold text-[#111111]">No NDA recorded</p>
                      <p className="text-xs text-[#6B6B6B] mt-1">Track signed NDAs and agreements.</p>
                    </div>
                  ) : (
                    customer.ndas.map((n) => (
                      <div key={n.id} className="p-4 rounded-xl border border-[#E5E5E5] bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#111111]">{n.title}</h4>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#E9F7EE] text-[#111111]">
                            {n.status}
                          </span>
                        </div>
                        {n.documentUrl && (
                          <a
                            href={n.documentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-medium text-[#111111] hover:underline inline-flex items-center gap-1"
                          >
                            View Signed NDA <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* INVOICING TAB */}
              {activeTab === "invoicing" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">
                      Invoices ({customer.invoices?.length || 0})
                    </span>
                    <button
                      onClick={() => alert("Create invoice feature")}
                      className="px-3 py-1.5 bg-[#111111] text-white text-xs font-bold rounded-lg inline-flex items-center gap-1"
                    >
                      <Plus size={14} /> Create Invoice
                    </button>
                  </div>

                  {!customer.invoices || customer.invoices.length === 0 ? (
                    <div className="py-12 text-center border-2 border-dashed border-[#E5E5E5] rounded-2xl p-6 bg-[#FAFAFA]">
                      <Receipt size={28} className="mx-auto mb-2 text-[#6B6B6B]" />
                      <p className="text-sm font-semibold text-[#111111]">No invoices issued</p>
                      <p className="text-xs text-[#6B6B6B] mt-1">Issue and track billing invoices.</p>
                    </div>
                  ) : (
                    customer.invoices.map((inv) => (
                      <div key={inv.id} className="p-4 rounded-xl border border-[#E5E5E5] bg-white flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-[#111111]">{inv.invoiceNumber}</h4>
                          <p className="text-xs text-[#6B6B6B]">Amount: ${inv.amount.toLocaleString()}</p>
                        </div>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#E9F7EE] text-[#111111]">
                          {inv.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* PAYMENTS TAB */}
              {activeTab === "payments" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">
                      Payment History ({customer.payments?.length || 0})
                    </span>
                  </div>

                  {!customer.payments || customer.payments.length === 0 ? (
                    <div className="py-12 text-center border-2 border-dashed border-[#E5E5E5] rounded-2xl p-6 bg-[#FAFAFA]">
                      <CreditCard size={28} className="mx-auto mb-2 text-[#6B6B6B]" />
                      <p className="text-sm font-semibold text-[#111111]">No payment history</p>
                      <p className="text-xs text-[#6B6B6B] mt-1">Received payment receipts will show here.</p>
                    </div>
                  ) : (
                    customer.payments.map((p) => (
                      <div key={p.id} className="p-4 rounded-xl border border-[#E5E5E5] bg-white flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-[#111111]">${p.amount.toLocaleString()}</h4>
                          <p className="text-xs text-[#6B6B6B]">{p.method} • {new Date(p.paidAt).toLocaleDateString()}</p>
                        </div>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#E9F7EE] text-[#111111]">
                          {p.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>
          </>
        )}
      </div>
    </div>
  );
}
