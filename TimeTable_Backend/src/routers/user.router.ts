import { Hono } from 'hono'

import getUserInfo from '../controllers/user/getUserInfo.controller';

const user = new Hono()

user.get("/info", getUserInfo)

export default user;