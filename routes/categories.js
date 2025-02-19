const express = require('express');
const router = express.Router();
const { requireLogin, adminMiddleware } = require('../middleware');
const categories = require('../controllers/categories');

router.get('/', categories.getAllCategories);

router.post('/toplevelcategory', requireLogin, adminMiddleware, categories.createTopLevelCategory);
router.post('/update/toplevelcategory', requireLogin, adminMiddleware, categories.updateTopLevelCategory);
router.post('/delete/toplevelcategory', requireLogin, adminMiddleware, categories.deleteTopLevelCategory);

router.post('/secondlevelcategory', requireLogin, adminMiddleware, categories.createSecondLevelCategory);
router.post('/update/secondlevelcategory', requireLogin, adminMiddleware, categories.updateSecondLevelCategory);
router.post('/delete/secondlevelcategory', requireLogin, adminMiddleware, categories.deleteSecondLevelCategory);

router.post('/thirdlevelcategory', requireLogin, adminMiddleware, categories.createThirdLevelCategory);
router.post('/update/thirdlevelcategory', requireLogin, adminMiddleware, categories.updateThirdLevelCategory);
router.post('/delete/thirdlevelcategory', requireLogin, adminMiddleware, categories.deleteThirdLevelCategory);

module.exports = router;