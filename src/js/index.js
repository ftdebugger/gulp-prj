// Config
require('injectify/require');
require('injectify-include');

var template = require('./tpl/test.hbs');

$(document).ready(function () {
    console.log(template());

}); // dom ready
