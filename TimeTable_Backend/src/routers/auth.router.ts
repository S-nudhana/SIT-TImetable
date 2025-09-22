import { Hono } from 'hono'

import signin from '../controllers/authentication/signin.controller';
import signup from '../controllers/authentication/signup.controller';

const auth = new Hono()

auth.post("/signin", signin);
auth.post("/signup", signup);

export default auth;