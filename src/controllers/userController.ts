import User from '../models/User';

/**
 * UserController
 */
export class UserController {
    constructor() {
    }

    public static create({phone, email, password, type}): Promise<any> {
        return new Promise((resolve, reject) => {
            let newuser = new User({
                phone: phone,
                email: email,
                password: password,
                type: 'cus'
            });
            newuser.save().then(resolve).catch(reject);
        });
    }
}

export default UserController;