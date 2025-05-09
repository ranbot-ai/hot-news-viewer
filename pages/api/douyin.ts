import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const DOUYIN_API = "https://www.douyin.com/aweme/v1/web/hot/search/list/";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(DOUYIN_API, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Referer: "https://www.douyin.com/",
      },
    });
    const word = response.data?.data?.word_list || [];
    const activeTime = response.data?.data?.active_time || "";
    const normalized = word.map((item: any, idx: number) => ({
      title: item.word,
      rank: idx + 1,
      videoCount:
        typeof item.video_count === "number"
          ? item.video_count
          : Number(item.video_count) || 0,
      coverImg: item.word_cover?.url_list?.[0] || "",
      hotValue:
        typeof item.hot_value === "number"
          ? item.hot_value
          : Number(item.hot_value) || 0,
      eventDate: item.event_time || activeTime || "",
    }));
    res.status(200).json({ news: normalized });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Douyin hot news." });
  }
}
