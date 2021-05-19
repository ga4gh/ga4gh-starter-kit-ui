var express = require('express');
const axios = require('axios').default;

//handle data posted through form 
exports.getDrsObjectForm = function(res){
};

//base url (to be made configurable)
var serverBase='http://localhost:8080/ga4gh/drs/v1';
//var drsUrl=(serverBase+'/objects');
var drsUrl="http://localhost:8080/ga4gh/drs/v1/objects/b8cd0667-2c33-4c9f-967b-161b905932c9";

function getDrsObject(){
    //make api call to GA4GH DRS starter kit service
    axios.get(drsUrl)
    .then(function(res){
        console.log(res.data);
        console.log(res.status);
        //console.log(res.statusText);
        console.log(res.headers);
        //console.log(res.config);
        //console.log(res.request);
    })
    .catch(function (error) {
        console.log(error);
      });
};

// exports.getDrsAccessId = function(req, res){
//     //make api call to GA4GH DRS starter kit service
// };
