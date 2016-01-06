#Build and Run OnPitch
####1. init
1. [Download](https://nodejs.org/en/) & Install Node.js which includes npm.
2. Run `sudo npm run initme` one time.

####2. start server
1. `npm start`
2. open another terminal and follow step 3 (choose one).

####3a. build once
1. Run `gulp build`

####3b. continuously build after any file changes
1. Run `gulp build-watch`
2. Leave the terminal open (any files changes in the project will automatically rebuild)

####3c. continuously build after any file changes with notifications
1. Run `gulp build-watch-notify`
2. Leave the terminal open (any files changes in the project will automatically rebuild)

# Jest - Testing
1. npm test
Will run all tests in the __test__ folder.

#FAQ

####Made a change to the server?
1. kill the server
2. run `npm start`

####Made a change to the client?
If you are using step 3b or 3c, then the a new build will be triggered when file changes are saved. Otherwise, run gulp build to rebuild the client.
