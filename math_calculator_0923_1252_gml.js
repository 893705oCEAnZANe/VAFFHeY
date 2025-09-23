// 代码生成时间: 2025-09-23 12:52:41
const express = require('express');

// 创建一个Express应用
const app = express();
const port = 3000;

// 定义数学计算工具集
const mathCalculator = {
  "add": function(a, b) {
    return a + b;
  },
  "subtract": function(a, b) {
    return a - b;
  },
  "multiply": function(a, b) {
    return a * b;
  },
  "divide": function(a, b) {
    // 错误处理: 避免除以零
    if (b === 0) {
      throw new Error('Cannot divide by zero.');
    }
    return a / b;
  }
};

// 定义路由：数学计算工具集
app.get('/math/:operation/:a/:b', (req, res) => {
  const { operation, a, b } = req.params;
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  
  // 错误处理: 确保输入是数字
  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).json({
      error: 'Invalid input: a and b must be numbers.'
    });
  }

  try {
    const result = mathCalculator[operation](numA, numB);
    res.json({ result });
  } catch (error) {
    // 错误处理: 捕获除以零等错误
    res.status(500).json({
      error: error.message
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Math calculator service is running on http://localhost:${port}`);
});