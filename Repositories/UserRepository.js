const mySql = require('../DBConnection');
const util = require('util');
const query = util.promisify(mySql.db.query).bind(mySql.db);

class UserRepository {
    constructor() {
    }

    async getUserByEmail(email) {
        try {
            const selectQuery = 'SELECT * FROM users WHERE email = ?';
            const results = await query(selectQuery, [email]);
            console.log("results", results);

            return results[0]; // Assuming email is unique and fetching the first result
        } catch (err) {
            throw err;
        }
    }

    async createUser(username, email, password, role) {
        try {
            const insertQuery = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
            const result = await query(insertQuery, [username, email, password, role]);

            console.log("results", result);

            const createdUserId = result.insertId;
            return { id: createdUserId, username, email, role };
        } catch (err) {
            throw err;
        }
    }


    // async getUsers() {
    //     try {
    //         const selectQuery = 'SELECT * FROM users';
    //         const results = await query(selectQuery);
    //         return results;
    //     } catch (err) {
    //         throw err;
    //     }
    // }
}

module.exports = UserRepository;
