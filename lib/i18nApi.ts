import { i18n } from "next-i18next";
import i18nextConfig from "../next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { NextApiRequest } from "next";

export async function getApiTranslator(req: NextApiRequest) {
  const lang =
    req.cookies?.NEXT_LOCALE ||
    req.headers["accept-language"]?.split(",")[0] ||
    i18nextConfig.i18n.defaultLocale;

  await serverSideTranslations(lang, ["common"]);
  return i18n?.getFixedT(lang, "common");
}
