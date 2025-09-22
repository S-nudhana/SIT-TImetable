import { Hono } from 'hono'

import signin from '../controllers/auth/signin.controller';
import signup from '../controllers/auth/signup.controller';

const auth = new Hono()

auth.post("/signin", signin);
auth.post("/signup", signup);

export default auth;