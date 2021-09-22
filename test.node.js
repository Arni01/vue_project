const fs = require('fs');

const svg = fs.readFileSync('./public/img/Frame 705.svg', 'utf8');
let htmlMail = fs.readFileSync('./sendMailNode.html', 'utf8');
htmlMail = htmlMail.replace('#IMG', svg).replace('#LINK', link);

console.log('kek', htmlMail);
