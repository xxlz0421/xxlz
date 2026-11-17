# 李威 · 视觉设计作品集

React + Vite 个人作品集，包含作品分类、项目图集、产品精修对比、模特对比、视频和联系二维码。

## 本地运行

需要 Node.js 24 和 pnpm 11.25.0。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## 构建与部署

```sh
pnpm run build
pnpm preview
```

构建结果位于 `dist/`。源码、作品图片、字体和视频均已包含在仓库中；依赖目录和本地临时文件不纳入版本控制。

在仓库 **Settings → Pages → Source** 选择 **GitHub Actions**。推送到 `main` 后，工作流自动构建并部署，成功后访问：https://xxlz0421.github.io/xxlz/

使用相对资源路径，也可将 `dist/` 的全部内容上传到其他静态网站托管服务。

## 文件结构

- `src/`：页面、交互、样式和作品数据
- `public/assets/`：页面图片、字体和二维码
- `public/portfolio/`：作品图片
- `public/films/`：视频与封面
- `.github/workflows/deploy.yml`：自动部署配置
- `public/REACT-BITS-LICENSE.txt`：第三方组件许可

作品素材版权归原权利人所有。公开仓库不意味着授予素材使用许可。
