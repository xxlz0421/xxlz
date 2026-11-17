import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AnimatedHeading } from './AnimatedText';
import Magnet from './reactbits/Magnet';
import Galaxy from './reactbits/Galaxy';

export function Entrance({ onDone, reduced }) {
  const [phase, setPhase] = useState('galaxy');
  useEffect(() => {
    if (reduced) { onDone(); return; }
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const welcomeTimer = setTimeout(() => setPhase('welcome'), 2400);
    const timer = setTimeout(onDone, 5900);
    const key = e => { if (e.key === 'Escape') onDone(); };
    document.addEventListener('keydown', key);
    return () => { clearTimeout(welcomeTimer); clearTimeout(timer); document.body.style.overflow = previous; document.removeEventListener('keydown', key); };
  }, [onDone, reduced]);
  return <motion.div className="entrance" role="dialog" aria-modal="true" aria-label="作品集入场动画" initial={{ opacity: 1 }} exit={{ clipPath: 'inset(0 0 100% 0 round 0 0 40% 40%)' }} transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}>
    <div className="entrance-galaxy" aria-hidden="true"><Galaxy density={0.45} layers={2} starSpeed={0.7} glowIntensity={0.38} twinkleIntensity={0.55} starColors={['#ffffff']} saturation={0} hueShift={0} mouseInteraction mouseRepulsion clickWarp dpr={1} transparent={false} backgroundColor="#000000" /></div>
    <div className="entrance-top"><span>LI WEI / VISUAL ARCHIVE</span><button autoFocus onClick={onDone}>跳过动画 ↗</button></div>
    <div className="entrance-stage"><AnimatePresence mode="wait">{phase === 'galaxy' ? <motion.div className="entrance-mark" key="mark" initial={{ opacity: 0, scale: 0.6, filter: 'blur(30px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: 1.3, filter: 'blur(35px)', transition: { duration: 0.4 } }} transition={{ duration: 1.1 }}><span>Hey</span><small>DESIGN / CGI / AIGC</small></motion.div> : <motion.div className="entrance-welcome" key="welcome" initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}><span>欢迎来到我的视觉世界。</span><small>WELCOME TO MY VISUAL WORLD.</small></motion.div>}</AnimatePresence></div>
    <span className="entrance-bottom">李威 · 视觉设计作品集</span>
  </motion.div>;
}

export default function StudioHero({ ready, reduced, onReplay }) {
  return <section className="studio-hero" id="home">
    <div className="studio-galaxy" aria-hidden="true"><Galaxy density={0.75} layers={3} starSpeed={0.2} glowIntensity={0.32} twinkleIntensity={0.4} starColors={['#ffffff']} saturation={0} hueShift={0} mouseInteraction={!reduced} mouseRepulsion={!reduced} clickWarp={!reduced} disableAnimation={reduced} dpr={1} transparent={false} backgroundColor="#000000" /></div>
    <div className="editorial-hero-photo"><img src="./assets/sofa-editorial.png" alt="黑白沙发上阅读报纸的人物，李威作品集封面" fetchPriority="high" /></div>
    <div className="editorial-hero-heading"><p className="studio-kicker">LI WEI / INDEPENDENT VISUAL DESIGNER <span>2023 — 2026</span></p><AnimatedHeading key={ready ? 'hero-ready' : 'hero-wait'} as="h1" className="studio-title" lines={['PORTFOLIO']} reduced={reduced || !ready} hero /><span className="hero-chinese-title"><AnimatedHeading key={ready ? 'subtitle-ready' : 'subtitle-wait'} as="span" className="hero-chinese-word" lines={['作品集']} reduced={reduced || !ready} hero /><span className="hero-subtitle">DESIGN / CGI / AIGC</span></span></div>
    <div className="hero-orbit-label" aria-hidden="true"><span className="orange-signature" /><small>A WORLD OF IDEAS</small></div>
    <div className="studio-hero-content"><h2>李威 <span>VISUAL DESIGNER</span></h2><p className="studio-description">以视觉连接产品与人。<br />亚马逊 A+ / 详情页 / 独立站 / AIGC 应用</p><div className="studio-cta"><Magnet disabled={reduced} padding={28} maxOffset={10}><a className="pill-button primary" href="#works">探索作品 <span>↗</span></a></Magnet><a className="pill-button studio-secondary" href="#films"><span>▷</span> 观看影像</a></div></div>
    <div className="studio-hero-bottom"><span>SELECTED WORKS / 2023 — 2026</span><a href="#about"><span className="scroll-line" />向下了解我</a><button className="replay-intro" onClick={onReplay}>↻ 重播开场</button></div>
  </section>;
}
