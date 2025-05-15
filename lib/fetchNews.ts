import { fetchDouyinNews } from './sources/douyin';
import { fetchBilibiliNews } from './sources/bilibili';
import { fetchNeteaseNews } from './sources/netease';
import { fetchBaiduNews } from './sources/baidu';
import { NewsCardProps } from '../components/NewsCard';

function clean<T extends object>(obj: T): Partial<T> {
  // Remove keys with null or undefined values
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined)) as Partial<T>;
}

export async function fetchNews(sourceKey: string): Promise<NewsCardProps[]> {
  switch (sourceKey) {
    case 'douyin': {
      const news = await fetchDouyinNews();
      return news.map(item => clean({
        ...item,
        position: item.position ?? item.rank ?? 0,
        eventDate: item.eventDate ?? '',
      })) as NewsCardProps[];
    }
    case 'bilibili': {
      const news = await fetchBilibiliNews();
      return news.map(item => clean({
        ...item,
        position: item.rank ?? 0,
        eventDate: item.eventDate ?? '',
      })) as NewsCardProps[];
    }
    case 'netease': {
      const news = await fetchNeteaseNews();
      return news.map((item, idx) => clean({
        ...item,
        position: item.position ?? idx + 1,
        eventDate: item.eventDate ?? '',
        rank: item.rank,
        videoCount: item.videoCount,
        viewsCount: item.viewsCount,
        likesCount: item.likesCount,
        commentsCount: item.commentsCount,
        rcmdReason: item.rcmdReason,
        coverImg: item.coverImg,
        hotValue: item.hotValue,
        owner: item.owner,
        link: item.link,
        pubLocation: item.pubLocation,
        source: item.source,
      })) as NewsCardProps[];
    }
    case 'baidu': {
      const news = await fetchBaiduNews();
      return news.map((item, idx) => clean({
        title: item.title,
        position: item.position ?? idx + 1,
        coverImg: item.coverImg,
        hotValue: item.hotValue,
        eventDate: '',
        link: item.link,
      })) as NewsCardProps[];
    }
    default:
      return [];
  }
}