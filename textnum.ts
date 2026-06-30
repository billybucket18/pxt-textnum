//% weight=100 color=#cc5500 icon=""
namespace textnum {

    //% block="encode text %text to glued numbers"
    export function encode(text: string): string {
        let out = "";
        for (let i = 0; i < text.length; i++) {
            const ascii = text.charCodeAt(i);
            const mapped = ascii - 32; // printable ASCII → 0–94

            // MakeCode-safe pad to 2 digits
            let padded = mapped.toString();
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
            const mapped = parseInt(pair);

            const ascii = mapped + 32; // reverse mapping
            out += String.fromCharCode(ascii);
        }

        return out;
    }
}
