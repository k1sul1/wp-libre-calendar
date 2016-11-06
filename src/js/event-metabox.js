import { el, mount, unmount } from 'redom';
import { toArray } from './helpers.js';
import Pikaday from 'pikaday';


const elements = {};
export function renderMetaboxFields(event) {
  const type = event.value || event.target.value;
  const container = document.querySelector('#wplc_event_details_container');

  const destroy = (element) => {
    // Before destroying, store reference to the element, so it can be re-rendered without
    // losing attached event listeners. This should make it a lot easier for someone to
    // just build extensions on top of this.

    elements[element.getAttribute('type')] = element;
    unmount(container, element);
  };

  const eventFn = () => {
    toArray(container.children).forEach(destroy);

    const startTimeInput = el(
      'input',
      {
        type: 'text',
        name: 'wplc_event_start_time',
        class: 'datepicker',
        placeholder: wplc.localization['Select date'],
        value: wplc.post.meta['wplc_event_start_time'] || ''
      }
    );
    const picker = new Pikaday({ field: startTimeInput });

    return elements[type] || el(
      'div',
      { type: 'event' },
      el(
        'label',
        { class: 'wplc_event_start_time' },
        startTimeInput
      )
    );
  };

  const openFn = () => {
    toArray(container.children).forEach(destroy);

    return elements[type] || el(
      'div',
      { type: 'open' },
      'Open spesific'
    );
  };

  switch(type) {
    case 'event':
      return mount(container, eventFn());
    break;

    case 'open':
      return mount(container, openFn());
    break;

    default:
      return mount(container, eventFn());
    break;
  }
}
