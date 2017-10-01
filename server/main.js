import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


Picker.route('/applinks', function(params, req, res, next) {


    var yeah = "OK"
  console.log(req.body)
  console.log(params)
  console.log(params.query)

    var userId = params.query.userId

console.log(userId)



 
var auth = new Buffer('6aLzadRju1m8gIRMbOpw:_3dM_wUzN5LL52BA9MjSACXFH1ctiBN_JF6KX22y').toString('base64');
var route = "https://vanbeektech.okta.com/api/v1/users/" + userId + "/appLinks"
var result = Meteor.http.get(route, {
    
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": "SSWS 00niOdIESXdsaEwYYy-9ESg3GmBgEfJHN_yrh6EH7H"
      }
    });


	console.log(JSON.stringify(result.data))
    res.end(  JSON.stringify(result.data)  );








});