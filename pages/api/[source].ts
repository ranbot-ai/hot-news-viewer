import type { NextApiRequest, NextApiResponse } from "next";
import { fetchDouyinNews } from "../../lib/sources/douyin";

const SOURCES: Record<string, () => Promise<any[]>> = {
  douyin: fetchDouyinNews,
  // Add more sources here, e.g. 'weibo': fetchWeiboNews
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { source } = req.query;
  const sourceKey = Array.isArray(source) ? source[0] : source;
  const fetcher = sourceKey && SOURCES[sourceKey.toLowerCase()];
  if (!fetcher) {
    res.status(400).json({ error: "Unknown or unsupported source." });
    return;
  }
  try {
    const news = await fetcher();
    res.status(200).json({ news });
  } catch (err) {
    res
      .status(500)
      .json({ error: `Failed to fetch news for source: ${sourceKey}` });
  }
}
