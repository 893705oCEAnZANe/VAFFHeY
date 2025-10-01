// 代码生成时间: 2025-10-01 17:16:35
const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// 创建Express应用
const app = express();
const port = 3000;

// 负载测试配置对象
const loadTestConfig = {
  targetUrl: 'http://localhost:3000',  // 目标URL
  concurrentRequests: 100,             // 并发请求数
  totalRequests: 1000,                // 总请求数
  interval: 100                         // 请求间隔时间（毫秒）
};

// 生成测试数据的函数
function generateTestData() {
  return {
    id: uuidv4(),
    name: `TestUser${Math.floor(Math.random() * 1000)}`,
    email: `testuser${Math.floor(Math.random() * 1000)}@example.com`
  };
}

// 发送请求的函数
async function sendRequest(data) {
  try {
    const response = await axios.post(loadTestConfig.targetUrl + '/api/test', data);
    return response.status;
  } catch (error) {
    console.error('Request failed:', error.message);
    return error.response ? error.response.status : 500;
  }
}

// 负载测试的主函数
async function performLoadTest() {
  let completedRequests = 0;
  let successfulRequests = 0;
  let failedRequests = 0;

  const startTime = Date.now();

  while (completedRequests < loadTestConfig.totalRequests) {
    const testData = generateTestData();
    const status = await sendRequest(testData);

    if (status === 200) {
      successfulRequests++;
    } else {
      failedRequests++;
    }

    completedRequests++;

    // 控制请求间隔
    if (completedRequests % loadTestConfig.concurrentRequests === 0) {
      await new Promise(resolve => setTimeout(resolve, loadTestConfig.interval));
    }
  }

  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;

  console.log(`Load Test Completed: ${successfulRequests} successful requests, ${failedRequests} failed requests, Duration: ${duration} seconds`);
}

// Express路由处理函数
app.post('/api/test', async (req, res) => {
  try {
    // 模拟一些业务逻辑
    await new Promise(resolve => setTimeout(resolve, 100));
    res.status(200).send('Request processed');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// 启动Express服务器
app.listen(port, () => {
  console.log(`Load Test Tool is listening at http://localhost:${port}`);
  // 执行负载测试
  performLoadTest();
});