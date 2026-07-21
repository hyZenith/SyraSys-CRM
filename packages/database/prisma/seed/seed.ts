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
    // Remove existing admin with wrong hash (if any)
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
    console.log(`Log in at http://localhost:5173\n`);
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
