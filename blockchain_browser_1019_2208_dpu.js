// 代码生成时间: 2025-10-19 22:08:16
const express = require('express');
const axios = require('axios');
const { env } = require('process');

// 定义常量
const PORT = 3000;
const BLOCKCHAIN_API_URL = env.BLOCKCHAIN_API_URL || 'https://blockchain.info/';

// 创建Express应用
const app = express();

// 中间件：解析JSON请求体
app.use(express.json());

// 根路由（示例）
app.get('/', (req, res) => {
  res.send('Welcome to Blockchain Browser!');
});

// 获取区块链信息
app.get('/blocks/latest', async (req, res) => {
  try {
    // 使用Axios获取最新的区块信息
    const response = await axios.get(`${BLOCKCHAIN_API_URL}latestblock`);
    
    // 发送响应
    res.json(response.data);
  } catch (error) {
    // 错误处理
    console.error('Error fetching latest block:', error);
    res.status(500).send('Error fetching latest block');
  }
});

// 获取区块链某个区块的详细信息
app.get('/blocks/:blockHash', async (req, res) => {
  const { blockHash } = req.params;
  try {
    // 使用Axios获取指定区块的信息
    const response = await axios.get(`${BLOCKCHAIN_API_URL}rawblock/${blockHash}`);
    
    // 发送响应
    res.json(response.data);
  } catch (error) {
    // 错误处理
    console.error('Error fetching block details:', error);
    res.status(500).send('Error fetching block details');
  }
});

// 获取区块链交易信息
app.get('/tx/:txHash', async (req, res) => {
  const { txHash } = req.params;
  try {
    // 使用Axios获取指定交易的信息
    const response = await axios.get(`${BLOCKCHAIN_API_URL}rawtx/${txHash}`);
    
    // 发送响应
    res.json(response.data);
  } catch (error) {
    // 错误处理
    console.error('Error fetching transaction details:', error);
    res.status(500).send('Error fetching transaction details');
  }
});

// 监听端口
app.listen(PORT, () => {
  console.log(`Blockchain browser running on port ${PORT}`);
});
