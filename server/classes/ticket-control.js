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
    this.lastFourTickets = [];
    const data = require('../data/data.json');
    if (data.today === this.today) {
      this.last = data.last;
      this.tickets = data.tickets;
      this.lastFourTickets = data.lastFourTickets;
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

  attendTicket(desktop) {
    if (this.tickets.length === 0) {
      return -1;
    } 
    const ticketNumber = this.tickets[0].number;
    this.tickets.shift();
    const attendTicket = new Ticket(ticketNumber, desktop);
    this.lastFourTickets.unshift(attendTicket);

    if (this.lastFourTickets.length > 4) {
      this.lastFourTickets.splice(-1 , 1);
    }

    console.log('ultimos4', this.lastFourTickets);
    this.saveFile();
    return attendTicket;
  }

  getCurrentTicket() {
    return this.last;
  }

  getLastFourTickets() {
    return this.lastFourTickets;
  }

  resetCount() {
    this.last = 0;
    this.tickets = [];
    this.lastFourTickets = [];
    this.saveFile();
  }

  saveFile() {
    const jsonData = { 
      last: this.last, 
      today: this.today, 
      tickets: this.tickets,
      lastFourTickets: this.lastFourTickets
    };
    const jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync('./server/data/data.json', jsonDataString);
  }
}

module.exports = { TicketControl };