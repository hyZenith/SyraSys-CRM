export function MembersList() {
  const members = [
    {
      id: 1,
      name: "Scarlett Floyd",
      role: "Project Manager",
      avatar: "https://i.pravatar.cc/150?u=scarlett",
    },
    {
      id: 2,
      name: "Aysha Hayes",
      role: "Sales Manager",
      avatar: "https://i.pravatar.cc/150?u=aysha",
    },
    {
      id: 3,
      name: "Lawrence Patterson",
      role: "Account Manager",
      avatar: "https://i.pravatar.cc/150?u=lawrence",
    },
    {
      id: 4,
      name: "Mateo Petty",
      role: "Lead Manager",
      avatar: "https://i.pravatar.cc/150?u=mateo",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-[var(--color-ink)] text-lg font-medium px-2">Members</h3>
      <div className="space-y-3 px-2">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-10 h-10 rounded-full object-cover bg-gray-100 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[var(--color-ink)] font-medium text-sm truncate">{member.name}</p>
              <p className="text-[var(--color-muted)] text-xs truncate">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
