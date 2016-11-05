(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

function toArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
}

function clearSiblingInputs(evt) {
    var target = evt.currentTarget || evt.target;

    if (!target) {
        return;
    }

    evt.preventDefault();

    toArray(target.parentNode.querySelectorAll("input")).
    forEach(function (input) {
        input.checked = false;
    });
}

var HASH = '#'.charCodeAt(0);
var DOT = '.'.charCodeAt(0);

function createElement (query, ns) {
  // query parsing magic, thank you @maciejhirsz

  var tag, id, className;

  var mode = 0;
  var start = 0;

  for (var i = 0, len = query.length; i <= len; i++) {
    var cp = (i === len) ? 0 : query.charCodeAt(i);

    if (cp === HASH || cp === DOT || cp === 0) {
      if (mode === 0) {
        tag = (i === 0) ? 'div' : (cp === 0) ? query : query.substring(start, i);
      } else {
        var slice = query.substring(start, i);

        if (mode === 1) {
          id = slice;
        } else if (className) {
          className += ' ' + slice;
        } else {
          className = slice;
        }
      }

      start = i + 1;
      mode = (cp === HASH) ? 1 : 2;
    }
  }
  var element = ns ? document.createElementNS(ns, tag) : document.createElement(tag);

  if (id) { element.id = id; }
  if (className) { element.className = className; }

  return element
}

function text (content) {
  return document.createTextNode(content)
}

function mount (parent, child, before) {
  var parentEl = parent.el || parent;
  var childEl = child.el || child;

  if (childEl.__redom_list) {
    childEl = childEl.el;
  }

  if (child === childEl && childEl.__redom_view) {
    // try to look up the view if not provided
    child = childEl.__redom_view;
  }

  if (child !== childEl) {
    childEl.__redom_view = child;
  }
  if (before) {
    parentEl.insertBefore(childEl, before.el || before);
  } else {
    parentEl.appendChild(childEl);
  }
  if (child.isMounted) {
    child.remounted && child.remounted();
  } else {
    child.isMounted = true;
    child.mounted && child.mounted();
  }
}

function unmount (parent, child) {
  var parentEl = parent.el || parent;
  var childEl = child.el || child;

  if (child === childEl && childEl.__redom_view) {
    // try to look up the view if not provided
    child = childEl.__redom_view;
  }

  parentEl.removeChild(childEl);

  child.isMounted = false;
  child.unmounted && child.unmounted();
}

var cache = {};

function el (query) {
  var arguments$1 = arguments;

  var element;

  if (typeof query === 'string') {
    element = (cache[query] || (cache[query] = createElement(query))).cloneNode(false);
  } else if (query && query.nodeType) {
    element = query.cloneNode(false);
  } else {
    throw new Error('At least one argument required')
  }

  var empty = true;

  for (var i = 1; i < arguments.length; i++) {
    var arg = arguments$1[i];

    if (!arg) {
      continue
    }

    // support middleware
    if (typeof arg === 'function') {
      arg(element);
    } else if (typeof arg === 'string' || typeof arg === 'number') {
      if (empty) {
        empty = false;
        element.textContent = arg;
      } else {
        element.appendChild(text(arg));
      }
    } else if (arg.nodeType || (arg.el && arg.el.nodeType)) {
      empty = false;
      mount(element, arg);
    } else if (arg.length) {
      for (var j = 0; j < arg.length; j++) {
        empty = false;
        mount(element, arg[j]);
      }
    } else if (typeof arg === 'object') {
      for (var key in arg) {
        var value = arg[key];

        if (key === 'style') {
          if (typeof value === 'string') {
            element.setAttribute(key, value);
          } else {
            for (var cssKey in value) {
              element.style[cssKey] = value[cssKey];
            }
          }
        } else if (key in element || typeof value === 'function') {
          element[key] = value;
        } else {
          element.setAttribute(key, value);
        }
      }
    }
  }

  return element
}

el.extend = function (query) {
  var clone = (cache[query] || (cache[query] = createElement(query)));

  return el.bind(this, clone)
};

function List (parent, View, key, initData) {
  this.__redom_list = true;
  this.View = View;
  this.key = key;
  this.initData = initData;
  this.views = [];
  this.el = typeof parent === 'string' ? el(parent) : parent;

  if (key) {
    this.lookup = {};
  }
}

