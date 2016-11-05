import { toArray, clearSiblingInputs } from './helpers.js';
import { eventDetailMeta } from './event-metabox.js';

toArray(document.querySelectorAll('[data-action=clear]')).forEach(el => {
  el.addEventListener('click', clearSiblingInputs);
  el.classList.remove('cloak');
});

toArray(document.querySelectorAll('.wplc_event_type')).forEach(check => {
  check.addEventListener('change', eventDetailMeta);
});


