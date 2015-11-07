#Build and Run OnPitch
##1. init
1. Install Node.js which includes npm.
2. Run 'sudo npm run initme' one time.

##2. start server
1. npm start

##3a. build once
1. Run 'gulp build'

##3b.continuously build after any file changes
1. Run 'gulp build-watch'
2. Leave the terminal open (any files changes in the project will automatically rebuild)

##3c.continuously build after any file changes with notifications
1. Run 'gulp build-watch-notify'
2. Leave the terminal open (any files changes in the project will automatically rebuild)

#FAQ

##Need to test locally on node.js cmd?
1. Navigate to the main directory ("...\onpitch-client\.")
2. Run 'http-server .'
Or just run 'http-server <path>'

##Testing Google Login locally
Note: For an odd reason, you cannot authenticate properly unless you change the address to local host manually.
For example:
  1. You're on "127.0.0.1:8080/public/index.html".
  2. Replace the address to: "localhost:8080/public/index.html"

##Made a change to the server?
1. kill the server
2. run npm start

##Made a change to the client?
If you are using step 3b or 3c, then the a new build will be triggered when file changes are saved. Otherwise, run gulp build to rebuild the client.
