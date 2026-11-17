import { portfolioMedia } from './portfolioMedia';

const projectDefinitions = [
  {id:'packaging',number:'01',title:'包装设计',en:'PACKAGING DESIGN',group:'space',type:'packaging',size:'wide',theme:'sand',word:'FORM.',tags:['品牌识别','包装视觉'],description:'从品牌语言到材质与结构，让产品的第一印象更鲜明。',slots:['包装主视觉','结构与材质细节','系列包装展示'],cover:'',images:[]},
  {id:'listing',number:'02',title:'亚马逊 Listing 设计',en:'AMAZON LISTING',group:'commerce',type:'listing',size:'narrow',theme:'blue',word:'SELL.',tags:['卖点可视化','A+ 页面'],description:'围绕产品卖点与使用场景，组织主图、附图与 A+ 页面，让信息清晰、体验连贯。',slots:['产品主图与附图','卖点视觉展示','A+ 页面长图'],cover:'',images:[]},
  {id:'interior',number:'03',title:'室内设计',en:'INTERIOR & SPACE',group:'space',type:'interior',size:'narrow',theme:'dark',word:'SPACE.',tags:['空间表达','光影渲染'],description:'以空间、材质与光线构建氛围，探索三维空间的叙事与表现。',slots:['空间全景','材质与光影','局部空间细节'],cover:'',images:[]},
  {id:'aigc',number:'04',title:'AIGC 模特应用',en:'AI × HUMAN',group:'aigc',type:'aigc',size:'wide',theme:'orange',word:'BEYOND.',tags:['AI 创作','商业应用'],description:'结合 AIGC 与设计判断，探索模特、服饰与场景的视觉融合。',slots:['模特应用主视觉','多场景展示','细节与融合效果'],cover:'',images:[]},
  {id:'amazon-kv',number:'05',title:'亚马逊 KV 设计',en:'AMAZON KEY VISUAL',group:'commerce',type:'amazon',size:'wide',theme:'silver',word:'IMPACT.',tags:['品牌主视觉','场景创意'],description:'围绕产品与品牌主题，构建具有焦点、层次和叙事感的跨境电商主视觉。',slots:['横版主视觉','场景与产品细节','多尺寸视觉延展'],cover:'',images:[]},
  {id:'china-kv',number:'06',title:'国内 KV 设计',en:'CAMPAIGN VISUAL',group:'commerce',type:'campaign',size:'narrow',theme:'red',word:'FOCUS.',tags:['活动视觉','创意合成'],description:'让主题、产品与氛围在同一画面中形成合力，为活动建立鲜明的视觉记忆。',slots:['活动主视觉','创意合成细节','活动物料延展'],cover:'',images:[]},
  {id:'detail',number:'07',title:'国内详情页设计',en:'PRODUCT STORY',group:'commerce',type:'detail',size:'narrow',theme:'cream',word:'STORY.',tags:['信息编排','产品叙事'],description:'以连贯的阅读节奏呈现产品价值，让卖点、细节与使用场景自然衔接。',slots:['详情页首屏','完整详情长图','重点卖点模块'],cover:'',images:[]},
  {id:'retouch',number:'08',title:'产品精修',en:'CRAFTED DETAILS',group:'aigc',type:'retouch',size:'wide',theme:'charcoal',word:'DETAIL.',tags:['质感塑造','光影精修'],description:'打磨光影、色彩与材质细节，让产品本身的质感成为画面的主角。',slots:['产品精修展示','材质特写','处理前后对照'],cover:'',images:[]}
];

const collectionDescriptions = {
  '便携式咖啡机': '以萃取结构、操作步骤与使用场景组织产品信息，结合生活方式画面，展示便携咖啡体验。',
  '挂衣架': '围绕智能窗帘产品的控制方式、续航与安装场景，组织功能卖点及 A+ 信息。',
  '机械臂': '通过安装结构、调节范围与桌面场景，呈现显示器支架的功能特点与使用体验。',
  '空气加湿器': '结合赛博朋克造型、喷雾效果与操作细节，建立有辨识度的产品视觉与 A+ 页面。',
  '茶叶': '以茶文化与纸张肌理为线索，呈现礼盒、内袋与系列包装之间的统一视觉语言。',
  '键盘': '从产品识别到包装展示，以清晰的版式和产品视觉建立数码产品的第一印象。',
  '咖啡条': '围绕日常咖啡体验，组织条装、外盒与场景画面，呈现轻便而完整的系列包装。',
  '蓝牙耳机': '通过产品形态、功能信息与包装画面的组合，探索数码产品的视觉表达。',
  '香水': '以瓶型、材质与光影塑造气质，让香氛的感受延伸至包装与展示场景。',
  '音箱': '结合声音产品的形态与使用场景，展示包装识别、产品表现与细节设计。',
  '精修的': '整理完成后的产品画面，聚焦材质、边缘、色彩与高光细节。',
  '原来的': '保留产品的原始画面，作为观察材质、分析光线与开展精修的起点。'
};

const listingCovers = { '便携式咖啡机': '013', '挂衣架': '023', '机械臂': '035', '空气加湿器': '039' };
const categoryCovers = { aigc: './portfolio/aigc/007.webp', 'china-kv': './portfolio/china-kv/013.webp', detail: './portfolio/detail/037.webp' };
const collectionOverrides = {
  'aigc/模特线稿人偶': { title: '模特对比应用', cover: './portfolio/aigc/007.webp', layout: 'model-comparison', description: '从线稿与人偶到模特场景，再到产品使用前后的效果表达，让创意过程与应用结果一一对应。' },
  'packaging/音箱': { cover: './portfolio/packaging/034.webp' }
};

// Match by product: the original and retouched folders have different orders.
export const retouchPairs = [
  ['黄色便携剃须刀', '015', '001'],
  ['无线耳机', '013', '002'],
  ['黑色按压瓶', '017', '003'],
  ['便携咖啡机', '012', '004'],
  ['滴管精华瓶', '011', '005'],
  ['手持美容仪', '014', '006'],
  ['头戴设备', '016', '007'],
  ['便携音箱', '018', '008'],
  ['护肤软管', '019', '009'],
  ['旋钮设备', '020', '010']
].map(([title, before, after]) => ({ title, before: `./portfolio/retouch/${before}.webp`, after: `./portfolio/retouch/${after}.webp` }));

export const projects = projectDefinitions.map(project => {
  const images = portfolioMedia[project.id] || [];
  const groups = new Map();
  images.forEach(image => {
    const name = image.label || project.title;
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(image);
  });
  const collections = Array.from(groups, ([title, photos]) => ({
    id: title,
    title,
    cover: project.id === 'listing' && listingCovers[title] ? `./portfolio/listing/${listingCovers[title]}.webp` : photos[0].src,
    images: photos,
    description: collectionDescriptions[title] || `${title}系列作品。${project.description}`,
    ...collectionOverrides[`${project.id}/${title}`]
  }));
  return { ...project, cover: categoryCovers[project.id] || collections[0]?.cover || '', images, collections };
});