List.extend = function (parent, View, key, initData) {
  return List.bind(List, parent, View, key, initData)
};

List.prototype.update = function (data) {
  var View = this.View;
  var key = this.key;
  var functionKey = typeof key === 'function';
  var initData = this.initData;
  var views = this.views;
  var parent = this.el;
  var traverse = parent.firstChild;

  if (key) {
    var lookup = this.lookup;
  }

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var view;

    if (key) {
      var id = functionKey ? key(item) : item[key];
      view = views[i] = lookup[id] || (lookup[id] = new View(initData, item, i));
      view.__id = id;
    } else {
      view = views[i] || (views[i] = new View(initData, item, i));
    }
    var el$$1 = view.el;
    if (el$$1.__redom_list) {
      el$$1 = el$$1.el;
    }
    el$$1.__redom_view = view;
    view.update && view.update(item, i);

    if (traverse === el$$1) {
      traverse = traverse.nextSibling;
      continue
    }

    if (traverse) {
      parent.insertBefore(el$$1, traverse);
    } else {
      parent.appendChild(el$$1);
    }
    if (view.isMounted) {
      view.remounted && view.remounted();
    } else {
      view.isMounted = true;
      view.mounted && view.mounted();
    }
  }

  while (traverse) {
    var next = traverse.nextSibling;
    var _view = traverse.__redom_view;

    if (key) {
      if (_view) {
        id = _view.__id;
        lookup[id] = null;
      }
    }
    views[i++] = null;
    parent.removeChild(traverse);

    _view.isMounted = false;
    _view.unmounted && _view.unmounted();
    traverse.__redom_view = null;

    traverse = next;
  }

  views.length = data.length;
};

var SVG = 'http://www.w3.org/2000/svg';

var cache$1 = {};

function svg (query, a) {
  var arguments$1 = arguments;

  var element;

  if (typeof query === 'string') {
    element = (cache$1[query] || (cache$1[query] = createElement(query, SVG))).cloneNode(false);
  } else if (query && query.nodeType) {
    element = query.cloneNode(false);
  } else {
    throw new Error('At least one argument required')
  }

  var empty = true;

  for (var i = 1; i < arguments.length; i++) {
    var arg = arguments$1[i];

    if (!arg) {
      continue
    } else if (typeof arg === 'function') {
      arg = arg(element);
    } else if (typeof arg === 'string' || typeof arg === 'number') {
      if (empty) {
        empty = false;
        element.textContent = arg;
      } else {
        element.appendChild(text(arg));
      }
    } else if (arg.nodeType || (arg.el && arg.el.nodeType)) {
      empty = false;
      mount(element, arg);
    } else if (typeof arg === 'object') {
      for (var key in arg) {
        var value = arg[key];

        if (key === 'style' && typeof value !== 'string') {
          for (var cssKey in value) {
            element.style[cssKey] = value[cssKey];
          }
        } else if (typeof value === 'function') {
          element[key] = value;
        } else {
          element.setAttribute(key, value);
        }
      }
    }
  }

  return element
}

svg.extend = function (query) {
  var clone = (cache$1[query] || (cache$1[query] = createElement(query, SVG)));

  return svg.bind(this, clone)
};

var elements = {};
function eventDetailMeta(event) {
  var type = event.target.value;
  var container = document.querySelector('#wplf_event_details_container');

  var destroy = function (element) {
    // Before destroying, store reference to the element, so it can be re-rendered without
    // losing attached event listeners. This should make it a lot easier for someone to
    // just build extensions on top of this.

    elements[element.getAttribute('type')] = element;
    unmount(container, element);
  };

  var eventFn = function () {
    toArray(container.children).forEach(destroy);

    return elements[type] || el(
      'div',
      { type: 'event' },
      'Event spesific'
    );
  };

  var openFn = function () {
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

toArray(document.querySelectorAll('[data-action=clear]')).forEach(function (el) {
  el.addEventListener('click', clearSiblingInputs);
  el.classList.remove('cloak');
});

toArray(document.querySelectorAll('.wplc_event_type')).forEach(function (check) {
  check.addEventListener('change', eventDetailMeta);
});

})));
//# sourceMappingURL=admin.js.map
