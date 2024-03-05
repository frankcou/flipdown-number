export class FlipDownNumberItem {
  constructor(container, options) {
    this.initValue = options?.initValue || "0";
    this.previous = options?.initValue || "0";
    this.curr = options?.initValue || "0";
    this.mount(container);
  }
  _dom = null;

  initValue = "";
  curr = "0";
  previous = "0";

  updatePre() {
    this._dom.querySelector(".FlipDownNumberItem-pre .front").innerText =
      this.previous;
    this._dom.querySelector(".FlipDownNumberItem-pre .bottom span").innerText =
      this.previous;
  }
  updateCurr() {
    this._dom.querySelector(".FlipDownNumberItem-pre .back").innerText =
      this.curr;
    this._dom.querySelector(".FlipDownNumberItem-curr .top").innerText =
      this.curr;
    this._dom.querySelector(".FlipDownNumberItem-curr .bottom span").innerText =
      this.curr;
  }
  flip(value) {
    if (value === this.curr) return;
    const classList = this._dom.classList;
    const hasAniClass = [...this._dom.classList.includes("ani")];
    if (hasAniClass) {
      classList.remove("ani");
    } else {
      classList.remove("ani_copy");
    }
    this.previous = this.curr;
    this.updatePre();
    if (hasAniClass) {
      classList.add("ani_copy");
    } else {
      classList.add("ani");
    }
    this.curr = value;
    this.updateCurr();
  }
  mount(container) {
    const template = `<div class="FlipDownNumberItem">
      <div class="FlipDownNumberItem-pre">
        <div class="top">
          <span class="box_3d">
            <span class="front">${this.previous}</span>
            <span class="back">${this.curr}</span>
          </span>
        </div>
        <div class="bottom">
          <span>${this.previous}</span>
        </div>
      </div>
      <div class="FlipDownNumberItem-curr">
        <div class="top">${this.curr}</div>
        <div class="bottom">
          <span>${this.curr}</span>
        </div>
      </div>
    </div>`;

    container.insertAdjacentHTML("afterbegin", template);

    this._dom = container.children[0];
  }
  destory() {
    this._dom.remove();
    this._dom = null;
  }
}

export default class FlipDownNumber {
  constructor(dom, options) {
    if (typeof dom === "string") {
      dom = document.querySelector(dom);
    }
    this.container = dom;
    if (dom.style.display !== "flex") {
      dom.style.display = "flex";
    }
    if (options) {
      this.minBit = options.minBit || 4;
      this.initValue = options.initValue || "0";
    }
    this.set(this.initValue);
  }
  container = null;
  minBit = 5;
  initValue = "0";
  items = [];
  set(v) {
    const numStr = this.nums(v);
    if (numStr.length > this.items.length) {
      for (let index = numStr.length - this.items.length; index > 0; index--) {
        const item = new FlipDownNumberItem(this.container, {
          initValue: this.initValue,
        });
        this.items.unshift(item);
      }
    } else if (numStr.length < this.items.length) {
      for (let index = 0; index < this.items.length - numStr.length; index--) {
        this.items[index].destory();
      }
    }

    this.items.forEach((el, idx) => {
      const num = numStr[idx];
      el.flip(num);
    });
  }
  nums(value) {
    let result = "" + value;
    const bit = this.minBit - result.length;
    if (bit > 0) {
      for (let index = 0; index < bit; index++) {
        result = "0" + result;
      }
    }
    return result;
  }

  destory() {
    this.items.forEach((el) => el.destory());
    this.items = [];
    this.container = null;
  }
}
