/* Decorate the existing card nodes after the player renders and binds them. */
(() => {
  'use strict';

  const stores = {
    radio: 'retrotvra.radio-presets.v3',
    tv: 'retrotvra.tv-presets.v3',
    recent: 'retrotvra.recent.v2'
  };
  const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter() : null;
  function readStore(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
  }
  function imageURL(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    if (/^data:image\//i.test(value)) return value;
    try {
      const url = new URL(value, document.baseURI);
      if (['https:', 'http:'].includes(url.protocol) ||
          (url.protocol === 'file:' && location.protocol === 'file:')) return url.href;
    } catch {}
    return '';
  }
  function monogram(title) {
    const words = title.match(/[\p{L}\p{N}][\p{L}\p{M}\p{N}]*/gu) || [];
    if (!words.length) return 'TV';
    const letters = word => segmenter ? Array.from(segmenter.segment(word), item => item.segment) : [...word];
    return (words.length > 1 ? letters(words[0])[0] + letters(words[1])[0] :
      letters(words[0]).slice(0, 2).join('')).toLocaleUpperCase();
  }
  function artworkIndex(recent) {
    const names = new Map();
    const keys = new Map();
    const lookup = (map, kind, value) => value ? map.get(kind + ':' + value) : undefined;
    const nameKey = value => String(value || '').normalize('NFKC').trim().toLocaleLowerCase();
    function add(map, key, url) {
      if (!map.has(key)) map.set(key, new Set());
      map.get(key).add(url);
    }
    function collect(kind, row, savedKey) {
      if (!row) return;
      const primary = imageURL(row.logo || row.favicon || row.image || row['tvg-logo'] || row.tvg_logo || row.icon);
      const urls = [primary, imageURL(row.fallbackLogo)].filter(Boolean);
      for (const url of urls) {
        for (const value of [savedKey, row.key, row.stationuuid, row.url, row.url_resolved]) {
          if (value) add(keys, kind + ':' + value, url);
        }
      }
      const name = nameKey(row.name);
      const representative = primary || urls[0];
      if (name && representative) add(names, kind + ':' + name, representative);
    }
    for (const kind of ['radio', 'tv']) {
      for (const [key, row] of Object.entries(readStore(stores[kind]) || {})) collect(kind, row, key);
      for (const row of recent) if (row?.kind === kind) collect(kind, row);
      for (const row of window.COOLMAG_GENRE_CATALOGUE?.[kind] || []) collect(kind, row);
      for (const id of [kind + '-tuning-track', kind === 'radio' ? 'radio-station-strip' : 'tv-rail']) {
        for (const card of document.getElementById(id)?.children || []) {
          const name = card.querySelector('b')?.textContent;
          const image = card.querySelector('img[src]');
          if (name && image) collect(kind, {name, logo:image.getAttribute('src'), url:card.dataset.tvUrl});
        }
      }
    }
    return (kind, key, title) => {
      const exact = lookup(keys, kind, key);
      if (exact) return [...exact];
      const matchingNames = lookup(names, kind, nameKey(title));
      return matchingNames?.size === 1 ? [...matchingNames] : [];
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    const presets = document.getElementById('preset-grid');
    const explore = document.getElementById('explore-results');
    const artwork = new WeakMap();
    let queued = false;

    function decorate(card, kind, key, title, find) {
      let state = artwork.get(card);
      if (!state) {
        const original = card.querySelector(':scope > .preset-logo, :scope > .result-icon, :scope > img, :scope > .logo-fallback');
        const badge = original?.classList.contains('preset-logo') ? original : document.createElement('span');
        if (badge !== original) {
          if (original) original.before(badge);
          else card.prepend(badge);
          if (original) badge.append(original);
        }
        badge.classList.add('v4-card-icon');
        badge.setAttribute('aria-hidden', 'true');
        badge.addEventListener('error', schedule, true);
        state = {badge, tried:new Set()};
        artwork.set(card, state);
      }
      const {badge, tried} = state;
      const current = badge.querySelector('img[src]');
      if (current) {
        tried.add(imageURL(current.getAttribute('src')));
        if (!current.complete || current.naturalWidth > 0) {
          current.loading = 'lazy';
          return;
        }
        // An error can precede observer setup, or leave an undecodable image
        // in place. Continue with an untried source or the monogram.
      }
      const next = find(kind, key, title).find(url => !tried.has(url));
      if (next) {
        const image = document.createElement('img');
        image.alt = '';
        image.loading = 'lazy';
        image.decoding = 'async';
        tried.add(next);
        badge.replaceChildren(image);
        image.src = next;
        return;
      }
      const initials = monogram(title);
      if (badge.childElementCount || badge.textContent !== initials) badge.textContent = initials;
    }

    function refresh() {
      queued = false;
      const stored = readStore(stores.recent);
      const recent = Array.isArray(stored) ? stored : [];
      const find = artworkIndex(recent);
      const presetKind = document.querySelector('[data-preset-mode].selected')?.dataset.presetMode || 'radio';
      for (const card of presets.querySelectorAll('.preset-card')) {
        const entry = card.dataset.recentIndex === undefined ? null : recent[Number(card.dataset.recentIndex)];
        const title = card.querySelector(':scope > b')?.textContent || '';
        const key = entry?.key || card.querySelector('[data-preset-star]')?.dataset.presetStar;
        const kind = entry?.kind || (card.classList.contains('recent-history-card') ?
          (card.querySelector('.channel-number')?.textContent.startsWith('TV') ? 'tv' : 'radio') : presetKind);
        decorate(card, kind, key, title, find);
      }
      for (const card of explore.querySelectorAll('.result-row')) {
        decorate(card.querySelector('.result-play') || card, card.dataset.resultKind, card.dataset.resultKey,
          card.querySelector('.result-copy b')?.textContent || '', find);
      }
    }
    function schedule() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(refresh);
    }

    // The player's capture-phase image-error handler still tries its HTTPS and
    // catalogue fallbacks. Watch its DOM replacement before trying another logo.
    const observer = new MutationObserver(schedule);
    for (const target of [presets, explore, ...['radio-tuning-track', 'tv-tuning-track', 'radio-station-strip', 'tv-rail'].map(id => document.getElementById(id))]) {
      if (target) observer.observe(target, {childList:true, subtree:true, attributes:true, attributeFilter:['src']});
    }
    window.addEventListener('storage', event => {
      if (!event.key || Object.values(stores).includes(event.key)) schedule();
    });
    schedule();
  });
})();
