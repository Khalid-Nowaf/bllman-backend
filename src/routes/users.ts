import  Router from './router';
/**
 * Home
 */
export default class Users extends Router {

   getHomePage() {
     return function(req, res, next){
       // let notImp = new Error('Not Implimented ...');
       // next(notImp);
       res.send('Not Impemented ');
    };
   };

  RootPath() {
     return '/users';
  }
   mountRoutes() {
    this.route('get', this.getHomePage());
   };
}







