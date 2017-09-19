import mysql from 'mysql'

const pool = mysql.createPool({
  connectionLimit: 3,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog'
})

export const query = (...argv) => new Promise((resolve, reject) => {
  const args = [...argv, (error, results, fields) => {
    if (error) return reject(error)
    resolve(results)
  }]
  pool.query(...args)
})