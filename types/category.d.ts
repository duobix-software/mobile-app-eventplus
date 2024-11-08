interface Category {
  slug: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  tags?: any[]
  category_url: string;
  tags_url: string;
}

export { Category };
