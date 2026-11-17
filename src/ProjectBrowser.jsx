import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { projects } from './projects';
import { AnimatedHeading } from './AnimatedText';
import CircularBrowser from './CircularBrowser';
import ListingCaseStudy from './ListingCaseStudy';
import ProjectImageLayout from './ProjectImageLayout';
import RetouchComparison from './RetouchComparison';
import ModelComparison from './ModelComparison';

export default function ProjectBrowser({ id, setId, reduced }) {
  const dialog = useRef(null);
  const scroller = useRef(null);
  const [collectionId, setCollectionId] = useState(null);
  const index = projects.findIndex(project => project.id === id);
  const project = projects[index];
  const collection = project?.collections.find(item => item.id === collectionId);
  const collectionIndex = project?.collections.findIndex(item => item.id === collectionId) ?? -1;
  const open = Boolean(project);
  const galleryItems = useMemo(() => (project?.collections || []).map(item => ({ id: item.id, image: item.cover, text: item.title, en: project.en, description: item.description })), [project]);
  const close = () => setId(null);
  useEffect(() => { setCollectionId(null); }, [id]);
  useEffect(() => { if (scroller.current) scroller.current.scrollTop = 0; }, [id, collectionId]);
  useEffect(() => {
    if (!open) return;
    const el = dialog.current;
    const focused = document.activeElement;
    const overflow = document.body.style.overflow;
    el.showModal();
    document.body.style.overflow = 'hidden';
    return () => { el.close(); document.body.style.overflow = overflow; focused?.focus?.({ preventScroll: true }); };
  }, [open]);
  const move = direction => {
    if (collection) setCollectionId(project.collections[(collectionIndex + direction + project.collections.length) % project.collections.length].id);
    else setId(projects[(index + direction + projects.length) % projects.length].id);
  };
  return <dialog ref={dialog} className="project-dialog project-browser" aria-labelledby="project-title" onCancel={event => { event.preventDefault(); close(); }} onKeyDown={event => { if (event.defaultPrevented || event.target.closest('.circular-browser')) return; if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
    {project && <>
      <div className="detail-top"><span className="eyebrow">{project.number} / 08</span><button autoFocus className="round-button close-button" onClick={close} aria-label="关闭项目详情">×</button></div>
      <div className="detail-scroll" ref={scroller}>
        <AnimatePresence mode="wait"><motion.div key={`${id}-${collection?.id || 'overview'}`} initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduced ? 0 : 0.22 }}>
          <header className="detail-header"><div><span className="eyebrow">{project.en}{project.id === 'retouch' ? ' / BEFORE & AFTER' : collection ? ' / PROJECT' : ' / COLLECTION'}</span><AnimatedHeading id="project-title" lines={[collection?.title || project.title]} reduced={reduced} /><p className="project-browser-count">{project.id === 'retouch' ? '10 组精修对比 · 20 张作品图片' : collection ? `${collection.images.length} 张作品图片` : `${project.collections.length} 个项目 · ${project.images.length} 张作品图片`}</p></div><div><p>{collection?.description || project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></header>
          {project.id === 'retouch' ? <RetouchComparison /> : collection ? (collection.layout === 'model-comparison' ? <ModelComparison collection={collection} /> : project.id === 'listing' ? <ListingCaseStudy collection={collection} /> : <ProjectImageLayout collection={collection} />) : <CircularBrowser key={`${id}-categories`} items={galleryItems} label={`${project.title}子项目`} covers reduced={reduced} onOpen={item => setCollectionId(item.id)} />}

        </motion.div></AnimatePresence>
        <div className="detail-end"><span>{collection || project.id === 'retouch' ? '每一处细节，都是表达的一部分。' : '选择一个项目，探索完整的设计表达。'}</span><button className="text-button" onClick={() => move(1)}>{collection ? '下一个项目' : '下一个分类'} →</button></div>
      </div>
      <div className="detail-return"><button className="detail-back" onClick={() => collection ? setCollectionId(null) : close()}><span aria-hidden="true">←</span>{collection ? `返回${project.title}` : '返回作品'}</button></div>
      <div className="detail-nav"><button onClick={() => move(-1)}>← 上一个{collection ? '项目' : '分类'}</button><span>{project.id === 'retouch' ? '左侧精修前 / 右侧精修后' : collection ? `${project.title} / ${collection.title}` : '选择项目，进入完整图库'}</span><button onClick={() => move(1)}>下一个{collection ? '项目' : '分类'} →</button></div>
    </>}
  </dialog>;
}
