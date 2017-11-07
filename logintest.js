var Nightmare = require('nightmare');

var nightmare = Nightmare({ show: true });

nightmare
  .goto('https://qlink.com')
  .type('#inputEmail', 'fakeemail@gmail.com')
  .type('#password', 'fake123')
  .click('#submit')
  .wait('container-wrap')
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
