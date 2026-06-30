//% weight=100 color=#cc5500 icon=""
namespace textnum {

    //% block="encode text %text to glued numbers"
    export function encode(text: string): string {
        let out = "";
        for (let i = 0; i < text.length; i++) {
            const code = text.charCodeAt(i) % 100; // always 2 digits (00–99)

            // MakeCode-safe padStart:
            let padded = code.toString();
            if (padded.length < 2) padded = "0" + padded;

            out += padded;
        }
        return out;
    }

    //% block="decode glued numbers %numbers to text"
    export function decode(numbers: string): string {
        let out = "";

        // Remove whitespace manually (MakeCode-safe)
        let cleaned = "";
        for (let i = 0; i < numbers.length; i++) {
            const ch = numbers.charAt(i);
            if (ch != " " && ch != "\n" && ch != "\t" && ch != "\r") {
                cleaned += ch;
            }
        }

        // Decode in pairs
        for (let i = 0; i < cleaned.length; i += 2) {
            const pair = cleaned.substr(i, 2);
            const n = parseInt(pair);

            // Direct mapping back to charCode
            out += String.fromCharCode(n);
        }

        return out;
    }
}
