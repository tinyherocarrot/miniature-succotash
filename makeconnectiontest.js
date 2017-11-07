var Nightmare = require('nightmare');

var nightmare = Nightmare({ show: true });

nightmare
  .goto('https://qlink.com/main')
  .type('#inputCode', '123456')
  .click('#addBtn')
  .wait('form-group')
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