const {Router}          = require('express');
const controllers       = require('../Controllers/quest');
const router            = Router();
const auth              = require('../Middleware/auth-middleware');
const upload            = require('../Middleware/uploads');

router.get('/', controllers.getAll);

router.post('/', auth, upload.single('image'), controllers.create);

router.get('/:id', controllers.getById);

router.delete('/:id', auth, controllers.remove);

router.patch('/:id', auth, upload.single('image'), controllers.update);



module.exports = router;