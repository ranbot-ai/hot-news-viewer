import axios from "axios";

export interface NewsItem {
  title: string;
  position: number;
  rank?: number;
  link?: string;
  videoCount?: number;
  coverImg: string;
  hotValue: number;
  eventDate: string;
  owner?: {
    name: string;
    avatar: string;
  };
}

const DOUYIN_DOMAIN = process.env.DOUYIN_DOMAIN;
const DOUYIN_API = process.env.DOUYIN_API_URL;
if (!DOUYIN_DOMAIN || !DOUYIN_API) {
  throw new Error("Missing required Douyin environment variables.");
}
const DOUYIN_DOMAIN_SAFE = DOUYIN_DOMAIN as string;
const DOUYIN_API_SAFE = DOUYIN_API as string;

export async function fetchDouyinNews(): Promise<NewsItem[]> {
  const response = await axios.get(DOUYIN_API_SAFE, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Referer: DOUYIN_DOMAIN_SAFE,
    },
  });

  const word = response.data?.data?.word_list || [];
  const activeTime = response.data?.data?.active_time || "";

  return word.map((item: any) => ({
    title: item.word,
    link: `${DOUYIN_DOMAIN_SAFE}/search/${item.word}`,
    position: item.position,
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
    owner: undefined, // Douyin does not provide owner info in this API
  }));
}
