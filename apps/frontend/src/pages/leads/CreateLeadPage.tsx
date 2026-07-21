import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
    <div className="flex flex-col h-full pt-8 pl-8 pr-8 max-w-4xl">
      {/* Header with back navigation */}
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => {
            void navigate("/leads");
          }}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Back to leads"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)]">Create New Lead</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below to add a new lead to your pipeline.
          </p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              General Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Acme Corp"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the lead details and background..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/5"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lead Type</label>
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/5"
              >
                <option value="New lead">New lead</option>
                <option value="Returning">Returning</option>
                <option value="Priority">Priority</option>
                <option value="Follow-up">Follow-up</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Assignment Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignee Name
                </label>
                <input
                  type="text"
                  name="assigneeName"
                  value={formData.assigneeName}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Connor"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignee Role
                </label>
                <input
                  type="text"
                  name="assigneeRole"
                  value={formData.assigneeRole}
                  onChange={handleChange}
                  placeholder="e.g. Account Executive"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/5"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Metadata & Notes</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="text"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                placeholder="e.g. 13 May"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resource Links{" "}
                <span className="text-xs text-gray-400 font-normal">
                  (Paste URLs, one per line)
                </span>
              </label>
              <textarea
                name="linksText"
                value={formData.linksText}
                onChange={handleChange}
                rows={3}
                placeholder="https://example.com/project-brief&#10;https://example.com/deck"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/5 font-mono text-sm"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Comments{" "}
                <span className="text-xs text-gray-400 font-normal">
                  (Important deal notes for admins)
                </span>
              </label>
              <textarea
                name="commentsText"
                value={formData.commentsText}
                onChange={handleChange}
                rows={3}
                placeholder="Add important admin comments about this deal..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/5"
              ></textarea>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-4 border-t flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                void navigate("/leads");
              }}
              className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 bg-[var(--color-ink)] text-white font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {isPending ? "Saving..." : "Save Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
