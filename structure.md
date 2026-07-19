
### frontend 
`` 
apps/frontend/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── router.tsx
│   │
│   ├── providers/                  # ThemeProvider, QueryClientProvider, etc.
│   │   └── AppProviders.tsx
│   │
│   ├── pages/                      # route-level entry points only (thin)
│   │   ├── dashboard/
│   │   │   ├── DashboardPage.tsx
│   │   │   └── index.ts
│   │   ├── tasks/
│   │   ├── activity/
│   │   ├── customers/
│   │   └── settings/
│   │
│   ├── features/                   # matches design.md sections
│   │   ├── sidebar/
│   │   │   ├── components/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── SidebarNavItem.tsx
│   │   │   │   ├── MembersList.tsx
│   │   │   │   └── PriorityDealCard.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useActiveNavItem.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── topbar/
│   │   │   ├── components/
│   │   │   │   ├── Topbar.tsx
│   │   │   │   ├── SearchCustomerInput.tsx
│   │   │   │   └── AddCustomerButton.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── stats-overview/
│   │   │   ├── components/
│   │   │   │   ├── NewCustomersChartCard.tsx
│   │   │   │   ├── ActivityHeatmapCard.tsx
│   │   │   │   ├── KpiTile.tsx
│   │   │   │   └── ChartTooltip.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useNewCustomersData.ts
│   │   │   ├── api/
│   │   │   │   └── stats.queries.ts
│   │   │   └── index.ts
│   │   │
│   │   └── pipeline-board/
│   │       ├── components/
│   │       │   ├── PipelineBoard.tsx
│   │       │   ├── PipelineColumn.tsx
│   │       │   ├── DealCard.tsx
│   │       │   ├── StatusTag.tsx
│   │       │   └── DealCardFooter.tsx
│   │       ├── hooks/
│   │       │   └── useDeals.ts
│   │       ├── api/
│   │       │   └── deals.queries.ts
│   │       └── index.ts
│   │
│   ├── components/
│   │   └── shared/                 # cross-feature, non-generic-enough-for-packages/ui
│   │
│   ├── assets/                     # logos, icons not in ui package, fonts
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css              # palette from design.md as CSS vars
│   └── lib/                        # frontend-only glue (react-query client, etc.)
│       └── queryClient.ts
│
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
``