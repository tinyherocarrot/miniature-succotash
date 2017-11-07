var Nightmare = require('nightmare');

var nightmare = Nightmare({ show: true });

nightmare
  .goto('http://localhost:3000/connections')
  .click('#listAlpha')
    .wait('.card-back')
  .click('#listNew')
    .wait('.card-back')
  .click('btn :nth-chil(0)')
    .wait('card-back')
  .click('')
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