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

        // Clean up whitespace so MakeCode text inputs don't break parsing
        const cleaned = numbers.replace(/\s+/g, "");

        // Split by comma
        const parts = cleaned.split(",");

        for (let i = 0; i < parts.length; i++) {
            const n = parseInt(parts[i]);
            if (!isNaN(n)) {
                out += String.fromCharCode(n);
            }
        }

        return out;
    }
}
