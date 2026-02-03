import { TrendItem, NewsItem } from '../types';

/**
 * Parses a Google Trends RSS XML string into a structured array of TrendItems.
 */
export const parseTrendsXML = (xmlContent: string): TrendItem[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
  const items = xmlDoc.getElementsByTagName("item");
  
  const trends: TrendItem[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    const title = item.getElementsByTagName("title")[0]?.textContent || "Unknown Topic";
    const traffic = item.getElementsByTagName("ht:approx_traffic")[0]?.textContent || "N/A";
    const pubDate = item.getElementsByTagName("pubDate")[0]?.textContent || "";
    const mainPicture = item.getElementsByTagName("ht:picture")[0]?.textContent || "";
    const pictureSource = item.getElementsByTagName("ht:picture_source")[0]?.textContent || "";

    // Parse nested news items
    const newsNodes = item.getElementsByTagName("ht:news_item");
    const newsItems: NewsItem[] = [];

    for (let j = 0; j < newsNodes.length; j++) {
      const newsNode = newsNodes[j];
      const newsTitle = newsNode.getElementsByTagName("ht:news_item_title")[0]?.textContent || "";
      const newsUrl = newsNode.getElementsByTagName("ht:news_item_url")[0]?.textContent || "#";
      const newsSource = newsNode.getElementsByTagName("ht:news_item_source")[0]?.textContent || "";
      const newsPic = newsNode.getElementsByTagName("ht:news_item_picture")[0]?.textContent || undefined;

      if (newsTitle) {
        newsItems.push({
          title: newsTitle,
          url: newsUrl,
          source: newsSource,
          imageUrl: newsPic
        });
      }
    }

    // Use a stable ID based on the title to preserve component state (like expanded view) during auto-refresh
    const safeTitle = title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    trends.push({
      id: `trend-${i}-${safeTitle}`,
      title,
      traffic,
      pubDate,
      mainPicture: mainPicture || undefined,
      pictureSource: pictureSource || undefined,
      newsItems
    });
  }

  return trends;
};