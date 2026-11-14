import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Header: borda ao rolar */
const header = document.querySelector<HTMLElement>('[data-header]');
const onScroll = () => header?.toggleAttribute('data-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* Arrastar trilhos horizontais com mouse */
document.querySelectorAll<HTMLElement>('[data-drag]').forEach((rail) => {
  let down = false;
  let startX = 0;
  let startLeft = 0;
  let moved = false;
  rail.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true;
    moved = false;
    startX = e.clientX;
    startLeft = rail.scrollLeft;
    rail.style.scrollSnapType = 'none';
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) moved = true;
    rail.scrollLeft = startLeft - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    rail.style.scrollSnapType = '';
  });
  rail.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  rail.querySelectorAll('img').forEach((img) => img.setAttribute('draggable', 'false'));
  // setas
  const id = rail.id;
  if (id) {
    document.querySelectorAll<HTMLButtonElement>(`[data-rail="${id}"]`).forEach((btn) => {
      btn.addEventListener('click', () => {
        const dir = Number(btn.dataset.dir || 1);
        rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: 'smooth' });
      });
    });
  }
});

if (!reduce) {
  /* Recalcula gatilhos quando fontes e imagens terminam de carregar */
  ScrollTrigger.config({ ignoreMobileResize: true });
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  /* Rolagem suave */
  const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = a.getAttribute('href');
      if (!target || target === '#') return;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.3 });
    });
  });

  /* Hero: linhas sobem, resto acompanha */
  const heroLines = gsap.utils.toArray<HTMLElement>('[data-hero] .line-mask > span');
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from(heroLines, { yPercent: 108, duration: 1.4, stagger: 0.09 }, 0.1)
    .from('[data-hero-fade]', { y: 22, opacity: 0, duration: 1.1, stagger: 0.07 }, 0.45)
    .from('[data-hero-mascot]', { yPercent: 14, opacity: 0, duration: 1.3 }, 0.2)
    .from('[data-hero-sticker]', { scale: 0.2, rotate: -60, opacity: 0, duration: 1.1, ease: 'back.out(2.2)' }, 0.85);

  /* Mascote com giro 3D: segue o cursor no desktop e balança de leve no celular */
  const tilt = document.querySelector<HTMLElement>('[data-hero-tilt]');
  if (tilt) {
    if (window.matchMedia('(hover: hover)').matches) {
      const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      window.addEventListener('pointermove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        ry(x * 18);
        rx(-y * 8);
      });
    } else {
      gsap.to(tilt, { rotation: 2, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 100%' });
    }
  }

  /* Toque na mascote: ela pula, o selo dá uma volta e saem brilhos */
  const hop = document.querySelector<HTMLElement>('[data-hero-hop]');
  const burst = document.querySelector<HTMLElement>('[data-hero-burst]');
  if (tilt && hop && burst) {
    const colors = ['#e2668f', '#ffffff', '#ffd79a', '#f6a3c0'];
    const star = (c: string) =>
      `<svg viewBox="0 0 24 24"><path fill="${c}" d="M12 1c.5 5.6 2.9 9.2 10 11-7.1 1.8-9.5 5.4-10 11-.5-5.6-2.9-9.2-10-11 7.1-1.8 9.5-5.4 10-11Z"/></svg>`;
    let busy = false;

    const sparkle = () => {
      const stage = burst.getBoundingClientRect();
      const m = tilt.getBoundingClientRect();
      const cx = m.left - stage.left + m.width / 2;
      const cy = m.top - stage.top + m.height * 0.35;
      for (let i = 0; i < 12; i++) {
        burst.insertAdjacentHTML('beforeend', star(colors[i % colors.length]));
        const el = burst.lastElementChild as SVGElement;
        const ang = (Math.PI * 2 * i) / 12 + Math.random() * 0.4;
        const dist = m.width * (0.45 + Math.random() * 0.35);
        const size = 0.5 + Math.random() * 0.8;
        gsap.set(el, { left: cx - 11, top: cy - 11, scale: 0, rotation: Math.random() * 90 });
        gsap.to(el, {
          x: Math.cos(ang) * dist,
          y: Math.sin(ang) * dist * 0.8 - 20,
          scale: size,
          rotation: '+=180',
          duration: 0.9,
          ease: 'expo.out',
        });
        gsap.to(el, { opacity: 0, scale: 0, duration: 0.45, delay: 0.55, ease: 'power2.in', onComplete: () => el.remove() });
      }
    };

    const play = (byUser = false) => {
      if (busy) return;
      busy = true;
      if (byUser) navigator.vibrate?.(12);
      sparkle();
      gsap
        .timeline({ onComplete: () => { busy = false; } })
        // estica e balança presa na base (o corte da cintura nunca aparece)
        .to(hop, { scaleY: 0.92, scaleX: 1.05, duration: 0.12, ease: 'power2.out' })
        .to(hop, { scaleY: 1.07, scaleX: 0.96, duration: 0.22, ease: 'power3.out' })
        .to(hop, { rotation: -5, duration: 0.14, ease: 'sine.inOut' }, '<')
        .to(hop, { rotation: 4, duration: 0.18, ease: 'sine.inOut' })
        .to(hop, { scaleY: 1, scaleX: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.45)' });
    };

    tilt.addEventListener('click', () => play(true));
    // um pulinho sozinho depois da entrada, pra mostrar que dá pra tocar
    gsap.delayedCall(2.6, play);
  }

  /* Parallax leve em fotos marcadas */
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amt = Number(el.dataset.parallax || 0.12);
    gsap.fromTo(
      el,
      { yPercent: -amt * 50 },
      { yPercent: amt * 50, ease: 'none', scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });

  /* Entradas por bloco (cada seção tem sua própria coreografia leve) */
  // Só esconde o que ainda está abaixo da dobra; o que já está na tela fica visível.
  const revealItems = gsap.utils.toArray<HTMLElement>('[data-reveal-item]');
  const fold = window.innerHeight * 0.95;
  const pending = revealItems.filter((el) => el.getBoundingClientRect().top > fold);
  gsap.set(pending, { opacity: 0, y: 28 });
  ScrollTrigger.batch(pending, {
    start: 'top 94%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06, overwrite: true }),
  });

  /* Títulos de seção em linhas */
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((h) => {
    gsap.from(h.querySelectorAll('.line-mask > span'), {
      yPercent: 108,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: h, start: 'top 92%', once: true },
    });
  });

  /* Régua do dia: o marcador corre até "agora" */
  document.querySelectorAll<HTMLElement>('[data-day-ruler]').forEach((r) => {
    ScrollTrigger.create({ trigger: r, start: 'top 80%', once: true, onEnter: () => r.classList.add('is-in') });
  });

  /* MOMENTO DA CAMPANHA: a seção abre como uma janela à noite e o pisca-pisca acende */
  const night = document.querySelector<HTMLElement>('[data-night]');
  if (night) {
    if (window.matchMedia('(min-width: 861px)').matches) gsap.fromTo(
      night,
      { clipPath: 'inset(0% 5% 0% 5% round 48px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        ease: 'none',
        scrollTrigger: { trigger: night, start: 'top 95%', end: 'top 15%', scrub: true },
      },
    );
    const bulbs = night.querySelectorAll<SVGElement>('.bulb');
    ScrollTrigger.create({
      trigger: night,
      start: 'top 60%',
      once: true,
      onEnter: () => {
        bulbs.forEach((b, i) => setTimeout(() => b.classList.add('on'), 60 * i));
      },
    });
  }
} else {
  document.querySelectorAll('.bulb').forEach((b) => b.classList.add('on'));
  document.querySelectorAll('[data-day-ruler]').forEach((r) => r.classList.add('is-in'));
}
