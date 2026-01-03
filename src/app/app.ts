import { Component, ChangeDetectionStrategy, signal, effect, WritableSignal, ElementRef, ViewChild, AfterViewInit, OnDestroy, PLATFORM_ID, inject, afterNextRender } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { smoothScrollToElement, smoothScrollToPosition } from './utils/smooth-scroll';

interface Role {
  title: string;
  duration: string;
  location: string;
  description: string;
  details: string[];
}

interface Experience {
  company: string;
  url: string;
  roles: Role[];
}

interface Project {
  title: string;
  description: string;
  techs: string[];
  url: string;
  imageUrl: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],

})
export class App implements AfterViewInit, OnDestroy {

  @ViewChild('mainContainer') mainContainer!: ElementRef<HTMLDivElement>;
  private platformId = inject(PLATFORM_ID);

  name = signal('Keidson Roby');
  title = signal('Desenvolvedor Frontend Pleno');
  brief = signal('Desenvolvo interfaces e experiências digitais fluidas e modernas.');
  
  activeSection = signal('sobre');
  showScrollToTopButton = signal(false);

  // For smooth spotlight animation
  private lastMouseX = 0;
  private lastMouseY = 0;
  private isTicking = false;

  about = signal({
    p1: 'Sou desenvolvedor frontend pleno, especializado em aplicações Angular modernas. Tenho mais de 4 anos de experiência no desenvolvimento web, focado em entregar produtos de alta qualidade, dentro do prazo de cada sprint, garantindo usabilidade e uma jornada fluida para o usuário.',
    p2: 'Contribuí em soluções para clientes como Banco do Brasil, Banco Bradesco, e Cooperativa de Crédito Cresol. Possuo domínio de Angular 12+, RxJs, TypeScript, e testes com Jasmine e Jest, atuando de forma estratégica na organização do código e na evolução da arquitetura frontend.'
  });

  skills = signal([
    'Angular 12+', 'TypeScript', 'RxJS', 'JavaScript (ES6+)',
    'Jasmine & Karma', 'Jest', 'HTML5', 'CSS3 & SCSS', 'Tailwind CSS',
    'GraphQL', 'RESTful APIs', 'Git & GitHub', 'CI/CD', 'Scrum', 'UI/UX Design'
  ]);

  experiences: WritableSignal<Experience[]> = signal([
    {
      company: 'Qintess',
      url: '#',
      roles: [
        {
          title: 'Front-end Developer (Angular) - SaaS de Assinatura Digital | Banco do Brasil',
          duration: 'JUL 2025 - PRESENTE',
          location: 'Remoto',
          description: 'Desenvolvimento de uma plataforma SaaS para assinatura digital de documentos, integrada aos sistemas do Banco do Brasil, focando em segurança e usabilidade.',
          details: []
        },
        {
          title: 'Front-end Developer (Angular) - Digitalização de Documentos | Banco do Brasil',
          duration: 'JUL 2024 - JUL 2025',
          location: 'Remoto',
          description: 'O MDC é uma solução para digitalização de documentos em mais de 80 mil máquinas do Banco do Brasil, processando em média 14 milhões de imagens por mês. A aplicação foi desenvolvida como um Micro-frontend.',
          details: [
            'Migração do projeto legado de AngularJS para Angular 15, melhorando performance e manutenibilidade.',
            'Implementação de Facade Pattern para refatoração, reduzindo complexidade de 16 para 5 injeções de dependências e aumentando a cobertura de testes em 40%.',
            'Desenvolvimento de Diretivas e Pipes customizadas para criar tutoriais interativos e filtrar dados, reduzindo redundância de código em até 80%.',
            'Gerenciamento de estado de notificações com RxJS para controle dinâmico de feedback ao usuário.',
          ]
        }
      ]
    },
    {
      company: 'TDR',
      url: '#',
      roles: [
        {
          title: 'Front-end Developer (Vue 3) & UI Designer - ERP de Gestão Escolar',
          duration: 'OUT 2023 - JUN 2024',
          location: 'Remoto',
          description: 'Atuei no desenvolvimento do Tagnos 2.0, um sistema utilizado em 42 municípios do Brasil, com mais de 100 mil usuários ativos.',
          details: [
            'Participei da migração do projeto de Vue 2 para Vue 3 com TypeScript.',
            'Como UI Designer, realizei pesquisas de concorrentes, mapeei jornadas de usuário e criei wireframes e protótipos.',
            'Desenvolvi e implementei um Design System completo, assegurando consistência visual e eficiência.',
            'Liderei a equipe de design, promovendo a colaboração e garantindo entregas alinhadas às metas.'
          ]
        }
      ]
    },
    {
      company: 'MJV Technology & Innovation',
      url: '#',
      roles: [
        {
          title: 'Front-end Developer (Angular) - Seguros Previdência Privada | Banco Bradesco',
          duration: 'JAN 2023 - SET 2023',
          location: 'Remoto',
          description: 'Desenvolvi aplicações mobile e web para o fluxo de contratação de seguros de previdência privada.',
          details: [
            'Desenvolvimento com Angular 14, Ionic 5 e Capacitor 4.',
            'Criação de componentes de UI reutilizáveis com Storybook.',
            'Integração com APIs e implementação de serviços para o fluxo de contratação.',
            'Escrita de testes unitários com Jest para garantir a qualidade do código.'
          ]
        },
        {
          title: 'Front-end Developer (Angular) - App Cooperados | Cresol',
          duration: 'JUN 2022 - DEZ 2022',
          location: 'Remoto',
          description: 'Desenvolvimento de uma aplicação mobile para os cooperados da Cresol.',
          details: [
            'Desenvolvimento com Angular 12 e Ionic 4.',
            'Implementação de componentes visuais no Storybook.',
            'Desenvolvimento de gráficos de performance financeira e módulo de extrato.'
          ]
        }
      ]
    },
    {
      company: 'BFT Solutions',
      url: '#',
      roles: [
        {
          title: 'Front-end Developer (Angular) - Junior III',
          duration: 'JUN 2021 - MAI 2022',
          location: 'Remoto',
          description: 'Desenvolvimento e redesenho de sistemas ERP, com foco em UI/UX e performance.',
          details: [
            'Criação de wireframes, protótipos e implementação de Design Systems.',
            'Desenvolvimento Web com Angular 12.',
            'Integração de APIs em Node/NestJS com o front-end.',
            'Testes unitários com Jasmine/Karma.'
          ]
        }
      ]
    }
  ]);

