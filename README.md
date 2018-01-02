# Adaptive 2EG Brain Training
Advanced User Interfaces Project - Polimi
Video presentation @ https://www.youtube.com/watch?v=b3ycm1e5eQY

# INSTALATION 
- Clone git repo
	
	# Adapter's Driver Installation
	- Clone git repo https://github.com/volcacius/cylon-mindflex in project's folder ("git clone \<repo path.git\>" command into project folder) ;
	- Into new cloned folder from command line do "npm install";

- Into project folder from command line do "npm install";

	# Browserify app creation
	- From project folder in command line do .\\\node_modules\\.bin\browserify -r cylon-mindflex main.js > browser.js

# RUN  
	- npm start
	
	
# Rest-API server ( for storing data)

- Clone git repo https://github.com/william1893/Rest-API.git in a different folder( not in the project folder) 

Run the server separately with the project in a new terminal.

First - npm install

Then - node index

The server is support by mongoDB maksure the mongoDB is working properly. 

	
	
