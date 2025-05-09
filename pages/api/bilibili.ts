import type { NextApiRequest, NextApiResponse } from "next";
import { fetchBilibiliNews } from "../../lib/sources/bilibili";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const news = await fetchBilibiliNews();
    res.status(200).json({ news });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Bilibili hot news." });
  }
}
