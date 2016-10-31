import  Router from './router';
import * as User from '../controllers/userController';
import * as exprees from 'express';
/**
 * Home
 */
export default class Users extends Router {

   signup() {
     return function(req, res, next){
       User.default.create(req.body.phone, req.body.email, req.body.password)
       .then((user) => {
         res.send(user);
       })
       .catch((err) => {next(err); }); // pass the error to next route
    };
   };

  RootPath() {
     return '/user';
  }
   mountRoutes() {
    this.route('post', this.signup());
   };
}







