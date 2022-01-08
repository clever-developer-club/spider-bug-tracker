const crypto = require('crypto')
const bcrypt = require('bcrypt')

const createToken = () => {
    let resetToken = crypto.randomBytes(32).toString("hex");
    let hash = bcrypt.hashSync(resetToken, Number(process.env.BCRYPT_SALT_ROUNDS));
    return {token : resetToken,hash : hash}
}

module.exports = {createToken}