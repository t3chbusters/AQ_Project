const knex = require('knex');
const kDB = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBDATABASE,
        port: process.env.DBPORT
    }
});
const pushUser = (user) => {
    return new Promise(async (resolve, reject) => {
        console.log(user);
        let r = await kDB('USER_ACTIVATION').insert({ USERNAME: user.username, PASSCODE: user.passcode, EMAIL: user.email, CREATEDON: new Date() });
        console.log(r[0]);
        if (r) {
            resolve({ msg: 'pushed the user' });
        } else {
            reject({ msg: r });
        }
    })
}

module.exports = pushUser;