  projects: WritableSignal<Project[]> = signal([
    {
      title: 'MDC - Micro-frontend de Digitalização',
      description: 'Solução de digitalização de documentos para o Banco do Brasil, migrada de AngularJS para Angular 15, com refatoração massiva usando Facade Pattern para otimizar a manutenibilidade e testes.',
      techs: ['Angular 15', 'RxJS', 'TypeScript', 'Facade Pattern', 'Jasmine'],
      url: '#',
      imageUrl: 'https://picsum.photos/seed/mdc/200/112'
    },
    {
      title: 'Tagnos 2.0 - ERP de Gestão Escolar',
      description: 'Atuação como Front-end e UI Designer na evolução de um grande ERP educacional, migrando a base de código para Vue 3 e implementando um Design System completo para consistência visual.',
      techs: ['Vue 3', 'TypeScript', 'UI/UX Design', 'Design System', 'Figma'],
      url: '#',
      imageUrl: 'https://picsum.photos/seed/tagnos/200/112'
    },
    {
      title: 'App de Seguros - Bradesco Previdência',
      description: 'Aplicação mobile e web para a contratação de seguros de previdência privada, construída com um stack moderno de Angular e Ionic, utilizando Storybook para o desenvolvimento de componentes.',
      techs: ['Angular 14', 'Ionic 5', 'Capacitor', 'Storybook', 'Jest'],
      url: '#',
      imageUrl: 'https://picsum.photos/seed/bradesco/200/112'
    }
  ]);

  constructor() {
    effect(() => {
        // This effect can be used to react to activeSection changes if needed
        // console.log(`Current section: ${this.activeSection()}`);
    });

    // Initialize browser-only features
    afterNextRender(() => {
      this.initializeBrowserFeatures();
    });
  }

  private initializeBrowserFeatures(): void {
    const sections = this.mainContainer.nativeElement.querySelectorAll('section[id]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection.set(entry.target.id);
        }
      });
    }, {
      threshold: 0.4
    });

    sections.forEach(section => observer.observe(section));

    window.addEventListener('scroll', this.onWindowScroll);
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerleave', this.onPointerLeave);
  }

  ngAfterViewInit() {
    // Kept empty - browser features initialized via afterNextRender
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;

    window.removeEventListener('scroll', this.onWindowScroll);
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerleave', this.onPointerLeave);
  }

  onWindowScroll = () => {
    if (!isPlatformBrowser(this.platformId)) return;

    if (window.scrollY > window.innerHeight) {
      this.showScrollToTopButton.set(true);
    } else {
      this.showScrollToTopButton.set(false);
    }
  };

  onPointerMove = (event: PointerEvent) => {
    if (!isPlatformBrowser(this.platformId)) return;

    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
    this.requestTick();
  };

  private requestTick = () => {
    if (!isPlatformBrowser(this.platformId)) return;

    if (!this.isTicking) {
      requestAnimationFrame(this.updateSpotlight);
      this.isTicking = true;
    }
  };

  private updateSpotlight = () => {
    if (!isPlatformBrowser(this.platformId)) return;

    document.documentElement.style.setProperty('--mouse-x', `${this.lastMouseX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${this.lastMouseY}px`);
    document.documentElement.style.setProperty('--mouse-opacity', '1');
    this.isTicking = false;
  };

  onPointerLeave = () => {
    if (!isPlatformBrowser(this.platformId)) return;

    document.documentElement.style.setProperty('--mouse-opacity', '0');
  };

  scrollTo(event: MouseEvent, sectionId: string): void {
    event.preventDefault();
    this.activeSection.set(sectionId);

    if (!isPlatformBrowser(this.platformId)) return;

    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      smoothScrollToElement(element);
    }
  }

  scrollTop(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    smoothScrollToPosition(0);
  }
}