"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FinnBattle {
    constructor(p, j, n) {
        this.isJakeUsed = false;
        this.p = p;
        this.j = j;
        this.n = n;
        this.villains = [];
    }
    add(villainP) {
        if (this.villains.length < this.n) {
            this.villains.push(villainP);
        }
    }
    make() {
        let battles = this.villains
            .sort((a, b) => a - b)
            .filter(villain => {
            if (this.p > villain) {
                this.p += villain;
                return true;
            }
            else {
                if (this.helpJake(villain)) {
                    this.p += villain;
                    return true;
                }
                else {
                    return false;
                }
            }
        });
        return battles.length == this.n ? 'SI' : 'NO';
    }
    helpJake(villainP) {
        let canHelp = !this.isJakeUsed && ((this.p + this.j) * 2) > villainP;
        if (canHelp) {
            this.isJakeUsed = true;
        }
        return canHelp;
    }
}
class GokuMovement {
    constructor(ki, n) {
        this.ki = ki;
        this.n = n;
        this.movements = [];
    }
    add(movement) {
        if (this.movements.length < this.n) {
            this.movements.push(movement);
        }
    }
    make() {
        let movements = this.movements.map(i => {
            let k = this.movements.filter(j => Math.abs(i - j) >= 1 && Math.abs(i - j) <= this.ki);
            return k.length;
        });
        return `${movements.length + 1}`;
    }
}
class Console {
    constructor() {
        this.exercise = 0;
        this.stage = 0;
    }
    ask(msg) {
        console.log(msg);
    }
    read(data) {
        switch (this.stage) {
            case 0:
                this.exercise = Number.parseInt(data);
                break;
            case 1:
                this.exercise === 1 ? this.createGoku(data) : this.createFinn(data);
                break;
            case 2:
                this.addParameter(data);
                this.ask('Su resultado es ' + this.hero.make());
                process.exit();
                break;
            default:
                this.ask('Opcion invalida');
        }
        this.stage++;
        this.doTask();
    }
    addParameter(data) {
        let items = data.trim().split(/\s/).filter(val => parseInt(val) && parseInt(val));
        items.forEach(i => {
            if (this.validateParameter(i)) {
                this.hero.add(parseInt(i));
            }
        });
        console.log(items);
    }
    doTask() {
        switch (this.stage) {
            case 0:
                this.ask("Selecciona 1 - Goku, 2 - Finn:");
                break;
            case 1:
                this.ask("Ingrese primera linea");
                break;
            case 2:
                this.ask("Ingrese segunda linea");
                break;
        }
    }
    validateSize(n) {
        return 2 <= parseInt(n) && parseInt(n) <= Math.pow(10, 5);
    }
    validatePJK(value) {
        return 0 <= parseInt(value) && parseInt(value) < Math.pow(10, 9);
    }
    validateParameter(value) {
        return -Math.pow(10, 9) <= parseInt(value) && parseInt(value) < Math.pow(10, 9);
    }
    createGoku(data) {
        let items = data.trim().split(/\s/);
        if (items.length != 2) {
            throw new Error('Parametros invalidos');
        }
        let n = items[0];
        let k = items[1];
        if (parseInt(n) && parseInt(k) && this.validateSize(n) && this.validatePJK(k)) {
            this.hero = new GokuMovement(parseInt(n), parseInt(k));
        }
        else {
            throw new Error('Parametros con formato invalido');
        }
    }
    createFinn(data) {
        let items = data.trim().split(/\s/);
        if (items.length != 3) {
            throw new Error('Parametros invalidos');
        }
        let n = items[0];
        let p = items[1];
        let j = items[2];
        if (parseInt(n) && parseInt(p) && parseInt(j) && this.validateSize(n) && this.validatePJK(p) && this.validatePJK(j)) {
            this.hero = new FinnBattle(parseInt(p), parseInt(j), parseInt(n));
        }
        else {
            throw new Error('Parametros con formato invalido');
        }
    }
}
const stdin = process.openStdin();
let consoleObj = new Console();
consoleObj.doTask();
stdin.addListener("data", (data) => {
    consoleObj.read(data.toString());
});
