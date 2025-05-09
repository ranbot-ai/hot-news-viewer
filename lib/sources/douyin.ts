import axios from "axios";

export interface NewsItem {
  title: string;
  rank: number;
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

const DOUYIN_API = "https://www.douyin.com/aweme/v1/web/hot/search/list/";

export async function fetchDouyinNews(): Promise<NewsItem[]> {
  const response = await axios.get(DOUYIN_API, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Referer: "https://www.douyin.com/",
    },
  });
  const word = response.data?.data?.word_list || [];
  const activeTime = response.data?.data?.active_time || "";
  return word.map((item: any, idx: number) => ({
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
    owner: undefined, // Douyin does not provide owner info in this API
  }));
}
