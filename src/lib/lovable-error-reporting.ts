// Lovable error reporting disabled for clean production deployment
export function reportLovableError(error: unknown, context: Record<string, unknown> = {}) {
  if (import.meta.env.DEV) {
    console.debug("[error-reporter]", error, context);
  }
}
