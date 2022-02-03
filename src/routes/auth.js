const express = require('express');
const { signup, signin } = require('../controller/auth');
const { requireSignup } = require('../controller/admin/auth');
const router = express.Router();


router.post('/signin', signin)

router.post('/signup', requireSignup, signup)



module.exports = router;