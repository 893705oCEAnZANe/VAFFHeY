// 代码生成时间: 2025-11-02 15:14:45
const express = require('express');
const app = express();
const port = 3000;

// 使用内存缓存（例如Redis）
const cache = require('memory-cache');
const MemoryCache = new cache.Cache();

// 缓存时间设置，单位为秒
const CACHE_DURATION = 60; // 1分钟

// 模拟数据库数据
const data = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};

// 获取数据的函数
function getData() {
  return data;
}

// 缓存中获取数据的中间件
app.use((req, res, next) => {
  // 检查缓存
  const cachedData = MemoryCache.get(req.path);
  if (cachedData) {
    // 如果数据在缓存中，直接返回
    res.json(cachedData);
  } else {
    // 否则继续执行下一个中间件
    next();
  }
});

// 数据获取路由
app.get('/data/:id', (req, res) => {
  // 尝试从缓存中获取数据
  const cachedData = MemoryCache.get(`/data/${req.params.id}`);
  if (cachedData) {
    // 如果数据在缓存中，返回缓存数据
    return res.json(cachedData);
  } else {
    // 模拟数据库查询延迟
    setTimeout(() => {
      const result = getData();
      // 设置缓存
      MemoryCache.put(`/data/${req.params.id}`, result, CACHE_DURATION * 1000);
      res.json(result);
    }, 100);
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 启动服务器
app.listen(port, () => {
  console.log(`Cache strategy express app listening at http://localhost:${port}`);
});

// 代码注释：
// 1. 引入express框架
// 2. 创建express应用和设置端口
// 3. 使用memory-cache库实现内存缓存
// 4. 设置缓存时间
// 5. 模拟数据库数据
// 6. 定义获取数据的函数
// 7. 定义缓存中获取数据的中间件，检查请求路径是否在缓存中
// 8. 定义数据获取路由，如果缓存中没有数据，则模拟数据库查询并设置缓存
// 9. 定义错误处理中间件
// 10. 启动服务器并打印日志