import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


var Ajax = require('simple-ajax');

var hey = []




var ajax = new Ajax(
        {
            url: 'https://vanbeektech.okta.com/api/v1/users/me/appLinks',
       type: 'GET',
       xhrFields: { withCredentials: true },
       dataType: 'json',
       headers: {
       "Authorization": "SSWS 00gvA4Y25xrXIaCqURU3YDbIU4ycHV5rYS36HcPQ6v",
         "Content-Type": "application/json",
         "Accept": "application/json"},
       data: {}
        }
    );

const getTheLinks = (links) => {
  var appLinks = []
  return new Promise((resolve, reject) => {

    ajax.on('success', function(event) {
    arrayLinks = JSON.parse(event.target.response)
    resolve(arrayLinks)
  });

    ajax.send()
      
  

  });
};
	


	 




var foo = (async function() {
    var result  = await getTheLinks()
    console.log("test")
    Session.set("appLinksToShow", result)
    console.log(Session.get("appLinksToShow"))
    Template.apps.helpers({
      appsTab() {return true}
    })
    return result
}());



setInterval(function(){ 
	console.log(Session.get("appLinksToShow"))
	if(Session.get("appLinksToShow")){
		 Template.apps.helpers({
      		appsTab() {return true}
    	})
	}
}, 5000);

console.log(foo)

console.log("hey")

import './main.html';

  var authClient = new OktaAuth({
    url: 'https://vanbeektech.okta.com',
    clientId: '0oa43ju51wQSUcS6b1t7',
    redirectUri: 'http://localhost:3000'
	});

   var signIn = new OktaSignIn({
  baseUrl: 'https://vanbeektech.okta.com',
  clientId: '0oa38fseusRyzxVKf1t7',
  redirectUri: 'http://localhost:3000/authorization-code/callback',
  authParams: {
// display: 'page',
  responseType: 'code',
  scopes: ['openid']}
  });

  signIn.session.get((response) => {
      if (response.status !== 'INACTIVE') {
         Session.set("loggedOut", response.status == 'INACTIVE')
        console.log("logged in")
      } else {
        Session.set("loggedOut", response.status == 'INACTIVE')
        console.log("logged out")
      }
  });



 Template.body.events({
    'click #logOut': function (e) {
      e.preventDefault()
      authClient.signOut()
    console.log("xyztest")
      Session.set("loggedOut", true) 
 

  signIn.tokenManager.clear();
    }


  });




Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.apps.helpers({
  appsTabs: Session.get("appLinksToShow")
})



Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

 Template.login.events({
    'click .button': function (e) {
      console.log("gets here")

   var signIn = new OktaSignIn({
  baseUrl: 'https://vanbeektech.okta.com',
  clientId: '0oa38fseusRyzxVKf1t7',
  redirectUri: 'http://localhost:3000/authorization-code/callback',
  authParams: {
// display: 'page',
  responseType: 'code',
  scopes: ['openid']}
  });

  signIn.session.get((response) => {
      if (response.status !== 'INACTIVE') {
         Session.set("loggedOut", response.status == 'INACTIVE')

      } else {
        Session.set("loggedOut", response.status == 'INACTIVE')
        console.log("logged out")
      }
      console.log(response.status)

  });

    }

  });


Template.body.rendered = function() {

}

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});



console.log("HI")
console.log(Session.get("loggedOut"))

Template.body.helpers({

	showLogin() { return Session.get("loggedOut") }

})



