import React, { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogImageAlt?: string;
  twitterImage?: string;
  structuredData?: object;
  noIndex?: boolean;
  articleData?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const SEOHead: React.FC<SEOProps> = ({
  title = "MedPortal - Secure Healthcare Management System | HIPAA Compliant Medical Software",
  description = "Streamline healthcare operations with MedPortal's comprehensive medical management platform. HIPAA compliant patient records, appointment scheduling, telemedicine, and analytics for healthcare providers.",
  keywords = "healthcare management system, medical software, HIPAA compliant, patient records, appointment scheduling, telemedicine, medical analytics, healthcare providers, electronic health records, EHR, medical portal",
  canonicalUrl = "https://medportal.com",
  ogImage = "https://medportal.com/og-image.jpg",
  ogImageAlt = "MedPortal healthcare management system dashboard showing patient records and analytics",
  twitterImage = "https://medportal.com/twitter-image.jpg",
  structuredData,
  noIndex = false,
  articleData
}) => {
  // Ensure title is within optimal length (50-60 characters)
  const optimizedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  
  // Ensure description is within optimal length (150-160 characters)
  const optimizedDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;

  useEffect(() => {
    // Update document title
    document.title = optimizedTitle;

    // Function to update or create meta tag
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Function to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Update basic meta tags
    updateMetaTag('description', optimizedDescription);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'MedPortal');
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Update canonical URL
    updateLinkTag('canonical', canonicalUrl);

    // Update Open Graph tags
    updateMetaTag('og:type', articleData ? 'article' : 'website', true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:title', optimizedTitle, true);
    updateMetaTag('og:description', optimizedDescription, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:alt', ogImageAlt, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:site_name', 'MedPortal', true);
    updateMetaTag('og:locale', 'en_US', true);

    // Update Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:url', canonicalUrl, true);
    updateMetaTag('twitter:title', optimizedTitle, true);
    updateMetaTag('twitter:description', optimizedDescription, true);
    updateMetaTag('twitter:image', twitterImage || ogImage, true);
    updateMetaTag('twitter:image:alt', ogImageAlt, true);
    updateMetaTag('twitter:creator', '@medportal', true);
    updateMetaTag('twitter:site', '@medportal', true);

    // Update additional meta tags
    updateMetaTag('theme-color', '#007BBA');
    updateMetaTag('msapplication-TileColor', '#007BBA');
    updateMetaTag('application-name', 'MedPortal');
    updateMetaTag('apple-mobile-web-app-title', 'MedPortal');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'default');

    // Update article-specific Open Graph tags
    if (articleData) {
      if (articleData.publishedTime) {
        updateMetaTag('article:published_time', articleData.publishedTime, true);
      }
      if (articleData.modifiedTime) {
        updateMetaTag('article:modified_time', articleData.modifiedTime, true);
      }
      if (articleData.author) {
        updateMetaTag('article:author', articleData.author, true);
      }
      if (articleData.section) {
        updateMetaTag('article:section', articleData.section, true);
      }
      if (articleData.tags) {
        // Remove existing article:tag meta tags
        const existingTags = document.querySelectorAll('meta[property="article:tag"]');
        existingTags.forEach(tag => tag.remove());
        
        // Add new article:tag meta tags
        articleData.tags.forEach(tag => {
          updateMetaTag('article:tag', tag, true);
        });
      }
    }

    // Update structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Add preconnect links for performance (only if they don't exist)
    const preconnectUrls = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com'
    ];

    preconnectUrls.forEach(url => {
      if (!document.querySelector(`link[rel="preconnect"][href="${url}"]`)) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'preconnect');
        link.setAttribute('href', url);
        if (url.includes('gstatic')) {
          link.setAttribute('crossorigin', 'anonymous');
        }
        document.head.appendChild(link);
      }
    });

    // Add DNS prefetch links
    const dnsPrefetchUrls = [
      'https://www.googletagmanager.com',
      'https://connect.facebook.net'
    ];

    dnsPrefetchUrls.forEach(url => {
      if (!document.querySelector(`link[rel="dns-prefetch"][href="${url}"]`)) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'dns-prefetch');
        link.setAttribute('href', url);
        document.head.appendChild(link);
      }
    });

  }, [optimizedTitle, optimizedDescription, keywords, canonicalUrl, ogImage, ogImageAlt, twitterImage, structuredData, noIndex, articleData]);

  // This component doesn't render anything visible
  return null;
};

export default SEOHead;