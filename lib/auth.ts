export function safeRedirectPath(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return "/account";
  }

  try {
    const url = new URL(value, "https://decor-plants.invalid");
    if (url.origin !== "https://decor-plants.invalid") return "/account";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/account";
  }
}
