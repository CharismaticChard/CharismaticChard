// Require `PhoneNumberFormat`. 
var PNF = require('google-libphonenumber').PhoneNumberFormat;
 
// Get an instance of `PhoneNumberUtil`. 
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
 

module.exports = {

  parseAndFormatPhone: (phone) => {
    console.log(phone);
    var parsedPhone = phoneUtil.parse(phone, 'US');
    return phoneUtil.format(parsedPhone, PNF.E164);
  },

  formatPhoneNational: (phone) => {
    var parsedPhone = phoneUtil.parse(phone, 'US');
    return phoneUtil.format(parsedPhone, PNF.NATIONAL);
  }

};