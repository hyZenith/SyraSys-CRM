import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, FileText, Tag, User, Calendar, Link, MessageSquare, Save } from "lucide-react";
import { TagType } from "../../features/pipeline-board/api/deals.queries";
import { useAddDeal } from "../../features/pipeline-board/hooks/useAddDeal";

export function CreateLeadPage() {
  const navigate = useNavigate();
  const { mutate: addDeal, isPending } = useAddDeal();

  const [formData, setFormData] = useState({
    company: "",
    description: "",
    tag: "New lead" as TagType,
    assigneeName: "",
    assigneeRole: "",
    dueDate: "",
    linksText: "",
    commentsText: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedLinks = formData.linksText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const parsedComments = formData.commentsText
      .split("\n")
      .map((c) => c.trim())
      .filter(Boolean);

    addDeal(
      {
        status: "Contacted",
        company: formData.company,
        description: formData.description,
        tag: formData.tag,
        dueDate: formData.dueDate || "Today",
        links: parsedLinks,
        comments: parsedComments,
        assignee: formData.assigneeName
          ? {
              name: formData.assigneeName,
              role: formData.assigneeRole,
              avatar: `https://i.pravatar.cc/150?u=${formData.assigneeName.replace(/\s+/g, "")}`,
            }
          : undefined,
      },
      {
        onSuccess: () => {
          void navigate("/leads");
        },
      },
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 max-w-4xl mx-auto">
      {/* Back Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => void navigate("/leads")}
          className="p-2 rounded-xl bg-white border border-[#E5E5E5] text-[#111111] hover:bg-[#F2F2F2] transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Create New Lead</h1>
          <p className="text-sm text-[#6B6B6B]">Fill in the details below to add a new lead to your pipeline.</p>
        </div>
      </div>

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E5E5E5] p-8 shadow-sm space-y-6">

        {/* Company Name */}
        <div>
          <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
            Company Name *
          </label>
          <div className="relative">
            <Building2 size={18} className="absolute left-3.5 top-3.5 text-[#6B6B6B]" />
            <input
              required
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Acme Corp"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111]"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
            Description *
          </label>
          <div className="relative">
            <FileText size={18} className="absolute left-3.5 top-3.5 text-[#6B6B6B]" />
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the lead details and background..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111] resize-none"
            />
          </div>
        </div>

        {/* Lead Type */}
        <div>
          <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
            Lead Type
          </label>
          <div className="relative">
            <Tag size={18} className="absolute left-3.5 top-3.5 text-[#6B6B6B]" />
            <select
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111] bg-white appearance-none"
            >
              <option value="New lead">New lead</option>
              <option value="Priority">Priority</option>
              <option value="Follow-up">Follow-up</option>
            </select>
          </div>
        </div>

        {/* Assignment */}
        <div className="pt-4 border-t border-[#E5E5E5] space-y-4">
          <h3 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">Assignment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1">Assignee Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-3.5 text-[#6B6B6B]" />
                <input
                  type="text"
                  name="assigneeName"
                  value={formData.assigneeName}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Connor"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1">Assignee Role</label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-3.5 text-[#6B6B6B]" />
                <input
                  type="text"
                  name="assigneeRole"
                  value={formData.assigneeRole}
                  onChange={handleChange}
                  placeholder="e.g. Account Executive"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="pt-4 border-t border-[#E5E5E5] space-y-4">
          <h3 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">Metadata & Notes</h3>

          {/* Due Date */}
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1">Due Date</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3.5 top-3.5 text-[#6B6B6B]" />
              <input
                type="text"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                placeholder="e.g. 13 May"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111]"
              />
            </div>
          </div>

          {/* Resource Links */}
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1">
              Resource Links <span className="text-[#6B6B6B] font-normal">(one per line)</span>
            </label>
            <div className="relative">
              <Link size={18} className="absolute left-3.5 top-3.5 text-[#6B6B6B]" />
              <textarea
                name="linksText"
                value={formData.linksText}
                onChange={handleChange}
                rows={3}
                placeholder={"https://example.com/project-brief\nhttps://example.com/deck"}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111] resize-none font-mono"
              />
            </div>
          </div>

          {/* Admin Comments */}
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1">
              Admin Comments <span className="text-[#6B6B6B] font-normal">(internal deal notes)</span>
            </label>
            <div className="relative">
              <MessageSquare size={18} className="absolute left-3.5 top-3.5 text-[#6B6B6B]" />
              <textarea
                name="commentsText"
                value={formData.commentsText}
                onChange={handleChange}
                rows={3}
                placeholder="Add important admin comments about this deal..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E5E5E5]">
          <button
            type="button"
            onClick={() => void navigate("/leads")}
            className="px-6 py-3 rounded-xl border border-[#E5E5E5] text-sm font-semibold text-[#6B6B6B] hover:bg-[#F2F2F2] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 rounded-xl bg-[#111111] text-white text-sm font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Save size={16} /> {isPending ? "Saving..." : "Save Lead"}
          </button>
        </div>
      </form>
    </div>
  );
}
