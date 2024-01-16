export const envConfig = {
  PUBLIC_BASE_URL:
    globalThis.PUBLIC_BASE_URL || import.meta.env.PUBLIC_BASE_URL,
  PUBLIC_CRYPTO_PRIVATE_KEY:
    globalThis.PUBLIC_CRYPTO_PRIVATE_KEY ||
    import.meta.env.PUBLIC_CRYPTO_PRIVATE_KEY,
  PUBLIC_SUPABASE_URL:
    globalThis.PUBLIC_SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_KEY:
    globalThis.PUBLIC_SUPABASE_KEY || import.meta.env.PUBLIC_SUPABASE_KEY,
  PUBLIC_SUPABASE_JWT_SECRET:
    globalThis.PUBLIC_SUPABASE_JWT_SECRET ||
    import.meta.env.PUBLIC_SUPABASE_JWT_SECRET,
  PUBLIC_ORGID: globalThis.PUBLIC_ORGID || import.meta.env.PUBLIC_ORGID,
  PUBLIC_EMAIL: globalThis.PUBLIC_EMAIL || import.meta.env.PUBLIC_EMAIL,
  PUBLIC_PASSWORD:
    globalThis.PUBLIC_PASSWORD || import.meta.env.PUBLIC_PASSWORD,
};
