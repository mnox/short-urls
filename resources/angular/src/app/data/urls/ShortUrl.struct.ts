export interface ShortUrl {
  id: number;
  destination_url: string;
  short_url: string;
  default_short_url: string;
  visits: ShortUrlVisit[];
  visit_count: number;
  created_at: string;
}

export interface ShortUrlVisit {
  ip_address: string;
  operating_system: string;
  browser: string;
  browser_version: string;
  referer_url: string;
  visited_at: string;
}

export interface UploadResponseObject {
  success: boolean;
  error?: string;
  shortUrl?: ShortUrl;
  csvRow: any;
}
