var Nightmare = require('nightmare');

var nightmare = Nightmare({ show: true });

nightmare
   .goto('http://qlinkconnect.herokuapp.com/')
  .type('#inputEmail', 'ammad_shake@yahoo.com')
  .type('#inputPassword', 'popjimmy7')
  .click('#sign-in')
  .wait('.card-back')
  .click('#connectBtn')
  .type('#inputCode', '100000')
  .click('#addBtn')
  .wait('#inputBio')
  .type('#inputCode', 'Northwestern Bootcamp')
  .type('#inputBio', 'He likes carrots')
  .click('#submit')
  .wait('.card-back')
  .evaluate(function() {
    return document.querySelector('.card-back').href;
  })
  .end()
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error) {
    console.error('Search failed:', error);
    process.exit(1);
  });