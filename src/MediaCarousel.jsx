import { useRef, useState } from 'react';
import FlexCarousel from './reactbits/FlexCarousel';

export default function MediaCarousel({ items, reduced, label, action, onSelect }) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  const api = useRef(null);
  const current = items[active] || items[0];
  const flat = reduced || failed;
  const move = direction => flat ? setActive((active + direction + items.length) % items.length) : api.current?.step(direction);
  return <div className="media-carousel">
    <div className="carousel-stage">
      {flat ? <div className="carousel-flat" role="region" aria-label={label}><button onClick={() => onSelect(current)} aria-label={`${action}：${current.title}`}><img src={current.src} alt={current.alt} /><span>{current.title}</span></button></div> : <FlexCarousel apiRef={api} label={label} items={items} preset="liquid" intro="rise" cardHeight={0.5} gap={12} squeeze={0.2} focusOnClick captions fit="natural" radius={0} lensWidth={0.74} lensHeight={1.18} tilt={62} roundness={1} bend={0.34} reach={0.38} curl="twist" dispersion={0.45} liquid={0} followCursor={false} autoplay={false} interval={4} captureWheel onChange={i => setActive(i)} onSelect={(_, item) => onSelect(item)} onError={() => setFailed(true)} />}
    </div>
    <div className="carousel-controls"><button className="carousel-arrow" onClick={() => move(-1)} aria-label={`${label}上一个`}>←</button><button className="carousel-open" onClick={() => onSelect(current)}>{action}<span>{current.title}</span><b aria-hidden="true">↗</b></button><button className="carousel-arrow" onClick={() => move(1)} aria-label={`${label}下一个`}>→</button></div>
    <p className="carousel-help">{flat ? '使用左右按钮选择，点击进入。' : '拖动浏览 · 点击居中画面查看 · Esc 收起放大'}</p>
  </div>;
}
