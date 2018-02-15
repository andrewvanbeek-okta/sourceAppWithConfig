import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
    images = new Mongo.Collection('logoImages');
    navColors = new Mongo.Collection('navColors');
    stylingModels = new Mongo.Collection('styleObjects')
    OktaAppConfigurations = new Mongo.Collection("objects")

});



HEY = "YAKA"

Picker.route('/applinks', function(params, req, res, next) {
console.log("test")

    var yeah = "OK"
  console.log(req.body)
  console.log(params)
  console.log(params.query)

    var userId = params.query.userId

console.log(userId)





var route = Meteor.settings.public.oktaUrl + "/api/v1/users/" + userId + "/appLinks"

var result = Meteor.http.get(route, {

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": 'SSWS' + Meteor.settings.apiToken// replace with SWSS your Api Token
      }
    });

  var response = {data: result.data, object: stylingModels.find().fetch()}

  var something = JSON.stringify(result.data)
  console.log(something[0])
    res.end(JSON.stringify(response));








});


Picker.route('/colors', function(params, req, res, next){


  if(colors.find().fetch().length > 0){
    console.log("TESSST")
    var colorsForNav = colors.find().fetch()
    res.end(JSON.stringify(colorsForNav) )
  } else {
      images.insert({companyLogo: "#fff"})
  }




})


Picker.route('/register', function(params, req, res, next){
  console.log(params)
  var data = {
  "profile": {
    "firstName": params.query.firstname,
    "lastName": params.query.lastname,
    "email": params.query.email,
    "login": params.query.email,
    "mobilePhone": params.query.phonenumber
  },
  "credentials": {
    "password" : { "value": params.query.password }
  }
}
  var route =  Meteor.settings.public.oktaUrl + "/api/v1/users?activate=true"
  var result = Meteor.http.post(route, {
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": 'SSWS' + Meteor.settings.apiToken// replace with SWSS your Api Token
        }
      });

    var response = {data: result.data}

      console.log(response)
      res.end(JSON.stringify(result.data));
})

Picker.route('/postAuth', function(params, req, res, next){

if(OktaAppConfigurations.find().fetch().length > 0){
  console.log("addding the files duuuuuuuuuuuuuuuuude")

  console.log(params.query.url)
  console.log(params.query.clientId)
  OktaAppConfigurations.insert({clientId: params.query.clientId, url: params.query.url})




} else {

  console.log("records added")
  var firstId = stylingModels.find().fetch()[0]._id;
    if(params.query.url != undefined){
      OktaAppConfigurations.update({_id : firstId},{$set:{url: params.query.url}});
    } else if(params.query.clientId != undefined){
        OktaAppConfigurations.update({_id : firstId},{$set:{clientId: params.query.clientId}});


    }

}



})



Picker.route('/logos', function(params, req, res, next){


  if(images.find().fetch().length > 0){
    console.log("TESSST")


  } else {
      images.insert({companyLogo: "oracle"})

  }
    navColors.insert({companyLogo: "#fff"})
    var logos = images.find().fetch()
    var colorsForNav = navColors.find().fetch()
    var data = {logos: logos, colors: colorsForNav}
    res.end(JSON.stringify(data) )


})


Picker.route('/setLogos', function(params, req, res, next){

  var companyString = params.query.logoString
    var firstId = images.find().fetch()[0]._id;
    console.log(companyString)
    images.update({_id : firstId},{$set:{companyLogo : companyString}});


  res.end(images)
})


Picker.route('/styleObject', function(params, req, res, next){


  if(stylingModels.find().fetch().length > 0){
    console.log("TESSST")


  } else {
      stylingModels.insert({companyLogo: "oracle", navColor: "#fff", cardColor: "black", headerColor: "black", buttonColor: "#FFF"})

  }

  var models = stylingModels.find().fetch()

  res.end(JSON.stringify(models))

})


Picker.route('/setStyleObject', function(params, req, res, next){

  console.log(params.query.subjectToChange)
  if(params.query.subjectToChange == "navColorForm"){
    var companyString = params.query.logoString

    var firstId = stylingModels.find().fetch()[0]._id;
    console.log(companyString)
    stylingModels.update({_id : firstId},{$set:{navColor: params.query.logoString}});


  } else if(params.query.subjectToChange == "logoForm"){
    var companyString = params.query.logoString
    console.log("AUIHAUIHFUIEUIHUOHUHOHOIHO")
    console.log(companyString)
    var firstId = stylingModels.find().fetch()[0]._id;
    console.log(companyString)
    stylingModels.update({_id : firstId},{$set:{companyLogo: params.query.logoString}});

  } else if(params.query.subjectToChange == "CardColorForm"){

    console.log(params.query.logoString)
    var firstId = stylingModels.find().fetch()[0]._id;

    stylingModels.update({_id : firstId},{$set:{cardColor: params.query.logoString}});

  } else if(params.query.subjectToChange == "textColorForm"){
     var firstId = stylingModels.find().fetch()[0]._id;
    stylingModels.update({_id : firstId},{$set:{headerColor: params.query.logoString}});
  } else if(params.query.subjectToChange == "buttonColorForm"){
      var firstId = stylingModels.find().fetch()[0]._id;
    stylingModels.update({_id : firstId},{$set:{buttonColor: params.query.logoString}});
  }




})
