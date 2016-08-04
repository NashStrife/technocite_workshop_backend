let logger = require('./logger');
let bcrypt = require('bcrypt');

const saltRounds = 10;

let crypt = {
    encrypt: function(plaintxtPwd) {
        logger.log("--- CRYPT : Encrypt pwd");
        logger.log("--- CRYPT : "+ plaintxtPwd);

        bcrypt.hash(plaintxtPwd, saltRounds, function(err, hash) {
            let res = {
                status : true,
                data : hash
            };

            if(err){
                res.status = false;
                res.data = err;
            }
            
            logger.log(res);
            return res;
        });
    },
    decrypt: function(plaintxtPwd, hash) {
        logger.log("--- CRYPT : Compare pwd");
        bcrypt.compare(plaintxtPwd, hash, function(err, res) {
            if(err){
                logger.log(err);
            } else {
                logger.log(res);
                return res; // if pwd is the same res = true, else res = false
            }
        });
    }
}

module.exports = crypt;



// function Crypt() {
//     function encrypt(plaintxtPwd) {
//         logger.log("--- CRYPT : Encrypt pwd");
//         logger.log(plaintxtPwd);

//         bcrypt.hash(plaintxtPwd, saltRounds, function(err, hash) {
//             let res = {};
//             if(err){
//                 logger.log(err);
//                 res.status = false;
//                 res.data = err;
//             } else {
//                 logger.log(hash);
//                 res.status = true;
//                 res.data = hash; // hash = value of the hash
//             }
//             return res;
//         });
//     }

//     // get hash from db and pwd to compare from login form
//     function decrypt(plaintxtPwd, hash) {
//         logger.log("--- CRYPT : Compare pwd");
//         bcrypt.compare(plaintxtPwd, hash, function(err, res) {
//             if(err){
//                 logger.log(err);
//             } else {
//                 logger.log(res);
//                 return res; // if pwd is the same res = true, else res = false
//             }
//         });
//     }

//     let that = {};
//     that.encrypt = encrypt;
//     that.decrypt = decrypt;
//     return that;
// }

// module.exports = Crypt;