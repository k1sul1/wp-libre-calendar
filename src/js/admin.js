import { toArray, clearSiblingInputs } from './helpers.js';
import { renderMetaboxFields } from './event-metabox.js';

toArray(document.querySelectorAll('[data-action=clear]')).forEach(el => {
  el.addEventListener('click', clearSiblingInputs);
  el.classList.remove('cloak');
});

toArray(document.querySelectorAll('input[name="wplc_event_type"]')).forEach(check => {
  if (check.checked) {
    renderMetaboxFields(check);
  }
  check.addEventListener('change', renderMetaboxFields);
});


