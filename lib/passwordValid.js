const passwordHash = require('password-hash');

module.exports={
    checkPassword:(password, hash) => {
        return passwordHash.verify(password, hash)
    },

    genPassword:(password) => {
        hashPassword=passwordHash.generate(password)
        console.log(hashPassword)
        return hashPassword;
    }
}