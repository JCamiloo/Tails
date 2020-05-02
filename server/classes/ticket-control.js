const fs = require('fs');

class Ticket {

  constructor(number, desktop) {
    this.number = number;
    this.desktop = desktop;
  }
}

class TicketControl {

  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    const data = require('../data/data.json');
    if (data.today === this.today) {
      this.last = data.last;
      this.tickets = data.tickets;
    } else {
      this.resetCount();
    }
  }

  next() {
    this.last++;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);
    this.saveFile();
    return this.last;
  }

  current() {
    return this.last;
  }

  resetCount() {
    this.last = 0;
    this.tickets = [];
    this.saveFile();
  }

  saveFile() {
    const jsonData = { last: this.last, today: this.today, tickets: this.tickets };
    const jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync('./server/data/data.json', jsonDataString);
  }
}

module.exports = { TicketControl };