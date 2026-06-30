//% weight=100 color=#cc5500 icon=""
namespace textnum {

    //% block="encode text %text to glued numbers"
    export function encode(text: string): string {
        let out = "";
        for (let i = 0; i < text.length; i++) {
            const code = text.charCodeAt(i) % 100; // always 2 digits
            const padded = code.toString().padStart(2, "0");
            out += padded;
        }
        return out;
    }

    //% block="decode glued numbers %numbers to text"
    export function decode(numbers: string): string {
        let out = "";

        // remove whitespace
        const cleaned = numbers.replace(/\s+/g, "");

        // must be even length
        for (let i = 0; i < cleaned.length; i += 2) {
            const pair = cleaned.substr(i, 2);
            const n = parseInt(pair);

            // reverse the modulo trick:
            // we assume characters are in ASCII range 32–126
            const charCode = n; // direct mapping
            out += String.fromCharCode(charCode);
        }

        return out;
    }
}
