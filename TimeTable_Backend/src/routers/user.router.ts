import { Hono } from 'hono'

import signin from '../controllers/user/signin.controller';
import signup from '../controllers/user/signup.controller';
import getUserInfo from '../controllers/user/getUserInfo.controller';

import { auth } from '../middlewares/auth.middleware';

const user = new Hono()

user.post("/signin", signin);
user.post("/signup", signup);
user.get("/info", auth, getUserInfo)

export default user;