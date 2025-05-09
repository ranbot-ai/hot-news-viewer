import axios from "axios";
import { NewsCardProps } from "../../components/NewsCard";

const NETEASE_API = "https://m.163.com/fe/api/hot/news/flow";

export async function fetchNeteaseNews(): Promise<NewsCardProps[]> {
  const response = await axios.get(NETEASE_API);
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
