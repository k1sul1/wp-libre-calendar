import { el, mount, unmount } from 'redom';
import { toArray } from './helpers.js';

const elements = {};
export function eventDetailMeta(event) {
  const type = event.target.value;
  const container = document.querySelector('#wplf_event_details_container');

  const destroy = (element) => {
    // Before destroying, store reference to the element, so it can be re-rendered without
    // losing attached event listeners. This should make it a lot easier for someone to
    // just build extensions on top of this.

    elements[element.getAttribute('type')] = element;
    unmount(container, element);
  };

  const eventFn = () => {
    toArray(container.children).forEach(destroy);

    return elements[type] || el(
      'div',
      { type: 'event' },
      'Event spesific'
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
