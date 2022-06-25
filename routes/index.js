const express = require('express');
const userRoute = require('./user.route');
const roleRoute = require('./role.route');
const rolesRoute = require('./roles.route');

const router = express.Router();
router.use('/user', userRoute);
router.use('/role', roleRoute);
router.use('/roles', rolesRoute);

module.exports = router;
