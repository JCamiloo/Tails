const fs = require('fs');

class Ticket {

  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    const data = require('../data/data.json');
    console.log(data);
    if (data.today === this.today) {
      this.last = data.last;
    } else {
      this.resetCount();
    }
  }

  next() {
    this.last++;
    this.saveFile();
    return this.last;
  }

  resetCount() {
    this.last = 0;
    this.saveFile();
  }

  saveFile() {
    const jsonData = { last: this.last, today: this.today };
    const jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync('./server/data/data.json', jsonDataString);
  }
}

module.exports = { Ticket };