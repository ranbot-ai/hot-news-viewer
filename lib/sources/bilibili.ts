import axios from "axios";

export interface NewsItem {
  title: string;
  rank: number;
  link?: string;
  viewsCount?: number;
  likesCount?: number;
  commentsCount?: number;
  rcmdReason?: string;
  pubLocation?: string;
  coverImg: string;
  hotValue: number;
  eventDate: string;
  owner?: {
    name: string;
    avatar: string;
  };
}

const BILIBILI_DOMAIN = "https://www.bilibili.com";
const BILIBILI_API_DOMAIN = "https://api.bilibili.com";
const BILIBILI_API = `${BILIBILI_API_DOMAIN}/x/web-interface/popular?ps=50&pn=1`;

export async function fetchBilibiliNews(): Promise<NewsItem[]> {
  const response = await axios.get(BILIBILI_API, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Referer: BILIBILI_DOMAIN,
    },
  });

  const list = response.data?.data?.list || [];
  return list.map((item: any, idx: number) => ({
    title: item.title,
    position: idx + 1,
    link: `${BILIBILI_DOMAIN}/video/${item.bvid}`,
    viewsCount:
      typeof item.stat?.view === "number"
        ? item.stat.view
        : Number(item.stat?.view) || 0,
    likesCount:
      typeof item.stat?.like === "number"
        ? item.stat.like
        : Number(item.stat?.like) || 0,
    commentsCount:
      typeof item.stat?.reply === "number"
        ? item.stat.reply
        : Number(item.stat?.reply) || 0,
    rcmdReason: item.rcmd_reason?.reason || "",
    pubLocation: item.pub_location || "",
    coverImg: item.cover43 || "",
    hotValue:
      typeof item.stat?.like === "number"
        ? item.stat.like
        : Number(item.stat?.like) || 0,
    eventDate: item.pubdate || "", // pubdate is a unix timestamp (seconds)
    owner: {
      name: item.owner?.name || "",
      avatar: item.owner?.face || "",
    },
  }));
}
