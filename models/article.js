
import { query } from './db';

function Article({id, title, time,archive }) {
    this.id = id;
    this.title = title;
    this.time = time;
    this.archive = archive;
}
Article.create = (obj) = new Article({id: obj.id,title: obj.title,time: obj.time,archive: obj.archive});


// 一般情况下，数据库有多少张表就会有多少模型
// 每一个模型专门负责操作一张表
// CRUD
/*
function User(id, username, password, nickname, email, status, created) {
    this.id = id
    this.username = username
    this.password = password
    this.nickname = nickname
    this.email = email
    this.status = status
    this.created = created
}

User.create = (obj) => new User(obj.id, obj.username, obj.password, obj.nickname, obj.email, obj.status, obj.created)
*/

/*// 查询用户名是否存在的方法
User.existUsername = (username) => new Promise((resolve, reject) => {
    query('select count(1) as num from users where username = ?', [username])
        .then(res => {
            resolve(res[0].num > 0)
        })
        // .catch(error => { reject(error) })
        .catch(reject)
})

// 查询用户名是否存在的方法
User.getByUsername = (username) => new Promise((resolve, reject) => {
    query('select * from users where username = ?', [username])
        .then(res => {
            const row = res[0]
            if (!row) {
                resolve(null)
            } else {
                resolve(User.create(row))
            }
        })
        // .catch(error => { reject(error) })
        .catch(reject)
})*/

// 将对象本身存到数据库中
Article.prototype.save = function () {
    return new Promise((resolve, reject) => {
        query('insert into users set ?', this)
            .then(result => {
                // 获取到用户的ID
                this.id = result.insertId
                if (this.id > 0) {
                    resolve(this)
                } else {
                    reject(new Error('写入数据库失败'))
                }
            })
            .catch(reject)
    })
}



export default Article
