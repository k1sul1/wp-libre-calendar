import { toArray, clearSiblingInputs } from './helpers.js';
import { renderMetaboxFields } from './event-metabox.js';
import { default as injectRoids } from './plugin-form.js';

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

toArray(document.querySelectorAll('#wplc-settings-form')).forEach(form => {
  // This should never execute more than once, but it's wrapped like this for consistency,
  // and it also serves as an element.exists() check.
  injectRoids(form);
});
