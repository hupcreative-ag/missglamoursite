/**
 * Status ao vivo no fuso de Salvador:
 *  - loja aberta/fechada
 *  - "pedido até 10h chega hoje" + quanto falta
 *  - régua do dia (marcador "agora")
 *  - contagem regressiva da campanha
 * Os dados vêm de atributos data-* renderizados pelo servidor.
 */
type Hours = Record<string, [number, number] | null>;

const cfgEl = document.getElementById('store-config');
const cfg = cfgEl ? (JSON.parse(cfgEl.textContent || '{}') as { hours: Hours; cutoff: number }) : null;

function bahiaNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Bahia',
    hour12: false,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const h = Number(get('hour')) % 24;
  const m = Number(get('minute'));
  return { dow, h, m, mins: h * 60 + m };
}

const fmtLeft = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${m} min`;
};
const fmtHour = (h: number) => `${h}h`;

function nextDeliveryLabel(dow: number) {
  // entregas de segunda a sábado
  if (dow === 6 || dow === 0) return 'segunda';
  return 'amanhã';
}

function compute() {
  if (!cfg) return null;
  const now = bahiaNow();
  const today = cfg.hours[String(now.dow)];
  const open = !!today && now.mins >= today[0] * 60 && now.mins < today[1] * 60;
  const cutoff = cfg.cutoff * 60;
  const deliversToday = !!today && now.dow !== 0 && now.mins < cutoff;

  let store: { state: 'on' | 'closed'; text: string };
  if (open) store = { state: 'on', text: `Loja aberta agora · fecha às ${fmtHour(today![1])}` };
  else if (today && now.mins < today[0] * 60) store = { state: 'closed', text: `Abre hoje às ${fmtHour(today[0])}` };
  else if (now.dow === 6 || now.dow === 0) store = { state: 'closed', text: 'Fechada agora · abre segunda às 8h' };
  else store = { state: 'closed', text: 'Fechada agora · abre amanhã às 8h' };

  let delivery: { state: 'on' | 'off'; text: string; short: string };
  if (deliversToday) {
    const left = cutoff - now.mins;
    delivery = {
      state: 'on',
      text: `Peça até 10h e recebe hoje · faltam ${fmtLeft(left)}`,
      short: `Faltam ${fmtLeft(left)} pra entrega de hoje`,
    };
  } else {
    const when = nextDeliveryLabel(now.dow);
    delivery = {
      state: 'off',
      text: `Pedido feito agora sai ${when} no roteiro`,
      short: `Pedido de agora sai ${when}`,
    };
  }
  return { now, today, open, store, delivery };
}

function render() {
  const s = compute();
  if (!s) return;
  document.querySelectorAll<HTMLElement>('[data-live="store"]').forEach((el) => {
    el.textContent = s.store.text;
    el.parentElement?.querySelector('.live-dot')?.setAttribute('data-state', s.store.state);
  });
  document.querySelectorAll<HTMLElement>('[data-live="delivery"]').forEach((el) => {
    el.textContent = el.dataset.variant === 'short' ? s.delivery.short : s.delivery.text;
    el.parentElement?.querySelector('.live-dot')?.setAttribute('data-state', s.delivery.state);
  });

  // Régua do dia: 8h → 18h
  document.querySelectorAll<HTMLElement>('[data-day-ruler]').forEach((el) => {
    const start = 8 * 60;
    const end = 18 * 60;
    const p = Math.min(1, Math.max(0, (s.now.mins - start) / (end - start)));
    el.style.setProperty('--now', String(p));
    const outside = s.now.mins < start || s.now.mins > end || s.now.dow === 0;
    el.toggleAttribute('data-outside', outside);
    const label = el.querySelector<HTMLElement>('[data-now-label]');
    if (label) label.textContent = `Agora · ${String(s.now.h).padStart(2, '0')}:${String(s.now.m).padStart(2, '0')}`;
  });
}

function countdowns() {
  document.querySelectorAll<HTMLElement>('[data-countdown]').forEach((el) => {
    const target = new Date(el.dataset.countdown!).getTime();
    const diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const set = (k: string, v: number) => {
      const n = el.querySelector<HTMLElement>(`[data-cd="${k}"]`);
      if (n) n.textContent = String(v).padStart(2, '0');
    };
    set('d', d);
    set('h', h);
    set('m', m);
  });
}

render();
countdowns();
setInterval(() => {
  render();
  countdowns();
}, 30000);
