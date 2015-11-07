# init
1. Install Node.js which includes npm.
2. Run 'sudo npm run initme' one time.

# build once
1. Run 'gulp build'

# continuously build after any file changes
1. Run 'gulp build-watch'
2. Leave the terminal open (any files changes in the project will automatically rebuild)

# continuously build after any file changes with notifications
1. Run 'gulp build-watch-notify'
2. Leave the terminal open (any files changes in the project will automatically rebuild)

# Need to test locally on node.js cmd?
1. Navigate to the main directory ("...\onpitch-client\.")
2. Run 'http-server .'
Or just run 'http-server <path>'

# Testing Google Login locally
Note: For an odd reason, you cannot authenticate properly unless you change the address to local host manually.
For example: 
	1. You're on "127.0.0.1:8080/public/index.html".
	2. Replace the address to: "localhost:8080/public/index.html"