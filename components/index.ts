import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import PageBanner from "./common/PageBanner";
import EnquiryForm from "./common/EnquiryForm";
import Lightbox from "./common/Lightbox";
import ThankYouCheck from "./common/ThankYouCheck";

import HeroSection from "./home/HeroSection";
import AboutSection from "./home/AboutSection";
import ServicesSection from "./home/ServicesSection";
import StatsSection from "./home/StatsSection";
import GallerySection from "./home/GallerySection";
import TestimonialsSection from "./home/TestimonialsSection";
import BlogsSection from "./home/BlogsSection";
import WhyChooseSection from "./home/WhyChooseSection";

import ServiceDetails from "./services/ServiceDetails";

import GalleryGrid from "./gallery/GalleryGrid";

import BlogCard, { formatBlogDate } from "./blog/BlogCard";
import BlogList, { BlogGrid } from "./blog/BlogList";
import BlogSidebar from "./blog/BlogSidebar";
import BlogCategories from "./blog/BlogCategories";
import * as BlogIcons from "./blog/BlogIcons";

import {
  ContactInfoCards,
  ContactFormSection,
  ContactMapSection,
} from "./contact/ContactSections";
import QuoteSection from "./quote/QuoteSection";

import { Reveal, Stagger, StaggerItem, MotionProvider } from "./ui/motion";

export {
  // Common
  Navbar,
  Footer,
  PageBanner,
  EnquiryForm,
  Lightbox,
  ThankYouCheck,
  // Home
  HeroSection,
  AboutSection,
  ServicesSection,
  StatsSection,
  GallerySection,
  TestimonialsSection,
  BlogsSection,
  WhyChooseSection,
  // Services
  ServiceDetails,
  // Gallery
  GalleryGrid,
  // Blog
  BlogCard,
  formatBlogDate,
  BlogList,
  BlogGrid,
  BlogSidebar,
  BlogCategories,
  BlogIcons,
  // Contact & Quote
  ContactInfoCards,
  ContactFormSection,
  ContactMapSection,
  QuoteSection,
  // UI & Animations
  Reveal,
  Stagger,
  StaggerItem,
  MotionProvider,
};
