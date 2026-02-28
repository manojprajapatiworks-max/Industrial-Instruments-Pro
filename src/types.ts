export type Category = {
  id: number;
  name: string;
  description: string;
};

export type Product = {
  id: number;
  category_id: number;
  category_name?: string;
  title: string;
  description: string;
  specifications: string;
  price: string;
  delivery_time: string;
  image_url: string;
  type: 'product' | 'service';
};

export type Request = {
  id: number;
  name: string;
  mobile: string;
  company: string;
  email: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  created_at: string;
};

export type Settings = {
  siteName: string;
  primaryColor: string;
  contactEmail: string;
  contactPhone: string;
  seoDescription: string;
  logoUrl?: string;
  [key: string]: string | undefined;
};
