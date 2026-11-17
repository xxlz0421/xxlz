export default function ListingCaseStudy({ collection }) {
  const listing = collection.images.filter(image => image.width / image.height < 1.35);
  const aplus = collection.images.filter(image => image.width / image.height >= 1.35);
  return <article className="listing-case">
    <header className="case-cover" style={{ '--case-image': `url("${collection.cover}")` }}><div className="case-cover-meta"><span>LI WEI / VISUAL DESIGN</span><span>AMAZON LISTING</span></div><div className="case-cover-title"><span>产品视觉 / 信息设计</span><h3>{collection.title}<br /><em>让卖点，清晰可见。</em></h3><p>LISTING · A+ CONTENT · PRODUCT STORY</p></div><span className="case-cover-arrow">↗</span></header>
    <section className="listing-main"><aside><span className="case-number">01 / LISTING IMAGES</span><h3>从第一眼，<br />读懂产品。</h3><p>{collection.description}</p><dl><div><dt>设计内容</dt><dd>产品主图 / 功能卖点 / 使用场景</dd></div><div><dt>设计方向</dt><dd>视觉层级 · 信息编排 · 质感呈现</dd></div></dl></aside><div className="listing-image-grid">{listing.map((image, i) => <figure key={image.src}><img src={image.src} alt={`${collection.title} · 产品图 ${i + 1}`} loading="lazy" /></figure>)}</div></section>
    {aplus.length > 0 && <section className="listing-aplus"><header><div><span className="case-number">02 / BRAND CONTENT</span><h3>Amazon A<span>+</span></h3></div><p>把产品细节，串联成完整的阅读体验。</p></header><div className="aplus-divider"><span>A+ Story</span><i /></div><div className="aplus-images">{aplus.map((image, i) => <img key={image.src} src={image.src} alt={`${collection.title} · A+ 模块 ${i + 1}`} loading="lazy" />)}</div></section>}
    <footer className="case-end"><span>DESIGN IN EVERY DETAIL.</span><p>{collection.title} / {collection.images.length} 张作品图片</p></footer>
  </article>;
}
