import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { films } from './films';
import CircularBrowser from './CircularBrowser';
import { AnimatedHeading, ScrollFade } from './AnimatedText';

const filmItems = films.map(f => ({ id: f.id, image: f.poster, text: f.title, en: f.en, description: f.description }));

export default function FilmGallery({ selected, onSelect, open, onOpen, onClose, reduced }) {
  const index = Math.max(0, films.findIndex(f => f.id === selected));
  const film = films[index];
  const modal = useRef(null);
  const player = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!open) return;
    const dialog = modal.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      player.current?.pause();
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [open]);
  useEffect(() => { setError(false); setPlaying(false); if (modal.current) modal.current.scrollTop = 0; }, [selected, open]);
  const move = direction => onSelect(films[(index + direction + films.length) % films.length].id);
  return <section className="film-section section-pad" id="films">
    <ScrollFade reduced={reduced} className="section-heading"><div><span className="eyebrow">03 / AIGC 影像实验</span><AnimatedHeading lines={['MOTION', 'STORIES.']} reduced={reduced} /></div><p className="section-intro">六支 AIGC 生成短片。<br />从一帧画面，走进一段产品故事。</p></ScrollFade>
    <CircularBrowser items={filmItems} reduced={reduced} covers label="视频环形画廊" action="观看短片" onOpen={item => { onSelect(item.id); onOpen(); }} />
    <dialog ref={modal} className="film-modal film-story-dialog" aria-labelledby="film-story-title" onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === modal.current) { const box = e.currentTarget.getBoundingClientRect(); if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) onClose(); } }}>
      {open && <motion.div className="film-modal-inner" initial={reduced ? false : { opacity: 0, y: 60, clipPath: 'inset(12% 4% 12% 4%)' }} animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>
        <div className="film-modal-top"><span>LI WEI® <i>/</i> MOTION ARCHIVE</span><span className="film-story-status"><i />{playing ? '正在播放' : 'AIGC FILM'} / {film.number}</span><button autoFocus onClick={onClose} aria-label="关闭视频播放器">×</button></div>
        <header className="film-story-heading" key={`title-${film.id}`}><div><span className="eyebrow">A FILM BY LI WEI / {film.duration}</span><AnimatedHeading as="h2" id="film-story-title" lines={[film.en]} reduced={reduced} hero /></div><p>{film.title}<span>{film.category}</span></p></header>
        <div className="cinema-layout"><nav className="cinema-rail" aria-label="切换短片">{films.map(item => <button key={item.id} aria-label={`播放${item.title}`} aria-pressed={item.id === film.id} onClick={() => onSelect(item.id)}><img src={item.poster} alt="" /><span>{item.number} <b>{item.title}</b></span></button>)}</nav><div>
          <motion.div key={film.id} className="film-story-screen" initial={reduced ? false : { opacity: 0, scale: .94, rotateX: 4, y: 24 }} animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}><video ref={player} src={film.src} poster={film.poster} controls autoPlay playsInline preload="metadata" aria-label={`${film.title} AIGC 生成短片`} onPlay={() => { setPlaying(true); setError(false); }} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setError(true)} />{error && <div className="film-error" role="status"><span>暂时无法加载这支短片</span><button onClick={() => { setError(false); player.current?.load(); }}>重新加载 ↻</button><a href={film.src} target="_blank" rel="noreferrer">单独打开视频 ↗</a></div>}</motion.div>
          <div className="film-story-copy"><div><span className="eyebrow">THE CONCEPT / 影像概念</span><h3>从产品出发，<br />让画面讲述故事。</h3></div><div><p>{film.description}</p><div className="tags">{film.tags.map(tag => <span key={tag}>{tag}</span>)}</div><dl className="film-facts"><div><dt>创作形式</dt><dd>AIGC 商业影像探索</dd></div><div><dt>画幅 / 时长</dt><dd>16:9 / {film.duration}</dd></div></dl></div></div>
        </div></div>
        <div className="film-modal-bottom"><button onClick={() => move(-1)}>← PREVIOUS FILM</button><span>{film.number} / 06</span><button onClick={() => move(1)}>NEXT FILM →</button></div>
      </motion.div>}
    </dialog>
  </section>;
}
