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
        let r = await kDB('USER_ACTIVATION').insert({ USERNAME: user.username, PASSCODE: Buffer.from(user.passcode).toString('base64'), EMAIL: user.email, USERSTATUS: 'PENDING', CREATEDON: new Date() });
        console.log(r[0]);
        if (r[0]) {
            resolve({ msg: 'pushed the user' });
        } else {
            reject({ msg: r });
        }
    })
}

const getUser = (email) => {
    return new Promise(async (resolve, reject) => {
        let result = await kDB('USER_ACTIVATION').where({EMAIL: email});
        // console.log(result);
        if(result[0]){
            resolve({msg: result[0]});
        }else{
            reject({msg: 'not found'});
        }
    })
}

const updateUser = (email) => {
    return new Promise(async(resolve, reject) => {
        let result = await kDB('USER_ACTIVATION').where({EMAIL: email}).update({USERSTATUS: 'Active'});
        console.log(result);
        if(result){
            resolve({msg: 'activated'});
        }else{
            reject({msg: result});
        }
    })
}

module.exports = {pushUser, getUser, updateUser};