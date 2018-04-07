export const KEYS = {
    'NONE': 0,
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40,
    'A': 65,
    'B': 66,
    'C': 67,
    'D': 68,
    'E': 69,
    'F': 70,
    'G': 71,
    'H': 72,
    'I': 73,
    'J': 74,
    'K': 75,
    'L': 76,
    'M': 77,
    'N': 78,
    'O': 79,
    'P': 80,
    'Q': 81,
    'R': 82,
    'S': 83,
    'T': 84,
    'U': 85,
    'V': 86,
    'W': 87,
    'X': 88,
    'Y': 89,
    'Z': 90,
};

export default class Keyboard {
    constructor() {
        this.onKeyup = this.onKeyup.bind(this);
        this.onKeydown = this.onKeydown.bind(this);
        window.addEventListener('keyup', this.onKeyup, false);
        window.addEventListener('keydown', this.onKeydown, false);
    }
    isDown(keyCode) {
        return this[keyCode];
    }

    onKeydown(event) {
        this[event.keyCode] = true;
    }
  
    onKeyup(event) {
        delete this[event.keyCode];
    }
};

