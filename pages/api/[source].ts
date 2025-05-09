import type { NextApiRequest, NextApiResponse } from "next";

// Define a type for our news items
type NewsItem = {
  id: string;
  title: string;
  content?: string;
  url?: string;
  timestamp?: string;
  source: string;
};

// Mock function to replace the missing module
const fetchDouyinNews = async (): Promise<NewsItem[]> => {
  return [
    {
      id: "1",
      title: "Sample Douyin News",
      content: "This is a placeholder for Douyin news content",
      timestamp: new Date().toISOString(),
      source: "douyin",
    },
  ];
};

const SOURCES: Record<string, () => Promise<NewsItem[]>> = {
  douyin: fetchDouyinNews,
  // Add more sources here, e.g. 'weibo': fetchWeiboNews
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { source } = req.query;
  const sourceKey = Array.isArray(source) ? source[0] : source;
  const fetcher = sourceKey && SOURCES[sourceKey.toLowerCase()];
  if (!fetcher) {
    res.status(400).json({ error: "Unknown or unsupported source." });
    return;
  }
  try {
    const news = await fetcher();
    res.status(200).json({ news });
  } catch (err) {
    res
      .status(500)
      .json({ error: `Failed to fetch news for source: ${sourceKey}` });
  }
}
