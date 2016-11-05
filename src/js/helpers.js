export function toArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
}

export function clearSiblingInputs(evt) {
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


