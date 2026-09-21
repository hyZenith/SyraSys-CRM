import { config } from "dotenv";
import path from "path";
config({ path: path.resolve(process.cwd(), "../../.env") });

import { Pool } from "pg";
import { hashPassword } from "@better-auth/utils/password";
import { randomUUID } from "crypto";

const ADMIN_EMAIL = "admin@syracrm.com";
const ADMIN_PASSWORD = "AdminPassword123!";
const ADMIN_NAME = "Admin User";
const ADMIN_ROLE = "Admin";

async function main(): Promise<void> {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    await pool.query(
      `DELETE FROM "Account" WHERE "userId" IN (SELECT id FROM "User" WHERE email = $1)`,
      [ADMIN_EMAIL],
    );
    await pool.query(
      `DELETE FROM "Session"  WHERE "userId" IN (SELECT id FROM "User" WHERE email = $1)`,
      [ADMIN_EMAIL],
    );
    await pool.query(`DELETE FROM "User" WHERE email = $1`, [ADMIN_EMAIL]);

    const userId = randomUUID();
    const accountId = randomUUID();
    const now = new Date();

    // Use Better Auth's OWN hashPassword — guarantees the format that
    // verifyPassword() in @better-auth/utils accepts.
    const passwordHash = await hashPassword(ADMIN_PASSWORD);

    await pool.query(
      `INSERT INTO "User" (id, email, name, "emailVerified", role, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, true, $4, $5, $5)`,
      [userId, ADMIN_EMAIL, ADMIN_NAME, ADMIN_ROLE, now],
    );

    await pool.query(
      `INSERT INTO "Account" (id, "userId", "accountId", "providerId", password, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, 'credential', $4, $5, $5)`,
      [accountId, userId, userId, passwordHash, now],
    );

    console.log(`\n✅ Admin user seeded successfully!\n`);
    console.log(`   Email:    ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log(`   Role:     ${ADMIN_ROLE}`);

    // Seed Leads
    await pool.query(`DELETE FROM "Lead"`);

    const sampleLeads = [
      {
        id: randomUUID(),
        status: "Contacted",
        tag: "New lead",
        company: "Aster Labs",
        description: "Healthcare startup. CRM implementation and lead automation.",
        dueDate: "13 May",
        links: ["https://asterlabs.com/brief", "https://asterlabs.com/specs"],
        comments: ["Admin Note: High value healthcare client", "Follow up on Monday"],
        assignedUserId: userId,
        assigneeName: "Mateo Petty",
        assigneeRole: "Lead Manager",
        assigneeAvatar: "https://i.pravatar.cc/150?u=mateo",
      },
      {
        id: randomUUID(),
        status: "Contacted",
        tag: "Returning",
        company: "Nova Retail",
        description: "Ecommerce brand. Paid ads and conversion optimization.",
        dueDate: "25 May",
        links: ["https://novaretail.com/deck"],
        comments: ["Admin Note: Previous client returning for Q3 push"],
        assignedUserId: null,
        assigneeName: null,
        assigneeRole: null,
        assigneeAvatar: null,
      },
      {
        id: randomUUID(),
        status: "Negotiation",
        tag: "Priority",
        company: "PulseWorks",
        description: "Wellness startup. Membership platform and booking automation.",
        dueDate: "13 May",
        links: ["https://pulseworks.io/rfp", "https://pulseworks.io/pricing"],
        comments: ["Admin Note: Contract sent, pending sign-off from VP"],
        assignedUserId: userId,
        assigneeName: "Aysha Hayes",
        assigneeRole: "Sales Manager",
        assigneeAvatar: "https://i.pravatar.cc/150?u=aysha",
      },
    ];

    for (const lead of sampleLeads) {
      await pool.query(
        `INSERT INTO "Lead" (
          id, status, tag, company, description, "dueDate", links, comments,
          "assignedUserId", "assigneeName", "assigneeRole", "assigneeAvatar",
          "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $13)`,
        [
          lead.id,
          lead.status,
          lead.tag,
          lead.company,
          lead.description,
          lead.dueDate,
          lead.links,
          lead.comments,
          lead.assignedUserId,
          lead.assigneeName,
          lead.assigneeRole,
          lead.assigneeAvatar,
          now,
        ],
      );
    }

    console.log(`\n✅ ${sampleLeads.length} sample leads seeded successfully into the database!\n`);

    // Seed Customers
    await pool.query(`DELETE FROM "Payment"`);
    await pool.query(`DELETE FROM "Invoice"`);
    await pool.query(`DELETE FROM "Nda"`);
    await pool.query(`DELETE FROM "Contract"`);
    await pool.query(`DELETE FROM "Customer"`);

    const customer1Id = randomUUID();
    const customer2Id = randomUUID();
    const customer3Id = randomUUID();

    const sampleCustomers = [
      {
        id: customer1Id,
        name: "Acme Healthcare",
        company: "Acme Corp",
        email: "contact@acmehealth.com",
        phone: "+1 (555) 234-5678",
        status: "Active",
        tag: "Enterprise",
        description: "Enterprise healthcare account with multi-year contract.",
        assignedUserId: userId,
        assigneeName: "Mateo Petty",
        assigneeRole: "Lead Manager",
        assigneeAvatar: "https://i.pravatar.cc/150?u=mateo",
      },
      {
        id: customer2Id,
        name: "PulseWorks Global",
        company: "PulseWorks",
        email: "billing@pulseworks.io",
        phone: "+1 (555) 987-6543",
        status: "VIP",
        tag: "Client",
        description: "High volume digital wellness platform.",
        assignedUserId: userId,
        assigneeName: "Aysha Hayes",
        assigneeRole: "Sales Manager",
        assigneeAvatar: "https://i.pravatar.cc/150?u=aysha",
      },
      {
        id: customer3Id,
        name: "Nova Retail Group",
        company: "Nova Retail",
        email: "info@novaretail.com",
        phone: "+1 (555) 456-7890",
        status: "Onboarding",
        tag: "SMB",
        description: "E-commerce expansion project.",
        assignedUserId: null,
        assigneeName: null,
        assigneeRole: null,
        assigneeAvatar: null,
      },
    ];

    for (const cust of sampleCustomers) {
      await pool.query(
        `INSERT INTO "Customer" (
          id, name, company, email, phone, status, tag, description,
          "assignedUserId", "assigneeName", "assigneeRole", "assigneeAvatar",
          "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $13)`,
        [
          cust.id,
          cust.name,
          cust.company,
          cust.email,
          cust.phone,
          cust.status,
          cust.tag,
          cust.description,
          cust.assignedUserId,
          cust.assigneeName,
          cust.assigneeRole,
          cust.assigneeAvatar,
          now,
        ]
      );
    }

    // Seed Contract for Customer 1 & 2
    const contract1Id = randomUUID();
    await pool.query(
      `INSERT INTO "Contract" (id, "customerId", title, status, value, "startDate", "endDate", "documentUrl", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9)`,
      [
        contract1Id,
        customer1Id,
        "Master Services Agreement 2026",
        "Active",
        45000.0,
        new Date("2026-01-01"),
        new Date("2027-01-01"),
        "https://example.com/contracts/acme-msa.pdf",
        now,
      ]
    );

    // Seed NDA for Customer 1
    await pool.query(
      `INSERT INTO "Nda" (id, "customerId", title, status, "signedDate", "documentUrl", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $7)`,
      [
        randomUUID(),
        customer1Id,
        "Mutual Non-Disclosure Agreement",
        "Signed",
        new Date("2025-12-15"),
        "https://example.com/ndas/acme-nda.pdf",
        now,
      ]
    );

    // Seed Invoice for Customer 1
    const invoice1Id = randomUUID();
    await pool.query(
      `INSERT INTO "Invoice" (id, "customerId", "invoiceNumber", amount, status, "dueDate", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $7)`,
      [
        invoice1Id,
        customer1Id,
        "INV-2026-001",
        15000.0,
        "Paid",
        new Date("2026-02-01"),
        now,
      ]
    );

    // Seed Payment for Invoice 1
    await pool.query(
      `INSERT INTO "Payment" (id, "customerId", "invoiceId", amount, method, status, "paidAt", "createdAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $7)`,
      [
        randomUUID(),
        customer1Id,
        invoice1Id,
        15000.0,
        "Bank Transfer",
        "Completed",
        now,
      ]
    );

    console.log(`✅ ${sampleCustomers.length} sample customers with contracts, NDAs, invoices, and payments seeded successfully!\n`);
    console.log(`Log in at http://localhost:5173\n`);
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
