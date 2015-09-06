class DOM {
	constructor(selector) {
		var elements = document.querySelectorAll(selector);
		this.classList = [];
		this.length = elements.length;

		Object.assign(this, elements);
	}


	each(callback) {
		for (let el of Array.from(this)) {
			callback.call(el);
		}
		return this;
	}

	addClass(className) {
		return this.each(function () {
			this.classList.add(className);
		});
	}

	removeClass(className) {
		return this.each(function () {
			this.classList.remove(className);
		});
	}

	toggleClass(className) {
		return this.each(function () {
			if (this.hasClass(className)) {
				this.removeClass(className);
			}
			else {
				this.addClass(className);
			}
		})
	}

	hasClass(className) {
		return this[0].classList.contains(className);
	}

	on(event, callback) {
		return this.each(function () {
			this.addEventListener(event, callback, false);
		});
	}

	dispatch(eventType, element) {
		let evt = new window.CustomEvent(eventType, { bubbles: true, cancelable: true, detail: element });
		document.dispatchEvent(evt);
	}

	addMultipleEventListener(el, s, fn: Function) {
		let evts = s.split(' ');
		for (let i = 0, ii = evts.length; i < ii; ++i) {
			el.addEventListener(evts[i], fn, false);
		}
	}
};
export var $ = selector => new DOM(selector);