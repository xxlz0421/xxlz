import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useMotionValue, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextPressure from './reactbits/TextPressure';
import Magnet from './reactbits/Magnet';
import TiltedCard from './reactbits/TiltedCard';
import ScrollReveal from './reactbits/ScrollReveal';
import ClickSpark from './reactbits/ClickSpark';
import DecryptedText from './reactbits/DecryptedText';
import RippleDistortion from './reactbits/RippleDistortion';
import { projects } from './projects';
import { drawings } from './drawings';
import FilmGallery from './FilmGallery';
import ProjectBrowser from './ProjectBrowser';
import ToolIcon from './ToolIcon';
import MediaCarousel from './MediaCarousel';
import { AnimatedHeading, ScrollFade } from './AnimatedText';
import StudioHero, { Entrance } from './StudioHero';
import Crosshair from './reactbits/Crosshair';
import LogoLoop from './reactbits/LogoLoop';
import CircularBrowser from './CircularBrowser';
import { PortfolioFooter, Signature } from './PortfolioIdentity';

const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_3GJaYKPxdnQG0Q9O26lu6DPmcHu/hf_20260805_192612_e00017a8-56b0-4957-935b-9ffd87663994.mp4';
const ease = [0.22, 1, 0.36, 1];
const filters = [['all', '全部作品'], ['commerce', '电商视觉'], ['space', '包装 / 空间'], ['aigc', 'AIGC / 精修']];
const skills = [
  { title: '平面与视觉设计', en: 'GRAPHIC DESIGN', tools: ['Photoshop', 'Adobe Illustrator', 'Figma'], copy: '从信息层级到画面细节，让品牌表达与产品卖点保持一致。' },
  { title: '三维建模', en: '3D MODELING', tools: ['3ds Max', 'Cinema 4D', 'Plasticity'], copy: '从产品造型到空间构建，把想法转化为可见的形态。' },
  { title: '材质与渲染', en: 'LIGHT & RENDER', tools: ['KeyShot', 'Corona', 'V-Ray', 'OctaneRender'], copy: '用材质、布光与镜头语言，塑造真实且有表现力的视觉质感。' },
  { title: 'AIGC 工作流', en: 'AI WORKFLOW', tools: ['ChatGPT', 'Codex', 'Gemini Nano', 'WorkBuddy'], copy: '结合生成式创作与设计判断，探索模特、产品与场景的更多可能，再以精修统一细节。' },
];
const toolkitLogos = skills.flatMap(skill => skill.tools.map(name => ({
  node: <ToolIcon name={name} />,
  title: name,
  ariaLabel: name
})));
const steps = [
  { en: 'THINK', title: '先理解，再表达。', copy: '梳理产品特点、使用场景与目标人群，把复杂信息转化为清晰的视觉层级。', tags: ['产品理解', '创意方向', '信息结构'], type: 'listing', image: './assets/process-think.png' },
  { en: 'CREATE', title: '让想法，有形有光。', copy: '连接构图、建模、材质与灯光，用平面与三维语言，建立画面的视觉焦点。', tags: ['三维建模', '材质灯光', '视觉设计'], type: 'interior', image: './assets/process-create.png' },
  { en: 'REFINE', title: '探索可能，打磨细节。', copy: '借助 AIGC 探索模特、场景与氛围，再以精修、合成和排版，让创意成为完整的商业视觉。', tags: ['AIGC 探索', '后期融合', '细节打磨'], type: 'retouch', image: './assets/process-refine.png' },
];

