import type { NextApiRequest, NextApiResponse } from "next";
import { fetchBilibiliNews } from "../../lib/sources/bilibili";
import { ERROR_KEYS } from "../../lib/errors";
import { getApiTranslator } from "../../lib/i18nApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const t = await getApiTranslator(req);
  try {
    const news = await fetchBilibiliNews();
    res.status(200).json({ news });
  } catch (err) {
    res.status(500).json({ error: t(ERROR_KEYS.bilibili) });
  }
}
