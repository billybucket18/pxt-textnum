# pxt-textnum
Text ↔ glued-number encoder/decoder extension for MakeCode.

## Encoding
Each character becomes a 2‑digit number:
- `a` → `21`
- `n` → `73`
- `c` → `63`
- `d` → `67`

## Decoding
Digits are read in pairs and converted back to characters.
