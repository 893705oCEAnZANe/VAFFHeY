// 代码生成时间: 2025-10-02 19:34:31
const express = require('express');
const crypto = require('crypto');

// 设置加密算法
const algorithm = 'aes-256-cbc';

// 定义加密密钥和IV（初始化向量）
// 注意：在生产环境中，这些值应该安全存储，并且不应该硬编码在代码中
const secretKey = 'your-secret-key';
const iv = 'your-initialization-vector';

const app = express();

// 定义加密函数
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'utf-8'), Buffer.from(iv, 'utf-8'));
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// 定义解密函数
function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'utf-8'), Buffer.from(iv, 'utf-8'));
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// 设置端口号
const port = 3000;

// 路由：加密密码
app.post('/encrypt', (req, res) => {
  const text = req.body.text;
  if (!text) {
    res.status(400).send('Text to encrypt is missing.');
    return;
  }
  try {
    const encrypted = encrypt(text);
    res.json({
      status: 'success',
      encrypted
    });
  } catch (error) {
    res.status(500).send('Encryption failed.');
  }
});

// 路由：解密密码
app.post('/decrypt', (req, res) => {
  const encryptedText = req.body.encryptedText;
  if (!encryptedText) {
    res.status(400).send('Encrypted text to decrypt is missing.');
    return;
  }
  try {
    const decrypted = decrypt(encryptedText);
    res.json({
      status: 'success',
      decrypted
    });
  } catch (error) {
    res.status(500).send('Decryption failed.');
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Password tool running on port ${port}`);
});