const express = require('express');
const userRoute = require('./user.route');
const roleRoute = require('./role.route');
// const rolesRoute = require('./roles.route');
const propRoute = require('./prop.route');
const propsRoute = require('./props.route');
const questRoute = require('./quest.route');
const questsRoute = require('./quests.route');
const materialRoute = require('./material.route');
const monsterRoute = require('./monster.route');
const monstersRoute = require('./monsters.route');
const dungeonRoute = require('./dungeon.route');
const dungeonsRoute = require('./dungeons.route');

const router = express.Router();
router.use('/user', userRoute);
router.use('/role', roleRoute);
// router.use('/roles', rolesRoute);
router.use('/prop', propRoute);
router.use('/props', propsRoute);
router.use('/quest', questRoute);
router.use('/quests', questsRoute);
router.use('/material', materialRoute);
router.use('/monster', monsterRoute);
router.use('/monsters', monstersRoute);
router.use('/dungeon', dungeonRoute);
router.use('/dungeons', dungeonsRoute);

module.exports = router;
