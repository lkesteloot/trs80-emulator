(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Trs80Emulator = {}));
}(this, (function (exports) { 'use strict';

    /**
     * Interface for fetching cassette audio data. We make this a concrete
     * class because rollup.js can't handle exported interfaces.
     */
    class Cassette {
        constructor() {
            /**
             * The number of samples per second that this audio represents.
             */
            this.samplesPerSecond = 44100;
        }
        /**
         * Called when the motor starts.
         */
        onMotorStart() {
            // Optional function.
        }
        /**
         * Read the next sample. Must be in the range -1 to 1. If we try to read off
         * the end of the cassette, just return zero.
         */
        readSample() {
            return 0;
        }
        /**
         * Called when the motor stops.
         */
        onMotorStop() {
            // Optional function.
        }
    }
    //# sourceMappingURL=Cassette.js.map

    // Various utility functions.
    /**
     * Convert a number to hex and zero-pad to the specified number of hex digits.
     */
    function toHex(value, digits) {
        let s = value.toString(16).toUpperCase();
        while (s.length < digits) {
            s = "0" + s;
        }
        return s;
    }
    /**
     * Return the high byte of a word.
     */
    function hi(value) {
        return (value >> 8) & 0xFF;
    }
    /**
     * Return the low byte of a word.
     */
    function lo(value) {
        return value & 0xFF;
    }
    /**
     * Create a word from a high and low byte.
     */
    function word(highByte, lowByte) {
        return ((highByte & 0xFF) << 8) | (lowByte & 0xFF);
    }
    /**
     * Increment a byte.
     */
    function inc8(value) {
        return add8(value, 1);
    }
    /**
     * Increment a word.
     */
    function inc16(value) {
        return add16(value, 1);
    }
    /**
     * Decrement a byte.
     */
    function dec8(value) {
        return sub8(value, 1);
    }
    /**
     * Decrement a word.
     */
    function dec16(value) {
        return sub16(value, 1);
    }
    /**
     * Add two bytes together.
     */
    function add8(a, b) {
        return (a + b) & 0xFF;
    }
    /**
     * Add two words together.
     */
    function add16(a, b) {
        return (a + b) & 0xFFFF;
    }
    /**
     * Subtract two bytes.
     */
    function sub8(a, b) {
        return (a - b) & 0xFF;
    }
    /**
     * Subtract two words.
     */
    function sub16(a, b) {
        return (a - b) & 0xFFFF;
    }
    /**
     * Convert a byte to a signed number (e.g., 0xff to -1).
     */
    function signedByte(value) {
        return value >= 128 ? value - 256 : value;
    }
    //# sourceMappingURL=Utils.js.map

    /**
     * All registers in a Z80.
     */
    class RegisterSet {
        constructor() {
            // External state:
            this.af = 0;
            this.bc = 0;
            this.de = 0;
            this.hl = 0;
            this.afPrime = 0;
            this.bcPrime = 0;
            this.dePrime = 0;
            this.hlPrime = 0;
            this.ix = 0;
            this.iy = 0;
            this.sp = 0;
            this.pc = 0;
            // Internal state:
            this.memptr = 0;
            this.i = 0;
            this.r = 0; // Low 7 bits of R.
            this.r7 = 0; // Bit 7 of R.
            this.iff1 = 0;
            this.iff2 = 0;
            this.im = 0;
            this.halted = 0;
        }
        get a() {
            return hi(this.af);
        }
        set a(value) {
            this.af = word(value, this.f);
        }
        get f() {
            return lo(this.af);
        }
        set f(value) {
            this.af = word(this.a, value);
        }
        get b() {
            return hi(this.bc);
        }
        set b(value) {
            this.bc = word(value, this.c);
        }
        get c() {
            return lo(this.bc);
        }
        set c(value) {
            this.bc = word(this.b, value);
        }
        get d() {
            return hi(this.de);
        }
        set d(value) {
            this.de = word(value, this.e);
        }
        get e() {
            return lo(this.de);
        }
        set e(value) {
            this.de = word(this.d, value);
        }
        get h() {
            return hi(this.hl);
        }
        set h(value) {
            this.hl = word(value, this.l);
        }
        get l() {
            return lo(this.hl);
        }
        set l(value) {
            this.hl = word(this.h, value);
        }
        get ixh() {
            return hi(this.ix);
        }
        set ixh(value) {
            this.ix = word(value, this.ixl);
        }
        get ixl() {
            return lo(this.ix);
        }
        set ixl(value) {
            this.ix = word(this.ixh, value);
        }
        get iyh() {
            return hi(this.iy);
        }
        set iyh(value) {
            this.iy = word(value, this.iyl);
        }
        get iyl() {
            return lo(this.iy);
        }
        set iyl(value) {
            this.iy = word(this.iyh, value);
        }
        /**
         * Combine the two R parts together.
         */
        get rCombined() {
            return (this.r7 & 0x80) | (this.r & 0xF7);
        }
    }
    //# sourceMappingURL=RegisterSet.js.map

    /**
     * The flag bits in the F register.
     */
    var Flag;
    (function (Flag) {
        /**
         * Carry and borrow. Indicates that the addition or subtraction did not
         * fit in the register.
         */
        Flag[Flag["C"] = 1] = "C";
        /**
         * Set if the last operation was a subtraction.
         */
        Flag[Flag["N"] = 2] = "N";
        /**
         * Parity: Indicates that the result has an even number of bits set.
         */
        Flag[Flag["P"] = 4] = "P";
        /**
         * Overflow: Indicates that two's complement does not fit in register.
         */
        Flag[Flag["V"] = 4] = "V";
        /**
         * Undocumented bit, but internal state can leak into it.
         */
        Flag[Flag["X3"] = 8] = "X3";
        /**
         * Half carry: Carry from bit 3 to bit 4 during BCD operations.
         */
        Flag[Flag["H"] = 16] = "H";
        /**
         * Undocumented bit, but internal state can leak into it.
         */
        Flag[Flag["X5"] = 32] = "X5";
        /**
         * Set if value is zero.
         */
        Flag[Flag["Z"] = 64] = "Z";
        /**
         * Set of value is negative.
         */
        Flag[Flag["S"] = 128] = "S";
    })(Flag || (Flag = {}));
    //# sourceMappingURL=Flag.js.map

    // Do not modify. This file is generated by GenerateOpcodes.ts.
    // Tables for computing flags after an operation.
    const halfCarryAddTable = [0, Flag.H, Flag.H, Flag.H, 0, 0, 0, Flag.H];
    const halfCarrySubTable = [0, 0, Flag.H, 0, Flag.H, 0, Flag.H, Flag.H];
    const overflowAddTable = [0, 0, 0, Flag.V, Flag.V, 0, 0, 0];
    const overflowSubTable = [0, Flag.V, 0, 0, 0, 0, Flag.V, 0];
    /**
     * Fetch an instruction for decode.
     */
    function fetchInstruction(z80) {
        z80.incTStateCount(4);
        const inst = z80.readByteInternal(z80.regs.pc);
        z80.regs.pc = (z80.regs.pc + 1) & 0xFFFF;
        z80.regs.r = (z80.regs.r + 1) & 0xFF;
        return inst;
    }
    /**
     * Decode the "CB" prefix (bit instructions).
     */
    function decodeCB(z80) {
        const inst = fetchInstruction(z80);
        switch (inst) {
            // The content of this switch is auto-generated by GenerateOpcodes.ts.
            case 0x00: { // rlc b
                let value;
                value = z80.regs.b;
                const oldValue = value;
                value = ((value << 1) | (value >> 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.b = value;
                break;
            }
            case 0x01: { // rlc c
                let value;
                value = z80.regs.c;
                const oldValue = value;
                value = ((value << 1) | (value >> 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.c = value;
                break;
            }
            case 0x02: { // rlc d
                let value;
                value = z80.regs.d;
                const oldValue = value;
                value = ((value << 1) | (value >> 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.d = value;
                break;
            }
            case 0x03: { // rlc e
                let value;
                value = z80.regs.e;
                const oldValue = value;
                value = ((value << 1) | (value >> 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.e = value;
                break;
            }
            case 0x04: { // rlc h
                let value;
                value = z80.regs.h;
                const oldValue = value;
                value = ((value << 1) | (value >> 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.h = value;
                break;
            }
            case 0x05: { // rlc l
                let value;
                value = z80.regs.l;
                const oldValue = value;
                value = ((value << 1) | (value >> 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.l = value;
                break;
            }
            case 0x06: { // rlc (hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                const oldValue = value;
                value = ((value << 1) | (value >> 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x07: { // rlc a
                let value;
                value = z80.regs.a;
                const oldValue = value;
                value = ((value << 1) | (value >> 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.a = value;
                break;
            }
            case 0x08: { // rrc b
                let value;
                value = z80.regs.b;
                const oldValue = value;
                value = ((value >> 1) | (value << 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.b = value;
                break;
            }
            case 0x09: { // rrc c
                let value;
                value = z80.regs.c;
                const oldValue = value;
                value = ((value >> 1) | (value << 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.c = value;
                break;
            }
            case 0x0A: { // rrc d
                let value;
                value = z80.regs.d;
                const oldValue = value;
                value = ((value >> 1) | (value << 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.d = value;
                break;
            }
            case 0x0B: { // rrc e
                let value;
                value = z80.regs.e;
                const oldValue = value;
                value = ((value >> 1) | (value << 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.e = value;
                break;
            }
            case 0x0C: { // rrc h
                let value;
                value = z80.regs.h;
                const oldValue = value;
                value = ((value >> 1) | (value << 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.h = value;
                break;
            }
            case 0x0D: { // rrc l
                let value;
                value = z80.regs.l;
                const oldValue = value;
                value = ((value >> 1) | (value << 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.l = value;
                break;
            }
            case 0x0E: { // rrc (hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                const oldValue = value;
                value = ((value >> 1) | (value << 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x0F: { // rrc a
                let value;
                value = z80.regs.a;
                const oldValue = value;
                value = ((value >> 1) | (value << 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.a = value;
                break;
            }
            case 0x10: { // rl b
                let value;
                value = z80.regs.b;
                const oldValue = value;
                value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.b = value;
                break;
            }
            case 0x11: { // rl c
                let value;
                value = z80.regs.c;
                const oldValue = value;
                value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.c = value;
                break;
            }
            case 0x12: { // rl d
                let value;
                value = z80.regs.d;
                const oldValue = value;
                value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.d = value;
                break;
            }
            case 0x13: { // rl e
                let value;
                value = z80.regs.e;
                const oldValue = value;
                value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.e = value;
                break;
            }
            case 0x14: { // rl h
                let value;
                value = z80.regs.h;
                const oldValue = value;
                value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.h = value;
                break;
            }
            case 0x15: { // rl l
                let value;
                value = z80.regs.l;
                const oldValue = value;
                value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.l = value;
                break;
            }
            case 0x16: { // rl (hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                const oldValue = value;
                value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x17: { // rl a
                let value;
                value = z80.regs.a;
                const oldValue = value;
                value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.a = value;
                break;
            }
            case 0x18: { // rr b
                let value;
                value = z80.regs.b;
                const oldValue = value;
                value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.b = value;
                break;
            }
            case 0x19: { // rr c
                let value;
                value = z80.regs.c;
                const oldValue = value;
                value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.c = value;
                break;
            }
            case 0x1A: { // rr d
                let value;
                value = z80.regs.d;
                const oldValue = value;
                value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.d = value;
                break;
            }
            case 0x1B: { // rr e
                let value;
                value = z80.regs.e;
                const oldValue = value;
                value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.e = value;
                break;
            }
            case 0x1C: { // rr h
                let value;
                value = z80.regs.h;
                const oldValue = value;
                value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.h = value;
                break;
            }
            case 0x1D: { // rr l
                let value;
                value = z80.regs.l;
                const oldValue = value;
                value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.l = value;
                break;
            }
            case 0x1E: { // rr (hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                const oldValue = value;
                value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x1F: { // rr a
                let value;
                value = z80.regs.a;
                const oldValue = value;
                value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.a = value;
                break;
            }
            case 0x20: { // sla b
                let value;
                value = z80.regs.b;
                const oldValue = value;
                value = (value << 1) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.b = value;
                break;
            }
            case 0x21: { // sla c
                let value;
                value = z80.regs.c;
                const oldValue = value;
                value = (value << 1) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.c = value;
                break;
            }
            case 0x22: { // sla d
                let value;
                value = z80.regs.d;
                const oldValue = value;
                value = (value << 1) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.d = value;
                break;
            }
            case 0x23: { // sla e
                let value;
                value = z80.regs.e;
                const oldValue = value;
                value = (value << 1) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.e = value;
                break;
            }
            case 0x24: { // sla h
                let value;
                value = z80.regs.h;
                const oldValue = value;
                value = (value << 1) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.h = value;
                break;
            }
            case 0x25: { // sla l
                let value;
                value = z80.regs.l;
                const oldValue = value;
                value = (value << 1) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.l = value;
                break;
            }
            case 0x26: { // sla (hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                const oldValue = value;
                value = (value << 1) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x27: { // sla a
                let value;
                value = z80.regs.a;
                const oldValue = value;
                value = (value << 1) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.a = value;
                break;
            }
            case 0x28: { // sra b
                let value;
                value = z80.regs.b;
                const oldValue = value;
                value = (value & 0x80) | (value >> 1);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.b = value;
                break;
            }
            case 0x29: { // sra c
                let value;
                value = z80.regs.c;
                const oldValue = value;
                value = (value & 0x80) | (value >> 1);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.c = value;
                break;
            }
            case 0x2A: { // sra d
                let value;
                value = z80.regs.d;
                const oldValue = value;
                value = (value & 0x80) | (value >> 1);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.d = value;
                break;
            }
            case 0x2B: { // sra e
                let value;
                value = z80.regs.e;
                const oldValue = value;
                value = (value & 0x80) | (value >> 1);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.e = value;
                break;
            }
            case 0x2C: { // sra h
                let value;
                value = z80.regs.h;
                const oldValue = value;
                value = (value & 0x80) | (value >> 1);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.h = value;
                break;
            }
            case 0x2D: { // sra l
                let value;
                value = z80.regs.l;
                const oldValue = value;
                value = (value & 0x80) | (value >> 1);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.l = value;
                break;
            }
            case 0x2E: { // sra (hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                const oldValue = value;
                value = (value & 0x80) | (value >> 1);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x2F: { // sra a
                let value;
                value = z80.regs.a;
                const oldValue = value;
                value = (value & 0x80) | (value >> 1);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.a = value;
                break;
            }
            case 0x30: { // sll b
                let value;
                value = z80.regs.b;
                const oldValue = value;
                value = ((value << 1) | 0x01) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.b = value;
                break;
            }
            case 0x31: { // sll c
                let value;
                value = z80.regs.c;
                const oldValue = value;
                value = ((value << 1) | 0x01) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.c = value;
                break;
            }
            case 0x32: { // sll d
                let value;
                value = z80.regs.d;
                const oldValue = value;
                value = ((value << 1) | 0x01) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.d = value;
                break;
            }
            case 0x33: { // sll e
                let value;
                value = z80.regs.e;
                const oldValue = value;
                value = ((value << 1) | 0x01) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.e = value;
                break;
            }
            case 0x34: { // sll h
                let value;
                value = z80.regs.h;
                const oldValue = value;
                value = ((value << 1) | 0x01) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.h = value;
                break;
            }
            case 0x35: { // sll l
                let value;
                value = z80.regs.l;
                const oldValue = value;
                value = ((value << 1) | 0x01) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.l = value;
                break;
            }
            case 0x36: { // sll (hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                const oldValue = value;
                value = ((value << 1) | 0x01) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x37: { // sll a
                let value;
                value = z80.regs.a;
                const oldValue = value;
                value = ((value << 1) | 0x01) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.a = value;
                break;
            }
            case 0x38: { // srl b
                let value;
                value = z80.regs.b;
                const oldValue = value;
                value = value >> 1;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.b = value;
                break;
            }
            case 0x39: { // srl c
                let value;
                value = z80.regs.c;
                const oldValue = value;
                value = value >> 1;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.c = value;
                break;
            }
            case 0x3A: { // srl d
                let value;
                value = z80.regs.d;
                const oldValue = value;
                value = value >> 1;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.d = value;
                break;
            }
            case 0x3B: { // srl e
                let value;
                value = z80.regs.e;
                const oldValue = value;
                value = value >> 1;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.e = value;
                break;
            }
            case 0x3C: { // srl h
                let value;
                value = z80.regs.h;
                const oldValue = value;
                value = value >> 1;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.h = value;
                break;
            }
            case 0x3D: { // srl l
                let value;
                value = z80.regs.l;
                const oldValue = value;
                value = value >> 1;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.l = value;
                break;
            }
            case 0x3E: { // srl (hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                const oldValue = value;
                value = value >> 1;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x3F: { // srl a
                let value;
                value = z80.regs.a;
                const oldValue = value;
                value = value >> 1;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.regs.a = value;
                break;
            }
            case 0x40: { // bit 0,b
                const value = z80.regs.b;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x01) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x41: { // bit 0,c
                const value = z80.regs.c;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x01) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x42: { // bit 0,d
                const value = z80.regs.d;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x01) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x43: { // bit 0,e
                const value = z80.regs.e;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x01) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x44: { // bit 0,h
                const value = z80.regs.h;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x01) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x45: { // bit 0,l
                const value = z80.regs.l;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x01) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x46: { // bit 0,(hl)
                const value = z80.readByte(z80.regs.hl);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x01) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x47: { // bit 0,a
                const value = z80.regs.a;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x01) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x48: { // bit 1,b
                const value = z80.regs.b;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x02) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x49: { // bit 1,c
                const value = z80.regs.c;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x02) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x4A: { // bit 1,d
                const value = z80.regs.d;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x02) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x4B: { // bit 1,e
                const value = z80.regs.e;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x02) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x4C: { // bit 1,h
                const value = z80.regs.h;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x02) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x4D: { // bit 1,l
                const value = z80.regs.l;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x02) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x4E: { // bit 1,(hl)
                const value = z80.readByte(z80.regs.hl);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x02) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x4F: { // bit 1,a
                const value = z80.regs.a;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x02) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x50: { // bit 2,b
                const value = z80.regs.b;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x04) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x51: { // bit 2,c
                const value = z80.regs.c;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x04) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x52: { // bit 2,d
                const value = z80.regs.d;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x04) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x53: { // bit 2,e
                const value = z80.regs.e;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x04) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x54: { // bit 2,h
                const value = z80.regs.h;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x04) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x55: { // bit 2,l
                const value = z80.regs.l;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x04) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x56: { // bit 2,(hl)
                const value = z80.readByte(z80.regs.hl);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x04) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x57: { // bit 2,a
                const value = z80.regs.a;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x04) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x58: { // bit 3,b
                const value = z80.regs.b;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x08) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x59: { // bit 3,c
                const value = z80.regs.c;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x08) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x5A: { // bit 3,d
                const value = z80.regs.d;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x08) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x5B: { // bit 3,e
                const value = z80.regs.e;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x08) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x5C: { // bit 3,h
                const value = z80.regs.h;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x08) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x5D: { // bit 3,l
                const value = z80.regs.l;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x08) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x5E: { // bit 3,(hl)
                const value = z80.readByte(z80.regs.hl);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x08) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x5F: { // bit 3,a
                const value = z80.regs.a;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x08) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x60: { // bit 4,b
                const value = z80.regs.b;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x10) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x61: { // bit 4,c
                const value = z80.regs.c;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x10) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x62: { // bit 4,d
                const value = z80.regs.d;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x10) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x63: { // bit 4,e
                const value = z80.regs.e;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x10) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x64: { // bit 4,h
                const value = z80.regs.h;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x10) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x65: { // bit 4,l
                const value = z80.regs.l;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x10) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x66: { // bit 4,(hl)
                const value = z80.readByte(z80.regs.hl);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x10) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x67: { // bit 4,a
                const value = z80.regs.a;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x10) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x68: { // bit 5,b
                const value = z80.regs.b;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x20) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x69: { // bit 5,c
                const value = z80.regs.c;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x20) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x6A: { // bit 5,d
                const value = z80.regs.d;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x20) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x6B: { // bit 5,e
                const value = z80.regs.e;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x20) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x6C: { // bit 5,h
                const value = z80.regs.h;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x20) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x6D: { // bit 5,l
                const value = z80.regs.l;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x20) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x6E: { // bit 5,(hl)
                const value = z80.readByte(z80.regs.hl);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x20) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x6F: { // bit 5,a
                const value = z80.regs.a;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x20) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x70: { // bit 6,b
                const value = z80.regs.b;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x40) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x71: { // bit 6,c
                const value = z80.regs.c;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x40) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x72: { // bit 6,d
                const value = z80.regs.d;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x40) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x73: { // bit 6,e
                const value = z80.regs.e;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x40) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x74: { // bit 6,h
                const value = z80.regs.h;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x40) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x75: { // bit 6,l
                const value = z80.regs.l;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x40) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x76: { // bit 6,(hl)
                const value = z80.readByte(z80.regs.hl);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x40) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x77: { // bit 6,a
                const value = z80.regs.a;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x40) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x78: { // bit 7,b
                const value = z80.regs.b;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x80) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                if ((value & 0x80) !== 0) {
                    f |= Flag.S;
                }
                z80.regs.f = f;
                break;
            }
            case 0x79: { // bit 7,c
                const value = z80.regs.c;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x80) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                if ((value & 0x80) !== 0) {
                    f |= Flag.S;
                }
                z80.regs.f = f;
                break;
            }
            case 0x7A: { // bit 7,d
                const value = z80.regs.d;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x80) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                if ((value & 0x80) !== 0) {
                    f |= Flag.S;
                }
                z80.regs.f = f;
                break;
            }
            case 0x7B: { // bit 7,e
                const value = z80.regs.e;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x80) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                if ((value & 0x80) !== 0) {
                    f |= Flag.S;
                }
                z80.regs.f = f;
                break;
            }
            case 0x7C: { // bit 7,h
                const value = z80.regs.h;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x80) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                if ((value & 0x80) !== 0) {
                    f |= Flag.S;
                }
                z80.regs.f = f;
                break;
            }
            case 0x7D: { // bit 7,l
                const value = z80.regs.l;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x80) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                if ((value & 0x80) !== 0) {
                    f |= Flag.S;
                }
                z80.regs.f = f;
                break;
            }
            case 0x7E: { // bit 7,(hl)
                const value = z80.readByte(z80.regs.hl);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x80) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                if ((value & 0x80) !== 0) {
                    f |= Flag.S;
                }
                z80.regs.f = f;
                break;
            }
            case 0x7F: { // bit 7,a
                const value = z80.regs.a;
                const hiddenValue = value;
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x80) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                if ((value & 0x80) !== 0) {
                    f |= Flag.S;
                }
                z80.regs.f = f;
                break;
            }
            case 0x80: { // res 0,b
                z80.regs.b &= 0xFE;
                break;
            }
            case 0x81: { // res 0,c
                z80.regs.c &= 0xFE;
                break;
            }
            case 0x82: { // res 0,d
                z80.regs.d &= 0xFE;
                break;
            }
            case 0x83: { // res 0,e
                z80.regs.e &= 0xFE;
                break;
            }
            case 0x84: { // res 0,h
                z80.regs.h &= 0xFE;
                break;
            }
            case 0x85: { // res 0,l
                z80.regs.l &= 0xFE;
                break;
            }
            case 0x86: { // res 0,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value & 0xFE);
                break;
            }
            case 0x87: { // res 0,a
                z80.regs.a &= 0xFE;
                break;
            }
            case 0x88: { // res 1,b
                z80.regs.b &= 0xFD;
                break;
            }
            case 0x89: { // res 1,c
                z80.regs.c &= 0xFD;
                break;
            }
            case 0x8A: { // res 1,d
                z80.regs.d &= 0xFD;
                break;
            }
            case 0x8B: { // res 1,e
                z80.regs.e &= 0xFD;
                break;
            }
            case 0x8C: { // res 1,h
                z80.regs.h &= 0xFD;
                break;
            }
            case 0x8D: { // res 1,l
                z80.regs.l &= 0xFD;
                break;
            }
            case 0x8E: { // res 1,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value & 0xFD);
                break;
            }
            case 0x8F: { // res 1,a
                z80.regs.a &= 0xFD;
                break;
            }
            case 0x90: { // res 2,b
                z80.regs.b &= 0xFB;
                break;
            }
            case 0x91: { // res 2,c
                z80.regs.c &= 0xFB;
                break;
            }
            case 0x92: { // res 2,d
                z80.regs.d &= 0xFB;
                break;
            }
            case 0x93: { // res 2,e
                z80.regs.e &= 0xFB;
                break;
            }
            case 0x94: { // res 2,h
                z80.regs.h &= 0xFB;
                break;
            }
            case 0x95: { // res 2,l
                z80.regs.l &= 0xFB;
                break;
            }
            case 0x96: { // res 2,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value & 0xFB);
                break;
            }
            case 0x97: { // res 2,a
                z80.regs.a &= 0xFB;
                break;
            }
            case 0x98: { // res 3,b
                z80.regs.b &= 0xF7;
                break;
            }
            case 0x99: { // res 3,c
                z80.regs.c &= 0xF7;
                break;
            }
            case 0x9A: { // res 3,d
                z80.regs.d &= 0xF7;
                break;
            }
            case 0x9B: { // res 3,e
                z80.regs.e &= 0xF7;
                break;
            }
            case 0x9C: { // res 3,h
                z80.regs.h &= 0xF7;
                break;
            }
            case 0x9D: { // res 3,l
                z80.regs.l &= 0xF7;
                break;
            }
            case 0x9E: { // res 3,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value & 0xF7);
                break;
            }
            case 0x9F: { // res 3,a
                z80.regs.a &= 0xF7;
                break;
            }
            case 0xA0: { // res 4,b
                z80.regs.b &= 0xEF;
                break;
            }
            case 0xA1: { // res 4,c
                z80.regs.c &= 0xEF;
                break;
            }
            case 0xA2: { // res 4,d
                z80.regs.d &= 0xEF;
                break;
            }
            case 0xA3: { // res 4,e
                z80.regs.e &= 0xEF;
                break;
            }
            case 0xA4: { // res 4,h
                z80.regs.h &= 0xEF;
                break;
            }
            case 0xA5: { // res 4,l
                z80.regs.l &= 0xEF;
                break;
            }
            case 0xA6: { // res 4,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value & 0xEF);
                break;
            }
            case 0xA7: { // res 4,a
                z80.regs.a &= 0xEF;
                break;
            }
            case 0xA8: { // res 5,b
                z80.regs.b &= 0xDF;
                break;
            }
            case 0xA9: { // res 5,c
                z80.regs.c &= 0xDF;
                break;
            }
            case 0xAA: { // res 5,d
                z80.regs.d &= 0xDF;
                break;
            }
            case 0xAB: { // res 5,e
                z80.regs.e &= 0xDF;
                break;
            }
            case 0xAC: { // res 5,h
                z80.regs.h &= 0xDF;
                break;
            }
            case 0xAD: { // res 5,l
                z80.regs.l &= 0xDF;
                break;
            }
            case 0xAE: { // res 5,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value & 0xDF);
                break;
            }
            case 0xAF: { // res 5,a
                z80.regs.a &= 0xDF;
                break;
            }
            case 0xB0: { // res 6,b
                z80.regs.b &= 0xBF;
                break;
            }
            case 0xB1: { // res 6,c
                z80.regs.c &= 0xBF;
                break;
            }
            case 0xB2: { // res 6,d
                z80.regs.d &= 0xBF;
                break;
            }
            case 0xB3: { // res 6,e
                z80.regs.e &= 0xBF;
                break;
            }
            case 0xB4: { // res 6,h
                z80.regs.h &= 0xBF;
                break;
            }
            case 0xB5: { // res 6,l
                z80.regs.l &= 0xBF;
                break;
            }
            case 0xB6: { // res 6,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value & 0xBF);
                break;
            }
            case 0xB7: { // res 6,a
                z80.regs.a &= 0xBF;
                break;
            }
            case 0xB8: { // res 7,b
                z80.regs.b &= 0x7F;
                break;
            }
            case 0xB9: { // res 7,c
                z80.regs.c &= 0x7F;
                break;
            }
            case 0xBA: { // res 7,d
                z80.regs.d &= 0x7F;
                break;
            }
            case 0xBB: { // res 7,e
                z80.regs.e &= 0x7F;
                break;
            }
            case 0xBC: { // res 7,h
                z80.regs.h &= 0x7F;
                break;
            }
            case 0xBD: { // res 7,l
                z80.regs.l &= 0x7F;
                break;
            }
            case 0xBE: { // res 7,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value & 0x7F);
                break;
            }
            case 0xBF: { // res 7,a
                z80.regs.a &= 0x7F;
                break;
            }
            case 0xC0: { // set 0,b
                z80.regs.b |= 0x01;
                break;
            }
            case 0xC1: { // set 0,c
                z80.regs.c |= 0x01;
                break;
            }
            case 0xC2: { // set 0,d
                z80.regs.d |= 0x01;
                break;
            }
            case 0xC3: { // set 0,e
                z80.regs.e |= 0x01;
                break;
            }
            case 0xC4: { // set 0,h
                z80.regs.h |= 0x01;
                break;
            }
            case 0xC5: { // set 0,l
                z80.regs.l |= 0x01;
                break;
            }
            case 0xC6: { // set 0,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value | 0x01);
                break;
            }
            case 0xC7: { // set 0,a
                z80.regs.a |= 0x01;
                break;
            }
            case 0xC8: { // set 1,b
                z80.regs.b |= 0x02;
                break;
            }
            case 0xC9: { // set 1,c
                z80.regs.c |= 0x02;
                break;
            }
            case 0xCA: { // set 1,d
                z80.regs.d |= 0x02;
                break;
            }
            case 0xCB: { // set 1,e
                z80.regs.e |= 0x02;
                break;
            }
            case 0xCC: { // set 1,h
                z80.regs.h |= 0x02;
                break;
            }
            case 0xCD: { // set 1,l
                z80.regs.l |= 0x02;
                break;
            }
            case 0xCE: { // set 1,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value | 0x02);
                break;
            }
            case 0xCF: { // set 1,a
                z80.regs.a |= 0x02;
                break;
            }
            case 0xD0: { // set 2,b
                z80.regs.b |= 0x04;
                break;
            }
            case 0xD1: { // set 2,c
                z80.regs.c |= 0x04;
                break;
            }
            case 0xD2: { // set 2,d
                z80.regs.d |= 0x04;
                break;
            }
            case 0xD3: { // set 2,e
                z80.regs.e |= 0x04;
                break;
            }
            case 0xD4: { // set 2,h
                z80.regs.h |= 0x04;
                break;
            }
            case 0xD5: { // set 2,l
                z80.regs.l |= 0x04;
                break;
            }
            case 0xD6: { // set 2,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value | 0x04);
                break;
            }
            case 0xD7: { // set 2,a
                z80.regs.a |= 0x04;
                break;
            }
            case 0xD8: { // set 3,b
                z80.regs.b |= 0x08;
                break;
            }
            case 0xD9: { // set 3,c
                z80.regs.c |= 0x08;
                break;
            }
            case 0xDA: { // set 3,d
                z80.regs.d |= 0x08;
                break;
            }
            case 0xDB: { // set 3,e
                z80.regs.e |= 0x08;
                break;
            }
            case 0xDC: { // set 3,h
                z80.regs.h |= 0x08;
                break;
            }
            case 0xDD: { // set 3,l
                z80.regs.l |= 0x08;
                break;
            }
            case 0xDE: { // set 3,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value | 0x08);
                break;
            }
            case 0xDF: { // set 3,a
                z80.regs.a |= 0x08;
                break;
            }
            case 0xE0: { // set 4,b
                z80.regs.b |= 0x10;
                break;
            }
            case 0xE1: { // set 4,c
                z80.regs.c |= 0x10;
                break;
            }
            case 0xE2: { // set 4,d
                z80.regs.d |= 0x10;
                break;
            }
            case 0xE3: { // set 4,e
                z80.regs.e |= 0x10;
                break;
            }
            case 0xE4: { // set 4,h
                z80.regs.h |= 0x10;
                break;
            }
            case 0xE5: { // set 4,l
                z80.regs.l |= 0x10;
                break;
            }
            case 0xE6: { // set 4,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value | 0x10);
                break;
            }
            case 0xE7: { // set 4,a
                z80.regs.a |= 0x10;
                break;
            }
            case 0xE8: { // set 5,b
                z80.regs.b |= 0x20;
                break;
            }
            case 0xE9: { // set 5,c
                z80.regs.c |= 0x20;
                break;
            }
            case 0xEA: { // set 5,d
                z80.regs.d |= 0x20;
                break;
            }
            case 0xEB: { // set 5,e
                z80.regs.e |= 0x20;
                break;
            }
            case 0xEC: { // set 5,h
                z80.regs.h |= 0x20;
                break;
            }
            case 0xED: { // set 5,l
                z80.regs.l |= 0x20;
                break;
            }
            case 0xEE: { // set 5,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value | 0x20);
                break;
            }
            case 0xEF: { // set 5,a
                z80.regs.a |= 0x20;
                break;
            }
            case 0xF0: { // set 6,b
                z80.regs.b |= 0x40;
                break;
            }
            case 0xF1: { // set 6,c
                z80.regs.c |= 0x40;
                break;
            }
            case 0xF2: { // set 6,d
                z80.regs.d |= 0x40;
                break;
            }
            case 0xF3: { // set 6,e
                z80.regs.e |= 0x40;
                break;
            }
            case 0xF4: { // set 6,h
                z80.regs.h |= 0x40;
                break;
            }
            case 0xF5: { // set 6,l
                z80.regs.l |= 0x40;
                break;
            }
            case 0xF6: { // set 6,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value | 0x40);
                break;
            }
            case 0xF7: { // set 6,a
                z80.regs.a |= 0x40;
                break;
            }
            case 0xF8: { // set 7,b
                z80.regs.b |= 0x80;
                break;
            }
            case 0xF9: { // set 7,c
                z80.regs.c |= 0x80;
                break;
            }
            case 0xFA: { // set 7,d
                z80.regs.d |= 0x80;
                break;
            }
            case 0xFB: { // set 7,e
                z80.regs.e |= 0x80;
                break;
            }
            case 0xFC: { // set 7,h
                z80.regs.h |= 0x80;
                break;
            }
            case 0xFD: { // set 7,l
                z80.regs.l |= 0x80;
                break;
            }
            case 0xFE: { // set 7,(hl)
                const value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.hl, value | 0x80);
                break;
            }
            case 0xFF: { // set 7,a
                z80.regs.a |= 0x80;
                break;
            }
            default:
                console.log("Unhandled opcode in CB: " + toHex(inst, 2));
                break;
        }
    }
    /**
     * Decode the "DD" prefix (IX instructions).
     */
    function decodeDD(z80) {
        const inst = fetchInstruction(z80);
        switch (inst) {
            // The content of this switch is auto-generated by GenerateOpcodes.ts.
            case 0x09: { // add ix,bc
                let value;
                z80.incTStateCount(7);
                value = z80.regs.bc;
                let result = z80.regs.ix + value;
                const lookup = (((z80.regs.ix & 0x0800) >> 11) |
                    ((value & 0x0800) >> 10) |
                    ((result & 0x0800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.ix);
                z80.regs.ix = result & 0xFFFF;
                z80.regs.f = (z80.regs.f & (Flag.V | Flag.Z | Flag.S)) | ((result & 0x10000) !== 0 ? Flag.C : 0) | ((result >> 8) & (Flag.X3 | Flag.X5)) | halfCarryAddTable[lookup];
                break;
            }
            case 0x19: { // add ix,de
                let value;
                z80.incTStateCount(7);
                value = z80.regs.de;
                let result = z80.regs.ix + value;
                const lookup = (((z80.regs.ix & 0x0800) >> 11) |
                    ((value & 0x0800) >> 10) |
                    ((result & 0x0800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.ix);
                z80.regs.ix = result & 0xFFFF;
                z80.regs.f = (z80.regs.f & (Flag.V | Flag.Z | Flag.S)) | ((result & 0x10000) !== 0 ? Flag.C : 0) | ((result >> 8) & (Flag.X3 | Flag.X5)) | halfCarryAddTable[lookup];
                break;
            }
            case 0x21: { // ld ix,nnnn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                value = word(z80.readByte(z80.regs.pc), value);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.ix = value;
                break;
            }
            case 0x22: { // ld (nnnn),ix
                let value;
                value = z80.regs.ix;
                let addr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                addr = word(z80.readByte(z80.regs.pc), addr);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.writeByte(addr, lo(value));
                addr = inc16(addr);
                z80.regs.memptr = addr;
                z80.writeByte(addr, hi(value));
                break;
            }
            case 0x23: { // inc ix
                let value;
                value = z80.regs.ix;
                value = inc16(value);
                z80.regs.ix = value;
                break;
            }
            case 0x24: { // inc ixh
                let value;
                value = z80.regs.ixh;
                value = inc8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x80 ? Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : Flag.H) | z80.sz53Table[value];
                z80.regs.ixh = value;
                break;
            }
            case 0x25: { // dec ixh
                let value;
                value = z80.regs.ixh;
                const oldValue = value;
                value = dec8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x7F ? Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : Flag.H) | Flag.N | z80.sz53Table[value];
                z80.regs.ixh = value;
                break;
            }
            case 0x26: { // ld ixh,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.ixh = value;
                break;
            }
            case 0x29: { // add ix,ix
                let value;
                z80.incTStateCount(7);
                value = z80.regs.ix;
                let result = z80.regs.ix + value;
                const lookup = (((z80.regs.ix & 0x0800) >> 11) |
                    ((value & 0x0800) >> 10) |
                    ((result & 0x0800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.ix);
                z80.regs.ix = result & 0xFFFF;
                z80.regs.f = (z80.regs.f & (Flag.V | Flag.Z | Flag.S)) | ((result & 0x10000) !== 0 ? Flag.C : 0) | ((result >> 8) & (Flag.X3 | Flag.X5)) | halfCarryAddTable[lookup];
                break;
            }
            case 0x2A: { // ld ix,(nnnn)
                let value;
                let addr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                addr = word(z80.readByte(z80.regs.pc), addr);
                z80.regs.pc = inc16(z80.regs.pc);
                value = z80.readByte(addr);
                z80.regs.memptr = inc16(addr);
                value = word(z80.readByte(z80.regs.memptr), value);
                z80.regs.ix = value;
                break;
            }
            case 0x2B: { // dec ix
                let value;
                value = z80.regs.ix;
                value = dec16(value);
                z80.regs.ix = value;
                break;
            }
            case 0x2C: { // inc ixl
                let value;
                value = z80.regs.ixl;
                value = inc8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x80 ? Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : Flag.H) | z80.sz53Table[value];
                z80.regs.ixl = value;
                break;
            }
            case 0x2D: { // dec ixl
                let value;
                value = z80.regs.ixl;
                const oldValue = value;
                value = dec8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x7F ? Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : Flag.H) | Flag.N | z80.sz53Table[value];
                z80.regs.ixl = value;
                break;
            }
            case 0x2E: { // ld ixl,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.ixl = value;
                break;
            }
            case 0x34: { // inc (ix+dd)
                let value;
                const offset = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = add16(z80.regs.ix, signedByte(offset));
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                value = inc8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x80 ? Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : Flag.H) | z80.sz53Table[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x35: { // dec (ix+dd)
                let value;
                const offset = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = add16(z80.regs.ix, signedByte(offset));
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = dec8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x7F ? Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : Flag.H) | Flag.N | z80.sz53Table[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x36: { // ld (ix+dd),nn
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x39: { // add ix,sp
                let value;
                z80.incTStateCount(7);
                value = z80.regs.sp;
                let result = z80.regs.ix + value;
                const lookup = (((z80.regs.ix & 0x0800) >> 11) |
                    ((value & 0x0800) >> 10) |
                    ((result & 0x0800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.ix);
                z80.regs.ix = result & 0xFFFF;
                z80.regs.f = (z80.regs.f & (Flag.V | Flag.Z | Flag.S)) | ((result & 0x10000) !== 0 ? Flag.C : 0) | ((result >> 8) & (Flag.X3 | Flag.X5)) | halfCarryAddTable[lookup];
                break;
            }
            case 0x44: { // ld b,ixh
                let value;
                value = z80.regs.ixh;
                z80.regs.b = value;
                break;
            }
            case 0x45: { // ld b,ixl
                let value;
                value = z80.regs.ixl;
                z80.regs.b = value;
                break;
            }
            case 0x46: { // ld b,(ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.b = value;
                break;
            }
            case 0x4C: { // ld c,ixh
                let value;
                value = z80.regs.ixh;
                z80.regs.c = value;
                break;
            }
            case 0x4D: { // ld c,ixl
                let value;
                value = z80.regs.ixl;
                z80.regs.c = value;
                break;
            }
            case 0x4E: { // ld c,(ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.c = value;
                break;
            }
            case 0x54: { // ld d,ixh
                let value;
                value = z80.regs.ixh;
                z80.regs.d = value;
                break;
            }
            case 0x55: { // ld d,ixl
                let value;
                value = z80.regs.ixl;
                z80.regs.d = value;
                break;
            }
            case 0x56: { // ld d,(ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.d = value;
                break;
            }
            case 0x5C: { // ld e,ixh
                let value;
                value = z80.regs.ixh;
                z80.regs.e = value;
                break;
            }
            case 0x5D: { // ld e,ixl
                let value;
                value = z80.regs.ixl;
                z80.regs.e = value;
                break;
            }
            case 0x5E: { // ld e,(ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.e = value;
                break;
            }
            case 0x60: { // ld ixh,b
                let value;
                value = z80.regs.b;
                z80.regs.ixh = value;
                break;
            }
            case 0x61: { // ld ixh,c
                let value;
                value = z80.regs.c;
                z80.regs.ixh = value;
                break;
            }
            case 0x62: { // ld ixh,d
                let value;
                value = z80.regs.d;
                z80.regs.ixh = value;
                break;
            }
            case 0x63: { // ld ixh,e
                let value;
                value = z80.regs.e;
                z80.regs.ixh = value;
                break;
            }
            case 0x64: { // ld ixh,ixh
                let value;
                value = z80.regs.ixh;
                z80.regs.ixh = value;
                break;
            }
            case 0x65: { // ld ixh,ixl
                let value;
                value = z80.regs.ixl;
                z80.regs.ixh = value;
                break;
            }
            case 0x66: { // ld h,(ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.h = value;
                break;
            }
            case 0x67: { // ld ixh,a
                let value;
                value = z80.regs.a;
                z80.regs.ixh = value;
                break;
            }
            case 0x68: { // ld ixl,b
                let value;
                value = z80.regs.b;
                z80.regs.ixl = value;
                break;
            }
            case 0x69: { // ld ixl,c
                let value;
                value = z80.regs.c;
                z80.regs.ixl = value;
                break;
            }
            case 0x6A: { // ld ixl,d
                let value;
                value = z80.regs.d;
                z80.regs.ixl = value;
                break;
            }
            case 0x6B: { // ld ixl,e
                let value;
                value = z80.regs.e;
                z80.regs.ixl = value;
                break;
            }
            case 0x6C: { // ld ixl,ixh
                let value;
                value = z80.regs.ixh;
                z80.regs.ixl = value;
                break;
            }
            case 0x6D: { // ld ixl,ixl
                let value;
                value = z80.regs.ixl;
                z80.regs.ixl = value;
                break;
            }
            case 0x6E: { // ld l,(ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.l = value;
                break;
            }
            case 0x6F: { // ld ixl,a
                let value;
                value = z80.regs.a;
                z80.regs.ixl = value;
                break;
            }
            case 0x70: { // ld (ix+dd),b
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.regs.b;
                z80.regs.memptr = (z80.regs.ix + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x71: { // ld (ix+dd),c
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.regs.c;
                z80.regs.memptr = (z80.regs.ix + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x72: { // ld (ix+dd),d
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.regs.d;
                z80.regs.memptr = (z80.regs.ix + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x73: { // ld (ix+dd),e
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.regs.e;
                z80.regs.memptr = (z80.regs.ix + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x74: { // ld (ix+dd),h
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.regs.h;
                z80.regs.memptr = (z80.regs.ix + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x75: { // ld (ix+dd),l
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.regs.l;
                z80.regs.memptr = (z80.regs.ix + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x77: { // ld (ix+dd),a
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.regs.a;
                z80.regs.memptr = (z80.regs.ix + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x7C: { // ld a,ixh
                let value;
                value = z80.regs.ixh;
                z80.regs.a = value;
                break;
            }
            case 0x7D: { // ld a,ixl
                let value;
                value = z80.regs.ixl;
                z80.regs.a = value;
                break;
            }
            case 0x7E: { // ld a,(ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.a = value;
                break;
            }
            case 0x84: { // add a,ixh
                let value;
                value = z80.regs.ixh;
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x85: { // add a,ixl
                let value;
                value = z80.regs.ixl;
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x86: { // add a,(ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x8C: { // adc a,ixh
                let value;
                value = z80.regs.ixh;
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x8D: { // adc a,ixl
                let value;
                value = z80.regs.ixl;
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x8E: { // adc a,(ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x94: { // sub a,ixh
                let value;
                value = z80.regs.ixh;
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x95: { // sub a,ixl
                let value;
                value = z80.regs.ixl;
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x96: { // sub a,(ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x9C: { // sbc a,ixh
                let value;
                value = z80.regs.ixh;
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x9D: { // sbc a,ixl
                let value;
                value = z80.regs.ixl;
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x9E: { // sbc a,(ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0xA4: { // and a,ixh
                let value;
                value = z80.regs.ixh;
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xA5: { // and a,ixl
                let value;
                value = z80.regs.ixl;
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xA6: { // and a,(ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xAC: { // xor a,ixh
                let value;
                value = z80.regs.ixh;
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xAD: { // xor a,ixl
                let value;
                value = z80.regs.ixl;
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xAE: { // xor a,(ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB4: { // or a,ixh
                let value;
                value = z80.regs.ixh;
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB5: { // or a,ixl
                let value;
                value = z80.regs.ixl;
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB6: { // or a,(ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xBC: { // cp ixh
                let value;
                value = z80.regs.ixh;
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xBD: { // cp ixl
                let value;
                value = z80.regs.ixl;
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xBE: { // cp (ix+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.ix + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xCB: { // shift ddcb
                decodeDDCB(z80);
                break;
            }
            case 0xE1: { // pop ix
                z80.regs.ix = z80.popWord();
                break;
            }
            case 0xE3: { // ex (sp),ix
                const rightValue = z80.regs.ix;
                const leftValueL = z80.readByte(z80.regs.sp);
                const leftValueH = z80.readByte(inc16(z80.regs.sp));
                z80.incTStateCount(1);
                z80.writeByte(inc16(z80.regs.sp), hi(rightValue));
                z80.writeByte(z80.regs.sp, lo(rightValue));
                z80.incTStateCount(2);
                z80.regs.memptr = word(leftValueH, leftValueL);
                z80.regs.ix = word(leftValueH, leftValueL);
                break;
            }
            case 0xE5: { // push ix
                z80.pushWord(z80.regs.ix);
                break;
            }
            case 0xE9: { // jp ix
                z80.regs.pc = z80.regs.ix;
                break;
            }
            case 0xF9: { // ld sp,ix
                let value;
                value = z80.regs.ix;
                z80.regs.sp = value;
                break;
            }
            default:
                console.log("Unhandled opcode in DD: " + toHex(inst, 2));
                break;
        }
    }
    /**
     * Decode the "DDCB" prefix (IX bit instructions).
     */
    function decodeDDCB(z80) {
        z80.incTStateCount(3);
        const offset = z80.readByteInternal(z80.regs.pc);
        z80.regs.memptr = add16(z80.regs.ix, signedByte(offset));
        z80.regs.pc = inc16(z80.regs.pc);
        z80.incTStateCount(3);
        const inst = z80.readByteInternal(z80.regs.pc);
        z80.incTStateCount(2);
        z80.regs.pc = inc16(z80.regs.pc);
        switch (inst) {
            // The content of this switch is auto-generated by GenerateOpcodes.ts.
            case 0x00: { // ld b,rlc
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = ((value << 1) | (value >> 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x01: { // ld c,rlc
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = ((value << 1) | (value >> 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x02: { // ld d,rlc
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = ((value << 1) | (value >> 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x03: { // ld e,rlc
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = ((value << 1) | (value >> 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x04: { // ld h,rlc
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = ((value << 1) | (value >> 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x05: { // ld l,rlc
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = ((value << 1) | (value >> 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x06: { // rlc (ix+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = ((value << 1) | (value >> 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x07: { // ld a,rlc
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = ((value << 1) | (value >> 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x08: { // ld b,rrc
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = ((value >> 1) | (value << 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x09: { // ld c,rrc
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = ((value >> 1) | (value << 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x0A: { // ld d,rrc
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = ((value >> 1) | (value << 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x0B: { // ld e,rrc
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = ((value >> 1) | (value << 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x0C: { // ld h,rrc
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = ((value >> 1) | (value << 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x0D: { // ld l,rrc
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = ((value >> 1) | (value << 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x0E: { // rrc (ix+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = ((value >> 1) | (value << 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x0F: { // ld a,rrc
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = ((value >> 1) | (value << 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x10: { // ld b,rl
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x11: { // ld c,rl
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x12: { // ld d,rl
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x13: { // ld e,rl
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x14: { // ld h,rl
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x15: { // ld l,rl
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x16: { // rl (ix+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x17: { // ld a,rl
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x18: { // ld b,rr
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x19: { // ld c,rr
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x1A: { // ld d,rr
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x1B: { // ld e,rr
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x1C: { // ld h,rr
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x1D: { // ld l,rr
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x1E: { // rr (ix+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x1F: { // ld a,rr
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x20: { // ld b,sla
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = (value << 1) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x21: { // ld c,sla
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = (value << 1) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x22: { // ld d,sla
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = (value << 1) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x23: { // ld e,sla
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = (value << 1) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x24: { // ld h,sla
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = (value << 1) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x25: { // ld l,sla
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = (value << 1) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x26: { // sla (ix+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = (value << 1) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x27: { // ld a,sla
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = (value << 1) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x28: { // ld b,sra
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = (value & 0x80) | (value >> 1);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x29: { // ld c,sra
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = (value & 0x80) | (value >> 1);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x2A: { // ld d,sra
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = (value & 0x80) | (value >> 1);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x2B: { // ld e,sra
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = (value & 0x80) | (value >> 1);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x2C: { // ld h,sra
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = (value & 0x80) | (value >> 1);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x2D: { // ld l,sra
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = (value & 0x80) | (value >> 1);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x2E: { // sra (ix+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = (value & 0x80) | (value >> 1);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x2F: { // ld a,sra
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = (value & 0x80) | (value >> 1);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x30: { // ld b,sll
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = ((value << 1) | 0x01) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x31: { // ld c,sll
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = ((value << 1) | 0x01) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x32: { // ld d,sll
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = ((value << 1) | 0x01) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x33: { // ld e,sll
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = ((value << 1) | 0x01) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x34: { // ld h,sll
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = ((value << 1) | 0x01) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x35: { // ld l,sll
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = ((value << 1) | 0x01) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x36: { // sll (ix+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = ((value << 1) | 0x01) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x37: { // ld a,sll
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = ((value << 1) | 0x01) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x38: { // ld b,srl
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = value >> 1;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x39: { // ld c,srl
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = value >> 1;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x3A: { // ld d,srl
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = value >> 1;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x3B: { // ld e,srl
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = value >> 1;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x3C: { // ld h,srl
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = value >> 1;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x3D: { // ld l,srl
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = value >> 1;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x3E: { // srl (ix+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = value >> 1;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x3F: { // ld a,srl
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = value >> 1;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x40:
            case 0x41:
            case 0x42:
            case 0x43:
            case 0x44:
            case 0x45:
            case 0x46:
            case 0x47: { // bit 0,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x01) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x48:
            case 0x49:
            case 0x4A:
            case 0x4B:
            case 0x4C:
            case 0x4D:
            case 0x4E:
            case 0x4F: { // bit 1,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x02) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x50:
            case 0x51:
            case 0x52:
            case 0x53:
            case 0x54:
            case 0x55:
            case 0x56:
            case 0x57: { // bit 2,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x04) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x58:
            case 0x59:
            case 0x5A:
            case 0x5B:
            case 0x5C:
            case 0x5D:
            case 0x5E:
            case 0x5F: { // bit 3,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x08) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x60:
            case 0x61:
            case 0x62:
            case 0x63:
            case 0x64:
            case 0x65:
            case 0x66:
            case 0x67: { // bit 4,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x10) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x68:
            case 0x69:
            case 0x6A:
            case 0x6B:
            case 0x6C:
            case 0x6D:
            case 0x6E:
            case 0x6F: { // bit 5,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x20) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x70:
            case 0x71:
            case 0x72:
            case 0x73:
            case 0x74:
            case 0x75:
            case 0x76:
            case 0x77: { // bit 6,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x40) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x78:
            case 0x79:
            case 0x7A:
            case 0x7B:
            case 0x7C:
            case 0x7D:
            case 0x7E:
            case 0x7F: { // bit 7,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x80) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                if ((value & 0x80) !== 0) {
                    f |= Flag.S;
                }
                z80.regs.f = f;
                break;
            }
            case 0x80: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0xFE;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x81: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0xFE;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x82: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0xFE;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x83: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0xFE;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x84: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0xFE;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x85: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0xFE;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x86: { // res 0,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0xFE);
                break;
            }
            case 0x87: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0xFE;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x88: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0xFD;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x89: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0xFD;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x8A: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0xFD;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x8B: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0xFD;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x8C: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0xFD;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x8D: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0xFD;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x8E: { // res 1,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0xFD);
                break;
            }
            case 0x8F: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0xFD;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x90: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0xFB;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x91: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0xFB;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x92: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0xFB;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x93: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0xFB;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x94: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0xFB;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x95: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0xFB;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x96: { // res 2,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0xFB);
                break;
            }
            case 0x97: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0xFB;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x98: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0xF7;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x99: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0xF7;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x9A: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0xF7;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x9B: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0xF7;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x9C: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0xF7;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x9D: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0xF7;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x9E: { // res 3,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0xF7);
                break;
            }
            case 0x9F: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0xF7;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xA0: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0xEF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xA1: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0xEF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xA2: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0xEF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xA3: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0xEF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xA4: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0xEF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xA5: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0xEF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xA6: { // res 4,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0xEF);
                break;
            }
            case 0xA7: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0xEF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xA8: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0xDF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xA9: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0xDF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xAA: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0xDF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xAB: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0xDF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xAC: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0xDF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xAD: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0xDF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xAE: { // res 5,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0xDF);
                break;
            }
            case 0xAF: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0xDF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xB0: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0xBF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xB1: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0xBF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xB2: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0xBF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xB3: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0xBF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xB4: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0xBF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xB5: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0xBF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xB6: { // res 6,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0xBF);
                break;
            }
            case 0xB7: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0xBF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xB8: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0x7F;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xB9: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0x7F;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xBA: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0x7F;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xBB: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0x7F;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xBC: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0x7F;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xBD: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0x7F;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xBE: { // res 7,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0x7F);
                break;
            }
            case 0xBF: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0x7F;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xC0: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x01;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xC1: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x01;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xC2: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x01;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xC3: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x01;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xC4: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x01;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xC5: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x01;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xC6: { // set 0,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x01);
                break;
            }
            case 0xC7: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x01;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xC8: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x02;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xC9: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x02;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xCA: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x02;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xCB: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x02;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xCC: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x02;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xCD: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x02;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xCE: { // set 1,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x02);
                break;
            }
            case 0xCF: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x02;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xD0: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x04;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xD1: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x04;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xD2: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x04;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xD3: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x04;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xD4: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x04;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xD5: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x04;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xD6: { // set 2,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x04);
                break;
            }
            case 0xD7: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x04;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xD8: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x08;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xD9: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x08;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xDA: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x08;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xDB: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x08;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xDC: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x08;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xDD: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x08;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xDE: { // set 3,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x08);
                break;
            }
            case 0xDF: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x08;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xE0: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x10;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xE1: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x10;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xE2: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x10;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xE3: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x10;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xE4: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x10;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xE5: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x10;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xE6: { // set 4,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x10);
                break;
            }
            case 0xE7: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x10;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xE8: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x20;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xE9: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x20;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xEA: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x20;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xEB: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x20;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xEC: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x20;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xED: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x20;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xEE: { // set 5,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x20);
                break;
            }
            case 0xEF: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x20;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xF0: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x40;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xF1: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x40;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xF2: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x40;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xF3: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x40;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xF4: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x40;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xF5: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x40;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xF6: { // set 6,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x40);
                break;
            }
            case 0xF7: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x40;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xF8: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x80;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xF9: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x80;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xFA: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x80;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xFB: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x80;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xFC: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x80;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xFD: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x80;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xFE: { // set 7,(ix+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x80);
                break;
            }
            case 0xFF: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x80;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            default:
                console.log("Unhandled opcode in DDCB: " + toHex(inst, 2));
                break;
        }
    }
    /**
     * Decode the "ED" prefix (extended instructions).
     */
    function decodeED(z80) {
        const inst = fetchInstruction(z80);
        switch (inst) {
            // The content of this switch is auto-generated by GenerateOpcodes.ts.
            case 0x40: { // in b,(c)
                z80.regs.memptr = inc16(z80.regs.bc);
                z80.regs.b = z80.readPort(z80.regs.bc);
                z80.regs.f = (z80.regs.f & Flag.C) | z80.sz53pTable[z80.regs.b];
                break;
            }
            case 0x41: { // out (c),b
                z80.writePort(z80.regs.bc, z80.regs.b);
                z80.regs.memptr = inc16(z80.regs.bc);
                break;
            }
            case 0x42: { // sbc hl,bc
                let value;
                z80.incTStateCount(7);
                value = z80.regs.bc;
                let result = z80.regs.hl - value;
                if ((z80.regs.f & Flag.C) !== 0) {
                    result -= 1;
                }
                const lookup = (((z80.regs.hl & 0x8800) >> 11) |
                    ((value & 0x8800) >> 10) |
                    ((result & 0x8800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.hl);
                z80.regs.hl = result & 0xFFFF;
                z80.regs.f = ((result & 0x10000) !== 0 ? Flag.C : 0) | Flag.N | overflowSubTable[lookup >> 4] | ((result >> 8) & (Flag.X3 | Flag.X5 | Flag.S)) | halfCarrySubTable[lookup & 0x07] | (result !== 0 ? 0 : Flag.Z);
                break;
            }
            case 0x43: { // ld (nnnn),bc
                let value;
                value = z80.regs.bc;
                let addr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                addr = word(z80.readByte(z80.regs.pc), addr);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.writeByte(addr, lo(value));
                addr = inc16(addr);
                z80.regs.memptr = addr;
                z80.writeByte(addr, hi(value));
                break;
            }
            case 0x44:
            case 0x4C:
            case 0x54:
            case 0x5C:
            case 0x64:
            case 0x6C:
            case 0x74:
            case 0x7C: { // neg
                const value = z80.regs.a;
                z80.regs.a = 0;
                const diff = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                z80.regs.a = diff;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= z80.sz53Table[z80.regs.a];
                z80.regs.f = f;
                break;
            }
            case 0x45:
            case 0x4D:
            case 0x55:
            case 0x5D:
            case 0x65:
            case 0x6D:
            case 0x75:
            case 0x7D: { // retn
                z80.regs.iff1 = z80.regs.iff2;
                z80.regs.pc = z80.popWord();
                z80.regs.memptr = z80.regs.pc;
                break;
            }
            case 0x46:
            case 0x4E:
            case 0x66:
            case 0x6E: { // im 0
                z80.regs.im = 0;
                break;
            }
            case 0x47: { // ld i,a
                let value;
                value = z80.regs.a;
                z80.regs.i = value;
                break;
            }
            case 0x48: { // in c,(c)
                z80.regs.memptr = inc16(z80.regs.bc);
                z80.regs.c = z80.readPort(z80.regs.bc);
                z80.regs.f = (z80.regs.f & Flag.C) | z80.sz53pTable[z80.regs.c];
                break;
            }
            case 0x49: { // out (c),c
                z80.writePort(z80.regs.bc, z80.regs.c);
                z80.regs.memptr = inc16(z80.regs.bc);
                break;
            }
            case 0x4A: { // adc hl,bc
                let value;
                z80.incTStateCount(7);
                value = z80.regs.bc;
                let result = z80.regs.hl + value;
                if ((z80.regs.f & Flag.C) !== 0) {
                    result += 1;
                }
                const lookup = (((z80.regs.hl & 0x8800) >> 11) |
                    ((value & 0x8800) >> 10) |
                    ((result & 0x8800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.hl);
                z80.regs.hl = result & 0xFFFF;
                z80.regs.f = ((result & 0x10000) !== 0 ? Flag.C : 0) | overflowAddTable[lookup >> 4] | ((result >> 8) & (Flag.X3 | Flag.X5 | Flag.S)) | halfCarryAddTable[lookup & 0x07] | (result !== 0 ? 0 : Flag.Z);
                break;
            }
            case 0x4B: { // ld bc,(nnnn)
                let value;
                let addr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                addr = word(z80.readByte(z80.regs.pc), addr);
                z80.regs.pc = inc16(z80.regs.pc);
                value = z80.readByte(addr);
                z80.regs.memptr = inc16(addr);
                value = word(z80.readByte(z80.regs.memptr), value);
                z80.regs.bc = value;
                break;
            }
            case 0x4F: { // ld r,a
                let value;
                value = z80.regs.a;
                z80.regs.r = value;
                break;
            }
            case 0x50: { // in d,(c)
                z80.regs.memptr = inc16(z80.regs.bc);
                z80.regs.d = z80.readPort(z80.regs.bc);
                z80.regs.f = (z80.regs.f & Flag.C) | z80.sz53pTable[z80.regs.d];
                break;
            }
            case 0x51: { // out (c),d
                z80.writePort(z80.regs.bc, z80.regs.d);
                z80.regs.memptr = inc16(z80.regs.bc);
                break;
            }
            case 0x52: { // sbc hl,de
                let value;
                z80.incTStateCount(7);
                value = z80.regs.de;
                let result = z80.regs.hl - value;
                if ((z80.regs.f & Flag.C) !== 0) {
                    result -= 1;
                }
                const lookup = (((z80.regs.hl & 0x8800) >> 11) |
                    ((value & 0x8800) >> 10) |
                    ((result & 0x8800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.hl);
                z80.regs.hl = result & 0xFFFF;
                z80.regs.f = ((result & 0x10000) !== 0 ? Flag.C : 0) | Flag.N | overflowSubTable[lookup >> 4] | ((result >> 8) & (Flag.X3 | Flag.X5 | Flag.S)) | halfCarrySubTable[lookup & 0x07] | (result !== 0 ? 0 : Flag.Z);
                break;
            }
            case 0x53: { // ld (nnnn),de
                let value;
                value = z80.regs.de;
                let addr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                addr = word(z80.readByte(z80.regs.pc), addr);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.writeByte(addr, lo(value));
                addr = inc16(addr);
                z80.regs.memptr = addr;
                z80.writeByte(addr, hi(value));
                break;
            }
            case 0x56:
            case 0x76: { // im 1
                z80.regs.im = 1;
                break;
            }
            case 0x57: { // ld a,i
                let value;
                value = z80.regs.i;
                z80.regs.a = value;
                z80.regs.f = (z80.regs.f & Flag.C) | z80.sz53Table[z80.regs.a] | (z80.regs.iff2 ? Flag.V : 0);
                break;
            }
            case 0x58: { // in e,(c)
                z80.regs.memptr = inc16(z80.regs.bc);
                z80.regs.e = z80.readPort(z80.regs.bc);
                z80.regs.f = (z80.regs.f & Flag.C) | z80.sz53pTable[z80.regs.e];
                break;
            }
            case 0x59: { // out (c),e
                z80.writePort(z80.regs.bc, z80.regs.e);
                z80.regs.memptr = inc16(z80.regs.bc);
                break;
            }
            case 0x5A: { // adc hl,de
                let value;
                z80.incTStateCount(7);
                value = z80.regs.de;
                let result = z80.regs.hl + value;
                if ((z80.regs.f & Flag.C) !== 0) {
                    result += 1;
                }
                const lookup = (((z80.regs.hl & 0x8800) >> 11) |
                    ((value & 0x8800) >> 10) |
                    ((result & 0x8800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.hl);
                z80.regs.hl = result & 0xFFFF;
                z80.regs.f = ((result & 0x10000) !== 0 ? Flag.C : 0) | overflowAddTable[lookup >> 4] | ((result >> 8) & (Flag.X3 | Flag.X5 | Flag.S)) | halfCarryAddTable[lookup & 0x07] | (result !== 0 ? 0 : Flag.Z);
                break;
            }
            case 0x5B: { // ld de,(nnnn)
                let value;
                let addr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                addr = word(z80.readByte(z80.regs.pc), addr);
                z80.regs.pc = inc16(z80.regs.pc);
                value = z80.readByte(addr);
                z80.regs.memptr = inc16(addr);
                value = word(z80.readByte(z80.regs.memptr), value);
                z80.regs.de = value;
                break;
            }
            case 0x5E:
            case 0x7E: { // im 2
                z80.regs.im = 2;
                break;
            }
            case 0x5F: { // ld a,r
                let value;
                z80.incTStateCount(1);
                value = z80.regs.rCombined;
                z80.regs.a = value;
                z80.regs.f = (z80.regs.f & Flag.C) | z80.sz53Table[z80.regs.a] | (z80.regs.iff2 ? Flag.V : 0);
                break;
            }
            case 0x60: { // in h,(c)
                z80.regs.memptr = inc16(z80.regs.bc);
                z80.regs.h = z80.readPort(z80.regs.bc);
                z80.regs.f = (z80.regs.f & Flag.C) | z80.sz53pTable[z80.regs.h];
                break;
            }
            case 0x61: { // out (c),h
                z80.writePort(z80.regs.bc, z80.regs.h);
                z80.regs.memptr = inc16(z80.regs.bc);
                break;
            }
            case 0x62: { // sbc hl,hl
                let value;
                z80.incTStateCount(7);
                value = z80.regs.hl;
                let result = z80.regs.hl - value;
                if ((z80.regs.f & Flag.C) !== 0) {
                    result -= 1;
                }
                const lookup = (((z80.regs.hl & 0x8800) >> 11) |
                    ((value & 0x8800) >> 10) |
                    ((result & 0x8800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.hl);
                z80.regs.hl = result & 0xFFFF;
                z80.regs.f = ((result & 0x10000) !== 0 ? Flag.C : 0) | Flag.N | overflowSubTable[lookup >> 4] | ((result >> 8) & (Flag.X3 | Flag.X5 | Flag.S)) | halfCarrySubTable[lookup & 0x07] | (result !== 0 ? 0 : Flag.Z);
                break;
            }
            case 0x63: { // ld (nnnn),hl
                let value;
                value = z80.regs.hl;
                let addr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                addr = word(z80.readByte(z80.regs.pc), addr);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.writeByte(addr, lo(value));
                addr = inc16(addr);
                z80.regs.memptr = addr;
                z80.writeByte(addr, hi(value));
                break;
            }
            case 0x67: { // rrd
                const tmp = z80.readByte(z80.regs.hl);
                z80.incTStateCount(4);
                z80.writeByte(z80.regs.hl, ((z80.regs.a << 4) | (tmp >> 4)) & 0xFF);
                z80.regs.a = (z80.regs.a & 0xF0) | (tmp & 0x0F);
                z80.regs.f = (z80.regs.f & Flag.C) | z80.sz53pTable[z80.regs.a];
                z80.regs.memptr = inc16(z80.regs.hl);
                break;
            }
            case 0x68: { // in l,(c)
                z80.regs.memptr = inc16(z80.regs.bc);
                z80.regs.l = z80.readPort(z80.regs.bc);
                z80.regs.f = (z80.regs.f & Flag.C) | z80.sz53pTable[z80.regs.l];
                break;
            }
            case 0x69: { // out (c),l
                z80.writePort(z80.regs.bc, z80.regs.l);
                z80.regs.memptr = inc16(z80.regs.bc);
                break;
            }
            case 0x6A: { // adc hl,hl
                let value;
                z80.incTStateCount(7);
                value = z80.regs.hl;
                let result = z80.regs.hl + value;
                if ((z80.regs.f & Flag.C) !== 0) {
                    result += 1;
                }
                const lookup = (((z80.regs.hl & 0x8800) >> 11) |
                    ((value & 0x8800) >> 10) |
                    ((result & 0x8800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.hl);
                z80.regs.hl = result & 0xFFFF;
                z80.regs.f = ((result & 0x10000) !== 0 ? Flag.C : 0) | overflowAddTable[lookup >> 4] | ((result >> 8) & (Flag.X3 | Flag.X5 | Flag.S)) | halfCarryAddTable[lookup & 0x07] | (result !== 0 ? 0 : Flag.Z);
                break;
            }
            case 0x6B: { // ld hl,(nnnn)
                let value;
                let addr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                addr = word(z80.readByte(z80.regs.pc), addr);
                z80.regs.pc = inc16(z80.regs.pc);
                value = z80.readByte(addr);
                z80.regs.memptr = inc16(addr);
                value = word(z80.readByte(z80.regs.memptr), value);
                z80.regs.hl = value;
                break;
            }
            case 0x6F: { // rld
                const tmp = z80.readByte(z80.regs.hl);
                z80.incTStateCount(4);
                z80.writeByte(z80.regs.hl, ((tmp << 4) | (z80.regs.a & 0x0F)) & 0xFF);
                z80.regs.a = (z80.regs.a & 0xF0) | (tmp >> 4);
                z80.regs.f = (z80.regs.f & Flag.C) | z80.sz53pTable[z80.regs.a];
                z80.regs.memptr = inc16(z80.regs.hl);
                break;
            }
            case 0x70: { // in f,(c)
                z80.regs.memptr = inc16(z80.regs.bc);
                z80.regs.f = z80.readPort(z80.regs.bc);
                z80.regs.f = (z80.regs.f & Flag.C) | z80.sz53pTable[z80.regs.f];
                break;
            }
            case 0x71: { // out (c),0
                z80.writePort(z80.regs.bc, 0x00);
                z80.regs.memptr = inc16(z80.regs.bc);
                break;
            }
            case 0x72: { // sbc hl,sp
                let value;
                z80.incTStateCount(7);
                value = z80.regs.sp;
                let result = z80.regs.hl - value;
                if ((z80.regs.f & Flag.C) !== 0) {
                    result -= 1;
                }
                const lookup = (((z80.regs.hl & 0x8800) >> 11) |
                    ((value & 0x8800) >> 10) |
                    ((result & 0x8800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.hl);
                z80.regs.hl = result & 0xFFFF;
                z80.regs.f = ((result & 0x10000) !== 0 ? Flag.C : 0) | Flag.N | overflowSubTable[lookup >> 4] | ((result >> 8) & (Flag.X3 | Flag.X5 | Flag.S)) | halfCarrySubTable[lookup & 0x07] | (result !== 0 ? 0 : Flag.Z);
                break;
            }
            case 0x73: { // ld (nnnn),sp
                let value;
                value = z80.regs.sp;
                let addr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                addr = word(z80.readByte(z80.regs.pc), addr);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.writeByte(addr, lo(value));
                addr = inc16(addr);
                z80.regs.memptr = addr;
                z80.writeByte(addr, hi(value));
                break;
            }
            case 0x78: { // in a,(c)
                z80.regs.memptr = inc16(z80.regs.bc);
                z80.regs.a = z80.readPort(z80.regs.bc);
                z80.regs.f = (z80.regs.f & Flag.C) | z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0x79: { // out (c),a
                z80.writePort(z80.regs.bc, z80.regs.a);
                z80.regs.memptr = inc16(z80.regs.bc);
                break;
            }
            case 0x7A: { // adc hl,sp
                let value;
                z80.incTStateCount(7);
                value = z80.regs.sp;
                let result = z80.regs.hl + value;
                if ((z80.regs.f & Flag.C) !== 0) {
                    result += 1;
                }
                const lookup = (((z80.regs.hl & 0x8800) >> 11) |
                    ((value & 0x8800) >> 10) |
                    ((result & 0x8800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.hl);
                z80.regs.hl = result & 0xFFFF;
                z80.regs.f = ((result & 0x10000) !== 0 ? Flag.C : 0) | overflowAddTable[lookup >> 4] | ((result >> 8) & (Flag.X3 | Flag.X5 | Flag.S)) | halfCarryAddTable[lookup & 0x07] | (result !== 0 ? 0 : Flag.Z);
                break;
            }
            case 0x7B: { // ld sp,(nnnn)
                let value;
                let addr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                addr = word(z80.readByte(z80.regs.pc), addr);
                z80.regs.pc = inc16(z80.regs.pc);
                value = z80.readByte(addr);
                z80.regs.memptr = inc16(addr);
                value = word(z80.readByte(z80.regs.memptr), value);
                z80.regs.sp = value;
                break;
            }
            case 0xA0: { // ldi
                let value = z80.readByte(z80.regs.hl);
                z80.writeByte(z80.regs.de, value);
                z80.incTStateCount(2);
                z80.regs.bc = dec16(z80.regs.bc);
                value = add16(value, z80.regs.a);
                z80.regs.f = (z80.regs.f & (Flag.C | Flag.Z | Flag.S)) | (z80.regs.bc !== 0 ? Flag.V : 0) | (value & Flag.X3) | ((value & 0x02) !== 0 ? Flag.X5 : 0);
                z80.regs.hl = inc16(z80.regs.hl);
                z80.regs.de = inc16(z80.regs.de);
                break;
            }
            case 0xA1: { // cpi
                const value = z80.readByte(z80.regs.hl);
                let diff = (z80.regs.a - value) & 0xFF;
                const lookup = ((z80.regs.a & 0x08) >> 3) | ((value & 0x08) >> 2) | ((diff & 0x08) >> 1);
                z80.incTStateCount(5);
                z80.regs.bc = dec16(z80.regs.bc);
                z80.regs.f = (z80.regs.f & Flag.C) | (z80.regs.bc !== 0 ? Flag.V : 0) | Flag.N | halfCarrySubTable[lookup] | (diff !== 0 ? 0 : Flag.Z) | (diff & Flag.S);
                if ((z80.regs.f & Flag.H) !== 0)
                    diff = dec8(diff);
                z80.regs.f |= (diff & Flag.X3) | (((diff & 0x02) !== 0) ? Flag.X5 : 0);
                z80.regs.memptr = inc16(z80.regs.memptr);
                z80.regs.hl = inc16(z80.regs.hl);
                break;
            }
            case 0xA2: { // ini
                z80.incTStateCount(1);
                const value = z80.readPort(z80.regs.bc);
                z80.writeByte(z80.regs.hl, value);
                z80.regs.memptr = inc16(z80.regs.bc);
                z80.regs.b = dec8(z80.regs.b);
                const other = inc8(add8(value, z80.regs.c));
                z80.regs.f = (value & 0x80 ? Flag.N : 0) | (other < value ? Flag.H | Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? Flag.P : 0) | z80.sz53Table[z80.regs.b];
                z80.regs.hl = inc16(z80.regs.hl);
                break;
            }
            case 0xA3: { // outi
                z80.incTStateCount(1);
                const value = z80.readByte(z80.regs.hl);
                z80.regs.b = dec8(z80.regs.b);
                z80.regs.memptr = inc16(z80.regs.bc);
                z80.writePort(z80.regs.bc, value);
                z80.regs.hl = inc16(z80.regs.hl);
                const other = add8(value, z80.regs.l);
                z80.regs.f = (value & 0x80 ? Flag.N : 0) | (other < value ? Flag.H | Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? Flag.P : 0) | z80.sz53Table[z80.regs.b];
                break;
            }
            case 0xA8: { // ldd
                let value = z80.readByte(z80.regs.hl);
                z80.writeByte(z80.regs.de, value);
                z80.incTStateCount(2);
                z80.regs.bc = dec16(z80.regs.bc);
                value = add16(value, z80.regs.a);
                z80.regs.f = (z80.regs.f & (Flag.C | Flag.Z | Flag.S)) | (z80.regs.bc !== 0 ? Flag.V : 0) | (value & Flag.X3) | ((value & 0x02) !== 0 ? Flag.X5 : 0);
                z80.regs.hl = dec16(z80.regs.hl);
                z80.regs.de = dec16(z80.regs.de);
                break;
            }
            case 0xA9: { // cpd
                const value = z80.readByte(z80.regs.hl);
                let diff = (z80.regs.a - value) & 0xFF;
                const lookup = ((z80.regs.a & 0x08) >> 3) | ((value & 0x08) >> 2) | ((diff & 0x08) >> 1);
                z80.incTStateCount(5);
                z80.regs.bc = dec16(z80.regs.bc);
                z80.regs.f = (z80.regs.f & Flag.C) | (z80.regs.bc !== 0 ? Flag.V : 0) | Flag.N | halfCarrySubTable[lookup] | (diff !== 0 ? 0 : Flag.Z) | (diff & Flag.S);
                if ((z80.regs.f & Flag.H) !== 0)
                    diff = dec8(diff);
                z80.regs.f |= (diff & Flag.X3) | (((diff & 0x02) !== 0) ? Flag.X5 : 0);
                z80.regs.memptr = dec16(z80.regs.memptr);
                z80.regs.hl = dec16(z80.regs.hl);
                break;
            }
            case 0xAA: { // ind
                z80.incTStateCount(1);
                const value = z80.readPort(z80.regs.bc);
                z80.writeByte(z80.regs.hl, value);
                z80.regs.memptr = dec16(z80.regs.bc);
                z80.regs.b = dec8(z80.regs.b);
                const other = dec8(add8(value, z80.regs.c));
                z80.regs.f = (value & 0x80 ? Flag.N : 0) | (other < value ? Flag.H | Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? Flag.P : 0) | z80.sz53Table[z80.regs.b];
                z80.regs.hl = dec16(z80.regs.hl);
                break;
            }
            case 0xAB: { // outd
                z80.incTStateCount(1);
                const value = z80.readByte(z80.regs.hl);
                z80.regs.b = dec8(z80.regs.b);
                z80.regs.memptr = dec16(z80.regs.bc);
                z80.writePort(z80.regs.bc, value);
                z80.regs.hl = dec16(z80.regs.hl);
                const other = add8(value, z80.regs.l);
                z80.regs.f = (value & 0x80 ? Flag.N : 0) | (other < value ? Flag.H | Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? Flag.P : 0) | z80.sz53Table[z80.regs.b];
                break;
            }
            case 0xB0: { // ldir
                let value = z80.readByte(z80.regs.hl);
                z80.writeByte(z80.regs.de, value);
                z80.incTStateCount(2);
                z80.regs.bc = dec16(z80.regs.bc);
                value = add16(value, z80.regs.a);
                z80.regs.f = (z80.regs.f & (Flag.C | Flag.Z | Flag.S)) | (z80.regs.bc !== 0 ? Flag.V : 0) | (value & Flag.X3) | ((value & 0x02) !== 0 ? Flag.X5 : 0);
                if (z80.regs.bc !== 0) {
                    z80.incTStateCount(5);
                    z80.regs.pc = add16(z80.regs.pc, -2);
                    z80.regs.memptr = add16(z80.regs.pc, 1);
                }
                z80.regs.hl = inc16(z80.regs.hl);
                z80.regs.de = inc16(z80.regs.de);
                break;
            }
            case 0xB1: { // cpir
                const value = z80.readByte(z80.regs.hl);
                let diff = (z80.regs.a - value) & 0xFF;
                const lookup = ((z80.regs.a & 0x08) >> 3) | ((value & 0x08) >> 2) | ((diff & 0x08) >> 1);
                z80.incTStateCount(5);
                z80.regs.bc = dec16(z80.regs.bc);
                z80.regs.f = (z80.regs.f & Flag.C) | (z80.regs.bc !== 0 ? Flag.V : 0) | Flag.N | halfCarrySubTable[lookup] | (diff !== 0 ? 0 : Flag.Z) | (diff & Flag.S);
                if ((z80.regs.f & Flag.H) !== 0)
                    diff = dec8(diff);
                z80.regs.f |= (diff & Flag.X3) | (((diff & 0x02) !== 0) ? Flag.X5 : 0);
                if ((z80.regs.f & (Flag.V | Flag.Z)) === Flag.V) {
                    z80.incTStateCount(5);
                    z80.regs.pc = add16(z80.regs.pc, -2);
                    z80.regs.memptr = add16(z80.regs.pc, 1);
                }
                else {
                    z80.regs.memptr = inc16(z80.regs.memptr);
                }
                z80.regs.hl = inc16(z80.regs.hl);
                break;
            }
            case 0xB2: { // inir
                z80.incTStateCount(1);
                const value = z80.readPort(z80.regs.bc);
                z80.writeByte(z80.regs.hl, value);
                z80.regs.memptr = inc16(z80.regs.bc);
                z80.regs.b = dec8(z80.regs.b);
                const other = inc8(add8(value, z80.regs.c));
                z80.regs.f = (value & 0x80 ? Flag.N : 0) | (other < value ? Flag.H | Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? Flag.P : 0) | z80.sz53Table[z80.regs.b];
                if (z80.regs.b > 0) {
                    z80.incTStateCount(5);
                    z80.regs.pc = add16(z80.regs.pc, -2);
                }
                z80.regs.hl = inc16(z80.regs.hl);
                break;
            }
            case 0xB3: { // otir
                z80.incTStateCount(1);
                const value = z80.readByte(z80.regs.hl);
                z80.regs.b = dec8(z80.regs.b);
                z80.regs.memptr = inc16(z80.regs.bc);
                z80.writePort(z80.regs.bc, value);
                z80.regs.hl = inc16(z80.regs.hl);
                const other = add8(value, z80.regs.l);
                z80.regs.f = (value & 0x80 ? Flag.N : 0) | (other < value ? Flag.H | Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? Flag.P : 0) | z80.sz53Table[z80.regs.b];
                if (z80.regs.b > 0) {
                    z80.incTStateCount(5);
                    z80.regs.pc = add16(z80.regs.pc, -2);
                }
                break;
            }
            case 0xB8: { // lddr
                let value = z80.readByte(z80.regs.hl);
                z80.writeByte(z80.regs.de, value);
                z80.incTStateCount(2);
                z80.regs.bc = dec16(z80.regs.bc);
                value = add16(value, z80.regs.a);
                z80.regs.f = (z80.regs.f & (Flag.C | Flag.Z | Flag.S)) | (z80.regs.bc !== 0 ? Flag.V : 0) | (value & Flag.X3) | ((value & 0x02) !== 0 ? Flag.X5 : 0);
                if (z80.regs.bc !== 0) {
                    z80.incTStateCount(5);
                    z80.regs.pc = add16(z80.regs.pc, -2);
                    z80.regs.memptr = add16(z80.regs.pc, 1);
                }
                z80.regs.hl = dec16(z80.regs.hl);
                z80.regs.de = dec16(z80.regs.de);
                break;
            }
            case 0xB9: { // cpdr
                const value = z80.readByte(z80.regs.hl);
                let diff = (z80.regs.a - value) & 0xFF;
                const lookup = ((z80.regs.a & 0x08) >> 3) | ((value & 0x08) >> 2) | ((diff & 0x08) >> 1);
                z80.incTStateCount(5);
                z80.regs.bc = dec16(z80.regs.bc);
                z80.regs.f = (z80.regs.f & Flag.C) | (z80.regs.bc !== 0 ? Flag.V : 0) | Flag.N | halfCarrySubTable[lookup] | (diff !== 0 ? 0 : Flag.Z) | (diff & Flag.S);
                if ((z80.regs.f & Flag.H) !== 0)
                    diff = dec8(diff);
                z80.regs.f |= (diff & Flag.X3) | (((diff & 0x02) !== 0) ? Flag.X5 : 0);
                if ((z80.regs.f & (Flag.V | Flag.Z)) === Flag.V) {
                    z80.incTStateCount(5);
                    z80.regs.pc = add16(z80.regs.pc, -2);
                    z80.regs.memptr = add16(z80.regs.pc, 1);
                }
                else {
                    z80.regs.memptr = dec16(z80.regs.memptr);
                }
                z80.regs.hl = dec16(z80.regs.hl);
                break;
            }
            case 0xBA: { // indr
                z80.incTStateCount(1);
                const value = z80.readPort(z80.regs.bc);
                z80.writeByte(z80.regs.hl, value);
                z80.regs.memptr = dec16(z80.regs.bc);
                z80.regs.b = dec8(z80.regs.b);
                const other = dec8(add8(value, z80.regs.c));
                z80.regs.f = (value & 0x80 ? Flag.N : 0) | (other < value ? Flag.H | Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? Flag.P : 0) | z80.sz53Table[z80.regs.b];
                if (z80.regs.b > 0) {
                    z80.incTStateCount(5);
                    z80.regs.pc = add16(z80.regs.pc, -2);
                }
                z80.regs.hl = dec16(z80.regs.hl);
                break;
            }
            case 0xBB: { // otdr
                z80.incTStateCount(1);
                const value = z80.readByte(z80.regs.hl);
                z80.regs.b = dec8(z80.regs.b);
                z80.regs.memptr = dec16(z80.regs.bc);
                z80.writePort(z80.regs.bc, value);
                z80.regs.hl = dec16(z80.regs.hl);
                const other = add8(value, z80.regs.l);
                z80.regs.f = (value & 0x80 ? Flag.N : 0) | (other < value ? Flag.H | Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? Flag.P : 0) | z80.sz53Table[z80.regs.b];
                if (z80.regs.b > 0) {
                    z80.incTStateCount(5);
                    z80.regs.pc = add16(z80.regs.pc, -2);
                }
                break;
            }
            default:
                console.log("Unhandled opcode in ED: " + toHex(inst, 2));
                break;
        }
    }
    /**
     * Decode the "FD" prefix (IY instructions).
     */
    function decodeFD(z80) {
        const inst = fetchInstruction(z80);
        switch (inst) {
            // The content of this switch is auto-generated by GenerateOpcodes.ts.
            case 0x09: { // add iy,bc
                let value;
                z80.incTStateCount(7);
                value = z80.regs.bc;
                let result = z80.regs.iy + value;
                const lookup = (((z80.regs.iy & 0x0800) >> 11) |
                    ((value & 0x0800) >> 10) |
                    ((result & 0x0800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.iy);
                z80.regs.iy = result & 0xFFFF;
                z80.regs.f = (z80.regs.f & (Flag.V | Flag.Z | Flag.S)) | ((result & 0x10000) !== 0 ? Flag.C : 0) | ((result >> 8) & (Flag.X3 | Flag.X5)) | halfCarryAddTable[lookup];
                break;
            }
            case 0x19: { // add iy,de
                let value;
                z80.incTStateCount(7);
                value = z80.regs.de;
                let result = z80.regs.iy + value;
                const lookup = (((z80.regs.iy & 0x0800) >> 11) |
                    ((value & 0x0800) >> 10) |
                    ((result & 0x0800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.iy);
                z80.regs.iy = result & 0xFFFF;
                z80.regs.f = (z80.regs.f & (Flag.V | Flag.Z | Flag.S)) | ((result & 0x10000) !== 0 ? Flag.C : 0) | ((result >> 8) & (Flag.X3 | Flag.X5)) | halfCarryAddTable[lookup];
                break;
            }
            case 0x21: { // ld iy,nnnn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                value = word(z80.readByte(z80.regs.pc), value);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.iy = value;
                break;
            }
            case 0x22: { // ld (nnnn),iy
                let value;
                value = z80.regs.iy;
                let addr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                addr = word(z80.readByte(z80.regs.pc), addr);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.writeByte(addr, lo(value));
                addr = inc16(addr);
                z80.regs.memptr = addr;
                z80.writeByte(addr, hi(value));
                break;
            }
            case 0x23: { // inc iy
                let value;
                value = z80.regs.iy;
                value = inc16(value);
                z80.regs.iy = value;
                break;
            }
            case 0x24: { // inc iyh
                let value;
                value = z80.regs.iyh;
                value = inc8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x80 ? Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : Flag.H) | z80.sz53Table[value];
                z80.regs.iyh = value;
                break;
            }
            case 0x25: { // dec iyh
                let value;
                value = z80.regs.iyh;
                const oldValue = value;
                value = dec8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x7F ? Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : Flag.H) | Flag.N | z80.sz53Table[value];
                z80.regs.iyh = value;
                break;
            }
            case 0x26: { // ld iyh,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.iyh = value;
                break;
            }
            case 0x29: { // add iy,iy
                let value;
                z80.incTStateCount(7);
                value = z80.regs.iy;
                let result = z80.regs.iy + value;
                const lookup = (((z80.regs.iy & 0x0800) >> 11) |
                    ((value & 0x0800) >> 10) |
                    ((result & 0x0800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.iy);
                z80.regs.iy = result & 0xFFFF;
                z80.regs.f = (z80.regs.f & (Flag.V | Flag.Z | Flag.S)) | ((result & 0x10000) !== 0 ? Flag.C : 0) | ((result >> 8) & (Flag.X3 | Flag.X5)) | halfCarryAddTable[lookup];
                break;
            }
            case 0x2A: { // ld iy,(nnnn)
                let value;
                let addr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                addr = word(z80.readByte(z80.regs.pc), addr);
                z80.regs.pc = inc16(z80.regs.pc);
                value = z80.readByte(addr);
                z80.regs.memptr = inc16(addr);
                value = word(z80.readByte(z80.regs.memptr), value);
                z80.regs.iy = value;
                break;
            }
            case 0x2B: { // dec iy
                let value;
                value = z80.regs.iy;
                value = dec16(value);
                z80.regs.iy = value;
                break;
            }
            case 0x2C: { // inc iyl
                let value;
                value = z80.regs.iyl;
                value = inc8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x80 ? Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : Flag.H) | z80.sz53Table[value];
                z80.regs.iyl = value;
                break;
            }
            case 0x2D: { // dec iyl
                let value;
                value = z80.regs.iyl;
                const oldValue = value;
                value = dec8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x7F ? Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : Flag.H) | Flag.N | z80.sz53Table[value];
                z80.regs.iyl = value;
                break;
            }
            case 0x2E: { // ld iyl,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.iyl = value;
                break;
            }
            case 0x34: { // inc (iy+dd)
                let value;
                const offset = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = add16(z80.regs.iy, signedByte(offset));
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                value = inc8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x80 ? Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : Flag.H) | z80.sz53Table[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x35: { // dec (iy+dd)
                let value;
                const offset = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = add16(z80.regs.iy, signedByte(offset));
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = dec8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x7F ? Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : Flag.H) | Flag.N | z80.sz53Table[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x36: { // ld (iy+dd),nn
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x39: { // add iy,sp
                let value;
                z80.incTStateCount(7);
                value = z80.regs.sp;
                let result = z80.regs.iy + value;
                const lookup = (((z80.regs.iy & 0x0800) >> 11) |
                    ((value & 0x0800) >> 10) |
                    ((result & 0x0800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.iy);
                z80.regs.iy = result & 0xFFFF;
                z80.regs.f = (z80.regs.f & (Flag.V | Flag.Z | Flag.S)) | ((result & 0x10000) !== 0 ? Flag.C : 0) | ((result >> 8) & (Flag.X3 | Flag.X5)) | halfCarryAddTable[lookup];
                break;
            }
            case 0x44: { // ld b,iyh
                let value;
                value = z80.regs.iyh;
                z80.regs.b = value;
                break;
            }
            case 0x45: { // ld b,iyl
                let value;
                value = z80.regs.iyl;
                z80.regs.b = value;
                break;
            }
            case 0x46: { // ld b,(iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.b = value;
                break;
            }
            case 0x4C: { // ld c,iyh
                let value;
                value = z80.regs.iyh;
                z80.regs.c = value;
                break;
            }
            case 0x4D: { // ld c,iyl
                let value;
                value = z80.regs.iyl;
                z80.regs.c = value;
                break;
            }
            case 0x4E: { // ld c,(iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.c = value;
                break;
            }
            case 0x54: { // ld d,iyh
                let value;
                value = z80.regs.iyh;
                z80.regs.d = value;
                break;
            }
            case 0x55: { // ld d,iyl
                let value;
                value = z80.regs.iyl;
                z80.regs.d = value;
                break;
            }
            case 0x56: { // ld d,(iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.d = value;
                break;
            }
            case 0x5C: { // ld e,iyh
                let value;
                value = z80.regs.iyh;
                z80.regs.e = value;
                break;
            }
            case 0x5D: { // ld e,iyl
                let value;
                value = z80.regs.iyl;
                z80.regs.e = value;
                break;
            }
            case 0x5E: { // ld e,(iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.e = value;
                break;
            }
            case 0x60: { // ld iyh,b
                let value;
                value = z80.regs.b;
                z80.regs.iyh = value;
                break;
            }
            case 0x61: { // ld iyh,c
                let value;
                value = z80.regs.c;
                z80.regs.iyh = value;
                break;
            }
            case 0x62: { // ld iyh,d
                let value;
                value = z80.regs.d;
                z80.regs.iyh = value;
                break;
            }
            case 0x63: { // ld iyh,e
                let value;
                value = z80.regs.e;
                z80.regs.iyh = value;
                break;
            }
            case 0x64: { // ld iyh,iyh
                let value;
                value = z80.regs.iyh;
                z80.regs.iyh = value;
                break;
            }
            case 0x65: { // ld iyh,iyl
                let value;
                value = z80.regs.iyl;
                z80.regs.iyh = value;
                break;
            }
            case 0x66: { // ld h,(iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.h = value;
                break;
            }
            case 0x67: { // ld iyh,a
                let value;
                value = z80.regs.a;
                z80.regs.iyh = value;
                break;
            }
            case 0x68: { // ld iyl,b
                let value;
                value = z80.regs.b;
                z80.regs.iyl = value;
                break;
            }
            case 0x69: { // ld iyl,c
                let value;
                value = z80.regs.c;
                z80.regs.iyl = value;
                break;
            }
            case 0x6A: { // ld iyl,d
                let value;
                value = z80.regs.d;
                z80.regs.iyl = value;
                break;
            }
            case 0x6B: { // ld iyl,e
                let value;
                value = z80.regs.e;
                z80.regs.iyl = value;
                break;
            }
            case 0x6C: { // ld iyl,iyh
                let value;
                value = z80.regs.iyh;
                z80.regs.iyl = value;
                break;
            }
            case 0x6D: { // ld iyl,iyl
                let value;
                value = z80.regs.iyl;
                z80.regs.iyl = value;
                break;
            }
            case 0x6E: { // ld l,(iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.l = value;
                break;
            }
            case 0x6F: { // ld iyl,a
                let value;
                value = z80.regs.a;
                z80.regs.iyl = value;
                break;
            }
            case 0x70: { // ld (iy+dd),b
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.regs.b;
                z80.regs.memptr = (z80.regs.iy + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x71: { // ld (iy+dd),c
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.regs.c;
                z80.regs.memptr = (z80.regs.iy + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x72: { // ld (iy+dd),d
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.regs.d;
                z80.regs.memptr = (z80.regs.iy + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x73: { // ld (iy+dd),e
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.regs.e;
                z80.regs.memptr = (z80.regs.iy + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x74: { // ld (iy+dd),h
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.regs.h;
                z80.regs.memptr = (z80.regs.iy + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x75: { // ld (iy+dd),l
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.regs.l;
                z80.regs.memptr = (z80.regs.iy + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x77: { // ld (iy+dd),a
                const dd = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let value;
                value = z80.regs.a;
                z80.regs.memptr = (z80.regs.iy + signedByte(dd)) & 0xFFFF;
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x7C: { // ld a,iyh
                let value;
                value = z80.regs.iyh;
                z80.regs.a = value;
                break;
            }
            case 0x7D: { // ld a,iyl
                let value;
                value = z80.regs.iyl;
                z80.regs.a = value;
                break;
            }
            case 0x7E: { // ld a,(iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.a = value;
                break;
            }
            case 0x84: { // add a,iyh
                let value;
                value = z80.regs.iyh;
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x85: { // add a,iyl
                let value;
                value = z80.regs.iyl;
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x86: { // add a,(iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x8C: { // adc a,iyh
                let value;
                value = z80.regs.iyh;
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x8D: { // adc a,iyl
                let value;
                value = z80.regs.iyl;
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x8E: { // adc a,(iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x94: { // sub a,iyh
                let value;
                value = z80.regs.iyh;
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x95: { // sub a,iyl
                let value;
                value = z80.regs.iyl;
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x96: { // sub a,(iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x9C: { // sbc a,iyh
                let value;
                value = z80.regs.iyh;
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x9D: { // sbc a,iyl
                let value;
                value = z80.regs.iyl;
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x9E: { // sbc a,(iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0xA4: { // and a,iyh
                let value;
                value = z80.regs.iyh;
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xA5: { // and a,iyl
                let value;
                value = z80.regs.iyl;
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xA6: { // and a,(iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xAC: { // xor a,iyh
                let value;
                value = z80.regs.iyh;
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xAD: { // xor a,iyl
                let value;
                value = z80.regs.iyl;
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xAE: { // xor a,(iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB4: { // or a,iyh
                let value;
                value = z80.regs.iyh;
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB5: { // or a,iyl
                let value;
                value = z80.regs.iyl;
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB6: { // or a,(iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xBC: { // cp iyh
                let value;
                value = z80.regs.iyh;
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xBD: { // cp iyl
                let value;
                value = z80.regs.iyl;
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xBE: { // cp (iy+dd)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = (z80.regs.iy + signedByte(value)) & 0xFFFF;
                value = z80.readByte(z80.regs.memptr);
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xCB: { // shift fdcb
                decodeFDCB(z80);
                break;
            }
            case 0xE1: { // pop iy
                z80.regs.iy = z80.popWord();
                break;
            }
            case 0xE3: { // ex (sp),iy
                const rightValue = z80.regs.iy;
                const leftValueL = z80.readByte(z80.regs.sp);
                const leftValueH = z80.readByte(inc16(z80.regs.sp));
                z80.incTStateCount(1);
                z80.writeByte(inc16(z80.regs.sp), hi(rightValue));
                z80.writeByte(z80.regs.sp, lo(rightValue));
                z80.incTStateCount(2);
                z80.regs.memptr = word(leftValueH, leftValueL);
                z80.regs.iy = word(leftValueH, leftValueL);
                break;
            }
            case 0xE5: { // push iy
                z80.pushWord(z80.regs.iy);
                break;
            }
            case 0xE9: { // jp iy
                z80.regs.pc = z80.regs.iy;
                break;
            }
            case 0xF9: { // ld sp,iy
                let value;
                value = z80.regs.iy;
                z80.regs.sp = value;
                break;
            }
            default:
                console.log("Unhandled opcode in FD: " + toHex(inst, 2));
                break;
        }
    }
    /**
     * Decode the "FDCB" prefix (IY bit instructions).
     */
    function decodeFDCB(z80) {
        z80.incTStateCount(3);
        const offset = z80.readByteInternal(z80.regs.pc);
        z80.regs.memptr = add16(z80.regs.iy, signedByte(offset));
        z80.regs.pc = inc16(z80.regs.pc);
        z80.incTStateCount(3);
        const inst = z80.readByteInternal(z80.regs.pc);
        z80.incTStateCount(2);
        z80.regs.pc = inc16(z80.regs.pc);
        switch (inst) {
            // The content of this switch is auto-generated by GenerateOpcodes.ts.
            case 0x00: { // ld b,rlc
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = ((value << 1) | (value >> 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x01: { // ld c,rlc
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = ((value << 1) | (value >> 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x02: { // ld d,rlc
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = ((value << 1) | (value >> 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x03: { // ld e,rlc
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = ((value << 1) | (value >> 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x04: { // ld h,rlc
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = ((value << 1) | (value >> 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x05: { // ld l,rlc
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = ((value << 1) | (value >> 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x06: { // rlc (iy+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = ((value << 1) | (value >> 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x07: { // ld a,rlc
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = ((value << 1) | (value >> 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x08: { // ld b,rrc
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = ((value >> 1) | (value << 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x09: { // ld c,rrc
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = ((value >> 1) | (value << 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x0A: { // ld d,rrc
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = ((value >> 1) | (value << 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x0B: { // ld e,rrc
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = ((value >> 1) | (value << 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x0C: { // ld h,rrc
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = ((value >> 1) | (value << 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x0D: { // ld l,rrc
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = ((value >> 1) | (value << 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x0E: { // rrc (iy+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = ((value >> 1) | (value << 7)) & 0xFF;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x0F: { // ld a,rrc
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = ((value >> 1) | (value << 7)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x10: { // ld b,rl
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x11: { // ld c,rl
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x12: { // ld d,rl
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x13: { // ld e,rl
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x14: { // ld h,rl
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x15: { // ld l,rl
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x16: { // rl (iy+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x17: { // ld a,rl
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = ((value << 1) | ((z80.regs.f & Flag.C) !== 0 ? 1 : 0)) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x18: { // ld b,rr
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x19: { // ld c,rr
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x1A: { // ld d,rr
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x1B: { // ld e,rr
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x1C: { // ld h,rr
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x1D: { // ld l,rr
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x1E: { // rr (iy+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x1F: { // ld a,rr
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = (value >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x20: { // ld b,sla
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = (value << 1) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x21: { // ld c,sla
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = (value << 1) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x22: { // ld d,sla
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = (value << 1) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x23: { // ld e,sla
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = (value << 1) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x24: { // ld h,sla
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = (value << 1) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x25: { // ld l,sla
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = (value << 1) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x26: { // sla (iy+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = (value << 1) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x27: { // ld a,sla
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = (value << 1) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x28: { // ld b,sra
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = (value & 0x80) | (value >> 1);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x29: { // ld c,sra
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = (value & 0x80) | (value >> 1);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x2A: { // ld d,sra
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = (value & 0x80) | (value >> 1);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x2B: { // ld e,sra
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = (value & 0x80) | (value >> 1);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x2C: { // ld h,sra
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = (value & 0x80) | (value >> 1);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x2D: { // ld l,sra
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = (value & 0x80) | (value >> 1);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x2E: { // sra (iy+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = (value & 0x80) | (value >> 1);
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x2F: { // ld a,sra
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = (value & 0x80) | (value >> 1);
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x30: { // ld b,sll
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = ((value << 1) | 0x01) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x31: { // ld c,sll
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = ((value << 1) | 0x01) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x32: { // ld d,sll
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = ((value << 1) | 0x01) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x33: { // ld e,sll
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = ((value << 1) | 0x01) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x34: { // ld h,sll
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = ((value << 1) | 0x01) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x35: { // ld l,sll
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = ((value << 1) | 0x01) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x36: { // sll (iy+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = ((value << 1) | 0x01) & 0xFF;
                z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x37: { // ld a,sll
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = ((value << 1) | 0x01) & 0xFF;
                    z80.regs.f = ((oldValue & 0x80) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x38: { // ld b,srl
                z80.regs.b = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.b;
                    const oldValue = value;
                    value = value >> 1;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.b = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x39: { // ld c,srl
                z80.regs.c = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.c;
                    const oldValue = value;
                    value = value >> 1;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.c = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x3A: { // ld d,srl
                z80.regs.d = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.d;
                    const oldValue = value;
                    value = value >> 1;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.d = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x3B: { // ld e,srl
                z80.regs.e = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.e;
                    const oldValue = value;
                    value = value >> 1;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.e = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x3C: { // ld h,srl
                z80.regs.h = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.h;
                    const oldValue = value;
                    value = value >> 1;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.h = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x3D: { // ld l,srl
                z80.regs.l = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.l;
                    const oldValue = value;
                    value = value >> 1;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.l = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x3E: { // srl (iy+dd)
                let value;
                value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                const oldValue = value;
                value = value >> 1;
                z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                z80.writeByte(z80.regs.memptr, value);
                break;
            }
            case 0x3F: { // ld a,srl
                z80.regs.a = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                {
                    let value;
                    value = z80.regs.a;
                    const oldValue = value;
                    value = value >> 1;
                    z80.regs.f = ((oldValue & 0x01) !== 0 ? Flag.C : 0) | z80.sz53pTable[value];
                    z80.regs.a = value;
                }
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x40:
            case 0x41:
            case 0x42:
            case 0x43:
            case 0x44:
            case 0x45:
            case 0x46:
            case 0x47: { // bit 0,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x01) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x48:
            case 0x49:
            case 0x4A:
            case 0x4B:
            case 0x4C:
            case 0x4D:
            case 0x4E:
            case 0x4F: { // bit 1,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x02) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x50:
            case 0x51:
            case 0x52:
            case 0x53:
            case 0x54:
            case 0x55:
            case 0x56:
            case 0x57: { // bit 2,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x04) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x58:
            case 0x59:
            case 0x5A:
            case 0x5B:
            case 0x5C:
            case 0x5D:
            case 0x5E:
            case 0x5F: { // bit 3,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x08) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x60:
            case 0x61:
            case 0x62:
            case 0x63:
            case 0x64:
            case 0x65:
            case 0x66:
            case 0x67: { // bit 4,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x10) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x68:
            case 0x69:
            case 0x6A:
            case 0x6B:
            case 0x6C:
            case 0x6D:
            case 0x6E:
            case 0x6F: { // bit 5,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x20) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x70:
            case 0x71:
            case 0x72:
            case 0x73:
            case 0x74:
            case 0x75:
            case 0x76:
            case 0x77: { // bit 6,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x40) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                z80.regs.f = f;
                break;
            }
            case 0x78:
            case 0x79:
            case 0x7A:
            case 0x7B:
            case 0x7C:
            case 0x7D:
            case 0x7E:
            case 0x7F: { // bit 7,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                const hiddenValue = hi(z80.regs.memptr);
                z80.incTStateCount(1);
                let f = (z80.regs.f & Flag.C) | Flag.H | (hiddenValue & (Flag.X3 | Flag.X5));
                if ((value & 0x80) === 0) {
                    f |= Flag.P | Flag.Z;
                }
                if ((value & 0x80) !== 0) {
                    f |= Flag.S;
                }
                z80.regs.f = f;
                break;
            }
            case 0x80: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0xFE;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x81: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0xFE;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x82: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0xFE;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x83: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0xFE;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x84: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0xFE;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x85: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0xFE;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x86: { // res 0,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0xFE);
                break;
            }
            case 0x87: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0xFE;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x88: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0xFD;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x89: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0xFD;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x8A: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0xFD;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x8B: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0xFD;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x8C: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0xFD;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x8D: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0xFD;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x8E: { // res 1,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0xFD);
                break;
            }
            case 0x8F: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0xFD;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x90: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0xFB;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x91: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0xFB;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x92: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0xFB;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x93: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0xFB;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x94: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0xFB;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x95: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0xFB;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x96: { // res 2,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0xFB);
                break;
            }
            case 0x97: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0xFB;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0x98: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0xF7;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0x99: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0xF7;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0x9A: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0xF7;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0x9B: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0xF7;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0x9C: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0xF7;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0x9D: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0xF7;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0x9E: { // res 3,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0xF7);
                break;
            }
            case 0x9F: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0xF7;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xA0: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0xEF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xA1: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0xEF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xA2: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0xEF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xA3: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0xEF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xA4: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0xEF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xA5: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0xEF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xA6: { // res 4,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0xEF);
                break;
            }
            case 0xA7: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0xEF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xA8: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0xDF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xA9: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0xDF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xAA: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0xDF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xAB: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0xDF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xAC: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0xDF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xAD: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0xDF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xAE: { // res 5,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0xDF);
                break;
            }
            case 0xAF: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0xDF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xB0: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0xBF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xB1: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0xBF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xB2: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0xBF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xB3: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0xBF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xB4: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0xBF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xB5: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0xBF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xB6: { // res 6,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0xBF);
                break;
            }
            case 0xB7: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0xBF;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xB8: { // ld b,res
                z80.regs.b = z80.readByte(z80.regs.memptr) & 0x7F;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xB9: { // ld c,res
                z80.regs.c = z80.readByte(z80.regs.memptr) & 0x7F;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xBA: { // ld d,res
                z80.regs.d = z80.readByte(z80.regs.memptr) & 0x7F;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xBB: { // ld e,res
                z80.regs.e = z80.readByte(z80.regs.memptr) & 0x7F;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xBC: { // ld h,res
                z80.regs.h = z80.readByte(z80.regs.memptr) & 0x7F;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xBD: { // ld l,res
                z80.regs.l = z80.readByte(z80.regs.memptr) & 0x7F;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xBE: { // res 7,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value & 0x7F);
                break;
            }
            case 0xBF: { // ld a,res
                z80.regs.a = z80.readByte(z80.regs.memptr) & 0x7F;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xC0: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x01;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xC1: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x01;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xC2: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x01;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xC3: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x01;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xC4: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x01;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xC5: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x01;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xC6: { // set 0,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x01);
                break;
            }
            case 0xC7: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x01;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xC8: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x02;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xC9: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x02;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xCA: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x02;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xCB: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x02;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xCC: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x02;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xCD: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x02;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xCE: { // set 1,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x02);
                break;
            }
            case 0xCF: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x02;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xD0: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x04;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xD1: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x04;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xD2: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x04;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xD3: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x04;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xD4: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x04;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xD5: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x04;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xD6: { // set 2,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x04);
                break;
            }
            case 0xD7: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x04;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xD8: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x08;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xD9: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x08;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xDA: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x08;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xDB: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x08;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xDC: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x08;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xDD: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x08;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xDE: { // set 3,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x08);
                break;
            }
            case 0xDF: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x08;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xE0: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x10;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xE1: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x10;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xE2: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x10;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xE3: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x10;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xE4: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x10;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xE5: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x10;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xE6: { // set 4,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x10);
                break;
            }
            case 0xE7: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x10;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xE8: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x20;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xE9: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x20;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xEA: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x20;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xEB: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x20;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xEC: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x20;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xED: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x20;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xEE: { // set 5,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x20);
                break;
            }
            case 0xEF: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x20;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xF0: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x40;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xF1: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x40;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xF2: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x40;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xF3: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x40;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xF4: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x40;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xF5: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x40;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xF6: { // set 6,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x40);
                break;
            }
            case 0xF7: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x40;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            case 0xF8: { // ld b,set
                z80.regs.b = z80.readByte(z80.regs.memptr) | 0x80;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.b);
                break;
            }
            case 0xF9: { // ld c,set
                z80.regs.c = z80.readByte(z80.regs.memptr) | 0x80;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.c);
                break;
            }
            case 0xFA: { // ld d,set
                z80.regs.d = z80.readByte(z80.regs.memptr) | 0x80;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.d);
                break;
            }
            case 0xFB: { // ld e,set
                z80.regs.e = z80.readByte(z80.regs.memptr) | 0x80;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.e);
                break;
            }
            case 0xFC: { // ld h,set
                z80.regs.h = z80.readByte(z80.regs.memptr) | 0x80;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.h);
                break;
            }
            case 0xFD: { // ld l,set
                z80.regs.l = z80.readByte(z80.regs.memptr) | 0x80;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.l);
                break;
            }
            case 0xFE: { // set 7,(iy+dd)
                const value = z80.readByte(z80.regs.memptr);
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, value | 0x80);
                break;
            }
            case 0xFF: { // ld a,set
                z80.regs.a = z80.readByte(z80.regs.memptr) | 0x80;
                z80.incTStateCount(1);
                z80.writeByte(z80.regs.memptr, z80.regs.a);
                break;
            }
            default:
                console.log("Unhandled opcode in FDCB: " + toHex(inst, 2));
                break;
        }
    }
    /**
     * Decode the base (un-prefixed) instructions.
     */
    function decode(z80) {
        const inst = fetchInstruction(z80);
        switch (inst) {
            // The content of this switch is auto-generated by GenerateOpcodes.ts.
            case 0x00: { // nop
                break;
            }
            case 0x01: { // ld bc,nnnn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                value = word(z80.readByte(z80.regs.pc), value);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.bc = value;
                break;
            }
            case 0x02: { // ld (bc),a
                let value;
                value = z80.regs.a;
                z80.regs.memptr = word(z80.regs.a, inc16(z80.regs.bc));
                z80.writeByte(z80.regs.bc, value);
                break;
            }
            case 0x03: { // inc bc
                let value;
                value = z80.regs.bc;
                value = inc16(value);
                z80.regs.bc = value;
                break;
            }
            case 0x04: { // inc b
                let value;
                value = z80.regs.b;
                value = inc8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x80 ? Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : Flag.H) | z80.sz53Table[value];
                z80.regs.b = value;
                break;
            }
            case 0x05: { // dec b
                let value;
                value = z80.regs.b;
                const oldValue = value;
                value = dec8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x7F ? Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : Flag.H) | Flag.N | z80.sz53Table[value];
                z80.regs.b = value;
                break;
            }
            case 0x06: { // ld b,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.b = value;
                break;
            }
            case 0x07: { // rlca
                const oldA = z80.regs.a;
                z80.regs.a = ((z80.regs.a >> 7) | (z80.regs.a << 1)) & 0xFF;
                z80.regs.f = (z80.regs.f & (Flag.P | Flag.Z | Flag.S)) | (z80.regs.a & (Flag.X3 | Flag.X5)) | ((oldA & 0x80) !== 0 ? Flag.C : 0);
                break;
            }
            case 0x08: { // ex af,af'
                const rightValue = z80.regs.afPrime;
                z80.regs.afPrime = z80.regs.af;
                z80.regs.af = rightValue;
                break;
            }
            case 0x09: { // add hl,bc
                let value;
                z80.incTStateCount(7);
                value = z80.regs.bc;
                let result = z80.regs.hl + value;
                const lookup = (((z80.regs.hl & 0x0800) >> 11) |
                    ((value & 0x0800) >> 10) |
                    ((result & 0x0800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.hl);
                z80.regs.hl = result & 0xFFFF;
                z80.regs.f = (z80.regs.f & (Flag.V | Flag.Z | Flag.S)) | ((result & 0x10000) !== 0 ? Flag.C : 0) | ((result >> 8) & (Flag.X3 | Flag.X5)) | halfCarryAddTable[lookup];
                break;
            }
            case 0x0A: { // ld a,(bc)
                let value;
                z80.regs.memptr = inc16(z80.regs.bc);
                value = z80.readByte(z80.regs.bc);
                z80.regs.a = value;
                break;
            }
            case 0x0B: { // dec bc
                let value;
                value = z80.regs.bc;
                value = dec16(value);
                z80.regs.bc = value;
                break;
            }
            case 0x0C: { // inc c
                let value;
                value = z80.regs.c;
                value = inc8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x80 ? Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : Flag.H) | z80.sz53Table[value];
                z80.regs.c = value;
                break;
            }
            case 0x0D: { // dec c
                let value;
                value = z80.regs.c;
                const oldValue = value;
                value = dec8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x7F ? Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : Flag.H) | Flag.N | z80.sz53Table[value];
                z80.regs.c = value;
                break;
            }
            case 0x0E: { // ld c,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.c = value;
                break;
            }
            case 0x0F: { // rrca
                const oldA = z80.regs.a;
                z80.regs.a = ((z80.regs.a >> 1) | (z80.regs.a << 7)) & 0xFF;
                z80.regs.f = (z80.regs.f & (Flag.P | Flag.Z | Flag.S)) | (z80.regs.a & (Flag.X3 | Flag.X5)) | ((oldA & 0x01) !== 0 ? Flag.C : 0);
                break;
            }
            case 0x10: { // djnz offset
                z80.incTStateCount(1);
                z80.regs.b = dec8(z80.regs.b);
                if (z80.regs.b !== 0) {
                    const offset = z80.readByte(z80.regs.pc);
                    z80.incTStateCount(5);
                    z80.regs.pc = add16(z80.regs.pc, signedByte(offset));
                    z80.regs.pc = inc16(z80.regs.pc);
                    z80.regs.memptr = z80.regs.pc;
                }
                else {
                    z80.incTStateCount(3);
                    z80.regs.pc = inc16(z80.regs.pc);
                }
                break;
            }
            case 0x11: { // ld de,nnnn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                value = word(z80.readByte(z80.regs.pc), value);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.de = value;
                break;
            }
            case 0x12: { // ld (de),a
                let value;
                value = z80.regs.a;
                z80.regs.memptr = word(z80.regs.a, inc16(z80.regs.de));
                z80.writeByte(z80.regs.de, value);
                break;
            }
            case 0x13: { // inc de
                let value;
                value = z80.regs.de;
                value = inc16(value);
                z80.regs.de = value;
                break;
            }
            case 0x14: { // inc d
                let value;
                value = z80.regs.d;
                value = inc8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x80 ? Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : Flag.H) | z80.sz53Table[value];
                z80.regs.d = value;
                break;
            }
            case 0x15: { // dec d
                let value;
                value = z80.regs.d;
                const oldValue = value;
                value = dec8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x7F ? Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : Flag.H) | Flag.N | z80.sz53Table[value];
                z80.regs.d = value;
                break;
            }
            case 0x16: { // ld d,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.d = value;
                break;
            }
            case 0x17: { // rla
                const oldA = z80.regs.a;
                z80.regs.a = ((z80.regs.a << 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x01 : 0)) & 0xFF;
                z80.regs.f = (z80.regs.f & (Flag.P | Flag.Z | Flag.S)) | (z80.regs.a & (Flag.X3 | Flag.X5)) | ((oldA & 0x80) !== 0 ? Flag.C : 0);
                break;
            }
            case 0x18: { // jr offset
                const offset = z80.readByte(z80.regs.pc);
                z80.incTStateCount(5);
                z80.regs.pc = add16(z80.regs.pc, signedByte(offset));
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = z80.regs.pc;
                break;
            }
            case 0x19: { // add hl,de
                let value;
                z80.incTStateCount(7);
                value = z80.regs.de;
                let result = z80.regs.hl + value;
                const lookup = (((z80.regs.hl & 0x0800) >> 11) |
                    ((value & 0x0800) >> 10) |
                    ((result & 0x0800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.hl);
                z80.regs.hl = result & 0xFFFF;
                z80.regs.f = (z80.regs.f & (Flag.V | Flag.Z | Flag.S)) | ((result & 0x10000) !== 0 ? Flag.C : 0) | ((result >> 8) & (Flag.X3 | Flag.X5)) | halfCarryAddTable[lookup];
                break;
            }
            case 0x1A: { // ld a,(de)
                let value;
                z80.regs.memptr = inc16(z80.regs.de);
                value = z80.readByte(z80.regs.de);
                z80.regs.a = value;
                break;
            }
            case 0x1B: { // dec de
                let value;
                value = z80.regs.de;
                value = dec16(value);
                z80.regs.de = value;
                break;
            }
            case 0x1C: { // inc e
                let value;
                value = z80.regs.e;
                value = inc8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x80 ? Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : Flag.H) | z80.sz53Table[value];
                z80.regs.e = value;
                break;
            }
            case 0x1D: { // dec e
                let value;
                value = z80.regs.e;
                const oldValue = value;
                value = dec8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x7F ? Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : Flag.H) | Flag.N | z80.sz53Table[value];
                z80.regs.e = value;
                break;
            }
            case 0x1E: { // ld e,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.e = value;
                break;
            }
            case 0x1F: { // rra
                const oldA = z80.regs.a;
                z80.regs.a = (z80.regs.a >> 1) | ((z80.regs.f & Flag.C) !== 0 ? 0x80 : 0);
                z80.regs.f = (z80.regs.f & (Flag.P | Flag.Z | Flag.S)) | (z80.regs.a & (Flag.X3 | Flag.X5)) | ((oldA & 0x01) !== 0 ? Flag.C : 0);
                break;
            }
            case 0x20: { // jr nz,offset
                if ((z80.regs.f & Flag.Z) === 0) {
                    const offset = z80.readByte(z80.regs.pc);
                    z80.incTStateCount(5);
                    z80.regs.pc = add16(z80.regs.pc, signedByte(offset));
                    z80.regs.pc = inc16(z80.regs.pc);
                    z80.regs.memptr = z80.regs.pc;
                }
                else {
                    z80.incTStateCount(3);
                    z80.regs.pc = inc16(z80.regs.pc);
                }
                break;
            }
            case 0x21: { // ld hl,nnnn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                value = word(z80.readByte(z80.regs.pc), value);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.hl = value;
                break;
            }
            case 0x22: { // ld (nnnn),hl
                let value;
                value = z80.regs.hl;
                let addr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                addr = word(z80.readByte(z80.regs.pc), addr);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.writeByte(addr, lo(value));
                addr = inc16(addr);
                z80.regs.memptr = addr;
                z80.writeByte(addr, hi(value));
                break;
            }
            case 0x23: { // inc hl
                let value;
                value = z80.regs.hl;
                value = inc16(value);
                z80.regs.hl = value;
                break;
            }
            case 0x24: { // inc h
                let value;
                value = z80.regs.h;
                value = inc8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x80 ? Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : Flag.H) | z80.sz53Table[value];
                z80.regs.h = value;
                break;
            }
            case 0x25: { // dec h
                let value;
                value = z80.regs.h;
                const oldValue = value;
                value = dec8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x7F ? Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : Flag.H) | Flag.N | z80.sz53Table[value];
                z80.regs.h = value;
                break;
            }
            case 0x26: { // ld h,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.h = value;
                break;
            }
            case 0x27: { // daa
                let value = 0;
                let carry = z80.regs.f & Flag.C;
                if ((z80.regs.f & Flag.H) !== 0 || ((z80.regs.a & 0x0F) > 9)) {
                    value = 6; // Skip over hex digits in lower nybble.
                }
                if (carry !== 0 || z80.regs.a > 0x99) {
                    value |= 0x60; // Skip over hex digits in upper nybble.
                }
                if (z80.regs.a > 0x99) {
                    carry = Flag.C;
                }
                if ((z80.regs.f & Flag.N) !== 0) {
                    let result = sub16(z80.regs.a, value);
                    const lookup = (((z80.regs.a & 0x88) >> 3) |
                        ((value & 0x88) >> 2) |
                        ((result & 0x88) >> 1)) & 0xFF;
                    z80.regs.a = result & 0xFF;
                    z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                }
                else {
                    let result = add16(z80.regs.a, value);
                    const lookup = (((z80.regs.a & 0x88) >> 3) |
                        ((value & 0x88) >> 2) |
                        ((result & 0x88) >> 1)) & 0xFF;
                    z80.regs.a = result & 0xFF;
                    z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                }
                z80.regs.f = (z80.regs.f & ~(Flag.C | Flag.P)) | carry | z80.parityTable[z80.regs.a];
                break;
            }
            case 0x28: { // jr z,offset
                if ((z80.regs.f & Flag.Z) !== 0) {
                    const offset = z80.readByte(z80.regs.pc);
                    z80.incTStateCount(5);
                    z80.regs.pc = add16(z80.regs.pc, signedByte(offset));
                    z80.regs.pc = inc16(z80.regs.pc);
                    z80.regs.memptr = z80.regs.pc;
                }
                else {
                    z80.incTStateCount(3);
                    z80.regs.pc = inc16(z80.regs.pc);
                }
                break;
            }
            case 0x29: { // add hl,hl
                let value;
                z80.incTStateCount(7);
                value = z80.regs.hl;
                let result = z80.regs.hl + value;
                const lookup = (((z80.regs.hl & 0x0800) >> 11) |
                    ((value & 0x0800) >> 10) |
                    ((result & 0x0800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.hl);
                z80.regs.hl = result & 0xFFFF;
                z80.regs.f = (z80.regs.f & (Flag.V | Flag.Z | Flag.S)) | ((result & 0x10000) !== 0 ? Flag.C : 0) | ((result >> 8) & (Flag.X3 | Flag.X5)) | halfCarryAddTable[lookup];
                break;
            }
            case 0x2A: { // ld hl,(nnnn)
                let value;
                let addr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                addr = word(z80.readByte(z80.regs.pc), addr);
                z80.regs.pc = inc16(z80.regs.pc);
                value = z80.readByte(addr);
                z80.regs.memptr = inc16(addr);
                value = word(z80.readByte(z80.regs.memptr), value);
                z80.regs.hl = value;
                break;
            }
            case 0x2B: { // dec hl
                let value;
                value = z80.regs.hl;
                value = dec16(value);
                z80.regs.hl = value;
                break;
            }
            case 0x2C: { // inc l
                let value;
                value = z80.regs.l;
                value = inc8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x80 ? Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : Flag.H) | z80.sz53Table[value];
                z80.regs.l = value;
                break;
            }
            case 0x2D: { // dec l
                let value;
                value = z80.regs.l;
                const oldValue = value;
                value = dec8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x7F ? Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : Flag.H) | Flag.N | z80.sz53Table[value];
                z80.regs.l = value;
                break;
            }
            case 0x2E: { // ld l,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.l = value;
                break;
            }
            case 0x2F: { // cpl
                z80.regs.a ^= 0xFF;
                z80.regs.f = (z80.regs.f & (Flag.C | Flag.P | Flag.Z | Flag.S)) | (z80.regs.a & (Flag.X3 | Flag.X5)) | Flag.N | Flag.H;
                break;
            }
            case 0x30: { // jr nc,offset
                if ((z80.regs.f & Flag.C) === 0) {
                    const offset = z80.readByte(z80.regs.pc);
                    z80.incTStateCount(5);
                    z80.regs.pc = add16(z80.regs.pc, signedByte(offset));
                    z80.regs.pc = inc16(z80.regs.pc);
                    z80.regs.memptr = z80.regs.pc;
                }
                else {
                    z80.incTStateCount(3);
                    z80.regs.pc = inc16(z80.regs.pc);
                }
                break;
            }
            case 0x31: { // ld sp,nnnn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                value = word(z80.readByte(z80.regs.pc), value);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.sp = value;
                break;
            }
            case 0x32: { // ld (nnnn),a
                let value;
                value = z80.regs.a;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                value = word(z80.readByte(z80.regs.pc), value);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.regs.a, inc16(value));
                z80.writeByte(value, z80.regs.a);
                break;
            }
            case 0x33: { // inc sp
                let value;
                value = z80.regs.sp;
                value = inc16(value);
                z80.regs.sp = value;
                break;
            }
            case 0x34: { // inc (hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                value = inc8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x80 ? Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : Flag.H) | z80.sz53Table[value];
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x35: { // dec (hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.incTStateCount(1);
                const oldValue = value;
                value = dec8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x7F ? Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : Flag.H) | Flag.N | z80.sz53Table[value];
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x36: { // ld (hl),nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x37: { // scf
                z80.regs.f = (z80.regs.f & (Flag.P | Flag.Z | Flag.S)) | Flag.C | (z80.regs.a & (Flag.X3 | Flag.X5));
                break;
            }
            case 0x38: { // jr c,offset
                if ((z80.regs.f & Flag.C) !== 0) {
                    const offset = z80.readByte(z80.regs.pc);
                    z80.incTStateCount(5);
                    z80.regs.pc = add16(z80.regs.pc, signedByte(offset));
                    z80.regs.pc = inc16(z80.regs.pc);
                    z80.regs.memptr = z80.regs.pc;
                }
                else {
                    z80.incTStateCount(3);
                    z80.regs.pc = inc16(z80.regs.pc);
                }
                break;
            }
            case 0x39: { // add hl,sp
                let value;
                z80.incTStateCount(7);
                value = z80.regs.sp;
                let result = z80.regs.hl + value;
                const lookup = (((z80.regs.hl & 0x0800) >> 11) |
                    ((value & 0x0800) >> 10) |
                    ((result & 0x0800) >> 9)) & 0xFF;
                z80.regs.memptr = inc16(z80.regs.hl);
                z80.regs.hl = result & 0xFFFF;
                z80.regs.f = (z80.regs.f & (Flag.V | Flag.Z | Flag.S)) | ((result & 0x10000) !== 0 ? Flag.C : 0) | ((result >> 8) & (Flag.X3 | Flag.X5)) | halfCarryAddTable[lookup];
                break;
            }
            case 0x3A: { // ld a,(nnnn)
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                value = word(z80.readByte(z80.regs.pc), value);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = inc16(value);
                value = z80.readByte(value);
                z80.regs.a = value;
                break;
            }
            case 0x3B: { // dec sp
                let value;
                value = z80.regs.sp;
                value = dec16(value);
                z80.regs.sp = value;
                break;
            }
            case 0x3C: { // inc a
                let value;
                value = z80.regs.a;
                value = inc8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x80 ? Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : Flag.H) | z80.sz53Table[value];
                z80.regs.a = value;
                break;
            }
            case 0x3D: { // dec a
                let value;
                value = z80.regs.a;
                const oldValue = value;
                value = dec8(value);
                z80.regs.f = (z80.regs.f & Flag.C) | (value === 0x7F ? Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : Flag.H) | Flag.N | z80.sz53Table[value];
                z80.regs.a = value;
                break;
            }
            case 0x3E: { // ld a,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.a = value;
                break;
            }
            case 0x3F: { // ccf
                z80.regs.f = (z80.regs.f & (Flag.P | Flag.Z | Flag.S)) | ((z80.regs.f & Flag.C) !== 0 ? Flag.H : Flag.C) | (z80.regs.a & (Flag.X3 | Flag.X5));
                break;
            }
            case 0x40: { // ld b,b
                let value;
                value = z80.regs.b;
                z80.regs.b = value;
                break;
            }
            case 0x41: { // ld b,c
                let value;
                value = z80.regs.c;
                z80.regs.b = value;
                break;
            }
            case 0x42: { // ld b,d
                let value;
                value = z80.regs.d;
                z80.regs.b = value;
                break;
            }
            case 0x43: { // ld b,e
                let value;
                value = z80.regs.e;
                z80.regs.b = value;
                break;
            }
            case 0x44: { // ld b,h
                let value;
                value = z80.regs.h;
                z80.regs.b = value;
                break;
            }
            case 0x45: { // ld b,l
                let value;
                value = z80.regs.l;
                z80.regs.b = value;
                break;
            }
            case 0x46: { // ld b,(hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.regs.b = value;
                break;
            }
            case 0x47: { // ld b,a
                let value;
                value = z80.regs.a;
                z80.regs.b = value;
                break;
            }
            case 0x48: { // ld c,b
                let value;
                value = z80.regs.b;
                z80.regs.c = value;
                break;
            }
            case 0x49: { // ld c,c
                let value;
                value = z80.regs.c;
                z80.regs.c = value;
                break;
            }
            case 0x4A: { // ld c,d
                let value;
                value = z80.regs.d;
                z80.regs.c = value;
                break;
            }
            case 0x4B: { // ld c,e
                let value;
                value = z80.regs.e;
                z80.regs.c = value;
                break;
            }
            case 0x4C: { // ld c,h
                let value;
                value = z80.regs.h;
                z80.regs.c = value;
                break;
            }
            case 0x4D: { // ld c,l
                let value;
                value = z80.regs.l;
                z80.regs.c = value;
                break;
            }
            case 0x4E: { // ld c,(hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.regs.c = value;
                break;
            }
            case 0x4F: { // ld c,a
                let value;
                value = z80.regs.a;
                z80.regs.c = value;
                break;
            }
            case 0x50: { // ld d,b
                let value;
                value = z80.regs.b;
                z80.regs.d = value;
                break;
            }
            case 0x51: { // ld d,c
                let value;
                value = z80.regs.c;
                z80.regs.d = value;
                break;
            }
            case 0x52: { // ld d,d
                let value;
                value = z80.regs.d;
                z80.regs.d = value;
                break;
            }
            case 0x53: { // ld d,e
                let value;
                value = z80.regs.e;
                z80.regs.d = value;
                break;
            }
            case 0x54: { // ld d,h
                let value;
                value = z80.regs.h;
                z80.regs.d = value;
                break;
            }
            case 0x55: { // ld d,l
                let value;
                value = z80.regs.l;
                z80.regs.d = value;
                break;
            }
            case 0x56: { // ld d,(hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.regs.d = value;
                break;
            }
            case 0x57: { // ld d,a
                let value;
                value = z80.regs.a;
                z80.regs.d = value;
                break;
            }
            case 0x58: { // ld e,b
                let value;
                value = z80.regs.b;
                z80.regs.e = value;
                break;
            }
            case 0x59: { // ld e,c
                let value;
                value = z80.regs.c;
                z80.regs.e = value;
                break;
            }
            case 0x5A: { // ld e,d
                let value;
                value = z80.regs.d;
                z80.regs.e = value;
                break;
            }
            case 0x5B: { // ld e,e
                let value;
                value = z80.regs.e;
                z80.regs.e = value;
                break;
            }
            case 0x5C: { // ld e,h
                let value;
                value = z80.regs.h;
                z80.regs.e = value;
                break;
            }
            case 0x5D: { // ld e,l
                let value;
                value = z80.regs.l;
                z80.regs.e = value;
                break;
            }
            case 0x5E: { // ld e,(hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.regs.e = value;
                break;
            }
            case 0x5F: { // ld e,a
                let value;
                value = z80.regs.a;
                z80.regs.e = value;
                break;
            }
            case 0x60: { // ld h,b
                let value;
                value = z80.regs.b;
                z80.regs.h = value;
                break;
            }
            case 0x61: { // ld h,c
                let value;
                value = z80.regs.c;
                z80.regs.h = value;
                break;
            }
            case 0x62: { // ld h,d
                let value;
                value = z80.regs.d;
                z80.regs.h = value;
                break;
            }
            case 0x63: { // ld h,e
                let value;
                value = z80.regs.e;
                z80.regs.h = value;
                break;
            }
            case 0x64: { // ld h,h
                let value;
                value = z80.regs.h;
                z80.regs.h = value;
                break;
            }
            case 0x65: { // ld h,l
                let value;
                value = z80.regs.l;
                z80.regs.h = value;
                break;
            }
            case 0x66: { // ld h,(hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.regs.h = value;
                break;
            }
            case 0x67: { // ld h,a
                let value;
                value = z80.regs.a;
                z80.regs.h = value;
                break;
            }
            case 0x68: { // ld l,b
                let value;
                value = z80.regs.b;
                z80.regs.l = value;
                break;
            }
            case 0x69: { // ld l,c
                let value;
                value = z80.regs.c;
                z80.regs.l = value;
                break;
            }
            case 0x6A: { // ld l,d
                let value;
                value = z80.regs.d;
                z80.regs.l = value;
                break;
            }
            case 0x6B: { // ld l,e
                let value;
                value = z80.regs.e;
                z80.regs.l = value;
                break;
            }
            case 0x6C: { // ld l,h
                let value;
                value = z80.regs.h;
                z80.regs.l = value;
                break;
            }
            case 0x6D: { // ld l,l
                let value;
                value = z80.regs.l;
                z80.regs.l = value;
                break;
            }
            case 0x6E: { // ld l,(hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.regs.l = value;
                break;
            }
            case 0x6F: { // ld l,a
                let value;
                value = z80.regs.a;
                z80.regs.l = value;
                break;
            }
            case 0x70: { // ld (hl),b
                let value;
                value = z80.regs.b;
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x71: { // ld (hl),c
                let value;
                value = z80.regs.c;
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x72: { // ld (hl),d
                let value;
                value = z80.regs.d;
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x73: { // ld (hl),e
                let value;
                value = z80.regs.e;
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x74: { // ld (hl),h
                let value;
                value = z80.regs.h;
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x75: { // ld (hl),l
                let value;
                value = z80.regs.l;
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x76: { // halt
                z80.regs.halted = 1;
                z80.regs.pc = dec16(z80.regs.pc);
                break;
            }
            case 0x77: { // ld (hl),a
                let value;
                value = z80.regs.a;
                z80.writeByte(z80.regs.hl, value);
                break;
            }
            case 0x78: { // ld a,b
                let value;
                value = z80.regs.b;
                z80.regs.a = value;
                break;
            }
            case 0x79: { // ld a,c
                let value;
                value = z80.regs.c;
                z80.regs.a = value;
                break;
            }
            case 0x7A: { // ld a,d
                let value;
                value = z80.regs.d;
                z80.regs.a = value;
                break;
            }
            case 0x7B: { // ld a,e
                let value;
                value = z80.regs.e;
                z80.regs.a = value;
                break;
            }
            case 0x7C: { // ld a,h
                let value;
                value = z80.regs.h;
                z80.regs.a = value;
                break;
            }
            case 0x7D: { // ld a,l
                let value;
                value = z80.regs.l;
                z80.regs.a = value;
                break;
            }
            case 0x7E: { // ld a,(hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.regs.a = value;
                break;
            }
            case 0x7F: { // ld a,a
                let value;
                value = z80.regs.a;
                z80.regs.a = value;
                break;
            }
            case 0x80: { // add a,b
                let value;
                value = z80.regs.b;
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x81: { // add a,c
                let value;
                value = z80.regs.c;
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x82: { // add a,d
                let value;
                value = z80.regs.d;
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x83: { // add a,e
                let value;
                value = z80.regs.e;
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x84: { // add a,h
                let value;
                value = z80.regs.h;
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x85: { // add a,l
                let value;
                value = z80.regs.l;
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x86: { // add a,(hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x87: { // add a,a
                let value;
                value = z80.regs.a;
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x88: { // adc a,b
                let value;
                value = z80.regs.b;
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x89: { // adc a,c
                let value;
                value = z80.regs.c;
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x8A: { // adc a,d
                let value;
                value = z80.regs.d;
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x8B: { // adc a,e
                let value;
                value = z80.regs.e;
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x8C: { // adc a,h
                let value;
                value = z80.regs.h;
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x8D: { // adc a,l
                let value;
                value = z80.regs.l;
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x8E: { // adc a,(hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x8F: { // adc a,a
                let value;
                value = z80.regs.a;
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x90: { // sub a,b
                let value;
                value = z80.regs.b;
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x91: { // sub a,c
                let value;
                value = z80.regs.c;
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x92: { // sub a,d
                let value;
                value = z80.regs.d;
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x93: { // sub a,e
                let value;
                value = z80.regs.e;
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x94: { // sub a,h
                let value;
                value = z80.regs.h;
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x95: { // sub a,l
                let value;
                value = z80.regs.l;
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x96: { // sub a,(hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x97: { // sub a,a
                let value;
                value = z80.regs.a;
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x98: { // sbc a,b
                let value;
                value = z80.regs.b;
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x99: { // sbc a,c
                let value;
                value = z80.regs.c;
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x9A: { // sbc a,d
                let value;
                value = z80.regs.d;
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x9B: { // sbc a,e
                let value;
                value = z80.regs.e;
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x9C: { // sbc a,h
                let value;
                value = z80.regs.h;
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x9D: { // sbc a,l
                let value;
                value = z80.regs.l;
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x9E: { // sbc a,(hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0x9F: { // sbc a,a
                let value;
                value = z80.regs.a;
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0xA0: { // and a,b
                let value;
                value = z80.regs.b;
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xA1: { // and a,c
                let value;
                value = z80.regs.c;
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xA2: { // and a,d
                let value;
                value = z80.regs.d;
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xA3: { // and a,e
                let value;
                value = z80.regs.e;
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xA4: { // and a,h
                let value;
                value = z80.regs.h;
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xA5: { // and a,l
                let value;
                value = z80.regs.l;
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xA6: { // and a,(hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xA7: { // and a,a
                let value;
                value = z80.regs.a;
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xA8: { // xor a,b
                let value;
                value = z80.regs.b;
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xA9: { // xor a,c
                let value;
                value = z80.regs.c;
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xAA: { // xor a,d
                let value;
                value = z80.regs.d;
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xAB: { // xor a,e
                let value;
                value = z80.regs.e;
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xAC: { // xor a,h
                let value;
                value = z80.regs.h;
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xAD: { // xor a,l
                let value;
                value = z80.regs.l;
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xAE: { // xor a,(hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xAF: { // xor a,a
                let value;
                value = z80.regs.a;
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB0: { // or a,b
                let value;
                value = z80.regs.b;
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB1: { // or a,c
                let value;
                value = z80.regs.c;
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB2: { // or a,d
                let value;
                value = z80.regs.d;
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB3: { // or a,e
                let value;
                value = z80.regs.e;
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB4: { // or a,h
                let value;
                value = z80.regs.h;
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB5: { // or a,l
                let value;
                value = z80.regs.l;
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB6: { // or a,(hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB7: { // or a,a
                let value;
                value = z80.regs.a;
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xB8: { // cp b
                let value;
                value = z80.regs.b;
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xB9: { // cp c
                let value;
                value = z80.regs.c;
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xBA: { // cp d
                let value;
                value = z80.regs.d;
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xBB: { // cp e
                let value;
                value = z80.regs.e;
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xBC: { // cp h
                let value;
                value = z80.regs.h;
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xBD: { // cp l
                let value;
                value = z80.regs.l;
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xBE: { // cp (hl)
                let value;
                value = z80.readByte(z80.regs.hl);
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xBF: { // cp a
                let value;
                value = z80.regs.a;
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xC0: { // ret nz
                z80.incTStateCount(1);
                if ((z80.regs.f & Flag.Z) === 0) {
                    z80.regs.pc = z80.popWord();
                    z80.regs.memptr = z80.regs.pc;
                }
                break;
            }
            case 0xC1: { // pop bc
                z80.regs.bc = z80.popWord();
                break;
            }
            case 0xC2: { // jp nz,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.Z) === 0) {
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xC3: { // jp nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.pc = z80.regs.memptr;
                break;
            }
            case 0xC4: { // call nz,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.Z) === 0) {
                    z80.pushWord(z80.regs.pc);
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xC5: { // push bc
                z80.pushWord(z80.regs.bc);
                break;
            }
            case 0xC6: { // add a,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let result = add16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0xC7: { // rst 00
                z80.incTStateCount(1);
                z80.pushWord(z80.regs.pc);
                z80.regs.pc = 0x0000;
                z80.regs.memptr = z80.regs.pc;
                break;
            }
            case 0xC8: { // ret z
                z80.incTStateCount(1);
                if ((z80.regs.f & Flag.Z) !== 0) {
                    z80.regs.pc = z80.popWord();
                    z80.regs.memptr = z80.regs.pc;
                }
                break;
            }
            case 0xC9: { // ret
                z80.incTStateCount(1);
                z80.regs.pc = z80.popWord();
                z80.regs.memptr = z80.regs.pc;
                break;
            }
            case 0xCA: { // jp z,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.Z) !== 0) {
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xCB: { // shift cb
                decodeCB(z80);
                break;
            }
            case 0xCC: { // call z,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.Z) !== 0) {
                    z80.pushWord(z80.regs.pc);
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xCD: { // call nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.pushWord(z80.regs.pc);
                z80.regs.pc = z80.regs.memptr;
                break;
            }
            case 0xCE: { // adc a,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let result = add16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = inc16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0xCF: { // rst 8
                z80.incTStateCount(1);
                z80.pushWord(z80.regs.pc);
                z80.regs.pc = 0x0008;
                z80.regs.memptr = z80.regs.pc;
                break;
            }
            case 0xD0: { // ret nc
                z80.incTStateCount(1);
                if ((z80.regs.f & Flag.C) === 0) {
                    z80.regs.pc = z80.popWord();
                    z80.regs.memptr = z80.regs.pc;
                }
                break;
            }
            case 0xD1: { // pop de
                z80.regs.de = z80.popWord();
                break;
            }
            case 0xD2: { // jp nc,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.C) === 0) {
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xD3: { // out (nn),a
                const port = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.regs.a, inc8(port));
                z80.writePort(word(z80.regs.a, port), z80.regs.a);
                break;
            }
            case 0xD4: { // call nc,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.C) === 0) {
                    z80.pushWord(z80.regs.pc);
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xD5: { // push de
                z80.pushWord(z80.regs.de);
                break;
            }
            case 0xD6: { // sub a,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let result = sub16(z80.regs.a, value);
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0xD7: { // rst 10
                z80.incTStateCount(1);
                z80.pushWord(z80.regs.pc);
                z80.regs.pc = 0x0010;
                z80.regs.memptr = z80.regs.pc;
                break;
            }
            case 0xD8: { // ret c
                z80.incTStateCount(1);
                if ((z80.regs.f & Flag.C) !== 0) {
                    z80.regs.pc = z80.popWord();
                    z80.regs.memptr = z80.regs.pc;
                }
                break;
            }
            case 0xD9: { // exx
                let tmp;
                tmp = z80.regs.bc;
                z80.regs.bc = z80.regs.bcPrime;
                z80.regs.bcPrime = tmp;
                tmp = z80.regs.de;
                z80.regs.de = z80.regs.dePrime;
                z80.regs.dePrime = tmp;
                tmp = z80.regs.hl;
                z80.regs.hl = z80.regs.hlPrime;
                z80.regs.hlPrime = tmp;
                break;
            }
            case 0xDA: { // jp c,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.C) !== 0) {
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xDB: { // in a,(nn)
                const port = word(z80.regs.a, z80.readByte(z80.regs.pc));
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.a = z80.readPort(port);
                z80.regs.memptr = inc16(port);
                break;
            }
            case 0xDC: { // call c,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.C) !== 0) {
                    z80.pushWord(z80.regs.pc);
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xDD: { // shift dd
                decodeDD(z80);
                break;
            }
            case 0xDE: { // sbc a,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                let result = sub16(z80.regs.a, value);
                if ((z80.regs.f & Flag.C) !== 0) {
                    result = dec16(result);
                }
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((result & 0x88) >> 1)) & 0xFF;
                z80.regs.a = result & 0xFF;
                z80.regs.f = (((result & 0x100) !== 0) ? Flag.C : 0) | Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
                break;
            }
            case 0xDF: { // rst 18
                z80.incTStateCount(1);
                z80.pushWord(z80.regs.pc);
                z80.regs.pc = 0x0018;
                z80.regs.memptr = z80.regs.pc;
                break;
            }
            case 0xE0: { // ret po
                z80.incTStateCount(1);
                if ((z80.regs.f & Flag.P) === 0) {
                    z80.regs.pc = z80.popWord();
                    z80.regs.memptr = z80.regs.pc;
                }
                break;
            }
            case 0xE1: { // pop hl
                z80.regs.hl = z80.popWord();
                break;
            }
            case 0xE2: { // jp po,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.P) === 0) {
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xE3: { // ex (sp),hl
                const rightValue = z80.regs.hl;
                const leftValueL = z80.readByte(z80.regs.sp);
                const leftValueH = z80.readByte(inc16(z80.regs.sp));
                z80.incTStateCount(1);
                z80.writeByte(inc16(z80.regs.sp), hi(rightValue));
                z80.writeByte(z80.regs.sp, lo(rightValue));
                z80.incTStateCount(2);
                z80.regs.memptr = word(leftValueH, leftValueL);
                z80.regs.hl = word(leftValueH, leftValueL);
                break;
            }
            case 0xE4: { // call po,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.P) === 0) {
                    z80.pushWord(z80.regs.pc);
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xE5: { // push hl
                z80.pushWord(z80.regs.hl);
                break;
            }
            case 0xE6: { // and nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.a &= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                z80.regs.f |= Flag.H;
                break;
            }
            case 0xE7: { // rst 20
                z80.incTStateCount(1);
                z80.pushWord(z80.regs.pc);
                z80.regs.pc = 0x0020;
                z80.regs.memptr = z80.regs.pc;
                break;
            }
            case 0xE8: { // ret pe
                z80.incTStateCount(1);
                if ((z80.regs.f & Flag.P) !== 0) {
                    z80.regs.pc = z80.popWord();
                    z80.regs.memptr = z80.regs.pc;
                }
                break;
            }
            case 0xE9: { // jp hl
                z80.regs.pc = z80.regs.hl;
                break;
            }
            case 0xEA: { // jp pe,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.P) !== 0) {
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xEB: { // ex de,hl
                const rightValue = z80.regs.hl;
                z80.regs.hl = z80.regs.de;
                z80.regs.de = rightValue;
                break;
            }
            case 0xEC: { // call pe,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.P) !== 0) {
                    z80.pushWord(z80.regs.pc);
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xED: { // shift ed
                decodeED(z80);
                break;
            }
            case 0xEE: { // xor a,nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.a ^= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xEF: { // rst 28
                z80.incTStateCount(1);
                z80.pushWord(z80.regs.pc);
                z80.regs.pc = 0x0028;
                z80.regs.memptr = z80.regs.pc;
                break;
            }
            case 0xF0: { // ret p
                z80.incTStateCount(1);
                if ((z80.regs.f & Flag.S) === 0) {
                    z80.regs.pc = z80.popWord();
                    z80.regs.memptr = z80.regs.pc;
                }
                break;
            }
            case 0xF1: { // pop af
                z80.regs.af = z80.popWord();
                break;
            }
            case 0xF2: { // jp p,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.S) === 0) {
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xF3: { // di
                z80.regs.iff1 = 0;
                z80.regs.iff2 = 0;
                break;
            }
            case 0xF4: { // call p,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.S) === 0) {
                    z80.pushWord(z80.regs.pc);
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xF5: { // push af
                z80.pushWord(z80.regs.af);
                break;
            }
            case 0xF6: { // or nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.a |= value;
                z80.regs.f = z80.sz53pTable[z80.regs.a];
                break;
            }
            case 0xF7: { // rst 30
                z80.incTStateCount(1);
                z80.pushWord(z80.regs.pc);
                z80.regs.pc = 0x0030;
                z80.regs.memptr = z80.regs.pc;
                break;
            }
            case 0xF8: { // ret m
                z80.incTStateCount(1);
                if ((z80.regs.f & Flag.S) !== 0) {
                    z80.regs.pc = z80.popWord();
                    z80.regs.memptr = z80.regs.pc;
                }
                break;
            }
            case 0xF9: { // ld sp,hl
                let value;
                value = z80.regs.hl;
                z80.regs.sp = value;
                break;
            }
            case 0xFA: { // jp m,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.S) !== 0) {
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xFB: { // ei
                z80.regs.iff1 = 1;
                z80.regs.iff2 = 1;
                break;
            }
            case 0xFC: { // call m,nnnn
                z80.regs.memptr = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                z80.regs.memptr = word(z80.readByte(z80.regs.pc), z80.regs.memptr);
                z80.regs.pc = inc16(z80.regs.pc);
                if ((z80.regs.f & Flag.S) !== 0) {
                    z80.pushWord(z80.regs.pc);
                    z80.regs.pc = z80.regs.memptr;
                }
                break;
            }
            case 0xFD: { // shift fd
                decodeFD(z80);
                break;
            }
            case 0xFE: { // cp nn
                let value;
                value = z80.readByte(z80.regs.pc);
                z80.regs.pc = inc16(z80.regs.pc);
                const diff = (z80.regs.a - value) & 0xFFFF;
                const lookup = (((z80.regs.a & 0x88) >> 3) |
                    ((value & 0x88) >> 2) |
                    ((diff & 0x88) >> 1)) & 0xFF;
                let f = Flag.N;
                if ((diff & 0x100) != 0)
                    f |= Flag.C;
                if (diff == 0)
                    f |= Flag.Z;
                f |= halfCarrySubTable[lookup & 0x07];
                f |= overflowSubTable[lookup >> 4];
                f |= value & (Flag.X3 | Flag.X5);
                f |= diff & Flag.S;
                z80.regs.af = word(z80.regs.a, f);
                break;
            }
            case 0xFF: { // rst 38
                z80.incTStateCount(1);
                z80.pushWord(z80.regs.pc);
                z80.regs.pc = 0x0038;
                z80.regs.memptr = z80.regs.pc;
                break;
            }
            default:
                console.log("Unhandled opcode " + toHex(inst, 2));
                break;
        }
    }
    //# sourceMappingURL=Decode.js.map

    /**
     * Emulated Z80 processor.
     */
    class Z80 {
        constructor(hal) {
            /**
             * Full set of registers.
             */
            this.regs = new RegisterSet();
            /**
             * Tables for computing flags. Public so that the decoding function
             * can access them.
             */
            this.sz53Table = []; /* The S, Z, 5 and 3 bits of the index */
            this.parityTable = []; /* The parity of the lookup value */
            this.sz53pTable = []; /* OR the above two tables together */
            this.hal = hal;
            this.initTables();
        }
        /**
         * Reset the Z80 to a known state.
         */
        reset() {
            this.regs = new RegisterSet();
        }
        /**
         * Execute one instruction.
         */
        step() {
            decode(this);
        }
        /**
         * Increment the clock count.
         */
        incTStateCount(count) {
            this.hal.tStateCount += count;
        }
        /**
         * Interrupt the CPU with a maskable interrupt
         */
        maskableInterrupt() {
            if (this.regs.iff1 !== 0) {
                this.interrupt(true);
            }
        }
        /**
         * Interrupt the CPU with a non-maskable interrupt
         */
        nonMaskableInterrupt() {
            this.interrupt(false);
        }
        /**
         * Read a byte from memory, taking as many clock cycles as necessary.
         */
        readByte(address) {
            this.incTStateCount(3);
            return this.readByteInternal(address);
        }
        /**
         * Reads a word at the specified address. Reads the low byte first.
         */
        readWord(address) {
            const lowByte = this.readByte(address);
            const highByte = this.readByte(address + 1);
            return word(highByte, lowByte);
        }
        /**
         * Read a byte from memory (not affecting clock).
         */
        readByteInternal(address) {
            return this.hal.readMemory(address);
        }
        /**
         * Write a byte to memory, taking as many clock cycles as necessary.
         */
        writeByte(address, value) {
            this.incTStateCount(3);
            this.writeByteInternal(address, value);
        }
        /**
         * Write a byte to memory (not affecting clock).
         */
        writeByteInternal(address, value) {
            this.hal.writeMemory(address, value);
        }
        /**
         * Write a byte to a port, taking as many clock cycles as necessary.
         */
        writePort(address, value) {
            this.incTStateCount(1);
            this.hal.writePort(address, value);
            this.incTStateCount(3);
        }
        /**
         * Read a byte from a port, taking as many clock cycles as necessary.
         */
        readPort(address) {
            this.incTStateCount(1);
            const value = this.hal.readPort(address);
            this.incTStateCount(3);
            return value;
        }
        /**
         * Push a word on the stack.
         */
        pushWord(value) {
            this.pushByte(hi(value));
            this.pushByte(lo(value));
        }
        /**
         * Push a byte on the stack.
         */
        pushByte(value) {
            this.regs.sp = (this.regs.sp - 1) & 0xFFFF;
            this.writeByte(this.regs.sp, value);
        }
        /**
         * Pop a word from the stack.
         */
        popWord() {
            const lowByte = this.popByte();
            const highByte = this.popByte();
            return word(highByte, lowByte);
        }
        /**
         * Pop a byte from the stack.
         */
        popByte() {
            const value = this.readByte(this.regs.sp);
            this.regs.sp = inc16(this.regs.sp);
            return value;
        }
        /**
         * Process either kind of interrupt. If maskable, assumes that
         * the mask has already been checked.
         */
        interrupt(maskable) {
            if (this.regs.halted) {
                // Skip past HALT instruction.
                this.regs.pc++;
                this.regs.halted = 0;
            }
            this.incTStateCount(7);
            this.regs.r += 1;
            this.regs.iff1 = 0;
            this.regs.iff2 = 0;
            this.pushWord(this.regs.pc);
            if (maskable) {
                switch (this.regs.im) {
                    case 0:
                    case 1:
                        this.regs.pc = 0x0038;
                        break;
                    case 2: {
                        // The LSB here is taken from the data bus, so it's
                        // unpredictable. We use 0xFF but any value would do.
                        const address = word(this.regs.i, 0xFF);
                        this.regs.pc = this.readWord(address);
                        break;
                    }
                    default:
                        throw new Error("Unknown im mode " + this.regs.im);
                }
            }
            else {
                this.regs.pc = 0x0066;
            }
        }
        initTables() {
            for (let i = 0; i < 0x100; i++) {
                this.sz53Table.push(i & (Flag.X3 | Flag.X5 | Flag.S));
                let bits = i;
                let parity = 0;
                for (let bit = 0; bit < 8; bit++) {
                    parity ^= bits & 1;
                    bits >>= 1;
                }
                this.parityTable.push(parity ? 0 : Flag.P);
                this.sz53pTable.push(this.sz53Table[i] | this.parityTable[i]);
            }
            this.sz53Table[0] |= Flag.Z;
            this.sz53pTable[0] |= Flag.Z;
        }
    }
    //# sourceMappingURL=Z80.js.map

    // Handle keyboard mapping. The TRS-80 Model III keyboard has keys in different
    // places, so we must occasionally fake a Shift key being up or down when it's
    // really not.
    const BEGIN_ADDR = 0x3800;
    const END_ADDR = BEGIN_ADDR + 256;
    const KEY_DELAY_CLOCK_CYCLES = 50000;
    // Whether to force a Shift key, and how.
    var ShiftState;
    (function (ShiftState) {
        ShiftState[ShiftState["NEUTRAL"] = 0] = "NEUTRAL";
        ShiftState[ShiftState["FORCE_DOWN"] = 1] = "FORCE_DOWN";
        ShiftState[ShiftState["FORCE_UP"] = 2] = "FORCE_UP";
    })(ShiftState || (ShiftState = {}));
    // For each ASCII character or key we keep track of how to trigger it.
    class KeyInfo {
        constructor(byteIndex, bitNumber, shiftForce) {
            this.byteIndex = byteIndex;
            this.bitNumber = bitNumber;
            this.shiftForce = shiftForce;
        }
    }
    // A queued-up key.
    class KeyActivity {
        constructor(keyInfo, isPressed) {
            this.keyInfo = keyInfo;
            this.isPressed = isPressed;
        }
    }
    // Map from ASCII or special key to the info of which byte and bit it's mapped
    // to, and whether to force Shift.
    const keyMap = new Map();
    // http://www.trs-80.com/trs80-zaps-internals.htm#keyboard13
    keyMap.set("@", new KeyInfo(0, 0, ShiftState.FORCE_UP));
    keyMap.set("A", new KeyInfo(0, 1, ShiftState.FORCE_DOWN));
    keyMap.set("B", new KeyInfo(0, 2, ShiftState.FORCE_DOWN));
    keyMap.set("C", new KeyInfo(0, 3, ShiftState.FORCE_DOWN));
    keyMap.set("D", new KeyInfo(0, 4, ShiftState.FORCE_DOWN));
    keyMap.set("E", new KeyInfo(0, 5, ShiftState.FORCE_DOWN));
    keyMap.set("F", new KeyInfo(0, 6, ShiftState.FORCE_DOWN));
    keyMap.set("G", new KeyInfo(0, 7, ShiftState.FORCE_DOWN));
    keyMap.set("H", new KeyInfo(1, 0, ShiftState.FORCE_DOWN));
    keyMap.set("I", new KeyInfo(1, 1, ShiftState.FORCE_DOWN));
    keyMap.set("J", new KeyInfo(1, 2, ShiftState.FORCE_DOWN));
    keyMap.set("K", new KeyInfo(1, 3, ShiftState.FORCE_DOWN));
    keyMap.set("L", new KeyInfo(1, 4, ShiftState.FORCE_DOWN));
    keyMap.set("M", new KeyInfo(1, 5, ShiftState.FORCE_DOWN));
    keyMap.set("N", new KeyInfo(1, 6, ShiftState.FORCE_DOWN));
    keyMap.set("O", new KeyInfo(1, 7, ShiftState.FORCE_DOWN));
    keyMap.set("P", new KeyInfo(2, 0, ShiftState.FORCE_DOWN));
    keyMap.set("Q", new KeyInfo(2, 1, ShiftState.FORCE_DOWN));
    keyMap.set("R", new KeyInfo(2, 2, ShiftState.FORCE_DOWN));
    keyMap.set("S", new KeyInfo(2, 3, ShiftState.FORCE_DOWN));
    keyMap.set("T", new KeyInfo(2, 4, ShiftState.FORCE_DOWN));
    keyMap.set("U", new KeyInfo(2, 5, ShiftState.FORCE_DOWN));
    keyMap.set("V", new KeyInfo(2, 6, ShiftState.FORCE_DOWN));
    keyMap.set("W", new KeyInfo(2, 7, ShiftState.FORCE_DOWN));
    keyMap.set("X", new KeyInfo(3, 0, ShiftState.FORCE_DOWN));
    keyMap.set("Y", new KeyInfo(3, 1, ShiftState.FORCE_DOWN));
    keyMap.set("Z", new KeyInfo(3, 2, ShiftState.FORCE_DOWN));
    keyMap.set("a", new KeyInfo(0, 1, ShiftState.FORCE_UP));
    keyMap.set("b", new KeyInfo(0, 2, ShiftState.FORCE_UP));
    keyMap.set("c", new KeyInfo(0, 3, ShiftState.FORCE_UP));
    keyMap.set("d", new KeyInfo(0, 4, ShiftState.FORCE_UP));
    keyMap.set("e", new KeyInfo(0, 5, ShiftState.FORCE_UP));
    keyMap.set("f", new KeyInfo(0, 6, ShiftState.FORCE_UP));
    keyMap.set("g", new KeyInfo(0, 7, ShiftState.FORCE_UP));
    keyMap.set("h", new KeyInfo(1, 0, ShiftState.FORCE_UP));
    keyMap.set("i", new KeyInfo(1, 1, ShiftState.FORCE_UP));
    keyMap.set("j", new KeyInfo(1, 2, ShiftState.FORCE_UP));
    keyMap.set("k", new KeyInfo(1, 3, ShiftState.FORCE_UP));
    keyMap.set("l", new KeyInfo(1, 4, ShiftState.FORCE_UP));
    keyMap.set("m", new KeyInfo(1, 5, ShiftState.FORCE_UP));
    keyMap.set("n", new KeyInfo(1, 6, ShiftState.FORCE_UP));
    keyMap.set("o", new KeyInfo(1, 7, ShiftState.FORCE_UP));
    keyMap.set("p", new KeyInfo(2, 0, ShiftState.FORCE_UP));
    keyMap.set("q", new KeyInfo(2, 1, ShiftState.FORCE_UP));
    keyMap.set("r", new KeyInfo(2, 2, ShiftState.FORCE_UP));
    keyMap.set("s", new KeyInfo(2, 3, ShiftState.FORCE_UP));
    keyMap.set("t", new KeyInfo(2, 4, ShiftState.FORCE_UP));
    keyMap.set("u", new KeyInfo(2, 5, ShiftState.FORCE_UP));
    keyMap.set("v", new KeyInfo(2, 6, ShiftState.FORCE_UP));
    keyMap.set("w", new KeyInfo(2, 7, ShiftState.FORCE_UP));
    keyMap.set("x", new KeyInfo(3, 0, ShiftState.FORCE_UP));
    keyMap.set("y", new KeyInfo(3, 1, ShiftState.FORCE_UP));
    keyMap.set("z", new KeyInfo(3, 2, ShiftState.FORCE_UP));
    keyMap.set("0", new KeyInfo(4, 0, ShiftState.FORCE_UP));
    keyMap.set("1", new KeyInfo(4, 1, ShiftState.FORCE_UP));
    keyMap.set("2", new KeyInfo(4, 2, ShiftState.FORCE_UP));
    keyMap.set("3", new KeyInfo(4, 3, ShiftState.FORCE_UP));
    keyMap.set("4", new KeyInfo(4, 4, ShiftState.FORCE_UP));
    keyMap.set("5", new KeyInfo(4, 5, ShiftState.FORCE_UP));
    keyMap.set("6", new KeyInfo(4, 6, ShiftState.FORCE_UP));
    keyMap.set("7", new KeyInfo(4, 7, ShiftState.FORCE_UP));
    keyMap.set("8", new KeyInfo(5, 0, ShiftState.FORCE_UP));
    keyMap.set("9", new KeyInfo(5, 1, ShiftState.FORCE_UP));
    keyMap.set("`", new KeyInfo(4, 0, ShiftState.FORCE_DOWN)); // Simulate Shift-0.
    keyMap.set("!", new KeyInfo(4, 1, ShiftState.FORCE_DOWN));
    keyMap.set("\"", new KeyInfo(4, 2, ShiftState.FORCE_DOWN));
    keyMap.set("#", new KeyInfo(4, 3, ShiftState.FORCE_DOWN));
    keyMap.set("$", new KeyInfo(4, 4, ShiftState.FORCE_DOWN));
    keyMap.set("%", new KeyInfo(4, 5, ShiftState.FORCE_DOWN));
    keyMap.set("&", new KeyInfo(4, 6, ShiftState.FORCE_DOWN));
    keyMap.set("'", new KeyInfo(4, 7, ShiftState.FORCE_DOWN));
    keyMap.set("(", new KeyInfo(5, 0, ShiftState.FORCE_DOWN));
    keyMap.set(")", new KeyInfo(5, 1, ShiftState.FORCE_DOWN));
    keyMap.set(":", new KeyInfo(5, 2, ShiftState.FORCE_UP));
    keyMap.set(";", new KeyInfo(5, 3, ShiftState.FORCE_UP));
    keyMap.set(",", new KeyInfo(5, 4, ShiftState.FORCE_UP));
    keyMap.set("-", new KeyInfo(5, 5, ShiftState.FORCE_UP));
    keyMap.set(".", new KeyInfo(5, 6, ShiftState.FORCE_UP));
    keyMap.set("/", new KeyInfo(5, 7, ShiftState.FORCE_UP));
    keyMap.set("*", new KeyInfo(5, 2, ShiftState.FORCE_DOWN));
    keyMap.set("+", new KeyInfo(5, 3, ShiftState.FORCE_DOWN));
    keyMap.set("<", new KeyInfo(5, 4, ShiftState.FORCE_DOWN));
    keyMap.set("=", new KeyInfo(5, 5, ShiftState.FORCE_DOWN));
    keyMap.set(">", new KeyInfo(5, 6, ShiftState.FORCE_DOWN));
    keyMap.set("?", new KeyInfo(5, 7, ShiftState.FORCE_DOWN));
    keyMap.set("Enter", new KeyInfo(6, 0, ShiftState.NEUTRAL));
    keyMap.set("Tab", new KeyInfo(6, 1, ShiftState.NEUTRAL)); // Clear
    keyMap.set("Escape", new KeyInfo(6, 2, ShiftState.NEUTRAL)); // Break
    keyMap.set("ArrowUp", new KeyInfo(6, 3, ShiftState.NEUTRAL));
    keyMap.set("ArrowDown", new KeyInfo(6, 4, ShiftState.NEUTRAL));
    keyMap.set("ArrowLeft", new KeyInfo(6, 5, ShiftState.NEUTRAL));
    keyMap.set("Backspace", new KeyInfo(6, 5, ShiftState.NEUTRAL)); // Left arrow
    keyMap.set("ArrowRight", new KeyInfo(6, 6, ShiftState.NEUTRAL));
    keyMap.set(" ", new KeyInfo(6, 7, ShiftState.NEUTRAL));
    keyMap.set("Shift", new KeyInfo(7, 0, ShiftState.NEUTRAL));
    class Keyboard {
        constructor() {
            // We queue up keystrokes so that we don't overwhelm the ROM polling routines.
            this.keyQueue = [];
            // Whether browser keys should be intercepted.
            this.interceptKeys = false;
            this.keyProcessMinClock = 0;
            // 8 bytes, each a bitfield of keys currently pressed.
            this.keys = new Uint8Array(8);
            this.shiftForce = ShiftState.NEUTRAL;
        }
        static isInRange(address) {
            return address >= BEGIN_ADDR && address < END_ADDR;
        }
        // Release all keys.
        clearKeyboard() {
            this.keys.fill(0);
            this.shiftForce = ShiftState.NEUTRAL;
        }
        // Read a byte from the keyboard memory bank. This is an odd system where
        // bits in the address map to the various bytes, and you can read the OR'ed
        // addresses to read more than one byte at a time. This isn't used by the
        // ROM, I don't think. For the last byte we fake the Shift key if necessary.
        readKeyboard(addr, clock) {
            addr -= BEGIN_ADDR;
            let b = 0;
            // Dequeue if necessary.
            if (clock > this.keyProcessMinClock) {
                const keyWasPressed = this.processKeyQueue();
                if (keyWasPressed) {
                    this.keyProcessMinClock = clock + KEY_DELAY_CLOCK_CYCLES;
                }
            }
            // OR together the various bytes.
            for (let i = 0; i < this.keys.length; i++) {
                let keys = this.keys[i];
                if ((addr & (1 << i)) !== 0) {
                    if (i === 7) {
                        // Modify keys based on the shift force.
                        switch (this.shiftForce) {
                            case ShiftState.NEUTRAL:
                                // Nothing.
                                break;
                            case ShiftState.FORCE_UP:
                                // On the Model III the first two bits are left and right shift,
                                // though we don't handle the right shift anywhere.
                                keys &= ~0x03;
                                break;
                            case ShiftState.FORCE_DOWN:
                                keys |= 0x01;
                                break;
                        }
                    }
                    b |= keys;
                }
            }
            return b;
        }
        // Enqueue a key press or release.
        keyEvent(key, isPressed) {
            // Look up the key info.
            const keyInfo = keyMap.get(key);
            if (keyInfo === undefined) {
                // Meta is noisy.
                if (key !== "Meta") {
                    console.log("Unknown key \"" + key + "\"");
                }
            }
            else {
                // Append key to queue.
                this.keyQueue.push(new KeyActivity(keyInfo, isPressed));
            }
        }
        // Convert keys on the keyboard to ASCII letters or special strings like "Enter".
        configureKeyboard() {
            // Handle a key event by mapping it and sending it to the emulator.
            const keyEvent = (event, isPressed) => {
                // Don't do anything if we're not active.
                if (!this.interceptKeys) {
                    return;
                }
                // Don't send to virtual computer if a text input field is selected.
                // if ($(document.activeElement).attr("type") === "text") {
                //     return;
                // }
                // Don't interfere with browser keys.
                if (event.metaKey || event.ctrlKey) {
                    return;
                }
                const key = event.key;
                if (key !== "") {
                    this.keyEvent(key, isPressed);
                    event.preventDefault();
                }
            };
            const body = document.getElementsByTagName("body")[0];
            body.addEventListener("keydown", (event) => keyEvent(event, true));
            body.addEventListener("keyup", (event) => keyEvent(event, false));
            body.addEventListener("paste", (event) => {
                if (event.clipboardData) {
                    const pastedText = event.clipboardData.getData("text/plain");
                    if (pastedText) {
                        for (let ch of pastedText) {
                            if (ch === "\n" || ch === "\r") {
                                ch = "Enter";
                            }
                            this.keyEvent(ch, true);
                            this.keyEvent(ch, false);
                        }
                    }
                }
                event.preventDefault();
            });
        }
        // Dequeue the next key and set its bit. Return whether a key was processed.
        processKeyQueue() {
            const keyActivity = this.keyQueue.shift();
            if (keyActivity === undefined) {
                return false;
            }
            this.shiftForce = keyActivity.keyInfo.shiftForce;
            const bit = 1 << keyActivity.keyInfo.bitNumber;
            if (keyActivity.isPressed) {
                this.keys[keyActivity.keyInfo.byteIndex] |= bit;
            }
            else {
                this.keys[keyActivity.keyInfo.byteIndex] &= ~bit;
            }
            return true;
        }
    }
    //# sourceMappingURL=Keyboard.js.map

    const model1Level1Rom = `
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
`;
    //# sourceMappingURL=Model1Level1Rom.js.map

    const model1Level2Rom = `
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
`;
    //# sourceMappingURL=Model1Level2Rom.js.map

    const model3Rom = `
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
`;
    //# sourceMappingURL=Model3Rom.js.map

    const CSS_PREFIX = "trs80-emulator";
    // RAM address range of screen.
    const SCREEN_BEGIN = 15 * 1024;
    const SCREEN_END = 16 * 1024;
    /**
     * Remove all children from element.
     */
    function clearElement(e) {
        while (e.firstChild) {
            e.removeChild(e.firstChild);
        }
    }
    //# sourceMappingURL=Utils.js.map

    /**
     * The TRS-80 models we support.
     */
    var ModelType;
    (function (ModelType) {
        ModelType[ModelType["MODEL1"] = 0] = "MODEL1";
        ModelType[ModelType["MODEL3"] = 1] = "MODEL3";
    })(ModelType || (ModelType = {}));
    /**
     * The levels of Basic.
     */
    var BasicLevel;
    (function (BasicLevel) {
        BasicLevel[BasicLevel["LEVEL1"] = 0] = "LEVEL1";
        BasicLevel[BasicLevel["LEVEL2"] = 1] = "LEVEL2";
    })(BasicLevel || (BasicLevel = {}));
    /**
     * The character generator chip we support.
     */
    var CGChip;
    (function (CGChip) {
        CGChip[CGChip["ORIGINAL"] = 0] = "ORIGINAL";
        CGChip[CGChip["LOWER_CASE"] = 1] = "LOWER_CASE";
    })(CGChip || (CGChip = {}));
    /**
     * The amounts of RAM we support.
     */
    var RamSize;
    (function (RamSize) {
        RamSize[RamSize["RAM_4_KB"] = 0] = "RAM_4_KB";
        RamSize[RamSize["RAM_16_KB"] = 1] = "RAM_16_KB";
        RamSize[RamSize["RAM_32_KB"] = 2] = "RAM_32_KB";
        RamSize[RamSize["RAM_48_KB"] = 3] = "RAM_48_KB";
    })(RamSize || (RamSize = {}));
    /**
     * Phosphor color.
     */
    var Phosphor;
    (function (Phosphor) {
        Phosphor[Phosphor["WHITE"] = 0] = "WHITE";
        Phosphor[Phosphor["GREEN"] = 1] = "GREEN";
        Phosphor[Phosphor["AMBER"] = 2] = "AMBER";
    })(Phosphor || (Phosphor = {}));
    /**
     * Background color.
     */
    var Background;
    (function (Background) {
        Background[Background["BLACK"] = 0] = "BLACK";
        Background[Background["AUTHENTIC"] = 1] = "AUTHENTIC";
    })(Background || (Background = {}));
    /**
     * Whether to display scan lines.
     */
    var ScanLines;
    (function (ScanLines) {
        ScanLines[ScanLines["OFF"] = 0] = "OFF";
        ScanLines[ScanLines["ON"] = 1] = "ON";
    })(ScanLines || (ScanLines = {}));
    /**
     * A specific configuration of model and RAM.
     */
    class Config {
        constructor(modelType, basicLevel, cgChip, ramSize, phosphor, background, scanLines) {
            this.modelType = modelType;
            this.basicLevel = basicLevel;
            this.cgChip = cgChip;
            this.ramSize = ramSize;
            this.phosphor = phosphor;
            this.background = background;
            this.scanLines = scanLines;
        }
        withModelType(modelType) {
            return new Config(modelType, this.basicLevel, this.cgChip, this.ramSize, this.phosphor, this.background, this.scanLines);
        }
        withBasicLevel(basicLevel) {
            return new Config(this.modelType, basicLevel, this.cgChip, this.ramSize, this.phosphor, this.background, this.scanLines);
        }
        withCGChip(cgChip) {
            return new Config(this.modelType, this.basicLevel, cgChip, this.ramSize, this.phosphor, this.background, this.scanLines);
        }
        withRamSize(ramSize) {
            return new Config(this.modelType, this.basicLevel, this.cgChip, ramSize, this.phosphor, this.background, this.scanLines);
        }
        withPhosphor(phosphor) {
            return new Config(this.modelType, this.basicLevel, this.cgChip, this.ramSize, phosphor, this.background, this.scanLines);
        }
        withBackground(background) {
            return new Config(this.modelType, this.basicLevel, this.cgChip, this.ramSize, this.phosphor, background, this.scanLines);
        }
        withScanLines(scanLines) {
            return new Config(this.modelType, this.basicLevel, this.cgChip, this.ramSize, this.phosphor, this.background, scanLines);
        }
        /**
         * Make a default configuration.
         */
        static makeDefault() {
            return new Config(ModelType.MODEL3, BasicLevel.LEVEL2, CGChip.LOWER_CASE, RamSize.RAM_48_KB, Phosphor.WHITE, Background.AUTHENTIC, ScanLines.OFF);
        }
        /**
         * Whether this particular config is valid.
         */
        isValid() {
            // Model III only had Level 2. (I've read that it actually shipped with Level 1, but
            // we don't have that ROM.)
            if (this.modelType === ModelType.MODEL3 && this.basicLevel === BasicLevel.LEVEL1) {
                return false;
            }
            // Model III only had lower case.
            if (this.modelType === ModelType.MODEL3 && this.cgChip === CGChip.ORIGINAL) {
                return false;
            }
            // Rest are okay.
            return true;
        }
        /**
         * Whether this new config needs to be rebooted, if the emulator currently is running the old config.
         */
        needsReboot(oldConfig) {
            // Maybe here we could not reboot if only the CG chip changed. The software is able to detect the
            // difference (since bit 6 is synthetic in one case).
            return this.modelType !== oldConfig.modelType ||
                this.basicLevel !== oldConfig.basicLevel ||
                this.cgChip !== oldConfig.cgChip ||
                this.ramSize !== oldConfig.ramSize;
        }
        /**
         * Return the RAM size in bytes.
         */
        getRamSize() {
            let kb;
            switch (this.ramSize) {
                case RamSize.RAM_4_KB:
                    kb = 4;
                    break;
                case RamSize.RAM_16_KB:
                    kb = 16;
                    break;
                case RamSize.RAM_32_KB:
                    kb = 32;
                    break;
                case RamSize.RAM_48_KB:
                default:
                    kb = 48;
                    break;
            }
            return kb * 1024;
        }
    }
    //# sourceMappingURL=Config.js.map

    // IRQs
    const M1_TIMER_IRQ_MASK = 0x80;
    const M3_CASSETTE_RISE_IRQ_MASK = 0x01;
    const M3_CASSETTE_FALL_IRQ_MASK = 0x02;
    const M3_TIMER_IRQ_MASK = 0x04;
    const CASSETTE_IRQ_MASKS = M3_CASSETTE_RISE_IRQ_MASK | M3_CASSETTE_FALL_IRQ_MASK;
    // NMIs
    const RESET_NMI_MASK = 0x20;
    // Timer.
    const M1_TIMER_HZ = 40;
    const M3_TIMER_HZ = 30;
    const ROM_SIZE = 14 * 1024;
    const RAM_START = 16 * 1024;
    // CPU clock speeds.
    const M1_CLOCK_HZ = 1774080;
    const M3_CLOCK_HZ = 2027520;
    const INITIAL_CLICKS_PER_TICK = 2000;
    const CASSETTE_THRESHOLD = 5000 / 32768.0;
    // State of the cassette hardware. We don't support writing.
    var CassetteState;
    (function (CassetteState) {
        CassetteState[CassetteState["CLOSE"] = 0] = "CLOSE";
        CassetteState[CassetteState["READ"] = 1] = "READ";
        CassetteState[CassetteState["FAIL"] = 2] = "FAIL";
    })(CassetteState || (CassetteState = {}));
    // Value of wave in audio: negative, neutral (around zero), or positive.
    var CassetteValue;
    (function (CassetteValue) {
        CassetteValue[CassetteValue["NEGATIVE"] = 0] = "NEGATIVE";
        CassetteValue[CassetteValue["NEUTRAL"] = 1] = "NEUTRAL";
        CassetteValue[CassetteValue["POSITIVE"] = 2] = "POSITIVE";
    })(CassetteValue || (CassetteValue = {}));
    /**
     * Whether the memory address maps to a screen location.
     */
    function isScreenAddress(address) {
        return address >= SCREEN_BEGIN && address < SCREEN_END;
    }
    /**
     * See the FONT.md file for an explanation of this, but basically bit 6 is the NOR of bits 5 and 7.
     */
    function computeVideoBit6(value) {
        const bit5 = (value >> 5) & 1;
        const bit7 = (value >> 7) & 1;
        const bit6 = (bit5 | bit7) ^ 1;
        return (value & 0xBF) | (bit6 << 6);
    }
    /**
     * HAL for the TRS-80 Model III.
     */
    class Trs80 {
        constructor(screen, cassette) {
            this.timerHz = M3_TIMER_HZ;
            this.clockHz = M3_CLOCK_HZ;
            this.tStateCount = 0;
            this.memory = new Uint8Array(0);
            this.keyboard = new Keyboard();
            this.modeImage = 0x80;
            // Which IRQs should be handled.
            this.irqMask = 0;
            // Which IRQs have been requested by the hardware.
            this.irqLatch = 0;
            // Which NMIs should be handled.
            this.nmiMask = 0;
            // Which NMIs have been requested by the hardware.
            this.nmiLatch = 0;
            // Whether we've seen this NMI and handled it.
            this.nmiSeen = false;
            this.previousTimerClock = 0;
            this.z80 = new Z80(this);
            this.clocksPerTick = INITIAL_CLICKS_PER_TICK;
            this.startTime = Date.now();
            this.started = false;
            // Internal state of the cassette controller.
            // Whether the motor is running.
            this.cassetteMotorOn = false;
            // State machine.
            this.cassetteState = CassetteState.CLOSE;
            // Internal register state.
            this.cassetteValue = CassetteValue.NEUTRAL;
            this.cassetteLastNonZeroValue = CassetteValue.NEUTRAL;
            this.cassetteFlipFlop = false;
            // When we turned on the motor (started reading the file) and how many samples
            // we've read since then.
            this.cassetteMotorOnClock = 0;
            this.cassetteSamplesRead = 0;
            this.cassetteRiseInterruptCount = 0;
            this.cassetteFallInterruptCount = 0;
            this.screen = screen;
            this.cassette = cassette;
            this.config = Config.makeDefault();
            this.updateFromConfig();
            this.loadRom();
            this.tStateCount = 0;
            this.keyboard.configureKeyboard();
        }
        /**
         * Get the current emulator's configuration.
         */
        getConfig() {
            return this.config;
        }
        /**
         * Sets a new configuration and reboots into it if necessary.
         */
        setConfig(config) {
            const needsReboot = config.needsReboot(this.config);
            this.config = config;
            this.screen.setConfig(this.config);
            if (needsReboot) {
                this.updateFromConfig();
                this.reset();
            }
        }
        /**
         * Update our settings based on the config. Wipes memory.
         */
        updateFromConfig() {
            this.memory = new Uint8Array(RAM_START + this.config.getRamSize());
            this.memory.fill(0);
            this.loadRom();
            switch (this.config.modelType) {
                case ModelType.MODEL1:
                    this.timerHz = M1_TIMER_HZ;
                    this.clockHz = M1_CLOCK_HZ;
                    break;
                case ModelType.MODEL3:
                default:
                    this.timerHz = M3_TIMER_HZ;
                    this.clockHz = M3_CLOCK_HZ;
                    break;
            }
        }
        /**
         * Load the config-specific ROM into memory.
         */
        loadRom() {
            let rom;
            switch (this.config.modelType) {
                case ModelType.MODEL1:
                    switch (this.config.basicLevel) {
                        case BasicLevel.LEVEL1:
                            rom = model1Level1Rom;
                            break;
                        case BasicLevel.LEVEL2:
                        default:
                            rom = model1Level2Rom;
                            break;
                    }
                    break;
                case ModelType.MODEL3:
                default:
                    rom = model3Rom;
                    break;
            }
            const raw = window.atob(rom);
            for (let i = 0; i < raw.length; i++) {
                this.memory[i] = raw.charCodeAt(i);
            }
        }
        reset() {
            this.setIrqMask(0);
            this.setNmiMask(0);
            this.resetCassette();
            this.keyboard.clearKeyboard();
            this.setTimerInterrupt(false);
            this.z80.reset();
        }
        /**
         * Start the CPU and intercept browser keys.
         */
        start() {
            if (!this.started) {
                this.keyboard.interceptKeys = true;
                this.scheduleNextTick();
                this.started = true;
            }
        }
        /**
         * Stop the CPU and no longer intercept browser keys.
         */
        stop() {
            if (this.started) {
                this.keyboard.interceptKeys = false;
                this.cancelTickTimeout();
                this.started = false;
            }
        }
        // Set the mask for IRQ (regular) interrupts.
        setIrqMask(irqMask) {
            this.irqMask = irqMask;
        }
        // Set the mask for non-maskable interrupts. (Yes.)
        setNmiMask(nmiMask) {
            // Reset is always allowed:
            this.nmiMask = nmiMask | RESET_NMI_MASK;
            this.updateNmiSeen();
        }
        interruptLatchRead() {
            if (this.config.modelType === ModelType.MODEL1) {
                const irqLatch = this.irqLatch;
                this.setTimerInterrupt(false);
                // TODO irq = this.irqLatch !== 0;
                return irqLatch;
            }
            else {
                return ~this.irqLatch & 0xFF;
            }
        }
        step() {
            this.z80.step();
            // Handle non-maskable interrupts.
            if ((this.nmiLatch & this.nmiMask) !== 0 && !this.nmiSeen) {
                this.z80.nonMaskableInterrupt();
                this.nmiSeen = true;
                // Simulate the reset button being released. TODO
                // this.resetButtonInterrupt(false);
            }
            // Handle interrupts.
            if ((this.irqLatch & this.irqMask) !== 0) {
                this.z80.maskableInterrupt();
            }
            // Set off a timer interrupt.
            if (this.tStateCount > this.previousTimerClock + this.clockHz / this.timerHz) {
                this.handleTimer();
                this.previousTimerClock = this.tStateCount;
            }
            // Update cassette state.
            this.updateCassette();
        }
        contendMemory(address) {
            // Ignore.
        }
        contendPort(address) {
            // Ignore.
        }
        readMemory(address) {
            if (address < ROM_SIZE || address >= RAM_START || isScreenAddress(address)) {
                return address < this.memory.length ? this.memory[address] : 0xFF;
            }
            else if (address === 0x37E8) {
                // Printer. 0x30 = Printer selected, ready, with paper, not busy.
                return 0x30;
            }
            else if (Keyboard.isInRange(address)) {
                // Keyboard.
                return this.keyboard.readKeyboard(address, this.tStateCount);
            }
            else {
                // Unmapped memory.
                console.log("Reading from unmapped memory at 0x" + toHex(address, 4));
                return 0;
            }
        }
        readPort(address) {
            const port = address & 0xFF;
            let value = 0xFF; // Default value for missing ports.
            switch (port) {
                case 0x00:
                    // Joystick.
                    value = 0xFF;
                    break;
                case 0xE0:
                    if (this.config.modelType !== ModelType.MODEL1) {
                        // IRQ latch read.
                        value = this.interruptLatchRead();
                    }
                    break;
                case 0xE4:
                    if (this.config.modelType !== ModelType.MODEL1) {
                        // NMI latch read.
                        value = ~this.nmiLatch & 0xFF;
                    }
                    break;
                case 0xEC:
                case 0xED:
                case 0xEE:
                case 0xEF:
                    if (this.config.modelType !== ModelType.MODEL1) {
                        // Acknowledge timer.
                        this.setTimerInterrupt(false);
                        value = 0xFF;
                    }
                    break;
                case 0xF0:
                    // No diskette.
                    value = 0xFF;
                    break;
                case 0xFF:
                    // Cassette and various flags.
                    if (this.config.modelType === ModelType.MODEL1) {
                        value = 0x3F;
                        if (!this.screen.isExpandedCharacters()) {
                            value |= 0x40;
                        }
                    }
                    else {
                        value = this.modeImage & 0x7E;
                    }
                    value |= this.getCassetteByte();
                    break;
                default:
                    console.log("Reading from unknown port 0x" + toHex(lo(address), 2));
                    return 0;
            }
            // console.log("Reading 0x" + toHex(value, 2) + " from port 0x" + toHex(lo(address), 2));
            return value;
        }
        writePort(address, value) {
            const port = address & 0xFF;
            switch (port) {
                case 0xE0:
                    if (this.config.modelType !== ModelType.MODEL1) {
                        // Set interrupt mask.
                        this.setIrqMask(value);
                    }
                    break;
                case 0xE4:
                case 0xE5:
                case 0xE6:
                case 0xE7:
                    if (this.config.modelType !== ModelType.MODEL1) {
                        // Set NMI state.
                        this.setNmiMask(value);
                    }
                    break;
                case 0xEC:
                case 0xED:
                case 0xEE:
                case 0xEF:
                    if (this.config.modelType !== ModelType.MODEL1) {
                        // Various controls.
                        this.modeImage = value;
                        this.setCassetteMotor((value & 0x02) !== 0);
                        this.screen.setExpandedCharacters((value & 0x04) !== 0);
                        this.screen.setAlternateCharacters((value & 0x08) === 0);
                    }
                    break;
                case 0xF0:
                    // Disk command.
                    // TODO
                    // this.writeDiskCommand(value)
                    break;
                case 0xF4:
                case 0xF5:
                case 0xF6:
                case 0xF7:
                    // Disk select.
                    // TODO
                    // this.writeDiskSelect(value)
                    break;
                case 0xFC:
                case 0xFD:
                case 0xFE:
                case 0xFF:
                    if (this.config.modelType === ModelType.MODEL1) {
                        this.setCassetteMotor((value & 0x04) !== 0);
                        this.screen.setExpandedCharacters((value & 0x08) !== 0);
                    }
                    if ((value & 0x20) !== 0) {
                        // Model III Micro Labs graphics card.
                        console.log("Sending 0x" + toHex(value, 2) + " to Micro Labs graphics card");
                    }
                    else {
                        // Do cassette emulation.
                        this.putCassetteByte(value & 0x03);
                    }
                    break;
                default:
                    console.log("Writing 0x" + toHex(value, 2) + " to unknown port 0x" + toHex(port, 2));
                    return;
            }
            // console.log("Wrote 0x" + toHex(value, 2) + " to port 0x" + toHex(port, 2));
        }
        writeMemory(address, value) {
            if (address < ROM_SIZE) {
                console.log("Warning: Writing to ROM location 0x" + toHex(address, 4));
            }
            else {
                if (address >= SCREEN_BEGIN && address < SCREEN_END) {
                    if (this.config.cgChip === CGChip.ORIGINAL) {
                        // No bit 6 in video memory, need to compute it.
                        value = computeVideoBit6(value);
                    }
                    this.screen.writeChar(address, value);
                }
                else if (address < RAM_START) {
                    console.log("Writing to unmapped memory at 0x" + toHex(address, 4));
                }
                this.memory[address] = value;
            }
        }
        // Reset cassette edge interrupts.
        cassetteClearInterrupt() {
            this.irqLatch &= ~CASSETTE_IRQ_MASKS;
        }
        // Check whether the software has enabled these interrupts.
        cassetteInterruptsEnabled() {
            return (this.irqMask & CASSETTE_IRQ_MASKS) !== 0;
        }
        /**
         * Get an opaque string that represents the state of the screen. Flashes the screen.
         */
        getScreenshot() {
            const buf = [];
            // First byte is screen mode, where 0 means normal (64 columns) and 1 means wide (32 columns).
            buf.push(this.screen.isExpandedCharacters() ? 1 : 0);
            // Run-length encode bytes with (value,count) pairs, with a max count of 255. Bytes
            // in the range 33 to 127 inclusive have an implicit count of 1.
            for (let address = SCREEN_BEGIN; address < SCREEN_END; address++) {
                const value = this.memory[address];
                if (value > 32 && value < 128) {
                    // Bytes in this range don't store a count.
                    buf.push(value);
                }
                else if (buf.length < 2 || buf[buf.length - 1] === 255 || buf[buf.length - 2] !== value) {
                    // New entry.
                    buf.push(value);
                    buf.push(1);
                }
                else {
                    // Increment existing count.
                    buf[buf.length - 1] += 1;
                }
            }
            // Convert to a binary string.
            let s = buf.map(n => String.fromCharCode(n)).join("");
            // Start visual flash effect.
            Trs80.flashNode(this.screen.getNode());
            // Base-64 encode and prefix with version number.
            return "0:" + btoa(s);
        }
        /**
         * Flash the node as if a photo were taken.
         */
        static flashNode(node) {
            // Position a semi-transparent white div over the screen, and reduce its transparency over time.
            const oldNodePosition = node.style.position;
            node.style.position = "relative";
            const overlay = document.createElement("div");
            overlay.style.position = "absolute";
            overlay.style.left = "0";
            overlay.style.top = "0";
            overlay.style.right = "0";
            overlay.style.bottom = "0";
            overlay.style.backgroundColor = "#ffffff";
            // Fade out.
            let opacity = 1;
            const updateOpacity = () => {
                overlay.style.opacity = opacity.toString();
                opacity -= 0.1;
                if (opacity >= 0) {
                    window.requestAnimationFrame(updateOpacity);
                }
                else {
                    node.removeChild(overlay);
                    node.style.position = oldNodePosition;
                }
            };
            updateOpacity();
            node.appendChild(overlay);
        }
        // Reset whether we've seen this NMI interrupt if the mask and latch no longer overlap.
        updateNmiSeen() {
            if ((this.nmiLatch & this.nmiMask) === 0) {
                this.nmiSeen = false;
            }
        }
        /**
         * Run a certain number of CPU instructions and schedule another tick.
         */
        tick() {
            for (let i = 0; i < this.clocksPerTick; i++) {
                this.step();
            }
            this.scheduleNextTick();
        }
        /**
         * Figure out how many CPU cycles we should optimally run and how long
         * to wait until scheduling it, then schedule it to be run later.
         */
        scheduleNextTick() {
            let delay;
            if (this.cassetteMotorOn || this.keyboard.keyQueue.length > 4) {
                // Go fast if we're accessing the cassette or pasting.
                this.clocksPerTick = 100000;
                delay = 0;
            }
            else {
                // Delay to match original clock speed.
                const now = Date.now();
                const actualElapsed = now - this.startTime;
                const expectedElapsed = this.tStateCount * 1000 / this.clockHz;
                let behind = expectedElapsed - actualElapsed;
                if (behind < -100 || behind > 100) {
                    // We're too far behind or ahead. Catch up artificially.
                    this.startTime = now - expectedElapsed;
                    behind = 0;
                }
                delay = Math.round(Math.max(0, behind));
                if (delay === 0) {
                    // Delay too short, do more each tick.
                    this.clocksPerTick = Math.min(this.clocksPerTick + 100, 10000);
                }
                else if (delay > 1) {
                    // Delay too long, do less each tick.
                    this.clocksPerTick = Math.max(this.clocksPerTick - 100, 100);
                }
            }
            // console.log(this.clocksPerTick, delay);
            this.cancelTickTimeout();
            this.tickHandle = window.setTimeout(() => {
                this.tickHandle = undefined;
                this.tick();
            }, delay);
        }
        /**
         * Stop the tick timeout, if it's running.
         */
        cancelTickTimeout() {
            if (this.tickHandle !== undefined) {
                window.clearTimeout(this.tickHandle);
                this.tickHandle = undefined;
            }
        }
        // Set or reset the timer interrupt.
        setTimerInterrupt(state) {
            if (this.config.modelType === ModelType.MODEL1) {
                if (state) {
                    this.irqLatch |= M1_TIMER_IRQ_MASK;
                }
                else {
                    this.irqLatch &= ~M1_TIMER_IRQ_MASK;
                }
            }
            else {
                if (state) {
                    this.irqLatch |= M3_TIMER_IRQ_MASK;
                }
                else {
                    this.irqLatch &= ~M3_TIMER_IRQ_MASK;
                }
            }
        }
        // What to do when the hardware timer goes off.
        handleTimer() {
            this.setTimerInterrupt(true);
        }
        // Reset the controller to a known state.
        resetCassette() {
            this.setCassetteState(CassetteState.CLOSE);
        }
        // Get a byte from the I/O port.
        getCassetteByte() {
            // If the motor's running, and we're reading a byte, then get into read mode.
            if (this.cassetteMotorOn) {
                this.setCassetteState(CassetteState.READ);
            }
            // Clear any interrupt that may have triggered this read.
            this.cassetteClearInterrupt();
            // Cassette owns bits 0 and 7.
            let b = 0;
            if (this.cassetteFlipFlop) {
                b |= 0x80;
            }
            if (this.config.modelType !== ModelType.MODEL1 && this.cassetteLastNonZeroValue === CassetteValue.POSITIVE) {
                b |= 0x01;
            }
            return b;
        }
        // Write to the cassette port. We don't support writing tapes, but this is used
        // for 500-baud reading to trigger the next analysis of the tape.
        putCassetteByte(b) {
            if (this.cassetteMotorOn) {
                if (this.cassetteState === CassetteState.READ) {
                    this.updateCassette();
                    this.cassetteFlipFlop = false;
                }
            }
        }
        // Kick off the reading process when doing 1500-baud reads.
        kickOffCassette() {
            if (this.cassetteMotorOn &&
                this.cassetteState === CassetteState.CLOSE &&
                this.cassetteInterruptsEnabled()) {
                // Kick off the process.
                this.cassetteRiseInterrupt();
                this.cassetteFallInterrupt();
            }
        }
        // Turn the motor on or off.
        setCassetteMotor(cassetteMotorOn) {
            if (cassetteMotorOn !== this.cassetteMotorOn) {
                if (cassetteMotorOn) {
                    this.cassetteFlipFlop = false;
                    this.cassetteLastNonZeroValue = CassetteValue.NEUTRAL;
                    // Waits a second before kicking off the cassette.
                    // TODO this should be in CPU cycles, not browser cycles.
                    if (this.config.modelType !== ModelType.MODEL1) {
                        setTimeout(() => this.kickOffCassette(), 1000);
                    }
                }
                else {
                    this.setCassetteState(CassetteState.CLOSE);
                }
                this.cassetteMotorOn = cassetteMotorOn;
                if (cassetteMotorOn) {
                    this.cassette.onMotorStart();
                }
                else {
                    this.cassette.onMotorStop();
                }
            }
        }
        // Read some of the cassette to see if we should be triggering a rise/fall interrupt.
        updateCassette() {
            if (this.cassetteMotorOn && this.setCassetteState(CassetteState.READ) >= 0) {
                // See how many samples we should have read by now.
                const samplesToRead = Math.round((this.tStateCount - this.cassetteMotorOnClock) *
                    this.cassette.samplesPerSecond / this.clockHz);
                // Catch up.
                while (this.cassetteSamplesRead < samplesToRead) {
                    const sample = this.cassette.readSample();
                    this.cassetteSamplesRead++;
                    // Convert to state, where neutral is some noisy in-between state.
                    let cassetteValue = CassetteValue.NEUTRAL;
                    if (sample > CASSETTE_THRESHOLD) {
                        cassetteValue = CassetteValue.POSITIVE;
                    }
                    else if (sample < -CASSETTE_THRESHOLD) {
                        cassetteValue = CassetteValue.NEGATIVE;
                    }
                    // See if we've changed value.
                    if (cassetteValue !== this.cassetteValue) {
                        if (cassetteValue === CassetteValue.POSITIVE) {
                            // Positive edge.
                            this.cassetteFlipFlop = true;
                            this.cassetteRiseInterrupt();
                        }
                        else if (cassetteValue === CassetteValue.NEGATIVE) {
                            // Negative edge.
                            this.cassetteFlipFlop = true;
                            this.cassetteFallInterrupt();
                        }
                        this.cassetteValue = cassetteValue;
                        if (cassetteValue !== CassetteValue.NEUTRAL) {
                            this.cassetteLastNonZeroValue = cassetteValue;
                        }
                    }
                }
            }
        }
        // Returns 0 if the state was changed, 1 if it wasn't, and -1 on error.
        setCassetteState(newState) {
            const oldCassetteState = this.cassetteState;
            // See if we're changing anything.
            if (oldCassetteState === newState) {
                return 1;
            }
            // Once in error, everything will fail until we close.
            if (oldCassetteState === CassetteState.FAIL && newState !== CassetteState.CLOSE) {
                return -1;
            }
            // Change things based on new state.
            switch (newState) {
                case CassetteState.READ:
                    this.openCassetteFile();
                    break;
            }
            // Update state.
            this.cassetteState = newState;
            return 0;
        }
        // Open file, get metadata, and get read to read the tape.
        openCassetteFile() {
            // TODO open/rewind cassette?
            // Reset the clock.
            this.cassetteMotorOnClock = this.tStateCount;
            this.cassetteSamplesRead = 0;
        }
        // Saw a positive edge on cassette.
        cassetteRiseInterrupt() {
            this.cassetteRiseInterruptCount++;
            this.irqLatch = (this.irqLatch & ~M3_CASSETTE_RISE_IRQ_MASK) |
                (this.irqMask & M3_CASSETTE_RISE_IRQ_MASK);
        }
        // Saw a negative edge on cassette.
        cassetteFallInterrupt() {
            this.cassetteFallInterruptCount++;
            this.irqLatch = (this.irqLatch & ~M3_CASSETTE_FALL_IRQ_MASK) |
                (this.irqMask & M3_CASSETTE_FALL_IRQ_MASK);
        }
    }
    //# sourceMappingURL=Trs80.js.map

    /**
     * Abstract base class for displaying a screen.
     */
    class Trs80Screen {
        constructor() {
            this.expanded = false;
            this.alternate = false;
        }
        /**
         * Set the config for this screen. Before this is called, the screen is permitted to use any config
         * it wants.
         */
        setConfig(config) {
            throw new Error("Must be implemented");
        }
        /**
         * Write a character to the screen.
         * @param address address of the character, where 15360 is the upper-left of the screen.
         * @param value the 0-255 value to write.
         */
        writeChar(address, value) {
            throw new Error("Must be implemented");
        }
        /**
         * Get the HTML node for this screen.
         */
        getNode() {
            throw new Error("Must be implemented");
        }
        /**
         * Enable or disable expanded (wide) character mode.
         */
        setExpandedCharacters(expanded) {
            this.expanded = expanded;
        }
        /**
         * Return whether we're in expanded (wide) character mode.
         */
        isExpandedCharacters() {
            return this.expanded;
        }
        /**
         * Enable or disable alternate (Katakana) character mode.
         */
        setAlternateCharacters(alternate) {
            this.alternate = alternate;
        }
        /**
         * Return whether we're in alternate (Katakana) character mode.
         */
        isAlternateCharacters() {
            return this.alternate;
        }
        /**
         * Fill the screen with the screenshot.
         */
        displayScreenshot(screenshot) {
            // Leave it blank if screenshot string is blank.
            if (screenshot === "") {
                return;
            }
            if (!screenshot.startsWith("0:")) {
                throw new Error("Invalid screenshot version number");
            }
            // Decode screenshot.
            const s = atob(screenshot.substring(2));
            if (s.length === 0) {
                throw new Error("Screenshot string is empty");
            }
            // Set expanded mode.
            this.setExpandedCharacters(s.charCodeAt(0) === 1);
            let address = SCREEN_BEGIN;
            for (let i = 1; i < s.length; i++) {
                const value = s.charCodeAt(i);
                let count = 1;
                if (value > 32 && value < 128) ;
                else {
                    i++;
                    if (i === s.length) {
                        throw new Error("Missing count in RLE");
                    }
                    count = s.charCodeAt(i);
                }
                // Emit "count" values.
                while (count--) {
                    this.writeChar(address++, value);
                }
            }
            if (address !== SCREEN_END) {
                throw new Error("Screenshot was of the wrong length");
            }
        }
    }
    //# sourceMappingURL=Trs80Screen.js.map

    /**
     * These fonts are from the xtrs emulator, and the CG# references match those.
     * They're identical to the fonts in the sdltrs emulator. They don't include
     * the 2x3 graphical characters; we generate those procedurally.
     *
     * See the original trs_chars.c file for Tim Mann's explanations and historical
     * notes.
     */
    // Here is the LICENSE file from the xtrs emulator:
    /*

    Copyright (C) 1992 Clarendon Hill Software.

    Permission is granted to any individual or institution to use, copy,
    or redistribute this software, provided this copyright notice is retained.

    This software is provided "as is" without any expressed or implied
    warranty.  If this software brings on any sort of damage -- physical,
    monetary, emotional, or brain -- too bad.  You've got no one to blame
    but yourself.

    The software may be modified for your own purposes, but modified versions
    must retain this notice.

    ***

    Copyright (c) 1996-2020, Timothy P. Mann

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use, copy,
    modify, merge, publish, distribute, sublicense, and/or sell copies
    of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

    */
    /**
     * Original Model I character set.
     */
    const GLYPH_CG1 = [
        0x00, 0x1f, 0x11, 0x11, 0x11, 0x11, 0x11, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x02, 0x04, 0x08, 0x1e, 0x04, 0x08, 0x10, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x11, 0x1b, 0x15, 0x1b, 0x11, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x10, 0x08, 0x05, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x11, 0x1f, 0x0a, 0x0a, 0x1b, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x02, 0x0f, 0x12, 0x14, 0x10, 0x10, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x04, 0x08, 0x1f, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x04, 0x04, 0x15, 0x0e, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x15, 0x0e, 0x04, 0x15, 0x0e, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x04, 0x02, 0x1f, 0x02, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x1b, 0x15, 0x1b, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x11, 0x15, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x15, 0x15, 0x1d, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x11, 0x1d, 0x15, 0x15, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x11, 0x17, 0x15, 0x15, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x15, 0x15, 0x17, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x14, 0x08, 0x15, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x0a, 0x0a, 0x0a, 0x0a, 0x0a, 0x1b, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x10, 0x10, 0x10, 0x1f, 0x10, 0x10, 0x10, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x04, 0x0e, 0x0e, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x01, 0x02, 0x04, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x15, 0x15, 0x17, 0x11, 0x11, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x11, 0x11, 0x17, 0x15, 0x15, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x11, 0x11, 0x1d, 0x15, 0x15, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x15, 0x15, 0x1d, 0x11, 0x11, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x04, 0x04, 0x04, 0x04, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0a, 0x0a, 0x0a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0a, 0x0a, 0x1f, 0x0a, 0x1f, 0x0a, 0x0a, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x1e, 0x05, 0x0e, 0x14, 0x0f, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x03, 0x13, 0x08, 0x04, 0x02, 0x19, 0x18, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x02, 0x05, 0x05, 0x02, 0x15, 0x09, 0x16, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x06, 0x06, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x08, 0x04, 0x02, 0x02, 0x02, 0x04, 0x08, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x02, 0x04, 0x08, 0x08, 0x08, 0x04, 0x02, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x15, 0x0e, 0x1f, 0x0e, 0x15, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x04, 0x04, 0x1f, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x06, 0x06, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x06, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x10, 0x08, 0x04, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x19, 0x15, 0x13, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x06, 0x04, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x10, 0x0e, 0x01, 0x01, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x10, 0x0c, 0x10, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x08, 0x0c, 0x0a, 0x09, 0x1f, 0x08, 0x08, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x01, 0x0f, 0x10, 0x10, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0c, 0x02, 0x01, 0x0f, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x10, 0x08, 0x04, 0x02, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x11, 0x0e, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x11, 0x1e, 0x10, 0x08, 0x06, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x06, 0x06, 0x00, 0x06, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x06, 0x06, 0x00, 0x06, 0x06, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x08, 0x04, 0x02, 0x01, 0x02, 0x04, 0x08, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x1f, 0x00, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x02, 0x04, 0x08, 0x10, 0x08, 0x04, 0x02, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x10, 0x08, 0x04, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x10, 0x16, 0x15, 0x15, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x0a, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0f, 0x12, 0x12, 0x0e, 0x12, 0x12, 0x0f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x01, 0x01, 0x01, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0f, 0x12, 0x12, 0x12, 0x12, 0x12, 0x0f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x01, 0x01, 0x07, 0x01, 0x01, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x01, 0x01, 0x07, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1e, 0x01, 0x01, 0x19, 0x11, 0x11, 0x1e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x11, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x10, 0x10, 0x10, 0x10, 0x10, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x11, 0x09, 0x05, 0x03, 0x05, 0x09, 0x11, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x11, 0x1b, 0x15, 0x15, 0x11, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x11, 0x13, 0x15, 0x19, 0x11, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0f, 0x11, 0x11, 0x0f, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x11, 0x11, 0x15, 0x09, 0x16, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0f, 0x11, 0x11, 0x0f, 0x05, 0x09, 0x11, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x11, 0x01, 0x0e, 0x10, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x11, 0x11, 0x11, 0x0a, 0x0a, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x11, 0x11, 0x11, 0x11, 0x15, 0x1b, 0x11, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x11, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x11, 0x11, 0x0a, 0x04, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x1f, 0x10, 0x08, 0x04, 0x02, 0x01, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x0e, 0x15, 0x04, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x04, 0x04, 0x04, 0x15, 0x0e, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x04, 0x02, 0x1f, 0x02, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x04, 0x08, 0x1f, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0c, 0x0c, 0x04, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0e, 0x10, 0x1e, 0x11, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x01, 0x01, 0x0d, 0x13, 0x11, 0x13, 0x0d, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x0e, 0x11, 0x01, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x10, 0x10, 0x16, 0x19, 0x11, 0x19, 0x16, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x0e, 0x11, 0x1f, 0x01, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x08, 0x14, 0x04, 0x0e, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x16, 0x19, 0x19, 0x16, 0x10, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x01, 0x01, 0x0d, 0x13, 0x11, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x00, 0x06, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x10, 0x00, 0x10, 0x10, 0x10, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x01, 0x01, 0x09, 0x05, 0x03, 0x05, 0x09, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x06, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x0b, 0x15, 0x15, 0x15, 0x15, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x0d, 0x13, 0x11, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x0e, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0d, 0x13, 0x11, 0x13, 0x0d, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x16, 0x19, 0x11, 0x19, 0x16, 0x10, 0x10, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x0d, 0x13, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x1e, 0x01, 0x0e, 0x10, 0x0f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x04, 0x1f, 0x04, 0x04, 0x14, 0x08, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x11, 0x11, 0x11, 0x19, 0x16, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x11, 0x11, 0x11, 0x0a, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x11, 0x11, 0x15, 0x15, 0x0a, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x11, 0x11, 0x11, 0x1e, 0x10, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x1f, 0x08, 0x04, 0x02, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x08, 0x04, 0x04, 0x02, 0x04, 0x04, 0x08, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x04, 0x04, 0x00, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x02, 0x04, 0x04, 0x08, 0x04, 0x04, 0x02, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x02, 0x15, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0a, 0x15, 0x0a, 0x15, 0x0a, 0x15, 0x0a, 0x00, 0x00, 0x00, 0x00,
    ];
    /**
     * Model I character set with official Radio Shack upgrade.
     */
    const GLYPH_CG2 = [
        0x0e, 0x11, 0x10, 0x16, 0x15, 0x15, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x0a, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0f, 0x12, 0x12, 0x0e, 0x12, 0x12, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x01, 0x01, 0x01, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0f, 0x12, 0x12, 0x12, 0x12, 0x12, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1f, 0x01, 0x01, 0x07, 0x01, 0x01, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1f, 0x01, 0x01, 0x07, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1e, 0x01, 0x01, 0x19, 0x11, 0x11, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x10, 0x10, 0x10, 0x10, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x09, 0x05, 0x03, 0x05, 0x09, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x1b, 0x15, 0x15, 0x11, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x13, 0x15, 0x19, 0x11, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0f, 0x11, 0x11, 0x0f, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x11, 0x11, 0x15, 0x09, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0f, 0x11, 0x11, 0x0f, 0x05, 0x09, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x01, 0x0e, 0x10, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x11, 0x11, 0x0a, 0x0a, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x11, 0x11, 0x11, 0x15, 0x1b, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x11, 0x0a, 0x04, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1f, 0x10, 0x08, 0x04, 0x02, 0x01, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x0e, 0x15, 0x04, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x04, 0x04, 0x04, 0x15, 0x0e, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x02, 0x1f, 0x02, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x08, 0x1f, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x04, 0x04, 0x04, 0x04, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0a, 0x0a, 0x0a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0a, 0x0a, 0x1f, 0x0a, 0x1f, 0x0a, 0x0a, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x1e, 0x05, 0x0e, 0x14, 0x0f, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x03, 0x13, 0x08, 0x04, 0x02, 0x19, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x02, 0x05, 0x05, 0x02, 0x15, 0x09, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x06, 0x06, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x08, 0x04, 0x02, 0x02, 0x02, 0x04, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x02, 0x04, 0x08, 0x08, 0x08, 0x04, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x15, 0x0e, 0x1f, 0x0e, 0x15, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x04, 0x1f, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x06, 0x06, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x10, 0x08, 0x04, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x19, 0x15, 0x13, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x06, 0x04, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x10, 0x0e, 0x01, 0x01, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x10, 0x0c, 0x10, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x08, 0x0c, 0x0a, 0x09, 0x1f, 0x08, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1f, 0x01, 0x0f, 0x10, 0x10, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0c, 0x02, 0x01, 0x0f, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1f, 0x10, 0x08, 0x04, 0x02, 0x02, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x11, 0x0e, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x11, 0x1e, 0x10, 0x08, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x06, 0x06, 0x00, 0x06, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x06, 0x06, 0x00, 0x06, 0x06, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00,
        0x08, 0x04, 0x02, 0x01, 0x02, 0x04, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x1f, 0x00, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x02, 0x04, 0x08, 0x10, 0x08, 0x04, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x10, 0x08, 0x04, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x10, 0x16, 0x15, 0x15, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x0a, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0f, 0x12, 0x12, 0x0e, 0x12, 0x12, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x01, 0x01, 0x01, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0f, 0x12, 0x12, 0x12, 0x12, 0x12, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1f, 0x01, 0x01, 0x07, 0x01, 0x01, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1f, 0x01, 0x01, 0x07, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1e, 0x01, 0x01, 0x19, 0x11, 0x11, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x10, 0x10, 0x10, 0x10, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x09, 0x05, 0x03, 0x05, 0x09, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x1b, 0x15, 0x15, 0x11, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x13, 0x15, 0x19, 0x11, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0f, 0x11, 0x11, 0x0f, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x11, 0x11, 0x15, 0x09, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0f, 0x11, 0x11, 0x0f, 0x05, 0x09, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0e, 0x11, 0x01, 0x0e, 0x10, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x11, 0x11, 0x0a, 0x0a, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x11, 0x11, 0x11, 0x15, 0x1b, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x11, 0x0a, 0x04, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1f, 0x10, 0x08, 0x04, 0x02, 0x01, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x0e, 0x15, 0x04, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x04, 0x04, 0x04, 0x15, 0x0e, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x02, 0x1f, 0x02, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x08, 0x1f, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x0a, 0x02, 0x07, 0x02, 0x12, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x0e, 0x10, 0x1e, 0x11, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x01, 0x01, 0x0d, 0x13, 0x11, 0x13, 0x0d, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x0e, 0x11, 0x01, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x10, 0x16, 0x19, 0x11, 0x19, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x0e, 0x11, 0x1f, 0x01, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x08, 0x14, 0x04, 0x0e, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x0e, 0x11, 0x11, 0x1e, 0x10, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x01, 0x01, 0x0d, 0x13, 0x11, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x00, 0x06, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x00, 0x18, 0x10, 0x10, 0x10, 0x12, 0x0c, 0x00, 0x00, 0x00, 0x00,
        0x02, 0x02, 0x12, 0x0a, 0x06, 0x0a, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x06, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x0b, 0x15, 0x15, 0x15, 0x15, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x0d, 0x13, 0x11, 0x11, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x0e, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x0d, 0x13, 0x13, 0x0d, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x16, 0x19, 0x19, 0x16, 0x10, 0x10, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x0d, 0x13, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x1e, 0x01, 0x0e, 0x10, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x04, 0x0e, 0x04, 0x04, 0x14, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x11, 0x11, 0x11, 0x19, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x11, 0x11, 0x11, 0x0a, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x11, 0x11, 0x15, 0x15, 0x0a, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x11, 0x11, 0x11, 0x1e, 0x10, 0x0e, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x1f, 0x08, 0x04, 0x02, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x08, 0x04, 0x04, 0x02, 0x04, 0x04, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x04, 0x04, 0x00, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x02, 0x04, 0x04, 0x08, 0x04, 0x04, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x11, 0x0a, 0x04, 0x1f, 0x04, 0x1f, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x15, 0x0a, 0x15, 0x0a, 0x15, 0x0a, 0x15, 0x0a, 0x00, 0x00, 0x00, 0x00,
    ];
    /**
     * Original Model III character set.
     */
    const GLYPH_CG4 = [
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x30, 0x48, 0x08, 0x3e, 0x08, 0x48, 0x3e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x20, 0x10, 0x3c, 0x42, 0x7e, 0x02, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x24, 0x00, 0x42, 0x42, 0x42, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x28, 0x10, 0x28, 0x44, 0x7c, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x7e, 0x40, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x28, 0x00, 0x38, 0x44, 0x44, 0x44, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00,
        0xb8, 0x44, 0x64, 0x54, 0x4c, 0x44, 0x3a, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x08, 0x10, 0x42, 0x42, 0x42, 0x62, 0x5c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x4c, 0x32, 0x00, 0x34, 0x4c, 0x44, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x20, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1c, 0x00, 0x1c, 0x20, 0x3c, 0x22, 0x5c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7c, 0x5e, 0x22, 0x22, 0x1e, 0x12, 0x22, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x28, 0x00, 0x10, 0x28, 0x44, 0x7c, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x4c, 0x32, 0x10, 0x28, 0x44, 0x7c, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x4c, 0x32, 0x44, 0x4c, 0x54, 0x64, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x28, 0x38, 0x44, 0x44, 0x44, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x90, 0x68, 0x64, 0x54, 0x4c, 0x2c, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x4c, 0x32, 0x00, 0x3c, 0x42, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x44, 0x44, 0x3c, 0x44, 0x44, 0x3e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x24, 0x00, 0x42, 0x42, 0x42, 0x62, 0x5c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x4c, 0x32, 0x00, 0x18, 0x24, 0x24, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x38, 0x54, 0x50, 0x38, 0x14, 0x54, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x14, 0x00, 0x1c, 0x20, 0x3c, 0x22, 0x5c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x08, 0x1c, 0x20, 0x3c, 0x22, 0x5c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x08, 0x00, 0x1c, 0x20, 0x3c, 0x22, 0x5c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x02, 0x3e, 0x42, 0x7c, 0x40, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x20, 0x10, 0x7c, 0x04, 0x7c, 0x04, 0x7c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x78, 0x24, 0x64, 0x3c, 0x24, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x38, 0x44, 0x04, 0x04, 0x44, 0x38, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x4c, 0x32, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x10, 0x10, 0x10, 0x10, 0x00, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x24, 0x24, 0x24, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x24, 0x24, 0x7e, 0x24, 0x7e, 0x24, 0x24, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x78, 0x14, 0x38, 0x50, 0x3c, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x46, 0x26, 0x10, 0x08, 0x64, 0x62, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0c, 0x12, 0x12, 0x0c, 0x52, 0x22, 0x5c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x20, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x20, 0x10, 0x08, 0x08, 0x08, 0x10, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x08, 0x10, 0x10, 0x10, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x54, 0x38, 0x7c, 0x38, 0x54, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x10, 0x10, 0x7c, 0x10, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x42, 0x62, 0x5a, 0x46, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x18, 0x14, 0x10, 0x10, 0x10, 0x7c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x42, 0x40, 0x30, 0x0c, 0x02, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x42, 0x40, 0x38, 0x40, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x20, 0x30, 0x28, 0x24, 0x7e, 0x20, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x02, 0x1e, 0x20, 0x40, 0x22, 0x1c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x38, 0x04, 0x02, 0x3e, 0x42, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x42, 0x20, 0x10, 0x08, 0x08, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x42, 0x42, 0x3c, 0x42, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x42, 0x42, 0x7c, 0x40, 0x20, 0x1c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x10, 0x00, 0x00, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x10, 0x00, 0x00, 0x10, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00,
        0x60, 0x30, 0x18, 0x0c, 0x18, 0x30, 0x60, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x7e, 0x00, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x06, 0x0c, 0x18, 0x30, 0x18, 0x0c, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x42, 0x40, 0x30, 0x08, 0x00, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x38, 0x44, 0x52, 0x6a, 0x32, 0x04, 0x78, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x18, 0x24, 0x42, 0x7e, 0x42, 0x42, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3e, 0x44, 0x44, 0x3c, 0x44, 0x44, 0x3e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x38, 0x44, 0x02, 0x02, 0x02, 0x44, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1e, 0x24, 0x44, 0x44, 0x44, 0x24, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x02, 0x02, 0x1e, 0x02, 0x02, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x02, 0x02, 0x1e, 0x02, 0x02, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x38, 0x44, 0x02, 0x72, 0x42, 0x44, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x42, 0x42, 0x42, 0x7e, 0x42, 0x42, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x38, 0x10, 0x10, 0x10, 0x10, 0x10, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x70, 0x20, 0x20, 0x20, 0x20, 0x22, 0x1c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x42, 0x22, 0x12, 0x0e, 0x12, 0x22, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x42, 0x66, 0x5a, 0x5a, 0x42, 0x42, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x42, 0x46, 0x4a, 0x52, 0x62, 0x42, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x42, 0x42, 0x42, 0x42, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3e, 0x42, 0x42, 0x3e, 0x02, 0x02, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x42, 0x42, 0x42, 0x52, 0x22, 0x5c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3e, 0x42, 0x42, 0x3e, 0x12, 0x22, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x42, 0x02, 0x3c, 0x40, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7c, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x42, 0x42, 0x42, 0x24, 0x24, 0x18, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x42, 0x42, 0x42, 0x5a, 0x5a, 0x66, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x42, 0x42, 0x24, 0x18, 0x24, 0x42, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x44, 0x44, 0x44, 0x38, 0x10, 0x10, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x40, 0x20, 0x18, 0x04, 0x02, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x04, 0x04, 0x04, 0x04, 0x04, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x20, 0x20, 0x20, 0x20, 0x20, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x28, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0x00,
        0x08, 0x10, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x1c, 0x20, 0x3c, 0x22, 0x5c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x02, 0x02, 0x3a, 0x46, 0x42, 0x46, 0x3a, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x3c, 0x42, 0x02, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x40, 0x40, 0x5c, 0x62, 0x42, 0x62, 0x5c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x3c, 0x42, 0x7e, 0x02, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x30, 0x48, 0x08, 0x3e, 0x08, 0x08, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x5c, 0x62, 0x62, 0x5c, 0x40, 0x3c, 0x00, 0x00, 0x00, 0x00,
        0x02, 0x02, 0x3a, 0x46, 0x42, 0x42, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x00, 0x18, 0x10, 0x10, 0x10, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x20, 0x00, 0x30, 0x20, 0x20, 0x20, 0x22, 0x1c, 0x00, 0x00, 0x00, 0x00,
        0x02, 0x02, 0x22, 0x12, 0x0a, 0x16, 0x22, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x18, 0x10, 0x10, 0x10, 0x10, 0x10, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x6e, 0x92, 0x92, 0x92, 0x92, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x3a, 0x46, 0x42, 0x42, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x3c, 0x42, 0x42, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x3a, 0x46, 0x46, 0x3a, 0x02, 0x02, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x5c, 0x62, 0x62, 0x5c, 0x40, 0x40, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x3a, 0x46, 0x02, 0x02, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x7c, 0x02, 0x3c, 0x40, 0x3e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x08, 0x08, 0x3e, 0x08, 0x08, 0x48, 0x30, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x42, 0x42, 0x42, 0x62, 0x5c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x42, 0x42, 0x42, 0x24, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x82, 0x92, 0x92, 0x92, 0x6c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x42, 0x24, 0x18, 0x24, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x42, 0x42, 0x62, 0x5c, 0x40, 0x3c, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x7e, 0x20, 0x18, 0x04, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x30, 0x08, 0x08, 0x04, 0x08, 0x08, 0x30, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x10, 0x10, 0x00, 0x10, 0x10, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0c, 0x10, 0x10, 0x20, 0x10, 0x10, 0x0c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0c, 0x92, 0x60, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x10, 0x7c, 0x10, 0x10, 0x00, 0x7c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x38, 0x7c, 0xfe, 0xfe, 0x7c, 0x10, 0x10, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x6c, 0xfe, 0xfe, 0x7c, 0x38, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x38, 0x7c, 0xfe, 0x7c, 0x38, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x38, 0x38, 0x10, 0xd6, 0xfe, 0xd6, 0x10, 0x38, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x42, 0xa5, 0x81, 0xa5, 0x99, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x42, 0xa5, 0x81, 0x99, 0xa5, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00,
        0x20, 0x10, 0x08, 0x04, 0x08, 0x10, 0x20, 0x3c, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x08, 0x10, 0x20, 0x10, 0x08, 0x04, 0x3c, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x9c, 0x62, 0x62, 0x9c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x44, 0x3c, 0x44, 0x44, 0x3c, 0x04, 0x02, 0x00, 0x00, 0x00, 0x00,
        0x86, 0x48, 0x28, 0x18, 0x08, 0x0c, 0x0c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x30, 0x48, 0x08, 0x30, 0x50, 0x48, 0x30, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x60, 0x10, 0x08, 0x7c, 0x08, 0x10, 0x60, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x68, 0x60, 0x10, 0x08, 0x38, 0x40, 0x30, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x34, 0x4a, 0x48, 0x48, 0x40, 0x40, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x28, 0x44, 0x7c, 0x44, 0x28, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x04, 0x04, 0x04, 0x44, 0x44, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x02, 0x12, 0x0a, 0x06, 0x0a, 0x52, 0x22, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x08, 0x08, 0x08, 0x18, 0x24, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x24, 0x24, 0x24, 0x24, 0x5c, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x4c, 0x48, 0x28, 0x18, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x38, 0x04, 0x18, 0x04, 0x38, 0x40, 0x30, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x18, 0x24, 0x42, 0x42, 0x24, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x7c, 0x2a, 0x28, 0x28, 0x28, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x18, 0x24, 0x24, 0x1c, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x7c, 0x12, 0x12, 0x0c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x7c, 0x12, 0x10, 0x10, 0x10, 0x10, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x40, 0x26, 0x24, 0x24, 0x24, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x38, 0x54, 0x54, 0x54, 0x38, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x46, 0x28, 0x10, 0x28, 0xc4, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x92, 0x54, 0x54, 0x38, 0x10, 0x10, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x44, 0x82, 0x92, 0x92, 0x6c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x38, 0x44, 0x82, 0x82, 0xc6, 0x44, 0xc6, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x78, 0x08, 0x08, 0x08, 0x0a, 0x0c, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x10, 0x00, 0x7c, 0x00, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x04, 0x08, 0x30, 0x08, 0x04, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x4c, 0x32, 0x00, 0x4c, 0x32, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x10, 0x28, 0x44, 0xfe, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x20, 0x10, 0x08, 0x08, 0x10, 0x10, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00,
        0x80, 0x40, 0xfe, 0x10, 0xfe, 0x04, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x08, 0x10, 0x20, 0x7c, 0x08, 0x10, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00,
        0xfc, 0x4a, 0x24, 0x10, 0x48, 0xa4, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x38, 0x44, 0x82, 0x82, 0xfe, 0x44, 0x44, 0xc6, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x6c, 0x92, 0x92, 0x6c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x40, 0x20, 0x12, 0x0a, 0x06, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x78, 0x04, 0x38, 0x44, 0x38, 0x40, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x44, 0xaa, 0x54, 0x28, 0x54, 0xaa, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x42, 0xb9, 0x85, 0x85, 0xb9, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00,
        0x42, 0x24, 0x18, 0x24, 0x18, 0x24, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7c, 0x52, 0x52, 0x5c, 0x50, 0x50, 0x50, 0x50, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x38, 0x54, 0x14, 0x54, 0x38, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x5e, 0xa5, 0xa5, 0x9d, 0x95, 0x66, 0x3c, 0x00, 0x00, 0x00, 0x00,
        0xfa, 0x06, 0xc6, 0x46, 0x26, 0xde, 0x06, 0xfa, 0x00, 0x00, 0x00, 0x00,
        0xff, 0x20, 0xc0, 0x3f, 0x40, 0x3f, 0x20, 0x1f, 0x00, 0x00, 0x00, 0x00,
        0x3f, 0x40, 0x3f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1e, 0x22, 0x22, 0x1e, 0x52, 0x22, 0xd2, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x86, 0x41, 0x21, 0x16, 0x68, 0x94, 0x92, 0x61, 0x00, 0x00, 0x00, 0x00,
        0x70, 0x60, 0x50, 0x0e, 0x09, 0x09, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x38, 0x44, 0x44, 0x44, 0x38, 0x10, 0x38, 0x10, 0x00, 0x00, 0x00, 0x00,
        0x70, 0x10, 0x10, 0x70, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0xff, 0xc7, 0xbb, 0xcf, 0xef, 0xff, 0xef, 0xff, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x28, 0x10, 0x38, 0x54, 0x10, 0x28, 0x44, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x28, 0x10, 0x38, 0x54, 0x28, 0x7c, 0x28, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x28, 0x44, 0x44, 0x44, 0x54, 0x6c, 0x44, 0x00, 0x00, 0x00, 0x00,
        0x44, 0x28, 0x10, 0x7c, 0x10, 0x7c, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x04, 0x0a, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7c, 0x04, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x20, 0x20, 0x20, 0x20, 0x3e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x02, 0x04, 0x08, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x3c, 0x20, 0x3c, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x7c, 0x40, 0x30, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x20, 0x10, 0x18, 0x14, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x10, 0x7c, 0x44, 0x40, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x38, 0x10, 0x10, 0x7c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x10, 0x3c, 0x18, 0x14, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x08, 0x7c, 0x48, 0x08, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x38, 0x20, 0x20, 0x7c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x7c, 0x40, 0x78, 0x40, 0x7c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x54, 0x54, 0x44, 0x20, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x40, 0x28, 0x18, 0x08, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x40, 0x20, 0x10, 0x18, 0x14, 0x10, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x7c, 0x44, 0x44, 0x20, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7c, 0x10, 0x10, 0x10, 0x10, 0x10, 0x7c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x7e, 0x10, 0x18, 0x14, 0x12, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x08, 0x7e, 0x48, 0x48, 0x48, 0x44, 0x72, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x38, 0x10, 0x7c, 0x10, 0x10, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7c, 0x44, 0x44, 0x42, 0x20, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x04, 0x7c, 0x14, 0x12, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x40, 0x40, 0x40, 0x40, 0x40, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x24, 0x7e, 0x24, 0x24, 0x20, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x1c, 0x40, 0x4e, 0x40, 0x40, 0x24, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x40, 0x20, 0x10, 0x18, 0x24, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x08, 0x7e, 0x48, 0x28, 0x08, 0x48, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x42, 0x44, 0x48, 0x20, 0x10, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x42, 0x42, 0x50, 0x20, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x50, 0x3e, 0x10, 0x7c, 0x10, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x00, 0x7e, 0x40, 0x20, 0x10, 0x0c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x38, 0x00, 0x7c, 0x10, 0x10, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x04, 0x1c, 0x24, 0x44, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x7c, 0x10, 0x10, 0x10, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x40, 0x40, 0x28, 0x10, 0x28, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x7e, 0x40, 0x20, 0x30, 0x58, 0x14, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x60, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x20, 0x50, 0x50, 0x50, 0x48, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x02, 0x02, 0x7e, 0x02, 0x02, 0x42, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x40, 0x40, 0x20, 0x10, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x08, 0x14, 0x22, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x10, 0x7c, 0x10, 0x54, 0x54, 0x54, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x40, 0x40, 0x28, 0x10, 0x20, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x02, 0x3c, 0x42, 0x3c, 0x42, 0x3c, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x20, 0x10, 0x08, 0x04, 0x12, 0x22, 0x5e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x40, 0x44, 0x28, 0x10, 0x28, 0x04, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x08, 0x3c, 0x08, 0x08, 0x48, 0x30, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x08, 0x7e, 0x48, 0x28, 0x08, 0x08, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x3c, 0x20, 0x20, 0x20, 0x10, 0x08, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x40, 0x40, 0x7c, 0x40, 0x40, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x54, 0x54, 0x44, 0x40, 0x20, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x42, 0x42, 0x42, 0x42, 0x22, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0a, 0x0a, 0x0a, 0x4a, 0x4a, 0x2a, 0x1a, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x04, 0x04, 0x44, 0x44, 0x24, 0x1c, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x42, 0x42, 0x42, 0x42, 0x42, 0x7e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x7e, 0x42, 0x42, 0x40, 0x20, 0x10, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x4e, 0x40, 0x40, 0x40, 0x20, 0x12, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x08, 0x12, 0x24, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x04, 0x0a, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ];
    /**
     * Class representing a font and able to generate its glyphs.
     */
    class Font {
        constructor(bits, width, height, banks) {
            this.bits = bits;
            this.width = width;
            this.height = height;
            this.banks = banks;
        }
        /**
         * Make a bitmap for the specified character (0-255). "on" pixels are the
         * specified color, "off" pixels are fully transparent.
         */
        makeImage(char, expanded, options) {
            const canvas = document.createElement("canvas");
            let expandedMultiplier = expanded ? 2 : 1;
            canvas.width = this.width * expandedMultiplier;
            canvas.height = this.height * 2;
            const ctx = canvas.getContext("2d");
            if (ctx === null) {
                throw new Error("2d context not supported");
            }
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            // Light pixel at (x,y) in imageData if bit "bit" of "byte" is on.
            const lightPixel = (x, y, byte, bit) => {
                const pixel = (byte & (1 << bit)) !== 0;
                if (pixel) {
                    const pixelOffset = (y * canvas.width + x) * 4;
                    const alpha = options.scanLines ? (y % 2 == 0 ? 0xFF : 0xAA) : 0xFF;
                    imageData.data[pixelOffset + 0] = options.color[0];
                    imageData.data[pixelOffset + 1] = options.color[1];
                    imageData.data[pixelOffset + 2] = options.color[2];
                    imageData.data[pixelOffset + 3] = alpha;
                }
            };
            const bankOffset = this.banks[Math.floor(char / 64)];
            if (bankOffset === -1) {
                // Graphical character.
                const byte = char % 64;
                for (let y = 0; y < canvas.height; y++) {
                    const py = Math.floor(y / (canvas.height / 3));
                    for (let x = 0; x < canvas.width; x++) {
                        const px = Math.floor(x / (canvas.width / 2));
                        const bit = py * 2 + px;
                        lightPixel(x, y, byte, bit);
                    }
                }
            }
            else {
                // Bitmap character.
                const charOffset = bankOffset + char % 64;
                const byteOffset = charOffset * 12;
                for (let y = 0; y < canvas.height; y++) {
                    const byte = this.bits[byteOffset + Math.floor(y / 2)];
                    for (let x = 0; x < canvas.width; x++) {
                        lightPixel(x, y, byte, Math.floor(x / expandedMultiplier));
                    }
                }
            }
            ctx.putImageData(imageData, 0, 0);
            return canvas;
        }
    }
    // Original Model I.
    const MODEL1A_FONT = new Font(GLYPH_CG1, 6, 12, [0, 64, -1, -1]);
    // Model I with lower case mod.
    const MODEL1B_FONT = new Font(GLYPH_CG2, 6, 12, [0, 64, -1, -1]);
    // Original Model III, with special symbols.
    const MODEL3_FONT = new Font(GLYPH_CG4, 8, 12, [0, 64, -1, 128]);
    // Original Model III, with Katakana.
    const MODEL3_ALT_FONT = new Font(GLYPH_CG4, 8, 12, [0, 64, -1, 192]);
    //# sourceMappingURL=Fonts.js.map

    const gCssPrefix = CSS_PREFIX + "-canvas-screen";
    const gBlackBackgroundClass = gCssPrefix + "-black-background";
    const BASE_CSS = `

.${gCssPrefix} {
    display: inline-block;
    padding: 10px;
    background-color: #334843;
    border-radius: 8px;
}

.${gCssPrefix}.${gBlackBackgroundClass} {
    background-color: black;
}

`;
    /**
     * Make a global stylesheet for all TRS-80 emulators on this page. Idempotent.
     */
    function configureStylesheet() {
        const styleId = gCssPrefix;
        if (document.getElementById(styleId) !== null) {
            // Already created.
            return;
        }
        const node = document.createElement("style");
        node.id = styleId;
        node.innerHTML = BASE_CSS;
        document.head.appendChild(node);
    }
    // Run it on the next event cycle.
    const UPDATE_THUMBNAIL_TIMEOUT_MS = 0;
    const WHITE_PHOSPHOR = [230, 231, 252];
    const AMBER_PHOSPHOR = [247, 190, 64];
    const GREEN_PHOSPHOR = [122, 244, 96];
    /**
     * TRS-80 screen based on an HTML canvas element.
     */
    class CanvasScreen extends Trs80Screen {
        constructor(parentNode, isThumbnail) {
            super();
            this.memory = new Uint8Array(SCREEN_END - SCREEN_BEGIN);
            this.glyphs = [];
            this.config = Config.makeDefault();
            this.glyphWidth = 0;
            clearElement(parentNode);
            // Make our own sub-node that we have control over.
            this.node = document.createElement("div");
            this.node.classList.add(gCssPrefix);
            parentNode.appendChild(this.node);
            this.canvas = document.createElement("canvas");
            this.canvas.width = 64 * 8;
            this.canvas.height = 16 * 24;
            this.canvas.style.display = "block";
            this.context = this.canvas.getContext("2d");
            if (!isThumbnail) {
                this.node.appendChild(this.canvas);
            }
            if (isThumbnail) {
                this.thumbnailImage = document.createElement("img");
                this.thumbnailImage.width = 64 * 8 / 3;
                this.thumbnailImage.height = 16 * 24 / 3;
                this.node.appendChild(this.thumbnailImage);
            }
            this.updateFromConfig();
            // Make global CSS if necessary.
            configureStylesheet();
        }
        setConfig(config) {
            this.config = config;
            this.updateFromConfig();
        }
        /**
         * Update the font and screen from the config and other state.
         */
        updateFromConfig() {
            let color;
            switch (this.config.phosphor) {
                case Phosphor.WHITE:
                default:
                    color = WHITE_PHOSPHOR;
                    break;
                case Phosphor.GREEN:
                    color = GREEN_PHOSPHOR;
                    break;
                case Phosphor.AMBER:
                    color = AMBER_PHOSPHOR;
                    break;
            }
            let font;
            switch (this.config.cgChip) {
                case CGChip.ORIGINAL:
                    font = MODEL1A_FONT;
                    break;
                case CGChip.LOWER_CASE:
                default:
                    switch (this.config.modelType) {
                        case ModelType.MODEL1:
                            font = MODEL1B_FONT;
                            break;
                        case ModelType.MODEL3:
                        default:
                            font = this.isAlternateCharacters() ? MODEL3_ALT_FONT : MODEL3_FONT;
                            break;
                    }
                    break;
            }
            switch (this.config.background) {
                case Background.BLACK:
                    this.node.classList.add(gBlackBackgroundClass);
                    break;
                case Background.AUTHENTIC:
                default:
                    this.node.classList.remove(gBlackBackgroundClass);
                    break;
            }
            const glyphOptions = {
                color: color,
                scanLines: this.config.scanLines === ScanLines.ON,
            };
            for (let i = 0; i < 256; i++) {
                this.glyphs[i] = font.makeImage(i, this.isExpandedCharacters(), glyphOptions);
            }
            this.glyphWidth = font.width;
            this.refresh();
        }
        writeChar(address, value) {
            const offset = address - SCREEN_BEGIN;
            this.memory[offset] = value;
            this.drawChar(offset, value);
            this.scheduleUpdateThumbnail();
        }
        /**
         * Draw a single character to the canvas.
         */
        drawChar(offset, value) {
            const screenX = (offset % 64) * 8;
            const screenY = Math.floor(offset / 64) * 24;
            if (this.isExpandedCharacters()) {
                if (offset % 2 === 0) {
                    this.context.clearRect(screenX, screenY, 16, 24);
                    this.context.drawImage(this.glyphs[value], 0, 0, this.glyphWidth * 2, 24, screenX, screenY, 16, 24);
                }
            }
            else {
                this.context.clearRect(screenX, screenY, 8, 24);
                this.context.drawImage(this.glyphs[value], 0, 0, this.glyphWidth, 24, screenX, screenY, 8, 24);
            }
        }
        getNode() {
            return this.node;
        }
        setExpandedCharacters(expanded) {
            if (expanded !== this.isExpandedCharacters()) {
                super.setExpandedCharacters(expanded);
                this.updateFromConfig();
            }
        }
        setAlternateCharacters(alternate) {
            if (alternate !== this.isAlternateCharacters()) {
                super.setAlternateCharacters(alternate);
                this.updateFromConfig();
            }
        }
        /**
         * Refresh the display based on what we've kept track of.
         */
        refresh() {
            for (let offset = 0; offset < this.memory.length; offset++) {
                this.drawChar(offset, this.memory[offset]);
            }
            this.scheduleUpdateThumbnail();
        }
        /**
         * Schedule a future update of our thumbnail.
         */
        scheduleUpdateThumbnail() {
            this.cancelUpdateThumbnail();
            this.updateThumbnailTimeout = window.setTimeout(() => {
                this.updateThumbnailTimeout = undefined;
                this.updateThumbnail();
            }, UPDATE_THUMBNAIL_TIMEOUT_MS);
        }
        /**
         * Cancel any previously-cancelled scheduled thumbnail update.
         */
        cancelUpdateThumbnail() {
            if (this.updateThumbnailTimeout !== undefined) {
                window.clearTimeout(this.updateThumbnailTimeout);
                this.updateThumbnailTimeout = undefined;
            }
        }
        /**
         * Synchronously update the thumbnail.
         */
        updateThumbnail() {
            if (this.thumbnailImage !== undefined) {
                this.thumbnailImage.src = this.canvas.toDataURL();
            }
        }
    }
    //# sourceMappingURL=CanvasScreen.js.map

    const gCssPrefix$1 = CSS_PREFIX + "-settings-panel";
    const gScreenNodeCssClass = gCssPrefix$1 + "-screen-node";
    const gPanelCssClass = gCssPrefix$1 + "-panel";
    const gShownCssClass = gCssPrefix$1 + "-shown";
    const gAcceptButtonCssClass = gCssPrefix$1 + "-accept";
    const gRebootButtonCssClass = gCssPrefix$1 + "-reboot";
    const gOptionsClass = gCssPrefix$1 + "-options";
    const gButtonsClass = gCssPrefix$1 + "-buttons";
    const GLOBAL_CSS = `
.${gPanelCssClass} {
    display: flex;
    align-items: stretch;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity .20s ease-in-out;
}

.${gPanelCssClass}.${gShownCssClass} {
    opacity: 1;
    visibility: visible;
}

.${gPanelCssClass} > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 15px;
    color: #ccc;
    font-family: sans-serif;
    font-size: 10pt;
    line-height: normal;
    margin: 20px 0;
    padding: 10px 30px;
}

.${gPanelCssClass} h1 {
    text-transform: uppercase;
    text-align: center;
    letter-spacing: .5px;
    font-size: 10pt;
    margin: 0 0 10px 0;
}

.${gPanelCssClass} .${gOptionsClass} {
    display: flex;
}

.${gPanelCssClass} input[type=radio] {
    display: none;
}

.${gPanelCssClass} input[type=radio] + label {
    display: block;
    flex-grow: 1;
    flex-basis: 0;
    text-align: center;
    padding: 4px 16px;
    margin-left: 10px;
    border-radius: 3px;
    background-color: #44443A;
    white-space: nowrap;
}

.${gPanelCssClass} input[type=radio] + label:first-of-type {
    margin-left: 0;
}

.${gPanelCssClass} input[type=radio]:enabled + label:hover {
    background-color: #66665A;
}

.${gPanelCssClass} input[type=radio]:disabled + label {
    color: #666;
}

.${gPanelCssClass} input[type=radio]:enabled:checked + label {
    color: #444;
    background-color: #ccc;
}

.${gPanelCssClass} .${gButtonsClass} {
    display: flex;
}

.${gPanelCssClass} a {
    display: block;
    flex-grow: 1;
    flex-basis: 0;
    text-align: center;
    padding: 4px 16px;
    border-radius: 3px;
    margin-left: 10px;
    color: #ccc;
    background-color: #44443A;
    cursor: default;
}

.${gPanelCssClass} a:first-of-type {
    margin-left: 0;
}

.${gPanelCssClass} a.${gAcceptButtonCssClass} {
    font-weight: bold;
    color: #eee;
    background-color: #449944;
}

.${gPanelCssClass} a.${gAcceptButtonCssClass}:hover {
    background-color: #338833;
}

.${gPanelCssClass} a.${gRebootButtonCssClass} {
    background-color: #D25F43;
}

.${gPanelCssClass} a:hover {
    background-color: #66665A;
}

.${gPanelCssClass} a.${gRebootButtonCssClass}:hover {
    background-color: #BD563C;
}

.${gScreenNodeCssClass} {
    /* Force the screen node to relative positioning. Hope that doesn't screw anything up. */
    position: relative;
}
`;
    /**
     * An option that's currently displayed to the user.
     */
    class DisplayedOption {
        constructor(input, block, option) {
            this.input = input;
            this.block = block;
            this.option = option;
        }
    }
    /**
     * Our full configuration options.
     */
    const HARDWARE_OPTION_BLOCKS = [
        {
            title: "Model",
            isChecked: (modelType, config) => modelType === config.modelType,
            updateConfig: (modelType, config) => config.withModelType(modelType),
            options: [
                {
                    label: "Model I",
                    value: ModelType.MODEL1,
                },
                {
                    label: "Model III",
                    value: ModelType.MODEL3,
                },
            ]
        },
        {
            title: "Basic",
            isChecked: (basicLevel, config) => basicLevel === config.basicLevel,
            updateConfig: (basicLevel, config) => config.withBasicLevel(basicLevel),
            options: [
                {
                    label: "Level 1",
                    value: BasicLevel.LEVEL1,
                },
                {
                    label: "Level 2",
                    value: BasicLevel.LEVEL2,
                },
            ]
        },
        {
            title: "Characters",
            isChecked: (cgChip, config) => cgChip === config.cgChip,
            updateConfig: (cgChip, config) => config.withCGChip(cgChip),
            options: [
                {
                    label: "Original",
                    value: CGChip.ORIGINAL,
                },
                {
                    label: "Lower case",
                    value: CGChip.LOWER_CASE,
                },
            ]
        },
        {
            title: "RAM",
            isChecked: (ramSize, config) => ramSize === config.ramSize,
            updateConfig: (ramSize, config) => config.withRamSize(ramSize),
            options: [
                {
                    label: "4 kB",
                    value: RamSize.RAM_4_KB,
                },
                {
                    label: "16 kB",
                    value: RamSize.RAM_16_KB,
                },
                {
                    label: "32 kB",
                    value: RamSize.RAM_32_KB,
                },
                {
                    label: "48 kB",
                    value: RamSize.RAM_48_KB,
                },
            ]
        },
    ];
    const VIEW_OPTION_BLOCKS = [
        {
            title: "Phosphor",
            isChecked: (phosphor, config) => phosphor === config.phosphor,
            updateConfig: (phosphor, config) => config.withPhosphor(phosphor),
            options: [
                {
                    label: "White",
                    value: Phosphor.WHITE,
                },
                {
                    label: "Green",
                    value: Phosphor.GREEN,
                },
                {
                    label: "Amber",
                    value: Phosphor.AMBER,
                },
            ]
        },
        {
            title: "Background",
            isChecked: (background, config) => background === config.background,
            updateConfig: (background, config) => config.withBackground(background),
            options: [
                {
                    label: "Black",
                    value: Background.BLACK,
                },
                {
                    label: "Authentic",
                    value: Background.AUTHENTIC,
                },
            ]
        },
        {
            title: "Scan Lines",
            isChecked: (scanLines, config) => scanLines === config.scanLines,
            updateConfig: (scanLines, config) => config.withScanLines(scanLines),
            options: [
                {
                    label: "Off",
                    value: ScanLines.OFF,
                },
                {
                    label: "On",
                    value: ScanLines.ON,
                },
            ]
        },
    ];
    (function (PanelType) {
        // Model, RAM, etc.
        PanelType[PanelType["HARDWARE"] = 0] = "HARDWARE";
        // Phosphor color, background, etc.
        PanelType[PanelType["VIEW"] = 1] = "VIEW";
    })(exports.PanelType || (exports.PanelType = {}));
    // Get the right options blocks for the panel type.
    function optionBlocksForPanelType(panelType) {
        switch (panelType) {
            case exports.PanelType.HARDWARE:
            default:
                return HARDWARE_OPTION_BLOCKS;
            case exports.PanelType.VIEW:
                return VIEW_OPTION_BLOCKS;
        }
    }
    let gRadioButtonCounter = 1;
    /**
     * A full-screen control panel for configuring the emulator.
     */
    class SettingsPanel {
        constructor(screenNode, trs80, panelType) {
            this.displayedOptions = [];
            this.panelType = panelType;
            this.trs80 = trs80;
            // Make global CSS if necessary.
            SettingsPanel.configureStyle();
            screenNode.classList.add(gScreenNodeCssClass);
            this.panelNode = document.createElement("div");
            this.panelNode.classList.add(gPanelCssClass);
            screenNode.appendChild(this.panelNode);
            const div = document.createElement("div");
            this.panelNode.appendChild(div);
            for (const block of optionBlocksForPanelType(panelType)) {
                const name = gCssPrefix$1 + "-" + gRadioButtonCounter++;
                const blockDiv = document.createElement("div");
                div.appendChild(blockDiv);
                const h1 = document.createElement("h1");
                h1.innerText = block.title;
                blockDiv.appendChild(h1);
                const optionsDiv = document.createElement("div");
                optionsDiv.classList.add(gOptionsClass);
                blockDiv.appendChild(optionsDiv);
                for (const option of block.options) {
                    const id = gCssPrefix$1 + "-" + gRadioButtonCounter++;
                    const input = document.createElement("input");
                    input.id = id;
                    input.type = "radio";
                    input.name = name;
                    input.addEventListener("change", () => this.updateEnabledOptions());
                    optionsDiv.appendChild(input);
                    const label = document.createElement("label");
                    label.htmlFor = id;
                    label.innerText = option.label;
                    optionsDiv.appendChild(label);
                    this.displayedOptions.push(new DisplayedOption(input, block, option));
                }
            }
            const buttonsDiv = document.createElement("div");
            buttonsDiv.classList.add(gButtonsClass);
            div.appendChild(buttonsDiv);
            this.acceptButton = document.createElement("a");
            this.acceptButton.classList.add(gAcceptButtonCssClass);
            this.acceptButton.addEventListener("click", (event) => {
                event.preventDefault();
                this.accept();
            });
            buttonsDiv.appendChild(this.acceptButton);
            this.configureAcceptButton(this.trs80.getConfig());
            const cancelButton = document.createElement("a");
            cancelButton.innerText = "Cancel";
            cancelButton.addEventListener("click", (event) => {
                event.preventDefault();
                this.close();
            });
            buttonsDiv.appendChild(cancelButton);
        }
        /**
         * Open the settings panel.
         */
        open() {
            if (this.onOpen !== undefined) {
                this.onOpen();
            }
            // Configure options.
            for (const displayedOption of this.displayedOptions) {
                displayedOption.input.checked = displayedOption.block.isChecked(displayedOption.option.value, this.trs80.getConfig());
            }
            this.updateEnabledOptions();
            this.panelNode.classList.add(gShownCssClass);
        }
        /**
         * Accept the changes, configure the machine, and close the dialog box.
         */
        accept() {
            this.trs80.setConfig(this.getConfig());
            this.close();
        }
        /**
         * Close the settings panel.
         */
        close() {
            this.panelNode.classList.remove(gShownCssClass);
            if (this.onClose !== undefined) {
                this.onClose();
            }
        }
        /**
         * Update which options are enabled based on the current selection.
         */
        updateEnabledOptions() {
            const config = this.getConfig();
            for (const displayedOption of this.displayedOptions) {
                const enabled = displayedOption.block.updateConfig(displayedOption.option.value, config).isValid();
                displayedOption.input.disabled = !enabled;
            }
            this.configureAcceptButton(config);
        }
        /**
         * Set the accept button to be OK or Reboot.
         */
        configureAcceptButton(config) {
            if (config.needsReboot(this.trs80.getConfig())) {
                this.acceptButton.classList.add(gRebootButtonCssClass);
                this.acceptButton.innerText = "Reboot";
            }
            else {
                this.acceptButton.classList.remove(gRebootButtonCssClass);
                this.acceptButton.innerText = "OK";
            }
        }
        /**
         * Make a new config from the user's currently selected options.
         */
        getConfig() {
            let config = this.trs80.getConfig();
            for (const displayedOption of this.displayedOptions) {
                if (displayedOption.input.checked) {
                    config = displayedOption.block.updateConfig(displayedOption.option.value, config);
                }
            }
            return config;
        }
        /**
         * Make a global stylesheet for all TRS-80 emulators on this page.
         */
        static configureStyle() {
            const styleId = gCssPrefix$1;
            if (document.getElementById(styleId) !== null) {
                // Already created.
                return;
            }
            const node = document.createElement("style");
            node.id = styleId;
            node.innerHTML = GLOBAL_CSS;
            document.head.appendChild(node);
        }
    }
    //# sourceMappingURL=SettingsPanel.js.map

    const gCssPrefix$2 = CSS_PREFIX + "-control-panel";
    const gScreenNodeCssClass$1 = gCssPrefix$2 + "-screen-node";
    const gPanelCssClass$1 = gCssPrefix$2 + "-panel";
    const gButtonCssClass = gCssPrefix$2 + "-button";
    const gShowingOtherPanelCssClass = gCssPrefix$2 + "-showing-other-panel";
    // https://thenounproject.com/search/?q=reset&i=3012384
    const RESET_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="30" height="30" viewBox="0 0 100 100" xml:space="preserve">
    <switch>
        <g fill="white">
            <path d="M5273.1,2400.1v-2c0-2.8-5-4-9.7-4s-9.7,1.3-9.7,4v2c0,1.8,0.7,3.6,2,4.9l5,4.9c0.3,0.3,0.4,0.6,0.4,1v6.4     c0,0.4,0.2,0.7,0.6,0.8l2.9,0.9c0.5,0.1,1-0.2,1-0.8v-7.2c0-0.4,0.2-0.7,0.4-1l5.1-5C5272.4,2403.7,5273.1,2401.9,5273.1,2400.1z      M5263.4,2400c-4.8,0-7.4-1.3-7.5-1.8v0c0.1-0.5,2.7-1.8,7.5-1.8c4.8,0,7.3,1.3,7.5,1.8C5270.7,2398.7,5268.2,2400,5263.4,2400z"/>
            <path d="M5268.4,2410.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1H5268.4z"/>
            <path d="M5272.7,2413.7h-4.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1C5273.7,2414.1,5273.3,2413.7,5272.7,2413.7z"/>
            <path d="M5272.7,2417h-4.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1C5273.7,2417.5,5273.3,2417,5272.7,2417z"/>
            <path d="M84.3,18C67.1,0.8,39.5,0.4,21.8,16.5l-4.1-4.1c-1.6-1.6-4-2.2-6.2-1.6c-2.2,0.7-3.9,2.5-4.3,4.7L2.6,36.9    c-0.4,2.1,0.2,4.2,1.7,5.7c1.5,1.5,3.6,2.1,5.7,1.7l21.4-4.5c1.2-0.3,2.3-0.9,3.1-1.7c0.7-0.7,1.3-1.6,1.6-2.6    c0.6-2.2,0-4.6-1.6-6.2l-3.9-3.9C43.5,14,63.1,14.5,75.4,26.8c12.8,12.8,12.8,33.6,0,46.4C62.6,86,41.8,86,29,73.2    c-4.1-4.1-7-9.2-8.5-14.8c-0.9-3.3-4.3-5.3-7.6-4.4c-3.3,0.9-5.3,4.3-4.4,7.6c2,7.7,6.1,14.8,11.8,20.4    c17.7,17.7,46.4,17.7,64.1,0C101.9,64.4,101.9,35.6,84.3,18z"/>
        </g>
    </switch>
</svg>
`;
    // https://thenounproject.com/search/?q=camera&i=1841396
    const CAMERA_ICON = `
<svg xmlns="http://www.w3.org/2000/svg"  version="1.1" x="0px" y="0px" width="30" height="30" viewBox="0 0 100 100" xml:space="preserve">
    <g fill="white">
        <circle cx="50" cy="55.4" r="13.8"/>
        <path d="M80.6,25.4H67.1l-1.8-7.2c-0.5-2.1-2.5-3.6-4.7-3.6H39.3c-2.2,0-4.1,1.5-4.7,3.6l-1.8,7.2H19.4C11.5,25.4,5,31.9,5,39.8V71   c0,7.9,6.5,14.4,14.4,14.4h61.2C88.5,85.4,95,78.9,95,71V39.8C95,31.9,88.5,25.4,80.6,25.4z M50,76.4c-11.6,0-21-9.4-21-21   s9.4-21,21-21s21,9.4,21,21S61.6,76.4,50,76.4z M81.4,40.3c-2,0-3.6-1.6-3.6-3.6c0-2,1.6-3.6,3.6-3.6s3.6,1.6,3.6,3.6   C85,38.7,83.4,40.3,81.4,40.3z"/>
    </g>
</svg>
`;
    // https://thenounproject.com/search/?q=previous%20track&i=658409
    const PREVIOUS_TRACK_ICON = `
<svg xmlns="http://www.w3.org/2000/svg"  width="30" height="30" viewBox="-1 -2 16 21" version="1.1" x="0px" y="0px">
    <g fill="white" fill-rule="evenodd">
        <g transform="translate(-320.000000, -618.000000)">
            <path d="M330,628.032958 L330,634.00004 C330,634.545291 330.45191,635 331.009369,635 L332.990631,635 C333.556647,635 334,634.552303 334,634.00004 L334,618.99996 C334,618.454709 333.54809,618 332.990631,618 L331.009369,618 C330.443353,618 330,618.447697 330,618.99996 L330,624.967057 C329.894605,624.850473 329.775773,624.739153 329.643504,624.634441 L322.356496,618.865559 C321.054403,617.834736 320,618.3432 320,620.000122 L320,632.999878 C320,634.663957 321.055039,635.164761 322.356496,634.134441 L329.643504,628.365559 C329.775779,628.260841 329.894611,628.149527 330,628.032958 Z" transform="translate(327.000000, 626.500000) scale(-1, 1) translate(-327.000000, -626.500000) "/>
        </g>
    </g>
</svg>
`;
    // https://thenounproject.com/search/?q=settings&i=3593545
    const HARDWARE_SETTINGS_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="7 7 121 121" version="1.1" x="0px" y="0px" width="30" height="30">
    <g fill="white" transform="translate(0,-161.53332)">
        <path d="m 61.57997,173.33818 c -1.653804,0 -3.159177,0.77847 -4.132553,1.85984 -0.973402,1.08136 -1.513575,2.40442 -1.771491,3.76721 a 2.1609049,2.1609049 0 0 0 0,0.002 l -1.654678,8.74831 c -2.047981,0.67947 -4.038494,1.50768 -5.964476,2.48047 l -7.367508,-5.02347 c -1.145302,-0.78076 -2.462953,-1.33572 -3.916045,-1.41232 -1.4546,-0.0764 -3.068029,0.44118 -4.235926,1.60921 l -8.699209,8.69921 c -1.169405,1.16909 -1.685211,2.78351 -1.609725,4.23643 0.07501,1.45291 0.629259,2.7738 1.410256,3.92018 l 5.001762,7.336 c -0.9702,1.93582 -1.794192,3.93628 -2.468589,5.99392 l -8.740034,1.65417 c -1.362789,0.25787 -2.688378,0.79815 -3.769783,1.77147 -1.081405,0.97346 -1.859333,2.4815 -1.859333,4.13526 v 12.30262 c 0,1.65378 0.777928,3.1592 1.859333,4.13255 1.081405,0.97338 2.406994,1.51567 3.769783,1.77353 l 8.754004,1.6583 c 0.679477,2.04603 1.506088,4.03461 2.478379,5.95882 l -5.025522,7.3675 c -0.781606,1.14644 -1.334744,2.4664 -1.410256,3.91967 -0.07498,1.45325 0.439817,3.06745 1.609725,4.23643 l 8.699209,8.69921 c 1.1693,1.16941 2.782914,1.68325 4.235926,1.60713 1.452986,-0.0761 2.771908,-0.63037 3.918109,-1.41179 l 7.33597,-5.00022 c 1.9363,0.97001 3.937926,1.79294 5.996014,2.46702 l 1.654175,8.74004 c 0.257889,1.36284 0.798486,2.68843 1.771994,3.76981 0.973402,1.08138 2.478749,1.8593 4.132553,1.8593 H 73.88672 c 1.653805,0 3.159152,-0.77792 4.132554,-1.8593 0.973005,-1.0809 1.513999,-2.40554 1.771994,-3.76772 v -0.003 l 1.656212,-8.74778 c 2.048113,-0.67943 4.038415,-1.50768 5.964502,-2.48047 l 7.365445,5.02142 c 1.146095,0.78144 2.465096,1.33567 3.918108,1.41179 1.452905,0.0761 3.068585,-0.43786 4.237995,-1.60713 l 8.6992,-8.69921 c 1.16931,-1.16946 1.68395,-2.78551 1.60767,-4.23852 -0.076,-1.45301 -0.63074,-2.77196 -1.41232,-3.91811 l -5.00177,-7.33547 c 0.9705,-1.93617 1.79398,-3.93639 2.46857,-5.99445 l 8.74003,-1.65418 c 1.36271,-0.25794 2.68841,-0.80018 3.76981,-1.77352 1.0813,-0.97335 1.85931,-2.47881 1.85931,-4.13256 v -12.30312 c 0,-1.65378 -0.77801,-3.16127 -1.85931,-4.13465 -1.0809,-0.97292 -2.40562,-1.51344 -3.76772,-1.77146 l -8.74988,-1.65624 c -0.67918,-2.04684 -1.50825,-4.03585 -2.48046,-5.96088 l 5.02348,-7.36698 c 0.78118,-1.14583 1.33572,-2.46501 1.41232,-3.91811 0.077,-1.45309 -0.43952,-3.06905 -1.60973,-4.2385 l -8.69714,-8.69921 c -1.16962,-1.16891 -2.78461,-1.68557 -4.238494,-1.6092 -1.4528,0.0768 -2.770425,0.63186 -3.915542,1.41232 l -7.33597,5.00176 c -1.9363,-0.96998 -3.937926,-1.79297 -5.996014,-2.46703 l -1.656768,-8.74211 c -0.257783,-1.36269 -0.798062,-2.68582 -1.771464,-3.76721 -0.973297,-1.0814 -2.478749,-1.85984 -4.132554,-1.85984 z m 6.152595,34.74051 c 11.726704,0 21.185664,9.46065 21.185267,21.18735 0,11.7262 -9.459066,21.18696 -21.185267,21.18733 -11.726704,0 -21.187463,-9.4606 -21.18786,-21.18733 0,-11.72726 9.460653,-21.18772 21.18786,-21.18735 z"/>
    </g>
</svg>
`;
    // https://thenounproject.com/search/?q=view&i=485540
    const VIEW_SETTINGS_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="20 20 60 60">
    <g fill="white">
        <path d="M80,48.6c-7.8-10.4-18.4-16.7-30-16.7c-11.6,0-22.2,6.4-30,16.7c-0.6,0.9-0.6,2,0,2.9c7.8,10.4,18.4,16.7,30,16.7  s22.2-6.4,30-16.7C80.7,50.6,80.7,49.4,80,48.6z M62.8,50.8c-0.4,6.4-5.6,11.6-12,12c-7.7,0.5-14.1-5.9-13.6-13.6  c0.4-6.4,5.6-11.6,12-12C56.9,36.7,63.3,43.1,62.8,50.8z M56.9,50.4c-0.2,3.4-3,6.2-6.4,6.4c-4.2,0.3-7.6-3.2-7.3-7.3  c0.2-3.4,3-6.2,6.4-6.4C53.7,42.8,57.2,46.3,56.9,50.4z"/>
    </g>
</svg>
`;
    const GLOBAL_CSS$1 = `
.${gPanelCssClass$1} {
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 5px;
    opacity: 0;
    transition: opacity .20s ease-in-out;
}

.${gScreenNodeCssClass$1} {
    /* Force the screen node to relative positioning. Hope that doesn't screw anything up. */
    position: relative;
}

.${gScreenNodeCssClass$1}:hover .${gPanelCssClass$1} {
    opacity: 1;
}

/* Hide the control panel if any other panel is showing (like settings). */
.${gScreenNodeCssClass$1}.${gShowingOtherPanelCssClass}:hover .${gPanelCssClass$1} {
    opacity: 0;
}

.${gButtonCssClass} {
    display: block;
    margin: 15px;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity .05s ease-in-out;
    transition: transform 0.05s ease-in-out;
}

.${gButtonCssClass}:hover {
    opacity: 1;
}

.${gButtonCssClass}:active {
    transform: scale(1.15);
}
`;
    /**
     * Control panel that hovers in the screen for doing things like resetting the computer.
     */
    class ControlPanel {
        /**
         * @param screenNode the node from the Trs80Screen object's getNode() method.
         */
        constructor(screenNode) {
            // Make global CSS if necessary.
            ControlPanel.configureStyle();
            this.screenNode = screenNode;
            screenNode.classList.add(gScreenNodeCssClass$1);
            this.panelNode = document.createElement("div");
            this.panelNode.classList.add(gPanelCssClass$1);
            screenNode.appendChild(this.panelNode);
        }
        /**
         * Add a reset button.
         */
        addResetButton(callback) {
            let icon = document.createElement("img");
            icon.classList.add(gButtonCssClass);
            icon.src = "data:image/svg+xml;base64," + btoa(RESET_ICON);
            icon.title = "Reboot the computer";
            icon.addEventListener("click", callback);
            this.panelNode.appendChild(icon);
        }
        /**
         * Add a screenshot button.
         */
        addScreenshotButton(callback) {
            let icon = document.createElement("img");
            icon.classList.add(gButtonCssClass);
            icon.src = "data:image/svg+xml;base64," + btoa(CAMERA_ICON);
            icon.title = "Take a screenshot";
            icon.addEventListener("click", callback);
            this.panelNode.appendChild(icon);
        }
        /**
         * Add a tape rewind button.
         */
        addTapeRewindButton(callback) {
            let icon = document.createElement("img");
            icon.classList.add(gButtonCssClass);
            icon.src = "data:image/svg+xml;base64," + btoa(PREVIOUS_TRACK_ICON);
            icon.title = "Rewind the cassette";
            icon.addEventListener("click", callback);
            this.panelNode.appendChild(icon);
        }
        /**
         * Add a settings button.
         */
        addSettingsButton(settingsPanel) {
            settingsPanel.onOpen = () => this.screenNode.classList.add(gShowingOtherPanelCssClass);
            settingsPanel.onClose = () => this.screenNode.classList.remove(gShowingOtherPanelCssClass);
            let iconSvg;
            switch (settingsPanel.panelType) {
                case exports.PanelType.HARDWARE:
                default:
                    iconSvg = HARDWARE_SETTINGS_ICON;
                    break;
                case exports.PanelType.VIEW:
                    iconSvg = VIEW_SETTINGS_ICON;
                    break;
            }
            let icon = document.createElement("img");
            icon.classList.add(gButtonCssClass);
            icon.src = "data:image/svg+xml;base64," + btoa(iconSvg);
            icon.title = "Show the settings panel";
            icon.addEventListener("click", () => settingsPanel.open());
            this.panelNode.appendChild(icon);
        }
        /**
         * Make a global stylesheet for all TRS-80 emulators on this page.
         */
        static configureStyle() {
            const styleId = gCssPrefix$2;
            if (document.getElementById(styleId) !== null) {
                // Already created.
                return;
            }
            const node = document.createElement("style");
            node.id = styleId;
            node.innerHTML = GLOBAL_CSS$1;
            document.head.appendChild(node);
        }
    }
    //# sourceMappingURL=ControlPanel.js.map

    const gCssPrefix$3 = CSS_PREFIX + "-progress-bar";
    const gScreenNodeCssClass$2 = gCssPrefix$3 + "-screen-node";
    const gBarCssClass = gCssPrefix$3 + "-bar";
    const gSubbarCssClass = gCssPrefix$3 + "-subbar";
    const GLOBAL_CSS$2 = "." + gBarCssClass + ` {
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 15%;
    width: 70%;
    bottom: 10%;
    height: 20px;
    border-radius: 10px;
    overflow: hidden;
    opacity: 0;
    transition: opacity .20s ease-in-out;
}

.` + gSubbarCssClass + ` {
    background-color: rgba(255, 255, 255, 0.4);
    width: 0;
    height: 20px;
}

.` + gScreenNodeCssClass$2 + ` {
    /* Force the screen node to relative positioning. Hope that doesn't screw anything up. */
    position: relative;
}

`;
    /**
     * Overlay on top of a screen to show progress, for instance the position of a cassette tape.
     */
    class ProgressBar {
        /**
         * @param screenNode the node from the Trs80Screen object's getNode() method.
         */
        constructor(screenNode) {
            this.maxValue = 100;
            // Make global CSS if necessary.
            ProgressBar.configureStyle();
            screenNode.classList.add(gScreenNodeCssClass$2);
            this.barNode = document.createElement("div");
            this.barNode.classList.add(gBarCssClass);
            screenNode.appendChild(this.barNode);
            this.subbarNode = document.createElement("div");
            this.subbarNode.classList.add(gSubbarCssClass);
            this.barNode.appendChild(this.subbarNode);
        }
        setMaxValue(maxValue) {
            this.maxValue = maxValue;
        }
        setValue(value) {
            this.subbarNode.style.width = "" + Math.round(value * 100 / this.maxValue) + "%";
        }
        show() {
            this.barNode.style.opacity = "1";
        }
        hide() {
            this.barNode.style.opacity = "0";
        }
        /**
         * Make a global stylesheet for all TRS-80 emulators on this page.
         */
        static configureStyle() {
            const styleId = gCssPrefix$3;
            if (document.getElementById(styleId) !== null) {
                // Already created.
                return;
            }
            const node = document.createElement("style");
            node.id = styleId;
            node.innerHTML = GLOBAL_CSS$2;
            document.head.appendChild(node);
        }
    }
    //# sourceMappingURL=ProgressBar.js.map

    exports.CanvasScreen = CanvasScreen;
    exports.Cassette = Cassette;
    exports.ControlPanel = ControlPanel;
    exports.ProgressBar = ProgressBar;
    exports.SettingsPanel = SettingsPanel;
    exports.Trs80 = Trs80;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
