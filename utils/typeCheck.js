const zod = require('zod');

const signupcheck = zod.object({
    username:zod.string(),
    email:zod.string().email(),
    password:zod.string().min(6)
})

const signincheck = zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
})

module.exports = {signupcheck, signincheck}