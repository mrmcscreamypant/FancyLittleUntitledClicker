class Tier {
  constructor() {
    this._windows = {}
  }

  newWindow(id,title,options={}) {
    this._windows[id] = (new WinBox(title,options))
    return this._windows[id];
  }
}

class Button {
    constructor(host) {
        this.host = host

        this.hasGrantedUpgradesButton = false
        
        this.perClickScore = 1
    }

    click() {
        this.host.score += this.perClickScore
        this.host.statWindow.cpsCounter += this.perClickScore

        this.host.statWindow.updateScore()
        this.host.upgradeShop.displayUpgrades()

        const self = this

        if (this.host.score >= 10) {
            this.host._windows.clickCount.show()
        } 
        if (this.host.score >= 50) {
            if (!this.hasGrantedUpgradesButton) {
                this.host._windows.button.addControl({
                    index: 0,
                    class: "icon",
                    image: "icons/upgrade.svg",
                    click: function(event,window){
                        self.host.upgradeShop.openWindow()
                    }
                })
                this.hasGrantedUpgradesButton = true
            }
        }
    }
}

class StatWindow {
    constructor(host) {
        this.host = host

        const self = this

        this.cps = 0
        this.cpsCounter = 0

        this.host.newWindow("clickCount","Clicks",{onclose: (force)=>{self.host.createCannotCloseWindow();return true;},hidden: true,class: ["no-max","no-full"],width: "20%", height: "40%",mount: document.getElementById("statWindow")})
        this.window = this.host._windows.clickCount

        this.update()
    }

    updateScore() {
        document.getElementById("clickCounter").innerHTML = this.host.score
    }

    update() {
        const self = this

        this.cps = this.cpsCounter
        this.cpsCounter = 0

        document.getElementById("cpsDisplay").innerHTML = this.cps
        
        this.updateTimer = setTimeout(()=>{self.update()},1000)
    }
}

class UpgradeShop {
    constructor(host) {
        this.host = host

        const self = this

        this.unlocked = []

        this.upgrades = [
            {
                "name":"ppcUpgrade",
                "title":"More points per click",
                "desc":"+1",
                "cost":50,
                "unlock":()=>{return true;},
                "func":()=>{
                    const upgrade = self.upgrades[0]
                    self.host.button.perClickScore += 1;
                    upgrade.cost = Math.floor(upgrade.cost*1.5);
                    self.displayUpgrades();
                }
            },
            {
                "name":"autoClickerUpgrade",
                "title":"Invent auto clickers",
                "desc":"Unlock the autoclicker window",
                "cost":100,
                "unlock":()=>{return !this.unlocked.includes(this.upgrades[1]);},
                "func":()=>{
                    this.host._windows.button.addControl({
                        index: 1,
                        class: "icon",
                        image: "icons/clicker.svg",
                        click: function(event,window){
                            self.host.autoClickers.openWindow()
                        }
                    })
                    this.unlocked.push(this.upgrades[1].name)
                }
            }
        ]
    }

    buy(i) {
        try {
        const upgrade = this.upgrades[i]
        if (this.host.score >= upgrade.cost) {
            this.host.score -= upgrade.cost
            this.host.statWindow.updateScore()
            upgrade.func()
            this.window.close()
        }
        } catch (e) {
            alert(e)
        }
    }

    displayUpgrades() {
        if (!this.window) {return}
        var html = ""
        html += `<div id='upgradeList'>`
        
        for (const i in this.upgrades) {
            let upgrade = this.upgrades[i]
            if (this.unlocked.includes(upgrade.name)){continue}
            html += `
                <div class='upgradeContainer'>
                    <h3>${upgrade.title}</h3>
                    <h4>${upgrade.desc}</h4>
                        <button class='button-45' role='button' onClick='tier1.upgradeShop.buy(${i})'>${upgrade.cost} clicks</button>
                </div>`
        }

        html += `</div>`

        this.window.body.innerHTML = html
    }

