import bcrypt from "bcrypt";

export const compare = (password: string, queryPassword: string) => {
    return bcrypt.compareSync(password, queryPassword);
};

export const hashPassword = (password: string) => {
    if (!process.env.SALT) {
        throw new Error("SALT is not defined in environment variables");
    }
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT, 10));
    return bcrypt.hashSync(password, salt);
};