export abstract class ResourceBase {
  private entries;

  constructor() {
    this.entries = window.performance.getEntries();
  }

  getEntries(type) {
    let res: any = [];

    for (let item of this.entries) {
      if (item.initiatorType === type) {
        res.push(item);
      }
    }

    return res;
  }

  abstract get();
}

export class Css extends ResourceBase {
  get() {
    return this.getEntries('css');
  }
}

export class Script extends ResourceBase {
  get() {
    return this.getEntries('script');
  }
}

export class Resource {
  private _CSS: Css;
  private _SCRIPT: Script;

  css() {
    if (!this._CSS) {
      this._CSS = new Css().get();
    }

    return this._CSS;
  }

  script() {
    if (!this._SCRIPT) {
      this._SCRIPT = new Css().get();
    }

    return this._SCRIPT;
  }

  collection() {
    console.log('resource: ', {
      css: this.css(),
      scrilpt: this.script()
    });

    return {
      css: this.css(),
      scrilpt: this.script()
    };
  }
}