function Arrow({ diagonal = false, className = '' }) {
  return <svg className={`arrow-icon ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-7-7 7 7-7 7'} /></svg>;
}
function Art({ type, className = '' }) {
  return <svg className={`line-art ${className}`} viewBox="0 0 350 350" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" dangerouslySetInnerHTML={{ __html: drawings[type] || drawings.packaging }} />;
}
function Label({ children, reduced }) {
  return <span className="eyebrow">{reduced ? children : <DecryptedText text={children} speed={28} maxIterations={6} animateOn="hover" characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" />}</span>;
}
function Reveal({ children, reduced, className = '', delay = 0 }) {
  return <ScrollFade reduced={reduced} className={className} delay={delay}>{children}</ScrollFade>;
}

function Magnetic({ children, reduced, className = '' }) {
  return <Magnet disabled={reduced} padding={35} magnetStrength={4} maxOffset={12} wrapperClassName={className}>{children}</Magnet>;
}
function ScrollPercent({ progress }) {
  const [value, setValue] = useState(0);
  useMotionValueEvent(progress, 'change', v => setValue(Math.round(v * 100)));
  return <span className="menu-percent" aria-hidden="true">{value}%</span>;
}
function Placeholder({ project, large = false }) {
  return <div className={`project-art art-${project.type} ${large ? 'large-art' : ''}`}>
    <div className="art-grid" /><span className="art-index">{project.number} / VISUAL ARCHIVE</span>
    <span className="art-word" aria-hidden="true">{project.word}</span>
    <Art type={project.type} />
    <span className="art-bottom">{project.en}</span><span className="slot-label">作品待补充</span>
    <span className="art-view" aria-hidden="true"><Arrow diagonal /></span>
  </div>;
}
function NativeDialog({ open, onClose, className = '', labelId, children, onKeyDown }) {
  const ref = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!open) return;
    trigger.current = document.activeElement;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
      if (trigger.current?.isConnected) trigger.current.focus({ preventScroll: true });
    };
  }, [open]);
  return <dialog ref={ref} className={className} aria-labelledby={labelId} onCancel={e => { e.preventDefault(); onClose(); }} onKeyDown={onKeyDown} onClick={e => {
    if (e.target === ref.current) { const r = ref.current.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose(); }
  }}>{open && children}</dialog>;
}

function Hero({ reduced }) {
  const video = useRef(null);
  const section = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [available, setAvailable] = useState(false);
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(!document.hidden);
  const [rippleReady, setRippleReady] = useState(false);
  const [rippleFailed, setRippleFailed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const sceneX = useMotionValue(0);
  const sceneY = useMotionValue(0);
  const x = useSpring(sceneX, { stiffness: 70, damping: 25 });
  const y = useSpring(sceneY, { stiffness: 70, damping: 25 });
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const handlePointer = event => {
    if (reduced) return;
    const rect = section.current.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    sceneX.set((px / rect.width - 0.5) * -32);
    sceneY.set((py / rect.height - 0.5) * -22);
    cursorX.set(px); cursorY.set(py);
    setHovering(event.pointerType !== 'touch' && !event.target.closest('a, button') && px > rect.width * 0.48);
  };
  const leavePointer = () => { sceneX.set(0); sceneY.set(0); setHovering(false); };
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(section.current);
    const change = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', change);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', change); };
  }, []);
  useEffect(() => {
    if (!video.current) return;
    if (!reduced && playing && inView && visible) video.current.play().catch(() => setPlaying(false));
    else video.current.pause();
  }, [reduced, playing, inView, visible, available]);
  useEffect(() => { if (reduced) leavePointer(); }, [reduced]);
  return <section className="hero" id="home" ref={section} onPointerMove={handlePointer} onPointerDown={handlePointer} onPointerLeave={leavePointer}>
    <motion.div className={`hero-scene ${available ? 'video-ready' : ''}`} style={{ x: reduced ? 0 : x, y: reduced ? 0 : y, scale: reduced ? 1 : 1.045 }} aria-hidden="true">
      <div className="fallback-rock rock-one" /><div className="fallback-rock rock-two" /><div className="fallback-rock rock-three" />
      <video ref={video} src={VIDEO} crossOrigin="anonymous" muted loop playsInline preload="auto" onLoadedData={() => setAvailable(true)} onError={() => setAvailable(false)} />
      {available && !rippleFailed && <RippleDistortion videoRef={video} src={VIDEO} onReady={() => setRippleReady(true)} onError={() => setRippleFailed(true)} enabled={!reduced && inView && visible} brushSize={110} strength={0.075} swirl={0.5} rings={2} spread={3.5} fade={1.6} spacing={20} trigger="both" clickStrength={1.6} tintAmount={0} grayscale={true} quality="medium" className={`hero-ripple ${rippleReady && !reduced ? 'is-ready' : ''}`} />}
    </motion.div>
    <div className="hero-wash" />
    <ClickSpark sparkColor="#555" sparkSize={8} sparkRadius={22} sparkCount={6} duration={380} disabled={reduced} className="hero-interactive">
      <div className="hero-top"><Label reduced={reduced}>INDEPENDENT VISUAL DESIGNER</Label><span className="hero-edition">作品集 / 2023 — 2026</span></div>
      <div className="hero-main">
        <p className="hero-name"><span className="tiny-cross">✳</span> 李威 <span>LI WEI</span></p>
        <h1 className="sr-only">李威 · 让价值被看见。视觉设计作品集</h1>
        <AnimatedHeading as="div" className="hero-heading hero-blur-heading" lines={["让价值", "被看见。"]} reduced={reduced} hero />
        <p className="hero-description">以设计连接产品与人。<br />专注电商视觉、三维表达与 AIGC 创作。</p>
        <Magnetic reduced={reduced}><a className="pill-button primary" href="#works">探索作品 <Arrow diagonal /></a></Magnetic>
      </div>
      <div className="hero-side-note"><span className="interaction-cross">＋</span><span>{reduced ? '静态欣赏' : '移动 · 点击 · 探索'}<small>INTERACTIVE VISUAL</small></span></div>
      <a className="orbit-link" href="#about" aria-label="了解李威"><span className="orbit-text">DESIGN · CREATE · EXPLORE ·</span><span className="orbit-arrow"><Arrow diagonal /></span></a>
      <div className="hero-bottom"><a href="#works" className="scroll-cue"><span className="scroll-line" />向下探索</a><span className="hero-fields">视觉设计 <i>/</i> 3D & CGI <i>/</i> AIGC</span><button className="video-toggle" onClick={() => setPlaying(!playing)} disabled={reduced || !available} aria-label={playing && !reduced ? '暂停背景视频' : '播放背景视频'}><span aria-hidden="true">{playing && !reduced ? 'Ⅱ' : '▷'}</span> {reduced ? '静态模式' : playing ? '暂停影像' : '播放影像'}</button></div>
    </ClickSpark>
    {!reduced && <motion.div className={`hero-cursor ${hovering ? 'visible' : ''}`} style={{ x: cursorX, y: cursorY }} aria-hidden="true"><span>探索</span><i /></motion.div>}
  </section>;
}

function Works({ reduced, onOpen }) {
  const [filter, setFilter] = useState('all');
  const shown = useMemo(() => projects.filter(p => filter === 'all' || p.group === filter), [filter]);
  const galleryItems = useMemo(() => shown.map(p => ({ id: p.id, image: p.cover, text: p.title, en: p.en, description: p.description, count: p.collections.length })), [shown]);
  return <section className="works section-pad" id="works">
    <Reveal reduced={reduced} className="section-heading"><div><Label reduced={reduced}>02 / 作品档案</Label><AnimatedHeading lines={["SELECTED", "WORKS."]} reduced={reduced} /></div><p className="section-intro">从产品的第一眼，到品牌的每一面。<br />八个设计方向，探索视觉的更多可能。</p></Reveal>
    <div className="works-toolbar"><div className="filters" aria-label="作品分类">{filters.map(([id, title]) => <button key={id} className={filter === id ? 'active' : ''} onClick={() => setFilter(id)} aria-pressed={filter === id}><span>{title}</span>{id === 'all' && <sup>08</sup>}</button>)}</div><span className="carousel-hint">选择作品，查看完整内容 ↗</span></div>
    <ScrollFade reduced={reduced}><CircularBrowser key={filter} items={galleryItems} label="作品分类环形画廊" covers reduced={reduced} onOpen={item => onOpen(item.id)} /></ScrollFade>
    <div className="collection-note"><span>持续创作，持续探索。</span><span>08 DESIGN DISCIPLINES <span className="status-dot" /></span></div>
  </section>;
}

function About({ reduced }) {
  const [openSkill, setOpenSkill] = useState(0);
  const toggleSkill = i => { setOpenSkill(openSkill === i ? null : i); };
  useEffect(() => { const id = setTimeout(() => ScrollTrigger.refresh(), 500); return () => clearTimeout(id); }, [openSkill]);
  return <section id="about" className="about section-pad">
    <Label reduced={reduced}>01 / ABOUT ME</Label>
    <Reveal reduced={reduced}><AnimatedHeading lines={["ABOUT ME"]} className="about-statement" reduced={reduced} /></Reveal>
    <div className="about-grid"><Reveal reduced={reduced} className="portrait-wrap"><div className="portrait-frame"><img src="./assets/portrait.png" alt="李威的黑白个人肖像" loading="lazy" /><Signature className="portrait-signature" /><span className="portrait-corner">创作，始于观察。</span></div><div className="portrait-caption"><span>李威 / LI WEI</span><span>VISUAL DESIGNER</span></div></Reveal>
      <div className="about-content"><Reveal reduced={reduced}><p className="about-intro">你好，我是李威。<br /><span>一名跨境电商视觉设计师。</span></p><p className="body-copy">专注于亚马逊 Listing、A+ 页面与品牌视觉设计。把产品理解、平面设计、三维渲染与 AIGC 工作流结合起来，让每一个画面都有清晰的表达。</p><div className="about-mini"><span>来自湖南 / HUNAN, CHINA</span><span>2023 — 2026</span></div><div className="achievement-row"><div><strong>200<span>+</span></strong><small>产品渲染 / RENDERS</small></div><div><strong>100<span>+</span></strong><small>产品图片 / VISUALS</small></div><div><strong>10<span>+</span></strong><small>店铺设计优化 / STORES</small></div></div></Reveal>
      <div className="skills"><Reveal reduced={reduced}><div className="skills-heading"><h3>我的创作工具箱</h3><Label reduced={reduced}>THE TOOLKIT</Label></div><LogoLoop logos={toolkitLogos} speed={reduced ? 0 : 54} logoHeight={55} gap={36} labels="below" pauseOnHover scaleOnHover fadeOut fadeOutWidth={0.09} draggable={!reduced} ariaLabel="设计软件与 AIGC 工作流工具" className="toolkit-loop" /></Reveal>{skills.map((skill, i) => <Reveal key={skill.en} reduced={reduced}><div className={`skill ${openSkill === i ? 'is-open' : ''}`}><h4><button onClick={() => toggleSkill(i)} aria-expanded={openSkill === i} aria-controls={`skill-panel-${i}`}><span className="skill-num">0{i + 1}</span><span>{skill.title}<small>{skill.en}</small></span><span className="skill-plus" aria-hidden="true">{openSkill === i ? '−' : '+'}</span></button></h4><AnimatePresence initial={false}>{openSkill === i && <motion.div id={`skill-panel-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : 0.3 }} className="skill-body"><div className="skill-tools">{skill.tools.map(name => <div className="skill-tool" key={name}><ToolIcon name={name} /><span>{name}</span></div>)}</div><p>{skill.copy}</p></motion.div>}</AnimatePresence></div></Reveal>)}</div></div>
    </div>
  </section>;
}

