import User from '../models/User';

/**
 * UserController
 */
export class UserController {

    /**
     * @param  {string} phone
     * @param  {string} email
     * @param  {string} password
     * @param  {string='cus'} type
     * @returns Promise
     */
    public static create(phone: string, email: string, password: string, type: string = 'cus'): Promise<any> {
        return new Promise((resolve, reject) => {
            let newuser = new User({
                phone: phone,
                email: email,
                password: password,
                u_type: type
            });

            newuser.save()
            .then((user) => {
                resolve(user);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    /**
     * @param  {string} phone
     * @returns Promise
     */
    public static delete(phone: string): Promise<any> {
        return new Promise((resolve, reject) => {
            User.findOneAndRemove({phone: phone}, (err, user) => {
                if (err) return reject(err);
                else
                return resolve(user);
            });
        });
    }
}

export default UserController;