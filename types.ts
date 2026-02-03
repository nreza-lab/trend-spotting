export interface NewsItem {
  title: string;
  url: string;
  source: string;
  imageUrl?: string;
}

export interface TrendItem {
  id: string; // generated unique id
  title: string;
  traffic: string;
  pubDate: string;
  mainPicture?: string;
  pictureSource?: string;
  newsItems: NewsItem[];
}

export interface FeedData {
  country: string;
  items: TrendItem[];
  lastUpdated: string;
}