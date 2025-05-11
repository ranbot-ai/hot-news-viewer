import axios from "axios";
import { NewsCardProps } from "../../components/NewsCard";

const NETEASE_DOMAIN = process.env.NETEASE_DOMAIN;
const NETEASE_API = process.env.NETEASE_API_URL;
if (!NETEASE_DOMAIN || !NETEASE_API) {
  throw new Error("Missing required Netease environment variables.");
}
const NETEASE_DOMAIN_SAFE = NETEASE_DOMAIN as string;
const NETEASE_API_SAFE = NETEASE_API as string;

export async function fetchNeteaseNews(): Promise<NewsCardProps[]> {
  const response = await axios.get(NETEASE_API_SAFE, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Referer: NETEASE_DOMAIN_SAFE,
    },
  });
  const list = response.data?.data?.list || [];

  return list.map((item: any, idx: number) => ({
    title: item.title,
    position: idx + 1,
    coverImg: item.imgsrc || item.recImgsrc || (item.picInfo?.[0]?.url ?? ""),
    link: item.url,
    eventDate: item.publishTime || item.ptime || item.createTime || "",
    source: item.source,
  }));
}
