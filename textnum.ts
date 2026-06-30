//% weight=100 color=#cc5500 icon=""
namespace textnum {

    //% block="encode text %text to numbers"
    export function encode(text: string): string {
        let out = "";
        for (let i = 0; i < text.length; i++) {
            const code = text.charCodeAt(i);
            out += code.toString();
            if (i < text.length - 1) out += ",";
        }
        return out;
    }

    //% block="decode numbers %numbers to text"
    export function decode(numbers: string): string {
        let out = "";
        const parts = numbers.split(",");
        for (let i = 0; i < parts.length; i++) {
            const n = parseInt(parts[i]);
            if (!isNaN(n)) out += String.fromCharCode(n);
        }
        return out;
    }
}
