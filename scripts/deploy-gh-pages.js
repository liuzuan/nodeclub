'use strict';

var ghpages = require('gh-pages');

main();

function main () {
  ghpages.publish('./build', console.error.bind(console));
}