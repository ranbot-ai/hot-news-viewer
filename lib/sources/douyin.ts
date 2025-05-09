import axios from "axios";

export interface NewsItem {
  title: string;
  rank: number;
  videoCount: number;
  coverImg: string;
  hotValue: number;
  eventDate: string;
}

const DOUYIN_API = "https://www.douyin.com/aweme/v1/web/hot/search/list/";

export async function fetchDouyinNews(): Promise<NewsItem[]> {
  const response = await axios.get(DOUYIN_API, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Referer: "https://www.douyin.com/",
    },
  });
  const trending = response.data?.data?.trending_list || [];
  const word = response.data?.data?.word_list || [];
  const activeTime = response.data?.data?.active_time || "";
  // Combine and deduplicate
  const combined = [...trending, ...word];
  const seen = new Set();
  const deduped = combined.filter((item) => {
    if (!item.word || seen.has(item.word)) return false;
    seen.add(item.word);
    return true;
  });
  return deduped.map((item: any) => ({
    title: item.word,
    rank: item.max_rank,
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
}
