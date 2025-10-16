// 代码生成时间: 2025-10-17 00:01:14
const express = require('express');
const app = express();
const port = 3000;

// 模拟数据库中的会员积分
const memberPoints = {
    'member1': 100,
    'member2': 200,
    'member3': 150
};

// 中间件用于解析请求体
app.use(express.json());

// 获取所有会员积分
app.get('/points', (req, res) => {
    try {
        res.status(200).json(memberPoints);
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// 获取单个会员积分
app.get('/points/:memberId', (req, res) => {
    const { memberId } = req.params;
    try {
        if (memberPoints[memberId]) {
            res.status(200).json({
                [memberId]: memberPoints[memberId]
            });
        } else {
            res.status(404).json({
                error: 'Member not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// 更新会员积分
app.post('/points/:memberId', (req, res) => {
    const { memberId } = req.params;
    const { points } = req.body;
    try {
        if (memberPoints[memberId]) {
            memberPoints[memberId] += points;
            res.status(200).json({
                [memberId]: memberPoints[memberId]
            });
        } else {
            res.status(404).json({
                error: 'Member not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Membership Points System running on port ${port}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error'
    });
});
