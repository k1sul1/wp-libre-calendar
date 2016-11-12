import { el, mount } from 'redom';

export class Calendar {
  // Based on https://jsfiddle.net/pakastin/kw0ogxca/1/

  constructor(year) {
    this.year = year;
    this.month_names = this.getMonthNames();
  }

  getMonthNames() {
    const months = 'January February March April May June July August September October November December';
    return months.split(' ');
  }

  createDay(week, index) {
    // create table cell for every day
    var td = el('td');
    var day = week[index];
    var today = (new Date()).setUTCHours(0,0,0,0);

    // set day of month as table cell text content
    td.textContent = day.date.getDate();

    if (day.date.getTime() === today){
      td.classList.add('current');
    }

    console.log(day.date.getTime(), today);

    // add before/after class
    day.before && td.classList.add('before');
    day.after && td.classList.add('after');

    return td;
  }

  createWeek(weeks, index) {
    // create table row for every week
    var tr = el('tr');
    var week = weeks[index];

    // iterate days
    for (var k = 0; k < week.length; k++) {
      const td = this.createDay(week, k);
      // mount table cell
      mount(tr, td);
    }

    return tr;
  }

  createMonth(monthIndex) {
    // create a table for month with thead & tbody
    var div = el('div', { className: 'month' });
    var p = el('p', { className: 'month--name' });
    var table = el('table');
    var thead = el('thead');
    var tbody = el('tbody');

    // get weeks for a given month
    var weeks = this.getWeeksInMonth(this.year, monthIndex);

    // iterate weeks
    for (var j = 0; j < weeks.length; j++) {
      const tr = this.createWeek(weeks, j);

      // mount table row
      mount(tbody, tr);

      // create month name
      p.textContent = this.month_names[monthIndex];

      // create thead
      thead.innerHTML = '<tr><td>' + 'Mo Tu We Th Fr Sa Su'.split(' ').join('</td><td>') + '</td></tr>';

      // mount thead & tbody
      mount(table, thead);
      mount(table, tbody);

      // mount month name to container
      mount(div, p);

      // mount table to container
      mount(div, table);

    }

    return div;
  }

  createYear(year) {
    const wrapper = el('div', { className: 'calendar-wrap' });

    if (year !== undefined) {
      this.year = year; // if set, override initial value
    }

    for (var i = 0; i < 12; i++) {
      const month = this.createMonth(i);
      mount(wrapper, month);
    }

    return wrapper;
  }

  getWeeksInMonth (year, month) {
    var weeks = [];

    // find out first and last days of the month
    var firstDate = new Date(year, month, 1);
    var lastDate = new Date(year, month + 1, 0)

    // calculate first monday and last sunday
    var firstMonday = this.getFirstMonday(firstDate);
    var lastSunday = this.getLastSunday(lastDate);

    // iterate days starting from first monday
    var iterator = new Date(firstMonday);
    var i = 0;

    // ..until last sunday
    while (iterator <= lastSunday) {
      if (i++ % 7 === 0) {
        // start new week when monday
        var week = [];
        weeks.push(week);
      }

      // push day to week
      week.push({
        date: new Date(iterator),
        before: iterator < firstDate, // add indicator if before current month
        after: iterator > lastDate // add indicator if after current month
      });

      // iterate to next day
      iterator.setDate(iterator.getDate() + 1);
    }

    return weeks;
  }

  fixMonday (day) {
    day || (day = 7);
    return --day;
  }

  getFirstMonday (firstDate) {
    var offset = this.fixMonday(firstDate.getDay());

    var result = new Date(firstDate);
    result.setDate(firstDate.getDate() - offset);

    return result;
  }

  getLastSunday (lastDate) {
    var offset = 6 - this.fixMonday(lastDate.getDay());

    var result = new Date(lastDate);
    result.setDate(lastDate.getDate() + offset);

    return result;
  }
}
