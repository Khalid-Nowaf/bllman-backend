import  Router from './router';
import * as express from 'express';

///////////// ALL ROUTES CLASSES /////////////////
import Users from './users';
// import newRouter from './newrouter'
// if you create new router file you should import it here


/**
 * Index
 */
 class Index extends Router {

   getHomePage() {
     return function(req, res){
      // render page
      res.send('Bllman root page');
    };
   };

  RootPath() {
     return '/';
  }
   mountRoutes() {
      this.route('get', this.getHomePage());
   };

   /**
    * @returns Array
    */
   public static mountAll(): Array<express.Router> {
     return [
       new Index().router,
       new Users().router
    // new newRouter().router  // <--- add the imported router here
       ];
   }

};

export default Index;



