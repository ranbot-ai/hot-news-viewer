import axios from "axios";
import { NewsCardProps } from "../../components/NewsCard";

const NETEASE_DOMAIN = "https://m.163.com";
const NETEASE_API = `${NETEASE_DOMAIN}/fe/api/hot/news/flow`;

export async function fetchNeteaseNews(): Promise<NewsCardProps[]> {
  const response = await axios.get(NETEASE_API, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Referer: NETEASE_DOMAIN,
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
