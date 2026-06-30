//% weight=100 color=#cc5500 icon=""
namespace textnum {

    export enum Mode {
        //% block="ASCII2"
        ASCII2,
        //% block="Glued"
        GLUED,
        //% block="Alphabet"
        ALPHA,
        //% block="Hex"
        HEX
    }

    //% block="encode text %text using mode %mode"
    export function encode(text: string, mode: Mode): string {
        if (mode == Mode.ASCII2) return encodeASCII2(text);
        if (mode == Mode.GLUED) return encodeGlued(text);
        if (mode == Mode.ALPHA) return encodeAlpha(text);
        if (mode == Mode.HEX) return encodeHex(text);
        return "";
    }

    //% block="decode numbers %numbers using mode %mode"
    export function decode(numbers: string, mode: Mode): string {
        if (mode == Mode.ASCII2) return decodeASCII2(numbers);
        if (mode == Mode.GLUED) return decodeGlued(numbers);
        if (mode == Mode.ALPHA) return decodeAlpha(numbers);
        if (mode == Mode.HEX) return decodeHex(numbers);
        return "";
    }

    // -------------------------
    // MODE: ASCII2 (fixed width)
    // -------------------------
    function encodeASCII2(text: string): string {
        let out = "";
        for (let i = 0; i < text.length; i++) {
            const ascii = text.charCodeAt(i);
            const mapped = ascii - 32; // printable ASCII → 0–94
            let padded = mapped.toString();
            if (padded.length < 2) padded = "0" + padded;
            out += padded;
        }
        return out;
    }

    function decodeASCII2(numbers: string): string {
        let out = "";
        let cleaned = clean(numbers);

        for (let i = 0; i < cleaned.length; i += 2) {
            const pair = cleaned.substr(i, 2);
            const mapped = parseInt(pair);
            const ascii = mapped + 32;
            out += String.fromCharCode(ascii);
        }
        return out;
    }

    // -------------------------
    // MODE: GLUED (your original)
    // -------------------------
    function encodeGlued(text: string): string {
        let out = "";
        for (let i = 0; i < text.length; i++) {
            const code = text.charCodeAt(i) % 100;
            let padded = code.toString();
            if (padded.length < 2) padded = "0" + padded;
            out += padded;
        }
        return out;
    }

    function decodeGlued(numbers: string): string {
        let out = "";
        let cleaned = clean(numbers);

        for (let i = 0; i < cleaned.length; i += 2) {
            const pair = cleaned.substr(i, 2);
            const ascii = parseInt(pair);
            out += String.fromCharCode(ascii);
        }
        return out;
    }

    // -------------------------
    // MODE: ALPHA (A=01…Z=26)
    // -------------------------
    function encodeAlpha(text: string): string {
        let out = "";
        for (let i = 0; i < text.length; i++) {
            let c = text.charAt(i).toLowerCase();
            let n = c.charCodeAt(0) - 96; // a=1
            if (n < 1 || n > 26) n = 0; // non-letters
            let padded = n.toString();
            if (padded.length < 2) padded = "0" + padded;
            out += padded;
        }
        return out;
    }

    function decodeAlpha(numbers: string): string {
        let out = "";
        let cleaned = clean(numbers);

        for (let i = 0; i < cleaned.length; i += 2) {
            const pair = cleaned.substr(i, 2);
            const n = parseInt(pair);
            if (n >= 1 && n <= 26) {
                out += String.fromCharCode(n + 96);
            } else {
                out += "?";
            }
        }
        return out;
    }

    // -------------------------
    // MODE: HEX (safe, MakeCode-compatible)
    // -------------------------
    function encodeHex(text: string): string {
        let out = "";
        for (let i = 0; i < text.length; i++) {
            const ascii = text.charCodeAt(i);
            out += toHex(ascii);
        }
        return out;
    }

    function decodeHex(numbers: string): string {
        let out = "";
        let cleaned = clean(numbers);

        for (let i = 0; i < cleaned.length; i += 2) {
            const pair = cleaned.substr(i, 2);
            const hi = hexToVal(pair.charAt(0));
            const lo = hexToVal(pair.charAt(1));
            const ascii = hi * 16 + lo;
            out += String.fromCharCode(ascii);
        }
        return out;
    }

    // Manual hex conversion (MakeCode-safe)
    function toHex(n: number): string {
        const hexChars = "0123456789abcdef";
        let hi = Math.floor(n / 16);
        let lo = n % 16;
        return hexChars.charAt(hi) + hexChars.charAt(lo);
    }

    function hexToVal(c: string): number {
        const hexChars = "0123456789abcdef";
        return hexChars.indexOf(c.toLowerCase());
    }

    // -------------------------
    // Helper: remove whitespace
    // -------------------------
    function clean(s: string): string {
        let out = "";
        for (let i = 0; i < s.length; i++) {
            const ch = s.charAt(i);
            if (ch != " " && ch != "\n" && ch != "\t" && ch != "\r") {
                out += ch;
            }
        }
        return out;
    }
}
