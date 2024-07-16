class WindowOptions extends Array {
  constructor(...args) {
    super()

    this.hidden = true
    this.class = ["no-full","no-max"]
    
    for (var i=0;i<args.length;i++) {
      this[args.entries()[i]] = args[args.entries()[i]]
    }
  }
}

class Tier {
  constructor() {
    this._windows = {}
  }

  newWindow(id,title,options={}) {
    options = new WindowOptions(options)
    this._windows[id] = (new WinBox(title,options))
  }
}

class Tier1 extends Tier {
  constructor() {
    super()
    
    this.newWindow("button","Button",{})
  }

  start() {
    this._windows.button.show()
  }
}

function startup() {
  const tier1 = new Tier1()

  tier1.start()
}