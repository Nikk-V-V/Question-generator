const {Router} = require('express');
const router = Router();
const auth = require('../Middleware/auth-middleware');
const controllers = require('../Controllers/query');
const upload = require('../Middleware/uploads');


router.post('/', upload.single('file'), controllers.create)

router.get('/:id', controllers.getAll)

module.exports = router;