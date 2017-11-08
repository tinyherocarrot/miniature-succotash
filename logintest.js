var Nightmare = require('nightmare');

var nightmare = Nightmare({ show: true });

nightmare
  .goto('http://qlinkconnect.herokuapp.com/')
  .type('#inputEmail', 'ammad_shake@yahoo.com')
  .type('#inputPassword', 'popjimmy7')
  .click('#sign-in')
  .wait('#inputCity')
  .evaluate(function() {
    return document.querySelector('container-wrap').href;
  })
  .end()
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error) {
    console.error('Search failed:', error);
    process.exit(1);
  });
