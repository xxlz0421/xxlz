import { useEffect, useMemo, useState } from 'react';
import CircularGallery from './reactbits/CircularGallery';

const coverCache = new Map();

// Compose the portfolio's editorial cover as a canvas texture for the WebGL cards.
function editorialCover(item) {
  const key = `${item.image}|${item.text}|${item.en || ''}`;
  if (coverCache.has(key)) return coverCache.get(key);
  const result = new Promise(resolve => {
    const image = new Image();
    image.onload = async () => {
      await document.fonts.ready;
      const canvas = document.createElement('canvas');
      canvas.width = 1200; canvas.height = 800;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0b0c0e'; ctx.fillRect(0, 0, 1200, 800);
      const scale = Math.max(1200 / image.width, 800 / image.height);
      ctx.drawImage(image, (1200 - image.width * scale) / 2, (800 - image.height * scale) / 2, image.width * scale, image.height * scale);
      const shade = ctx.createLinearGradient(0, 0, 1100, 450);
      shade.addColorStop(0, 'rgba(0,0,0,.94)'); shade.addColorStop(.53, 'rgba(0,0,0,.64)'); shade.addColorStop(1, 'rgba(0,0,0,.12)');
      ctx.fillStyle = shade; ctx.fillRect(0, 0, 1200, 800);
      const bottom = ctx.createLinearGradient(0, 450, 0, 800);
      bottom.addColorStop(0, 'transparent'); bottom.addColorStop(1, 'rgba(0,0,0,.7)');
      ctx.fillStyle = bottom; ctx.fillRect(0, 0, 1200, 800);
      ctx.fillStyle = '#f4f3ef'; ctx.font = '500 15px AlibabaPuHuiTi, sans-serif';
      ctx.fillText('LI WEI / VISUAL DESIGN', 62, 62);
      ctx.fillStyle = '#ff5414'; ctx.fillRect(62, 111, 52, 3);
      ctx.font = '500 17px AlibabaPuHuiTi, sans-serif'; ctx.fillText(item.en || 'SELECTED DESIGN PROJECT', 62, 152);
      let fontSize = 56;
      do { ctx.font = `800 ${fontSize}px AlibabaPuHuiTi, sans-serif`; fontSize -= 2; } while (ctx.measureText(item.text).width > 840 && fontSize > 26);
      ctx.fillStyle = '#ff5414'; ctx.fillText(item.text, 62, 232);
      ctx.fillStyle = '#ff5414'; ctx.font = '400 20px AlibabaPuHuiTi, sans-serif'; ctx.fillText('视觉表达 / 创意设计', 65, 276);
      ctx.strokeStyle = '#ff5414'; ctx.lineWidth = 1.5; ctx.strokeRect(1052, 111, 80, 80);
      ctx.beginPath(); ctx.moveTo(1071, 169); ctx.lineTo(1111, 129); ctx.moveTo(1081, 129); ctx.lineTo(1111, 129); ctx.lineTo(1111, 159); ctx.stroke();
      ctx.fillStyle = '#dededa'; ctx.font = '400 13px AlibabaPuHuiTi, sans-serif'; ctx.fillText('PORTFOLIO / SELECTED WORK', 62, 747);
      resolve(canvas.toDataURL('image/webp', .88));
    };
    image.onerror = () => resolve(item.image);
    image.src = item.image;
  });
  coverCache.set(key, result);
  return result;
}

export default function CircularBrowser({ items, label, onOpen, reduced, covers = false, action = '进入项目' }) {
  const [active, setActive] = useState(0);
  const [focusRequest, setFocusRequest] = useState(null);
  const [coverImages, setCoverImages] = useState(null);
  useEffect(() => {
    let alive = true;
    setCoverImages(null);
    if (covers) Promise.all(items.map(editorialCover)).then(images => { if (alive) setCoverImages(images); });
    return () => { alive = false; };
  }, [items, covers]);
  const galleryItems = useMemo(() => items.map((item, i) => ({ ...item, image: coverImages?.[i] || item.image })), [items, coverImages]);
  const current = items[active % items.length];
  const focus = index => { const next = (index + items.length) % items.length; setActive(next); setFocusRequest({ index: next }); };
  return <div className="circular-browser">
    <div className="circular-browser-stage">
      <CircularGallery items={galleryItems} bend={reduced ? 0 : 2.5} itemAspect={1.5} itemSize={1.12} gap={.22} wave={reduced ? 0 : .25} borderRadius={.035} textColor="#fff" font="500 24px AlibabaPuHuiTi" scrollEase={reduced ? 1 : .07} scrollSpeed={1.4} autoScroll={0} intro={!reduced} fadeEdges={.06} captureWheel={false} openOnClick={!onOpen} onItemClick={onOpen ? item => onOpen(items.find(original => original.id === item.id) || item) : undefined} onActiveChange={setActive} focusRequest={focusRequest} dpr={1.5} aria-label={label} />
    </div>
    <div className="circular-browser-controls"><button className="round-button" aria-label={`${label}上一个`} onClick={() => focus(active - 1)}>←</button><div className="circular-browser-current" aria-live="polite"><span className="eyebrow">{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span><h3>{current.text}</h3><p>{current.description}</p>{onOpen ? <button className="pill-button circular-open" onClick={() => onOpen(current)}>{action}<span>↗</span></button> : <span className="circular-browser-hint">点击画面放大 · Esc 收起</span>}</div><button className="round-button" aria-label={`${label}下一个`} onClick={() => focus(active + 1)}>→</button></div>
    <div className="circular-browser-index" aria-label={`${label}快速选择`}>{items.map((item, i) => <button key={item.id} aria-pressed={active === i} onClick={() => focus(i)}><span>{String(i + 1).padStart(2, '0')}</span>{item.text}</button>)}</div>
    <p className="circular-browser-hint">左右拖动浏览 · 点击封面{onOpen ? '进入' : '放大'} · 上下滚动继续阅读</p>
  </div>;
}