function Workflow({ reduced }) {
  const [step, setStep] = useState(0);
  const tabs = useRef([]);
  const current = steps[step];
  return <section className="workflow section-pad" id="process">
    <Reveal reduced={reduced} className="section-heading"><div><Label reduced={reduced}>04 / 创作流程</Label><AnimatedHeading lines={["IDEAS INTO", "REALITY."]} reduced={reduced} /></div><p className="section-intro">工具不断更新，设计判断始终在场。<br />让创意、技术与细节一起工作。</p></Reveal>
    <Reveal reduced={reduced} className="workflow-layout"><div className="workflow-tabs" role="tablist" aria-label="创作流程" aria-orientation="vertical">{steps.map((s, i) => <button key={s.en} ref={el => tabs.current[i] = el} id={`step-tab-${i}`} role="tab" aria-selected={i === step} aria-controls="step-panel" tabIndex={i === step ? 0 : -1} onClick={() => setStep(i)} onKeyDown={e => { if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) { e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 2 : (i + (e.key === 'ArrowDown' ? 1 : -1) + 3) % 3; setStep(next); tabs.current[next].focus(); } }}><span className="step-number">0{i + 1}</span><span>{s.en}<small>{['理解与洞察', '构建与创作', '融合与精修'][i]}</small></span><Arrow diagonal /></button>)}</div>
      <div id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${step}`} tabIndex={0} className="workflow-panel"><AnimatePresence mode="wait"><motion.div key={step} className="workflow-panel-inner" initial={reduced ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: reduced ? 0 : 0.3 }}><div className="process-art process-image"><img src={current.image} alt={`${current.title}创作流程配图`} loading="lazy" /><span className="process-image-label">0{step + 1} / {current.en}</span></div><div className="process-copy"><AnimatedHeading as="h3" lines={[current.title]} reduced={reduced} /><p>{current.copy}</p><div className="tags">{current.tags.map(t => <span key={t}>{t}</span>)}</div></div></motion.div></AnimatePresence></div>
    </Reveal>
  </section>;
}

export default function App() {
  const isStudio = new URLSearchParams(location.search).get('version') !== 'classic';
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [intro, setIntro] = useState(() => isStudio && !matchMedia('(prefers-reduced-motion: reduce)').matches);
  const finishIntro = useCallback(() => setIntro(false), []);
  const [filmId, setFilmId] = useState('drill');
  const [filmOpen, setFilmOpen] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [menu, setMenu] = useState(false);
  const [contact, setContact] = useState(false);
  const [active, setActive] = useState('home');
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle('reduce-motion', reduced); }, [reduced]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }); }, { rootMargin: '-20% 0px -55% 0px' });
    ['home', 'works', 'films', 'about', 'process', 'contact'].forEach(id => observer.observe(document.getElementById(id)));
    return () => observer.disconnect();
  }, []);
  const nav = [['about', '关于'], ['works', '作品'], ['films', '影像'], ['process', '创作流程']];
  return <MotionConfig reducedMotion={reduced ? 'always' : 'user'} transition={{ ease }}>
    {!matchMedia('(pointer: coarse)').matches && <Crosshair color="#ffffff" thickness={1.3} opacity={0.9} gap={8} fade={0.14} smoothing={0.3} showCoordinates={false} targetEffect="lock" clickPulse hideCursor />}
    <AnimatePresence>{intro && <Entrance key="entrance" onDone={finishIntro} reduced={reduced} />}</AnimatePresence>
    <div className={`portfolio-app ${isStudio ? 'studio-version' : 'classic-version'}`} inert={intro || undefined}>
    <a href="#works" className="skip-link">跳转到作品</a>
    <motion.div className="reading-progress" style={{ scaleX: reduced ? scrollYProgress : smoothProgress }} />
    <header className="site-header"><a className="header-home" href="#home" aria-label="李威作品集首页"><strong>LI WEI<i>®</i></strong><span>VISUAL DESIGNER</span></a>{isStudio ? <button className="studio-menu" onClick={() => setMenu(true)} aria-expanded={menu} aria-label="打开导航菜单"><span className="menu-lines">☰</span><span>探索</span><ScrollPercent progress={scrollYProgress} /></button> : <nav className="desktop-nav" aria-label="主导航">{nav.map(([id, title]) => <a className={active === id ? 'current' : ''} href={`#${id}`} key={id}>{title}<span className="nav-dot" /></a>)}</nav>}<div className="header-actions"><button className="motion-toggle" onClick={() => setReduced(!reduced)} aria-pressed={!reduced} aria-label={reduced ? '开启动效' : '关闭动效'}><span className="motion-symbol" aria-hidden="true">✳</span><span>动效{reduced ? '关闭' : '开启'}</span></button><a className="header-contact" href="#contact">聊聊合作 <Arrow diagonal /></a>{!isStudio && <button className="menu-button" aria-expanded={menu} aria-label="打开导航菜单" onClick={() => setMenu(true)}><span /><span /></button>}</div></header>
    <main>{isStudio ? <StudioHero ready={!intro} reduced={reduced} onReplay={() => { setReduced(false); setIntro(true); }} /> : <Hero reduced={reduced} />}<About reduced={reduced} /><Works reduced={reduced} onOpen={setProjectId} /><FilmGallery selected={filmId} onSelect={setFilmId} open={filmOpen} onOpen={() => setFilmOpen(true)} onClose={() => setFilmOpen(false)} reduced={reduced} /><Workflow reduced={reduced} />
      <PortfolioFooter reduced={reduced} onContact={() => setContact(true)} />
    </main>
    <ProjectBrowser id={projectId} setId={setProjectId} reduced={reduced} />
    <NativeDialog open={menu} onClose={() => setMenu(false)} className="menu-dialog" labelId="menu-title"><div className="menu-top"><span id="menu-title" className="eyebrow">EXPLORE / 导航</span><button className="round-button" aria-label="关闭导航菜单" onClick={() => setMenu(false)}>×</button></div><nav>{[...nav, ['contact', '合作联系']].map(([id, title], i) => <a href={`#${id}`} key={id} onClick={() => setMenu(false)}><sup>0{i + 1}</sup>{title}<Arrow diagonal /></a>)}</nav></NativeDialog>
    <NativeDialog open={contact} onClose={() => setContact(false)} className="contact-dialog" labelId="contact-title"><div className="menu-top"><Label reduced={reduced}>LET’S TALK</Label><button className="round-button" aria-label="关闭联系窗口" onClick={() => setContact(false)}>×</button></div><AnimatedHeading id="contact-title" lines={["MAKE IT", "HAPPEN."]} reduced={reduced} /><p>期待下一次有趣的合作。<br />李威 / 跨境电商视觉设计师</p><div className="contact-lines"><a href="tel:18573041680"><small>PHONE / WECHAT</small>185 7304 1680</a><a href="mailto:1027688839@qq.com"><small>EMAIL</small>1027688839@qq.com</a></div><div className="contact-dialog-bottom"><Signature /><figure className="contact-qr"><div className="contact-qr-image"><img src="./assets/wechat-contact.jpg" alt="微信联系二维码" width="888" height="1131" /></div><figcaption>扫码添加微信</figcaption></figure></div></NativeDialog>
    </div>
  </MotionConfig>;
}
