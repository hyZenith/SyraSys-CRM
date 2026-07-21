import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@syracrm/database/client";

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? "http://localhost:5173";
const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL ?? "http://localhost:4000";

export const auth = betterAuth({
  // Required: base URL of the API server (where /api/auth/* is mounted)
  baseURL: BETTER_AUTH_URL,

  // Required: accept requests originating from the frontend
  trustedOrigins: [FRONTEND_ORIGIN],

  // Required: used to sign sessions/cookies
  secret: process.env.BETTER_AUTH_SECRET ?? "dev-secret-change-this-in-production",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  advanced: {
    cookiePrefix: "syracrm",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh once per day
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = (typeof auth.$Infer.Session)["user"];
