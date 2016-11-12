import { el, mount, unmount } from 'redom';
import { Calendar } from './calendar.js';

export default function  pluginSettingsForm(element) {
  const form = element instanceof HTMLElement ? element : document.querySelector(element);
  const calendarBase = el('div', { class: 'wplc-calendar' });
  const calendar = new Calendar(2016);


  mount(calendarBase, calendar.createYear(2016));
  mount(form, calendarBase);
}
