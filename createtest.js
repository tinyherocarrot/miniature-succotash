var Nightmare = require('nightmare');

var nightmare = Nightmare({ show: true });

nightmare
  .goto('http://localhost:3000/')
  .click('#signup')
  .wait('#inputName1')
  .type('#inputName1', 'Sponge')
  .type('#inputName2', 'Bob')
  .type('#inputEmail', 'MehoyMinoy@gmail.com')
  .type('#inputPassword', 'KrabbyPatty123')
  .type('#inputCity', 'Bikini Bottom')
  .type('#inputCompany', 'Chum Bucket')
  .type('#inputTitle', 'Executive Chef')
  .type('#inputBio', 'Hi my name is Sponge Bob, and I love Krabby Patties. I have a pet snail named Gary and my best friend is Patrick Starr. ')
  .type('#inputTwitter', 'https://twitter.com/SpongeBob')
  .click('#create-new-account')
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
