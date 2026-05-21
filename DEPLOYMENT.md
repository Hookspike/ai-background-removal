# 免费部署指南

## 免费平台分析

### 后端部署选项

由于本项目使用 AI 模型（rembg）需要较多计算资源，免费平台有限制：

#### 1. Render（推荐）
- **免费额度**: Web Service 免费套餐
- **限制**:
  - 15分钟无活动后自动休眠（冷启动约30秒）
  - 512MB RAM（可能不够运行 rembg）
  - 每月750小时运行时间
- **适用性**: ⚠️ 可能内存不足，但可以尝试

#### 2. Railway
- **免费额度**: $5/月免费额度
- **限制**:
  - 超过额度后需要付费
  - 512MB RAM
  - 冷启动时间较长
- **适用性**: ⚠️ 免费额度有限，长期使用需付费

#### 3. PythonAnywhere
- **免费额度**: 仅支持脚本，不支持 Web 应用
- **适用性**: ❌ 不适合

#### 4. Glitch
- **免费额度**: 200MB 磁盘空间
- **限制**:
  - 磁盘空间太小（AI模型约176MB）
  - 无活动后休眠
- **适用性**: ❌ 磁盘空间不足

### 前端部署选项

#### 1. Vercel（强烈推荐）
- **免费额度**: 无限静态托管
- **限制**: 无实际限制
- **适用性**: ✅ 完美适合

#### 2. Netlify
- **免费额度**: 无限静态托管
- **限制**: 无实际限制
- **适用性**: ✅ 完美适合

#### 3. GitHub Pages
- **免费额度**: 无限静态托管
- **限制**: 仅支持静态文件
- **适用性**: ✅ 完美适合

## 推荐部署方案

### 方案一：Render + Vercel（推荐尝试）

**后端 - Render**
```bash
# 1. 将代码推送到 GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# 2. 登录 Render (render.com)
# 3. 点击 "New Web Service"
# 4. 连接 GitHub 仓库
# 5. 配置:
#    - Build Command: pip install -r requirements.txt
#    - Start Command: uvicorn backend.main:app --host 0.0.0.0 --port $PORT
#    - Python Version: 3.11
# 6. 添加环境变量（如果需要）
# 7. 部署
```

**前端 - Vercel**
```bash
# 1. 登录 Vercel (vercel.com)
# 2. 点击 "Add New Project"
# 3. 导入 GitHub 仓库
# 4. 配置:
#    - Framework Preset: Vite
#    - Root Directory: frontend
#    - Build Command: npm run build
#    - Output Directory: dist
# 5. 添加环境变量:
#    - VITE_API_URL: https://your-backend-url.onrender.com
# 6. 部署
```

### 方案二：仅前端部署（使用第三方 API）

如果后端免费部署不可行，可以考虑使用第三方 API：

#### remove.bg API
- 免费额度: 每月50张图片
- 优点: 无需部署后端
- 缺点: 有使用限制

**修改前端代码使用 remove.bg API**:
```javascript
// 替换 API 调用
const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
  headers: {
    'X-Api-Key': 'YOUR_API_KEY',
  },
})
```

### 方案三：本地部署 + 内网穿透

使用 ngrok 或 frp 将本地服务暴露到公网：

```bash
# 安装 ngrok
# 1. 下载 ngrok (ngrok.com)
# 2. 启动后端
python backend/main.py

# 3. 在另一个终端启动 ngrok
ngrok http 8000

# 4. 复制 ngrok 提供的 URL
# 5. 部署前端到 Vercel，配置 VITE_API_URL 为 ngrok URL
```

## 部署配置文件

项目已包含以下部署配置文件：

### Render 配置
- `render.yaml` - Render 平台配置

### Vercel 配置
- `frontend/vercel.json` - Vercel 平台配置
- `frontend/.env.production` - 生产环境变量

## 重要提示

### 免费平台限制

1. **内存限制**: rembg + onnxruntime 需要较多内存，免费平台的 512MB 可能不够
2. **冷启动**: 免费服务休眠后重新启动需要下载 AI 模型（约176MB），首次请求会很慢
3. **CPU 限制**: 免费平台 CPU 性能有限，处理大图片会很慢
4. **运行时间限制**: 某些平台有每月运行时间限制

### 优化建议

如果免费部署遇到问题，可以考虑：

1. **使用更轻量的模型**: 替换 rembg 为更轻量的背景移除库
2. **限制图片尺寸**: 在前端添加图片尺寸限制，只处理小图片
3. **使用 CDN**: 将 AI 模型缓存到 CDN 加快冷启动
4. **付费升级**: 考虑使用付费服务获得更好的性能

## 测试部署

部署后测试步骤：

1. 访问前端 URL
2. 上传测试图片
3. 等待处理（首次可能较慢）
4. 检查是否能下载结果
5. 查看后端日志确认无错误

## 故障排除

### 后端部署失败

- 检查 Python 版本（需要 3.8+）
- 检查依赖是否全部安装
- 检查内存是否足够
- 查看 Render 控制台的日志

### 前端无法连接后端

- 检查 VITE_API_URL 环境变量是否正确
- 检查后端是否正常运行
- 检查 CORS 配置

### 处理速度慢

- 这是免费平台的正常现象
- 首次请求需要下载 AI 模型
- 考虑升级到付费服务

## 结论

**可以免费部署，但有显著限制**:

- ✅ 前端可以完全免费部署（Vercel/Netlify/GitHub Pages）
- ⚠️ 后端可以尝试免费部署（Render），但可能因内存不足而失败
- 💡 推荐方案：本地运行后端 + 免费部署前端，或使用第三方 API

如果需要稳定的生产环境，建议使用付费服务或自建服务器。
