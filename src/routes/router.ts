import * as express from 'express';

 /**
  * this is just an abstract class to help you when
    you create new route file.
    1. extend this class
    2. overwrite the abstract functions
    3. import the class in index route
    4. add new instance of the class in the constructor 
  * Router
  */
  abstract class Router {

      router: express.Router;
      res: JSON;

     constructor() {
         this.router = express.Router();
         this.mountRoutes();
      }
      /**
       * should return the root path for the all routes
       * e.g '/users' so the routes will be mounted to it
       */
      abstract RootPath(): string;
      /**
       * here you used this.router.get('path',function(res,res,next))
       * then you should retuen the router.
       */
      abstract mountRoutes();





      route(method: string, handller: express.RequestHandler) {
        let _method = method.toLowerCase();

        switch (_method) {
          case 'get': break;
          case 'post': break;
          case 'delete': break;
          case 'update': break;
          default: throw new Error('invalid req method'); // not sure who this will be handled 
        }
        this.router[_method](this.RootPath(), handller);
      }

  }


 export default Router;