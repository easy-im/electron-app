# electron-app


## 开发

**需要启动main进程和renderer进程**

### 启动main进程

```bash
npm run serve:main
```

**暂不支持main进程hot reload**

### 启动renderer进程

```bash
npm run serve:renderer
```


renderer进程在开发环境下是一个多页应用，每个页面在 src/renderer/pages 下以子目录的形式组织，即每个子目录表示一个单页应用

每个子目录必须包含 index.tsx 和 index.html 作为入口

## 打包
+ macOS
```bash
npm run build:mac
```
+ Windows
```bash
npm run build:win
```


## 技术选型
+ React V18.x
+ Webpack v5.x
+ Electron v18.x
+ TypeScript

## 开发环境
+ Node v16.x
+ npm v8.x
