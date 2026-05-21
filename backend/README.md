# Backend - 智能抠图 API

## 安装依赖

```bash
pip install -r requirements.txt
```

## 运行服务

```bash
cd backend
python main.py
```

服务将在 http://localhost:8000 启动

## API 端点

- `POST /remove-background` - 上传图片并移除背景
  - 接受: multipart/form-data 格式的图片文件
  - 返回: PNG 格式的处理后的图片
