import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'profile' | 'article';
  keywords?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private meta = inject(Meta);
  private titleService = inject(Title);

  private defaultConfig: SeoConfig = {
    title: 'Function Dev - Keidson Roby - Desenvolvedor Front-End Angular',
    description: 'Function Dev - Keidson Roby, desenvolvo sites e sistemas para internet concentrado em performance, responsividade e SEO.',
    image: 'https://github.com/keidsondesigner.png',
    url: 'https://www.functiondev.com.br/',
    type: 'profile',
    keywords: ['Angular', 'TypeScript', 'Frontend', 'Desenvolvedor', 'Keidson Roby', 'Manaus']
  };

  updateMetaTags(config: Partial<SeoConfig> = {}): void {
    const seoConfig = { ...this.defaultConfig, ...config };

    // Update title
    if (seoConfig.title) {
      this.titleService.setTitle(seoConfig.title);
    }

    // Update or add meta tags
    const metaTags = [
      { name: 'description', content: seoConfig.description },
      { name: 'keywords', content: seoConfig.keywords?.join(', ') },

      // OpenGraph
      { property: 'og:title', content: seoConfig.title },
      { property: 'og:description', content: seoConfig.description },
      { property: 'og:image', content: seoConfig.image },
      { property: 'og:url', content: seoConfig.url },
      { property: 'og:type', content: seoConfig.type },

      // Twitter
      { name: 'twitter:title', content: seoConfig.title },
      { name: 'twitter:description', content: seoConfig.description },
      { name: 'twitter:image', content: seoConfig.image }
    ];

    metaTags.forEach(tag => {
      if (tag.content) {
        if ('name' in tag && tag.name) {
          this.meta.updateTag({ name: tag.name, content: tag.content });
        } else if ('property' in tag && tag.property) {
          this.meta.updateTag({ property: tag.property, content: tag.content });
        }
      }
    });
  }

  updateCanonicalUrl(url: string): void {
    if (typeof document === 'undefined') return;

    // Remove existing canonical if present
    const existingLink = document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      existingLink.setAttribute('href', url);
    } else {
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      document.head.appendChild(link);
    }
  }

  generateJsonLd(data: any): void {
    if (typeof document === 'undefined') return;

    let script = document.querySelector('script[type="application/ld+json"]');

    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }
}
