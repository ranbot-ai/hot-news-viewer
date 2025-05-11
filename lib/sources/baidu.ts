import axios from "axios";
import * as cheerio from "cheerio";

export interface BaiduNewsItem {
  title: string;
  position: number;
  coverImg: string;
  hotValue: number | undefined;
  link: string;
  summary?: string;
}

export async function fetchBaiduNews(): Promise<BaiduNewsItem[]> {
  const url = process.env.BAIDU_NEWS_URL;
  if (!url) {
    throw new Error("Missing required BAIDU_NEWS_URL environment variable.");
  }
  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
    timeout: 10000,
    validateStatus: (status) => {
      return status >= 200 && status < 303;
    },
    proxy: false,
    maxRedirects: 5,
    maxContentLength: 10 * 1024 * 1024,
    maxBodyLength: 10 * 1024 * 1024,
    responseType: "arraybuffer",
    responseEncoding: "utf-8",
  });
  const $ = cheerio.load(html);
  const items: BaiduNewsItem[] = [];

  $(".category-wrap_iQLoo").each((i, el) => {
    const title = $(el).find("a .c-single-text-ellipsis").text().trim();
    const hotValue = parseInt(
      $(el).find(".hot-index_1Bl1a").text().replace(/,/g, ""),
      10
    );
    const coverImg = $(el).find("a.img-wrapper_29V76 img").attr("src") || "";
    const link = $(el).find("a.img-wrapper_29V76").attr("href") || "";
    const summary = $(el).find(".hot-desc_1m_jR").text().trim();

    items.push({
      title,
      position: i + 1,
      coverImg: coverImg,
      hotValue: isNaN(hotValue) ? undefined : hotValue,
      link,
      summary,
    });
  });

  return items;
}
