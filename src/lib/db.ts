import "reflect-metadata";
import { DataSource, EntitySchema } from "typeorm";

// ── Entities (EntitySchema — no decorators, SWC-safe) ──

export const ClientProfile = new EntitySchema({
  name: "ClientProfile",
  tableName: "client_profiles",
  columns: {
    id: { type: "int", primary: true, generated: "increment" },
    businessName: { type: "varchar", name: "business_name", nullable: true },
    category: { type: "varchar", nullable: true },
    email: { type: "varchar", nullable: true },
    city: { type: "varchar", nullable: true },
    password: { type: "varchar", nullable: true },
    createdAt: {
      type: "timestamp",
      name: "created_at",
      createDate: true,
    },
  },
});

export const OnboardingSubmission = new EntitySchema({
  name: "OnboardingSubmission",
  tableName: "onboarding_submissions",
  columns: {
    id: { type: "int", primary: true, generated: "increment" },
    businessName: { type: "varchar", name: "business_name", nullable: true },
    category: { type: "varchar", nullable: true },
    phone: { type: "varchar", nullable: true },
    email: { type: "varchar", nullable: true },
    website: { type: "varchar", nullable: true },
    address: { type: "varchar", nullable: true },
    city: { type: "varchar", nullable: true },
    state: { type: "varchar", nullable: true },
    zip: { type: "varchar", nullable: true },
    description: { type: "text", nullable: true },
    services: { type: "text", nullable: true },
    keywords: { type: "text", nullable: true },
    customKeywords: { type: "text", name: "custom_keywords", nullable: true },
    gbpOption: { type: "varchar", name: "gbp_option", nullable: true },
    weekdayOpen: { type: "varchar", name: "weekday_open", nullable: true },
    weekdayClose: { type: "varchar", name: "weekday_close", nullable: true },
    saturdayOpen: { type: "varchar", name: "saturday_open", nullable: true },
    saturdayClose: { type: "varchar", name: "saturday_close", nullable: true },
    keywordSearchReport: {
      type: "boolean",
      name: "keyword_search_report",
      default: false,
    },
    formData: { type: "jsonb", name: "form_data", nullable: true },
    repoName: { type: "varchar", name: "repo_name", nullable: true },
    createdAt: {
      type: "timestamp",
      name: "created_at",
      createDate: true,
    },
  },
});

export const ContactSubmission = new EntitySchema({
  name: "ContactSubmission",
  tableName: "contact_submissions",
  columns: {
    id: { type: "int", primary: true, generated: "increment" },
    name: { type: "varchar", nullable: true },
    email: { type: "varchar", nullable: true },
    serviceInterest: {
      type: "varchar",
      name: "service_interest",
      nullable: true,
    },
    message: { type: "text", nullable: true },
    createdAt: {
      type: "timestamp",
      name: "created_at",
      createDate: true,
    },
  },
});

export const EmailSignup = new EntitySchema({
  name: "EmailSignup",
  tableName: "email_signups",
  columns: {
    id: { type: "int", primary: true, generated: "increment" },
    email: { type: "varchar" },
    createdAt: {
      type: "timestamp",
      name: "created_at",
      createDate: true,
    },
  },
});

// ── Singleton DataSource ──

let ds: DataSource | null = null;

function parseDbUrl(raw: string) {
  const withoutProtocol = raw.replace(/^postgresql:\/\//, "");
  const atIdx = withoutProtocol.lastIndexOf("@");
  const creds = withoutProtocol.substring(0, atIdx);
  const rest = withoutProtocol.substring(atIdx + 1);
  const colonIdx = creds.indexOf(":");
  const [hostPort, database] = rest.split("/");
  const [host, portStr] = hostPort.split(":");
  return {
    username: creds.substring(0, colonIdx),
    password: creds.substring(colonIdx + 1),
    host,
    port: parseInt(portStr, 10),
    database,
  };
}

export async function getDataSource(): Promise<DataSource> {
  if (ds && ds.isInitialized) return ds;

  const conn = parseDbUrl(process.env.DATABASE_URL!);

  ds = new DataSource({
    type: "postgres",
    host: conn.host,
    port: conn.port,
    username: conn.username,
    password: conn.password,
    database: conn.database,
    synchronize: true,
    logging: false,
    entities: [ClientProfile, OnboardingSubmission, ContactSubmission, EmailSignup],
    ssl: { rejectUnauthorized: false },
  });

  await ds.initialize();
  return ds;
}
