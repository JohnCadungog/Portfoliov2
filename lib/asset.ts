/** Prefix for files in /public, so the site also works under a sub-path or relative base. */
const BASE = process.env.NEXT_PUBLIC_ASSET_BASE ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE}${path}`;

/** Static previews have no server routes, so career switches keep the current URL. */
export const updatesUrl = process.env.NEXT_PUBLIC_PREVIEW !== "1";
