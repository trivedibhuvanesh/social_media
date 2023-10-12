const MongoClient = require('mongodb').MongoClient;

const DbConnection = function () {

    const db = null;
    let instance = 0;

    async function DbConnect() {
        try {
            let url = 'mongodb+srv://net_ninja:test1234@cluster0.dituh.mongodb.net/social_media?retryWrites=true&w=majority';
            let _db = await MongoClient.connect(url);

            console.log("Db connection creatted successfully")
            return _db
        } catch (e) {
            return e;
        }
    }

   async function Get() {
        try {
            instance++;     // this is just to count how many times our singleton is called.
            console.log(`DbConnection called ${instance} times`);

            if (db != null) {
                console.log(`db connection is already alive`);
                return db;
            } else {
                console.log(`getting new db connection`);
                db = await DbConnect();
                return db; 
            }
        } catch (e) {
            return e;
        }
    }

    return {
        Get: Get
    }
}


module.exports = DbConnection();
