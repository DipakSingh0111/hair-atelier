const fs = require('fs');
const file = 'd:/css founder/hair-atelier/data/hair-atelier.json';
let data = JSON.parse(fs.readFileSync(file, 'utf8'));
const contactPage = data.categories.HairAtelier.sections.ContactPage.variants.HairAtelierContactPage1;

contactPage.map.embedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d198305.85731301887!2d-74.15391696517173!3d39.06606041724213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c0fb959e00409f%3A0x2cd27b07f83f6d8d!2sNew%20Jersey%2C%20USA!5e0!3m2!1sen!2sin!4v1714495574510!5m2!1sen!2sin';
contactPage.map.title = 'USA Map';

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Successfully updated JSON');
