import type { NextApiRequest, NextApiResponse } from "next";
import { fetchNeteaseNews } from "../../lib/sources/netease";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const news = await fetchNeteaseNews();
    res.status(200).json({ news });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch 163 hot news." });
  }
}
