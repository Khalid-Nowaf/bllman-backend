import * as logger      from 'morgan';

/**
 * Config
 */
export default class Config {

     PORT: string;
     DEBUG: string;
     LOGGER: any;

    constructor(ENV: string) {

        switch (ENV) {
            case 'development':
                this.PORT = '3000';
                this.DEBUG = 'DEBUG=dev:*';
                this.LOGGER = logger('dev');
                break;
            case 'testing':
                this.PORT = '3000';
                this.DEBUG = 'DEBUG=test:*';
                this.LOGGER = logger('combined', { skip: function (req, res) { return true; } });
                break;
            default:
                process.env.NODE_ENV = 'development';
                this.PORT = '3000';
                this.DEBUG = 'DEBUG=dev:*';
                this.LOGGER = logger('dev');
                break;
      }
      process.env.DEBUG = this.DEBUG;
      process.env.PORT = this.PORT;

    }
}
