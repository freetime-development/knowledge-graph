const { Router } = require('express');

import dgraph from '../controllers/dgraphController';

const router = new Router();

enum paths {
    root = '/',
    set = '/api/set'
}

router.get(paths.root, dgraph.get)
router.post(paths.set, dgraph.post)

router.use((_, res) => {
    res.sendStatus(404);
});

export default router;
