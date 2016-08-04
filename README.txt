Dependencies: 
=============
NodeJS

node-gyp
npm install -g node-gyp

On Windows:
	Install windows build-tools:
		npm install --global --production windows-build-tools
	
Python 2.x [normally installed with the build-tools on windows]
https://www.python.org/ftp/python/2.7.12/python-2.7.12.msi





PhantomJS [ex: C:\Phantomjs]
http://phantomjs.org/


Errors:
=======
If error with visual studio and bcrypt, Install Visual Studio:
		https://www.visualstudio.com/products/visual-studio-community-vs
		close any cmd window before installation
		and select Common Tools for Visual C++ during setup in "custom installation".
	
	Then
		npm config set msvs_version 2015
		
If error C2373 with node-gyp when installing bcrypt
This error stays in relation with npm, node-gyp and Visual Studio 2015 and is already fixed in node-gyp@3.4.0, but npm is still pointing to an old version. As I workaround I can propose this:

Go to your folder where npm is installed, e.g.: C:\Program Files\nodejs\node_modules\npm
Open: package.json
Remove entry for node-gyp in bundleDependencies
Bump version number to 3.4.0 for node-gyp in dependencies
Make a npm i in this directory to install node-gyp@3.4.0 to fix the problem
Then npm install -g node-gyp