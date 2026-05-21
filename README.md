# 智能抠图软件 - AI Background Removal

一个基于人工智能的图片背景去除工具，使用先进的深度学习模型实现一键智能抠图。

## 功能特性

- **AI 智能识别**：使用 U-2-Net 深度学习模型，精准识别图片主体
- **简单易用**：拖拽上传，一键处理，无需专业技能
- **快速处理**：本地 AI 模型，保护隐私，处理速度快
- **现代 UI**：基于 React + TailwindCSS 的现代化界面
- **多种格式**：支持 PNG、JPG、JPEG、WebP 等常见图片格式

## 技术栈

### 后端
- Python 3.8+
- FastAPI - 高性能 Web 框架
- rembg - AI 背景去除库（基于 U-2-Net 模型）
- Pillow - 图像处理

### 前端
- React 18 - 用户界面框架
- Vite - 快速构建工具
- TailwindCSS - 样式框架
- Lucide React - 图标库
- Axios - HTTP 客户端

## 项目结构

```
meit/
├── backend/                 # 后端服务
│   ├── main.py             # FastAPI 主应用
│   └── README.md           # 后端文档
├── frontend/               # 前端应用
│   ├── src/
│   │   ├── App.jsx         # 主组件
│   │   ├── main.jsx        # 入口文件
│   │   └── index.css       # 全局样式
│   ├── index.html          # HTML 模板
│   ├── package.json        # 依赖配置
│   ├── vite.config.js      # Vite 配置
│   ├── tailwind.config.js  # TailwindCSS 配置
│   └── postcss.config.js   # PostCSS 配置
└── requirements.txt        # Python 依赖
```

## 安装步骤

### 1. 安装 Python 依赖

```bash
pip install -r requirements.txt
```

### 2. 安装前端依赖

```bash
cd frontend
npm install
```

## 运行项目

### 启动后端服务

在项目根目录下：

```bash
cd backend
python main.py
```

后端服务将在 `http://localhost:8000` 启动

### 启动前端服务

在项目根目录下：

```bash
cd frontend
npm run dev
```

前端服务将在 `http://localhost:3000` 启动

## 使用说明

1. 打开浏览器访问 `http://localhost:3000`
2. 点击上传区域或拖拽图片到上传区域
3. 点击"开始抠图"按钮
4. 等待 AI 处理完成
5. 点击"下载结果"按钮保存处理后的图片

## API 接口

### POST /remove-background

移除图片背景

**请求：**
- Method: POST
- Content-Type: multipart/form-data
- Body: file (图片文件)

**响应：**
- Content-Type: image/png
- Body: 处理后的 PNG 图片

## 注意事项

- 首次运行时，rembg 会自动下载 AI 模型（约 176MB），请确保网络连接正常
- 建议使用 GPU 加速以提高处理速度（需要安装 PyTorch with CUDA）
- 处理大尺寸图片可能需要较长时间，请耐心等待

## 性能优化建议

1. **使用 GPU**：安装 CUDA 版本的 PyTorch 可大幅提升处理速度
2. **限制图片尺寸**：前端可添加图片尺寸限制以减少处理时间
3. **缓存模型**：模型下载后会自动缓存，后续启动无需重新下载

## 常见问题

### Q: 处理速度慢怎么办？
A: 可以尝试安装 GPU 版本的 PyTorch，或在上传前压缩图片尺寸。

### Q: 支持哪些图片格式？
A: 支持 PNG、JPG、JPEG、WebP 等常见格式。

### Q: 处理结果不理想？
A: AI 模型对主体清晰、背景简单的图片效果最佳。复杂场景可能需要手动调整。

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 免费部署

详细的免费部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 快速部署

**前端 (Vercel)**
```bash
# 1. 推送代码到 GitHub
# 2. 在 Vercel 导入仓库
# 3. 配置环境变量 VITE_API_URL
# 4. 部署
```

**后端 (Render)**
```bash
# 1. 推送代码到 GitHub
# 2. 在 Render 导入仓库
# 3. 配置构建和启动命令
# 4. 部署
```

⚠️ **注意**: 免费平台有内存和性能限制，AI 模型可能无法正常运行。详见 DEPLOYMENT.md
