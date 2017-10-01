
# portalforifp

This project uses meteor so to install meteor by following this guide:
https://guide.meteor.com/#quickstart

Once meteor is installed

cd into portalforifp(or whatever repo/folder you name it)
meteor npm install

also run 

meteor add session

meteor add http

meteor add meteorhacks:picker

then run 
meteor


then you should see Meteor server running on: http://localhost:3000/



From there just edit all the values to match your okta tenant.  

Make sure to generate an Okta api Token and replace it in server > main.js folder.

Also add http://localhost:3000 to your cors trust origins in your okta tenant.

Then done!
