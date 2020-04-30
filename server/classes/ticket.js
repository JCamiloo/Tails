const fs = require('fs');

class Ticket {

  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    const data = require('../data/data.json');
    console.log(data);
    if (data.today === this.today) {

    } else {
      this.resetCount();
    }
  }

  resetCount() {
    const jsonData = { last: this.last, today: this.today };
    const jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync('./server/data/data.json', jsonDataString);
    console.log('reset');
  }
}

module.exports = { Ticket };