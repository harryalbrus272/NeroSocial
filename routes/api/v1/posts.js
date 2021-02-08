const express = require('express');
//fetching the existing instance of express in above line
const router = express.Router();
const passport = require('passport');

const postsApi = require('../../../controllers/api/v1/posts_api');
router.get('/', postsApi.index);
router.delete('/:id', passport.authenticate('jwt',{session: false}), postsApi.destroy);
module.exports = router;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE1YTJhMWI5OGJiZjU4NGM5MjBiYjYiLCJuYW1lIjoiR29vZGllcyIsImVtYWlsIjoiZ29vZGllc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6Ijc4OSIsImNyZWF0ZWRBdCI6IjIwMjEtMDEtMzBUMTg6MTc6MDUuMDY1WiIsInVwZGF0ZWRBdCI6IjIwMjEtMDItMDdUMTM6NDE6MzguNjg4WiIsIl9fdiI6MCwiYXZhdGFyIjoiXFx1cGxvYWRzXFx1c2Vyc1xcYXZhdGFycy9hdmF0YXItMTYxMjcwNTI5ODU2NyIsImlhdCI6MTYxMjc4NTcwMywiZXhwIjoxNjEyNzg1ODAzfQ.6f0r9n9yyg7W6laUli2xgIYms_mpZZ4MdpRE_bXun0U