    openWindow() {
        try {
        const self = this

        try {
            this.window.close()
        } catch {}
        
        this.host.newWindow("upgradeShop","UPGRADES",{class: ["no-max","no-full"],width: "60%", height: "40%",x: "center",y: "bottom"})
        this.window = this.host._windows.upgradeShop

        this.displayUpgrades()
        } catch (e) {
            alert(e)
        }
    }
}

class UpgradeShop {
    constructor(host) {
        this.host = host

        const self = this

        this.unlocked = []

        this.upgrades = [
            {
                "name":"ppcUpgrade",
                "title":"More points per click",
                "desc":"+1",
                "cost":50,
                "unlock":()=>{return true;},
                "func":()=>{
                    const upgrade = self.upgrades[0]
                    self.host.button.perClickScore += 1;
                    upgrade.cost = Math.floor(upgrade.cost*1.5);
                    self.displayUpgrades();
                }
            },
            {
                "name":"autoClickerUpgrade",
                "title":"Invent auto clickers",
                "desc":"Unlock the autoclicker window",
                "cost":100,
                "unlock":()=>{return !this.unlocked.includes(this.upgrades[1]);},
                "func":()=>{
                    this.host._windows.button.addControl({
                        index: 1,
                        class: "icon",
                        image: "icons/clicker.svg",
                        click: function(event,window){
                            self.host.autoClickers.openWindow()
                        }
                    })
                    this.unlocked.push(this.upgrades[1].name)
                }
            }
        ]
    }

    buy(i) {
        try {
        const upgrade = this.upgrades[i]
        if (this.host.score >= upgrade.cost) {
            this.host.score -= upgrade.cost
            this.host.statWindow.updateScore()
            upgrade.func()
            this.window.close()
        }
        } catch (e) {
            alert(e)
        }
    }

    displayUpgrades() {
        if (!this.window) {return}
        var html = ""
        html += `<div id='upgradeList'>`

        for (const i in this.upgrades) {
            let upgrade = this.upgrades[i]
            if (this.unlocked.includes(upgrade.name)){continue}
            html += `
                <div class='upgradeContainer'>
                    <h3>${upgrade.title}</h3>
                    <h4>${upgrade.desc}</h4>
                        <button class='button-45' role='button' onClick='tier1.upgradeShop.buy(${i})'>${upgrade.cost} clicks</button>
                </div>`
        }

        html += `</div>`

        this.window.body.innerHTML = html
    }

    openWindow() {
        try {
        const self = this

        try {
            this.window.close()
        } catch {}

        this.host.newWindow("upgradeShop","UPGRADES",{class: ["no-max","no-full"],width: "60%", height: "40%",x: "center",y: "bottom"})
        this.window = this.host._windows.upgradeShop

        this.displayUpgrades()
        } catch (e) {
            alert(e)
        }
    }
}

class Tier1 extends Tier {
    constructor() {
        super()
        
        const self = this

        this.score = 0
        
        this.button = new Button(this)
        this.statWindow = new StatWindow(this)
        this.upgradeShop = new UpgradeShop(this)
        
        this.newWindow("button","Button",{onclose: (force)=>{self.createCannotCloseWindow();return true;},class: ["no-max","no-full"],mount: document.getElementById("buttonWindow"),x:"center",y:"center"})
  }

  start() {
    this._windows.button.show()
  }

    createCannotCloseWindow() {
        this.newWindow("InvincibleWarn","Invalid Action",{
            minheight:100,
            maxheight:150,
            minwidth: 200,
            maxwidth: 300,
            class: [
              "no-max",
              "no-full",
              "error-window"
            ],
            html: "You cannot close this window",
            x: "center",
            y: "center"
          })
    }
}

let tier1 = null

function startup() {
    try {
        tier1 = new Tier1()
        tier1.start()
        tier1.upgradeShop.openWindow()
    } catch (e) {
        alert(e)
    }
}