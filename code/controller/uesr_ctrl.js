import db from '../db/index.js'

// 使用Es6的按需导出模块语法 将getAllUser方法导出

export async function getAllUser(req, res) {
    // db.query() 函数返回值 是Promise的实例对象 因此可以使用async/await 简化
    // 使用try catch 捕获Promise 异步任务产生的异常错误 并在catch中处理 

    try {
        const [rows] = await db.query('select id,username,nickname from ev_users')
            // console.log(rows);
        res.send({
            status: 200,
            message: '获取用户列表成功！',
            data: rows
        })
    } catch (err) {
        res.send({
            status: -1,
            message: '获取用户列表失败！',
            desc: err.message
        })
    }

}