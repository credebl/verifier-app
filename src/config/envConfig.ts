const { PUBLIC_BASE_URL, PUBLIC_ORGNAME, PUBLIC_CRYPTO_PRIVATE_KEY, PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_JWT_SECRET, PUBLIC_ORGID, PUBLIC_EMAIL, PUBLIC_PASSWORD, PUBLIC_ORG_LOGO }: any = globalThis

export const envConfig = {
  PUBLIC_BASE_URL:
    PUBLIC_BASE_URL || import.meta.env.PUBLIC_BASE_URL,
  PUBLIC_CRYPTO_PRIVATE_KEY:
    PUBLIC_CRYPTO_PRIVATE_KEY ||
    import.meta.env.PUBLIC_CRYPTO_PRIVATE_KEY,
  PUBLIC_SUPABASE_URL:
    PUBLIC_SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_KEY:
    PUBLIC_SUPABASE_KEY || import.meta.env.PUBLIC_SUPABASE_KEY,
  PUBLIC_SUPABASE_JWT_SECRET:
    PUBLIC_SUPABASE_JWT_SECRET ||
    import.meta.env.PUBLIC_SUPABASE_JWT_SECRET,
  PUBLIC_ORGID: PUBLIC_ORGID || import.meta.env.PUBLIC_ORGID,
  PUBLIC_EMAIL: PUBLIC_EMAIL || import.meta.env.PUBLIC_EMAIL,
  PUBLIC_PASSWORD:
    PUBLIC_PASSWORD || import.meta.env.PUBLIC_PASSWORD,
  PUBLIC_ORGNAME:
    PUBLIC_ORGNAME ||
    import.meta.env.PUBLIC_ORGNAME,
  PUBLIC_ORG_LOGO:
    PUBLIC_ORG_LOGO ||
    import.meta.env.PUBLIC_ORG_LOGO
};
