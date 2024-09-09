class Tier {
  constructor() {
    this._windows = {}
  }

  newWindow(id,title,options={}) {
    this._windows[id] = (new WinBox(title,options))
  }
}

class Button {
    constructor(host) {
        this.host = host
        
        this.perClickScore = 1
    }

    click() {
        this.host.score += this.perClickScore

        if (this.host.score >= 10) {
            this.host._windows.clickCount.show()
        }
    }
}

class Tier1 extends Tier {
    constructor() {
        super()
        
        const self = this
        
        this.button = new Button(this)
        
        this.newWindow("button","Button",{onclose: (force)=>{createCannotCloseWindow();return true;},class: ["no-max","no-full"],mount: document.getElementById("buttonWindow")})
        
        this.newWindow("clickCount","Clicks",{hidden:true})
  }

  start() {
    this._windows.button.show()
  }

    createCannotCloseWindow() {
        self.newWindow("InvincibleButtonWindow","Invalid Action",{
            minheight:100,
            maxheight:150,
            minwidth: 200,
            maxwidth: 300,
            class: [
              "no-max",
              "no-full",
              "error-window"
            ],
            html: "You cannot close this window"
          })
        }
    }
}

let tier1 = null

function startup() {
    try {
        tier1 = new Tier1()
        tier1.start()
    } catch (e) {
        alert(e)
    }
}