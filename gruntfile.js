module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    ts: {
      app: {
        files: [{
          src: ["./src/**/*.ts","./src/**/*.js", "!src/**/*.baseDir.ts", "!src/_all.d.ts"],
          dest: "./dest",
          fast:'never',
          allowJs: true
        }],
        //tsconfig: true
      }
    },
    tslint: {
      options: {
        configuration: "tslint.json"
      },
      files: {
        src: ["./src/**/*.ts"]
      }
    },
    watch: {
      ts: {
        files: ["./src/**/*.ts","./src/**/*.js", "!src/**/*.baseDir.ts", "!src/_all.d.ts"],
        tasks: [ "newer:tslint","ts"]
      }
    },
    nodemon: {
        dev: {
            script: './bin/www'
        },
        watch: ['src'],
        options: {
            ignore: ['node_modules/**', 'Gruntfile.js'],
            env: {
                PORT: '8181',
                ENV_NODE: 'development'
            }
        }
    },
    concurrent: {
      watchers: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    clean: ["dest/"]
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-newer");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");

  grunt.registerTask("default", [
    "clean",
    "ts",
    "tslint",
  ]);

  grunt.registerTask("comp", [
    "ts",
    "tslint"
  ]);

  grunt.registerTask("serve", ["concurrent:watchers"]); 
};