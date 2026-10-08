export interface LinkItem {
  label: string;
  href: string;
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface ImageData {
  src: string;
  alt: string;
}

export interface SizedImageData extends ImageData {
  width: number;
  height: number;
}

export interface LogoData extends SizedImageData {
  href: string;
}

export interface Heading {
  main: string;
  highlight: string;
  middle?: string;
}

export interface IconItem {
  icon: string;
  title: string;
  description: string;
}

export interface GlobalData {
  companyName: string;
  logo: LogoData;
  contact: {
    address: string;
    addressHref: string;
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
    hours: string;
  };
  socials: { name: string; url: string; icon: string }[];
}

export interface HeaderData {
  logo: LogoData;
  menu: LinkItem[];
  cta: LinkItem;
}

export interface PageMeta {
  metaTitle: string;
  metaDescription: string;
}

export interface PageWithBanner extends PageMeta {
  banner: { title: string; breadcrumbs: Breadcrumb[] };
}

export interface PageBannersData {
  pages: {
    about: PageWithBanner;
    gallery: PageWithBanner;
    services: PageWithBanner;
    quote: PageWithBanner;
    contact: PageWithBanner;
    blogs: PageWithBanner;
    blogDetail: { bannerTitle: string };
    serviceDetails: { bannerTitle: string };
    thankYou: PageMeta;
  };
}

export interface HeroSlide {
  id: number;
  image: ImageData;
  badge: string;
  heading: Heading;
  description: string;
  cta: LinkItem;
}

export interface HeroBannerData {
  autoplayInterval: number;
  slides: HeroSlide[];
}

export interface AboutUsData {
  badge: string;
  heading: Heading;
  paragraphs: string[];
  experience: { value: string; label: string };
  images: { main: SizedImageData; secondary: SizedImageData };
  features: IconItem[];
  cta: LinkItem;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  price: string;
  href: string;
  slug: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  metaDescription: string;
  overview: {
    heading: Heading;
    description: string;
    images: { main: ImageData; secondary: ImageData };
    highlights: IconItem[];
  };
  process: {
    heading: Heading;
    steps: IconItem[];
    images: ImageData[];
  };
}

export interface ServiceDetailsData {
  bannerTitle: string;
  overviewBadge: string;
  processBadge: string;
  list: ServiceDetail[];
}

export interface ServicesData {
  badge: string;
  heading: Heading;
  description: string;
  priceUnit: string;
  detailsLabel: string;
  list: ServiceItem[];
  serviceDetails: ServiceDetailsData;
}

export interface WhyChooseUsData {
  badge: string;
  heading: Heading;
  description: string;
  list: IconItem[];
}

export interface StatItem {
  icon: string;
  value: number;
  decimals: number;
  suffix: string;
  label: string;
}

export interface StatsData {
  badge: string;
  heading: Heading;
  description: string;
  background: ImageData;
  list: StatItem[];
}

export interface GalleryPageData {
  badge: string;
  heading: Heading;
  description: string;
  perPage: number;
  list: ImageData[];
}

export interface GalleryData {
  badge: string;
  heading: Heading;
  description: string;
  rows: ImageData[][];
  page: GalleryPageData;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface TestimonialsData {
  badge: string;
  heading: Heading;
  description: string;
  autoplayInterval: number;
  list: Testimonial[];
}

export interface BlogPost {
  id: number;
  slug: string;
  tag: string;
  category: string;
  date: string;
  title: string;
  titleHighlight: string;
  excerpt: string;
  image: ImageData;
  content: {
    intro: string;
    sections: { heading: string; body: string }[];
    conclusionHeading: string;
    conclusion: string;
  };
}

export interface BlogSidebarData {
  searchTitle: string;
  searchPlaceholder: string;
  recentTitle: string;
  recentCount: number;
  categoriesTitle: string;
  categoryEmptyLabel: string;
  categories: string[];
  cta: {
    badge: string;
    heading: Heading;
    description: string;
    image: ImageData;
    button: LinkItem;
  };
}

export interface BlogNewsData {
  badge: string;
  heading: Heading;
  description: string;
  readMoreLabel: string;
  emptyMessage: string;
  clearFiltersLabel: string;
  posts: BlogPost[];
  sidebar: BlogSidebarData;
}

export interface EnquiryFormContent {
  fields: {
    name: string;
    phone: string;
    email: string;
    service: string;
    message: string;
    date?: string;
  };
  services: string[];
  submitLabel: string;
  submittingLabel: string;
  privacyNote?: string;
  errors: {
    name: string;
    phone: string;
    email: string;
    service: string;
    message?: string;
  };
}

export interface ContactInfoCard {
  icon: string;
  title: string;
  lines: string[];
  href?: string;
}

export interface ContactPageData {
  infoCards: ContactInfoCard[];
  form: EnquiryFormContent & {
    badge: string;
    heading: Heading;
    description: string;
    image: SizedImageData;
  };
  map: {
    badge: string;
    heading: Heading;
    embedUrl: string;
    title: string;
  };
}

export interface QuotePageData {
  background: ImageData;
  intro: { heading: Heading; list: IconItem[] };
  form: EnquiryFormContent & { heading: Heading; description: string };
}

export interface ThankYouPageData {
  background: ImageData;
  heading: Heading;
  lines: string[];
  button: LinkItem;
}

export interface FooterData {
  logo: LogoData;
  description: string;
  socials: { icon: string; label: string; href: string }[];
  columns: { heading: Heading; list: LinkItem[] }[];
  contact: {
    heading: Heading;
    list: { icon: string; lines: string[]; href?: string }[];
  };
  copyright: string;
}

export interface TemplateComponents {
  [template: string]: {
    shared: Record<string, string>;
    pages: Record<string, { components: { key: string; component: string }[] }>;
  };
}

export interface HairAtelierTemplateData {
  categories: {
    HairAtelier: {
      templateComponents: TemplateComponents;
      sections: {
        Global: { variants: { HairAtelierGlobal1: GlobalData } };
        Header: { variants: { HairAtelierHeader1: HeaderData } };
        PageBanners: { variants: { HairAtelierPageBanners1: PageBannersData } };
        HeroBanner: { variants: { HairAtelierHeroBanner1: HeroBannerData } };
        AboutUs: { variants: { HairAtelierAboutUs1: AboutUsData } };
        Services: { variants: { HairAtelierServices1: ServicesData } };
        WhyChooseUs: { variants: { HairAtelierWhyChooseUs1: WhyChooseUsData } };
        Stats: { variants: { HairAtelierStats1: StatsData } };
        Gallery: { variants: { HairAtelierGallery1: GalleryData } };
        Testimonials: { variants: { HairAtelierTestimonials1: TestimonialsData } };
        BlogNews: { variants: { HairAtelierBlogNews1: BlogNewsData } };
        ContactPage: { variants: { HairAtelierContactPage1: ContactPageData } };
        QuotePage: { variants: { HairAtelierQuotePage1: QuotePageData } };
        ThankYouPage: { variants: { HairAtelierThankYouPage1: ThankYouPageData } };
        Footer: { variants: { HairAtelierFooter1: FooterData } };
      };
    };
  };
}
