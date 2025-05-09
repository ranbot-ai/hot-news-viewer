import type { NextApiRequest, NextApiResponse } from "next";
import { fetchDouyinNews } from "../../lib/sources/douyin";
import { ERROR_KEYS } from "../../lib/errors";
import { getApiTranslator } from "../../lib/i18nApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const t = (await getApiTranslator(req)) || ((k: string) => k);
  try {
    const news = await fetchDouyinNews();
    res.status(200).json({ news });
  } catch (err) {
    res.status(500).json({ error: t(ERROR_KEYS.douyin) });
  }
}
