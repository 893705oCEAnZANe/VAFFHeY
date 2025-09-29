// 代码生成时间: 2025-09-29 19:05:30
// 引入Express框架
const express = require('express');
const app = express();
const port = 3000;

// 引入axios用于发送HTTP请求
const axios = require('axios');

// 允许跨源请求
app.use((express).json());

// 负载测试配置
const testConfig = {
  targetUrl: 'http://example.com', // 目标URL
  concurrencies: 10, // 并发请求数
  requests: 100, // 总请求数
  method: 'GET', // 请求方法
};

// 统计信息
let stats = {
  success: 0,
  failure: 0,
  latency: [],
};

// 启动负载测试
app.post('/start-load-test', async (req, res) => {
  try {
    // 获取请求体中的配置
    const { targetUrl, concurrencies, requests, method } = req.body;
    testConfig.targetUrl = targetUrl;
    testConfig.concurrencies = concurrencies;
    testConfig.requests = requests;
    testConfig.method = method;

    // 重置统计信息
    stats.success = 0;
    stats.failure = 0;
    stats.latency = [];

    // 使用Promise.all并发发送请求
    const promises = [];
    for (let i = 0; i < requests; i++) {
      promises.push(sendRequest());
    }

    // 发送请求并统计结果
    const results = await Promise.all(promises);
    results.forEach((result) => {
      if (result.status === 200) {
        stats.success++;
        stats.latency.push(result.latency);
      } else {
        stats.failure++;
      }
    });

    // 返回测试结果
    res.json(stats);
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 发送单个HTTP请求
async function sendRequest() {
  try {
    const response = await axios({
      url: testConfig.targetUrl,
      method: testConfig.method,
    });
    return {
      status: response.status,
      latency: response.request.timings.total,
    };
  } catch (error) {
    return {
      status: error.response ? error.response.status : null,
      latency: null,
    };
  }
}

// 启动服务器
app.listen(port, () => {
  console.log(`Load Test Tool listening at http://localhost:${port}`);
});