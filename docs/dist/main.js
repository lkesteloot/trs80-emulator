/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Core
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlingBase = exports.PromiseDispatcherBase = exports.PromiseSubscription = exports.DispatchError = exports.EventManagement = exports.EventListBase = exports.DispatcherWrapper = exports.DispatcherBase = exports.Subscription = void 0;
const DispatcherBase_1 = __webpack_require__(61);
Object.defineProperty(exports, "DispatcherBase", { enumerable: true, get: function () { return DispatcherBase_1.DispatcherBase; } });
const DispatchError_1 = __webpack_require__(62);
Object.defineProperty(exports, "DispatchError", { enumerable: true, get: function () { return DispatchError_1.DispatchError; } });
const DispatcherWrapper_1 = __webpack_require__(63);
Object.defineProperty(exports, "DispatcherWrapper", { enumerable: true, get: function () { return DispatcherWrapper_1.DispatcherWrapper; } });
const EventListBase_1 = __webpack_require__(64);
Object.defineProperty(exports, "EventListBase", { enumerable: true, get: function () { return EventListBase_1.EventListBase; } });
const EventManagement_1 = __webpack_require__(65);
Object.defineProperty(exports, "EventManagement", { enumerable: true, get: function () { return EventManagement_1.EventManagement; } });
const HandlingBase_1 = __webpack_require__(66);
Object.defineProperty(exports, "HandlingBase", { enumerable: true, get: function () { return HandlingBase_1.HandlingBase; } });
const PromiseDispatcherBase_1 = __webpack_require__(67);
Object.defineProperty(exports, "PromiseDispatcherBase", { enumerable: true, get: function () { return PromiseDispatcherBase_1.PromiseDispatcherBase; } });
const PromiseSubscription_1 = __webpack_require__(68);
Object.defineProperty(exports, "PromiseSubscription", { enumerable: true, get: function () { return PromiseSubscription_1.PromiseSubscription; } });
const Subscription_1 = __webpack_require__(69);
Object.defineProperty(exports, "Subscription", { enumerable: true, get: function () { return Subscription_1.Subscription; } });


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramAnnotation = void 0;
/**
 * Information about one particular section of a program. The indices refer back to a binary
 * that the program was parsed from.
 */
class ProgramAnnotation {
    constructor(text, begin, end) {
        this.text = text;
        this.begin = begin;
        this.end = end;
    }
    /**
     * Create a new program annotation with the begin and end increased by the specified offset.
     */
    adjusted(offset) {
        return new ProgramAnnotation(this.text, this.begin + offset, this.end + offset);
    }
}
exports.ProgramAnnotation = ProgramAnnotation;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Trs80File = void 0;
/**
 * Base class for decoded TRS-80 files.
 */
class Trs80File {
    constructor(binary, error, annotations) {
        this.binary = binary;
        this.error = error;
        this.annotations = annotations;
    }
}
exports.Trs80File = Trs80File;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(19), exports);
__exportStar(__webpack_require__(9), exports);
__exportStar(__webpack_require__(2), exports);
__exportStar(__webpack_require__(21), exports);
__exportStar(__webpack_require__(20), exports);
__exportStar(__webpack_require__(5), exports);
__exportStar(__webpack_require__(22), exports);
__exportStar(__webpack_require__(45), exports);
__exportStar(__webpack_require__(46), exports);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(39));
__export(__webpack_require__(40));
__export(__webpack_require__(17));
__export(__webpack_require__(41));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FloppyDisk = exports.SectorData = exports.numberToSide = exports.Side = void 0;
const Trs80File_1 = __webpack_require__(2);
// Side of a floppy disk.
var Side;
(function (Side) {
    Side[Side["FRONT"] = 0] = "FRONT";
    Side[Side["BACK"] = 1] = "BACK";
})(Side = exports.Side || (exports.Side = {}));
/**
 * Convert a number to a side, where 0 maps to FRONT and 1 maps to BACK.
 * Other numbers throw an exception.
 */
function numberToSide(n) {
    if (n === 0) {
        return Side.FRONT;
    }
    if (n === 1) {
        return Side.BACK;
    }
    throw new Error("Invalid side number " + n);
}
exports.numberToSide = numberToSide;
/**
 * Byte for filling sector data when reading off the end.
 */
const FILL_BYTE = 0xE5;
/**
 * Data from a sector that was read from a disk.
 */
class SectorData {
    constructor(data) {
        /**
         * Whether the sector data is invalid. This is indicated on the floppy by having a 0xF8 data
         * address mark (DAM) byte, instead of the normal 0xFB. For JV1 this is set to true for the directory track.
         */
        this.deleted = false;
        /**
         * Whether there was a CRC error when reading the physical disk.
         */
        this.crcError = false;
        this.data = data;
    }
}
exports.SectorData = SectorData;
/**
 * Abstract class for virtual floppy disk file formats.
 */
class FloppyDisk extends Trs80File_1.Trs80File {
    constructor(binary, error, annotations, supportsDoubleDensity) {
        super(binary, error, annotations);
        this.supportsDoubleDensity = supportsDoubleDensity;
    }
    /**
     * Pad a sector to its full length.
     */
    padSector(data, sectorSize) {
        if (data.length < sectorSize) {
            const newData = new Uint8Array(sectorSize);
            newData.set(data);
            newData.fill(FILL_BYTE, data.length);
            data = newData;
        }
        return data;
    }
}
exports.FloppyDisk = FloppyDisk;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(48));
__export(__webpack_require__(49));
__export(__webpack_require__(23));
__export(__webpack_require__(50));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(37), exports);
__exportStar(__webpack_require__(38), exports);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CSS_PREFIX = void 0;
exports.CSS_PREFIX = "trs80-emulator";


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Tools for dealing with SYSTEM (machine language) programs.
 *
 * http://www.trs-80.com/wordpress/zaps-patches-pokes-tips/tape-and-file-formats-structures/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSystemProgram = exports.SystemProgram = exports.SystemChunk = void 0;
const teamten_ts_utils_1 = __webpack_require__(7);
const z80_base_1 = __webpack_require__(4);
const ProgramAnnotation_1 = __webpack_require__(1);
const Trs80File_1 = __webpack_require__(2);
const FILE_HEADER = 0x55;
const DATA_HEADER = 0x3C;
const END_OF_FILE_MARKER = 0x78;
const FILENAME_LENGTH = 6;
/**
 * Represents a chunk of bytes from the file, with a checksum.
 */
class SystemChunk {
    constructor(loadAddress, data, checksum) {
        this.loadAddress = loadAddress;
        this.data = data;
        this.checksum = checksum;
    }
    /**
     * Whether the checksum supplied on tape matches what we compute.
     */
    isChecksumValid() {
        let checksum = 0;
        // Include load address and data.
        checksum += (this.loadAddress >> 8) & 0xFF;
        checksum += this.loadAddress & 0xFF;
        for (const b of this.data) {
            checksum += b;
        }
        checksum &= 0xFF;
        return checksum === this.checksum;
    }
}
exports.SystemChunk = SystemChunk;
/**
 * Class representing a SYSTEM (machine language) program. If the "error" field is set, then something
 * went wrong with the program and the data may be partially loaded.
 */
class SystemProgram extends Trs80File_1.Trs80File {
    constructor(binary, error, filename, chunks, entryPointAddress, annotations) {
        super(binary, error, annotations);
        this.filename = filename;
        this.chunks = chunks;
        this.entryPointAddress = entryPointAddress;
        this.annotations = annotations;
    }
    getDescription() {
        return "System program (" + this.filename + ")";
    }
    /**
     * Convert an address in memory to the original byte offset in the binary. Returns undefined if
     * not found in any chunk.
     */
    addressToByteOffset(address) {
        // Skip file header and block header.
        let offset = 1 + FILENAME_LENGTH + 4;
        for (const chunk of this.chunks) {
            if (address >= chunk.loadAddress && address < chunk.loadAddress + chunk.data.length) {
                return offset + (address - chunk.loadAddress);
            }
            // Skip checksum and block header of the next block.
            offset += chunk.data.length + 5;
        }
        return undefined;
    }
}
exports.SystemProgram = SystemProgram;
/**
 * Decodes a system program from the binary. If the binary is not at all a system
 * program, returns undefined. If it's a system program with decoding errors, returns
 * partially-decoded binary and sets the "error" field.
 */
function decodeSystemProgram(binary) {
    const chunks = [];
    const annotations = [];
    let entryPointAddress = 0;
    const b = new teamten_ts_utils_1.ByteReader(binary);
    const headerByte = b.read();
    if (headerByte === teamten_ts_utils_1.EOF) {
        return undefined;
    }
    if (headerByte !== FILE_HEADER) {
        return undefined;
    }
    annotations.push(new ProgramAnnotation_1.ProgramAnnotation("System file header", b.addr() - 1, b.addr()));
    let filename = b.readString(FILENAME_LENGTH);
    // Make a SystemProgram object with what we have so far.
    const makeSystemProgram = (error) => {
        const programBinary = binary.subarray(0, b.addr());
        return new SystemProgram(programBinary, error, filename, chunks, entryPointAddress, annotations);
    };
    if (filename.length < FILENAME_LENGTH) {
        // Binary is truncated.
        return makeSystemProgram("File is truncated at filename");
    }
    filename = filename.trim();
    annotations.push(new ProgramAnnotation_1.ProgramAnnotation(`Filename "${filename}"`, b.addr() - FILENAME_LENGTH, b.addr()));
    while (true) {
        const marker = b.read();
        if (marker === teamten_ts_utils_1.EOF) {
            return makeSystemProgram("File is truncated at start of block");
        }
        if (marker === END_OF_FILE_MARKER) {
            annotations.push(new ProgramAnnotation_1.ProgramAnnotation("End of file marker", b.addr() - 1, b.addr()));
            break;
        }
        if (marker !== DATA_HEADER) {
            // Here if the marker is 0x55, we could guess that it's a high-speed cassette header.
            return makeSystemProgram("Unexpected byte " + z80_base_1.toHexByte(marker) + " at start of block");
        }
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Data chunk marker", b.addr() - 1, b.addr()));
        let length = b.read();
        if (length === teamten_ts_utils_1.EOF) {
            return makeSystemProgram("File is truncated at block length");
        }
        // 0 means 256.
        if (length === 0) {
            length = 256;
        }
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation(`Length (${length} byte${length === 1 ? "" : "s"})`, b.addr() - 1, b.addr()));
        const loadAddress = b.readShort(false);
        if (loadAddress === teamten_ts_utils_1.EOF) {
            return makeSystemProgram("File is truncated at load address");
        }
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation(`Address (0x${z80_base_1.toHexWord(loadAddress)})`, b.addr() - 2, b.addr()));
        const dataStartAddr = b.addr();
        const data = b.readBytes(length);
        if (data.length < length) {
            return makeSystemProgram("File is truncated at data");
        }
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation(`Chunk data`, dataStartAddr, b.addr()));
        const checksum = b.read();
        if (loadAddress === teamten_ts_utils_1.EOF) {
            return makeSystemProgram("File is truncated at checksum");
        }
        const systemChunk = new SystemChunk(loadAddress, data, checksum);
        chunks.push(systemChunk);
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation(`Checksum (0x${z80_base_1.toHexByte(checksum)}, ${systemChunk.isChecksumValid() ? "" : "in"}valid)`, b.addr() - 1, b.addr()));
    }
    entryPointAddress = b.readShort(false);
    if (entryPointAddress === teamten_ts_utils_1.EOF) {
        entryPointAddress = 0;
        return makeSystemProgram("File is truncated at entry point address");
    }
    annotations.push(new ProgramAnnotation_1.ProgramAnnotation(`Jump address (0x${z80_base_1.toHexWord(entryPointAddress)})`, b.addr() - 2, b.addr()));
    return makeSystemProgram();
}
exports.decodeSystemProgram = decodeSystemProgram;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.ScanLines = exports.Background = exports.Phosphor = exports.RamSize = exports.CGChip = exports.BasicLevel = exports.ModelType = void 0;
/**
 * The TRS-80 models we support.
 */
var ModelType;
(function (ModelType) {
    ModelType[ModelType["MODEL1"] = 0] = "MODEL1";
    ModelType[ModelType["MODEL3"] = 1] = "MODEL3";
})(ModelType = exports.ModelType || (exports.ModelType = {}));
/**
 * The levels of Basic.
 */
var BasicLevel;
(function (BasicLevel) {
    BasicLevel[BasicLevel["LEVEL1"] = 0] = "LEVEL1";
    BasicLevel[BasicLevel["LEVEL2"] = 1] = "LEVEL2";
})(BasicLevel = exports.BasicLevel || (exports.BasicLevel = {}));
/**
 * The character generator chip we support.
 */
var CGChip;
(function (CGChip) {
    CGChip[CGChip["ORIGINAL"] = 0] = "ORIGINAL";
    CGChip[CGChip["LOWER_CASE"] = 1] = "LOWER_CASE";
})(CGChip = exports.CGChip || (exports.CGChip = {}));
/**
 * The amounts of RAM we support.
 */
var RamSize;
(function (RamSize) {
    RamSize[RamSize["RAM_4_KB"] = 0] = "RAM_4_KB";
    RamSize[RamSize["RAM_16_KB"] = 1] = "RAM_16_KB";
    RamSize[RamSize["RAM_32_KB"] = 2] = "RAM_32_KB";
    RamSize[RamSize["RAM_48_KB"] = 3] = "RAM_48_KB";
})(RamSize = exports.RamSize || (exports.RamSize = {}));
/**
 * Phosphor color.
 */
var Phosphor;
(function (Phosphor) {
    Phosphor[Phosphor["WHITE"] = 0] = "WHITE";
    Phosphor[Phosphor["GREEN"] = 1] = "GREEN";
    Phosphor[Phosphor["AMBER"] = 2] = "AMBER";
})(Phosphor = exports.Phosphor || (exports.Phosphor = {}));
/**
 * Background color.
 */
var Background;
(function (Background) {
    Background[Background["BLACK"] = 0] = "BLACK";
    Background[Background["AUTHENTIC"] = 1] = "AUTHENTIC";
})(Background = exports.Background || (exports.Background = {}));
/**
 * Whether to display scan lines.
 */
var ScanLines;
(function (ScanLines) {
    ScanLines[ScanLines["OFF"] = 0] = "OFF";
    ScanLines[ScanLines["ON"] = 1] = "ON";
})(ScanLines = exports.ScanLines || (exports.ScanLines = {}));
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
exports.Config = Config;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
const ste_core_1 = __webpack_require__(0);
/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 *
 * @export
 * @class EventDispatcher
 * @extends {DispatcherBase<IEventHandler<TSender, TArgs>>}
 * @implements {IEvent<TSender, TArgs>}
 * @template TSender
 * @template TArgs
 */
class EventDispatcher extends ste_core_1.DispatcherBase {
    /**
     * Creates an instance of EventDispatcher.
     *
     * @memberOf EventDispatcher
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the event.
     *
     * @param {TSender} sender The sender object.
     * @param {TArgs} args The arguments object.
     * @returns {IPropagationStatus} The event status.
     *
     * @memberOf EventDispatcher
     */
    dispatch(sender, args) {
        const result = this._dispatch(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the events thread.
     * @param sender The sender.
     * @param args The arguments object.
     */
    dispatchAsync(sender, args) {
        this._dispatch(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     *
     * @returns {IEvent<TSender, TArgs>} The event.
     *
     * @memberOf EventDispatcher
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.EventDispatcher = EventDispatcher;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleEventDispatcher = void 0;
const ste_core_1 = __webpack_require__(0);
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event
 *
 * @export
 * @class SimpleEventDispatcher
 * @extends {DispatcherBase<ISimpleEventHandler<TArgs>>}
 * @implements {ISimpleEvent<TArgs>}
 * @template TArgs
 */
class SimpleEventDispatcher extends ste_core_1.DispatcherBase {
    /**
     * Creates an instance of SimpleEventDispatcher.
     *
     * @memberOf SimpleEventDispatcher
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the event.
     *
     * @param {TArgs} args The arguments object.
     * @returns {IPropagationStatus} The status of the event.
     *
     * @memberOf SimpleEventDispatcher
     */
    dispatch(args) {
        const result = this._dispatch(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the event without waiting for the result.
     *
     * @param {TArgs} args The arguments object.
     *
     * @memberOf SimpleEventDispatcher
     */
    dispatchAsync(args) {
        this._dispatch(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     *
     * @returns {ISimpleEvent<TArgs>} The event.
     *
     * @memberOf SimpleEventDispatcher
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.SimpleEventDispatcher = SimpleEventDispatcher;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseEventDispatcher = void 0;
const ste_core_1 = __webpack_require__(0);
/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 *
 * @export
 * @class PromiseEventDispatcher
 * @extends {PromiseDispatcherBase<IPromiseEventHandler<TSender, TArgs>>}
 * @implements {IPromiseEvent<TSender, TArgs>}
 * @template TSender
 * @template TArgs
 */
class PromiseEventDispatcher extends ste_core_1.PromiseDispatcherBase {
    /**
     * Creates a new EventDispatcher instance.
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the event.
     *
     * @param {TSender} sender The sender object.
     * @param {TArgs} args The argument object.
     * @returns {Promise<IPropagationStatus>} The status.
     *
     * @memberOf PromiseEventDispatcher
     */
    async dispatch(sender, args) {
        const result = await this._dispatchAsPromise(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the event without waiting for the result.
     *
     * @param {TSender} sender The sender object.
     * @param {TArgs} args The argument object.
     *
     * @memberOf PromiseEventDispatcher
     */
    dispatchAsync(sender, args) {
        this._dispatchAsPromise(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.PromiseEventDispatcher = PromiseEventDispatcher;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseSimpleEventDispatcher = void 0;
const ste_core_1 = __webpack_require__(0);
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event
 *
 * @export
 * @class PromiseSimpleEventDispatcher
 * @extends {PromiseDispatcherBase<IPromiseSimpleEventHandler<TArgs>>}
 * @implements {IPromiseSimpleEvent<TArgs>}
 * @template TArgs
 */
class PromiseSimpleEventDispatcher extends ste_core_1.PromiseDispatcherBase {
    /**
     * Creates a new SimpleEventDispatcher instance.
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the event.
     * @param args The arguments object.
     * @returns {IPropagationStatus} The status of the dispatch.
     * @memberOf PromiseSimpleEventDispatcher
     */
    async dispatch(args) {
        const result = await this._dispatchAsPromise(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the event without waiting for it to complete.
     * @param args The argument object.
     * @memberOf PromiseSimpleEventDispatcher
     */
    dispatchAsync(args) {
        this._dispatchAsPromise(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.PromiseSimpleEventDispatcher = PromiseSimpleEventDispatcher;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasScreen = exports.phosphorToRgb = exports.BLACK_BACKGROUND = exports.AUTHENTIC_BACKGROUND = void 0;
const Trs80Screen_1 = __webpack_require__(36);
const Fonts_1 = __webpack_require__(47);
const Config_1 = __webpack_require__(10);
const z80_base_1 = __webpack_require__(6);
const trs80_base_1 = __webpack_require__(3);
exports.AUTHENTIC_BACKGROUND = "#334843";
exports.BLACK_BACKGROUND = "#000000";
const PADDING = 10;
const BORDER_RADIUS = 8;
const WHITE_PHOSPHOR = [230, 231, 252];
const AMBER_PHOSPHOR = [247, 190, 64];
const GREEN_PHOSPHOR = [122, 244, 96];
// Gets an RGB array (0-255) for a phosphor.
function phosphorToRgb(phosphor) {
    switch (phosphor) {
        case Config_1.Phosphor.WHITE:
        default:
            return WHITE_PHOSPHOR;
        case Config_1.Phosphor.GREEN:
            return GREEN_PHOSPHOR;
        case Config_1.Phosphor.AMBER:
            return AMBER_PHOSPHOR;
    }
}
exports.phosphorToRgb = phosphorToRgb;
/**
 * TRS-80 screen based on an HTML canvas element.
 */
class CanvasScreen extends Trs80Screen_1.Trs80Screen {
    /**
     * Create a canvas screen.
     *
     * @param scale size multiplier. If greater than 1, use multiples of 0.5.
     */
    constructor(scale = 1) {
        super();
        this.scale = 1;
        this.memory = new Uint8Array(trs80_base_1.TRS80_SCREEN_END - trs80_base_1.TRS80_SCREEN_BEGIN);
        this.glyphs = [];
        this.config = Config_1.Config.makeDefault();
        this.glyphWidth = 0;
        this.node = document.createElement("div");
        // Fit canvas horizontally so that the nested objects (panels and progress bars) are
        // displayed in the canvas.
        this.node.style.maxWidth = "max-content";
        this.scale = scale;
        this.padding = Math.round(PADDING * this.scale);
        this.canvas = document.createElement("canvas");
        this.canvas.width = 64 * 8 * this.scale + 2 * this.padding;
        this.canvas.height = 16 * 24 * this.scale + 2 * this.padding;
        this.node.append(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.updateFromConfig();
    }
    getWidth() {
        return this.canvas.width;
    }
    getHeight() {
        return this.canvas.height;
    }
    setConfig(config) {
        this.config = config;
        this.updateFromConfig();
    }
    /**
     * Update the font and screen from the config and other state.
     */
    updateFromConfig() {
        let font;
        switch (this.config.cgChip) {
            case Config_1.CGChip.ORIGINAL:
                font = Fonts_1.MODEL1A_FONT;
                break;
            case Config_1.CGChip.LOWER_CASE:
            default:
                switch (this.config.modelType) {
                    case Config_1.ModelType.MODEL1:
                        font = Fonts_1.MODEL1B_FONT;
                        break;
                    case Config_1.ModelType.MODEL3:
                    default:
                        font = this.isAlternateCharacters() ? Fonts_1.MODEL3_ALT_FONT : Fonts_1.MODEL3_FONT;
                        break;
                }
                break;
        }
        const glyphOptions = {
            color: phosphorToRgb(this.config.phosphor),
            scanLines: this.config.scanLines === Config_1.ScanLines.ON,
        };
        for (let i = 0; i < 256; i++) {
            this.glyphs[i] = font.makeImage(i, this.isExpandedCharacters(), glyphOptions);
        }
        this.glyphWidth = font.width;
        this.drawBackground();
        this.refresh();
    }
    writeChar(address, value) {
        const offset = address - trs80_base_1.TRS80_SCREEN_BEGIN;
        this.memory[offset] = value;
        this.drawChar(offset, value);
    }
    getForegroundColor() {
        const color = phosphorToRgb(this.config.phosphor);
        return "#" + z80_base_1.toHexByte(color[0]) + z80_base_1.toHexByte(color[1]) + z80_base_1.toHexByte(color[2]);
    }
    /**
     * Get the background color as a CSS color based on the current config.
     */
    getBackgroundColor() {
        switch (this.config.background) {
            case Config_1.Background.BLACK:
                return exports.BLACK_BACKGROUND;
            case Config_1.Background.AUTHENTIC:
            default:
                return exports.AUTHENTIC_BACKGROUND;
        }
    }
    getBorderRadius() {
        return BORDER_RADIUS * this.scale;
    }
    /**
     * Draw a single character to the canvas.
     */
    drawChar(offset, value) {
        const screenX = (offset % 64) * 8 * this.scale + this.padding;
        const screenY = Math.floor(offset / 64) * 24 * this.scale + this.padding;
        this.context.fillStyle = this.getBackgroundColor();
        if (this.isExpandedCharacters()) {
            if (offset % 2 === 0) {
                this.context.fillRect(screenX, screenY, 16 * this.scale, 24 * this.scale);
                this.context.drawImage(this.glyphs[value], 0, 0, this.glyphWidth * 2, 24, screenX, screenY, 16 * this.scale, 24 * this.scale);
            }
        }
        else {
            this.context.fillRect(screenX, screenY, 8 * this.scale, 24 * this.scale);
            this.context.drawImage(this.glyphs[value], 0, 0, this.glyphWidth, 24, screenX, screenY, 8 * this.scale, 24 * this.scale);
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
     * Draw the background of the canvas.
     */
    drawBackground() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const radius = this.getBorderRadius();
        this.context.fillStyle = this.getBackgroundColor();
        this.context.beginPath();
        this.context.moveTo(radius, 0);
        this.context.arcTo(width, 0, width, radius, radius);
        this.context.arcTo(width, height, width - radius, height, radius);
        this.context.arcTo(0, height, 0, height - radius, radius);
        this.context.arcTo(0, 0, radius, 0, radius);
        this.context.fill();
    }
    /**
     * Refresh the display based on what we've kept track of.
     */
    refresh() {
        for (let offset = 0; offset < this.memory.length; offset++) {
            this.drawChar(offset, this.memory[offset]);
        }
    }
    /**
     * Returns the canvas as an <img> element that can be resized. This is relatively
     * expensive.
     *
     * This method is deprecated, use asImageAsync instead.
     */
    asImage() {
        const image = document.createElement("img");
        image.src = this.canvas.toDataURL();
        return image;
    }
    /**
     * Returns the canvas as an <img> element that can be resized. Despite the
     * "async" name, there's still some synchronous work, about 13ms.
     */
    asImageAsync() {
        return new Promise((resolve, reject) => {
            // According to this answer:
            //     https://stackoverflow.com/a/59025746/211234
            // the toBlob() method still has to copy the image synchronously, so this whole method still
            // takes about 13ms. It's better than toDataUrl() because it doesn't have to make an actual
            // base64 string. The Object URL is just a reference to the blob.
            this.canvas.toBlob(blob => {
                if (blob === null) {
                    reject("Cannot make image from screen");
                }
                else {
                    const image = document.createElement("img");
                    const url = URL.createObjectURL(blob);
                    image.addEventListener("load", () => {
                        URL.revokeObjectURL(url);
                        // Resolve when the image is fully loaded so that there's no UI glitching.
                        resolve(image);
                    });
                    image.src = url;
                }
            });
        });
    }
}
exports.CanvasScreen = CanvasScreen;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Tools for decoding Basic programs.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBasicText = exports.decodeBasicProgram = exports.wrapBasic = exports.BasicProgram = exports.BasicElement = exports.ElementType = exports.getToken = exports.BASIC_HEADER_BYTE = exports.BASIC_TAPE_HEADER_BYTE = void 0;
const teamten_ts_utils_1 = __webpack_require__(7);
const z80_base_1 = __webpack_require__(4);
const ProgramAnnotation_1 = __webpack_require__(1);
const Trs80File_1 = __webpack_require__(2);
exports.BASIC_TAPE_HEADER_BYTE = 0xD3;
exports.BASIC_HEADER_BYTE = 0xFF;
const FIRST_TOKEN = 0x80;
const TOKENS = [
    "END", "FOR", "RESET", "SET", "CLS", "CMD", "RANDOM", "NEXT",
    "DATA", "INPUT", "DIM", "READ", "LET", "GOTO", "RUN", "IF",
    "RESTORE", "GOSUB", "RETURN", "REM", "STOP", "ELSE", "TRON", "TROFF",
    "DEFSTR", "DEFINT", "DEFSNG", "DEFDBL", "LINE", "EDIT", "ERROR", "RESUME",
    "OUT", "ON", "OPEN", "FIELD", "GET", "PUT", "CLOSE", "LOAD",
    "MERGE", "NAME", "KILL", "LSET", "RSET", "SAVE", "SYSTEM", "LPRINT",
    "DEF", "POKE", "PRINT", "CONT", "LIST", "LLIST", "DELETE", "AUTO",
    "CLEAR", "CLOAD", "CSAVE", "NEW", "TAB(", "TO", "FN", "USING",
    "VARPTR", "USR", "ERL", "ERR", "STRING$", "INSTR", "POINT", "TIME$",
    "MEM", "INKEY$", "THEN", "NOT", "STEP", "+", "-", "*",
    "/", "[", "AND", "OR", ">", "=", "<", "SGN",
    "INT", "ABS", "FRE", "INP", "POS", "SQR", "RND", "LOG",
    "EXP", "COS", "SIN", "TAN", "ATN", "PEEK", "CVI", "CVS",
    "CVD", "EOF", "LOC", "LOF", "MKI$", "MKS$", "MKD$", "CINT",
    "CSNG", "CDBL", "FIX", "LEN", "STR$", "VAL", "ASC", "CHR$",
    "LEFT$", "RIGHT$", "MID$",
];
const DOUBLE_QUOTE = 0x22;
const SINGLE_QUOTE = 0x27;
const COLON = 0x3A;
const REM = 0x93;
const DATA = 0x88;
const REMQUOT = 0xFB;
const ELSE = 0x95;
/**
 * Parser state.
 */
var ParserState;
(function (ParserState) {
    // Normal part of line.
    ParserState[ParserState["NORMAL"] = 0] = "NORMAL";
    // Inside string literal.
    ParserState[ParserState["STRING"] = 1] = "STRING";
    // After REM token to end of line.
    ParserState[ParserState["REM"] = 2] = "REM";
    // After DATA token to end of statement.
    ParserState[ParserState["DATA"] = 3] = "DATA";
})(ParserState || (ParserState = {}));
/**
 * Get the token for the byte value, or undefined if the value does
 * not map to a token.
 */
function getToken(c) {
    return c >= FIRST_TOKEN && c < FIRST_TOKEN + TOKENS.length ? TOKENS[c - FIRST_TOKEN] : undefined;
}
exports.getToken = getToken;
/**
 * Generate a 3-character octal version of a number.
 */
function toOctal(n) {
    return n.toString(8).padStart(3, "0");
}
/**
 * Type of Basic element, for syntax highlighting.
 */
var ElementType;
(function (ElementType) {
    ElementType[ElementType["ERROR"] = 0] = "ERROR";
    ElementType[ElementType["LINE_NUMBER"] = 1] = "LINE_NUMBER";
    ElementType[ElementType["PUNCTUATION"] = 2] = "PUNCTUATION";
    ElementType[ElementType["KEYWORD"] = 3] = "KEYWORD";
    ElementType[ElementType["REGULAR"] = 4] = "REGULAR";
    ElementType[ElementType["STRING"] = 5] = "STRING";
    ElementType[ElementType["COMMENT"] = 6] = "COMMENT";
})(ElementType = exports.ElementType || (exports.ElementType = {}));
/**
 * Piece of a Basic program (token, character, line number).
 */
class BasicElement {
    constructor(offset, text, elementType, length = 1) {
        this.offset = offset;
        this.length = length;
        this.text = text;
        this.elementType = elementType;
    }
}
exports.BasicElement = BasicElement;
/**
 * Class representing a Basic program. If the "error" field is set, then something
 * went wrong with the program and the data may be partially loaded.
 */
class BasicProgram extends Trs80File_1.Trs80File {
    constructor(binary, error, annotations, elements) {
        super(binary, error, annotations);
        this.elements = elements;
    }
    getDescription() {
        // Don't include filename, it's usually worthless.
        return "Basic program";
    }
}
exports.BasicProgram = BasicProgram;
/**
 * Adds the header bytes necessary for writing Basic cassettes.
 */
function wrapBasic(bytes) {
    // Add Basic header.
    const buffers = [
        new Uint8Array([exports.BASIC_TAPE_HEADER_BYTE, exports.BASIC_TAPE_HEADER_BYTE, exports.BASIC_TAPE_HEADER_BYTE]),
        bytes,
    ];
    return teamten_ts_utils_1.concatByteArrays(buffers);
}
exports.wrapBasic = wrapBasic;
/**
 * Decode a tokenized Basic program.
 * @param binary tokenized program. May be in tape format (D3 D3 D3 followed by a one-letter program
 * name) or not (FF).
 * @return the Basic program, or undefined if the header did not indicate that this was a Basic program.
 */
function decodeBasicProgram(binary) {
    const b = new teamten_ts_utils_1.ByteReader(binary);
    let state;
    let preStringState = ParserState.NORMAL;
    let error;
    const annotations = [];
    // Map from byte address to BasicElement for that byte.
    const elements = [];
    const firstByte = b.read();
    if (firstByte === exports.BASIC_TAPE_HEADER_BYTE) {
        if (b.read() !== exports.BASIC_TAPE_HEADER_BYTE || b.read() !== exports.BASIC_TAPE_HEADER_BYTE) {
            return undefined;
        }
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Header", 0, b.addr()));
        // One-byte ASCII program name. This is nearly always meaningless, so we do nothing with it.
        b.read();
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Name", b.addr() - 1, b.addr()));
    }
    else if (firstByte === exports.BASIC_HEADER_BYTE) {
        // All good.
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Header", 0, b.addr()));
    }
    else {
        return undefined;
    }
    while (true) {
        // Read the address of the next line. We ignore this (as does Basic when
        // loading programs), only using it to detect end of program. (In the real
        // Basic these are regenerated after loading.)
        const address = b.readShort(true);
        if (address === teamten_ts_utils_1.EOF) {
            error = "EOF in next line's address";
            break;
        }
        // Zero address indicates end of program.
        if (address === 0) {
            annotations.push(new ProgramAnnotation_1.ProgramAnnotation("End-of-program marker", b.addr() - 2, b.addr()));
            break;
        }
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Address of next line (0x" + z80_base_1.toHexWord(address) + ")", b.addr() - 2, b.addr()));
        // Read current line number.
        const lineNumber = b.readShort(false);
        if (lineNumber === teamten_ts_utils_1.EOF) {
            error = "EOF in line number";
            break;
        }
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Line number (" + lineNumber + ")", b.addr() - 2, b.addr()));
        elements.push(new BasicElement(b.addr() - 2, lineNumber.toString(), ElementType.LINE_NUMBER, 2));
        elements.push(new BasicElement(undefined, " ", ElementType.REGULAR));
        // Read rest of line.
        const lineAddr = b.addr();
        const lineElementsIndex = elements.length;
        let c; // Uint8 value.
        let ch; // String value.
        state = ParserState.NORMAL;
        while (true) {
            c = b.read();
            if (c === teamten_ts_utils_1.EOF || c === 0) {
                break;
            }
            ch = String.fromCharCode(c);
            // Special handling of sequences of characters that start with a colon.
            if (ch === ":" && state === ParserState.NORMAL) {
                const colonAddr = b.addr() - 1;
                if (b.peek(0) === ELSE) {
                    // :ELSE gets translated to just ELSE, probably because an old version
                    // of Basic only supported ELSE after a colon.
                    b.read(); // ELSE
                    elements.push(new BasicElement(colonAddr, "ELSE", ElementType.KEYWORD, b.addr() - colonAddr));
                }
                else if (b.peek(0) === REM && b.peek(1) === REMQUOT) {
                    // Detect the ":REM'" sequence (colon, REM, single quote), because
                    // that translates to a single quote. Must be a backward-compatible
                    // way to add a single quote as a comment.
                    b.read(); // REM
                    b.read(); // REMQUOT
                    elements.push(new BasicElement(colonAddr, "'", ElementType.COMMENT, b.addr() - colonAddr));
                    state = ParserState.REM;
                }
                else {
                    elements.push(new BasicElement(colonAddr, ":", ElementType.PUNCTUATION));
                }
            }
            else {
                switch (state) {
                    case ParserState.NORMAL:
                        const token = getToken(c);
                        elements.push(token !== undefined
                            ? new BasicElement(b.addr() - 1, token, c === DATA || c === REM ? ElementType.COMMENT
                                : token.length === 1 ? ElementType.PUNCTUATION
                                    : ElementType.KEYWORD)
                            : new BasicElement(b.addr() - 1, ch, ch === '"' ? ElementType.STRING : ElementType.REGULAR));
                        if (c === REM) {
                            state = ParserState.REM;
                        }
                        else if (c === DATA) {
                            state = ParserState.DATA;
                        }
                        else if (ch === '"') {
                            preStringState = state;
                            state = ParserState.STRING;
                        }
                        break;
                    case ParserState.STRING:
                        let e;
                        if (ch === "\r") {
                            e = new BasicElement(b.addr() - 1, "\\n", ElementType.PUNCTUATION);
                        }
                        else if (ch === "\\") {
                            e = new BasicElement(b.addr() - 1, "\\" + toOctal(c), ElementType.PUNCTUATION);
                        }
                        else if (c >= 32 && c < 128) {
                            e = new BasicElement(b.addr() - 1, ch, ElementType.STRING);
                        }
                        else {
                            e = new BasicElement(b.addr() - 1, "\\" + toOctal(c), ElementType.PUNCTUATION);
                        }
                        elements.push(e);
                        if (ch === '"') {
                            // End of string.
                            state = preStringState;
                        }
                        break;
                    case ParserState.REM:
                        elements.push(new BasicElement(b.addr() - 1, ch, ElementType.COMMENT));
                        break;
                    case ParserState.DATA:
                        let elementType = ElementType.COMMENT;
                        if (ch === ":") {
                            elementType = ElementType.PUNCTUATION;
                            state = ParserState.NORMAL;
                        }
                        if (ch === '"') {
                            elementType = ElementType.STRING;
                            preStringState = state;
                            state = ParserState.STRING;
                        }
                        elements.push(new BasicElement(b.addr() - 1, ch, elementType));
                        break;
                }
            }
        }
        if (c === teamten_ts_utils_1.EOF) {
            error = "EOF in line";
            annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Partial line", lineAddr, b.addr()));
            break;
        }
        const textLineParts = [];
        for (let i = lineElementsIndex; i < elements.length; i++) {
            textLineParts.push(elements[i].text);
        }
        let textLine = textLineParts.join("").replace(/[\n\r]+/, " ");
        if (textLine.length > 33) {
            textLine = textLine.substr(0, 30) + "...";
        }
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Line: " + textLine, lineAddr, b.addr() - 1));
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("End-of-line marker", b.addr() - 1, b.addr()));
    }
    return new BasicProgram(binary, error, annotations, elements);
}
exports.decodeBasicProgram = decodeBasicProgram;
/**
 * Parser for a single line of Basic code.
 */
class BasicParser {
    constructor(line) {
        this.result = [];
        this.lineNumber = undefined;
        this.pos = 0;
        // Only trim the start, spaces at the end should be kept.
        this.line = line.trimStart();
    }
    /**
     * Parse the line, returning the binary for it or an error. The binary includes
     * the line number and the terminating nul, but not the "next-line" pointer.
     */
    parse() {
        // Parse line number.
        this.lineNumber = this.readNumber();
        if (this.lineNumber === undefined) {
            return "Missing line number: " + this.line;
        }
        this.result.push(z80_base_1.lo(this.lineNumber));
        this.result.push(z80_base_1.hi(this.lineNumber));
        // We only trim at the start, so there could be only spaces here, but that's not allowed.
        if (this.line.substr(this.pos).trim() === "") {
            return "Empty line " + this.lineNumber;
        }
        // Skip single optional whitespace
        if (this.pos < this.line.length && BasicParser.isWhitespace(this.line.charCodeAt(this.pos))) {
            this.pos++;
        }
        while (this.pos < this.line.length) {
            let ch = this.line.charCodeAt(this.pos);
            // Lower case anything outside of strings.
            if (ch >= 0x61 && ch < 0x61 + 26) {
                ch -= 0x20;
            }
            // Handle single-quote comment.
            if (ch === SINGLE_QUOTE) {
                // Single quote is the start of a comment, but it's encoded in a backward-compatible
                // way with several tokens.
                this.result.push(COLON, REM, REMQUOT);
                this.pos++;
                // We're done, copy the rest of the line.
                break;
            }
            // Handle string.
            if (ch === DOUBLE_QUOTE) {
                this.result.push(ch);
                this.pos++;
                while (this.pos < this.line.length) {
                    ch = this.line.charCodeAt(this.pos++);
                    this.result.push(ch);
                    if (ch === DOUBLE_QUOTE) {
                        break;
                    }
                }
            }
            else {
                // See if it should be a token.
                const token = this.readToken();
                if (token === undefined) {
                    // Just a regular letter.
                    this.result.push(ch);
                    this.pos++;
                }
                else {
                    // Prefix ELSE with colon for backward compatibility.
                    if (token === ELSE && this.result[this.result.length - 1] !== COLON) {
                        this.result.push(COLON);
                    }
                    this.result.push(token);
                    this.pos += TOKENS[token - FIRST_TOKEN].length;
                    if (token === REM) {
                        // We're done, copy the rest of the line.
                        break;
                    }
                    if (token === DATA) {
                        // Copy to end of statement.
                        let inString = false;
                        while (this.pos < this.line.length) {
                            ch = this.line.charCodeAt(this.pos);
                            if (ch === DOUBLE_QUOTE) {
                                inString = !inString;
                            }
                            else if (ch === COLON && !inString) {
                                break;
                            }
                            this.result.push(ch);
                            this.pos++;
                        }
                    }
                }
            }
        }
        // Copy rest of line (for comments).
        while (this.pos < this.line.length) {
            this.result.push(this.line.charCodeAt(this.pos++));
        }
        // End-of-line marker.
        this.result.push(0);
        return new Uint8Array(this.result);
    }
    /**
     * If we're at a token, return it, else return undefined. Does not advance past the token.
     */
    readToken() {
        for (let i = 0; i < TOKENS.length; i++) {
            const token = TOKENS[i];
            if (token === this.line.substr(this.pos, token.length).toUpperCase()) {
                return FIRST_TOKEN + i;
            }
        }
        return undefined;
    }
    /**
     * Reads a decimal number and advances past it, or returns undefined if not at a number.
     */
    readNumber() {
        let n;
        while (this.pos < this.line.length && BasicParser.isDigit(this.line.charCodeAt(this.pos))) {
            if (n === undefined) {
                n = 0;
            }
            n = n * 10 + this.line.charCodeAt(this.pos) - 0x30;
            this.pos++;
        }
        return n;
    }
    /**
     * Whether the ASCII value is whitespace.
     */
    static isWhitespace(ch) {
        return ch === 0x20 || ch === 0x09;
    }
    /**
     * Whether the ASCII value is a digit.
     */
    static isDigit(ch) {
        return ch >= 0x30 && ch < 0x3A;
    }
}
/**
 * Parse a Basic program into a binary with the initial 0xFF header.
 *
 * @return the binary or an error.
 */
function parseBasicText(text) {
    // Split into lines. Only trim the start, spaces at the end should be kept.
    const lines = text.split(/[\n\r]+/)
        .map((line) => line.trimStart())
        .filter((line) => line !== "");
    const binaryParts = [];
    binaryParts.push(new Uint8Array([exports.BASIC_HEADER_BYTE]));
    // Parse each line.
    let lineNumber;
    for (const line of lines) {
        const parser = new BasicParser(line);
        const binary = parser.parse();
        if (typeof binary === "string") {
            return binary;
        }
        // Make sure line numbers are consecutive.
        if (lineNumber !== undefined && parser.lineNumber !== undefined && parser.lineNumber <= lineNumber) {
            return "Line " + parser.lineNumber + " is out of order";
        }
        lineNumber = parser.lineNumber;
        // Push next-line pointer. Can be anything as long as it's not 0x0000,
        // it'll get fixed up later.
        binaryParts.push(new Uint8Array([0xFF, 0xFF]));
        binaryParts.push(binary);
    }
    // End-of-program marker.
    binaryParts.push(new Uint8Array([0x00, 0x00]));
    return teamten_ts_utils_1.concatByteArrays(binaryParts);
}
exports.parseBasicText = parseBasicText;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Various utility functions.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convert a number to hex and zero-pad to the specified number of hex digits.
 */
function toHex(value, digits) {
    return value.toString(16).toUpperCase().padStart(digits, "0");
}
exports.toHex = toHex;
/**
 * Convert a byte to hex.
 */
function toHexByte(value) {
    return toHex(value, 2);
}
exports.toHexByte = toHexByte;
/**
 * Convert a word to hex.
 */
function toHexWord(value) {
    return toHex(value, 4);
}
exports.toHexWord = toHexWord;
/**
 * Convert a long (32-bit value) to hex.
 */
function toHexLong(value) {
    value &= 0xFFFFFFFF;
    // Convert two's complement negative numbers to positive numbers.
    if (value < 0) {
        value += 0x100000000;
    }
    return value.toString(16).toUpperCase().padStart(8, "0");
}
exports.toHexLong = toHexLong;
/**
 * Return the high byte of a word.
 */
function hi(value) {
    return (value >> 8) & 0xFF;
}
exports.hi = hi;
/**
 * Return the low byte of a word.
 */
function lo(value) {
    return value & 0xFF;
}
exports.lo = lo;
/**
 * Create a word from a high and low byte.
 */
function word(highByte, lowByte) {
    return ((highByte & 0xFF) << 8) | (lowByte & 0xFF);
}
exports.word = word;
/**
 * Increment a byte.
 */
function inc8(value) {
    return add8(value, 1);
}
exports.inc8 = inc8;
/**
 * Increment a word.
 */
function inc16(value) {
    return add16(value, 1);
}
exports.inc16 = inc16;
/**
 * Decrement a byte.
 */
function dec8(value) {
    return sub8(value, 1);
}
exports.dec8 = dec8;
/**
 * Decrement a word.
 */
function dec16(value) {
    return sub16(value, 1);
}
exports.dec16 = dec16;
/**
 * Add two bytes together.
 */
function add8(a, b) {
    return (a + b) & 0xFF;
}
exports.add8 = add8;
/**
 * Add two words together.
 */
function add16(a, b) {
    return (a + b) & 0xFFFF;
}
exports.add16 = add16;
/**
 * Subtract two bytes.
 */
function sub8(a, b) {
    return (a - b) & 0xFF;
}
exports.sub8 = sub8;
/**
 * Subtract two words.
 */
function sub16(a, b) {
    return (a - b) & 0xFFFF;
}
exports.sub16 = sub16;
/**
 * Convert a byte to a signed number (e.g., 0xff to -1).
 */
function signedByte(value) {
    return value >= 128 ? value - 256 : value;
}
exports.signedByte = signedByte;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Tools for dealing with CMD (machine language) programs.
 *
 * http://www.trs-80.com/wordpress/zaps-patches-pokes-tips/tape-and-file-formats-structures/#cmdfile
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeCmdProgram = exports.CmdProgram = exports.CMD_CHUNK_TYPE_NAME = exports.CmdLoadModuleHeaderChunk = exports.CmdTransferAddressChunk = exports.CmdLoadBlockChunk = exports.CmdChunk = exports.CMD_MAX_TYPE = exports.CMD_LOAD_MODULE_HEADER = exports.CMD_TRANSFER_ADDRESS = exports.CMD_LOAD_BLOCK = void 0;
const teamten_ts_utils_1 = __webpack_require__(7);
const z80_base_1 = __webpack_require__(4);
const ProgramAnnotation_1 = __webpack_require__(1);
const Trs80File_1 = __webpack_require__(2);
// Chunk types.
exports.CMD_LOAD_BLOCK = 0x01;
exports.CMD_TRANSFER_ADDRESS = 0x02;
exports.CMD_LOAD_MODULE_HEADER = 0x05;
exports.CMD_MAX_TYPE = 0x1F;
/**
 * Represents a chunk of bytes from the file.
 */
class CmdChunk {
    constructor(type, data) {
        this.type = type;
        this.rawData = data;
    }
    /**
     * Add annotations about this chunk, assuming its data is at "addr".
     */
    addAnnotations(annotations, addr) {
        // Nothing for unknown chunks.
    }
}
exports.CmdChunk = CmdChunk;
/**
 * A chunk for loading data into memory.
 */
class CmdLoadBlockChunk extends CmdChunk {
    constructor(type, data) {
        super(type, data);
        this.address = data[0] + data[1] * 256;
        this.loadData = data.slice(2);
    }
    addAnnotations(annotations, addr) {
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Load address (0x" + z80_base_1.toHexWord(this.address) + ")", addr, addr + 2));
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Data (" + this.loadData.length + " byte" +
            (this.loadData.length === 1 ? "" : "s") + ")", addr + 2, addr + 2 + this.loadData.length));
    }
}
exports.CmdLoadBlockChunk = CmdLoadBlockChunk;
/**
 * A chunk for jumping to the start of the program.
 */
class CmdTransferAddressChunk extends CmdChunk {
    constructor(type, data) {
        super(type, data);
        this.address = data.length === 2 ? (data[0] + data[1] * 256) : 0;
    }
    addAnnotations(annotations, addr) {
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Jump address (0x" + z80_base_1.toHexWord(this.address) + ")", addr, addr + 2));
    }
}
exports.CmdTransferAddressChunk = CmdTransferAddressChunk;
/**
 * A header chunk for the filename.
 */
class CmdLoadModuleHeaderChunk extends CmdChunk {
    constructor(type, data) {
        super(type, data);
        this.filename = new TextDecoder("ascii").decode(data).trim().replace(/ +/g, " ");
    }
    addAnnotations(annotations, addr) {
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Name (" + this.filename + ")", addr, addr + this.rawData.length));
    }
}
exports.CmdLoadModuleHeaderChunk = CmdLoadModuleHeaderChunk;
/**
 * A friendly (not so technical) name for the block type.
 * See page 43 of The LDOS Quarterly, Volume 1, Number 4.
 * https://www.tim-mann.org/trs80/doc/ldosq1-4.pdf
 * http://www.vintagecomputer.net/fjkraan/comp/trs80/doc/Trscmdff.txt
 * https://tim-mann.org/trs80/doc/gocmd.pdf
 * http://www.manmrk.net/tutorials/TRS80/Software/ldos/trs80/doc/ldosq1-4.txt
 */
exports.CMD_CHUNK_TYPE_NAME = new Map([
    [0x01, "data"],
    [0x02, "jump address"],
    [0x04, "end of partitioned data set member"],
    [0x05, "header"],
    [0x06, "partitioned data set header"],
    [0x07, "patch name header"],
    [0x08, "ISAM directory entry"],
    [0x0A, "end of ISAM directory"],
    [0x0C, "PDS directory entry"],
    [0x0E, "end of PDS directory"],
    [0x10, "yanked load block"],
    [0x1F, "copyright block"],
]);
/**
 * Class representing a CMD (machine language) program. If the "error" field is set, then something
 * went wrong with the program and the data may be partially loaded.
 */
class CmdProgram extends Trs80File_1.Trs80File {
    constructor(binary, error, annotations, chunks, filename, entryPointAddress) {
        super(binary, error, annotations);
        this.chunks = chunks;
        this.filename = filename;
        this.entryPointAddress = entryPointAddress;
    }
    getDescription() {
        return "CMD program" + (this.filename !== undefined ? " (" + this.filename + ")" : "");
    }
    /**
     * Convert an address in memory to the original byte offset in the binary. Returns undefined if
     * not found in any chunk.
     */
    addressToByteOffset(address) {
        // Offset in the binary of first byte of chunk.
        let offset = 0;
        for (const chunk of this.chunks) {
            if (chunk instanceof CmdLoadBlockChunk) {
                if (address >= chunk.address && address < chunk.address + chunk.loadData.length) {
                    // Skip type, length, and address.
                    return offset + 4 + (address - chunk.address);
                }
            }
            // Skip type, length and data.
            offset += 2 + chunk.rawData.length;
        }
        return undefined;
    }
}
exports.CmdProgram = CmdProgram;
/**
 * Decodes a CMD program from the binary. If the binary is not at all a CMD
 * program, returns undefined. If it's a CMD program with decoding errors, returns
 * partially-decoded binary and sets the "error" field.
 */
function decodeCmdProgram(binary) {
    var _a;
    let error;
    const annotations = [];
    const chunks = [];
    let filename;
    let entryPointAddress = 0;
    const b = new teamten_ts_utils_1.ByteReader(binary);
    // Read each chunk.
    while (true) {
        // First byte is type of chunk.
        const type = b.read();
        // End of file?
        if (type === teamten_ts_utils_1.EOF ||
            // Invalid type byte?
            type > exports.CMD_MAX_TYPE ||
            // Error earlier?
            error !== undefined ||
            // Just saw jump? There's typically junk after this and it can make it seem like there's an error.
            (chunks.length > 0 && chunks[chunks.length - 1] instanceof CmdTransferAddressChunk)) {
            if (chunks.length === 0) {
                return undefined;
            }
            return new CmdProgram(binary.subarray(0, b.addr()), error, annotations, chunks, filename, entryPointAddress);
        }
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Type of chunk (" +
            ((_a = exports.CMD_CHUNK_TYPE_NAME.get(type)) !== null && _a !== void 0 ? _a : "unknown") + ")", b.addr() - 1, b.addr()));
        // Second byte is length, in bytes.
        let length = b.read();
        if (length === teamten_ts_utils_1.EOF) {
            error = "File is truncated at length";
            continue;
        }
        // Adjust load block length.
        if (type === exports.CMD_LOAD_BLOCK && length <= 2) {
            length += 256;
        }
        else if (type === exports.CMD_LOAD_MODULE_HEADER && length === 0) {
            length = 256;
        }
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Length of chunk (" + length +
            " byte" + (length === 1 ? "" : "s") + ")", b.addr() - 1, b.addr()));
        // Read the raw bytes.
        const dataAddr = b.addr();
        const data = b.readBytes(length);
        if (data.length < length) {
            error = "File is truncated at data";
            // We continue so we can create a partial chunk. The loop will stop at the top of the next
            // iteration. Not sure this is the right thing to do.
        }
        // Create type-specific chunk objects.
        let chunk;
        switch (type) {
            case exports.CMD_LOAD_BLOCK:
                chunk = new CmdLoadBlockChunk(type, data);
                break;
            case exports.CMD_TRANSFER_ADDRESS: {
                const cmdTransferAddressChunk = new CmdTransferAddressChunk(type, data);
                entryPointAddress = cmdTransferAddressChunk.address;
                chunk = cmdTransferAddressChunk;
                break;
            }
            case exports.CMD_LOAD_MODULE_HEADER: {
                const cmdLoadModuleHeaderChunk = new CmdLoadModuleHeaderChunk(type, data);
                filename = cmdLoadModuleHeaderChunk.filename;
                if (filename === "") {
                    filename = undefined;
                }
                chunk = cmdLoadModuleHeaderChunk;
                break;
            }
            default:
                chunk = new CmdChunk(type, data);
                break;
        }
        chunk.addAnnotations(annotations, dataAddr);
        chunks.push(chunk);
    }
}
exports.decodeCmdProgram = decodeCmdProgram;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeCassette = exports.Cassette = exports.CassetteFile = exports.CassetteSpeed = void 0;
const SystemProgram_1 = __webpack_require__(9);
const Trs80File_1 = __webpack_require__(2);
const Trs80FileDecoder_1 = __webpack_require__(20);
const ProgramAnnotation_1 = __webpack_require__(1);
// Low-speed header and sync constants.
const LOW_SPEED_HEADER_BYTE = 0x00;
const LOW_SPEED_SYNC_BYTE = 0xA5;
const LOW_SPEED_ACCEPTABLE_HEADER = (LOW_SPEED_HEADER_BYTE << 24) |
    (LOW_SPEED_HEADER_BYTE << 16) |
    (LOW_SPEED_HEADER_BYTE << 8) |
    (LOW_SPEED_HEADER_BYTE << 0);
const LOW_SPEED_DETECT = (LOW_SPEED_HEADER_BYTE << 24) |
    (LOW_SPEED_HEADER_BYTE << 16) |
    (LOW_SPEED_HEADER_BYTE << 8) |
    (LOW_SPEED_SYNC_BYTE << 0);
// High-speed header and sync constants.
const HIGH_SPEED_HEADER_BYTE = 0x55;
const HIGH_SPEED_SYNC_BYTE = 0x7F;
const HIGH_SPEED_ACCEPTABLE_HEADER1 = (HIGH_SPEED_HEADER_BYTE << 24) |
    (HIGH_SPEED_HEADER_BYTE << 16) |
    (HIGH_SPEED_HEADER_BYTE << 8) |
    (HIGH_SPEED_HEADER_BYTE << 0);
const HIGH_SPEED_ACCEPTABLE_HEADER2 = ~HIGH_SPEED_ACCEPTABLE_HEADER1;
const HIGH_SPEED_DETECT = (HIGH_SPEED_HEADER_BYTE << 24) |
    (HIGH_SPEED_HEADER_BYTE << 16) |
    (HIGH_SPEED_HEADER_BYTE << 8) |
    (HIGH_SPEED_SYNC_BYTE << 0);
var CassetteSpeed;
(function (CassetteSpeed) {
    CassetteSpeed[CassetteSpeed["LOW_SPEED"] = 0] = "LOW_SPEED";
    CassetteSpeed[CassetteSpeed["HIGH_SPEED"] = 1] = "HIGH_SPEED";
})(CassetteSpeed = exports.CassetteSpeed || (exports.CassetteSpeed = {}));
/**
 * See if actual and reference are equal, modulo some bit offset.
 *
 * @param actual the last 32 bits of the stream.
 * @param reference the 32 bits we're looking for.
 * @return the number of extra bits (0 to 7 inclusive) in "actual" after the end of reference,
 * or undefined if not a match.
 */
function checkMatch(actual, reference) {
    for (let offset = 0; offset < 8; offset++) {
        if ((actual & ~((1 << offset) - 1)) === reference << offset) {
            return offset;
        }
    }
    return undefined;
}
/**
 * Represents a file on a cassette. (Not the CAS file itself.)
 */
class CassetteFile {
    constructor(offset, speed, file) {
        this.offset = offset;
        this.speed = speed;
        this.file = file;
    }
    /**
     * Return the file's annotations adjusted by the offset into the cassette.
     */
    adjustedAnnotations() {
        return this.file.annotations.map(annotation => annotation.adjusted(this.offset));
    }
}
exports.CassetteFile = CassetteFile;
/**
 * Represents a cassette (CAS file).
 */
class Cassette extends Trs80File_1.Trs80File {
    constructor(binary, error, annotations, files) {
        super(binary, error, annotations);
        this.files = files;
    }
    getDescription() {
        if (this.files.length === 0) {
            return "Empty cassette";
        }
        else if (this.files.length === 1) {
            const cassetteFile = this.files[0];
            return cassetteFile.file.getDescription() + " on a " +
                (cassetteFile.speed === CassetteSpeed.LOW_SPEED ? "low" : "high") + " speed cassette";
        }
        else {
            return "Cassette with " + this.files.length + " files";
        }
    }
}
exports.Cassette = Cassette;
/**
 * High-speed CAS files have start bits built-in. Strip these out because
 * we re-insert them below when encoding. We could also remove the
 * writing of start bits below, but we don't really know how many bits
 * there are at the end that we shouldn't write.
 *
 * Update: We no longer insert start bits in encodeHighSpeed(), so this
 * routine is no longer necessary, but we keep it around anyway.
 */
function stripStartBits(inBytes) {
    // Compute new size of array.
    const outBytes = new Uint8Array(Math.floor(inBytes.length * 8 / 9));
    // Fill output buffer.
    for (let i = 0; i < outBytes.length; i++) {
        // Index of most-significant data bit.
        const bitIndex = i * 9 + 1;
        const byteIndex = Math.floor(bitIndex / 8);
        const bitOffset = bitIndex % 8;
        let value = inBytes[byteIndex] << bitOffset;
        if (bitOffset !== 0) {
            value |= inBytes[byteIndex + 1] >> (8 - bitOffset);
        }
        outBytes[i] = value;
    }
    return outBytes;
}
/**
 * Decodes a CAS from the binary. If the binary is not at all a cassette,
 * returns undefined. If it's a cassette with decoding errors, returns
 * partially-decoded object and sets the "error" field.
 */
function decodeCassette(binary) {
    const start = 0;
    const annotations = [];
    const cassetteFiles = [];
    while (true) {
        let recentBits = 0xFFFFFFFF;
        let programBinary;
        let speed;
        let programStartIndex = 0;
        for (let i = start; i < binary.length; i++) {
            const byte = binary[i];
            recentBits = (recentBits << 8) | byte;
            const lowSpeedBitOffset = checkMatch(recentBits, LOW_SPEED_DETECT);
            if (lowSpeedBitOffset !== undefined) {
                if (lowSpeedBitOffset !== 0) {
                    // TODO
                    throw new Error("We don't yet handle low-speed cassettes with bit offsets of " + lowSpeedBitOffset);
                }
                annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Low speed header", 0, i));
                annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Low speed sync byte", i, i + 1));
                speed = CassetteSpeed.LOW_SPEED;
                programStartIndex = i + 1;
                programBinary = binary.subarray(programStartIndex);
                break;
            }
            const highSpeedBitOffset = checkMatch(recentBits, HIGH_SPEED_DETECT);
            if (highSpeedBitOffset !== undefined) {
                if (highSpeedBitOffset !== 0) {
                    // TODO
                    throw new Error("We don't yet handle high-speed cassettes with bit offsets of " +
                        highSpeedBitOffset);
                }
                annotations.push(new ProgramAnnotation_1.ProgramAnnotation("High speed header", 0, i));
                annotations.push(new ProgramAnnotation_1.ProgramAnnotation("High speed sync byte", i, i + 1));
                speed = CassetteSpeed.HIGH_SPEED;
                programStartIndex = i + 1;
                programBinary = stripStartBits(binary.subarray(programStartIndex));
                break;
            }
            if (i >= start + 4 &&
                recentBits !== LOW_SPEED_ACCEPTABLE_HEADER &&
                recentBits !== HIGH_SPEED_ACCEPTABLE_HEADER1 &&
                recentBits !== HIGH_SPEED_ACCEPTABLE_HEADER2) {
                // We should be seeing the header bits.
                break;
            }
        }
        if (programBinary === undefined || speed === undefined) {
            // Not a CAS file.
            return undefined;
        }
        // See what kind of file it is. System program aren't decoded by decodeTrs80File() because
        // these are always on cassettes or with a .3BN extension. So try that ourselves first.
        let file = SystemProgram_1.decodeSystemProgram(programBinary);
        if (file === undefined) {
            file = Trs80FileDecoder_1.decodeTrs80File(programBinary, undefined);
        }
        cassetteFiles.push(new CassetteFile(programStartIndex, speed, file));
        // TODO handle multiple files. See HAUNT.CAS.
        break;
    }
    // Merge the annotations of the files into ours.
    for (const file of cassetteFiles) {
        annotations.push(...file.adjustedAnnotations());
    }
    return new Cassette(binary, undefined, annotations, cassetteFiles);
}
exports.decodeCassette = decodeCassette;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeTrs80File = void 0;
const Basic_1 = __webpack_require__(16);
const Cassette_1 = __webpack_require__(19);
const CmdProgram_1 = __webpack_require__(18);
const RawBinaryFile_1 = __webpack_require__(21);
const Jv1FloppyDisk_1 = __webpack_require__(22);
const Jv3FloppyDisk_1 = __webpack_require__(42);
const DmkFloppyDisk_1 = __webpack_require__(43);
const SystemProgram_1 = __webpack_require__(9);
/**
 * Get the extension of the filename, including the dot, in upper case, or
 * an empty string if the filename does not contain an extension.
 */
function getExtension(filename) {
    // Strip pathname, in case the filename has no dot but a path component does.
    // Not sure if we need to support backslash here.
    const slash = filename.lastIndexOf("/");
    if (slash >= 0) {
        filename = filename.substr(slash + 1);
    }
    // Look for extension.
    const dot = filename.lastIndexOf(".");
    // If the dot is at position 0, then it's just a hidden file, not an extension.
    return dot > 0 ? filename.substr(dot).toUpperCase() : "";
}
/**
 * Decode a file that's known to be a floppy disk, but not what kind specifically.
 */
function decodeDsk(binary) {
    // TODO see trs_disk.c:trs_disk_emutype()
    // TODO see DiskDrive.cpp:Dectect_JV1, etc.
    let trs80File;
    trs80File = DmkFloppyDisk_1.decodeDmkFloppyDisk(binary);
    if (trs80File !== undefined) {
        return trs80File;
    }
    trs80File = Jv1FloppyDisk_1.decodeJv1FloppyDisk(binary);
    if (trs80File !== undefined) {
        return trs80File;
    }
    trs80File = Jv3FloppyDisk_1.decodeJv3FloppyDisk(binary);
    if (trs80File !== undefined) {
        return trs80File;
    }
    return undefined;
}
/**
 * Top-level decoder for any TRS-80 file.
 *
 * @param binary the bytes of the file.
 * @param filename optional filename to help with detection.
 */
function decodeTrs80File(binary, filename) {
    var _a, _b, _c, _d;
    let trs80File;
    const extension = filename === undefined ? "" : getExtension(filename);
    if (extension === ".JV1") {
        return (_a = Jv1FloppyDisk_1.decodeJv1FloppyDisk(binary)) !== null && _a !== void 0 ? _a : new RawBinaryFile_1.RawBinaryFile(binary);
    }
    if (extension === ".DSK") {
        return (_b = decodeDsk(binary)) !== null && _b !== void 0 ? _b : new RawBinaryFile_1.RawBinaryFile(binary);
    }
    if (extension === ".DMK") {
        return (_c = DmkFloppyDisk_1.decodeDmkFloppyDisk(binary)) !== null && _c !== void 0 ? _c : new RawBinaryFile_1.RawBinaryFile(binary);
    }
    // "Model III BiNary" format, invented by George Phillips for trs80gp.
    // Rarely used as a stand-alone file, usually just embedded in .CAS files.
    if (extension === ".3BN") {
        return (_d = SystemProgram_1.decodeSystemProgram(binary)) !== null && _d !== void 0 ? _d : new RawBinaryFile_1.RawBinaryFile(binary);
    }
    trs80File = Cassette_1.decodeCassette(binary);
    if (trs80File !== undefined) {
        return trs80File;
    }
    trs80File = CmdProgram_1.decodeCmdProgram(binary);
    if (trs80File !== undefined) {
        return trs80File;
    }
    trs80File = Basic_1.decodeBasicProgram(binary);
    if (trs80File !== undefined) {
        return trs80File;
    }
    return new RawBinaryFile_1.RawBinaryFile(binary);
}
exports.decodeTrs80File = decodeTrs80File;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RawBinaryFile = void 0;
const Trs80File_1 = __webpack_require__(2);
/**
 * File when we don't recognize the type.
 */
class RawBinaryFile extends Trs80File_1.Trs80File {
    constructor(binary) {
        super(binary, undefined, []);
    }
    getDescription() {
        return "Unknown file";
    }
}
exports.RawBinaryFile = RawBinaryFile;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJv1FloppyDisk = exports.Jv1FloppyDisk = void 0;
const FloppyDisk_1 = __webpack_require__(5);
const ProgramAnnotation_1 = __webpack_require__(1);
const BYTES_PER_SECTOR = 256;
const SECTORS_PER_TRACK = 10;
const BYTES_PER_TRACK = BYTES_PER_SECTOR * SECTORS_PER_TRACK;
const DIRECTORY_TRACK = 17;
/**
 * Floppy disk in the JV1 format.
 */
class Jv1FloppyDisk extends FloppyDisk_1.FloppyDisk {
    constructor(binary, error, annotations) {
        super(binary, error, annotations, false);
    }
    getDescription() {
        return "Floppy disk (JV1)";
    }
    readSector(trackNumber, side, sectorNumber) {
        sectorNumber = sectorNumber !== null && sectorNumber !== void 0 ? sectorNumber : 0;
        // Check for errors.
        if (trackNumber < 0 ||
            side === FloppyDisk_1.Side.BACK ||
            sectorNumber >= SECTORS_PER_TRACK) {
            return undefined;
        }
        // Offset straight into data.
        const offset = (SECTORS_PER_TRACK * trackNumber + sectorNumber) * BYTES_PER_SECTOR;
        const data = this.padSector(this.binary.subarray(offset, offset + BYTES_PER_SECTOR), BYTES_PER_SECTOR);
        const sectorData = new FloppyDisk_1.SectorData(data);
        if (trackNumber === DIRECTORY_TRACK) {
            // I don't know why "deleted" is used for the directory track.
            sectorData.deleted = true;
        }
        return sectorData;
    }
}
exports.Jv1FloppyDisk = Jv1FloppyDisk;
/**
 * Decode a JV1 floppy disk file.
 */
function decodeJv1FloppyDisk(binary) {
    let error;
    const annotations = [];
    const length = binary.length;
    // Magic number check.
    if (length < 2 || binary[0] !== 0x00 || binary[1] !== 0xFE) {
        return undefined;
    }
    // Basic sanity check.
    if (length % BYTES_PER_TRACK !== 0) {
        error = "Length is not a multiple of track size (" + BYTES_PER_TRACK + " bytes)";
    }
    // Create annotations.
    for (let byteOffset = 0; byteOffset < length; byteOffset += BYTES_PER_SECTOR) {
        const track = Math.floor(byteOffset / BYTES_PER_TRACK);
        const sector = (byteOffset - track * BYTES_PER_TRACK) / BYTES_PER_SECTOR;
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Track " + track + ", sector " + sector, byteOffset, Math.min(byteOffset + BYTES_PER_SECTOR, length)));
    }
    return new Jv1FloppyDisk(binary, error, annotations);
}
exports.decodeJv1FloppyDisk = decodeJv1FloppyDisk;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Various utility functions.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convert a number to hex and zero-pad to the specified number of hex digits.
 */
function toHex(value, digits) {
    return value.toString(16).toUpperCase().padStart(digits, "0");
}
exports.toHex = toHex;
/**
 * Convert a byte to hex.
 */
function toHexByte(value) {
    return toHex(value, 2);
}
exports.toHexByte = toHexByte;
/**
 * Convert a word to hex.
 */
function toHexWord(value) {
    return toHex(value, 4);
}
exports.toHexWord = toHexWord;
/**
 * Convert a long (32-bit value) to hex.
 */
function toHexLong(value) {
    value &= 0xFFFFFFFF;
    // Convert two's complement negative numbers to positive numbers.
    if (value < 0) {
        value += 0x100000000;
    }
    return value.toString(16).toUpperCase().padStart(8, "0");
}
exports.toHexLong = toHexLong;
/**
 * Return the high byte of a word.
 */
function hi(value) {
    return (value >> 8) & 0xFF;
}
exports.hi = hi;
/**
 * Return the low byte of a word.
 */
function lo(value) {
    return value & 0xFF;
}
exports.lo = lo;
/**
 * Create a word from a high and low byte.
 */
function word(highByte, lowByte) {
    return ((highByte & 0xFF) << 8) | (lowByte & 0xFF);
}
exports.word = word;
/**
 * Increment a byte.
 */
function inc8(value) {
    return add8(value, 1);
}
exports.inc8 = inc8;
/**
 * Increment a word.
 */
function inc16(value) {
    return add16(value, 1);
}
exports.inc16 = inc16;
/**
 * Decrement a byte.
 */
function dec8(value) {
    return sub8(value, 1);
}
exports.dec8 = dec8;
/**
 * Decrement a word.
 */
function dec16(value) {
    return sub16(value, 1);
}
exports.dec16 = dec16;
/**
 * Add two bytes together.
 */
function add8(a, b) {
    return (a + b) & 0xFF;
}
exports.add8 = add8;
/**
 * Add two words together.
 */
function add16(a, b) {
    return (a + b) & 0xFFFF;
}
exports.add16 = add16;
/**
 * Subtract two bytes.
 */
function sub8(a, b) {
    return (a - b) & 0xFF;
}
exports.sub8 = sub8;
/**
 * Subtract two words.
 */
function sub16(a, b) {
    return (a - b) & 0xFFFF;
}
exports.sub16 = sub16;
/**
 * Convert a byte to a signed number (e.g., 0xff to -1).
 */
function signedByte(value) {
    return value >= 128 ? value - 256 : value;
}
exports.signedByte = signedByte;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventList = void 0;
const ste_core_1 = __webpack_require__(0);
const EventDispatcher_1 = __webpack_require__(11);
/**
 * Storage class for multiple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class EventList extends ste_core_1.EventListBase {
    /**
     * Creates a new EventList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new EventDispatcher_1.EventDispatcher();
    }
}
exports.EventList = EventList;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleEventList = void 0;
const ste_core_1 = __webpack_require__(0);
const SimpleEventDispatcher_1 = __webpack_require__(12);
/**
 * Storage class for multiple simple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class SimpleEventList extends ste_core_1.EventListBase {
    /**
     * Creates a new SimpleEventList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new SimpleEventDispatcher_1.SimpleEventDispatcher();
    }
}
exports.SimpleEventList = SimpleEventList;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalDispatcher = void 0;
const ste_core_1 = __webpack_require__(0);
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event.
 *
 * @export
 * @class SignalDispatcher
 * @extends {DispatcherBase<ISignalHandler>}
 * @implements {ISignal}
 */
class SignalDispatcher extends ste_core_1.DispatcherBase {
    /**
     * Creates an instance of SignalDispatcher.
     *
     * @memberOf SignalDispatcher
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the signal.
     *
     * @returns {IPropagationStatus} The status of the signal.
     *
     * @memberOf SignalDispatcher
     */
    dispatch() {
        const result = this._dispatch(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the signal without waiting for the result.
     *
     * @memberOf SignalDispatcher
     */
    dispatchAsync() {
        this._dispatch(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     *
     * @returns {ISignal} The signal.
     *
     * @memberOf SignalDispatcher
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.SignalDispatcher = SignalDispatcher;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalList = void 0;
const ste_core_1 = __webpack_require__(0);
const SignalDispatcher_1 = __webpack_require__(26);
/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class SignalList extends ste_core_1.EventListBase {
    /**
     * Creates a new SignalList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new SignalDispatcher_1.SignalDispatcher();
    }
}
exports.SignalList = SignalList;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseEventList = void 0;
const ste_core_1 = __webpack_require__(0);
const PromiseEventDispatcher_1 = __webpack_require__(13);
/**
 * Storage class for multiple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class PromiseEventList extends ste_core_1.EventListBase {
    /**
     * Creates a new EventList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new PromiseEventDispatcher_1.PromiseEventDispatcher();
    }
}
exports.PromiseEventList = PromiseEventList;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Promise Signals
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseSignalList = exports.PromiseSignalHandlingBase = exports.PromiseSignalDispatcher = void 0;
const PromiseSignalDispatcher_1 = __webpack_require__(81);
Object.defineProperty(exports, "PromiseSignalDispatcher", { enumerable: true, get: function () { return PromiseSignalDispatcher_1.PromiseSignalDispatcher; } });
const PromiseSignalHandlingBase_1 = __webpack_require__(82);
Object.defineProperty(exports, "PromiseSignalHandlingBase", { enumerable: true, get: function () { return PromiseSignalHandlingBase_1.PromiseSignalHandlingBase; } });
const PromiseSignalList_1 = __webpack_require__(30);
Object.defineProperty(exports, "PromiseSignalList", { enumerable: true, get: function () { return PromiseSignalList_1.PromiseSignalList; } });


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseSignalList = void 0;
const ste_core_1 = __webpack_require__(0);
const _1 = __webpack_require__(29);
/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class PromiseSignalList extends ste_core_1.EventListBase {
    /**
     * Creates a new SignalList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new _1.PromiseSignalDispatcher();
    }
}
exports.PromiseSignalList = PromiseSignalList;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseSimpleEventList = void 0;
const ste_core_1 = __webpack_require__(0);
const PromiseSimpleEventDispatcher_1 = __webpack_require__(14);
/**
 * Storage class for multiple simple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class PromiseSimpleEventList extends ste_core_1.EventListBase {
    /**
     * Creates a new SimpleEventList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new PromiseSimpleEventDispatcher_1.PromiseSimpleEventDispatcher();
    }
}
exports.PromiseSimpleEventList = PromiseSimpleEventList;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventScheduler = exports.ScheduledEvent = exports.EventType = void 0;
/**
 * Type of event, for mass canceling.
 */
var EventType;
(function (EventType) {
    // Disk events.
    EventType[EventType["DISK_DONE"] = 1] = "DISK_DONE";
    EventType[EventType["DISK_LOST_DATA"] = 2] = "DISK_LOST_DATA";
    EventType[EventType["DISK_FIRST_DRQ"] = 4] = "DISK_FIRST_DRQ";
    // All disk events.
    EventType[EventType["DISK_ALL"] = 7] = "DISK_ALL";
})(EventType = exports.EventType || (exports.EventType = {}));
/**
 * An event scheduled for the future.
 */
class ScheduledEvent {
    constructor(eventType, handle, tStateCount, callback) {
        this.eventType = eventType;
        this.handle = handle;
        this.tStateCount = Math.round(tStateCount);
        this.callback = callback;
    }
    /**
     * Whether the event type of this event is included in the mask.
     */
    matchesEventTypeMask(eventTypeMask) {
        return this.eventType !== undefined && (this.eventType & eventTypeMask) !== 0;
    }
}
exports.ScheduledEvent = ScheduledEvent;
/**
 * Stores events in chronological order and fires them off.
 */
class EventScheduler {
    constructor() {
        this.counter = 1;
        // Sorted by tStateCount.
        this.events = [];
    }
    /**
     * Dispatch all events ready to go.
     *
     * @param tStateCount current clock count.
     */
    dispatch(tStateCount) {
        while (this.events.length > 0 && tStateCount >= this.events[0].tStateCount) {
            const scheduledEvent = this.events.shift();
            scheduledEvent.callback();
        }
    }
    /**
     * Schedule an event to happen at tStateCount clocks. The callback will be called
     * at the end of an instruction step.
     *
     * @return a handle that can be passed to cancel().
     */
    add(eventType, tStateCount, callback) {
        let handle = this.counter++;
        this.events.push(new ScheduledEvent(eventType, handle, tStateCount, callback));
        this.events.sort((a, b) => {
            if (a.tStateCount < b.tStateCount) {
                return -1;
            }
            else if (a.tStateCount > b.tStateCount) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return handle;
    }
    /**
     * Cancel an event scheduled by add().
     */
    cancel(handle) {
        for (let i = 0; i < this.events.length; i++) {
            if (this.events[i].handle === handle) {
                this.events.splice(i, 1);
                break;
            }
        }
    }
    /**
     * Cancel all events that are included in the mask.
     */
    cancelByEventTypeMask(eventTypeMask) {
        this.events = this.events.filter(e => !e.matchesEventTypeMask(eventTypeMask));
    }
    /**
     * Returns the first (next to dispatch) event included in the mask, or undefined if none.
     * Does not remove the event from the queue.
     */
    getFirstEvent(eventTypeMask) {
        for (const event of this.events) {
            if (event.matchesEventTypeMask(eventTypeMask)) {
                return event;
            }
        }
        return undefined;
    }
}
exports.EventScheduler = EventScheduler;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsPanel = exports.PanelType = void 0;
const Utils_1 = __webpack_require__(8);
const Config_1 = __webpack_require__(10);
const CanvasScreen_1 = __webpack_require__(15);
const gCssPrefix = Utils_1.CSS_PREFIX + "-settings-panel";
const gScreenNodeCssClass = gCssPrefix + "-screen-node";
const gPanelCssClass = gCssPrefix + "-panel";
const gShownCssClass = gCssPrefix + "-shown";
const gAcceptButtonCssClass = gCssPrefix + "-accept";
const gRebootButtonCssClass = gCssPrefix + "-reboot";
const gOptionsClass = gCssPrefix + "-options";
const gButtonsClass = gCssPrefix + "-buttons";
const gColorButtonClass = gCssPrefix + "-color-button";
const gDarkColorButtonClass = gCssPrefix + "-dark-color-button";
const gAcceptButtonColor = "#449944";
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
    transition: opacity .20s ease-in-out, visibility .20s ease-in-out;
}

.${gPanelCssClass}.${gShownCssClass} {
    opacity: 1;
    visibility: visible;
}

.${gPanelCssClass} > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    background-color: rgba(40, 40, 40, 0.8);
    border-radius: 15px;
    color: #ccc;
    font-family: sans-serif;
    font-size: 10pt;
    line-height: normal;
    margin: 20px 0;
    padding: 10px 30px;
    min-width: 200px;
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
    justify-content: center;
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

.${gPanelCssClass} input[type=radio] + label.${gColorButtonClass} {
    flex-grow: 0;
    flex-basis: auto;
    width: 24px;
    height: 24px;
    padding: 0;
    border-radius: 999px;
    border: 2px solid transparent;
    color: transparent;
    transition: color .20s ease-in-out;
}

.${gPanelCssClass} input[type=radio] + label.${gColorButtonClass}.${gDarkColorButtonClass} {
    border: solid 2px #ccc;
}

.${gPanelCssClass} input[type=radio]:checked + label.${gColorButtonClass}::after {
    content: "✓";
    font-size: 20px;
}

.${gPanelCssClass} input[type=radio]:checked + label.${gColorButtonClass} {
    color: black;
}

.${gPanelCssClass} input[type=radio]:checked + label.${gColorButtonClass}.${gDarkColorButtonClass} {
    color: #ccc;
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
    background-color: ${gAcceptButtonColor};
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
// Convert RGB array (0-255) to a CSS string.
function rgbToCss(color) {
    return "#" + color.map(c => c.toString(16).padStart(2, "0").toUpperCase()).join("");
}
// Multiplies an RGB (0-255) color by a factor.
function adjustColor(color, factor) {
    return color.map(c => Math.max(0, Math.min(255, Math.round(c * factor))));
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
                value: Config_1.ModelType.MODEL1,
            },
            {
                label: "Model III",
                value: Config_1.ModelType.MODEL3,
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
                value: Config_1.BasicLevel.LEVEL1,
            },
            {
                label: "Level 2",
                value: Config_1.BasicLevel.LEVEL2,
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
                value: Config_1.CGChip.ORIGINAL,
            },
            {
                label: "Lower case",
                value: Config_1.CGChip.LOWER_CASE,
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
                value: Config_1.RamSize.RAM_4_KB,
            },
            {
                label: "16 kB",
                value: Config_1.RamSize.RAM_16_KB,
            },
            {
                label: "32 kB",
                value: Config_1.RamSize.RAM_32_KB,
            },
            {
                label: "48 kB",
                value: Config_1.RamSize.RAM_48_KB,
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
                label: rgbToCss(adjustColor(CanvasScreen_1.phosphorToRgb(Config_1.Phosphor.WHITE), 0.8)),
                value: Config_1.Phosphor.WHITE,
            },
            {
                // Cheat and use the green from the OK button so that the two greens don't clash.
                label: gAcceptButtonColor,
                value: Config_1.Phosphor.GREEN,
            },
            {
                label: rgbToCss(adjustColor(CanvasScreen_1.phosphorToRgb(Config_1.Phosphor.AMBER), 0.8)),
                value: Config_1.Phosphor.AMBER,
            },
        ]
    },
    {
        title: "Background",
        isChecked: (background, config) => background === config.background,
        updateConfig: (background, config) => config.withBackground(background),
        options: [
            {
                label: CanvasScreen_1.BLACK_BACKGROUND,
                value: Config_1.Background.BLACK,
            },
            {
                label: CanvasScreen_1.AUTHENTIC_BACKGROUND,
                value: Config_1.Background.AUTHENTIC,
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
                value: Config_1.ScanLines.OFF,
            },
            {
                label: "On",
                value: Config_1.ScanLines.ON,
            },
        ]
    },
];
// Type of panel to show.
var PanelType;
(function (PanelType) {
    // Model, RAM, etc.
    PanelType[PanelType["HARDWARE"] = 0] = "HARDWARE";
    // Phosphor color, background, etc.
    PanelType[PanelType["VIEW"] = 1] = "VIEW";
})(PanelType = exports.PanelType || (exports.PanelType = {}));
// Get the right options blocks for the panel type.
function optionBlocksForPanelType(panelType) {
    switch (panelType) {
        case PanelType.HARDWARE:
        default:
            return HARDWARE_OPTION_BLOCKS;
        case PanelType.VIEW:
            return VIEW_OPTION_BLOCKS;
    }
}
/**
 * Whether the given CSS color is dark.
 *
 * @param color an CSS color in the form "#rrggbb".
 */
function isDarkColor(color) {
    if (!color.startsWith("#") || color.length !== 7) {
        throw new Error("isDarkColor: not a color (" + color + ")");
    }
    const red = parseInt(color.substr(1, 2), 16);
    const grn = parseInt(color.substr(3, 2), 16);
    const blu = parseInt(color.substr(5, 2), 16);
    const gray = red * 0.3 + grn * 0.6 + blu * 0.1;
    return gray < 110;
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
            const name = gCssPrefix + "-" + gRadioButtonCounter++;
            const blockDiv = document.createElement("div");
            div.appendChild(blockDiv);
            const h1 = document.createElement("h1");
            h1.innerText = block.title;
            blockDiv.appendChild(h1);
            const optionsDiv = document.createElement("div");
            optionsDiv.classList.add(gOptionsClass);
            blockDiv.appendChild(optionsDiv);
            for (const option of block.options) {
                const id = gCssPrefix + "-" + gRadioButtonCounter++;
                const input = document.createElement("input");
                input.id = id;
                input.type = "radio";
                input.name = name;
                input.addEventListener("change", () => this.updateEnabledOptions());
                optionsDiv.appendChild(input);
                const label = document.createElement("label");
                label.htmlFor = id;
                if (option.label.startsWith("#")) {
                    // It's a color, show a swatch.
                    label.classList.add(gColorButtonClass);
                    label.style.backgroundColor = option.label;
                    if (isDarkColor(option.label)) {
                        label.classList.add(gDarkColorButtonClass);
                    }
                }
                else {
                    label.innerText = option.label;
                }
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
        const styleId = gCssPrefix;
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
exports.SettingsPanel = SettingsPanel;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlPanel = void 0;
const Utils_1 = __webpack_require__(8);
const SettingsPanel_1 = __webpack_require__(33);
const gCssPrefix = Utils_1.CSS_PREFIX + "-control-panel";
const gScreenNodeCssClass = gCssPrefix + "-screen-node";
const gPanelCssClass = gCssPrefix + "-panel";
const gButtonCssClass = gCssPrefix + "-button";
const gShowingOtherPanelCssClass = gCssPrefix + "-showing-other-panel";
// https://thenounproject.com/search/?q=reset&i=3012384
const RESET_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" xml:space="preserve">
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
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
    <g fill="white">
        <circle cx="50" cy="55.4" r="13.8"/>
        <path d="M80.6,25.4H67.1l-1.8-7.2c-0.5-2.1-2.5-3.6-4.7-3.6H39.3c-2.2,0-4.1,1.5-4.7,3.6l-1.8,7.2H19.4C11.5,25.4,5,31.9,5,39.8V71   c0,7.9,6.5,14.4,14.4,14.4h61.2C88.5,85.4,95,78.9,95,71V39.8C95,31.9,88.5,25.4,80.6,25.4z M50,76.4c-11.6,0-21-9.4-21-21   s9.4-21,21-21s21,9.4,21,21S61.6,76.4,50,76.4z M81.4,40.3c-2,0-3.6-1.6-3.6-3.6c0-2,1.6-3.6,3.6-3.6s3.6,1.6,3.6,3.6   C85,38.7,83.4,40.3,81.4,40.3z"/>
    </g>
</svg>
`;
// https://thenounproject.com/search/?q=previous%20track&i=658409
const PREVIOUS_TRACK_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -2 16 21" version="1.1">
    <g fill="white" fill-rule="evenodd">
        <g transform="translate(-320.000000, -618.000000)">
            <path d="M330,628.032958 L330,634.00004 C330,634.545291 330.45191,635 331.009369,635 L332.990631,635 C333.556647,635 334,634.552303 334,634.00004 L334,618.99996 C334,618.454709 333.54809,618 332.990631,618 L331.009369,618 C330.443353,618 330,618.447697 330,618.99996 L330,624.967057 C329.894605,624.850473 329.775773,624.739153 329.643504,624.634441 L322.356496,618.865559 C321.054403,617.834736 320,618.3432 320,620.000122 L320,632.999878 C320,634.663957 321.055039,635.164761 322.356496,634.134441 L329.643504,628.365559 C329.775779,628.260841 329.894611,628.149527 330,628.032958 Z" transform="translate(327.000000, 626.500000) scale(-1, 1) translate(-327.000000, -626.500000) "/>
        </g>
    </g>
</svg>
`;
// https://thenounproject.com/search/?q=settings&i=3593545
const HARDWARE_SETTINGS_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="7 7 121 121" version="1.1">
    <g fill="white" transform="translate(0,-161.53332)">
        <path d="m 61.57997,173.33818 c -1.653804,0 -3.159177,0.77847 -4.132553,1.85984 -0.973402,1.08136 -1.513575,2.40442 -1.771491,3.76721 a 2.1609049,2.1609049 0 0 0 0,0.002 l -1.654678,8.74831 c -2.047981,0.67947 -4.038494,1.50768 -5.964476,2.48047 l -7.367508,-5.02347 c -1.145302,-0.78076 -2.462953,-1.33572 -3.916045,-1.41232 -1.4546,-0.0764 -3.068029,0.44118 -4.235926,1.60921 l -8.699209,8.69921 c -1.169405,1.16909 -1.685211,2.78351 -1.609725,4.23643 0.07501,1.45291 0.629259,2.7738 1.410256,3.92018 l 5.001762,7.336 c -0.9702,1.93582 -1.794192,3.93628 -2.468589,5.99392 l -8.740034,1.65417 c -1.362789,0.25787 -2.688378,0.79815 -3.769783,1.77147 -1.081405,0.97346 -1.859333,2.4815 -1.859333,4.13526 v 12.30262 c 0,1.65378 0.777928,3.1592 1.859333,4.13255 1.081405,0.97338 2.406994,1.51567 3.769783,1.77353 l 8.754004,1.6583 c 0.679477,2.04603 1.506088,4.03461 2.478379,5.95882 l -5.025522,7.3675 c -0.781606,1.14644 -1.334744,2.4664 -1.410256,3.91967 -0.07498,1.45325 0.439817,3.06745 1.609725,4.23643 l 8.699209,8.69921 c 1.1693,1.16941 2.782914,1.68325 4.235926,1.60713 1.452986,-0.0761 2.771908,-0.63037 3.918109,-1.41179 l 7.33597,-5.00022 c 1.9363,0.97001 3.937926,1.79294 5.996014,2.46702 l 1.654175,8.74004 c 0.257889,1.36284 0.798486,2.68843 1.771994,3.76981 0.973402,1.08138 2.478749,1.8593 4.132553,1.8593 H 73.88672 c 1.653805,0 3.159152,-0.77792 4.132554,-1.8593 0.973005,-1.0809 1.513999,-2.40554 1.771994,-3.76772 v -0.003 l 1.656212,-8.74778 c 2.048113,-0.67943 4.038415,-1.50768 5.964502,-2.48047 l 7.365445,5.02142 c 1.146095,0.78144 2.465096,1.33567 3.918108,1.41179 1.452905,0.0761 3.068585,-0.43786 4.237995,-1.60713 l 8.6992,-8.69921 c 1.16931,-1.16946 1.68395,-2.78551 1.60767,-4.23852 -0.076,-1.45301 -0.63074,-2.77196 -1.41232,-3.91811 l -5.00177,-7.33547 c 0.9705,-1.93617 1.79398,-3.93639 2.46857,-5.99445 l 8.74003,-1.65418 c 1.36271,-0.25794 2.68841,-0.80018 3.76981,-1.77352 1.0813,-0.97335 1.85931,-2.47881 1.85931,-4.13256 v -12.30312 c 0,-1.65378 -0.77801,-3.16127 -1.85931,-4.13465 -1.0809,-0.97292 -2.40562,-1.51344 -3.76772,-1.77146 l -8.74988,-1.65624 c -0.67918,-2.04684 -1.50825,-4.03585 -2.48046,-5.96088 l 5.02348,-7.36698 c 0.78118,-1.14583 1.33572,-2.46501 1.41232,-3.91811 0.077,-1.45309 -0.43952,-3.06905 -1.60973,-4.2385 l -8.69714,-8.69921 c -1.16962,-1.16891 -2.78461,-1.68557 -4.238494,-1.6092 -1.4528,0.0768 -2.770425,0.63186 -3.915542,1.41232 l -7.33597,5.00176 c -1.9363,-0.96998 -3.937926,-1.79297 -5.996014,-2.46703 l -1.656768,-8.74211 c -0.257783,-1.36269 -0.798062,-2.68582 -1.771464,-3.76721 -0.973297,-1.0814 -2.478749,-1.85984 -4.132554,-1.85984 z m 6.152595,34.74051 c 11.726704,0 21.185664,9.46065 21.185267,21.18735 0,11.7262 -9.459066,21.18696 -21.185267,21.18733 -11.726704,0 -21.187463,-9.4606 -21.18786,-21.18733 0,-11.72726 9.460653,-21.18772 21.18786,-21.18735 z"/>
    </g>
</svg>
`;
// https://thenounproject.com/search/?q=view&i=485540
const VIEW_SETTINGS_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="20 20 60 60">
    <g fill="white">
        <path d="M80,48.6c-7.8-10.4-18.4-16.7-30-16.7c-11.6,0-22.2,6.4-30,16.7c-0.6,0.9-0.6,2,0,2.9c7.8,10.4,18.4,16.7,30,16.7  s22.2-6.4,30-16.7C80.7,50.6,80.7,49.4,80,48.6z M62.8,50.8c-0.4,6.4-5.6,11.6-12,12c-7.7,0.5-14.1-5.9-13.6-13.6  c0.4-6.4,5.6-11.6,12-12C56.9,36.7,63.3,43.1,62.8,50.8z M56.9,50.4c-0.2,3.4-3,6.2-6.4,6.4c-4.2,0.3-7.6-3.2-7.3-7.3  c0.2-3.4,3-6.2,6.4-6.4C53.7,42.8,57.2,46.3,56.9,50.4z"/>
    </g>
</svg>
`;
// https://thenounproject.com/search/?q=edit&i=1072354
const EDIT_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-25 -25 562 562">
    <g fill="white">
        <path d="M318.37,85.45L422.53,190.11,158.89,455,54.79,350.38ZM501.56,60.2L455.11,13.53a45.93,45.93,0,0,0-65.11,0L345.51,58.24,449.66,162.9l51.9-52.15A35.8,35.8,0,0,0,501.56,60.2ZM0.29,497.49a11.88,11.88,0,0,0,14.34,14.17l116.06-28.28L26.59,378.72Z"/>
    </g>
</svg>
`;
// https://thenounproject.com/search/?q=checkmark&i=1409439
const CHECK_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g fill="white">
        <line x1="19.713" y1="55.055" x2="33.258" y2="68.6"/>
        <path d="M92.059,19.7c-2.733-2.733-7.165-2.734-9.9,0L33.258,68.6L17.841,53.183c-2.734-2.732-7.166-2.733-9.899,0.001   c-2.734,2.733-2.734,7.165,0,9.899l20.367,20.366c1.367,1.366,3.158,2.05,4.95,2.05s3.583-0.684,4.95-2.05l53.85-53.85   C94.792,26.866,94.792,22.434,92.059,19.7z"/>
    </g>
</svg>

`;
// https://thenounproject.com/search/?q=close&i=1609004
const CROSS_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-5 -5 110 110">
    <style type="text/css">
        .st0 {
            fill-rule: evenodd;
            clip-rule: evenodd;
        }
    </style>
    <path fill="white" class="st0" d="M61.2,50.5l32.1,32.1c3,3,3,7.7,0,10.7c-3,3-7.7,3-10.7,0L50.5,61.2L18.4,93.3c-3,3-7.7,3-10.7,0  c-3-3-3-7.7,0-10.7l32.1-32.1L7.7,18.4c-3-3-3-7.7,0-10.7s7.7-3,10.7,0l32.1,32.1L82.6,7.7c3-3,7.7-3,10.7,0c3,3,3,7.7,0,10.7  L61.2,50.5z"/>
</svg>
`;
const GLOBAL_CSS = `
.${gPanelCssClass} {
    background-color: rgba(40, 40, 40, 0.8);
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 5px;
    opacity: 0;
    transition: opacity .20s ease-in-out;
}

.${gScreenNodeCssClass} {
    /* Force the screen node to relative positioning. Hope that doesn't screw anything up. */
    position: relative;
}

.${gScreenNodeCssClass}:hover .${gPanelCssClass} {
    opacity: 1;
}

/* Hide the control panel if any other panel is showing (like settings). */
.${gScreenNodeCssClass}.${gShowingOtherPanelCssClass}:hover .${gPanelCssClass} {
    opacity: 0;
}

.${gButtonCssClass} {
    display: block;
    /* background-color: red; */
    margin: 15px;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity .05s ease-in-out, transform 0.05s ease-in-out;
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
        screenNode.classList.add(gScreenNodeCssClass);
        this.panelNode = document.createElement("div");
        this.panelNode.classList.add(gPanelCssClass);
        screenNode.appendChild(this.panelNode);
    }
    /**
     * Generic function to add a button to the control panel.
     */
    addButton(iconSvg, title, callback) {
        let icon = document.createElement("img");
        icon.classList.add(gButtonCssClass);
        icon.width = 30;
        icon.height = 30;
        icon.src = "data:image/svg+xml;base64," + btoa(iconSvg);
        icon.title = title;
        icon.addEventListener("click", callback);
        this.panelNode.appendChild(icon);
    }
    /**
     * Add a reset button.
     */
    addResetButton(callback) {
        this.addButton(RESET_ICON, "Reboot the computer", callback);
    }
    /**
     * Add a screenshot button.
     */
    addScreenshotButton(callback) {
        this.addButton(CAMERA_ICON, "Take a screenshot", callback);
    }
    /**
     * Add a tape rewind button.
     */
    addTapeRewindButton(callback) {
        this.addButton(PREVIOUS_TRACK_ICON, "Rewind the cassette", callback);
    }
    /**
     * Add a settings button.
     */
    addSettingsButton(settingsPanel) {
        settingsPanel.onOpen = () => this.screenNode.classList.add(gShowingOtherPanelCssClass);
        settingsPanel.onClose = () => this.screenNode.classList.remove(gShowingOtherPanelCssClass);
        let iconSvg;
        switch (settingsPanel.panelType) {
            case SettingsPanel_1.PanelType.HARDWARE:
            default:
                iconSvg = HARDWARE_SETTINGS_ICON;
                break;
            case SettingsPanel_1.PanelType.VIEW:
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
     * Add a button to edit the program.
     */
    addEditorButton(callback) {
        this.addButton(EDIT_ICON, "Edit the program (Ctrl-Enter)", callback);
    }
    /**
     * Add a button to save.
     */
    addSaveButton(callback) {
        this.addButton(CHECK_ICON, "Save (Ctrl-Enter)", callback);
    }
    /**
     * Add a button to cancel.
     */
    addCancelButton(callback) {
        this.addButton(CROSS_ICON, "Cancel", callback);
    }
    /**
     * Make a global stylesheet for all TRS-80 emulators on this page.
     */
    static configureStyle() {
        const styleId = gCssPrefix;
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
exports.ControlPanel = ControlPanel;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CanvasScreen_1 = __webpack_require__(15);
const Trs80_1 = __webpack_require__(51);
const SettingsPanel_1 = __webpack_require__(33);
const ControlPanel_1 = __webpack_require__(34);
const ProgressBar_1 = __webpack_require__(86);
const CassettePlayer_1 = __webpack_require__(87);
const Editor_1 = __webpack_require__(88);
const teamten_ts_utils_1 = __webpack_require__(90);
const trs80_base_1 = __webpack_require__(3);
const screenNode = document.getElementById("screen");
const screen = new CanvasScreen_1.CanvasScreen(1.5);
const trs80 = new Trs80_1.Trs80(screen, new CassettePlayer_1.CassettePlayer());
const editor = new Editor_1.Editor(trs80, screen);
screenNode.append(editor.node);
const progressBar = new ProgressBar_1.ProgressBar(screen.getNode());
progressBar.setMaxValue(1234);
progressBar.setValue(1234 / 3);
const hardwareSettingsPanel = new SettingsPanel_1.SettingsPanel(screen.getNode(), trs80, SettingsPanel_1.PanelType.HARDWARE);
const viewSettingsPanel = new SettingsPanel_1.SettingsPanel(screen.getNode(), trs80, SettingsPanel_1.PanelType.VIEW);
const controlPanel = new ControlPanel_1.ControlPanel(screen.getNode());
controlPanel.addResetButton(() => trs80.reset());
// controlPanel.addTapeRewindButton(() => progressBar.show());
// controlPanel.addScreenshotButton(() => progressBar.hide());
controlPanel.addSettingsButton(hardwareSettingsPanel);
controlPanel.addSettingsButton(viewSettingsPanel);
controlPanel.addEditorButton(() => editor.startEdit());
// controlPanel.addSaveButton(() => 0);
// controlPanel.addCancelButton(() => 0);
trs80.reset();
trs80.start();
const programNode = document.createElement("pre");
programNode.style.backgroundColor = "#fdf6e3";
screenNode.append(programNode);
function updateProgram() {
    teamten_ts_utils_1.clearElement(programNode);
    // This might grab a program part-way through being edited. (I.e., the pointers might
    // be invalid.)
    const basicProgram = trs80.getBasicProgramFromMemory();
    if (typeof basicProgram === "string") {
        programNode.innerText = basicProgram;
    }
    else {
        let first = true;
        for (const element of basicProgram.elements) {
            if (element.elementType === trs80_base_1.ElementType.LINE_NUMBER && !first) {
                programNode.append("\n");
            }
            let color;
            switch (element.elementType) {
                case trs80_base_1.ElementType.ERROR:
                    color = "#dc322f";
                    break;
                case trs80_base_1.ElementType.LINE_NUMBER:
                    color = "#93a1a1";
                    break;
                case trs80_base_1.ElementType.PUNCTUATION:
                    color = "#93a1a1";
                    break;
                case trs80_base_1.ElementType.KEYWORD:
                    color = "#268bd2";
                    break;
                case trs80_base_1.ElementType.REGULAR:
                default:
                    color = "#657b83";
                    break;
                case trs80_base_1.ElementType.STRING:
                    color = "#cb4b16";
                    break;
                case trs80_base_1.ElementType.COMMENT:
                    color = "#2aa198";
                    break;
            }
            const span = document.createElement("span");
            span.style.color = color;
            span.innerText = element.text;
            programNode.append(span);
            first = false;
        }
    }
}
// setInterval(updateProgram, 100);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Trs80Screen = void 0;
const trs80_base_1 = __webpack_require__(3);
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
        let address = trs80_base_1.TRS80_SCREEN_BEGIN;
        for (let i = 1; i < s.length; i++) {
            const value = s.charCodeAt(i);
            let count = 1;
            if (value > 32 && value < 128) {
                // Implicit count of 1.
            }
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
        if (address !== trs80_base_1.TRS80_SCREEN_END) {
            throw new Error("Screenshot was of the wrong length");
        }
    }
}
exports.Trs80Screen = Trs80Screen;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.concatByteArrays = exports.withCommas = exports.clearElement = void 0;
/**
 * Remove all children from element.
 */
function clearElement(e) {
    while (e.firstChild) {
        e.removeChild(e.firstChild);
    }
}
exports.clearElement = clearElement;
/**
 * Generate the string version of a number, in base 10, with commas for thousands groups.
 */
function withCommas(n) {
    let s = typeof n === "number" ? Math.round(n).toString(10) : n;
    const negative = s.length >= 1 && s.charAt(0) === "-";
    const firstDigit = negative ? 1 : 0;
    if (s.length - firstDigit > 4) {
        for (let i = s.length - 3; i > firstDigit; i -= 3) {
            s = s.substring(0, i) + "," + s.substring(i);
        }
    }
    return s;
}
exports.withCommas = withCommas;
/**
 * Concatenate a list of byte arrays into one.
 */
function concatByteArrays(samplesList) {
    const length = samplesList.reduce((sum, samples) => sum + samples.length, 0);
    const allBytes = new Uint8Array(length);
    let offset = 0;
    for (const samples of samplesList) {
        allBytes.set(samples, offset);
        offset += samples.length;
    }
    return allBytes;
}
exports.concatByteArrays = concatByteArrays;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteReader = exports.EOF = void 0;
exports.EOF = -1;
/**
 * Provides an API for reading through a byte array.
 */
class ByteReader {
    constructor(b) {
        this.b = b;
        this.pos = 0;
    }
    /**
     * Return the next byte, or EOF on end of array.
     *
     * @returns {number}
     */
    read() {
        return this.pos < this.b.length ? this.b[this.pos++] : exports.EOF;
    }
    /**
     * Return the next byte, not advancing the stream.
     *
     * @param ahead how many bytes ahead to peek, or 0 for the next byte
     * to be returned by {@link #read()}.
     */
    peek(ahead = 0) {
        const pos = this.pos + ahead;
        return pos < this.b.length ? this.b[pos] : exports.EOF;
    }
    /**
     * Return the byte address of the next byte to be read.
     */
    addr() {
        return this.pos;
    }
    /**
     * Reads a little-endian short (two-byte) integer.
     *
     * @param allowEofAfterFirstByte if true, an EOF after the first byte will result in just the
     * first byte. Otherwise an EOF is returned.
     * @returns the integer, or EOF on end of file.
     */
    readShort(allowEofAfterFirstByte) {
        const low = this.read();
        if (low === exports.EOF) {
            return exports.EOF;
        }
        const high = this.read();
        if (high === exports.EOF) {
            return allowEofAfterFirstByte ? low : exports.EOF;
        }
        return low + high * 256;
    }
    /**
     * Reads an ASCII string from the stream. If the returned string is shorter than "length", then we hit EOF.
     */
    readString(length) {
        return new TextDecoder("ascii").decode(this.readBytes(length));
    }
    /**
     * Returns the next "length" bytes. If the returned array is shorter than "length", then we hit EOF.
     */
    readBytes(length) {
        const pos = this.pos;
        length = Math.min(length, this.b.length - pos);
        this.pos += length;
        // So instead make a copy.
        return this.b.slice(pos, pos + length);
    }
}
exports.ByteReader = ByteReader;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * List of all word registers.
 */
const WORD_REG = new Set(["af", "bc", "de", "hl", "af'", "bc'", "de'", "hl'", "ix", "iy", "sp", "pc"]);
/**
 * List of all byte registers.
 */
const BYTE_REG = new Set(["a", "f", "b", "c", "d", "e", "h", "l", "ixh", "ixl", "iyh", "iyl", "i", "r"]);
/**
 * Determine whether a register stores a word.
 */
function isWordReg(s) {
    return WORD_REG.has(s.toLowerCase());
}
exports.isWordReg = isWordReg;
/**
 * Determine whether a register stores a byte.
 */
function isByteReg(s) {
    return BYTE_REG.has(s.toLowerCase());
}
exports.isByteReg = isByteReg;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __webpack_require__(17);
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
        return Utils_1.hi(this.af);
    }
    set a(value) {
        this.af = Utils_1.word(value, this.f);
    }
    get f() {
        return Utils_1.lo(this.af);
    }
    set f(value) {
        this.af = Utils_1.word(this.a, value);
    }
    get b() {
        return Utils_1.hi(this.bc);
    }
    set b(value) {
        this.bc = Utils_1.word(value, this.c);
    }
    get c() {
        return Utils_1.lo(this.bc);
    }
    set c(value) {
        this.bc = Utils_1.word(this.b, value);
    }
    get d() {
        return Utils_1.hi(this.de);
    }
    set d(value) {
        this.de = Utils_1.word(value, this.e);
    }
    get e() {
        return Utils_1.lo(this.de);
    }
    set e(value) {
        this.de = Utils_1.word(this.d, value);
    }
    get h() {
        return Utils_1.hi(this.hl);
    }
    set h(value) {
        this.hl = Utils_1.word(value, this.l);
    }
    get l() {
        return Utils_1.lo(this.hl);
    }
    set l(value) {
        this.hl = Utils_1.word(this.h, value);
    }
    get ixh() {
        return Utils_1.hi(this.ix);
    }
    set ixh(value) {
        this.ix = Utils_1.word(value, this.ixl);
    }
    get ixl() {
        return Utils_1.lo(this.ix);
    }
    set ixl(value) {
        this.ix = Utils_1.word(this.ixh, value);
    }
    get iyh() {
        return Utils_1.hi(this.iy);
    }
    set iyh(value) {
        this.iy = Utils_1.word(value, this.iyl);
    }
    get iyl() {
        return Utils_1.lo(this.iy);
    }
    set iyl(value) {
        this.iy = Utils_1.word(this.iyh, value);
    }
    /**
     * Combine the two R parts together.
     */
    get rCombined() {
        return (this.r7 & 0x80) | (this.r & 0xF7);
    }
}
exports.RegisterSet = RegisterSet;
/**
 * All real fields of RegisterSet, for enumeration.
 */
exports.registerSetFields = [
    "af", "bc", "de", "hl",
    "afPrime", "bcPrime", "dePrime", "hlPrime",
    "ix", "iy", "sp", "pc",
    "memptr", "i", "r", "iff1", "iff2", "im", "halted"
];


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
})(Flag = exports.Flag || (exports.Flag = {}));


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJv3FloppyDisk = exports.Jv3FloppyDisk = void 0;
const z80_base_1 = __webpack_require__(4);
const FloppyDisk_1 = __webpack_require__(5);
const ProgramAnnotation_1 = __webpack_require__(1);
// The JV3 file consists of sectors of different sizes all bunched together. Before that
// comes a directory of these sectors, with three bytes per directory entry (track,
// sector, and flags), mapping in order to the subsequent sectors.
// The directory is in this header:
const HEADER_SIZE = 34 * 256;
// We can fit this many 3-byte records into it:
const RECORD_COUNT = Math.floor(HEADER_SIZE / 3);
// Flags for SectorInfo.
var Flags;
(function (Flags) {
    Flags[Flags["SIZE_CODE_MASK"] = 3] = "SIZE_CODE_MASK";
    Flags[Flags["NON_IBM"] = 4] = "NON_IBM";
    Flags[Flags["BAD_CRC"] = 8] = "BAD_CRC";
    Flags[Flags["SIDE"] = 16] = "SIDE";
    Flags[Flags["DAM_MASK"] = 96] = "DAM_MASK";
    // Single-density.
    Flags[Flags["DAM_SD_FB"] = 0] = "DAM_SD_FB";
    Flags[Flags["DAM_SD_FA"] = 32] = "DAM_SD_FA";
    Flags[Flags["DAM_SD_F9"] = 64] = "DAM_SD_F9";
    Flags[Flags["DAM_SD_F8"] = 96] = "DAM_SD_F8";
    // Double-density.
    Flags[Flags["DAM_DD_FB"] = 0] = "DAM_DD_FB";
    Flags[Flags["DAM_DD_F8"] = 32] = "DAM_DD_F8";
    Flags[Flags["DOUBLE_DENSITY"] = 128] = "DOUBLE_DENSITY";
})(Flags || (Flags = {}));
const FREE = 0xFF;
const SIZE_CODE_MASK = 0x03;
class SectorInfo {
    constructor(track, sector, flags, offset) {
        // Make both FREE to avoid confusion.
        if (track === FREE || sector === FREE) {
            track = FREE;
            sector = FREE;
        }
        this.track = track;
        this.sector = sector;
        this.flags = flags;
        this.offset = offset;
        // In used sectors: 0=256,1=128,2=1024,3=512
        // In free sectors: 0=512,1=1024,2=128,3=256
        const sizeCode = (flags & SIZE_CODE_MASK) ^ (this.isFree() ? 0x02 : 0x01);
        this.size = 128 << sizeCode;
    }
    getSide() {
        return (this.flags & Flags.SIDE) === 0 ? FloppyDisk_1.Side.FRONT : FloppyDisk_1.Side.BACK;
    }
    /**
     * Return the flags as a string, for debugging.
     */
    flagsToString() {
        const parts = [];
        parts.push(this.size + " bytes");
        if ((this.flags & Flags.NON_IBM) !== 0) {
            parts.push("non-IBM");
        }
        if ((this.flags & Flags.BAD_CRC) !== 0) {
            parts.push("bad CRC");
        }
        parts.push("side " + ((this.flags & Flags.SIDE) === 0 ? 0 : 1));
        if ((this.flags & Flags.DOUBLE_DENSITY) !== 0) {
            parts.push("double density");
        }
        else {
            parts.push("single density");
        }
        return parts.join(", ");
    }
    /**
     * Whether the sector entry is free (doesn't represent real space in the file).
     */
    isFree() {
        return this.track === FREE;
    }
    /**
     * Whether the sector is encoded with MFM (instead of FM).
     */
    isDoubleDensity() {
        return (this.flags & Flags.DOUBLE_DENSITY) !== 0;
    }
    /**
     * Whether the sector's data is invalid.
     *
     * Normally FB is normal and F8 is deleted, but the single-density version has
     * two other values (F9 and FA), which we also consider deleted, to match xtrs.
     */
    isDeleted() {
        const dam = this.flags & Flags.DAM_MASK;
        if (this.isDoubleDensity()) {
            return dam === Flags.DAM_DD_F8;
        }
        else {
            return dam !== Flags.DAM_SD_FB;
        }
    }
    /**
     * Whether the floppy had a bar CRC when reading it.
     */
    hasCrcError() {
        return (this.flags & Flags.BAD_CRC) !== 0;
    }
}
/**
 * Floppy disk in the JV3 format.
 */
class Jv3FloppyDisk extends FloppyDisk_1.FloppyDisk {
    constructor(binary, error, annotations, sectorInfos, writeProtected) {
        super(binary, error, annotations, true);
        this.sectorInfos = sectorInfos;
        this.writeProtected = writeProtected;
    }
    getDescription() {
        return "Floppy disk (JV3)";
    }
    readSector(trackNumber, side, sectorNumber) {
        const sectorInfo = this.findSectorInfo(trackNumber, side, sectorNumber);
        if (sectorInfo === undefined) {
            return undefined;
        }
        const data = this.padSector(this.binary.subarray(sectorInfo.offset, sectorInfo.offset + sectorInfo.size), sectorInfo.size);
        const sectorData = new FloppyDisk_1.SectorData(data);
        sectorData.deleted = sectorInfo.isDeleted();
        sectorData.crcError = sectorInfo.hasCrcError();
        return sectorData;
    }
    /**
     * Find the sector for the specified track and side.
     */
    findSectorInfo(track, side, sector) {
        for (const sectorInfo of this.sectorInfos) {
            if (!sectorInfo.isFree() &&
                sectorInfo.track === track &&
                sectorInfo.getSide() === side &&
                (sector === undefined || sectorInfo.sector === sector)) {
                return sectorInfo;
            }
        }
        return undefined;
    }
}
exports.Jv3FloppyDisk = Jv3FloppyDisk;
/**
 * Decode a JV3 floppy disk file.
 */
function decodeJv3FloppyDisk(binary) {
    let error;
    const annotations = [];
    const sectorInfos = [];
    // Read the directory.
    let sectorOffset = HEADER_SIZE;
    for (let i = 0; i < RECORD_COUNT; i++) {
        const offset = i * 3;
        if (offset + 2 >= binary.length) {
            error = "Directory truncated at entry " + i;
            break;
        }
        const track = binary[offset];
        const sector = binary[offset + 1];
        const flags = binary[offset + 2];
        const sectorInfo = new SectorInfo(track, sector, flags, sectorOffset);
        sectorOffset += sectorInfo.size;
        if (!sectorInfo.isFree()) {
            if (sectorOffset > binary.length) {
                error = `Sector truncated at entry ${i} (${sectorOffset} > ${binary.length})`;
                break;
            }
            annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Track " + sectorInfo.track + ", sector " +
                sectorInfo.sector + ", " + sectorInfo.flagsToString(), offset, offset + 3));
            sectorInfos.push(sectorInfo);
        }
    }
    // Annotate the sectors themselves.
    for (const sectorInfo of sectorInfos) {
        annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Track " + sectorInfo.track + ", sector " + sectorInfo.sector, sectorInfo.offset, sectorInfo.offset + sectorInfo.size));
    }
    const writableOffset = RECORD_COUNT * 3;
    const writable = binary[writableOffset];
    if (writable !== 0 && writable !== 0xFF) {
        error = "Invalid \"writable\" byte: 0x" + z80_base_1.toHexByte(writable);
    }
    const writeProtected = writable === 0;
    annotations.push(new ProgramAnnotation_1.ProgramAnnotation(writeProtected ? "Write protected" : "Writable", writableOffset, writableOffset + 1));
    return new Jv3FloppyDisk(binary, error, annotations, sectorInfos, writeProtected);
}
exports.decodeJv3FloppyDisk = decodeJv3FloppyDisk;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Handles DMK floppy disk images.
 *
 * https://retrocomputing.stackexchange.com/questions/15282/understanding-the-dmk-disk-image-file-format-used-by-trs-80-emulators
 * http://www.classiccmp.org/cpmarchives/trs80/mirrors/trs-80.com/early/www.trs-80.com/trs80-dm.htm
 * http://www.classiccmp.org/cpmarchives/trs80/mirrors/www.discover-net.net/~dmkeil/trs80/trstech.htm
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeDmkFloppyDisk = exports.DmkFloppyDisk = void 0;
const z80_base_1 = __webpack_require__(4);
const z80_base_2 = __webpack_require__(4);
const Crc16_1 = __webpack_require__(44);
const FloppyDisk_1 = __webpack_require__(5);
const ProgramAnnotation_1 = __webpack_require__(1);
const FILE_HEADER_SIZE = 16;
const TRACK_HEADER_SIZE = 128;
/**
 * Represents a single sector on a DMK floppy.
 */
class DmkSector {
    constructor(track, doubleDensity, offset) {
        this.track = track;
        this.doubleDensity = doubleDensity;
        this.offset = offset;
        this.dataIndex = this.findDataIndex();
    }
    /**
     * Get the cylinder for this sector. This is 0-based.
     */
    getCylinder() {
        return this.getByte(1);
    }
    /**
     * Get the side for this sector.
     */
    getSide() {
        return FloppyDisk_1.numberToSide(this.getByte(2));
    }
    /**
     * Get the sector number for this sector. This is 1-based.
     */
    getSectorNumber() {
        return this.getByte(3);
    }
    /**
     * Get the sector length in bytes.
     */
    getLength() {
        return 128 * (1 << this.getByte(4));
    }
    /**
     * Get the CRC for the IDAM.
     */
    getIdamCrc() {
        // Bit endian.
        return (this.getByte(5) << 8) + this.getByte(6);
    }
    /**
     * Compute the CRC for the IDAM.
     */
    computeIdemCrc() {
        let crc = 0xFFFF;
        for (let i = -3; i < 5; i++) {
            crc = Crc16_1.CRC_16_CCITT.update(crc, this.getByte(i));
        }
        return crc;
    }
    /**
     * Get the CRC for the data bytes.
     */
    getDataCrc() {
        // Bit endian.
        const index = this.dataIndex + this.getLength();
        return (this.getByte(index) << 8) + this.getByte(index + 1);
    }
    /**
     * Compute the CRC for the data bytes.
     */
    computeDataCrc() {
        let crc = 0xFFFF;
        const index = this.dataIndex;
        const begin = index - 4;
        const end = index + this.getLength();
        for (let i = begin; i < end; i++) {
            crc = Crc16_1.CRC_16_CCITT.update(crc, this.getByte(i));
        }
        return crc;
    }
    /**
     * Whether the sector data should be considered invalid.
     */
    isDeleted() {
        const dam = this.getByte(this.dataIndex - 1);
        if (dam !== 0xF8 && dam !== 0xFB) {
            console.error("Unknown DAM: " + z80_base_2.toHexByte(dam));
        }
        // Normally, 0xFB, but 0xF8 if sector is considered deleted.
        return dam === 0xF8;
    }
    /**
     * Get a byte from the sector data.
     *
     * @param index index into the sector, relative to the 0xFE byte. Can be negative.
     */
    getByte(index) {
        return this.track.floppyDisk.binary[this.track.offset + this.offset + index];
    }
    /**
     * Look for the byte that indicates the start of data (0xFB or 0xF8). Various
     * floppy disk documentation specify an exact number here, but I've seen a variety
     * of values, so just search.
     */
    findDataIndex() {
        for (let i = 7; i < 55; i++) {
            const byte = this.track.floppyDisk.binary[this.track.offset + this.offset + i];
            if (byte === 0xFB || byte === 0xF8) {
                // Maybe also check that the previous three bytes are 0xA1.
                return i + 1;
            }
        }
        // Not sure what to do here. trs80gp says that this is valid.
        throw new Error(`Can't find byte at start of DAM (track ${this.track.trackNumber}, offset 0x${z80_base_1.toHexWord(this.offset)})`);
    }
}
/**
 * Represents a single track on a DMK floppy.
 */
class DmkTrack {
    constructor(floppyDisk, trackNumber, side, offset) {
        /**
         * Sectors in this track.
         */
        this.sectors = [];
        this.floppyDisk = floppyDisk;
        this.trackNumber = trackNumber;
        this.side = side;
        this.offset = offset;
    }
}
/**
 * Handles the DMK floppy disk file format, developed by David M. Keil.
 *
 * http://www.classiccmp.org/cpmarchives/trs80/mirrors/trs-80.com/early/www.trs-80.com/trs80-dm.htm
 * http://www.classiccmp.org/cpmarchives/trs80/mirrors/www.discover-net.net/~dmkeil/trs80/trstech.htm
 */
class DmkFloppyDisk extends FloppyDisk_1.FloppyDisk {
    constructor(binary, error, annotations, supportsDoubleDensity, writeProtected, trackCount, trackLength, flags) {
        super(binary, error, annotations, supportsDoubleDensity);
        this.tracks = [];
        this.writeProtected = writeProtected;
        this.trackCount = trackCount;
        this.trackLength = trackLength;
        this.flags = flags;
    }
    getDescription() {
        return "Floppy disk (DMK)";
    }
    readSector(trackNumber, side, sectorNumber) {
        // console.log(`readSector(${trackNumber}, ${sectorNumber}, ${side})`);
        for (const track of this.tracks) {
            if (track.trackNumber === trackNumber) { // TODO not checking side.
                for (const sector of track.sectors) {
                    if (sectorNumber === undefined || (sector.getSectorNumber() === sectorNumber &&
                        sector.getSide() === side)) {
                        const begin = track.offset + sector.offset + sector.dataIndex;
                        const end = begin + sector.getLength();
                        const sectorData = new FloppyDisk_1.SectorData(this.binary.subarray(begin, end));
                        sectorData.crcError = sector.getDataCrc() !== sector.computeDataCrc();
                        sectorData.deleted = sector.isDeleted();
                        // console.log(sectorData);
                        return sectorData;
                    }
                }
            }
        }
        return undefined;
    }
}
exports.DmkFloppyDisk = DmkFloppyDisk;
/**
 * Decode a DMK floppy disk file.
 */
function decodeDmkFloppyDisk(binary) {
    const error = undefined;
    const annotations = [];
    if (binary.length < FILE_HEADER_SIZE) {
        return undefined;
    }
    // Decode the header. Comments marked [DMK] are from David Keil's original documentation.
    // [DMK] If this byte is set to FFH the disk is `write protected', 00H allows writing.
    const writeProtected = binary[0] === 0xFF;
    if (binary[0] !== 0x00 && binary[0] !== 0xFF) {
        return undefined;
    }
    annotations.push(new ProgramAnnotation_1.ProgramAnnotation(writeProtected ? "Write protected" : "Writable", 0, 1));
    // [DMK] Number of tracks on virtual disk. Since tracks start at 0 this value will be one greater
    // than the highest track written to the disk. So a disk with 40 tracks will have a value
    // of 40 (28H) in this field after formatting while the highest track written would be 39.
    // This field is updated after a track is formatted if the track formatted is greater than
    // or equal to the current number of tracks. Re-formatting a disk with fewer tracks will
    // NOT reduce the number of tracks on the virtual disk. Once a virtual disk has allocated
    // space for a track it will NEVER release it. Formatting a virtual disk with 80 tracks
    // then re-formatting it with 40 tracks would waste space just like formatting only 40
    // tracks on an 80 track drive. The emulator and TRS-80 operating system don't care.
    // To re-format a virtual disk with fewer tracks use the /I option at start-up to
    // delete and re-create the virtual disk first, then re-format to save space.
    //
    // [DMK] Note: This field should NEVER be modified. Changing this number will cause TRS-80
    // operating system disk errors. (Like reading an 80 track disk in a 40 track drive)
    const trackCount = binary[1];
    if (trackCount > 160) {
        // Not sure what a reasonable maximum is. I've only see 80.
        return undefined;
    }
    annotations.push(new ProgramAnnotation_1.ProgramAnnotation(trackCount + " tracks", 1, 2));
    // [DMK] This is the track length for the virtual disk. By default the value is 1900H, 80H bytes
    // more than the actual track length, this gives a track length of 6272 bytes. A real double
    // density track length is approx. 6250 bytes. This is the default value when a virtual disk is created.
    // Values for other disk and format types are 0CC0H for single density 5.25" floppies,
    // 14E0H for single density 8" floppies and 2940H for double density 8" floppies. The max value is 2940H.
    // For normal formatting of disks the values of 1900H and 2940H for 5.25" and 8" are used.
    // The emulator will write two bytes and read every second byte when  in single density to maintain
    // proper sector spacing, allowing mixed density disks. Setting the track length must be done before
    // a virtual disk is formatted or the disk will have to be re-formatted and since the space for the
    // disk has already been allocated no space will be saved.
    //
    // [DMK] WARNING: Bytes are entered in reverse order (ex. 2940H would be entered, byte 2=40, byte 3=29).
    //
    // [DMK] Note: No modification of the track length is necessary, doing so only saves space and is not
    // necessary to normal operation. The values for all normal 5.25" and 8" disks are set when the
    // virtual disk is created. DON'T modify the track length unless you understand these instructions completely.
    // Nothing in the PC world can be messed up by improper modification but any other virtual disk mounted
    // in the emulator with an improperly modified disk could have their data scrambled.
    const trackLength = binary[2] + (binary[3] << 8);
    if (trackLength > 0x2940) {
        return undefined;
    }
    annotations.push(new ProgramAnnotation_1.ProgramAnnotation(trackLength + " bytes per track", 2, 4));
    // [DMK] Virtual disk option flags.
    //
    // [DMK] Bit 4 of this byte, if set, means this is a single sided ONLY disk. This bit is set if the
    // user selects single sided during disk creation and should not require modification. This flag is
    // used only to save PC hard disk space and is never required.
    //
    // [DMK] Bit 6 of this byte, if set, means this disk is to be single density size and the emulator
    // will access one byte instead of two when doing I/O in single density. Double density can still
    // be written to a single density disk but with half the track length only 10 256 byte sectors can be
    // written in either density. Mixed density is also possible but sector timing may be off so protected
    // disks may not work, a maximum of 10 256 byte sectors of mixed density can be written to a
    // single density disk. A program like "Spook House" which has a mixed density track 0 with 1 SD sector
    // and 1 DD sector and the rest of the disk consisting of 10 SD sectors/track will work with this flag set
    // and save half the PC hard disk space. The protected disk "Super Utility + 3.0" however has 6 SD and 6 DD
    // sectors/track for a total of 12 256 byte sectors/track. This disk cannot be single density.
    // This bit is set if the user selects single density during disk creation and should
    // not require modification. This flag is used only to save PC hard disk space and is never required.
    //
    // [DMK] Bit 7 of this byte, if set, means density is to be ignored when accessing this disk. The disk MUST
    // be formatted in double density but the emulator will then read and write the sectors in either density.
    // The emulator will access one byte instead of two when doing I/O in single density.
    // This flag was an early way to support mixed density disks it is no longer needed for this purpose.
    // It is now used for compatibility with old virtual disks created without the double byte now used when in
    // single density. This bit can be set manually in a hex editor to access old virtual disks written
    // in single density.
    const flags = binary[4];
    const flagParts = [];
    const singleSided = (flags & 0x10) !== 0;
    if (singleSided) {
        flagParts.push("SS");
    }
    if ((flags & 0x40) !== 0) {
        flagParts.push("SD");
    }
    if ((flags & 0x80) !== 0) {
        flagParts.push("ignore density");
    }
    annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Flags: [" + flagParts.join(",") + "]", 4, 5));
    // Sanity check.
    const sideCount = singleSided ? 1 : 2;
    const expectedLength = FILE_HEADER_SIZE + sideCount * trackCount * trackLength;
    if (binary.length !== expectedLength) {
        console.error(`DMK file wrong size (${binary.length} != ${expectedLength})`);
        return undefined;
    }
    // Check that these are zero.
    for (let i = 5; i < 12; i++) {
        if (binary[i] !== 0x00) {
            console.error("DMK: Reserved byte " + i + " is not zero: 0x" + z80_base_2.toHexByte(binary[i]));
            return undefined;
        }
    }
    annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Reserved", 5, 12));
    // [DMK] Must be zero if virtual disk is in emulator's native format.
    //
    // [DMK] Must be 12345678h if virtual disk is a REAL disk specification file used to access
    // REAL TRS-80 floppies in compatible PC drives.
    if (binary[12] + binary[13] + binary[14] + binary[15] !== 0x00) {
        return undefined;
    }
    annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Virtual disk", 12, 16));
    const floppyDisk = new DmkFloppyDisk(binary, error, annotations, true, writeProtected, trackCount, trackLength, flags);
    // Read the tracks.
    let binaryOffset = FILE_HEADER_SIZE;
    for (let trackNumber = 0; trackNumber < trackCount; trackNumber++) {
        for (let side = 0; side < sideCount; side++) {
            const trackOffset = binaryOffset;
            const track = new DmkTrack(floppyDisk, trackNumber, FloppyDisk_1.numberToSide(side), trackOffset);
            // Read the track header. The term "IDAM" in the comment below refers to the "ID access mark",
            // where "ID" is referring to the sector ID, the few byte just before the sector data.
            // [DMK] Each side of each track has a 128 (80H) byte header which contains an offset pointer
            // to each IDAM in the track. This allows a maximum of 64 sector IDAMs/track. This is more than
            // twice what an 8 inch disk would require and 3.5 times that of a normal TRS-80 5 inch DD disk.
            // This should more than enough for any protected disk also.
            //
            // [DMK] These IDAM pointers MUST adhere to the following rules:
            //
            // * Each pointer is a 2 byte offset to the FEh byte of the IDAM. In double byte single density
            //   the pointer is to the first FEh.
            // * The offset includes the 128 byte header. For example, an IDAM 10h bytes into the track would
            //   have a pointer of 90h, 10h+80h=90h.
            // * The IDAM offsets MUST be in ascending order with no unused or bad pointers.
            // * If all the entries are not used the header is terminated with a 0000h entry. Unused entries
            //   must also be zero filled..
            // * Any IDAMs overwritten during a sector write command should have their entry removed from the
            //   header and all other pointer entries shifted to fill in.
            // * The IDAM pointers are created during the track write command (format). A completed track write
            //   MUST remove all previous IDAM pointers. A partial track write (aborted with the forced interrupt
            //   command) MUST have it's previous pointers that were not overwritten added to the new IDAM pointers.
            // * The pointer bytes are stored in reverse order (LSB/MSB).
            //
            // [DMK] Each IDAM pointer has two flags. Bit 15 is set if the sector is double density. Bit 14 is
            // currently undefined. These bits must be masked to get the actual sector offset. For example,
            // an offset to an IDAM at byte 90h would be 0090h if single density and 8090h if double density.
            for (let i = 0; i < TRACK_HEADER_SIZE; i += 2) {
                const sectorOffset = binary[binaryOffset + i] + (binary[binaryOffset + i + 1] << 8);
                if (sectorOffset !== 0) {
                    track.sectors.push(new DmkSector(track, (sectorOffset & 0x8000) !== 0, sectorOffset & 0x3FFF));
                }
            }
            annotations.push(new ProgramAnnotation_1.ProgramAnnotation(`Track ${trackNumber} header`, binaryOffset, binaryOffset + TRACK_HEADER_SIZE));
            for (const sector of track.sectors) {
                let i = trackOffset + sector.offset;
                annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Sector ID access mark", i, i + 1));
                i++;
                annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Cylinder " + sector.getCylinder(), i, i + 1));
                i++;
                annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Side " + sector.getSide(), i, i + 1));
                i++;
                annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Sector " + sector.getSectorNumber(), i, i + 1));
                i++;
                const sectorLength = sector.getLength();
                annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Length " + sectorLength, i, i + 1));
                i++;
                const actualIdamCrc = sector.computeIdemCrc();
                const expectedIdamCrc = sector.getIdamCrc();
                let idamCrcLabel = "IDAM CRC";
                if (actualIdamCrc === expectedIdamCrc) {
                    idamCrcLabel += " (valid)";
                }
                else {
                    idamCrcLabel += ` (got 0x${z80_base_1.toHexWord(actualIdamCrc)}, expected 0x${z80_base_1.toHexWord(expectedIdamCrc)})`;
                }
                annotations.push(new ProgramAnnotation_1.ProgramAnnotation(idamCrcLabel, i, i + 2));
                i += 2;
                i = trackOffset + sector.offset + sector.dataIndex;
                annotations.push(new ProgramAnnotation_1.ProgramAnnotation("Sector data", i, i + sectorLength));
                i += sectorLength;
                const actualDataCrc = sector.computeDataCrc();
                const expectedDataCrc = sector.getDataCrc();
                let dataCrcLabel = "Data CRC";
                if (actualDataCrc === expectedDataCrc) {
                    dataCrcLabel += " (valid)";
                }
                else {
                    dataCrcLabel += ` (got 0x${z80_base_1.toHexWord(actualDataCrc)}, expected 0x${z80_base_1.toHexWord(expectedDataCrc)})`;
                }
                annotations.push(new ProgramAnnotation_1.ProgramAnnotation(dataCrcLabel, i, i + 2));
                i += 2;
            }
            floppyDisk.tracks.push(track);
            binaryOffset += trackLength;
        }
    }
    return floppyDisk;
}
exports.decodeDmkFloppyDisk = decodeDmkFloppyDisk;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CRC_16_CCITT = exports.Crc16 = void 0;
/**
 * Performs CRC-16 operations treating bits as big-endian.
 *
 * https://en.wikipedia.org/wiki/Cyclic_redundancy_check
 * https://en.wikipedia.org/wiki/Computation_of_cyclic_redundancy_checks
 * https://en.wikipedia.org/wiki/Mathematics_of_cyclic_redundancy_checks
 */
class Crc16 {
    /**
     * Specifies the generator, which must be a 16-bit value.
     */
    constructor(generator) {
        this.generator = generator;
    }
    /**
     * Update the CRC with the new data, which must be a byte.
     *
     * @return the new CRC.
     */
    update(crc, data) {
        for (let shift = 8; shift < 16; shift++) {
            const isOne = ((crc ^ (data << shift)) & 0x8000) !== 0;
            crc <<= 1;
            if (isOne) {
                crc ^= this.generator;
            }
        }
        return crc & 0xFFFF;
    }
}
exports.Crc16 = Crc16;
/**
 * The CRC-16-CCITT polynomial, used for floppy disks. The polynomial is
 * x^16 + x^12 + x^5 + 1, which maps to 0x11021, but the leading 1 is
 * removed because it doesn't affect the outcome.
 */
exports.CRC_16_CCITT = new Crc16(0x1021);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Classes for handling TRSDOS diskettes.
 *
 * http://www.trs-80.com/wordpress/zaps-patches-pokes-tips/zaps-and-patches/#guidedtour
 * http://www.manmrk.net/tutorials/TRS80/Software/ldos/trs80/doc/prgguide.pdf
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeTrsdos = exports.Trsdos = exports.TrsdosDirEntry = exports.TrsdosHitInfo = exports.TrsdosGatInfo = exports.TrsdosExtent = exports.trsdosProtectionLevelToString = exports.TrsdosProtectionLevel = void 0;
const teamten_ts_utils_1 = __webpack_require__(7);
const FloppyDisk_1 = __webpack_require__(5);
// Number of bytes per dir entry in the sector.
const DIR_ENTRY_LENGTH = 48;
// Apparently this is constant in TRSDOS.
const BYTES_PER_SECTOR = 256;
// Apparently this is 3, but somewhere else I read 6.
const SECTORS_PER_GRANULE = 3;
// The number of sectors on each track, numbered 1 to 18.
const SECTORS_PER_TRACK = 18;
// Copyright in the last 16 bytes of each directory sector.
const EXPECTED_TANDY = "(c) 1980 Tandy";
// Password value that means "no password".
const NO_PASSWORD = 0xEF5C;
// Password value for "PASSWORD".
const PASSWORD = 0xD38F;
/**
 * Decodes binary into an ASCII string. Returns undefined if any non-ASCII value is
 * found in the string, where "ASCII" is defined as being in the range 32 to 126 inclusive.
 */
function decodeAscii(binary, trim = true) {
    const parts = [];
    for (const b of binary) {
        if (b < 32 || b >= 127) {
            return undefined;
        }
        parts.push(String.fromCodePoint(b));
    }
    let s = parts.join("");
    if (trim) {
        s = s.trim();
    }
    return s;
}
/**
 * Lowest three bits of the directory entry's flag.
 */
var TrsdosProtectionLevel;
(function (TrsdosProtectionLevel) {
    // Keep this values in this order, they match the bit values (0 to 7).
    TrsdosProtectionLevel[TrsdosProtectionLevel["FULL"] = 0] = "FULL";
    TrsdosProtectionLevel[TrsdosProtectionLevel["REMOVE"] = 1] = "REMOVE";
    TrsdosProtectionLevel[TrsdosProtectionLevel["RENAME"] = 2] = "RENAME";
    TrsdosProtectionLevel[TrsdosProtectionLevel["WRITE"] = 3] = "WRITE";
    TrsdosProtectionLevel[TrsdosProtectionLevel["UPDATE"] = 4] = "UPDATE";
    TrsdosProtectionLevel[TrsdosProtectionLevel["READ"] = 5] = "READ";
    TrsdosProtectionLevel[TrsdosProtectionLevel["EXEC"] = 6] = "EXEC";
    TrsdosProtectionLevel[TrsdosProtectionLevel["NO_ACCESS"] = 7] = "NO_ACCESS";
})(TrsdosProtectionLevel = exports.TrsdosProtectionLevel || (exports.TrsdosProtectionLevel = {}));
/**
 * Gets the string version of the protection level enum.
 * @param level
 */
function trsdosProtectionLevelToString(level) {
    switch (level) {
        case TrsdosProtectionLevel.FULL:
            return "FULL";
        case TrsdosProtectionLevel.REMOVE:
            return "REMOVE";
        case TrsdosProtectionLevel.RENAME:
            return "RENAME";
        case TrsdosProtectionLevel.WRITE:
            return "WRITE";
        case TrsdosProtectionLevel.UPDATE:
            return "UPDATE";
        case TrsdosProtectionLevel.READ:
            return "READ";
        case TrsdosProtectionLevel.EXEC:
            return "EXEC";
        case TrsdosProtectionLevel.NO_ACCESS:
            return "NO_ACCESS";
        default:
            return "UNKNOWN";
    }
}
exports.trsdosProtectionLevelToString = trsdosProtectionLevelToString;
/**
 * A contiguous number of sectors for storing part of a file.
 */
class TrsdosExtent {
    constructor(trackNumber, granuleOffset, granuleCount) {
        this.trackNumber = trackNumber;
        this.granuleOffset = granuleOffset;
        this.granuleCount = granuleCount;
    }
}
exports.TrsdosExtent = TrsdosExtent;
/**
 * Decode an array of extents.
 *
 * @param binary byte we'll be pulling the extents from.
 * @param begin index of first extent in binary.
 * @param end index past last extent in binary.
 * @param trackFirst whether the track comes first or second.
 */
function decodeExtents(binary, begin, end, trackFirst) {
    const extents = [];
    for (let i = begin; i < end; i += 2) {
        if (binary[i] === 0xFF && binary[i + 1] === 0xFF) {
            break;
        }
        const trackNumber = binary[trackFirst ? i : i + 1];
        const granuleByte = binary[trackFirst ? i + 1 : i];
        const granuleOffset = granuleByte >> 5;
        const granuleCount = granuleByte & 0x1F;
        if (trackNumber >= 40) {
            // Not a TRSDOS disk.
            return undefined;
        }
        extents.push(new TrsdosExtent(trackNumber, granuleOffset, granuleCount));
    }
    return extents;
}
/**
 * The Granule Allocation Table sector info.
 */
class TrsdosGatInfo {
    constructor(gat, password, name, date, autoCommand) {
        this.gat = gat;
        this.password = password;
        this.name = name;
        this.date = date;
        this.autoCommand = autoCommand;
    }
}
exports.TrsdosGatInfo = TrsdosGatInfo;
/**
 * Converts a sector to a GAT object, or undefined if we don't think this is a GAT sector.
 */
function decodeGatInfo(binary) {
    // One byte for each track.
    const gat = binary.subarray(0, 40);
    // Top two bits don't map to anything, so must be zero.
    for (const g of gat) {
        if ((g & 0xC0) !== 0) {
            return undefined;
        }
    }
    // Assume big endian.
    const password = (binary[0xCE] << 8) | binary[0xCF];
    const name = decodeAscii(binary.subarray(0xD0, 0xD8));
    const date = decodeAscii(binary.subarray(0xD8, 0xE0));
    const autoCommand = binary[0xE0] === 0x0D ? "" : decodeAscii(binary.subarray(0xE0));
    // Implies that this is not a TRSDOS disk.
    if (name === undefined || date === undefined || autoCommand === undefined) {
        return undefined;
    }
    return new TrsdosGatInfo(gat, password, name, date, autoCommand);
}
/**
 * The Hash Allocation Table sector info.
 */
class TrsdosHitInfo {
    constructor(hit, systemFiles) {
        this.hit = hit;
        this.systemFiles = systemFiles;
    }
}
exports.TrsdosHitInfo = TrsdosHitInfo;
/**
 * Decode the Hash Index Table sector, or undefined if we don't think this is a TRSDOS disk.
 */
function decodeHitInfo(binary) {
    // One byte for each file.
    const hit = binary.subarray(0, 80);
    const systemFiles = decodeExtents(binary, 0xE0, binary.length, false);
    if (systemFiles === undefined) {
        return undefined;
    }
    return new TrsdosHitInfo(hit, systemFiles);
}
/**
 * Single (valid) directory entry for a file.
 */
class TrsdosDirEntry {
    constructor(flags, month, year, lastSectorSize, lrl, filename, updatePassword, accessPassword, sectorCount, extents) {
        this.flags = flags;
        this.month = month;
        this.year = year;
        this.lastSectorSize = lastSectorSize;
        this.lrl = lrl;
        this.rawFilename = filename;
        this.updatePassword = updatePassword;
        this.accessPassword = accessPassword;
        this.sectorCount = sectorCount;
        this.extents = extents;
    }
    /**
     * Get the protection level for the file.
     */
    getProtectionLevel() {
        return (this.flags & 0x07);
    }
    /**
     * Whether the file is hidden in a directory listing.
     */
    isHidden() {
        return (this.flags & 0x08) !== 0;
    }
    /**
     * Whether the file has an entry in the HIT table. This bit is set to 0 when
     * deleting a file.
     */
    isActive() {
        return (this.flags & 0x10) !== 0;
    }
    /**
     * Whether there should be limitations to how many times you can copy this file.
     * Other docs (maybe for LDOS) say that this indicates "Partitioned Data Set".
     */
    hasBackupLimitation() {
        return (this.flags & 0x20) !== 0;
    }
    /**
     * Whether this is a system file (as opposed to user file).
     */
    isSystemFile() {
        return (this.flags & 0x40) !== 0;
    }
    /**
     * Whether this is an extended entry (as opposed to primary entry). Each entry can
     * only encode four extents, so subsequent extents are stored in extended entries.
     * TODO this says max four extents, but we have space for 13 extents in the binary.
     */
    isExtendedEntry() {
        return (this.flags & 0x80) !== 0;
    }
    getFlagsString() {
        const parts = [];
        parts.push(trsdosProtectionLevelToString(this.getProtectionLevel()));
        if (this.isHidden()) {
            parts.push("hidden");
        }
        if (!this.isActive()) {
            // Should never happen.
            parts.push("inactive");
        }
        if (this.hasBackupLimitation()) {
            parts.push("limits");
        }
        if (this.isSystemFile()) {
            parts.push("system");
        }
        if (this.isExtendedEntry()) {
            parts.push("extended");
        }
        return "[" + parts.join(",") + "]";
    }
    /**
     * Get the basename (part before the period) of the filename.
     */
    getBasename() {
        return this.rawFilename.substr(0, 8).trim();
    }
    /**
     * Get the extension of the filename.
     */
    getExtension() {
        return this.rawFilename.substr(8).trim();
    }
    /**
     * Get the full filename (without the internal spaces of the raw filename). If the
     * file has an extension, it will be preceded by the specified separator.
     */
    getFilename(extensionSeparator) {
        const extension = this.getExtension();
        return this.getBasename() + (extension === "" ? "" : extensionSeparator + extension);
    }
    /**
     * Return the size in bytes.
     */
    getSize() {
        return this.sectorCount * BYTES_PER_SECTOR + this.lastSectorSize;
    }
    /**
     * Return the date in MM/YY format.
     */
    getDateString() {
        return this.month.toString().padStart(2, "0") + "/" + this.year.toString().padStart(2, "0");
    }
    /**
     * Return the date as an object.
     */
    getDate() {
        return new Date(1900 + this.year, this.month - 1);
    }
}
exports.TrsdosDirEntry = TrsdosDirEntry;
/**
 * Decodes a directory entry from a 48-byte chunk, or undefined if the directory entry is empty.
 */
function decodeDirEntry(binary) {
    const flags = binary[0];
    // Check "active" bit. Setting this to zero is how files are deleted. Also check empty filename.
    if ((flags & 0x10) === 0 || binary[5] === 0) {
        return undefined;
    }
    const month = binary[1];
    const year = binary[2];
    const lastSectorSize = binary[3];
    const lrl = ((binary[4] - 1) & 0xFF) + 1; // 0 -> 256.
    const filename = decodeAscii(binary.subarray(5, 16));
    // Not sure how to convert these two into a number. Just use big endian.
    const updatePassword = (binary[16] << 8) | binary[17];
    const accessPassword = (binary[18] << 8) | binary[19];
    // Little endian.
    const sectorCount = (binary[21] << 8) | binary[20];
    const extents = decodeExtents(binary, 22, binary.length, true);
    if (filename === undefined || extents === undefined) {
        // This signals empty directory, but really should imply a non-TRSDOS disk.
        return undefined;
    }
    return new TrsdosDirEntry(flags, month, year, lastSectorSize, lrl, filename, updatePassword, accessPassword, sectorCount, extents);
}
/**
 * A decoded TRSDOS diskette.
 */
class Trsdos {
    constructor(disk, gatInfo, hitInfo, dirEntries) {
        this.disk = disk;
        this.gatInfo = gatInfo;
        this.hitInfo = hitInfo;
        this.dirEntries = dirEntries;
    }
    /**
     * Read the binary for a file on the diskette.
     */
    readFile(dirEntry) {
        const parts = [];
        let sectorCount = dirEntry.sectorCount + (dirEntry.lastSectorSize > 0 ? 1 : 0);
        for (const extent of dirEntry.extents) {
            let trackNumber = extent.trackNumber;
            let sectorNumber = extent.granuleOffset * SECTORS_PER_GRANULE + 1;
            for (let i = 0; i < extent.granuleCount * SECTORS_PER_GRANULE && sectorCount > 0; i++, sectorNumber++, sectorCount--) {
                if (sectorNumber > SECTORS_PER_TRACK) {
                    // Move to the next track.
                    sectorNumber -= SECTORS_PER_TRACK;
                    trackNumber += 1;
                }
                const sector = this.disk.readSector(trackNumber, FloppyDisk_1.Side.FRONT, sectorNumber);
                if (sector === undefined) {
                    console.log(`Sector couldn't be read ${trackNumber}, ${sectorNumber}`);
                    // TODO
                }
                else {
                    // TODO check deleted?
                    if (sector.crcError) {
                        console.log("Sector has CRC error");
                    }
                    if (sector.deleted) {
                        // console.log("Sector " + sectorNumber + " is deleted");
                    }
                    parts.push(sector.data);
                }
            }
        }
        // Clip last sector.
        if (parts.length > 0 && dirEntry.lastSectorSize > 0) {
            parts[parts.length - 1] = parts[parts.length - 1].subarray(0, dirEntry.lastSectorSize);
        }
        return teamten_ts_utils_1.concatByteArrays(parts);
    }
}
exports.Trsdos = Trsdos;
/**
 * Decode a TRSDOS diskette, or return undefined if this does not look like such a diskette.
 */
function decodeTrsdos(disk) {
    // Decode Granule Allocation Table sector.
    const gatSector = disk.readSector(17, FloppyDisk_1.Side.FRONT, 1);
    if (gatSector === undefined || gatSector.deleted) {
        return undefined;
    }
    const gatInfo = decodeGatInfo(gatSector.data);
    if (gatInfo === undefined) {
        return undefined;
    }
    // Decode Hash Index Table sector.
    const hitSector = disk.readSector(17, FloppyDisk_1.Side.FRONT, 2);
    if (hitSector === undefined || hitSector.deleted) {
        return undefined;
    }
    const hitInfo = decodeHitInfo(hitSector.data);
    if (hitInfo === undefined) {
        return undefined;
    }
    // Decode directory entries.
    const dirEntries = [];
    for (let k = 0; k < 16; k++) {
        const dirSector = disk.readSector(17, FloppyDisk_1.Side.FRONT, k + 3);
        if (dirSector !== undefined) {
            const tandy = decodeAscii(dirSector.data.subarray(5 * DIR_ENTRY_LENGTH));
            if (tandy !== EXPECTED_TANDY) {
                console.error(`Expected "${EXPECTED_TANDY}", got "${tandy}"`);
                return undefined;
            }
            for (let j = 0; j < 5; j++) {
                const dirEntry = decodeDirEntry(dirSector.data.subarray(j * DIR_ENTRY_LENGTH, (j + 1) * DIR_ENTRY_LENGTH));
                if (dirEntry !== undefined) {
                    dirEntries.push(dirEntry);
                }
            }
        }
    }
    return new Trsdos(disk, gatInfo, hitInfo, dirEntries);
}
exports.decodeTrsdos = decodeTrsdos;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TRS80_SCREEN_END = exports.TRS80_SCREEN_BEGIN = void 0;
// RAM address range of screen.
exports.TRS80_SCREEN_BEGIN = 15 * 1024;
exports.TRS80_SCREEN_END = 16 * 1024;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * These fonts are from the xtrs emulator, and the CG# references match those.
 * They're identical to the fonts in the sdltrs emulator. They don't include
 * the 2x3 graphical characters; we generate those procedurally.
 *
 * See the original trs_chars.c file for Tim Mann's explanations and historical
 * notes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODEL3_ALT_FONT = exports.MODEL3_FONT = exports.MODEL1B_FONT = exports.MODEL1A_FONT = exports.Font = void 0;
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
        // Cache from glyph key (see makeImage()) to the canvas element for it.
        this.glyphCache = new Map();
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
        const key = {
            char: char,
            expanded: expanded,
            options: options,
        };
        const stringKey = JSON.stringify(key);
        // Cache the glyph since we create a set of these for each created canvas.
        let glyph = this.glyphCache.get(stringKey);
        if (glyph === undefined) {
            glyph = this.makeImageInternal(char, expanded, options);
            this.glyphCache.set(stringKey, glyph);
        }
        return glyph;
    }
    /**
     * Actually creates the glyph.
     */
    makeImageInternal(char, expanded, options) {
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
exports.Font = Font;
// Original Model I.
exports.MODEL1A_FONT = new Font(GLYPH_CG1, 6, 12, [0, 64, -1, -1]);
// Model I with lower case mod.
exports.MODEL1B_FONT = new Font(GLYPH_CG2, 6, 12, [0, 64, -1, -1]);
// Original Model III, with special symbols.
exports.MODEL3_FONT = new Font(GLYPH_CG4, 8, 12, [0, 64, -1, 128]);
// Original Model III, with Katakana.
exports.MODEL3_ALT_FONT = new Font(GLYPH_CG4, 8, 12, [0, 64, -1, 192]);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * List of all word registers.
 */
const WORD_REG = new Set(["af", "bc", "de", "hl", "af'", "bc'", "de'", "hl'", "ix", "iy", "sp", "pc"]);
/**
 * List of all byte registers.
 */
const BYTE_REG = new Set(["a", "f", "b", "c", "d", "e", "h", "l", "ixh", "ixl", "iyh", "iyl", "i", "r"]);
/**
 * Determine whether a register stores a word.
 */
function isWordReg(s) {
    return WORD_REG.has(s.toLowerCase());
}
exports.isWordReg = isWordReg;
/**
 * Determine whether a register stores a byte.
 */
function isByteReg(s) {
    return BYTE_REG.has(s.toLowerCase());
}
exports.isByteReg = isByteReg;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __webpack_require__(23);
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
        return Utils_1.hi(this.af);
    }
    set a(value) {
        this.af = Utils_1.word(value, this.f);
    }
    get f() {
        return Utils_1.lo(this.af);
    }
    set f(value) {
        this.af = Utils_1.word(this.a, value);
    }
    get b() {
        return Utils_1.hi(this.bc);
    }
    set b(value) {
        this.bc = Utils_1.word(value, this.c);
    }
    get c() {
        return Utils_1.lo(this.bc);
    }
    set c(value) {
        this.bc = Utils_1.word(this.b, value);
    }
    get d() {
        return Utils_1.hi(this.de);
    }
    set d(value) {
        this.de = Utils_1.word(value, this.e);
    }
    get e() {
        return Utils_1.lo(this.de);
    }
    set e(value) {
        this.de = Utils_1.word(this.d, value);
    }
    get h() {
        return Utils_1.hi(this.hl);
    }
    set h(value) {
        this.hl = Utils_1.word(value, this.l);
    }
    get l() {
        return Utils_1.lo(this.hl);
    }
    set l(value) {
        this.hl = Utils_1.word(this.h, value);
    }
    get ixh() {
        return Utils_1.hi(this.ix);
    }
    set ixh(value) {
        this.ix = Utils_1.word(value, this.ixl);
    }
    get ixl() {
        return Utils_1.lo(this.ix);
    }
    set ixl(value) {
        this.ix = Utils_1.word(this.ixh, value);
    }
    get iyh() {
        return Utils_1.hi(this.iy);
    }
    set iyh(value) {
        this.iy = Utils_1.word(value, this.iyl);
    }
    get iyl() {
        return Utils_1.lo(this.iy);
    }
    set iyl(value) {
        this.iy = Utils_1.word(this.iyh, value);
    }
    /**
     * Combine the two R parts together.
     */
    get rCombined() {
        return (this.r7 & 0x80) | (this.r & 0xF7);
    }
}
exports.RegisterSet = RegisterSet;
/**
 * All real fields of RegisterSet, for enumeration.
 */
exports.registerSetFields = [
    "af", "bc", "de", "hl",
    "afPrime", "bcPrime", "dePrime", "hlPrime",
    "ix", "iy", "sp", "pc",
    "memptr", "i", "r", "iff1", "iff2", "im", "halted"
];


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
})(Flag = exports.Flag || (exports.Flag = {}));


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Trs80 = void 0;
const z80_base_1 = __webpack_require__(6);
const z80_emulator_1 = __webpack_require__(52);
const Keyboard_1 = __webpack_require__(55);
const Model1Level1Rom_1 = __webpack_require__(56);
const Model1Level2Rom_1 = __webpack_require__(57);
const Model3Rom_1 = __webpack_require__(58);
const Config_1 = __webpack_require__(10);
const trs80_base_1 = __webpack_require__(3);
const z80_base_2 = __webpack_require__(6);
const FloppyDisk_1 = __webpack_require__(5);
const FloppyDiskController_1 = __webpack_require__(59);
const EventScheduler_1 = __webpack_require__(32);
// IRQs
const M1_TIMER_IRQ_MASK = 0x80;
const M3_CASSETTE_RISE_IRQ_MASK = 0x01;
const M3_CASSETTE_FALL_IRQ_MASK = 0x02;
const M3_TIMER_IRQ_MASK = 0x04;
const M3_IO_BUS_IRQ_MASK = 0x08;
const M3_UART_SED_IRQ_MASK = 0x10;
const M3_UART_RECEIVE_IRQ_MASK = 0x20;
const M3_UART_ERROR_IRQ_MASK = 0x40;
const CASSETTE_IRQ_MASKS = M3_CASSETTE_RISE_IRQ_MASK | M3_CASSETTE_FALL_IRQ_MASK;
// NMIs
const RESET_NMI_MASK = 0x20;
const DISK_MOTOR_OFF_NMI_MASK = 0x40;
const DISK_INTRQ_NMI_MASK = 0x80;
// Timer.
const M1_TIMER_HZ = 40;
const M3_TIMER_HZ = 30;
const M4_TIMER_HZ = 60;
const ROM_SIZE = 14 * 1024;
const RAM_START = 16 * 1024;
// CPU clock speeds.
const M1_CLOCK_HZ = 1774080;
const M3_CLOCK_HZ = 2027520;
const M4_CLOCK_HZ = 4055040;
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
    return address >= trs80_base_1.TRS80_SCREEN_BEGIN && address < trs80_base_1.TRS80_SCREEN_END;
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
const WARN_ONCE_SET = new Set();
/**
 * Send this warning message to the console once. This is to avoid a program repeatedly doing something
 * that results in a warning (such as reading from an unmapped memory address) and crashing the browser.
 */
function warnOnce(message) {
    if (!WARN_ONCE_SET.has(message)) {
        WARN_ONCE_SET.add(message);
        console.warn(message + " (further warnings suppressed)");
    }
}
/**
 * HAL for the TRS-80 Model III.
 */
class Trs80 {
    constructor(screen, cassette) {
        this.timerHz = M3_TIMER_HZ;
        this.clockHz = M3_CLOCK_HZ;
        this.tStateCount = 0;
        this.fdc = new FloppyDiskController_1.FloppyDiskController(this);
        this.memory = new Uint8Array(0);
        this.keyboard = new Keyboard_1.Keyboard();
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
        this.z80 = new z80_emulator_1.Z80(this);
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
        this.eventScheduler = new EventScheduler_1.EventScheduler();
        this.screen = screen;
        this.cassette = cassette;
        this.config = Config_1.Config.makeDefault();
        this.updateFromConfig();
        this.loadRom();
        this.tStateCount = 0;
        this.keyboard.configureKeyboard();
        this.fdc.onMotorOn.subscribe(drive => console.log("Drive " + drive));
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
            case Config_1.ModelType.MODEL1:
                this.timerHz = M1_TIMER_HZ;
                this.clockHz = M1_CLOCK_HZ;
                break;
            case Config_1.ModelType.MODEL3:
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
            case Config_1.ModelType.MODEL1:
                switch (this.config.basicLevel) {
                    case Config_1.BasicLevel.LEVEL1:
                        rom = Model1Level1Rom_1.model1Level1Rom;
                        break;
                    case Config_1.BasicLevel.LEVEL2:
                    default:
                        rom = Model1Level2Rom_1.model1Level2Rom;
                        break;
                }
                break;
            case Config_1.ModelType.MODEL3:
            default:
                rom = Model3Rom_1.model3Rom;
                break;
        }
        const raw = window.atob(rom);
        for (let i = 0; i < raw.length; i++) {
            this.memory[i] = raw.charCodeAt(i);
        }
    }
    /**
     * Reset the state of the Z80 and hardware.
     */
    reset() {
        this.setIrqMask(0);
        this.setNmiMask(0);
        this.resetCassette();
        this.keyboard.clearKeyboard();
        this.setTimerInterrupt(false);
        this.z80.reset();
    }
    /**
     * Jump the Z80 emulator to the specified address.
     */
    jumpTo(address) {
        this.z80.regs.pc = address;
    }
    /**
     * Set the stack pointer to the specified address.
     */
    setStackPointer(address) {
        this.z80.regs.sp = address;
    }
    /**
     * Start the executable at the given address. This sets up some
     * state and jumps to the address.
     */
    startExecutable(address) {
        // Disable the cursor.
        this.writeMemory(0x4022, 0);
        // Disable interrupts.
        this.z80.regs.iff1 = 0;
        this.z80.regs.iff2 = 0;
        this.jumpTo(address);
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
     *
     * @return whether it was started.
     */
    stop() {
        if (this.started) {
            this.keyboard.interceptKeys = false;
            this.cancelTickTimeout();
            this.started = false;
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Set the mask for IRQ (regular) interrupts.
     */
    setIrqMask(irqMask) {
        this.irqMask = irqMask;
    }
    /**
     * Set the mask for non-maskable interrupts. (Yes.)
     */
    setNmiMask(nmiMask) {
        // Reset is always allowed:
        this.nmiMask = nmiMask | RESET_NMI_MASK;
        this.updateNmiSeen();
    }
    interruptLatchRead() {
        if (this.config.modelType === Config_1.ModelType.MODEL1) {
            const irqLatch = this.irqLatch;
            this.setTimerInterrupt(false);
            // TODO irq = this.irqLatch !== 0;
            return irqLatch;
        }
        else {
            return ~this.irqLatch & 0xFF;
        }
    }
    /**
     * Take one Z80 step and update the state of the hardware.
     */
    step() {
        this.z80.step();
        // Handle non-maskable interrupts.
        if ((this.nmiLatch & this.nmiMask) !== 0 && !this.nmiSeen) {
            this.z80.nonMaskableInterrupt();
            this.nmiSeen = true;
            // Simulate the reset button being released.
            this.resetButtonInterrupt(false);
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
        // Dispatch scheduled events.
        this.eventScheduler.dispatch(this.tStateCount);
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
        else if (Keyboard_1.Keyboard.isInRange(address)) {
            // Keyboard.
            return this.keyboard.readKeyboard(address, this.tStateCount);
        }
        else {
            // Unmapped memory.
            warnOnce("Reading from unmapped memory at 0x" + z80_base_1.toHex(address, 4));
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
                if (this.config.modelType !== Config_1.ModelType.MODEL1) {
                    // IRQ latch read.
                    value = this.interruptLatchRead();
                }
                break;
            case 0xE4:
                if (this.config.modelType !== Config_1.ModelType.MODEL1) {
                    // NMI latch read.
                    value = ~this.nmiLatch & 0xFF;
                }
                break;
            case 0xEC:
            case 0xED:
            case 0xEE:
            case 0xEF:
                if (this.config.modelType !== Config_1.ModelType.MODEL1) {
                    // Acknowledge timer.
                    this.setTimerInterrupt(false);
                    value = 0xFF;
                }
                break;
            case 0xF0:
                value = this.fdc.readStatus();
                break;
            case 0xF1:
                value = this.fdc.readTrack();
                break;
            case 0xF2:
                value = this.fdc.readSector();
                break;
            case 0xF3:
                value = this.fdc.readData();
                break;
            case 0xF8:
                // Printer status. Printer selected, ready, with paper, not busy.
                value = 0x30;
                break;
            case 0xFF:
                // Cassette and various flags.
                if (this.config.modelType === Config_1.ModelType.MODEL1) {
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
                // Not sure what a good default value is, but other emulators use 0xFF.
                warnOnce("Reading from unknown port 0x" + z80_base_1.toHex(z80_base_1.lo(address), 2));
                value = 0xFF;
                break;
        }
        // console.log("Reading 0x" + toHex(value, 2) + " from port 0x" + toHex(lo(address), 2));
        return value;
    }
    writePort(address, value) {
        const port = address & 0xFF;
        switch (port) {
            case 0xE0:
                if (this.config.modelType !== Config_1.ModelType.MODEL1) {
                    // Set interrupt mask.
                    this.setIrqMask(value);
                }
                break;
            case 0xE4:
            case 0xE5:
            case 0xE6:
            case 0xE7:
                if (this.config.modelType !== Config_1.ModelType.MODEL1) {
                    // Set NMI state.
                    this.setNmiMask(value);
                }
                break;
            case 0xEC:
            case 0xED:
            case 0xEE:
            case 0xEF:
                if (this.config.modelType !== Config_1.ModelType.MODEL1) {
                    // Various controls.
                    this.modeImage = value;
                    this.setCassetteMotor((value & 0x02) !== 0);
                    this.screen.setExpandedCharacters((value & 0x04) !== 0);
                    this.screen.setAlternateCharacters((value & 0x08) === 0);
                }
                break;
            case 0xF0:
                this.fdc.writeCommand(value);
                break;
            case 0xF1:
                this.fdc.writeTrack(value);
                break;
            case 0xF2:
                this.fdc.writeSector(value);
                break;
            case 0xF3:
                this.fdc.writeData(value);
                break;
            case 0xF4:
            case 0xF5:
            case 0xF6:
            case 0xF7:
                this.fdc.writeSelect(value);
                break;
            case 0xF8:
            case 0xF9:
            case 0xFA:
            case 0xFB:
                // Printer write.
                console.log("Writing \"" + String.fromCodePoint(value) + "\" to printer");
                break;
            case 0xFC:
            case 0xFD:
            case 0xFE:
            case 0xFF:
                if (this.config.modelType === Config_1.ModelType.MODEL1) {
                    this.setCassetteMotor((value & 0x04) !== 0);
                    this.screen.setExpandedCharacters((value & 0x08) !== 0);
                }
                if ((value & 0x20) !== 0) {
                    // Model III Micro Labs graphics card.
                    console.log("Sending 0x" + z80_base_1.toHex(value, 2) + " to Micro Labs graphics card");
                }
                else {
                    // Do cassette emulation.
                    this.putCassetteByte(value & 0x03);
                }
                break;
            default:
                warnOnce("Writing 0x" + z80_base_1.toHex(value, 2) + " to unknown port 0x" + z80_base_1.toHex(port, 2));
                return;
        }
        // console.log("Wrote 0x" + toHex(value, 2) + " to port 0x" + toHex(port, 2));
    }
    writeMemory(address, value) {
        if (address < ROM_SIZE) {
            warnOnce("Warning: Writing to ROM location 0x" + z80_base_1.toHex(address, 4));
        }
        else {
            if (address >= trs80_base_1.TRS80_SCREEN_BEGIN && address < trs80_base_1.TRS80_SCREEN_END) {
                if (this.config.cgChip === Config_1.CGChip.ORIGINAL) {
                    // No bit 6 in video memory, need to compute it.
                    value = computeVideoBit6(value);
                }
                this.screen.writeChar(address, value);
            }
            else if (address < RAM_START) {
                warnOnce("Writing to unmapped memory at 0x" + z80_base_1.toHex(address, 4));
            }
            this.memory[address] = value;
        }
    }
    /**
     * Write a block of data to memory.
     *
     * @return the address just past the block.
     */
    writeMemoryBlock(address, values, startIndex = 0, length) {
        length = length !== null && length !== void 0 ? length : values.length;
        for (let i = 0; i < length; i++) {
            this.writeMemory(address++, values[startIndex + i]);
        }
        return address;
    }
    /**
     * Reset cassette edge interrupts.
     */
    cassetteClearInterrupt() {
        this.irqLatch &= ~CASSETTE_IRQ_MASKS;
    }
    /**
     * Check whether the software has enabled these interrupts.
     */
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
        for (let address = trs80_base_1.TRS80_SCREEN_BEGIN; address < trs80_base_1.TRS80_SCREEN_END; address++) {
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
        for (let i = 0; i < this.clocksPerTick && this.started; i++) {
            this.step();
        }
        // We might have stopped in the step() routine (e.g., with scheduled event).
        if (this.started) {
            this.scheduleNextTick();
        }
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
        if (this.config.modelType === Config_1.ModelType.MODEL1) {
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
    // Set the state of the reset button interrupt.
    resetButtonInterrupt(state) {
        if (state) {
            this.nmiLatch |= RESET_NMI_MASK;
        }
        else {
            this.nmiLatch &= ~RESET_NMI_MASK;
        }
        this.updateNmiSeen();
    }
    // Set the state of the disk motor off interrupt.
    diskMotorOffInterrupt(state) {
        if (state) {
            this.nmiLatch |= DISK_MOTOR_OFF_NMI_MASK;
        }
        else {
            this.nmiLatch &= ~DISK_MOTOR_OFF_NMI_MASK;
        }
        this.updateNmiSeen();
    }
    // Set the state of the disk interrupt.
    diskIntrqInterrupt(state) {
        if (state) {
            this.nmiLatch |= DISK_INTRQ_NMI_MASK;
        }
        else {
            this.nmiLatch &= ~DISK_INTRQ_NMI_MASK;
        }
        this.updateNmiSeen();
    }
    // Set the state of the disk interrupt.
    diskDrqInterrupt(state) {
        // No effect.
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
        if (this.config.modelType !== Config_1.ModelType.MODEL1 && this.cassetteLastNonZeroValue === CassetteValue.POSITIVE) {
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
                if (this.config.modelType !== Config_1.ModelType.MODEL1) {
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
    /**
     * Clear screen and home cursor.
     */
    cls() {
        for (let address = trs80_base_1.TRS80_SCREEN_BEGIN; address < trs80_base_1.TRS80_SCREEN_END; address++) {
            this.writeMemory(address, 32);
        }
        this.positionCursor(0, 0);
    }
    /**
     * Move the cursor (where the ROM's write routine will write to next) to the
     * given location.
     *
     * @param col 0-based text column.
     * @param row 0-based text row.
     */
    positionCursor(col, row) {
        const address = trs80_base_1.TRS80_SCREEN_BEGIN + row * 64 + col;
        // This works on Model III, not sure if it works on Model I or in wide mode.
        this.writeMemory(0x4020, z80_base_1.lo(address));
        this.writeMemory(0x4021, z80_base_1.hi(address));
    }
    /**
     * Run a TRS-80 program. The exact behavior depends on the type of program.
     */
    runTrs80File(trs80File) {
        if (trs80File instanceof trs80_base_1.CmdProgram) {
            this.runCmdProgram(trs80File);
        }
        else if (trs80File instanceof trs80_base_1.Cassette) {
            if (trs80File.files.length === 1) {
                this.runTrs80File(trs80File.files[0].file);
            }
            else {
                // TODO.
                console.error("Can't currently run multiple cassette files");
            }
        }
        else if (trs80File instanceof trs80_base_1.SystemProgram) {
            this.runSystemProgram(trs80File);
        }
        else if (trs80File instanceof trs80_base_1.BasicProgram) {
            this.runBasicProgram(trs80File);
        }
        else if (trs80File instanceof FloppyDisk_1.FloppyDisk) {
            this.runFloppyDisk(trs80File);
        }
        else {
            // TODO.
            console.error("Don't know how to run", trs80File);
        }
    }
    /**
     * Load a CMD program into memory and run it.
     */
    runCmdProgram(cmdProgram) {
        this.reset();
        this.eventScheduler.add(undefined, this.tStateCount + this.clockHz * 0.1, () => {
            this.cls();
            for (const chunk of cmdProgram.chunks) {
                if (chunk instanceof trs80_base_1.CmdLoadBlockChunk) {
                    this.writeMemoryBlock(chunk.address, chunk.loadData);
                }
                else if (chunk instanceof trs80_base_1.CmdTransferAddressChunk) {
                    this.startExecutable(chunk.address);
                    // Don't load any more after this. I assume on a real machine the jump
                    // happens immediately and CMD parsing ends.
                    break;
                }
            }
        });
    }
    /**
     * Load a system program into memory and run it.
     */
    runSystemProgram(systemProgram) {
        this.reset();
        this.eventScheduler.add(undefined, this.tStateCount + this.clockHz * 0.1, () => {
            this.cls();
            for (const chunk of systemProgram.chunks) {
                this.writeMemoryBlock(chunk.loadAddress, chunk.data);
            }
            // Do what the SYSTEM command does.
            this.setStackPointer(0x4288);
            this.startExecutable(systemProgram.entryPointAddress);
        });
    }
    /**
     * Load a Basic program into memory and run it.
     */
    runBasicProgram(basicProgram) {
        this.reset();
        // Wait for Cass?
        this.eventScheduler.add(undefined, this.tStateCount + this.clockHz * 0.1, () => {
            this.keyboard.simulateKeyboardText("\n0\n");
            // Wait for Ready prompt.
            this.eventScheduler.add(undefined, this.tStateCount + this.clockHz * 0.2, () => {
                this.loadBasicProgram(basicProgram);
                this.keyboard.simulateKeyboardText("RUN\n");
            });
        });
    }
    /**
     * Load a Basic program into memory, replacing the one that's there. Does not run it.
     */
    loadBasicProgram(basicProgram) {
        // Find address to load to.
        let addr = this.readMemory(0x40A4) + (this.readMemory(0x40A5) << 8);
        if (addr < 0x4200 || addr >= 0x4500) {
            console.error("Basic load address (0x" + z80_base_2.toHexWord(addr) + ") is uninitialized");
            return;
        }
        // Terminate current line (if any) and set up the new one.
        let lineStart;
        const newLine = () => {
            if (lineStart !== undefined) {
                // End-of-line marker.
                this.writeMemory(addr++, 0);
                // Update previous line's next-line pointer.
                this.writeMemory(lineStart, z80_base_1.lo(addr));
                this.writeMemory(lineStart + 1, z80_base_1.hi(addr));
            }
            // Remember address of next-line pointer.
            lineStart = addr;
            // Next-line pointer.
            this.writeMemory(addr++, 0);
            this.writeMemory(addr++, 0);
        };
        // Write elements to memory.
        for (const e of basicProgram.elements) {
            if (e.offset !== undefined) {
                if (e.elementType === trs80_base_1.ElementType.LINE_NUMBER) {
                    newLine();
                }
                // Write element.
                addr = this.writeMemoryBlock(addr, basicProgram.binary, e.offset, e.length);
            }
        }
        newLine();
        // End of Basic program pointer.
        this.writeMemory(0x40F9, z80_base_1.lo(addr));
        this.writeMemory(0x40FA, z80_base_1.hi(addr));
        // Start of array variables pointer.
        this.writeMemory(0x40FB, z80_base_1.lo(addr));
        this.writeMemory(0x40FC, z80_base_1.hi(addr));
        // Start of free memory pointer.
        this.writeMemory(0x40FD, z80_base_1.lo(addr));
        this.writeMemory(0x40FE, z80_base_1.hi(addr));
    }
    /**
     * Load the floppy disk into the specified drive.
     * @param floppyDisk the floppy, or undefined to unmount.
     * @param driveNumber the drive number, 0-based.
     */
    loadFloppyDisk(floppyDisk, driveNumber) {
        this.fdc.loadFloppyDisk(floppyDisk, driveNumber);
    }
    /**
     * Load a floppy and reboot into it.
     */
    runFloppyDisk(floppyDisk) {
        // Mount floppy.
        this.loadFloppyDisk(floppyDisk, 0);
        // Reboot.
        this.reset();
    }
    /**
     * Pulls the Basic program currently in memory, or returns a string with an error.
     */
    getBasicProgramFromMemory() {
        let addr = this.readMemory(0x40A4) + (this.readMemory(0x40A5) << 8);
        if (addr < 0x4200 || addr >= 0x4500) {
            return "Basic load address (0x" + z80_base_2.toHexWord(addr) + ") is uninitialized";
        }
        // Walk through the program lines to find the end.
        const beginAddr = addr;
        while (true) {
            // Find end address.
            const nextLine = this.readMemory(addr) + (this.readMemory(addr + 1) << 8);
            if (nextLine === 0) {
                break;
            }
            if (nextLine < addr) {
                // Error, went backward.
                return `Next address 0x${z80_base_2.toHexWord(nextLine)} is less than current address 0x${z80_base_2.toHexWord(addr)}`;
            }
            addr = nextLine;
        }
        const endAddr = addr + 2;
        // Put together the binary of just the program.
        const binary = new Uint8Array(endAddr - beginAddr + 1);
        binary[0] = trs80_base_1.BASIC_HEADER_BYTE;
        binary.set(this.memory.subarray(beginAddr, endAddr), 1);
        // Decode the program.
        const basic = trs80_base_1.decodeBasicProgram(binary);
        if (basic === undefined) {
            return "Basic couldn't be decoded";
        }
        return basic;
    }
}
exports.Trs80 = Trs80;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(53));


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const z80_base_1 = __webpack_require__(6);
const Decode_1 = __webpack_require__(54);
/**
 * Emulated Z80 processor.
 */
class Z80 {
    constructor(hal) {
        /**
         * Full set of registers.
         */
        this.regs = new z80_base_1.RegisterSet();
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
        this.regs = new z80_base_1.RegisterSet();
    }
    /**
     * Execute one instruction.
     */
    step() {
        Decode_1.decode(this);
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
        return z80_base_1.word(highByte, lowByte);
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
        this.pushByte(z80_base_1.hi(value));
        this.pushByte(z80_base_1.lo(value));
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
        return z80_base_1.word(highByte, lowByte);
    }
    /**
     * Pop a byte from the stack.
     */
    popByte() {
        const value = this.readByte(this.regs.sp);
        this.regs.sp = z80_base_1.inc16(this.regs.sp);
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
                    const address = z80_base_1.word(this.regs.i, 0xFF);
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
            this.sz53Table.push(i & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5 | z80_base_1.Flag.S));
            let bits = i;
            let parity = 0;
            for (let bit = 0; bit < 8; bit++) {
                parity ^= bits & 1;
                bits >>= 1;
            }
            this.parityTable.push(parity ? 0 : z80_base_1.Flag.P);
            this.sz53pTable.push(this.sz53Table[i] | this.parityTable[i]);
        }
        this.sz53Table[0] |= z80_base_1.Flag.Z;
        this.sz53pTable[0] |= z80_base_1.Flag.Z;
    }
}
exports.Z80 = Z80;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Do not modify. This file was generated by GenerateOpcodes.ts.
Object.defineProperty(exports, "__esModule", { value: true });
const z80_base_1 = __webpack_require__(6);
// Tables for computing flags after an operation.
const halfCarryAddTable = [0, z80_base_1.Flag.H, z80_base_1.Flag.H, z80_base_1.Flag.H, 0, 0, 0, z80_base_1.Flag.H];
const halfCarrySubTable = [0, 0, z80_base_1.Flag.H, 0, z80_base_1.Flag.H, 0, z80_base_1.Flag.H, z80_base_1.Flag.H];
const overflowAddTable = [0, 0, 0, z80_base_1.Flag.V, z80_base_1.Flag.V, 0, 0, 0];
const overflowSubTable = [0, z80_base_1.Flag.V, 0, 0, 0, 0, z80_base_1.Flag.V, 0];
const decodeMapBASE = new Map();
decodeMapBASE.set(0x00, (z80) => {
});
decodeMapBASE.set(0x01, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80_base_1.word(z80.readByte(z80.regs.pc), value);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.bc = value;
});
decodeMapBASE.set(0x02, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.memptr = z80_base_1.word(z80.regs.a, z80_base_1.inc16(z80.regs.bc));
    z80.writeByte(z80.regs.bc, value);
});
decodeMapBASE.set(0x03, (z80) => {
    let value;
    value = z80.regs.bc;
    const oldValue = value;
    z80.incTStateCount(2);
    value = z80_base_1.inc16(value);
    z80.regs.bc = value;
});
decodeMapBASE.set(0x04, (z80) => {
    let value;
    value = z80.regs.b;
    const oldValue = value;
    value = z80_base_1.inc8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x80 ? z80_base_1.Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80.sz53Table[value];
    z80.regs.b = value;
});
decodeMapBASE.set(0x05, (z80) => {
    let value;
    value = z80.regs.b;
    const oldValue = value;
    value = z80_base_1.dec8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x7F ? z80_base_1.Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80_base_1.Flag.N | z80.sz53Table[value];
    z80.regs.b = value;
});
decodeMapBASE.set(0x06, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.b = value;
});
decodeMapBASE.set(0x07, (z80) => {
    const oldA = z80.regs.a;
    z80.regs.a = ((z80.regs.a >> 7) | (z80.regs.a << 1)) & 0xFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.P | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | (z80.regs.a & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | ((oldA & 0x80) !== 0 ? z80_base_1.Flag.C : 0);
});
decodeMapBASE.set(0x08, (z80) => {
    const rightValue = z80.regs.afPrime;
    z80.regs.afPrime = z80.regs.af;
    z80.regs.af = rightValue;
});
decodeMapBASE.set(0x09, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.bc;
    let result = z80.regs.hl + value;
    const lookup = (((z80.regs.hl & 0x0800) >> 11) |
        ((value & 0x0800) >> 10) |
        ((result & 0x0800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.hl);
    z80.regs.hl = result & 0xFFFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.V | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | halfCarryAddTable[lookup];
});
decodeMapBASE.set(0x0A, (z80) => {
    let value;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
    value = z80.readByte(z80.regs.bc);
    z80.regs.a = value;
});
decodeMapBASE.set(0x0B, (z80) => {
    let value;
    value = z80.regs.bc;
    const oldValue = value;
    z80.incTStateCount(2);
    value = z80_base_1.dec16(value);
    z80.regs.bc = value;
});
decodeMapBASE.set(0x0C, (z80) => {
    let value;
    value = z80.regs.c;
    const oldValue = value;
    value = z80_base_1.inc8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x80 ? z80_base_1.Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80.sz53Table[value];
    z80.regs.c = value;
});
decodeMapBASE.set(0x0D, (z80) => {
    let value;
    value = z80.regs.c;
    const oldValue = value;
    value = z80_base_1.dec8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x7F ? z80_base_1.Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80_base_1.Flag.N | z80.sz53Table[value];
    z80.regs.c = value;
});
decodeMapBASE.set(0x0E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.c = value;
});
decodeMapBASE.set(0x0F, (z80) => {
    const oldA = z80.regs.a;
    z80.regs.a = ((z80.regs.a >> 1) | (z80.regs.a << 7)) & 0xFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.P | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | (z80.regs.a & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | ((oldA & 0x01) !== 0 ? z80_base_1.Flag.C : 0);
});
decodeMapBASE.set(0x10, (z80) => {
    z80.incTStateCount(1);
    z80.regs.b = z80_base_1.dec8(z80.regs.b);
    if (z80.regs.b !== 0) {
        const offset = z80.readByte(z80.regs.pc);
        z80.incTStateCount(5);
        z80.regs.pc = z80_base_1.add16(z80.regs.pc, z80_base_1.signedByte(offset));
        z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
        z80.regs.memptr = z80.regs.pc;
    }
    else {
        z80.incTStateCount(3);
        z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    }
});
decodeMapBASE.set(0x11, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80_base_1.word(z80.readByte(z80.regs.pc), value);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.de = value;
});
decodeMapBASE.set(0x12, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.memptr = z80_base_1.word(z80.regs.a, z80_base_1.inc16(z80.regs.de));
    z80.writeByte(z80.regs.de, value);
});
decodeMapBASE.set(0x13, (z80) => {
    let value;
    value = z80.regs.de;
    const oldValue = value;
    z80.incTStateCount(2);
    value = z80_base_1.inc16(value);
    z80.regs.de = value;
});
decodeMapBASE.set(0x14, (z80) => {
    let value;
    value = z80.regs.d;
    const oldValue = value;
    value = z80_base_1.inc8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x80 ? z80_base_1.Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80.sz53Table[value];
    z80.regs.d = value;
});
decodeMapBASE.set(0x15, (z80) => {
    let value;
    value = z80.regs.d;
    const oldValue = value;
    value = z80_base_1.dec8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x7F ? z80_base_1.Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80_base_1.Flag.N | z80.sz53Table[value];
    z80.regs.d = value;
});
decodeMapBASE.set(0x16, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.d = value;
});
decodeMapBASE.set(0x17, (z80) => {
    const oldA = z80.regs.a;
    z80.regs.a = ((z80.regs.a << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x01 : 0)) & 0xFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.P | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | (z80.regs.a & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | ((oldA & 0x80) !== 0 ? z80_base_1.Flag.C : 0);
});
decodeMapBASE.set(0x18, (z80) => {
    const offset = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.add16(z80.regs.pc, z80_base_1.signedByte(offset));
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80.regs.pc;
});
decodeMapBASE.set(0x19, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.de;
    let result = z80.regs.hl + value;
    const lookup = (((z80.regs.hl & 0x0800) >> 11) |
        ((value & 0x0800) >> 10) |
        ((result & 0x0800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.hl);
    z80.regs.hl = result & 0xFFFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.V | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | halfCarryAddTable[lookup];
});
decodeMapBASE.set(0x1A, (z80) => {
    let value;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.de);
    value = z80.readByte(z80.regs.de);
    z80.regs.a = value;
});
decodeMapBASE.set(0x1B, (z80) => {
    let value;
    value = z80.regs.de;
    const oldValue = value;
    z80.incTStateCount(2);
    value = z80_base_1.dec16(value);
    z80.regs.de = value;
});
decodeMapBASE.set(0x1C, (z80) => {
    let value;
    value = z80.regs.e;
    const oldValue = value;
    value = z80_base_1.inc8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x80 ? z80_base_1.Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80.sz53Table[value];
    z80.regs.e = value;
});
decodeMapBASE.set(0x1D, (z80) => {
    let value;
    value = z80.regs.e;
    const oldValue = value;
    value = z80_base_1.dec8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x7F ? z80_base_1.Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80_base_1.Flag.N | z80.sz53Table[value];
    z80.regs.e = value;
});
decodeMapBASE.set(0x1E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.e = value;
});
decodeMapBASE.set(0x1F, (z80) => {
    const oldA = z80.regs.a;
    z80.regs.a = (z80.regs.a >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.P | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | (z80.regs.a & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | ((oldA & 0x01) !== 0 ? z80_base_1.Flag.C : 0);
});
decodeMapBASE.set(0x20, (z80) => {
    if ((z80.regs.f & z80_base_1.Flag.Z) === 0) {
        const offset = z80.readByte(z80.regs.pc);
        z80.incTStateCount(5);
        z80.regs.pc = z80_base_1.add16(z80.regs.pc, z80_base_1.signedByte(offset));
        z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
        z80.regs.memptr = z80.regs.pc;
    }
    else {
        z80.incTStateCount(3);
        z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    }
});
decodeMapBASE.set(0x21, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80_base_1.word(z80.readByte(z80.regs.pc), value);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.hl = value;
});
decodeMapBASE.set(0x22, (z80) => {
    let value;
    value = z80.regs.hl;
    let addr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    addr = z80_base_1.word(z80.readByte(z80.regs.pc), addr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.writeByte(addr, z80_base_1.lo(value));
    addr = z80_base_1.inc16(addr);
    z80.regs.memptr = addr;
    z80.writeByte(addr, z80_base_1.hi(value));
});
decodeMapBASE.set(0x23, (z80) => {
    let value;
    value = z80.regs.hl;
    const oldValue = value;
    z80.incTStateCount(2);
    value = z80_base_1.inc16(value);
    z80.regs.hl = value;
});
decodeMapBASE.set(0x24, (z80) => {
    let value;
    value = z80.regs.h;
    const oldValue = value;
    value = z80_base_1.inc8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x80 ? z80_base_1.Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80.sz53Table[value];
    z80.regs.h = value;
});
decodeMapBASE.set(0x25, (z80) => {
    let value;
    value = z80.regs.h;
    const oldValue = value;
    value = z80_base_1.dec8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x7F ? z80_base_1.Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80_base_1.Flag.N | z80.sz53Table[value];
    z80.regs.h = value;
});
decodeMapBASE.set(0x26, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.h = value;
});
decodeMapBASE.set(0x27, (z80) => {
    let value = 0;
    let carry = z80.regs.f & z80_base_1.Flag.C;
    if ((z80.regs.f & z80_base_1.Flag.H) !== 0 || ((z80.regs.a & 0x0F) > 9)) {
        value = 6; // Skip over hex digits in lower nybble.
    }
    if (carry !== 0 || z80.regs.a > 0x99) {
        value |= 0x60; // Skip over hex digits in upper nybble.
    }
    if (z80.regs.a > 0x99) {
        carry = z80_base_1.Flag.C;
    }
    if ((z80.regs.f & z80_base_1.Flag.N) !== 0) {
        let result = z80_base_1.sub16(z80.regs.a, value);
        const lookup = (((z80.regs.a & 0x88) >> 3) |
            ((value & 0x88) >> 2) |
            ((result & 0x88) >> 1)) & 0xFF;
        z80.regs.a = result & 0xFF;
        z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
    }
    else {
        let result = z80_base_1.add16(z80.regs.a, value);
        const lookup = (((z80.regs.a & 0x88) >> 3) |
            ((value & 0x88) >> 2) |
            ((result & 0x88) >> 1)) & 0xFF;
        z80.regs.a = result & 0xFF;
        z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
    }
    z80.regs.f = (z80.regs.f & ~(z80_base_1.Flag.C | z80_base_1.Flag.P)) | carry | z80.parityTable[z80.regs.a];
});
decodeMapBASE.set(0x28, (z80) => {
    if ((z80.regs.f & z80_base_1.Flag.Z) !== 0) {
        const offset = z80.readByte(z80.regs.pc);
        z80.incTStateCount(5);
        z80.regs.pc = z80_base_1.add16(z80.regs.pc, z80_base_1.signedByte(offset));
        z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
        z80.regs.memptr = z80.regs.pc;
    }
    else {
        z80.incTStateCount(3);
        z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    }
});
decodeMapBASE.set(0x29, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.hl;
    let result = z80.regs.hl + value;
    const lookup = (((z80.regs.hl & 0x0800) >> 11) |
        ((value & 0x0800) >> 10) |
        ((result & 0x0800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.hl);
    z80.regs.hl = result & 0xFFFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.V | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | halfCarryAddTable[lookup];
});
decodeMapBASE.set(0x2A, (z80) => {
    let value;
    let addr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    addr = z80_base_1.word(z80.readByte(z80.regs.pc), addr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80.readByte(addr);
    z80.regs.memptr = z80_base_1.inc16(addr);
    value = z80_base_1.word(z80.readByte(z80.regs.memptr), value);
    z80.regs.hl = value;
});
decodeMapBASE.set(0x2B, (z80) => {
    let value;
    value = z80.regs.hl;
    const oldValue = value;
    z80.incTStateCount(2);
    value = z80_base_1.dec16(value);
    z80.regs.hl = value;
});
decodeMapBASE.set(0x2C, (z80) => {
    let value;
    value = z80.regs.l;
    const oldValue = value;
    value = z80_base_1.inc8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x80 ? z80_base_1.Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80.sz53Table[value];
    z80.regs.l = value;
});
decodeMapBASE.set(0x2D, (z80) => {
    let value;
    value = z80.regs.l;
    const oldValue = value;
    value = z80_base_1.dec8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x7F ? z80_base_1.Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80_base_1.Flag.N | z80.sz53Table[value];
    z80.regs.l = value;
});
decodeMapBASE.set(0x2E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.l = value;
});
decodeMapBASE.set(0x2F, (z80) => {
    z80.regs.a ^= 0xFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.C | z80_base_1.Flag.P | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | (z80.regs.a & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | z80_base_1.Flag.N | z80_base_1.Flag.H;
});
decodeMapBASE.set(0x30, (z80) => {
    if ((z80.regs.f & z80_base_1.Flag.C) === 0) {
        const offset = z80.readByte(z80.regs.pc);
        z80.incTStateCount(5);
        z80.regs.pc = z80_base_1.add16(z80.regs.pc, z80_base_1.signedByte(offset));
        z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
        z80.regs.memptr = z80.regs.pc;
    }
    else {
        z80.incTStateCount(3);
        z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    }
});
decodeMapBASE.set(0x31, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80_base_1.word(z80.readByte(z80.regs.pc), value);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.sp = value;
});
decodeMapBASE.set(0x32, (z80) => {
    let value;
    value = z80.regs.a;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80_base_1.word(z80.readByte(z80.regs.pc), value);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.regs.a, z80_base_1.inc16(value));
    z80.writeByte(value, z80.regs.a);
});
decodeMapBASE.set(0x33, (z80) => {
    let value;
    value = z80.regs.sp;
    const oldValue = value;
    z80.incTStateCount(2);
    value = z80_base_1.inc16(value);
    z80.regs.sp = value;
});
decodeMapBASE.set(0x34, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    const oldValue = value;
    value = z80_base_1.inc8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x80 ? z80_base_1.Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80.sz53Table[value];
    z80.writeByte(z80.regs.hl, value);
});
decodeMapBASE.set(0x35, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    const oldValue = value;
    value = z80_base_1.dec8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x7F ? z80_base_1.Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80_base_1.Flag.N | z80.sz53Table[value];
    z80.writeByte(z80.regs.hl, value);
});
decodeMapBASE.set(0x36, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.writeByte(z80.regs.hl, value);
});
decodeMapBASE.set(0x37, (z80) => {
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.P | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | z80_base_1.Flag.C | (z80.regs.a & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
});
decodeMapBASE.set(0x38, (z80) => {
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        const offset = z80.readByte(z80.regs.pc);
        z80.incTStateCount(5);
        z80.regs.pc = z80_base_1.add16(z80.regs.pc, z80_base_1.signedByte(offset));
        z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
        z80.regs.memptr = z80.regs.pc;
    }
    else {
        z80.incTStateCount(3);
        z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    }
});
decodeMapBASE.set(0x39, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.sp;
    let result = z80.regs.hl + value;
    const lookup = (((z80.regs.hl & 0x0800) >> 11) |
        ((value & 0x0800) >> 10) |
        ((result & 0x0800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.hl);
    z80.regs.hl = result & 0xFFFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.V | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | halfCarryAddTable[lookup];
});
decodeMapBASE.set(0x3A, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80_base_1.word(z80.readByte(z80.regs.pc), value);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.inc16(value);
    value = z80.readByte(value);
    z80.regs.a = value;
});
decodeMapBASE.set(0x3B, (z80) => {
    let value;
    value = z80.regs.sp;
    const oldValue = value;
    z80.incTStateCount(2);
    value = z80_base_1.dec16(value);
    z80.regs.sp = value;
});
decodeMapBASE.set(0x3C, (z80) => {
    let value;
    value = z80.regs.a;
    const oldValue = value;
    value = z80_base_1.inc8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x80 ? z80_base_1.Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80.sz53Table[value];
    z80.regs.a = value;
});
decodeMapBASE.set(0x3D, (z80) => {
    let value;
    value = z80.regs.a;
    const oldValue = value;
    value = z80_base_1.dec8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x7F ? z80_base_1.Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80_base_1.Flag.N | z80.sz53Table[value];
    z80.regs.a = value;
});
decodeMapBASE.set(0x3E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.a = value;
});
decodeMapBASE.set(0x3F, (z80) => {
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.P | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? z80_base_1.Flag.H : z80_base_1.Flag.C) | (z80.regs.a & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
});
decodeMapBASE.set(0x40, (z80) => {
    let value;
    value = z80.regs.b;
    z80.regs.b = value;
});
decodeMapBASE.set(0x41, (z80) => {
    let value;
    value = z80.regs.c;
    z80.regs.b = value;
});
decodeMapBASE.set(0x42, (z80) => {
    let value;
    value = z80.regs.d;
    z80.regs.b = value;
});
decodeMapBASE.set(0x43, (z80) => {
    let value;
    value = z80.regs.e;
    z80.regs.b = value;
});
decodeMapBASE.set(0x44, (z80) => {
    let value;
    value = z80.regs.h;
    z80.regs.b = value;
});
decodeMapBASE.set(0x45, (z80) => {
    let value;
    value = z80.regs.l;
    z80.regs.b = value;
});
decodeMapBASE.set(0x46, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.regs.b = value;
});
decodeMapBASE.set(0x47, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.b = value;
});
decodeMapBASE.set(0x48, (z80) => {
    let value;
    value = z80.regs.b;
    z80.regs.c = value;
});
decodeMapBASE.set(0x49, (z80) => {
    let value;
    value = z80.regs.c;
    z80.regs.c = value;
});
decodeMapBASE.set(0x4A, (z80) => {
    let value;
    value = z80.regs.d;
    z80.regs.c = value;
});
decodeMapBASE.set(0x4B, (z80) => {
    let value;
    value = z80.regs.e;
    z80.regs.c = value;
});
decodeMapBASE.set(0x4C, (z80) => {
    let value;
    value = z80.regs.h;
    z80.regs.c = value;
});
decodeMapBASE.set(0x4D, (z80) => {
    let value;
    value = z80.regs.l;
    z80.regs.c = value;
});
decodeMapBASE.set(0x4E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.regs.c = value;
});
decodeMapBASE.set(0x4F, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.c = value;
});
decodeMapBASE.set(0x50, (z80) => {
    let value;
    value = z80.regs.b;
    z80.regs.d = value;
});
decodeMapBASE.set(0x51, (z80) => {
    let value;
    value = z80.regs.c;
    z80.regs.d = value;
});
decodeMapBASE.set(0x52, (z80) => {
    let value;
    value = z80.regs.d;
    z80.regs.d = value;
});
decodeMapBASE.set(0x53, (z80) => {
    let value;
    value = z80.regs.e;
    z80.regs.d = value;
});
decodeMapBASE.set(0x54, (z80) => {
    let value;
    value = z80.regs.h;
    z80.regs.d = value;
});
decodeMapBASE.set(0x55, (z80) => {
    let value;
    value = z80.regs.l;
    z80.regs.d = value;
});
decodeMapBASE.set(0x56, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.regs.d = value;
});
decodeMapBASE.set(0x57, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.d = value;
});
decodeMapBASE.set(0x58, (z80) => {
    let value;
    value = z80.regs.b;
    z80.regs.e = value;
});
decodeMapBASE.set(0x59, (z80) => {
    let value;
    value = z80.regs.c;
    z80.regs.e = value;
});
decodeMapBASE.set(0x5A, (z80) => {
    let value;
    value = z80.regs.d;
    z80.regs.e = value;
});
decodeMapBASE.set(0x5B, (z80) => {
    let value;
    value = z80.regs.e;
    z80.regs.e = value;
});
decodeMapBASE.set(0x5C, (z80) => {
    let value;
    value = z80.regs.h;
    z80.regs.e = value;
});
decodeMapBASE.set(0x5D, (z80) => {
    let value;
    value = z80.regs.l;
    z80.regs.e = value;
});
decodeMapBASE.set(0x5E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.regs.e = value;
});
decodeMapBASE.set(0x5F, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.e = value;
});
decodeMapBASE.set(0x60, (z80) => {
    let value;
    value = z80.regs.b;
    z80.regs.h = value;
});
decodeMapBASE.set(0x61, (z80) => {
    let value;
    value = z80.regs.c;
    z80.regs.h = value;
});
decodeMapBASE.set(0x62, (z80) => {
    let value;
    value = z80.regs.d;
    z80.regs.h = value;
});
decodeMapBASE.set(0x63, (z80) => {
    let value;
    value = z80.regs.e;
    z80.regs.h = value;
});
decodeMapBASE.set(0x64, (z80) => {
    let value;
    value = z80.regs.h;
    z80.regs.h = value;
});
decodeMapBASE.set(0x65, (z80) => {
    let value;
    value = z80.regs.l;
    z80.regs.h = value;
});
decodeMapBASE.set(0x66, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.regs.h = value;
});
decodeMapBASE.set(0x67, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.h = value;
});
decodeMapBASE.set(0x68, (z80) => {
    let value;
    value = z80.regs.b;
    z80.regs.l = value;
});
decodeMapBASE.set(0x69, (z80) => {
    let value;
    value = z80.regs.c;
    z80.regs.l = value;
});
decodeMapBASE.set(0x6A, (z80) => {
    let value;
    value = z80.regs.d;
    z80.regs.l = value;
});
decodeMapBASE.set(0x6B, (z80) => {
    let value;
    value = z80.regs.e;
    z80.regs.l = value;
});
decodeMapBASE.set(0x6C, (z80) => {
    let value;
    value = z80.regs.h;
    z80.regs.l = value;
});
decodeMapBASE.set(0x6D, (z80) => {
    let value;
    value = z80.regs.l;
    z80.regs.l = value;
});
decodeMapBASE.set(0x6E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.regs.l = value;
});
decodeMapBASE.set(0x6F, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.l = value;
});
decodeMapBASE.set(0x70, (z80) => {
    let value;
    value = z80.regs.b;
    z80.writeByte(z80.regs.hl, value);
});
decodeMapBASE.set(0x71, (z80) => {
    let value;
    value = z80.regs.c;
    z80.writeByte(z80.regs.hl, value);
});
decodeMapBASE.set(0x72, (z80) => {
    let value;
    value = z80.regs.d;
    z80.writeByte(z80.regs.hl, value);
});
decodeMapBASE.set(0x73, (z80) => {
    let value;
    value = z80.regs.e;
    z80.writeByte(z80.regs.hl, value);
});
decodeMapBASE.set(0x74, (z80) => {
    let value;
    value = z80.regs.h;
    z80.writeByte(z80.regs.hl, value);
});
decodeMapBASE.set(0x75, (z80) => {
    let value;
    value = z80.regs.l;
    z80.writeByte(z80.regs.hl, value);
});
decodeMapBASE.set(0x76, (z80) => {
    z80.regs.halted = 1;
    z80.regs.pc = z80_base_1.dec16(z80.regs.pc);
});
decodeMapBASE.set(0x77, (z80) => {
    let value;
    value = z80.regs.a;
    z80.writeByte(z80.regs.hl, value);
});
decodeMapBASE.set(0x78, (z80) => {
    let value;
    value = z80.regs.b;
    z80.regs.a = value;
});
decodeMapBASE.set(0x79, (z80) => {
    let value;
    value = z80.regs.c;
    z80.regs.a = value;
});
decodeMapBASE.set(0x7A, (z80) => {
    let value;
    value = z80.regs.d;
    z80.regs.a = value;
});
decodeMapBASE.set(0x7B, (z80) => {
    let value;
    value = z80.regs.e;
    z80.regs.a = value;
});
decodeMapBASE.set(0x7C, (z80) => {
    let value;
    value = z80.regs.h;
    z80.regs.a = value;
});
decodeMapBASE.set(0x7D, (z80) => {
    let value;
    value = z80.regs.l;
    z80.regs.a = value;
});
decodeMapBASE.set(0x7E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.regs.a = value;
});
decodeMapBASE.set(0x7F, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.a = value;
});
decodeMapBASE.set(0x80, (z80) => {
    let value;
    value = z80.regs.b;
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x81, (z80) => {
    let value;
    value = z80.regs.c;
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x82, (z80) => {
    let value;
    value = z80.regs.d;
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x83, (z80) => {
    let value;
    value = z80.regs.e;
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x84, (z80) => {
    let value;
    value = z80.regs.h;
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x85, (z80) => {
    let value;
    value = z80.regs.l;
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x86, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x87, (z80) => {
    let value;
    value = z80.regs.a;
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x88, (z80) => {
    let value;
    value = z80.regs.b;
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x89, (z80) => {
    let value;
    value = z80.regs.c;
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x8A, (z80) => {
    let value;
    value = z80.regs.d;
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x8B, (z80) => {
    let value;
    value = z80.regs.e;
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x8C, (z80) => {
    let value;
    value = z80.regs.h;
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x8D, (z80) => {
    let value;
    value = z80.regs.l;
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x8E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x8F, (z80) => {
    let value;
    value = z80.regs.a;
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x90, (z80) => {
    let value;
    value = z80.regs.b;
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x91, (z80) => {
    let value;
    value = z80.regs.c;
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x92, (z80) => {
    let value;
    value = z80.regs.d;
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x93, (z80) => {
    let value;
    value = z80.regs.e;
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x94, (z80) => {
    let value;
    value = z80.regs.h;
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x95, (z80) => {
    let value;
    value = z80.regs.l;
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x96, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x97, (z80) => {
    let value;
    value = z80.regs.a;
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x98, (z80) => {
    let value;
    value = z80.regs.b;
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x99, (z80) => {
    let value;
    value = z80.regs.c;
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x9A, (z80) => {
    let value;
    value = z80.regs.d;
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x9B, (z80) => {
    let value;
    value = z80.regs.e;
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x9C, (z80) => {
    let value;
    value = z80.regs.h;
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x9D, (z80) => {
    let value;
    value = z80.regs.l;
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x9E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0x9F, (z80) => {
    let value;
    value = z80.regs.a;
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0xA0, (z80) => {
    let value;
    value = z80.regs.b;
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapBASE.set(0xA1, (z80) => {
    let value;
    value = z80.regs.c;
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapBASE.set(0xA2, (z80) => {
    let value;
    value = z80.regs.d;
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapBASE.set(0xA3, (z80) => {
    let value;
    value = z80.regs.e;
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapBASE.set(0xA4, (z80) => {
    let value;
    value = z80.regs.h;
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapBASE.set(0xA5, (z80) => {
    let value;
    value = z80.regs.l;
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapBASE.set(0xA6, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapBASE.set(0xA7, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapBASE.set(0xA8, (z80) => {
    let value;
    value = z80.regs.b;
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xA9, (z80) => {
    let value;
    value = z80.regs.c;
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xAA, (z80) => {
    let value;
    value = z80.regs.d;
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xAB, (z80) => {
    let value;
    value = z80.regs.e;
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xAC, (z80) => {
    let value;
    value = z80.regs.h;
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xAD, (z80) => {
    let value;
    value = z80.regs.l;
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xAE, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xAF, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xB0, (z80) => {
    let value;
    value = z80.regs.b;
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xB1, (z80) => {
    let value;
    value = z80.regs.c;
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xB2, (z80) => {
    let value;
    value = z80.regs.d;
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xB3, (z80) => {
    let value;
    value = z80.regs.e;
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xB4, (z80) => {
    let value;
    value = z80.regs.h;
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xB5, (z80) => {
    let value;
    value = z80.regs.l;
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xB6, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xB7, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xB8, (z80) => {
    let value;
    value = z80.regs.b;
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapBASE.set(0xB9, (z80) => {
    let value;
    value = z80.regs.c;
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapBASE.set(0xBA, (z80) => {
    let value;
    value = z80.regs.d;
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapBASE.set(0xBB, (z80) => {
    let value;
    value = z80.regs.e;
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapBASE.set(0xBC, (z80) => {
    let value;
    value = z80.regs.h;
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapBASE.set(0xBD, (z80) => {
    let value;
    value = z80.regs.l;
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapBASE.set(0xBE, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapBASE.set(0xBF, (z80) => {
    let value;
    value = z80.regs.a;
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapBASE.set(0xC0, (z80) => {
    z80.incTStateCount(1);
    if ((z80.regs.f & z80_base_1.Flag.Z) === 0) {
        z80.regs.pc = z80.popWord();
        z80.regs.memptr = z80.regs.pc;
    }
});
decodeMapBASE.set(0xC1, (z80) => {
    z80.regs.bc = z80.popWord();
});
decodeMapBASE.set(0xC2, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.Z) === 0) {
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xC3, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.pc = z80.regs.memptr;
});
decodeMapBASE.set(0xC4, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.Z) === 0) {
        z80.incTStateCount(1);
        z80.pushWord(z80.regs.pc);
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xC5, (z80) => {
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.bc);
});
decodeMapBASE.set(0xC6, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0xC7, (z80) => {
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.pc);
    z80.regs.pc = 0x0000;
    z80.regs.memptr = z80.regs.pc;
});
decodeMapBASE.set(0xC8, (z80) => {
    z80.incTStateCount(1);
    if ((z80.regs.f & z80_base_1.Flag.Z) !== 0) {
        z80.regs.pc = z80.popWord();
        z80.regs.memptr = z80.regs.pc;
    }
});
decodeMapBASE.set(0xC9, (z80) => {
    z80.regs.pc = z80.popWord();
    z80.regs.memptr = z80.regs.pc;
});
decodeMapBASE.set(0xCA, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.Z) !== 0) {
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xCB, (z80) => {
    decodeCB(z80);
});
decodeMapBASE.set(0xCC, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.Z) !== 0) {
        z80.incTStateCount(1);
        z80.pushWord(z80.regs.pc);
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xCD, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.pc);
    z80.regs.pc = z80.regs.memptr;
});
decodeMapBASE.set(0xCE, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0xCF, (z80) => {
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.pc);
    z80.regs.pc = 0x0008;
    z80.regs.memptr = z80.regs.pc;
});
decodeMapBASE.set(0xD0, (z80) => {
    z80.incTStateCount(1);
    if ((z80.regs.f & z80_base_1.Flag.C) === 0) {
        z80.regs.pc = z80.popWord();
        z80.regs.memptr = z80.regs.pc;
    }
});
decodeMapBASE.set(0xD1, (z80) => {
    z80.regs.de = z80.popWord();
});
decodeMapBASE.set(0xD2, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.C) === 0) {
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xD3, (z80) => {
    const port = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.regs.a, z80_base_1.inc8(port));
    z80.writePort(z80_base_1.word(z80.regs.a, port), z80.regs.a);
});
decodeMapBASE.set(0xD4, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.C) === 0) {
        z80.incTStateCount(1);
        z80.pushWord(z80.regs.pc);
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xD5, (z80) => {
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.de);
});
decodeMapBASE.set(0xD6, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0xD7, (z80) => {
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.pc);
    z80.regs.pc = 0x0010;
    z80.regs.memptr = z80.regs.pc;
});
decodeMapBASE.set(0xD8, (z80) => {
    z80.incTStateCount(1);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        z80.regs.pc = z80.popWord();
        z80.regs.memptr = z80.regs.pc;
    }
});
decodeMapBASE.set(0xD9, (z80) => {
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
});
decodeMapBASE.set(0xDA, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xDB, (z80) => {
    const port = z80_base_1.word(z80.regs.a, z80.readByte(z80.regs.pc));
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.a = z80.readPort(port);
    z80.regs.memptr = z80_base_1.inc16(port);
});
decodeMapBASE.set(0xDC, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        z80.incTStateCount(1);
        z80.pushWord(z80.regs.pc);
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xDD, (z80) => {
    decodeDD(z80);
});
decodeMapBASE.set(0xDE, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapBASE.set(0xDF, (z80) => {
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.pc);
    z80.regs.pc = 0x0018;
    z80.regs.memptr = z80.regs.pc;
});
decodeMapBASE.set(0xE0, (z80) => {
    z80.incTStateCount(1);
    if ((z80.regs.f & z80_base_1.Flag.P) === 0) {
        z80.regs.pc = z80.popWord();
        z80.regs.memptr = z80.regs.pc;
    }
});
decodeMapBASE.set(0xE1, (z80) => {
    z80.regs.hl = z80.popWord();
});
decodeMapBASE.set(0xE2, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.P) === 0) {
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xE3, (z80) => {
    const rightValue = z80.regs.hl;
    const leftValueL = z80.readByte(z80.regs.sp);
    const leftValueH = z80.readByte(z80_base_1.inc16(z80.regs.sp));
    z80.incTStateCount(1);
    z80.writeByte(z80_base_1.inc16(z80.regs.sp), z80_base_1.hi(rightValue));
    z80.writeByte(z80.regs.sp, z80_base_1.lo(rightValue));
    z80.incTStateCount(2);
    z80.regs.memptr = z80_base_1.word(leftValueH, leftValueL);
    z80.regs.hl = z80_base_1.word(leftValueH, leftValueL);
});
decodeMapBASE.set(0xE4, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.P) === 0) {
        z80.incTStateCount(1);
        z80.pushWord(z80.regs.pc);
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xE5, (z80) => {
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.hl);
});
decodeMapBASE.set(0xE6, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapBASE.set(0xE7, (z80) => {
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.pc);
    z80.regs.pc = 0x0020;
    z80.regs.memptr = z80.regs.pc;
});
decodeMapBASE.set(0xE8, (z80) => {
    z80.incTStateCount(1);
    if ((z80.regs.f & z80_base_1.Flag.P) !== 0) {
        z80.regs.pc = z80.popWord();
        z80.regs.memptr = z80.regs.pc;
    }
});
decodeMapBASE.set(0xE9, (z80) => {
    z80.regs.pc = z80.regs.hl;
});
decodeMapBASE.set(0xEA, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.P) !== 0) {
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xEB, (z80) => {
    const rightValue = z80.regs.hl;
    z80.regs.hl = z80.regs.de;
    z80.regs.de = rightValue;
});
decodeMapBASE.set(0xEC, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.P) !== 0) {
        z80.incTStateCount(1);
        z80.pushWord(z80.regs.pc);
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xED, (z80) => {
    decodeED(z80);
});
decodeMapBASE.set(0xEE, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xEF, (z80) => {
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.pc);
    z80.regs.pc = 0x0028;
    z80.regs.memptr = z80.regs.pc;
});
decodeMapBASE.set(0xF0, (z80) => {
    z80.incTStateCount(1);
    if ((z80.regs.f & z80_base_1.Flag.S) === 0) {
        z80.regs.pc = z80.popWord();
        z80.regs.memptr = z80.regs.pc;
    }
});
decodeMapBASE.set(0xF1, (z80) => {
    z80.regs.af = z80.popWord();
});
decodeMapBASE.set(0xF2, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.S) === 0) {
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xF3, (z80) => {
    z80.regs.iff1 = 0;
    z80.regs.iff2 = 0;
});
decodeMapBASE.set(0xF4, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.S) === 0) {
        z80.incTStateCount(1);
        z80.pushWord(z80.regs.pc);
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xF5, (z80) => {
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.af);
});
decodeMapBASE.set(0xF6, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapBASE.set(0xF7, (z80) => {
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.pc);
    z80.regs.pc = 0x0030;
    z80.regs.memptr = z80.regs.pc;
});
decodeMapBASE.set(0xF8, (z80) => {
    z80.incTStateCount(1);
    if ((z80.regs.f & z80_base_1.Flag.S) !== 0) {
        z80.regs.pc = z80.popWord();
        z80.regs.memptr = z80.regs.pc;
    }
});
decodeMapBASE.set(0xF9, (z80) => {
    let value;
    value = z80.regs.hl;
    z80.incTStateCount(2);
    z80.regs.sp = value;
});
decodeMapBASE.set(0xFA, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.S) !== 0) {
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xFB, (z80) => {
    z80.regs.iff1 = 1;
    z80.regs.iff2 = 1;
});
decodeMapBASE.set(0xFC, (z80) => {
    z80.regs.memptr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.word(z80.readByte(z80.regs.pc), z80.regs.memptr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    if ((z80.regs.f & z80_base_1.Flag.S) !== 0) {
        z80.incTStateCount(1);
        z80.pushWord(z80.regs.pc);
        z80.regs.pc = z80.regs.memptr;
    }
});
decodeMapBASE.set(0xFD, (z80) => {
    decodeFD(z80);
});
decodeMapBASE.set(0xFE, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapBASE.set(0xFF, (z80) => {
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.pc);
    z80.regs.pc = 0x0038;
    z80.regs.memptr = z80.regs.pc;
});
const decodeMapCB = new Map();
decodeMapCB.set(0x00, (z80) => {
    let value;
    value = z80.regs.b;
    const oldValue = value;
    value = ((value << 1) | (value >> 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.b = value;
});
decodeMapCB.set(0x01, (z80) => {
    let value;
    value = z80.regs.c;
    const oldValue = value;
    value = ((value << 1) | (value >> 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.c = value;
});
decodeMapCB.set(0x02, (z80) => {
    let value;
    value = z80.regs.d;
    const oldValue = value;
    value = ((value << 1) | (value >> 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.d = value;
});
decodeMapCB.set(0x03, (z80) => {
    let value;
    value = z80.regs.e;
    const oldValue = value;
    value = ((value << 1) | (value >> 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.e = value;
});
decodeMapCB.set(0x04, (z80) => {
    let value;
    value = z80.regs.h;
    const oldValue = value;
    value = ((value << 1) | (value >> 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.h = value;
});
decodeMapCB.set(0x05, (z80) => {
    let value;
    value = z80.regs.l;
    const oldValue = value;
    value = ((value << 1) | (value >> 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.l = value;
});
decodeMapCB.set(0x06, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    const oldValue = value;
    value = ((value << 1) | (value >> 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.hl, value);
});
decodeMapCB.set(0x07, (z80) => {
    let value;
    value = z80.regs.a;
    const oldValue = value;
    value = ((value << 1) | (value >> 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.a = value;
});
decodeMapCB.set(0x08, (z80) => {
    let value;
    value = z80.regs.b;
    const oldValue = value;
    value = ((value >> 1) | (value << 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.b = value;
});
decodeMapCB.set(0x09, (z80) => {
    let value;
    value = z80.regs.c;
    const oldValue = value;
    value = ((value >> 1) | (value << 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.c = value;
});
decodeMapCB.set(0x0A, (z80) => {
    let value;
    value = z80.regs.d;
    const oldValue = value;
    value = ((value >> 1) | (value << 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.d = value;
});
decodeMapCB.set(0x0B, (z80) => {
    let value;
    value = z80.regs.e;
    const oldValue = value;
    value = ((value >> 1) | (value << 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.e = value;
});
decodeMapCB.set(0x0C, (z80) => {
    let value;
    value = z80.regs.h;
    const oldValue = value;
    value = ((value >> 1) | (value << 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.h = value;
});
decodeMapCB.set(0x0D, (z80) => {
    let value;
    value = z80.regs.l;
    const oldValue = value;
    value = ((value >> 1) | (value << 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.l = value;
});
decodeMapCB.set(0x0E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    const oldValue = value;
    value = ((value >> 1) | (value << 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.hl, value);
});
decodeMapCB.set(0x0F, (z80) => {
    let value;
    value = z80.regs.a;
    const oldValue = value;
    value = ((value >> 1) | (value << 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.a = value;
});
decodeMapCB.set(0x10, (z80) => {
    let value;
    value = z80.regs.b;
    const oldValue = value;
    value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.b = value;
});
decodeMapCB.set(0x11, (z80) => {
    let value;
    value = z80.regs.c;
    const oldValue = value;
    value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.c = value;
});
decodeMapCB.set(0x12, (z80) => {
    let value;
    value = z80.regs.d;
    const oldValue = value;
    value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.d = value;
});
decodeMapCB.set(0x13, (z80) => {
    let value;
    value = z80.regs.e;
    const oldValue = value;
    value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.e = value;
});
decodeMapCB.set(0x14, (z80) => {
    let value;
    value = z80.regs.h;
    const oldValue = value;
    value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.h = value;
});
decodeMapCB.set(0x15, (z80) => {
    let value;
    value = z80.regs.l;
    const oldValue = value;
    value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.l = value;
});
decodeMapCB.set(0x16, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    const oldValue = value;
    value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.hl, value);
});
decodeMapCB.set(0x17, (z80) => {
    let value;
    value = z80.regs.a;
    const oldValue = value;
    value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.a = value;
});
decodeMapCB.set(0x18, (z80) => {
    let value;
    value = z80.regs.b;
    const oldValue = value;
    value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.b = value;
});
decodeMapCB.set(0x19, (z80) => {
    let value;
    value = z80.regs.c;
    const oldValue = value;
    value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.c = value;
});
decodeMapCB.set(0x1A, (z80) => {
    let value;
    value = z80.regs.d;
    const oldValue = value;
    value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.d = value;
});
decodeMapCB.set(0x1B, (z80) => {
    let value;
    value = z80.regs.e;
    const oldValue = value;
    value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.e = value;
});
decodeMapCB.set(0x1C, (z80) => {
    let value;
    value = z80.regs.h;
    const oldValue = value;
    value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.h = value;
});
decodeMapCB.set(0x1D, (z80) => {
    let value;
    value = z80.regs.l;
    const oldValue = value;
    value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.l = value;
});
decodeMapCB.set(0x1E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    const oldValue = value;
    value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.hl, value);
});
decodeMapCB.set(0x1F, (z80) => {
    let value;
    value = z80.regs.a;
    const oldValue = value;
    value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.a = value;
});
decodeMapCB.set(0x20, (z80) => {
    let value;
    value = z80.regs.b;
    const oldValue = value;
    value = (value << 1) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.b = value;
});
decodeMapCB.set(0x21, (z80) => {
    let value;
    value = z80.regs.c;
    const oldValue = value;
    value = (value << 1) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.c = value;
});
decodeMapCB.set(0x22, (z80) => {
    let value;
    value = z80.regs.d;
    const oldValue = value;
    value = (value << 1) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.d = value;
});
decodeMapCB.set(0x23, (z80) => {
    let value;
    value = z80.regs.e;
    const oldValue = value;
    value = (value << 1) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.e = value;
});
decodeMapCB.set(0x24, (z80) => {
    let value;
    value = z80.regs.h;
    const oldValue = value;
    value = (value << 1) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.h = value;
});
decodeMapCB.set(0x25, (z80) => {
    let value;
    value = z80.regs.l;
    const oldValue = value;
    value = (value << 1) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.l = value;
});
decodeMapCB.set(0x26, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    const oldValue = value;
    value = (value << 1) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.hl, value);
});
decodeMapCB.set(0x27, (z80) => {
    let value;
    value = z80.regs.a;
    const oldValue = value;
    value = (value << 1) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.a = value;
});
decodeMapCB.set(0x28, (z80) => {
    let value;
    value = z80.regs.b;
    const oldValue = value;
    value = (value & 0x80) | (value >> 1);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.b = value;
});
decodeMapCB.set(0x29, (z80) => {
    let value;
    value = z80.regs.c;
    const oldValue = value;
    value = (value & 0x80) | (value >> 1);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.c = value;
});
decodeMapCB.set(0x2A, (z80) => {
    let value;
    value = z80.regs.d;
    const oldValue = value;
    value = (value & 0x80) | (value >> 1);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.d = value;
});
decodeMapCB.set(0x2B, (z80) => {
    let value;
    value = z80.regs.e;
    const oldValue = value;
    value = (value & 0x80) | (value >> 1);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.e = value;
});
decodeMapCB.set(0x2C, (z80) => {
    let value;
    value = z80.regs.h;
    const oldValue = value;
    value = (value & 0x80) | (value >> 1);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.h = value;
});
decodeMapCB.set(0x2D, (z80) => {
    let value;
    value = z80.regs.l;
    const oldValue = value;
    value = (value & 0x80) | (value >> 1);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.l = value;
});
decodeMapCB.set(0x2E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    const oldValue = value;
    value = (value & 0x80) | (value >> 1);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.hl, value);
});
decodeMapCB.set(0x2F, (z80) => {
    let value;
    value = z80.regs.a;
    const oldValue = value;
    value = (value & 0x80) | (value >> 1);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.a = value;
});
decodeMapCB.set(0x30, (z80) => {
    let value;
    value = z80.regs.b;
    const oldValue = value;
    value = ((value << 1) | 0x01) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.b = value;
});
decodeMapCB.set(0x31, (z80) => {
    let value;
    value = z80.regs.c;
    const oldValue = value;
    value = ((value << 1) | 0x01) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.c = value;
});
decodeMapCB.set(0x32, (z80) => {
    let value;
    value = z80.regs.d;
    const oldValue = value;
    value = ((value << 1) | 0x01) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.d = value;
});
decodeMapCB.set(0x33, (z80) => {
    let value;
    value = z80.regs.e;
    const oldValue = value;
    value = ((value << 1) | 0x01) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.e = value;
});
decodeMapCB.set(0x34, (z80) => {
    let value;
    value = z80.regs.h;
    const oldValue = value;
    value = ((value << 1) | 0x01) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.h = value;
});
decodeMapCB.set(0x35, (z80) => {
    let value;
    value = z80.regs.l;
    const oldValue = value;
    value = ((value << 1) | 0x01) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.l = value;
});
decodeMapCB.set(0x36, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    const oldValue = value;
    value = ((value << 1) | 0x01) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.hl, value);
});
decodeMapCB.set(0x37, (z80) => {
    let value;
    value = z80.regs.a;
    const oldValue = value;
    value = ((value << 1) | 0x01) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.a = value;
});
decodeMapCB.set(0x38, (z80) => {
    let value;
    value = z80.regs.b;
    const oldValue = value;
    value = value >> 1;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.b = value;
});
decodeMapCB.set(0x39, (z80) => {
    let value;
    value = z80.regs.c;
    const oldValue = value;
    value = value >> 1;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.c = value;
});
decodeMapCB.set(0x3A, (z80) => {
    let value;
    value = z80.regs.d;
    const oldValue = value;
    value = value >> 1;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.d = value;
});
decodeMapCB.set(0x3B, (z80) => {
    let value;
    value = z80.regs.e;
    const oldValue = value;
    value = value >> 1;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.e = value;
});
decodeMapCB.set(0x3C, (z80) => {
    let value;
    value = z80.regs.h;
    const oldValue = value;
    value = value >> 1;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.h = value;
});
decodeMapCB.set(0x3D, (z80) => {
    let value;
    value = z80.regs.l;
    const oldValue = value;
    value = value >> 1;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.l = value;
});
decodeMapCB.set(0x3E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    const oldValue = value;
    value = value >> 1;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.hl, value);
});
decodeMapCB.set(0x3F, (z80) => {
    let value;
    value = z80.regs.a;
    const oldValue = value;
    value = value >> 1;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.regs.a = value;
});
decodeMapCB.set(0x40, (z80) => {
    const value = z80.regs.b;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x01) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x41, (z80) => {
    const value = z80.regs.c;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x01) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x42, (z80) => {
    const value = z80.regs.d;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x01) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x43, (z80) => {
    const value = z80.regs.e;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x01) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x44, (z80) => {
    const value = z80.regs.h;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x01) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x45, (z80) => {
    const value = z80.regs.l;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x01) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x46, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x01) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x47, (z80) => {
    const value = z80.regs.a;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x01) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x48, (z80) => {
    const value = z80.regs.b;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x02) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x49, (z80) => {
    const value = z80.regs.c;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x02) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x4A, (z80) => {
    const value = z80.regs.d;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x02) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x4B, (z80) => {
    const value = z80.regs.e;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x02) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x4C, (z80) => {
    const value = z80.regs.h;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x02) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x4D, (z80) => {
    const value = z80.regs.l;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x02) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x4E, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x02) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x4F, (z80) => {
    const value = z80.regs.a;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x02) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x50, (z80) => {
    const value = z80.regs.b;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x04) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x51, (z80) => {
    const value = z80.regs.c;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x04) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x52, (z80) => {
    const value = z80.regs.d;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x04) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x53, (z80) => {
    const value = z80.regs.e;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x04) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x54, (z80) => {
    const value = z80.regs.h;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x04) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x55, (z80) => {
    const value = z80.regs.l;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x04) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x56, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x04) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x57, (z80) => {
    const value = z80.regs.a;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x04) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x58, (z80) => {
    const value = z80.regs.b;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x08) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x59, (z80) => {
    const value = z80.regs.c;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x08) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x5A, (z80) => {
    const value = z80.regs.d;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x08) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x5B, (z80) => {
    const value = z80.regs.e;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x08) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x5C, (z80) => {
    const value = z80.regs.h;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x08) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x5D, (z80) => {
    const value = z80.regs.l;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x08) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x5E, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x08) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x5F, (z80) => {
    const value = z80.regs.a;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x08) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x60, (z80) => {
    const value = z80.regs.b;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x10) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x61, (z80) => {
    const value = z80.regs.c;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x10) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x62, (z80) => {
    const value = z80.regs.d;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x10) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x63, (z80) => {
    const value = z80.regs.e;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x10) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x64, (z80) => {
    const value = z80.regs.h;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x10) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x65, (z80) => {
    const value = z80.regs.l;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x10) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x66, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x10) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x67, (z80) => {
    const value = z80.regs.a;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x10) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x68, (z80) => {
    const value = z80.regs.b;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x20) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x69, (z80) => {
    const value = z80.regs.c;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x20) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x6A, (z80) => {
    const value = z80.regs.d;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x20) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x6B, (z80) => {
    const value = z80.regs.e;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x20) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x6C, (z80) => {
    const value = z80.regs.h;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x20) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x6D, (z80) => {
    const value = z80.regs.l;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x20) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x6E, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x20) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x6F, (z80) => {
    const value = z80.regs.a;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x20) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x70, (z80) => {
    const value = z80.regs.b;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x40) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x71, (z80) => {
    const value = z80.regs.c;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x40) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x72, (z80) => {
    const value = z80.regs.d;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x40) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x73, (z80) => {
    const value = z80.regs.e;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x40) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x74, (z80) => {
    const value = z80.regs.h;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x40) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x75, (z80) => {
    const value = z80.regs.l;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x40) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x76, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x40) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x77, (z80) => {
    const value = z80.regs.a;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x40) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x78, (z80) => {
    const value = z80.regs.b;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x80) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    if ((value & 0x80) !== 0) {
        f |= z80_base_1.Flag.S;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x79, (z80) => {
    const value = z80.regs.c;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x80) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    if ((value & 0x80) !== 0) {
        f |= z80_base_1.Flag.S;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x7A, (z80) => {
    const value = z80.regs.d;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x80) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    if ((value & 0x80) !== 0) {
        f |= z80_base_1.Flag.S;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x7B, (z80) => {
    const value = z80.regs.e;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x80) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    if ((value & 0x80) !== 0) {
        f |= z80_base_1.Flag.S;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x7C, (z80) => {
    const value = z80.regs.h;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x80) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    if ((value & 0x80) !== 0) {
        f |= z80_base_1.Flag.S;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x7D, (z80) => {
    const value = z80.regs.l;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x80) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    if ((value & 0x80) !== 0) {
        f |= z80_base_1.Flag.S;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x7E, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x80) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    if ((value & 0x80) !== 0) {
        f |= z80_base_1.Flag.S;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x7F, (z80) => {
    const value = z80.regs.a;
    const hiddenValue = value;
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x80) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    if ((value & 0x80) !== 0) {
        f |= z80_base_1.Flag.S;
    }
    z80.regs.f = f;
});
decodeMapCB.set(0x80, (z80) => {
    z80.regs.b &= 0xFE;
});
decodeMapCB.set(0x81, (z80) => {
    z80.regs.c &= 0xFE;
});
decodeMapCB.set(0x82, (z80) => {
    z80.regs.d &= 0xFE;
});
decodeMapCB.set(0x83, (z80) => {
    z80.regs.e &= 0xFE;
});
decodeMapCB.set(0x84, (z80) => {
    z80.regs.h &= 0xFE;
});
decodeMapCB.set(0x85, (z80) => {
    z80.regs.l &= 0xFE;
});
decodeMapCB.set(0x86, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value & 0xFE);
});
decodeMapCB.set(0x87, (z80) => {
    z80.regs.a &= 0xFE;
});
decodeMapCB.set(0x88, (z80) => {
    z80.regs.b &= 0xFD;
});
decodeMapCB.set(0x89, (z80) => {
    z80.regs.c &= 0xFD;
});
decodeMapCB.set(0x8A, (z80) => {
    z80.regs.d &= 0xFD;
});
decodeMapCB.set(0x8B, (z80) => {
    z80.regs.e &= 0xFD;
});
decodeMapCB.set(0x8C, (z80) => {
    z80.regs.h &= 0xFD;
});
decodeMapCB.set(0x8D, (z80) => {
    z80.regs.l &= 0xFD;
});
decodeMapCB.set(0x8E, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value & 0xFD);
});
decodeMapCB.set(0x8F, (z80) => {
    z80.regs.a &= 0xFD;
});
decodeMapCB.set(0x90, (z80) => {
    z80.regs.b &= 0xFB;
});
decodeMapCB.set(0x91, (z80) => {
    z80.regs.c &= 0xFB;
});
decodeMapCB.set(0x92, (z80) => {
    z80.regs.d &= 0xFB;
});
decodeMapCB.set(0x93, (z80) => {
    z80.regs.e &= 0xFB;
});
decodeMapCB.set(0x94, (z80) => {
    z80.regs.h &= 0xFB;
});
decodeMapCB.set(0x95, (z80) => {
    z80.regs.l &= 0xFB;
});
decodeMapCB.set(0x96, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value & 0xFB);
});
decodeMapCB.set(0x97, (z80) => {
    z80.regs.a &= 0xFB;
});
decodeMapCB.set(0x98, (z80) => {
    z80.regs.b &= 0xF7;
});
decodeMapCB.set(0x99, (z80) => {
    z80.regs.c &= 0xF7;
});
decodeMapCB.set(0x9A, (z80) => {
    z80.regs.d &= 0xF7;
});
decodeMapCB.set(0x9B, (z80) => {
    z80.regs.e &= 0xF7;
});
decodeMapCB.set(0x9C, (z80) => {
    z80.regs.h &= 0xF7;
});
decodeMapCB.set(0x9D, (z80) => {
    z80.regs.l &= 0xF7;
});
decodeMapCB.set(0x9E, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value & 0xF7);
});
decodeMapCB.set(0x9F, (z80) => {
    z80.regs.a &= 0xF7;
});
decodeMapCB.set(0xA0, (z80) => {
    z80.regs.b &= 0xEF;
});
decodeMapCB.set(0xA1, (z80) => {
    z80.regs.c &= 0xEF;
});
decodeMapCB.set(0xA2, (z80) => {
    z80.regs.d &= 0xEF;
});
decodeMapCB.set(0xA3, (z80) => {
    z80.regs.e &= 0xEF;
});
decodeMapCB.set(0xA4, (z80) => {
    z80.regs.h &= 0xEF;
});
decodeMapCB.set(0xA5, (z80) => {
    z80.regs.l &= 0xEF;
});
decodeMapCB.set(0xA6, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value & 0xEF);
});
decodeMapCB.set(0xA7, (z80) => {
    z80.regs.a &= 0xEF;
});
decodeMapCB.set(0xA8, (z80) => {
    z80.regs.b &= 0xDF;
});
decodeMapCB.set(0xA9, (z80) => {
    z80.regs.c &= 0xDF;
});
decodeMapCB.set(0xAA, (z80) => {
    z80.regs.d &= 0xDF;
});
decodeMapCB.set(0xAB, (z80) => {
    z80.regs.e &= 0xDF;
});
decodeMapCB.set(0xAC, (z80) => {
    z80.regs.h &= 0xDF;
});
decodeMapCB.set(0xAD, (z80) => {
    z80.regs.l &= 0xDF;
});
decodeMapCB.set(0xAE, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value & 0xDF);
});
decodeMapCB.set(0xAF, (z80) => {
    z80.regs.a &= 0xDF;
});
decodeMapCB.set(0xB0, (z80) => {
    z80.regs.b &= 0xBF;
});
decodeMapCB.set(0xB1, (z80) => {
    z80.regs.c &= 0xBF;
});
decodeMapCB.set(0xB2, (z80) => {
    z80.regs.d &= 0xBF;
});
decodeMapCB.set(0xB3, (z80) => {
    z80.regs.e &= 0xBF;
});
decodeMapCB.set(0xB4, (z80) => {
    z80.regs.h &= 0xBF;
});
decodeMapCB.set(0xB5, (z80) => {
    z80.regs.l &= 0xBF;
});
decodeMapCB.set(0xB6, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value & 0xBF);
});
decodeMapCB.set(0xB7, (z80) => {
    z80.regs.a &= 0xBF;
});
decodeMapCB.set(0xB8, (z80) => {
    z80.regs.b &= 0x7F;
});
decodeMapCB.set(0xB9, (z80) => {
    z80.regs.c &= 0x7F;
});
decodeMapCB.set(0xBA, (z80) => {
    z80.regs.d &= 0x7F;
});
decodeMapCB.set(0xBB, (z80) => {
    z80.regs.e &= 0x7F;
});
decodeMapCB.set(0xBC, (z80) => {
    z80.regs.h &= 0x7F;
});
decodeMapCB.set(0xBD, (z80) => {
    z80.regs.l &= 0x7F;
});
decodeMapCB.set(0xBE, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value & 0x7F);
});
decodeMapCB.set(0xBF, (z80) => {
    z80.regs.a &= 0x7F;
});
decodeMapCB.set(0xC0, (z80) => {
    z80.regs.b |= 0x01;
});
decodeMapCB.set(0xC1, (z80) => {
    z80.regs.c |= 0x01;
});
decodeMapCB.set(0xC2, (z80) => {
    z80.regs.d |= 0x01;
});
decodeMapCB.set(0xC3, (z80) => {
    z80.regs.e |= 0x01;
});
decodeMapCB.set(0xC4, (z80) => {
    z80.regs.h |= 0x01;
});
decodeMapCB.set(0xC5, (z80) => {
    z80.regs.l |= 0x01;
});
decodeMapCB.set(0xC6, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value | 0x01);
});
decodeMapCB.set(0xC7, (z80) => {
    z80.regs.a |= 0x01;
});
decodeMapCB.set(0xC8, (z80) => {
    z80.regs.b |= 0x02;
});
decodeMapCB.set(0xC9, (z80) => {
    z80.regs.c |= 0x02;
});
decodeMapCB.set(0xCA, (z80) => {
    z80.regs.d |= 0x02;
});
decodeMapCB.set(0xCB, (z80) => {
    z80.regs.e |= 0x02;
});
decodeMapCB.set(0xCC, (z80) => {
    z80.regs.h |= 0x02;
});
decodeMapCB.set(0xCD, (z80) => {
    z80.regs.l |= 0x02;
});
decodeMapCB.set(0xCE, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value | 0x02);
});
decodeMapCB.set(0xCF, (z80) => {
    z80.regs.a |= 0x02;
});
decodeMapCB.set(0xD0, (z80) => {
    z80.regs.b |= 0x04;
});
decodeMapCB.set(0xD1, (z80) => {
    z80.regs.c |= 0x04;
});
decodeMapCB.set(0xD2, (z80) => {
    z80.regs.d |= 0x04;
});
decodeMapCB.set(0xD3, (z80) => {
    z80.regs.e |= 0x04;
});
decodeMapCB.set(0xD4, (z80) => {
    z80.regs.h |= 0x04;
});
decodeMapCB.set(0xD5, (z80) => {
    z80.regs.l |= 0x04;
});
decodeMapCB.set(0xD6, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value | 0x04);
});
decodeMapCB.set(0xD7, (z80) => {
    z80.regs.a |= 0x04;
});
decodeMapCB.set(0xD8, (z80) => {
    z80.regs.b |= 0x08;
});
decodeMapCB.set(0xD9, (z80) => {
    z80.regs.c |= 0x08;
});
decodeMapCB.set(0xDA, (z80) => {
    z80.regs.d |= 0x08;
});
decodeMapCB.set(0xDB, (z80) => {
    z80.regs.e |= 0x08;
});
decodeMapCB.set(0xDC, (z80) => {
    z80.regs.h |= 0x08;
});
decodeMapCB.set(0xDD, (z80) => {
    z80.regs.l |= 0x08;
});
decodeMapCB.set(0xDE, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value | 0x08);
});
decodeMapCB.set(0xDF, (z80) => {
    z80.regs.a |= 0x08;
});
decodeMapCB.set(0xE0, (z80) => {
    z80.regs.b |= 0x10;
});
decodeMapCB.set(0xE1, (z80) => {
    z80.regs.c |= 0x10;
});
decodeMapCB.set(0xE2, (z80) => {
    z80.regs.d |= 0x10;
});
decodeMapCB.set(0xE3, (z80) => {
    z80.regs.e |= 0x10;
});
decodeMapCB.set(0xE4, (z80) => {
    z80.regs.h |= 0x10;
});
decodeMapCB.set(0xE5, (z80) => {
    z80.regs.l |= 0x10;
});
decodeMapCB.set(0xE6, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value | 0x10);
});
decodeMapCB.set(0xE7, (z80) => {
    z80.regs.a |= 0x10;
});
decodeMapCB.set(0xE8, (z80) => {
    z80.regs.b |= 0x20;
});
decodeMapCB.set(0xE9, (z80) => {
    z80.regs.c |= 0x20;
});
decodeMapCB.set(0xEA, (z80) => {
    z80.regs.d |= 0x20;
});
decodeMapCB.set(0xEB, (z80) => {
    z80.regs.e |= 0x20;
});
decodeMapCB.set(0xEC, (z80) => {
    z80.regs.h |= 0x20;
});
decodeMapCB.set(0xED, (z80) => {
    z80.regs.l |= 0x20;
});
decodeMapCB.set(0xEE, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value | 0x20);
});
decodeMapCB.set(0xEF, (z80) => {
    z80.regs.a |= 0x20;
});
decodeMapCB.set(0xF0, (z80) => {
    z80.regs.b |= 0x40;
});
decodeMapCB.set(0xF1, (z80) => {
    z80.regs.c |= 0x40;
});
decodeMapCB.set(0xF2, (z80) => {
    z80.regs.d |= 0x40;
});
decodeMapCB.set(0xF3, (z80) => {
    z80.regs.e |= 0x40;
});
decodeMapCB.set(0xF4, (z80) => {
    z80.regs.h |= 0x40;
});
decodeMapCB.set(0xF5, (z80) => {
    z80.regs.l |= 0x40;
});
decodeMapCB.set(0xF6, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value | 0x40);
});
decodeMapCB.set(0xF7, (z80) => {
    z80.regs.a |= 0x40;
});
decodeMapCB.set(0xF8, (z80) => {
    z80.regs.b |= 0x80;
});
decodeMapCB.set(0xF9, (z80) => {
    z80.regs.c |= 0x80;
});
decodeMapCB.set(0xFA, (z80) => {
    z80.regs.d |= 0x80;
});
decodeMapCB.set(0xFB, (z80) => {
    z80.regs.e |= 0x80;
});
decodeMapCB.set(0xFC, (z80) => {
    z80.regs.h |= 0x80;
});
decodeMapCB.set(0xFD, (z80) => {
    z80.regs.l |= 0x80;
});
decodeMapCB.set(0xFE, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.hl, value | 0x80);
});
decodeMapCB.set(0xFF, (z80) => {
    z80.regs.a |= 0x80;
});
const decodeMapDD = new Map();
decodeMapDD.set(0x09, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.bc;
    let result = z80.regs.ix + value;
    const lookup = (((z80.regs.ix & 0x0800) >> 11) |
        ((value & 0x0800) >> 10) |
        ((result & 0x0800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.ix);
    z80.regs.ix = result & 0xFFFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.V | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | halfCarryAddTable[lookup];
});
decodeMapDD.set(0x19, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.de;
    let result = z80.regs.ix + value;
    const lookup = (((z80.regs.ix & 0x0800) >> 11) |
        ((value & 0x0800) >> 10) |
        ((result & 0x0800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.ix);
    z80.regs.ix = result & 0xFFFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.V | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | halfCarryAddTable[lookup];
});
decodeMapDD.set(0x21, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80_base_1.word(z80.readByte(z80.regs.pc), value);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.ix = value;
});
decodeMapDD.set(0x22, (z80) => {
    let value;
    value = z80.regs.ix;
    let addr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    addr = z80_base_1.word(z80.readByte(z80.regs.pc), addr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.writeByte(addr, z80_base_1.lo(value));
    addr = z80_base_1.inc16(addr);
    z80.regs.memptr = addr;
    z80.writeByte(addr, z80_base_1.hi(value));
});
decodeMapDD.set(0x23, (z80) => {
    let value;
    value = z80.regs.ix;
    const oldValue = value;
    z80.incTStateCount(2);
    value = z80_base_1.inc16(value);
    z80.regs.ix = value;
});
decodeMapDD.set(0x24, (z80) => {
    let value;
    value = z80.regs.ixh;
    const oldValue = value;
    value = z80_base_1.inc8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x80 ? z80_base_1.Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80.sz53Table[value];
    z80.regs.ixh = value;
});
decodeMapDD.set(0x25, (z80) => {
    let value;
    value = z80.regs.ixh;
    const oldValue = value;
    value = z80_base_1.dec8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x7F ? z80_base_1.Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80_base_1.Flag.N | z80.sz53Table[value];
    z80.regs.ixh = value;
});
decodeMapDD.set(0x26, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.ixh = value;
});
decodeMapDD.set(0x29, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.ix;
    let result = z80.regs.ix + value;
    const lookup = (((z80.regs.ix & 0x0800) >> 11) |
        ((value & 0x0800) >> 10) |
        ((result & 0x0800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.ix);
    z80.regs.ix = result & 0xFFFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.V | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | halfCarryAddTable[lookup];
});
decodeMapDD.set(0x2A, (z80) => {
    let value;
    let addr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    addr = z80_base_1.word(z80.readByte(z80.regs.pc), addr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80.readByte(addr);
    z80.regs.memptr = z80_base_1.inc16(addr);
    value = z80_base_1.word(z80.readByte(z80.regs.memptr), value);
    z80.regs.ix = value;
});
decodeMapDD.set(0x2B, (z80) => {
    let value;
    value = z80.regs.ix;
    const oldValue = value;
    z80.incTStateCount(2);
    value = z80_base_1.dec16(value);
    z80.regs.ix = value;
});
decodeMapDD.set(0x2C, (z80) => {
    let value;
    value = z80.regs.ixl;
    const oldValue = value;
    value = z80_base_1.inc8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x80 ? z80_base_1.Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80.sz53Table[value];
    z80.regs.ixl = value;
});
decodeMapDD.set(0x2D, (z80) => {
    let value;
    value = z80.regs.ixl;
    const oldValue = value;
    value = z80_base_1.dec8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x7F ? z80_base_1.Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80_base_1.Flag.N | z80.sz53Table[value];
    z80.regs.ixl = value;
});
decodeMapDD.set(0x2E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.ixl = value;
});
decodeMapDD.set(0x34, (z80) => {
    let value;
    const offset = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.add16(z80.regs.ix, z80_base_1.signedByte(offset));
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = z80_base_1.inc8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x80 ? z80_base_1.Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80.sz53Table[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDD.set(0x35, (z80) => {
    let value;
    const offset = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.add16(z80.regs.ix, z80_base_1.signedByte(offset));
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = z80_base_1.dec8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x7F ? z80_base_1.Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80_base_1.Flag.N | z80.sz53Table[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDD.set(0x36, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(2);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDD.set(0x39, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.sp;
    let result = z80.regs.ix + value;
    const lookup = (((z80.regs.ix & 0x0800) >> 11) |
        ((value & 0x0800) >> 10) |
        ((result & 0x0800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.ix);
    z80.regs.ix = result & 0xFFFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.V | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | halfCarryAddTable[lookup];
});
decodeMapDD.set(0x44, (z80) => {
    let value;
    value = z80.regs.ixh;
    z80.regs.b = value;
});
decodeMapDD.set(0x45, (z80) => {
    let value;
    value = z80.regs.ixl;
    z80.regs.b = value;
});
decodeMapDD.set(0x46, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.b = value;
});
decodeMapDD.set(0x4C, (z80) => {
    let value;
    value = z80.regs.ixh;
    z80.regs.c = value;
});
decodeMapDD.set(0x4D, (z80) => {
    let value;
    value = z80.regs.ixl;
    z80.regs.c = value;
});
decodeMapDD.set(0x4E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.c = value;
});
decodeMapDD.set(0x54, (z80) => {
    let value;
    value = z80.regs.ixh;
    z80.regs.d = value;
});
decodeMapDD.set(0x55, (z80) => {
    let value;
    value = z80.regs.ixl;
    z80.regs.d = value;
});
decodeMapDD.set(0x56, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.d = value;
});
decodeMapDD.set(0x5C, (z80) => {
    let value;
    value = z80.regs.ixh;
    z80.regs.e = value;
});
decodeMapDD.set(0x5D, (z80) => {
    let value;
    value = z80.regs.ixl;
    z80.regs.e = value;
});
decodeMapDD.set(0x5E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.e = value;
});
decodeMapDD.set(0x60, (z80) => {
    let value;
    value = z80.regs.b;
    z80.regs.ixh = value;
});
decodeMapDD.set(0x61, (z80) => {
    let value;
    value = z80.regs.c;
    z80.regs.ixh = value;
});
decodeMapDD.set(0x62, (z80) => {
    let value;
    value = z80.regs.d;
    z80.regs.ixh = value;
});
decodeMapDD.set(0x63, (z80) => {
    let value;
    value = z80.regs.e;
    z80.regs.ixh = value;
});
decodeMapDD.set(0x64, (z80) => {
    let value;
    value = z80.regs.ixh;
    z80.regs.ixh = value;
});
decodeMapDD.set(0x65, (z80) => {
    let value;
    value = z80.regs.ixl;
    z80.regs.ixh = value;
});
decodeMapDD.set(0x66, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.h = value;
});
decodeMapDD.set(0x67, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.ixh = value;
});
decodeMapDD.set(0x68, (z80) => {
    let value;
    value = z80.regs.b;
    z80.regs.ixl = value;
});
decodeMapDD.set(0x69, (z80) => {
    let value;
    value = z80.regs.c;
    z80.regs.ixl = value;
});
decodeMapDD.set(0x6A, (z80) => {
    let value;
    value = z80.regs.d;
    z80.regs.ixl = value;
});
decodeMapDD.set(0x6B, (z80) => {
    let value;
    value = z80.regs.e;
    z80.regs.ixl = value;
});
decodeMapDD.set(0x6C, (z80) => {
    let value;
    value = z80.regs.ixh;
    z80.regs.ixl = value;
});
decodeMapDD.set(0x6D, (z80) => {
    let value;
    value = z80.regs.ixl;
    z80.regs.ixl = value;
});
decodeMapDD.set(0x6E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.l = value;
});
decodeMapDD.set(0x6F, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.ixl = value;
});
decodeMapDD.set(0x70, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.regs.b;
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDD.set(0x71, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.regs.c;
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDD.set(0x72, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.regs.d;
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDD.set(0x73, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.regs.e;
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDD.set(0x74, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.regs.h;
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDD.set(0x75, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.regs.l;
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDD.set(0x77, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.regs.a;
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDD.set(0x7C, (z80) => {
    let value;
    value = z80.regs.ixh;
    z80.regs.a = value;
});
decodeMapDD.set(0x7D, (z80) => {
    let value;
    value = z80.regs.ixl;
    z80.regs.a = value;
});
decodeMapDD.set(0x7E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.a = value;
});
decodeMapDD.set(0x84, (z80) => {
    let value;
    value = z80.regs.ixh;
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapDD.set(0x85, (z80) => {
    let value;
    value = z80.regs.ixl;
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapDD.set(0x86, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapDD.set(0x8C, (z80) => {
    let value;
    value = z80.regs.ixh;
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapDD.set(0x8D, (z80) => {
    let value;
    value = z80.regs.ixl;
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapDD.set(0x8E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapDD.set(0x94, (z80) => {
    let value;
    value = z80.regs.ixh;
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapDD.set(0x95, (z80) => {
    let value;
    value = z80.regs.ixl;
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapDD.set(0x96, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapDD.set(0x9C, (z80) => {
    let value;
    value = z80.regs.ixh;
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapDD.set(0x9D, (z80) => {
    let value;
    value = z80.regs.ixl;
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapDD.set(0x9E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapDD.set(0xA4, (z80) => {
    let value;
    value = z80.regs.ixh;
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapDD.set(0xA5, (z80) => {
    let value;
    value = z80.regs.ixl;
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapDD.set(0xA6, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapDD.set(0xAC, (z80) => {
    let value;
    value = z80.regs.ixh;
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapDD.set(0xAD, (z80) => {
    let value;
    value = z80.regs.ixl;
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapDD.set(0xAE, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapDD.set(0xB4, (z80) => {
    let value;
    value = z80.regs.ixh;
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapDD.set(0xB5, (z80) => {
    let value;
    value = z80.regs.ixl;
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapDD.set(0xB6, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapDD.set(0xBC, (z80) => {
    let value;
    value = z80.regs.ixh;
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapDD.set(0xBD, (z80) => {
    let value;
    value = z80.regs.ixl;
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapDD.set(0xBE, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.ix + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapDD.set(0xCB, (z80) => {
    decodeDDCB(z80);
});
decodeMapDD.set(0xE1, (z80) => {
    z80.regs.ix = z80.popWord();
});
decodeMapDD.set(0xE3, (z80) => {
    const rightValue = z80.regs.ix;
    const leftValueL = z80.readByte(z80.regs.sp);
    const leftValueH = z80.readByte(z80_base_1.inc16(z80.regs.sp));
    z80.incTStateCount(1);
    z80.writeByte(z80_base_1.inc16(z80.regs.sp), z80_base_1.hi(rightValue));
    z80.writeByte(z80.regs.sp, z80_base_1.lo(rightValue));
    z80.incTStateCount(2);
    z80.regs.memptr = z80_base_1.word(leftValueH, leftValueL);
    z80.regs.ix = z80_base_1.word(leftValueH, leftValueL);
});
decodeMapDD.set(0xE5, (z80) => {
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.ix);
});
decodeMapDD.set(0xE9, (z80) => {
    z80.regs.pc = z80.regs.ix;
});
decodeMapDD.set(0xF9, (z80) => {
    let value;
    value = z80.regs.ix;
    z80.incTStateCount(2);
    z80.regs.sp = value;
});
const decodeMapDDCB = new Map();
decodeMapDDCB.set(0x00, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = ((value << 1) | (value >> 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0x01, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = ((value << 1) | (value >> 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0x02, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = ((value << 1) | (value >> 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0x03, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = ((value << 1) | (value >> 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0x04, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = ((value << 1) | (value >> 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0x05, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = ((value << 1) | (value >> 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0x06, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = ((value << 1) | (value >> 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDDCB.set(0x07, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = ((value << 1) | (value >> 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0x08, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = ((value >> 1) | (value << 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0x09, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = ((value >> 1) | (value << 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0x0A, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = ((value >> 1) | (value << 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0x0B, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = ((value >> 1) | (value << 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0x0C, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = ((value >> 1) | (value << 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0x0D, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = ((value >> 1) | (value << 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0x0E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = ((value >> 1) | (value << 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDDCB.set(0x0F, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = ((value >> 1) | (value << 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0x10, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0x11, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0x12, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0x13, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0x14, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0x15, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0x16, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDDCB.set(0x17, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0x18, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0x19, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0x1A, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0x1B, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0x1C, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0x1D, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0x1E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDDCB.set(0x1F, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0x20, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = (value << 1) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0x21, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = (value << 1) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0x22, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = (value << 1) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0x23, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = (value << 1) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0x24, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = (value << 1) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0x25, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = (value << 1) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0x26, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = (value << 1) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDDCB.set(0x27, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = (value << 1) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0x28, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = (value & 0x80) | (value >> 1);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0x29, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = (value & 0x80) | (value >> 1);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0x2A, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = (value & 0x80) | (value >> 1);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0x2B, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = (value & 0x80) | (value >> 1);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0x2C, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = (value & 0x80) | (value >> 1);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0x2D, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = (value & 0x80) | (value >> 1);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0x2E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = (value & 0x80) | (value >> 1);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDDCB.set(0x2F, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = (value & 0x80) | (value >> 1);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0x30, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = ((value << 1) | 0x01) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0x31, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = ((value << 1) | 0x01) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0x32, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = ((value << 1) | 0x01) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0x33, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = ((value << 1) | 0x01) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0x34, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = ((value << 1) | 0x01) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0x35, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = ((value << 1) | 0x01) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0x36, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = ((value << 1) | 0x01) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDDCB.set(0x37, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = ((value << 1) | 0x01) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0x38, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = value >> 1;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0x39, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = value >> 1;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0x3A, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = value >> 1;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0x3B, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = value >> 1;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0x3C, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = value >> 1;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0x3D, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = value >> 1;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0x3E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = value >> 1;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapDDCB.set(0x3F, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = value >> 1;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0x47, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x01) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapDDCB.set(0x40, decodeMapDDCB.get(0x47));
decodeMapDDCB.set(0x41, decodeMapDDCB.get(0x47));
decodeMapDDCB.set(0x42, decodeMapDDCB.get(0x47));
decodeMapDDCB.set(0x43, decodeMapDDCB.get(0x47));
decodeMapDDCB.set(0x44, decodeMapDDCB.get(0x47));
decodeMapDDCB.set(0x45, decodeMapDDCB.get(0x47));
decodeMapDDCB.set(0x46, decodeMapDDCB.get(0x47));
decodeMapDDCB.set(0x4F, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x02) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapDDCB.set(0x48, decodeMapDDCB.get(0x4F));
decodeMapDDCB.set(0x49, decodeMapDDCB.get(0x4F));
decodeMapDDCB.set(0x4A, decodeMapDDCB.get(0x4F));
decodeMapDDCB.set(0x4B, decodeMapDDCB.get(0x4F));
decodeMapDDCB.set(0x4C, decodeMapDDCB.get(0x4F));
decodeMapDDCB.set(0x4D, decodeMapDDCB.get(0x4F));
decodeMapDDCB.set(0x4E, decodeMapDDCB.get(0x4F));
decodeMapDDCB.set(0x57, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x04) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapDDCB.set(0x50, decodeMapDDCB.get(0x57));
decodeMapDDCB.set(0x51, decodeMapDDCB.get(0x57));
decodeMapDDCB.set(0x52, decodeMapDDCB.get(0x57));
decodeMapDDCB.set(0x53, decodeMapDDCB.get(0x57));
decodeMapDDCB.set(0x54, decodeMapDDCB.get(0x57));
decodeMapDDCB.set(0x55, decodeMapDDCB.get(0x57));
decodeMapDDCB.set(0x56, decodeMapDDCB.get(0x57));
decodeMapDDCB.set(0x5F, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x08) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapDDCB.set(0x58, decodeMapDDCB.get(0x5F));
decodeMapDDCB.set(0x59, decodeMapDDCB.get(0x5F));
decodeMapDDCB.set(0x5A, decodeMapDDCB.get(0x5F));
decodeMapDDCB.set(0x5B, decodeMapDDCB.get(0x5F));
decodeMapDDCB.set(0x5C, decodeMapDDCB.get(0x5F));
decodeMapDDCB.set(0x5D, decodeMapDDCB.get(0x5F));
decodeMapDDCB.set(0x5E, decodeMapDDCB.get(0x5F));
decodeMapDDCB.set(0x67, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x10) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapDDCB.set(0x60, decodeMapDDCB.get(0x67));
decodeMapDDCB.set(0x61, decodeMapDDCB.get(0x67));
decodeMapDDCB.set(0x62, decodeMapDDCB.get(0x67));
decodeMapDDCB.set(0x63, decodeMapDDCB.get(0x67));
decodeMapDDCB.set(0x64, decodeMapDDCB.get(0x67));
decodeMapDDCB.set(0x65, decodeMapDDCB.get(0x67));
decodeMapDDCB.set(0x66, decodeMapDDCB.get(0x67));
decodeMapDDCB.set(0x6F, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x20) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapDDCB.set(0x68, decodeMapDDCB.get(0x6F));
decodeMapDDCB.set(0x69, decodeMapDDCB.get(0x6F));
decodeMapDDCB.set(0x6A, decodeMapDDCB.get(0x6F));
decodeMapDDCB.set(0x6B, decodeMapDDCB.get(0x6F));
decodeMapDDCB.set(0x6C, decodeMapDDCB.get(0x6F));
decodeMapDDCB.set(0x6D, decodeMapDDCB.get(0x6F));
decodeMapDDCB.set(0x6E, decodeMapDDCB.get(0x6F));
decodeMapDDCB.set(0x77, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x40) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapDDCB.set(0x70, decodeMapDDCB.get(0x77));
decodeMapDDCB.set(0x71, decodeMapDDCB.get(0x77));
decodeMapDDCB.set(0x72, decodeMapDDCB.get(0x77));
decodeMapDDCB.set(0x73, decodeMapDDCB.get(0x77));
decodeMapDDCB.set(0x74, decodeMapDDCB.get(0x77));
decodeMapDDCB.set(0x75, decodeMapDDCB.get(0x77));
decodeMapDDCB.set(0x76, decodeMapDDCB.get(0x77));
decodeMapDDCB.set(0x7F, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x80) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    if ((value & 0x80) !== 0) {
        f |= z80_base_1.Flag.S;
    }
    z80.regs.f = f;
});
decodeMapDDCB.set(0x78, decodeMapDDCB.get(0x7F));
decodeMapDDCB.set(0x79, decodeMapDDCB.get(0x7F));
decodeMapDDCB.set(0x7A, decodeMapDDCB.get(0x7F));
decodeMapDDCB.set(0x7B, decodeMapDDCB.get(0x7F));
decodeMapDDCB.set(0x7C, decodeMapDDCB.get(0x7F));
decodeMapDDCB.set(0x7D, decodeMapDDCB.get(0x7F));
decodeMapDDCB.set(0x7E, decodeMapDDCB.get(0x7F));
decodeMapDDCB.set(0x80, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0xFE;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0x81, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0xFE;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0x82, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0xFE;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0x83, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0xFE;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0x84, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0xFE;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0x85, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0xFE;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0x86, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0xFE);
});
decodeMapDDCB.set(0x87, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0xFE;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0x88, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0xFD;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0x89, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0xFD;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0x8A, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0xFD;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0x8B, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0xFD;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0x8C, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0xFD;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0x8D, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0xFD;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0x8E, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0xFD);
});
decodeMapDDCB.set(0x8F, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0xFD;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0x90, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0xFB;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0x91, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0xFB;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0x92, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0xFB;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0x93, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0xFB;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0x94, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0xFB;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0x95, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0xFB;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0x96, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0xFB);
});
decodeMapDDCB.set(0x97, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0xFB;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0x98, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0xF7;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0x99, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0xF7;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0x9A, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0xF7;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0x9B, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0xF7;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0x9C, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0xF7;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0x9D, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0xF7;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0x9E, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0xF7);
});
decodeMapDDCB.set(0x9F, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0xF7;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0xA0, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0xEF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0xA1, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0xEF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0xA2, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0xEF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0xA3, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0xEF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0xA4, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0xEF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0xA5, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0xEF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0xA6, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0xEF);
});
decodeMapDDCB.set(0xA7, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0xEF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0xA8, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0xDF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0xA9, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0xDF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0xAA, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0xDF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0xAB, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0xDF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0xAC, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0xDF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0xAD, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0xDF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0xAE, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0xDF);
});
decodeMapDDCB.set(0xAF, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0xDF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0xB0, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0xBF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0xB1, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0xBF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0xB2, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0xBF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0xB3, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0xBF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0xB4, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0xBF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0xB5, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0xBF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0xB6, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0xBF);
});
decodeMapDDCB.set(0xB7, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0xBF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0xB8, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0x7F;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0xB9, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0x7F;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0xBA, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0x7F;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0xBB, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0x7F;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0xBC, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0x7F;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0xBD, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0x7F;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0xBE, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0x7F);
});
decodeMapDDCB.set(0xBF, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0x7F;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0xC0, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x01;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0xC1, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x01;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0xC2, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x01;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0xC3, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x01;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0xC4, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x01;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0xC5, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x01;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0xC6, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x01);
});
decodeMapDDCB.set(0xC7, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x01;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0xC8, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x02;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0xC9, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x02;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0xCA, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x02;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0xCB, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x02;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0xCC, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x02;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0xCD, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x02;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0xCE, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x02);
});
decodeMapDDCB.set(0xCF, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x02;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0xD0, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x04;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0xD1, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x04;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0xD2, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x04;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0xD3, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x04;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0xD4, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x04;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0xD5, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x04;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0xD6, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x04);
});
decodeMapDDCB.set(0xD7, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x04;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0xD8, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x08;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0xD9, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x08;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0xDA, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x08;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0xDB, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x08;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0xDC, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x08;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0xDD, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x08;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0xDE, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x08);
});
decodeMapDDCB.set(0xDF, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x08;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0xE0, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x10;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0xE1, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x10;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0xE2, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x10;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0xE3, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x10;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0xE4, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x10;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0xE5, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x10;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0xE6, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x10);
});
decodeMapDDCB.set(0xE7, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x10;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0xE8, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x20;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0xE9, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x20;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0xEA, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x20;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0xEB, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x20;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0xEC, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x20;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0xED, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x20;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0xEE, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x20);
});
decodeMapDDCB.set(0xEF, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x20;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0xF0, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x40;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0xF1, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x40;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0xF2, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x40;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0xF3, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x40;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0xF4, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x40;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0xF5, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x40;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0xF6, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x40);
});
decodeMapDDCB.set(0xF7, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x40;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapDDCB.set(0xF8, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x80;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapDDCB.set(0xF9, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x80;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapDDCB.set(0xFA, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x80;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapDDCB.set(0xFB, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x80;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapDDCB.set(0xFC, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x80;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapDDCB.set(0xFD, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x80;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapDDCB.set(0xFE, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x80);
});
decodeMapDDCB.set(0xFF, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x80;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
const decodeMapED = new Map();
decodeMapED.set(0x40, (z80) => {
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
    z80.regs.b = z80.readPort(z80.regs.bc);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | z80.sz53pTable[z80.regs.b];
});
decodeMapED.set(0x41, (z80) => {
    z80.writePort(z80.regs.bc, z80.regs.b);
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
});
decodeMapED.set(0x42, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.bc;
    let result = z80.regs.hl - value;
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result -= 1;
    }
    const lookup = (((z80.regs.hl & 0x8800) >> 11) |
        ((value & 0x8800) >> 10) |
        ((result & 0x8800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.hl);
    z80.regs.hl = result & 0xFFFF;
    z80.regs.f = ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | overflowSubTable[lookup >> 4] | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5 | z80_base_1.Flag.S)) | halfCarrySubTable[lookup & 0x07] | (result !== 0 ? 0 : z80_base_1.Flag.Z);
});
decodeMapED.set(0x43, (z80) => {
    let value;
    value = z80.regs.bc;
    let addr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    addr = z80_base_1.word(z80.readByte(z80.regs.pc), addr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.writeByte(addr, z80_base_1.lo(value));
    addr = z80_base_1.inc16(addr);
    z80.regs.memptr = addr;
    z80.writeByte(addr, z80_base_1.hi(value));
});
decodeMapED.set(0x7C, (z80) => {
    const value = z80.regs.a;
    z80.regs.a = 0;
    const diff = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    z80.regs.a = diff;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= z80.sz53Table[z80.regs.a];
    z80.regs.f = f;
});
decodeMapED.set(0x44, decodeMapED.get(0x7C));
decodeMapED.set(0x4C, decodeMapED.get(0x7C));
decodeMapED.set(0x54, decodeMapED.get(0x7C));
decodeMapED.set(0x5C, decodeMapED.get(0x7C));
decodeMapED.set(0x64, decodeMapED.get(0x7C));
decodeMapED.set(0x6C, decodeMapED.get(0x7C));
decodeMapED.set(0x74, decodeMapED.get(0x7C));
decodeMapED.set(0x7D, (z80) => {
    z80.regs.iff1 = z80.regs.iff2;
    z80.regs.pc = z80.popWord();
    z80.regs.memptr = z80.regs.pc;
});
decodeMapED.set(0x45, decodeMapED.get(0x7D));
decodeMapED.set(0x55, decodeMapED.get(0x7D));
decodeMapED.set(0x5D, decodeMapED.get(0x7D));
decodeMapED.set(0x65, decodeMapED.get(0x7D));
decodeMapED.set(0x6D, decodeMapED.get(0x7D));
decodeMapED.set(0x75, decodeMapED.get(0x7D));
decodeMapED.set(0x6E, (z80) => {
    z80.regs.im = 0;
});
decodeMapED.set(0x46, decodeMapED.get(0x6E));
decodeMapED.set(0x4E, decodeMapED.get(0x6E));
decodeMapED.set(0x66, decodeMapED.get(0x6E));
decodeMapED.set(0x47, (z80) => {
    let value;
    value = z80.regs.a;
    z80.incTStateCount(1);
    z80.regs.i = value;
});
decodeMapED.set(0x48, (z80) => {
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
    z80.regs.c = z80.readPort(z80.regs.bc);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | z80.sz53pTable[z80.regs.c];
});
decodeMapED.set(0x49, (z80) => {
    z80.writePort(z80.regs.bc, z80.regs.c);
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
});
decodeMapED.set(0x4A, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.bc;
    let result = z80.regs.hl + value;
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result += 1;
    }
    const lookup = (((z80.regs.hl & 0x8800) >> 11) |
        ((value & 0x8800) >> 10) |
        ((result & 0x8800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.hl);
    z80.regs.hl = result & 0xFFFF;
    z80.regs.f = ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | overflowAddTable[lookup >> 4] | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5 | z80_base_1.Flag.S)) | halfCarryAddTable[lookup & 0x07] | (result !== 0 ? 0 : z80_base_1.Flag.Z);
});
decodeMapED.set(0x4B, (z80) => {
    let value;
    let addr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    addr = z80_base_1.word(z80.readByte(z80.regs.pc), addr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80.readByte(addr);
    z80.regs.memptr = z80_base_1.inc16(addr);
    value = z80_base_1.word(z80.readByte(z80.regs.memptr), value);
    z80.regs.bc = value;
});
decodeMapED.set(0x4D, (z80) => {
    z80.regs.iff1 = z80.regs.iff2;
    z80.regs.pc = z80.popWord();
    z80.regs.memptr = z80.regs.pc;
});
decodeMapED.set(0x4F, (z80) => {
    let value;
    value = z80.regs.a;
    z80.incTStateCount(1);
    z80.regs.r = value;
});
decodeMapED.set(0x50, (z80) => {
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
    z80.regs.d = z80.readPort(z80.regs.bc);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | z80.sz53pTable[z80.regs.d];
});
decodeMapED.set(0x51, (z80) => {
    z80.writePort(z80.regs.bc, z80.regs.d);
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
});
decodeMapED.set(0x52, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.de;
    let result = z80.regs.hl - value;
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result -= 1;
    }
    const lookup = (((z80.regs.hl & 0x8800) >> 11) |
        ((value & 0x8800) >> 10) |
        ((result & 0x8800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.hl);
    z80.regs.hl = result & 0xFFFF;
    z80.regs.f = ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | overflowSubTable[lookup >> 4] | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5 | z80_base_1.Flag.S)) | halfCarrySubTable[lookup & 0x07] | (result !== 0 ? 0 : z80_base_1.Flag.Z);
});
decodeMapED.set(0x53, (z80) => {
    let value;
    value = z80.regs.de;
    let addr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    addr = z80_base_1.word(z80.readByte(z80.regs.pc), addr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.writeByte(addr, z80_base_1.lo(value));
    addr = z80_base_1.inc16(addr);
    z80.regs.memptr = addr;
    z80.writeByte(addr, z80_base_1.hi(value));
});
decodeMapED.set(0x76, (z80) => {
    z80.regs.im = 1;
});
decodeMapED.set(0x56, decodeMapED.get(0x76));
decodeMapED.set(0x57, (z80) => {
    let value;
    value = z80.regs.i;
    z80.incTStateCount(1);
    z80.regs.a = value;
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | z80.sz53Table[z80.regs.a] | (z80.regs.iff2 ? z80_base_1.Flag.V : 0);
});
decodeMapED.set(0x58, (z80) => {
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
    z80.regs.e = z80.readPort(z80.regs.bc);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | z80.sz53pTable[z80.regs.e];
});
decodeMapED.set(0x59, (z80) => {
    z80.writePort(z80.regs.bc, z80.regs.e);
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
});
decodeMapED.set(0x5A, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.de;
    let result = z80.regs.hl + value;
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result += 1;
    }
    const lookup = (((z80.regs.hl & 0x8800) >> 11) |
        ((value & 0x8800) >> 10) |
        ((result & 0x8800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.hl);
    z80.regs.hl = result & 0xFFFF;
    z80.regs.f = ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | overflowAddTable[lookup >> 4] | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5 | z80_base_1.Flag.S)) | halfCarryAddTable[lookup & 0x07] | (result !== 0 ? 0 : z80_base_1.Flag.Z);
});
decodeMapED.set(0x5B, (z80) => {
    let value;
    let addr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    addr = z80_base_1.word(z80.readByte(z80.regs.pc), addr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80.readByte(addr);
    z80.regs.memptr = z80_base_1.inc16(addr);
    value = z80_base_1.word(z80.readByte(z80.regs.memptr), value);
    z80.regs.de = value;
});
decodeMapED.set(0x7E, (z80) => {
    z80.regs.im = 2;
});
decodeMapED.set(0x5E, decodeMapED.get(0x7E));
decodeMapED.set(0x5F, (z80) => {
    let value;
    value = z80.regs.rCombined;
    z80.incTStateCount(1);
    z80.regs.a = value;
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | z80.sz53Table[z80.regs.a] | (z80.regs.iff2 ? z80_base_1.Flag.V : 0);
});
decodeMapED.set(0x60, (z80) => {
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
    z80.regs.h = z80.readPort(z80.regs.bc);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | z80.sz53pTable[z80.regs.h];
});
decodeMapED.set(0x61, (z80) => {
    z80.writePort(z80.regs.bc, z80.regs.h);
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
});
decodeMapED.set(0x62, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.hl;
    let result = z80.regs.hl - value;
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result -= 1;
    }
    const lookup = (((z80.regs.hl & 0x8800) >> 11) |
        ((value & 0x8800) >> 10) |
        ((result & 0x8800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.hl);
    z80.regs.hl = result & 0xFFFF;
    z80.regs.f = ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | overflowSubTable[lookup >> 4] | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5 | z80_base_1.Flag.S)) | halfCarrySubTable[lookup & 0x07] | (result !== 0 ? 0 : z80_base_1.Flag.Z);
});
decodeMapED.set(0x63, (z80) => {
    let value;
    value = z80.regs.hl;
    let addr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    addr = z80_base_1.word(z80.readByte(z80.regs.pc), addr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.writeByte(addr, z80_base_1.lo(value));
    addr = z80_base_1.inc16(addr);
    z80.regs.memptr = addr;
    z80.writeByte(addr, z80_base_1.hi(value));
});
decodeMapED.set(0x67, (z80) => {
    const tmp = z80.readByte(z80.regs.hl);
    z80.incTStateCount(4);
    z80.writeByte(z80.regs.hl, ((z80.regs.a << 4) | (tmp >> 4)) & 0xFF);
    z80.regs.a = (z80.regs.a & 0xF0) | (tmp & 0x0F);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | z80.sz53pTable[z80.regs.a];
    z80.regs.memptr = z80_base_1.inc16(z80.regs.hl);
});
decodeMapED.set(0x68, (z80) => {
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
    z80.regs.l = z80.readPort(z80.regs.bc);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | z80.sz53pTable[z80.regs.l];
});
decodeMapED.set(0x69, (z80) => {
    z80.writePort(z80.regs.bc, z80.regs.l);
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
});
decodeMapED.set(0x6A, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.hl;
    let result = z80.regs.hl + value;
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result += 1;
    }
    const lookup = (((z80.regs.hl & 0x8800) >> 11) |
        ((value & 0x8800) >> 10) |
        ((result & 0x8800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.hl);
    z80.regs.hl = result & 0xFFFF;
    z80.regs.f = ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | overflowAddTable[lookup >> 4] | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5 | z80_base_1.Flag.S)) | halfCarryAddTable[lookup & 0x07] | (result !== 0 ? 0 : z80_base_1.Flag.Z);
});
decodeMapED.set(0x6B, (z80) => {
    let value;
    let addr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    addr = z80_base_1.word(z80.readByte(z80.regs.pc), addr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80.readByte(addr);
    z80.regs.memptr = z80_base_1.inc16(addr);
    value = z80_base_1.word(z80.readByte(z80.regs.memptr), value);
    z80.regs.hl = value;
});
decodeMapED.set(0x6F, (z80) => {
    const tmp = z80.readByte(z80.regs.hl);
    z80.incTStateCount(4);
    z80.writeByte(z80.regs.hl, ((tmp << 4) | (z80.regs.a & 0x0F)) & 0xFF);
    z80.regs.a = (z80.regs.a & 0xF0) | (tmp >> 4);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | z80.sz53pTable[z80.regs.a];
    z80.regs.memptr = z80_base_1.inc16(z80.regs.hl);
});
decodeMapED.set(0x70, (z80) => {
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
    z80.regs.f = z80.readPort(z80.regs.bc);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | z80.sz53pTable[z80.regs.f];
});
decodeMapED.set(0x71, (z80) => {
    z80.writePort(z80.regs.bc, 0x00);
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
});
decodeMapED.set(0x72, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.sp;
    let result = z80.regs.hl - value;
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result -= 1;
    }
    const lookup = (((z80.regs.hl & 0x8800) >> 11) |
        ((value & 0x8800) >> 10) |
        ((result & 0x8800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.hl);
    z80.regs.hl = result & 0xFFFF;
    z80.regs.f = ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | overflowSubTable[lookup >> 4] | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5 | z80_base_1.Flag.S)) | halfCarrySubTable[lookup & 0x07] | (result !== 0 ? 0 : z80_base_1.Flag.Z);
});
decodeMapED.set(0x73, (z80) => {
    let value;
    value = z80.regs.sp;
    let addr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    addr = z80_base_1.word(z80.readByte(z80.regs.pc), addr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.writeByte(addr, z80_base_1.lo(value));
    addr = z80_base_1.inc16(addr);
    z80.regs.memptr = addr;
    z80.writeByte(addr, z80_base_1.hi(value));
});
decodeMapED.set(0x78, (z80) => {
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
    z80.regs.a = z80.readPort(z80.regs.bc);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | z80.sz53pTable[z80.regs.a];
});
decodeMapED.set(0x79, (z80) => {
    z80.writePort(z80.regs.bc, z80.regs.a);
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
});
decodeMapED.set(0x7A, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.sp;
    let result = z80.regs.hl + value;
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result += 1;
    }
    const lookup = (((z80.regs.hl & 0x8800) >> 11) |
        ((value & 0x8800) >> 10) |
        ((result & 0x8800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.hl);
    z80.regs.hl = result & 0xFFFF;
    z80.regs.f = ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | overflowAddTable[lookup >> 4] | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5 | z80_base_1.Flag.S)) | halfCarryAddTable[lookup & 0x07] | (result !== 0 ? 0 : z80_base_1.Flag.Z);
});
decodeMapED.set(0x7B, (z80) => {
    let value;
    let addr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    addr = z80_base_1.word(z80.readByte(z80.regs.pc), addr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80.readByte(addr);
    z80.regs.memptr = z80_base_1.inc16(addr);
    value = z80_base_1.word(z80.readByte(z80.regs.memptr), value);
    z80.regs.sp = value;
});
decodeMapED.set(0xA0, (z80) => {
    let value = z80.readByte(z80.regs.hl);
    z80.writeByte(z80.regs.de, value);
    z80.incTStateCount(2);
    z80.regs.bc = z80_base_1.dec16(z80.regs.bc);
    value = z80_base_1.add16(value, z80.regs.a);
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.C | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | (z80.regs.bc !== 0 ? z80_base_1.Flag.V : 0) | (value & z80_base_1.Flag.X3) | ((value & 0x02) !== 0 ? z80_base_1.Flag.X5 : 0);
    z80.regs.hl = z80_base_1.inc16(z80.regs.hl);
    z80.regs.de = z80_base_1.inc16(z80.regs.de);
});
decodeMapED.set(0xA1, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    let diff = (z80.regs.a - value) & 0xFF;
    const lookup = ((z80.regs.a & 0x08) >> 3) | ((value & 0x08) >> 2) | ((diff & 0x08) >> 1);
    z80.incTStateCount(5);
    z80.regs.bc = z80_base_1.dec16(z80.regs.bc);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (z80.regs.bc !== 0 ? z80_base_1.Flag.V : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup] | (diff !== 0 ? 0 : z80_base_1.Flag.Z) | (diff & z80_base_1.Flag.S);
    if ((z80.regs.f & z80_base_1.Flag.H) !== 0)
        diff = z80_base_1.dec8(diff);
    z80.regs.f |= (diff & z80_base_1.Flag.X3) | (((diff & 0x02) !== 0) ? z80_base_1.Flag.X5 : 0);
    z80.regs.memptr = z80_base_1.inc16(z80.regs.memptr);
    z80.regs.hl = z80_base_1.inc16(z80.regs.hl);
});
decodeMapED.set(0xA2, (z80) => {
    z80.incTStateCount(1);
    const value = z80.readPort(z80.regs.bc);
    z80.writeByte(z80.regs.hl, value);
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
    z80.regs.b = z80_base_1.dec8(z80.regs.b);
    const other = z80_base_1.inc8(z80_base_1.add8(value, z80.regs.c));
    z80.regs.f = (value & 0x80 ? z80_base_1.Flag.N : 0) | (other < value ? z80_base_1.Flag.H | z80_base_1.Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? z80_base_1.Flag.P : 0) | z80.sz53Table[z80.regs.b];
    z80.regs.hl = z80_base_1.inc16(z80.regs.hl);
});
decodeMapED.set(0xA3, (z80) => {
    z80.incTStateCount(1);
    const value = z80.readByte(z80.regs.hl);
    z80.regs.b = z80_base_1.dec8(z80.regs.b);
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
    z80.writePort(z80.regs.bc, value);
    z80.regs.hl = z80_base_1.inc16(z80.regs.hl);
    const other = z80_base_1.add8(value, z80.regs.l);
    z80.regs.f = (value & 0x80 ? z80_base_1.Flag.N : 0) | (other < value ? z80_base_1.Flag.H | z80_base_1.Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? z80_base_1.Flag.P : 0) | z80.sz53Table[z80.regs.b];
});
decodeMapED.set(0xA8, (z80) => {
    let value = z80.readByte(z80.regs.hl);
    z80.writeByte(z80.regs.de, value);
    z80.incTStateCount(2);
    z80.regs.bc = z80_base_1.dec16(z80.regs.bc);
    value = z80_base_1.add16(value, z80.regs.a);
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.C | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | (z80.regs.bc !== 0 ? z80_base_1.Flag.V : 0) | (value & z80_base_1.Flag.X3) | ((value & 0x02) !== 0 ? z80_base_1.Flag.X5 : 0);
    z80.regs.hl = z80_base_1.dec16(z80.regs.hl);
    z80.regs.de = z80_base_1.dec16(z80.regs.de);
});
decodeMapED.set(0xA9, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    let diff = (z80.regs.a - value) & 0xFF;
    const lookup = ((z80.regs.a & 0x08) >> 3) | ((value & 0x08) >> 2) | ((diff & 0x08) >> 1);
    z80.incTStateCount(5);
    z80.regs.bc = z80_base_1.dec16(z80.regs.bc);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (z80.regs.bc !== 0 ? z80_base_1.Flag.V : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup] | (diff !== 0 ? 0 : z80_base_1.Flag.Z) | (diff & z80_base_1.Flag.S);
    if ((z80.regs.f & z80_base_1.Flag.H) !== 0)
        diff = z80_base_1.dec8(diff);
    z80.regs.f |= (diff & z80_base_1.Flag.X3) | (((diff & 0x02) !== 0) ? z80_base_1.Flag.X5 : 0);
    z80.regs.memptr = z80_base_1.dec16(z80.regs.memptr);
    z80.regs.hl = z80_base_1.dec16(z80.regs.hl);
});
decodeMapED.set(0xAA, (z80) => {
    z80.incTStateCount(1);
    const value = z80.readPort(z80.regs.bc);
    z80.writeByte(z80.regs.hl, value);
    z80.regs.memptr = z80_base_1.dec16(z80.regs.bc);
    z80.regs.b = z80_base_1.dec8(z80.regs.b);
    const other = z80_base_1.dec8(z80_base_1.add8(value, z80.regs.c));
    z80.regs.f = (value & 0x80 ? z80_base_1.Flag.N : 0) | (other < value ? z80_base_1.Flag.H | z80_base_1.Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? z80_base_1.Flag.P : 0) | z80.sz53Table[z80.regs.b];
    z80.regs.hl = z80_base_1.dec16(z80.regs.hl);
});
decodeMapED.set(0xAB, (z80) => {
    z80.incTStateCount(1);
    const value = z80.readByte(z80.regs.hl);
    z80.regs.b = z80_base_1.dec8(z80.regs.b);
    z80.regs.memptr = z80_base_1.dec16(z80.regs.bc);
    z80.writePort(z80.regs.bc, value);
    z80.regs.hl = z80_base_1.dec16(z80.regs.hl);
    const other = z80_base_1.add8(value, z80.regs.l);
    z80.regs.f = (value & 0x80 ? z80_base_1.Flag.N : 0) | (other < value ? z80_base_1.Flag.H | z80_base_1.Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? z80_base_1.Flag.P : 0) | z80.sz53Table[z80.regs.b];
});
decodeMapED.set(0xB0, (z80) => {
    let value = z80.readByte(z80.regs.hl);
    z80.writeByte(z80.regs.de, value);
    z80.incTStateCount(2);
    z80.regs.bc = z80_base_1.dec16(z80.regs.bc);
    value = z80_base_1.add16(value, z80.regs.a);
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.C | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | (z80.regs.bc !== 0 ? z80_base_1.Flag.V : 0) | (value & z80_base_1.Flag.X3) | ((value & 0x02) !== 0 ? z80_base_1.Flag.X5 : 0);
    if (z80.regs.bc !== 0) {
        z80.incTStateCount(5);
        z80.regs.pc = z80_base_1.add16(z80.regs.pc, -2);
        z80.regs.memptr = z80_base_1.add16(z80.regs.pc, 1);
    }
    z80.regs.hl = z80_base_1.inc16(z80.regs.hl);
    z80.regs.de = z80_base_1.inc16(z80.regs.de);
});
decodeMapED.set(0xB1, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    let diff = (z80.regs.a - value) & 0xFF;
    const lookup = ((z80.regs.a & 0x08) >> 3) | ((value & 0x08) >> 2) | ((diff & 0x08) >> 1);
    z80.incTStateCount(5);
    z80.regs.bc = z80_base_1.dec16(z80.regs.bc);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (z80.regs.bc !== 0 ? z80_base_1.Flag.V : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup] | (diff !== 0 ? 0 : z80_base_1.Flag.Z) | (diff & z80_base_1.Flag.S);
    if ((z80.regs.f & z80_base_1.Flag.H) !== 0)
        diff = z80_base_1.dec8(diff);
    z80.regs.f |= (diff & z80_base_1.Flag.X3) | (((diff & 0x02) !== 0) ? z80_base_1.Flag.X5 : 0);
    if ((z80.regs.f & (z80_base_1.Flag.V | z80_base_1.Flag.Z)) === z80_base_1.Flag.V) {
        z80.incTStateCount(5);
        z80.regs.pc = z80_base_1.add16(z80.regs.pc, -2);
        z80.regs.memptr = z80_base_1.add16(z80.regs.pc, 1);
    }
    else {
        z80.regs.memptr = z80_base_1.inc16(z80.regs.memptr);
    }
    z80.regs.hl = z80_base_1.inc16(z80.regs.hl);
});
decodeMapED.set(0xB2, (z80) => {
    z80.incTStateCount(1);
    const value = z80.readPort(z80.regs.bc);
    z80.writeByte(z80.regs.hl, value);
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
    z80.regs.b = z80_base_1.dec8(z80.regs.b);
    const other = z80_base_1.inc8(z80_base_1.add8(value, z80.regs.c));
    z80.regs.f = (value & 0x80 ? z80_base_1.Flag.N : 0) | (other < value ? z80_base_1.Flag.H | z80_base_1.Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? z80_base_1.Flag.P : 0) | z80.sz53Table[z80.regs.b];
    if (z80.regs.b > 0) {
        z80.incTStateCount(5);
        z80.regs.pc = z80_base_1.add16(z80.regs.pc, -2);
    }
    z80.regs.hl = z80_base_1.inc16(z80.regs.hl);
});
decodeMapED.set(0xB3, (z80) => {
    z80.incTStateCount(1);
    const value = z80.readByte(z80.regs.hl);
    z80.regs.b = z80_base_1.dec8(z80.regs.b);
    z80.regs.memptr = z80_base_1.inc16(z80.regs.bc);
    z80.writePort(z80.regs.bc, value);
    z80.regs.hl = z80_base_1.inc16(z80.regs.hl);
    const other = z80_base_1.add8(value, z80.regs.l);
    z80.regs.f = (value & 0x80 ? z80_base_1.Flag.N : 0) | (other < value ? z80_base_1.Flag.H | z80_base_1.Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? z80_base_1.Flag.P : 0) | z80.sz53Table[z80.regs.b];
    if (z80.regs.b > 0) {
        z80.incTStateCount(5);
        z80.regs.pc = z80_base_1.add16(z80.regs.pc, -2);
    }
});
decodeMapED.set(0xB8, (z80) => {
    let value = z80.readByte(z80.regs.hl);
    z80.writeByte(z80.regs.de, value);
    z80.incTStateCount(2);
    z80.regs.bc = z80_base_1.dec16(z80.regs.bc);
    value = z80_base_1.add16(value, z80.regs.a);
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.C | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | (z80.regs.bc !== 0 ? z80_base_1.Flag.V : 0) | (value & z80_base_1.Flag.X3) | ((value & 0x02) !== 0 ? z80_base_1.Flag.X5 : 0);
    if (z80.regs.bc !== 0) {
        z80.incTStateCount(5);
        z80.regs.pc = z80_base_1.add16(z80.regs.pc, -2);
        z80.regs.memptr = z80_base_1.add16(z80.regs.pc, 1);
    }
    z80.regs.hl = z80_base_1.dec16(z80.regs.hl);
    z80.regs.de = z80_base_1.dec16(z80.regs.de);
});
decodeMapED.set(0xB9, (z80) => {
    const value = z80.readByte(z80.regs.hl);
    let diff = (z80.regs.a - value) & 0xFF;
    const lookup = ((z80.regs.a & 0x08) >> 3) | ((value & 0x08) >> 2) | ((diff & 0x08) >> 1);
    z80.incTStateCount(5);
    z80.regs.bc = z80_base_1.dec16(z80.regs.bc);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (z80.regs.bc !== 0 ? z80_base_1.Flag.V : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup] | (diff !== 0 ? 0 : z80_base_1.Flag.Z) | (diff & z80_base_1.Flag.S);
    if ((z80.regs.f & z80_base_1.Flag.H) !== 0)
        diff = z80_base_1.dec8(diff);
    z80.regs.f |= (diff & z80_base_1.Flag.X3) | (((diff & 0x02) !== 0) ? z80_base_1.Flag.X5 : 0);
    if ((z80.regs.f & (z80_base_1.Flag.V | z80_base_1.Flag.Z)) === z80_base_1.Flag.V) {
        z80.incTStateCount(5);
        z80.regs.pc = z80_base_1.add16(z80.regs.pc, -2);
        z80.regs.memptr = z80_base_1.add16(z80.regs.pc, 1);
    }
    else {
        z80.regs.memptr = z80_base_1.dec16(z80.regs.memptr);
    }
    z80.regs.hl = z80_base_1.dec16(z80.regs.hl);
});
decodeMapED.set(0xBA, (z80) => {
    z80.incTStateCount(1);
    const value = z80.readPort(z80.regs.bc);
    z80.writeByte(z80.regs.hl, value);
    z80.regs.memptr = z80_base_1.dec16(z80.regs.bc);
    z80.regs.b = z80_base_1.dec8(z80.regs.b);
    const other = z80_base_1.dec8(z80_base_1.add8(value, z80.regs.c));
    z80.regs.f = (value & 0x80 ? z80_base_1.Flag.N : 0) | (other < value ? z80_base_1.Flag.H | z80_base_1.Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? z80_base_1.Flag.P : 0) | z80.sz53Table[z80.regs.b];
    if (z80.regs.b > 0) {
        z80.incTStateCount(5);
        z80.regs.pc = z80_base_1.add16(z80.regs.pc, -2);
    }
    z80.regs.hl = z80_base_1.dec16(z80.regs.hl);
});
decodeMapED.set(0xBB, (z80) => {
    z80.incTStateCount(1);
    const value = z80.readByte(z80.regs.hl);
    z80.regs.b = z80_base_1.dec8(z80.regs.b);
    z80.regs.memptr = z80_base_1.dec16(z80.regs.bc);
    z80.writePort(z80.regs.bc, value);
    z80.regs.hl = z80_base_1.dec16(z80.regs.hl);
    const other = z80_base_1.add8(value, z80.regs.l);
    z80.regs.f = (value & 0x80 ? z80_base_1.Flag.N : 0) | (other < value ? z80_base_1.Flag.H | z80_base_1.Flag.C : 0) | (z80.parityTable[(other & 0x07) ^ z80.regs.b] ? z80_base_1.Flag.P : 0) | z80.sz53Table[z80.regs.b];
    if (z80.regs.b > 0) {
        z80.incTStateCount(5);
        z80.regs.pc = z80_base_1.add16(z80.regs.pc, -2);
    }
});
const decodeMapFD = new Map();
decodeMapFD.set(0x09, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.bc;
    let result = z80.regs.iy + value;
    const lookup = (((z80.regs.iy & 0x0800) >> 11) |
        ((value & 0x0800) >> 10) |
        ((result & 0x0800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.iy);
    z80.regs.iy = result & 0xFFFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.V | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | halfCarryAddTable[lookup];
});
decodeMapFD.set(0x19, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.de;
    let result = z80.regs.iy + value;
    const lookup = (((z80.regs.iy & 0x0800) >> 11) |
        ((value & 0x0800) >> 10) |
        ((result & 0x0800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.iy);
    z80.regs.iy = result & 0xFFFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.V | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | halfCarryAddTable[lookup];
});
decodeMapFD.set(0x21, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80_base_1.word(z80.readByte(z80.regs.pc), value);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.iy = value;
});
decodeMapFD.set(0x22, (z80) => {
    let value;
    value = z80.regs.iy;
    let addr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    addr = z80_base_1.word(z80.readByte(z80.regs.pc), addr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.writeByte(addr, z80_base_1.lo(value));
    addr = z80_base_1.inc16(addr);
    z80.regs.memptr = addr;
    z80.writeByte(addr, z80_base_1.hi(value));
});
decodeMapFD.set(0x23, (z80) => {
    let value;
    value = z80.regs.iy;
    const oldValue = value;
    z80.incTStateCount(2);
    value = z80_base_1.inc16(value);
    z80.regs.iy = value;
});
decodeMapFD.set(0x24, (z80) => {
    let value;
    value = z80.regs.iyh;
    const oldValue = value;
    value = z80_base_1.inc8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x80 ? z80_base_1.Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80.sz53Table[value];
    z80.regs.iyh = value;
});
decodeMapFD.set(0x25, (z80) => {
    let value;
    value = z80.regs.iyh;
    const oldValue = value;
    value = z80_base_1.dec8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x7F ? z80_base_1.Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80_base_1.Flag.N | z80.sz53Table[value];
    z80.regs.iyh = value;
});
decodeMapFD.set(0x26, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.iyh = value;
});
decodeMapFD.set(0x29, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.iy;
    let result = z80.regs.iy + value;
    const lookup = (((z80.regs.iy & 0x0800) >> 11) |
        ((value & 0x0800) >> 10) |
        ((result & 0x0800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.iy);
    z80.regs.iy = result & 0xFFFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.V | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | halfCarryAddTable[lookup];
});
decodeMapFD.set(0x2A, (z80) => {
    let value;
    let addr = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    addr = z80_base_1.word(z80.readByte(z80.regs.pc), addr);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    value = z80.readByte(addr);
    z80.regs.memptr = z80_base_1.inc16(addr);
    value = z80_base_1.word(z80.readByte(z80.regs.memptr), value);
    z80.regs.iy = value;
});
decodeMapFD.set(0x2B, (z80) => {
    let value;
    value = z80.regs.iy;
    const oldValue = value;
    z80.incTStateCount(2);
    value = z80_base_1.dec16(value);
    z80.regs.iy = value;
});
decodeMapFD.set(0x2C, (z80) => {
    let value;
    value = z80.regs.iyl;
    const oldValue = value;
    value = z80_base_1.inc8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x80 ? z80_base_1.Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80.sz53Table[value];
    z80.regs.iyl = value;
});
decodeMapFD.set(0x2D, (z80) => {
    let value;
    value = z80.regs.iyl;
    const oldValue = value;
    value = z80_base_1.dec8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x7F ? z80_base_1.Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80_base_1.Flag.N | z80.sz53Table[value];
    z80.regs.iyl = value;
});
decodeMapFD.set(0x2E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.iyl = value;
});
decodeMapFD.set(0x34, (z80) => {
    let value;
    const offset = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.add16(z80.regs.iy, z80_base_1.signedByte(offset));
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = z80_base_1.inc8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x80 ? z80_base_1.Flag.V : 0) | ((value & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80.sz53Table[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFD.set(0x35, (z80) => {
    let value;
    const offset = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = z80_base_1.add16(z80.regs.iy, z80_base_1.signedByte(offset));
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = z80_base_1.dec8(value);
    z80.regs.f = (z80.regs.f & z80_base_1.Flag.C) | (value === 0x7F ? z80_base_1.Flag.V : 0) | ((oldValue & 0x0F) !== 0 ? 0 : z80_base_1.Flag.H) | z80_base_1.Flag.N | z80.sz53Table[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFD.set(0x36, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(2);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFD.set(0x39, (z80) => {
    let value;
    z80.incTStateCount(7);
    value = z80.regs.sp;
    let result = z80.regs.iy + value;
    const lookup = (((z80.regs.iy & 0x0800) >> 11) |
        ((value & 0x0800) >> 10) |
        ((result & 0x0800) >> 9)) & 0xFF;
    z80.regs.memptr = z80_base_1.inc16(z80.regs.iy);
    z80.regs.iy = result & 0xFFFF;
    z80.regs.f = (z80.regs.f & (z80_base_1.Flag.V | z80_base_1.Flag.Z | z80_base_1.Flag.S)) | ((result & 0x10000) !== 0 ? z80_base_1.Flag.C : 0) | ((result >> 8) & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5)) | halfCarryAddTable[lookup];
});
decodeMapFD.set(0x44, (z80) => {
    let value;
    value = z80.regs.iyh;
    z80.regs.b = value;
});
decodeMapFD.set(0x45, (z80) => {
    let value;
    value = z80.regs.iyl;
    z80.regs.b = value;
});
decodeMapFD.set(0x46, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.b = value;
});
decodeMapFD.set(0x4C, (z80) => {
    let value;
    value = z80.regs.iyh;
    z80.regs.c = value;
});
decodeMapFD.set(0x4D, (z80) => {
    let value;
    value = z80.regs.iyl;
    z80.regs.c = value;
});
decodeMapFD.set(0x4E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.c = value;
});
decodeMapFD.set(0x54, (z80) => {
    let value;
    value = z80.regs.iyh;
    z80.regs.d = value;
});
decodeMapFD.set(0x55, (z80) => {
    let value;
    value = z80.regs.iyl;
    z80.regs.d = value;
});
decodeMapFD.set(0x56, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.d = value;
});
decodeMapFD.set(0x5C, (z80) => {
    let value;
    value = z80.regs.iyh;
    z80.regs.e = value;
});
decodeMapFD.set(0x5D, (z80) => {
    let value;
    value = z80.regs.iyl;
    z80.regs.e = value;
});
decodeMapFD.set(0x5E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.e = value;
});
decodeMapFD.set(0x60, (z80) => {
    let value;
    value = z80.regs.b;
    z80.regs.iyh = value;
});
decodeMapFD.set(0x61, (z80) => {
    let value;
    value = z80.regs.c;
    z80.regs.iyh = value;
});
decodeMapFD.set(0x62, (z80) => {
    let value;
    value = z80.regs.d;
    z80.regs.iyh = value;
});
decodeMapFD.set(0x63, (z80) => {
    let value;
    value = z80.regs.e;
    z80.regs.iyh = value;
});
decodeMapFD.set(0x64, (z80) => {
    let value;
    value = z80.regs.iyh;
    z80.regs.iyh = value;
});
decodeMapFD.set(0x65, (z80) => {
    let value;
    value = z80.regs.iyl;
    z80.regs.iyh = value;
});
decodeMapFD.set(0x66, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.h = value;
});
decodeMapFD.set(0x67, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.iyh = value;
});
decodeMapFD.set(0x68, (z80) => {
    let value;
    value = z80.regs.b;
    z80.regs.iyl = value;
});
decodeMapFD.set(0x69, (z80) => {
    let value;
    value = z80.regs.c;
    z80.regs.iyl = value;
});
decodeMapFD.set(0x6A, (z80) => {
    let value;
    value = z80.regs.d;
    z80.regs.iyl = value;
});
decodeMapFD.set(0x6B, (z80) => {
    let value;
    value = z80.regs.e;
    z80.regs.iyl = value;
});
decodeMapFD.set(0x6C, (z80) => {
    let value;
    value = z80.regs.iyh;
    z80.regs.iyl = value;
});
decodeMapFD.set(0x6D, (z80) => {
    let value;
    value = z80.regs.iyl;
    z80.regs.iyl = value;
});
decodeMapFD.set(0x6E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.l = value;
});
decodeMapFD.set(0x6F, (z80) => {
    let value;
    value = z80.regs.a;
    z80.regs.iyl = value;
});
decodeMapFD.set(0x70, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.regs.b;
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFD.set(0x71, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.regs.c;
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFD.set(0x72, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.regs.d;
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFD.set(0x73, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.regs.e;
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFD.set(0x74, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.regs.h;
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFD.set(0x75, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.regs.l;
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFD.set(0x77, (z80) => {
    const dd = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    let value;
    value = z80.regs.a;
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(dd)) & 0xFFFF;
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFD.set(0x7C, (z80) => {
    let value;
    value = z80.regs.iyh;
    z80.regs.a = value;
});
decodeMapFD.set(0x7D, (z80) => {
    let value;
    value = z80.regs.iyl;
    z80.regs.a = value;
});
decodeMapFD.set(0x7E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.a = value;
});
decodeMapFD.set(0x84, (z80) => {
    let value;
    value = z80.regs.iyh;
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapFD.set(0x85, (z80) => {
    let value;
    value = z80.regs.iyl;
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapFD.set(0x86, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    let result = z80_base_1.add16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapFD.set(0x8C, (z80) => {
    let value;
    value = z80.regs.iyh;
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapFD.set(0x8D, (z80) => {
    let value;
    value = z80.regs.iyl;
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapFD.set(0x8E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    let result = z80_base_1.add16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.inc16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | halfCarryAddTable[lookup & 0x07] | overflowAddTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapFD.set(0x94, (z80) => {
    let value;
    value = z80.regs.iyh;
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapFD.set(0x95, (z80) => {
    let value;
    value = z80.regs.iyl;
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapFD.set(0x96, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    let result = z80_base_1.sub16(z80.regs.a, value);
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapFD.set(0x9C, (z80) => {
    let value;
    value = z80.regs.iyh;
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapFD.set(0x9D, (z80) => {
    let value;
    value = z80.regs.iyl;
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapFD.set(0x9E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    let result = z80_base_1.sub16(z80.regs.a, value);
    if ((z80.regs.f & z80_base_1.Flag.C) !== 0) {
        result = z80_base_1.dec16(result);
    }
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((result & 0x88) >> 1)) & 0xFF;
    z80.regs.a = result & 0xFF;
    z80.regs.f = (((result & 0x100) !== 0) ? z80_base_1.Flag.C : 0) | z80_base_1.Flag.N | halfCarrySubTable[lookup & 0x07] | overflowSubTable[lookup >> 4] | z80.sz53Table[z80.regs.a];
});
decodeMapFD.set(0xA4, (z80) => {
    let value;
    value = z80.regs.iyh;
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapFD.set(0xA5, (z80) => {
    let value;
    value = z80.regs.iyl;
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapFD.set(0xA6, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.a &= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
    z80.regs.f |= z80_base_1.Flag.H;
});
decodeMapFD.set(0xAC, (z80) => {
    let value;
    value = z80.regs.iyh;
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapFD.set(0xAD, (z80) => {
    let value;
    value = z80.regs.iyl;
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapFD.set(0xAE, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.a ^= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapFD.set(0xB4, (z80) => {
    let value;
    value = z80.regs.iyh;
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapFD.set(0xB5, (z80) => {
    let value;
    value = z80.regs.iyl;
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapFD.set(0xB6, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    z80.regs.a |= value;
    z80.regs.f = z80.sz53pTable[z80.regs.a];
});
decodeMapFD.set(0xBC, (z80) => {
    let value;
    value = z80.regs.iyh;
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapFD.set(0xBD, (z80) => {
    let value;
    value = z80.regs.iyl;
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapFD.set(0xBE, (z80) => {
    let value;
    value = z80.readByte(z80.regs.pc);
    z80.incTStateCount(5);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.regs.memptr = (z80.regs.iy + z80_base_1.signedByte(value)) & 0xFFFF;
    value = z80.readByte(z80.regs.memptr);
    const diff = (z80.regs.a - value) & 0xFFFF;
    const lookup = (((z80.regs.a & 0x88) >> 3) |
        ((value & 0x88) >> 2) |
        ((diff & 0x88) >> 1)) & 0xFF;
    let f = z80_base_1.Flag.N;
    if ((diff & 0x100) != 0)
        f |= z80_base_1.Flag.C;
    if (diff == 0)
        f |= z80_base_1.Flag.Z;
    f |= halfCarrySubTable[lookup & 0x07];
    f |= overflowSubTable[lookup >> 4];
    f |= value & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5);
    f |= diff & z80_base_1.Flag.S;
    z80.regs.af = z80_base_1.word(z80.regs.a, f);
});
decodeMapFD.set(0xCB, (z80) => {
    decodeFDCB(z80);
});
decodeMapFD.set(0xE1, (z80) => {
    z80.regs.iy = z80.popWord();
});
decodeMapFD.set(0xE3, (z80) => {
    const rightValue = z80.regs.iy;
    const leftValueL = z80.readByte(z80.regs.sp);
    const leftValueH = z80.readByte(z80_base_1.inc16(z80.regs.sp));
    z80.incTStateCount(1);
    z80.writeByte(z80_base_1.inc16(z80.regs.sp), z80_base_1.hi(rightValue));
    z80.writeByte(z80.regs.sp, z80_base_1.lo(rightValue));
    z80.incTStateCount(2);
    z80.regs.memptr = z80_base_1.word(leftValueH, leftValueL);
    z80.regs.iy = z80_base_1.word(leftValueH, leftValueL);
});
decodeMapFD.set(0xE5, (z80) => {
    z80.incTStateCount(1);
    z80.pushWord(z80.regs.iy);
});
decodeMapFD.set(0xE9, (z80) => {
    z80.regs.pc = z80.regs.iy;
});
decodeMapFD.set(0xF9, (z80) => {
    let value;
    value = z80.regs.iy;
    z80.incTStateCount(2);
    z80.regs.sp = value;
});
const decodeMapFDCB = new Map();
decodeMapFDCB.set(0x00, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = ((value << 1) | (value >> 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0x01, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = ((value << 1) | (value >> 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0x02, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = ((value << 1) | (value >> 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0x03, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = ((value << 1) | (value >> 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0x04, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = ((value << 1) | (value >> 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0x05, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = ((value << 1) | (value >> 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0x06, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = ((value << 1) | (value >> 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFDCB.set(0x07, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = ((value << 1) | (value >> 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0x08, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = ((value >> 1) | (value << 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0x09, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = ((value >> 1) | (value << 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0x0A, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = ((value >> 1) | (value << 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0x0B, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = ((value >> 1) | (value << 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0x0C, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = ((value >> 1) | (value << 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0x0D, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = ((value >> 1) | (value << 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0x0E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = ((value >> 1) | (value << 7)) & 0xFF;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFDCB.set(0x0F, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = ((value >> 1) | (value << 7)) & 0xFF;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0x10, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0x11, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0x12, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0x13, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0x14, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0x15, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0x16, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFDCB.set(0x17, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = ((value << 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 1 : 0)) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0x18, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0x19, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0x1A, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0x1B, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0x1C, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0x1D, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0x1E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFDCB.set(0x1F, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = (value >> 1) | ((z80.regs.f & z80_base_1.Flag.C) !== 0 ? 0x80 : 0);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0x20, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = (value << 1) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0x21, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = (value << 1) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0x22, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = (value << 1) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0x23, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = (value << 1) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0x24, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = (value << 1) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0x25, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = (value << 1) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0x26, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = (value << 1) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFDCB.set(0x27, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = (value << 1) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0x28, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = (value & 0x80) | (value >> 1);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0x29, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = (value & 0x80) | (value >> 1);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0x2A, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = (value & 0x80) | (value >> 1);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0x2B, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = (value & 0x80) | (value >> 1);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0x2C, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = (value & 0x80) | (value >> 1);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0x2D, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = (value & 0x80) | (value >> 1);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0x2E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = (value & 0x80) | (value >> 1);
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFDCB.set(0x2F, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = (value & 0x80) | (value >> 1);
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0x30, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = ((value << 1) | 0x01) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0x31, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = ((value << 1) | 0x01) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0x32, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = ((value << 1) | 0x01) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0x33, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = ((value << 1) | 0x01) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0x34, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = ((value << 1) | 0x01) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0x35, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = ((value << 1) | 0x01) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0x36, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = ((value << 1) | 0x01) & 0xFF;
    z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFDCB.set(0x37, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = ((value << 1) | 0x01) & 0xFF;
        z80.regs.f = ((oldValue & 0x80) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0x38, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.b;
        const oldValue = value;
        value = value >> 1;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.b = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0x39, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.c;
        const oldValue = value;
        value = value >> 1;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.c = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0x3A, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.d;
        const oldValue = value;
        value = value >> 1;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.d = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0x3B, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.e;
        const oldValue = value;
        value = value >> 1;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.e = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0x3C, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.h;
        const oldValue = value;
        value = value >> 1;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.h = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0x3D, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.l;
        const oldValue = value;
        value = value >> 1;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.l = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0x3E, (z80) => {
    let value;
    value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    const oldValue = value;
    value = value >> 1;
    z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
    z80.writeByte(z80.regs.memptr, value);
});
decodeMapFDCB.set(0x3F, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    {
        let value;
        value = z80.regs.a;
        const oldValue = value;
        value = value >> 1;
        z80.regs.f = ((oldValue & 0x01) !== 0 ? z80_base_1.Flag.C : 0) | z80.sz53pTable[value];
        z80.regs.a = value;
    }
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0x47, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x01) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapFDCB.set(0x40, decodeMapFDCB.get(0x47));
decodeMapFDCB.set(0x41, decodeMapFDCB.get(0x47));
decodeMapFDCB.set(0x42, decodeMapFDCB.get(0x47));
decodeMapFDCB.set(0x43, decodeMapFDCB.get(0x47));
decodeMapFDCB.set(0x44, decodeMapFDCB.get(0x47));
decodeMapFDCB.set(0x45, decodeMapFDCB.get(0x47));
decodeMapFDCB.set(0x46, decodeMapFDCB.get(0x47));
decodeMapFDCB.set(0x4F, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x02) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapFDCB.set(0x48, decodeMapFDCB.get(0x4F));
decodeMapFDCB.set(0x49, decodeMapFDCB.get(0x4F));
decodeMapFDCB.set(0x4A, decodeMapFDCB.get(0x4F));
decodeMapFDCB.set(0x4B, decodeMapFDCB.get(0x4F));
decodeMapFDCB.set(0x4C, decodeMapFDCB.get(0x4F));
decodeMapFDCB.set(0x4D, decodeMapFDCB.get(0x4F));
decodeMapFDCB.set(0x4E, decodeMapFDCB.get(0x4F));
decodeMapFDCB.set(0x57, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x04) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapFDCB.set(0x50, decodeMapFDCB.get(0x57));
decodeMapFDCB.set(0x51, decodeMapFDCB.get(0x57));
decodeMapFDCB.set(0x52, decodeMapFDCB.get(0x57));
decodeMapFDCB.set(0x53, decodeMapFDCB.get(0x57));
decodeMapFDCB.set(0x54, decodeMapFDCB.get(0x57));
decodeMapFDCB.set(0x55, decodeMapFDCB.get(0x57));
decodeMapFDCB.set(0x56, decodeMapFDCB.get(0x57));
decodeMapFDCB.set(0x5F, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x08) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapFDCB.set(0x58, decodeMapFDCB.get(0x5F));
decodeMapFDCB.set(0x59, decodeMapFDCB.get(0x5F));
decodeMapFDCB.set(0x5A, decodeMapFDCB.get(0x5F));
decodeMapFDCB.set(0x5B, decodeMapFDCB.get(0x5F));
decodeMapFDCB.set(0x5C, decodeMapFDCB.get(0x5F));
decodeMapFDCB.set(0x5D, decodeMapFDCB.get(0x5F));
decodeMapFDCB.set(0x5E, decodeMapFDCB.get(0x5F));
decodeMapFDCB.set(0x67, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x10) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapFDCB.set(0x60, decodeMapFDCB.get(0x67));
decodeMapFDCB.set(0x61, decodeMapFDCB.get(0x67));
decodeMapFDCB.set(0x62, decodeMapFDCB.get(0x67));
decodeMapFDCB.set(0x63, decodeMapFDCB.get(0x67));
decodeMapFDCB.set(0x64, decodeMapFDCB.get(0x67));
decodeMapFDCB.set(0x65, decodeMapFDCB.get(0x67));
decodeMapFDCB.set(0x66, decodeMapFDCB.get(0x67));
decodeMapFDCB.set(0x6F, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x20) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapFDCB.set(0x68, decodeMapFDCB.get(0x6F));
decodeMapFDCB.set(0x69, decodeMapFDCB.get(0x6F));
decodeMapFDCB.set(0x6A, decodeMapFDCB.get(0x6F));
decodeMapFDCB.set(0x6B, decodeMapFDCB.get(0x6F));
decodeMapFDCB.set(0x6C, decodeMapFDCB.get(0x6F));
decodeMapFDCB.set(0x6D, decodeMapFDCB.get(0x6F));
decodeMapFDCB.set(0x6E, decodeMapFDCB.get(0x6F));
decodeMapFDCB.set(0x77, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x40) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    z80.regs.f = f;
});
decodeMapFDCB.set(0x70, decodeMapFDCB.get(0x77));
decodeMapFDCB.set(0x71, decodeMapFDCB.get(0x77));
decodeMapFDCB.set(0x72, decodeMapFDCB.get(0x77));
decodeMapFDCB.set(0x73, decodeMapFDCB.get(0x77));
decodeMapFDCB.set(0x74, decodeMapFDCB.get(0x77));
decodeMapFDCB.set(0x75, decodeMapFDCB.get(0x77));
decodeMapFDCB.set(0x76, decodeMapFDCB.get(0x77));
decodeMapFDCB.set(0x7F, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    const hiddenValue = z80_base_1.hi(z80.regs.memptr);
    z80.incTStateCount(1);
    let f = (z80.regs.f & z80_base_1.Flag.C) | z80_base_1.Flag.H | (hiddenValue & (z80_base_1.Flag.X3 | z80_base_1.Flag.X5));
    if ((value & 0x80) === 0) {
        f |= z80_base_1.Flag.P | z80_base_1.Flag.Z;
    }
    if ((value & 0x80) !== 0) {
        f |= z80_base_1.Flag.S;
    }
    z80.regs.f = f;
});
decodeMapFDCB.set(0x78, decodeMapFDCB.get(0x7F));
decodeMapFDCB.set(0x79, decodeMapFDCB.get(0x7F));
decodeMapFDCB.set(0x7A, decodeMapFDCB.get(0x7F));
decodeMapFDCB.set(0x7B, decodeMapFDCB.get(0x7F));
decodeMapFDCB.set(0x7C, decodeMapFDCB.get(0x7F));
decodeMapFDCB.set(0x7D, decodeMapFDCB.get(0x7F));
decodeMapFDCB.set(0x7E, decodeMapFDCB.get(0x7F));
decodeMapFDCB.set(0x80, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0xFE;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0x81, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0xFE;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0x82, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0xFE;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0x83, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0xFE;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0x84, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0xFE;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0x85, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0xFE;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0x86, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0xFE);
});
decodeMapFDCB.set(0x87, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0xFE;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0x88, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0xFD;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0x89, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0xFD;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0x8A, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0xFD;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0x8B, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0xFD;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0x8C, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0xFD;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0x8D, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0xFD;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0x8E, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0xFD);
});
decodeMapFDCB.set(0x8F, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0xFD;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0x90, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0xFB;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0x91, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0xFB;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0x92, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0xFB;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0x93, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0xFB;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0x94, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0xFB;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0x95, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0xFB;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0x96, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0xFB);
});
decodeMapFDCB.set(0x97, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0xFB;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0x98, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0xF7;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0x99, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0xF7;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0x9A, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0xF7;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0x9B, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0xF7;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0x9C, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0xF7;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0x9D, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0xF7;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0x9E, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0xF7);
});
decodeMapFDCB.set(0x9F, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0xF7;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0xA0, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0xEF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0xA1, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0xEF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0xA2, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0xEF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0xA3, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0xEF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0xA4, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0xEF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0xA5, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0xEF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0xA6, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0xEF);
});
decodeMapFDCB.set(0xA7, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0xEF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0xA8, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0xDF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0xA9, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0xDF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0xAA, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0xDF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0xAB, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0xDF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0xAC, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0xDF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0xAD, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0xDF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0xAE, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0xDF);
});
decodeMapFDCB.set(0xAF, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0xDF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0xB0, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0xBF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0xB1, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0xBF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0xB2, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0xBF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0xB3, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0xBF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0xB4, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0xBF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0xB5, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0xBF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0xB6, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0xBF);
});
decodeMapFDCB.set(0xB7, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0xBF;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0xB8, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) & 0x7F;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0xB9, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) & 0x7F;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0xBA, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) & 0x7F;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0xBB, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) & 0x7F;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0xBC, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) & 0x7F;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0xBD, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) & 0x7F;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0xBE, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value & 0x7F);
});
decodeMapFDCB.set(0xBF, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) & 0x7F;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0xC0, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x01;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0xC1, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x01;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0xC2, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x01;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0xC3, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x01;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0xC4, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x01;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0xC5, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x01;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0xC6, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x01);
});
decodeMapFDCB.set(0xC7, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x01;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0xC8, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x02;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0xC9, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x02;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0xCA, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x02;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0xCB, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x02;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0xCC, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x02;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0xCD, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x02;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0xCE, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x02);
});
decodeMapFDCB.set(0xCF, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x02;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0xD0, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x04;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0xD1, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x04;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0xD2, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x04;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0xD3, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x04;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0xD4, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x04;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0xD5, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x04;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0xD6, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x04);
});
decodeMapFDCB.set(0xD7, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x04;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0xD8, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x08;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0xD9, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x08;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0xDA, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x08;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0xDB, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x08;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0xDC, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x08;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0xDD, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x08;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0xDE, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x08);
});
decodeMapFDCB.set(0xDF, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x08;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0xE0, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x10;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0xE1, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x10;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0xE2, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x10;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0xE3, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x10;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0xE4, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x10;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0xE5, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x10;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0xE6, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x10);
});
decodeMapFDCB.set(0xE7, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x10;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0xE8, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x20;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0xE9, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x20;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0xEA, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x20;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0xEB, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x20;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0xEC, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x20;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0xED, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x20;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0xEE, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x20);
});
decodeMapFDCB.set(0xEF, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x20;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0xF0, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x40;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0xF1, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x40;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0xF2, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x40;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0xF3, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x40;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0xF4, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x40;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0xF5, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x40;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0xF6, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x40);
});
decodeMapFDCB.set(0xF7, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x40;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
decodeMapFDCB.set(0xF8, (z80) => {
    z80.regs.b = z80.readByte(z80.regs.memptr) | 0x80;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.b);
});
decodeMapFDCB.set(0xF9, (z80) => {
    z80.regs.c = z80.readByte(z80.regs.memptr) | 0x80;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.c);
});
decodeMapFDCB.set(0xFA, (z80) => {
    z80.regs.d = z80.readByte(z80.regs.memptr) | 0x80;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.d);
});
decodeMapFDCB.set(0xFB, (z80) => {
    z80.regs.e = z80.readByte(z80.regs.memptr) | 0x80;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.e);
});
decodeMapFDCB.set(0xFC, (z80) => {
    z80.regs.h = z80.readByte(z80.regs.memptr) | 0x80;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.h);
});
decodeMapFDCB.set(0xFD, (z80) => {
    z80.regs.l = z80.readByte(z80.regs.memptr) | 0x80;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.l);
});
decodeMapFDCB.set(0xFE, (z80) => {
    const value = z80.readByte(z80.regs.memptr);
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, value | 0x80);
});
decodeMapFDCB.set(0xFF, (z80) => {
    z80.regs.a = z80.readByte(z80.regs.memptr) | 0x80;
    z80.incTStateCount(1);
    z80.writeByte(z80.regs.memptr, z80.regs.a);
});
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
    const func = decodeMapCB.get(inst);
    if (func === undefined) {
        console.log("Unhandled opcode in CB: " + z80_base_1.toHex(inst, 2));
    }
    else {
        func(z80);
    }
}
/**
 * Decode the "DD" prefix (IX instructions).
 */
function decodeDD(z80) {
    const inst = fetchInstruction(z80);
    const func = decodeMapDD.get(inst);
    if (func === undefined) {
        console.log("Unhandled opcode in DD: " + z80_base_1.toHex(inst, 2));
    }
    else {
        func(z80);
    }
}
/**
 * Decode the "DDCB" prefix (IX bit instructions).
 */
function decodeDDCB(z80) {
    z80.incTStateCount(3);
    const offset = z80.readByteInternal(z80.regs.pc);
    z80.regs.memptr = z80_base_1.add16(z80.regs.ix, z80_base_1.signedByte(offset));
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.incTStateCount(3);
    const inst = z80.readByteInternal(z80.regs.pc);
    z80.incTStateCount(2);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    const func = decodeMapDDCB.get(inst);
    if (func === undefined) {
        console.log("Unhandled opcode in DDCB: " + z80_base_1.toHex(inst, 2));
    }
    else {
        func(z80);
    }
}
/**
 * Decode the "ED" prefix (extended instructions).
 */
function decodeED(z80) {
    const inst = fetchInstruction(z80);
    const func = decodeMapED.get(inst);
    if (func === undefined) {
        console.log("Unhandled opcode in ED: " + z80_base_1.toHex(inst, 2));
    }
    else {
        func(z80);
    }
}
/**
 * Decode the "FD" prefix (IY instructions).
 */
function decodeFD(z80) {
    const inst = fetchInstruction(z80);
    const func = decodeMapFD.get(inst);
    if (func === undefined) {
        console.log("Unhandled opcode in FD: " + z80_base_1.toHex(inst, 2));
    }
    else {
        func(z80);
    }
}
/**
 * Decode the "FDCB" prefix (IY bit instructions).
 */
function decodeFDCB(z80) {
    z80.incTStateCount(3);
    const offset = z80.readByteInternal(z80.regs.pc);
    z80.regs.memptr = z80_base_1.add16(z80.regs.iy, z80_base_1.signedByte(offset));
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    z80.incTStateCount(3);
    const inst = z80.readByteInternal(z80.regs.pc);
    z80.incTStateCount(2);
    z80.regs.pc = z80_base_1.inc16(z80.regs.pc);
    const func = decodeMapFDCB.get(inst);
    if (func === undefined) {
        console.log("Unhandled opcode in FDCB: " + z80_base_1.toHex(inst, 2));
    }
    else {
        func(z80);
    }
}
/**
 * Decode the base (un-prefixed) instructions.
 */
function decode(z80) {
    const inst = fetchInstruction(z80);
    const func = decodeMapBASE.get(inst);
    if (func === undefined) {
        console.log("Unhandled opcode " + z80_base_1.toHex(inst, 2));
    }
    else {
        func(z80);
    }
}
exports.decode = decode;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Handle keyboard mapping. The TRS-80 Model III keyboard has keys in different
// places, so we must occasionally fake a Shift key being up or down when it's
// really not.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keyboard = void 0;
// Keyboard is in several identical (mirrored) banks.
const BANK_SIZE = 0x100;
const BANK_COUNT = 4;
const BEGIN_ADDR = 0x3800;
const END_ADDR = BEGIN_ADDR + BANK_SIZE * BANK_COUNT;
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
    // addresses to read more than one byte at a time. For the last byte we fake
    // the Shift key if necessary.
    readKeyboard(addr, clock) {
        addr = (addr - BEGIN_ADDR) % BANK_SIZE;
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
            if (key !== "Meta" && key !== "Control" && key !== "Alt") {
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
            // Don't do anything if we're not active.
            if (!this.interceptKeys) {
                return;
            }
            if (event.clipboardData) {
                const pastedText = event.clipboardData.getData("text/plain");
                if (pastedText) {
                    this.simulateKeyboardText(pastedText);
                }
            }
            event.preventDefault();
        });
    }
    /**
     * Simulate this text being entered by the user.
     */
    simulateKeyboardText(text) {
        for (let ch of text) {
            if (ch === "\n" || ch === "\r") {
                ch = "Enter";
            }
            this.keyEvent(ch, true);
            this.keyEvent(ch, false);
        }
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
exports.Keyboard = Keyboard;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.model1Level1Rom = void 0;
exports.model1Level1Rom = `
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
`;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.model1Level2Rom = void 0;
exports.model1Level2Rom = `
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
`;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.model3Rom = void 0;
exports.model3Rom = `
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
`;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Floppy disk controller for the TRS-80.
 *
 * References:
 *
 * https://hansotten.file-hunter.com/technical-info/wd1793/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloppyDiskController = void 0;
const trs80_base_1 = __webpack_require__(3);
const strongly_typed_events_1 = __webpack_require__(60);
const z80_base_1 = __webpack_require__(6);
const EventScheduler_1 = __webpack_require__(32);
// Whether this controller supports writing.
const SUPPORT_WRITING = false;
// Number of physical drives.
const DRIVE_COUNT = 4;
// Width of the index hole as a fraction of the circumference.
const HOLE_WIDTH = 0.01;
// Speed of disk.
const RPM = 300;
// How long the disk motor stays on after drive selected, in seconds.
const MOTOR_TIME_AFTER_SELECT = 2;
/**
 * Converts boolean for "back" to a Side.
 */
function booleanToSide(back) {
    return back ? trs80_base_1.Side.BACK : trs80_base_1.Side.FRONT;
}
// Type I status bits.
const STATUS_BUSY = 0x01; // Whether a command is in progress.
const STATUS_INDEX = 0x02; // The head is currently over the index hole.
const STATUS_TRACK_ZERO = 0x04; // Head is on track 0.
const STATUS_CRC_ERROR = 0x08; // CRC error.
const STATUS_SEEK_ERROR = 0x10; // Seek error.
const STATUS_HEAD_ENGAGED = 0x20; // Head engaged.
const STATUS_WRITE_PROTECTED = 0x40; // Write-protected.
const STATUS_NOT_READY = 0x80; // Disk not ready (motor not running).
// Type II and III status bits.
//    STATUS_BUSY = 0x01;
const STATUS_DRQ = 0x02; // Data is ready to be read or written.
const STATUS_LOST_DATA = 0x04; // CPU was too slow to read.
//    STATUS_CRC_ERROR = 0x08;
const STATUS_NOT_FOUND = 0x10; // Track, sector, or side were not found.
const STATUS_DELETED = 0x20; // On read: Sector was deleted (data is invalid, 0xF8 DAM).
const STATUS_FAULT = 0x20; // On write: Indicates a write fault.
const STATUS_REC_TYPE = 0x60;
//    STATUS_WRITE_PROTECTED = 0x40;
//    STATUS_NOT_READY = 0x80;
// Select register bits for writeSelect().
const SELECT_DRIVE_0 = 0x01;
const SELECT_DRIVE_1 = 0x02;
const SELECT_DRIVE_2 = 0x04;
const SELECT_DRIVE_3 = 0x08;
const SELECT_SIDE = 0x10; // 0 = front, 1 = back.
const SELECT_PRECOMP = 0x20;
const SELECT_WAIT = 0x40; // Controller should block OUT until operation is done.
const SELECT_MFM = 0x80; // Double density.
const SELECT_DRIVE_MASK = SELECT_DRIVE_0 | SELECT_DRIVE_1 | SELECT_DRIVE_2 | SELECT_DRIVE_3;
// Type of command (see below for specific commands in each type).
var CommandType;
(function (CommandType) {
    CommandType[CommandType["TYPE_I"] = 0] = "TYPE_I";
    CommandType[CommandType["TYPE_II"] = 1] = "TYPE_II";
    CommandType[CommandType["TYPE_III"] = 2] = "TYPE_III";
    CommandType[CommandType["TYPE_IV"] = 3] = "TYPE_IV";
})(CommandType || (CommandType = {}));
// Commands and various sub-flags.
const COMMAND_MASK = 0xF0;
// Type I commands: cccchvrr, where
//     cccc = command number
//     h = head load
//     v = verify (i.e., read next address to check we're on the right track)
//     rr = step rate:  00=6ms, 01=12ms, 10=20ms, 11=40ms
const COMMAND_RESTORE = 0x00;
const COMMAND_SEEK = 0x10;
const COMMAND_STEP = 0x20; // Doesn't update track register.
const COMMAND_STEPU = 0x30; // Updates track register.
const COMMAND_STEP_IN = 0x40;
const COMMAND_STEP_INU = 0x50;
const COMMAND_STEP_OUT = 0x60;
const COMMAND_STEP_OUTU = 0x70;
const MASK_H = 0x08;
const MASK_V = 0x04;
// Type II commands: ccccbecd, where
//     cccc = command number
//     e = delay for head engage (10ms)
//     b = side expected
//     c = side compare (0=disable, 1=enable)
//     d = select data address mark (writes only, 0 for reads):
//         0=FB (normal), 1=F8 (deleted)
const COMMAND_READ = 0x80; // Single sector.
const COMMAND_READM = 0x90; // Multiple sectors.
const COMMAND_WRITE = 0xA0;
const COMMAND_WRITEM = 0xB0;
const MASK_B = 0x08; // Side (0 = front, 1 = back).
const MASK_E = 0x04;
const MASK_C = 0x02; // Whether side (MASK_B) is defined.
const MASK_D = 0x01; // Deleted: 0 = Data is valid, DAM is 0xFB; 1 = Data is invalid, DAM is 0xF8.
// Type III commands: ccccxxxs (?), where
//     cccc = command number
//     xxx = ?? (usually 010)
//     s = 1=READ_TRACK no synchronize; otherwise 0
const COMMAND_READ_ADDRESS = 0xC0;
const COMMAND_READ_TRACK = 0xE0;
const COMMAND_WRITE_TRACK = 0xF0;
// Type IV command: cccciiii, where
//     cccc = command number
//     iiii = bitmask of events to terminate and interrupt on (unused on TRS-80).
//            0000 for immediate terminate with no interrupt.
const COMMAND_FORCE_INTERRUPT = 0xD0;
/**
 * Given a command, returns its type.
 */
function getCommandType(command) {
    switch (command & COMMAND_MASK) {
        case COMMAND_RESTORE:
        case COMMAND_SEEK:
        case COMMAND_STEP:
        case COMMAND_STEPU:
        case COMMAND_STEP_IN:
        case COMMAND_STEP_INU:
        case COMMAND_STEP_OUT:
        case COMMAND_STEP_OUTU:
            return CommandType.TYPE_I;
        case COMMAND_READ:
        case COMMAND_READM:
        case COMMAND_WRITE:
        case COMMAND_WRITEM:
            return CommandType.TYPE_II;
        case COMMAND_READ_ADDRESS:
        case COMMAND_READ_TRACK:
        case COMMAND_WRITE_TRACK:
            return CommandType.TYPE_III;
        case COMMAND_FORCE_INTERRUPT:
            return CommandType.TYPE_IV;
        default:
            throw new Error("Unknown command 0x" + z80_base_1.toHexByte(command));
    }
}
/**
 * Whether a command is for reading or writing.
 */
function isReadWriteCommand(command) {
    switch (getCommandType(command)) {
        case CommandType.TYPE_II:
        case CommandType.TYPE_III:
            return true;
        default:
            return false;
    }
}
/**
 * State of a physical drive.
 */
class FloppyDrive {
    constructor() {
        this.physicalTrack = 0;
        this.writeProtected = true;
        this.floppyDisk = undefined;
    }
}
/**
 * The disk controller. We only emulate the WD1791/93, not the Model I's WD1771.
 */
class FloppyDiskController {
    constructor(foo) {
        // Registers.
        this.status = STATUS_TRACK_ZERO | STATUS_NOT_READY;
        this.track = 0;
        this.sector = 0;
        this.data = 0;
        // Internal state.
        this.currentCommand = COMMAND_RESTORE;
        this.side = trs80_base_1.Side.FRONT;
        this.doubleDensity = false;
        this.currentDrive = 0;
        this.motorOn = false;
        // ID index found in by last COMMAND_READ_ADDRESS.
        this.lastReadAddress = undefined;
        // State for current command.
        this.dataIndex = 0;
        this.sectorData = undefined;
        // Floppy drives.
        this.drives = [];
        // Timeout handle for turning off the motor.
        this.motorOffTimeoutHandle = undefined;
        // Which drive is currently active, for lighting up an LED.
        this.onMotorOn = new strongly_typed_events_1.SimpleEventDispatcher();
        this.machine = foo;
        for (let i = 0; i < DRIVE_COUNT; i++) {
            this.drives.push(new FloppyDrive());
        }
    }
    /**
     * Put a floppy in the specified drive (0 to 3).
     */
    loadFloppyDisk(floppyDisk, driveNumber) {
        if (driveNumber < 0 || driveNumber >= this.drives.length) {
            throw new Error("Invalid drive number " + driveNumber);
        }
        this.drives[driveNumber].floppyDisk = floppyDisk;
    }
    readStatus() {
        // If no disk was loaded into drive 0, just pretend that we don't
        // have a disk system. Otherwise we have to hold down Break while
        // booting (to get to cassette BASIC) and that's annoying.
        if (this.drives[0].floppyDisk === undefined) {
            return 0xFF;
        }
        this.updateStatus();
        // Clear interrupt.
        this.machine.diskIntrqInterrupt(false);
        return this.status;
    }
    readTrack() {
        return this.track;
    }
    readSector() {
        return this.sector;
    }
    /**
     * Read a byte of data from the sector.
     */
    readData() {
        const drive = this.drives[this.currentDrive];
        // The read command can do various things depending on the specific
        // current command, but we only support reading from the diskette.
        switch (this.currentCommand & COMMAND_MASK) {
            case COMMAND_READ:
                // Keep reading from the buffer.
                if (this.sectorData !== undefined && (this.status & STATUS_DRQ) !== 0 && drive.floppyDisk !== undefined) {
                    this.data = this.sectorData.data[this.dataIndex];
                    this.dataIndex++;
                    if (this.dataIndex >= this.sectorData.data.length) {
                        this.sectorData = undefined;
                        this.status &= ~STATUS_DRQ;
                        this.machine.diskDrqInterrupt(false);
                        this.machine.eventScheduler.cancelByEventTypeMask(EventScheduler_1.EventType.DISK_LOST_DATA);
                        this.machine.eventScheduler.add(EventScheduler_1.EventType.DISK_DONE, this.machine.tStateCount + 64, () => this.done(0));
                    }
                }
                break;
            default:
                // Might be okay, not sure.
                throw new Error("Unhandled case in readData()");
        }
        return this.data;
    }
    /**
     * Set current command.
     */
    writeCommand(cmd) {
        const drive = this.drives[this.currentDrive];
        // Cancel "lost data" event.
        this.machine.eventScheduler.cancelByEventTypeMask(EventScheduler_1.EventType.DISK_LOST_DATA);
        this.machine.diskIntrqInterrupt(false);
        this.sectorData = undefined;
        this.currentCommand = cmd;
        // Kick off anything that's based on the command.
        switch (cmd & COMMAND_MASK) {
            case COMMAND_RESTORE:
                this.lastReadAddress = undefined;
                drive.physicalTrack = 0;
                this.track = 0;
                this.status = STATUS_TRACK_ZERO | STATUS_BUSY;
                if ((cmd & MASK_V) != 0) {
                    this.verify();
                }
                this.machine.eventScheduler.add(EventScheduler_1.EventType.DISK_DONE, this.machine.tStateCount + 2000, () => this.done(0));
                break;
            case COMMAND_SEEK:
                this.lastReadAddress = undefined;
                drive.physicalTrack += this.data - this.track;
                this.track = this.data;
                if (drive.physicalTrack <= 0) {
                    // this.track too?
                    drive.physicalTrack = 0;
                    this.status = STATUS_TRACK_ZERO | STATUS_BUSY;
                }
                else {
                    this.status = STATUS_BUSY;
                }
                // Should this set lastDirection?
                if ((cmd & MASK_V) != 0) {
                    this.verify();
                }
                this.machine.eventScheduler.add(EventScheduler_1.EventType.DISK_DONE, this.machine.tStateCount + 2000, () => this.done(0));
                break;
            case COMMAND_READ:
                // Read the sector. The bytes will be read later.
                this.lastReadAddress = undefined;
                this.status = STATUS_BUSY;
                // Not sure how to use this. Ignored for now:
                const goalSide = (cmd & MASK_C) === 0 ? undefined : booleanToSide((cmd & MASK_B) !== 0);
                console.log(`Sector read: ${drive.physicalTrack}, ${this.sector}, ${this.side}`);
                const sectorData = drive.floppyDisk === undefined
                    ? undefined
                    : drive.floppyDisk.readSector(drive.physicalTrack, this.side, this.sector);
                if (sectorData === undefined) {
                    this.machine.eventScheduler.add(EventScheduler_1.EventType.DISK_DONE, this.machine.tStateCount + 512, () => this.done(0));
                    console.error(`Didn't find sector ${this.sector} on track ${drive.physicalTrack}`);
                }
                else {
                    let newStatus = 0;
                    if (sectorData.deleted) {
                        newStatus |= STATUS_DELETED;
                    }
                    if (sectorData.crcError) {
                        newStatus |= STATUS_CRC_ERROR;
                    }
                    this.sectorData = sectorData;
                    this.dataIndex = 0;
                    this.machine.eventScheduler.add(EventScheduler_1.EventType.DISK_FIRST_DRQ, this.machine.tStateCount + 64, () => this.firstDrq(newStatus));
                }
                break;
            case COMMAND_WRITE:
                console.log(`Sector write: ${drive.physicalTrack}, ${this.sector}, ${this.side}`);
                this.status = STATUS_WRITE_PROTECTED;
                break;
            case COMMAND_FORCE_INTERRUPT:
                // Stop whatever is going on and forget it.
                this.machine.eventScheduler.cancelByEventTypeMask(EventScheduler_1.EventType.DISK_ALL);
                this.status = 0;
                this.updateStatus();
                if ((cmd & 0x07) !== 0) {
                    throw new Error("Conditional interrupt features not implemented");
                }
                else if ((cmd & 0x08) !== 0) {
                    // Immediate interrupt.
                    this.machine.diskIntrqInterrupt(true);
                }
                else {
                    this.machine.diskIntrqInterrupt(false);
                }
                break;
            default:
                throw new Error("Don't handle command 0x" + z80_base_1.toHexByte(cmd));
        }
    }
    writeTrack(track) {
        this.track = track;
    }
    writeSector(sector) {
        this.sector = sector;
    }
    writeData(data) {
        const command = this.currentCommand & COMMAND_MASK;
        if (command === COMMAND_WRITE || command === COMMAND_WRITE_TRACK) {
            throw new Error("Can't yet write data");
        }
        this.data = data;
    }
    /**
     * Select a drive.
     */
    writeSelect(value) {
        this.status &= ~STATUS_NOT_READY;
        this.side = booleanToSide((value & SELECT_SIDE) !== 0);
        this.doubleDensity = (value & SELECT_MFM) != 0;
        if ((value & SELECT_WAIT) != 0) {
            // If there was an event pending, simulate waiting until it was due.
            const event = this.machine.eventScheduler.getFirstEvent(EventScheduler_1.EventType.DISK_ALL & ~EventScheduler_1.EventType.DISK_LOST_DATA);
            if (event !== undefined) {
                // This puts the clock ahead immediately, but the main loop of the emulator
                // will then sleep to make the real-time correct.
                // TODO is this legit? Can we use another method?
                this.machine.tStateCount = event.tStateCount;
                this.machine.eventScheduler.dispatch(this.machine.tStateCount);
            }
        }
        // Which drive is being enabled?
        const previousDrive = this.currentDrive;
        switch (value & SELECT_DRIVE_MASK) {
            case 0:
                this.status |= STATUS_NOT_READY;
                break;
            case SELECT_DRIVE_0:
                this.currentDrive = 0;
                break;
            case SELECT_DRIVE_1:
                this.currentDrive = 1;
                break;
            case SELECT_DRIVE_2:
                this.currentDrive = 2;
                break;
            case SELECT_DRIVE_3:
                this.currentDrive = 3;
                break;
            default:
                throw new Error("Not drive specified in select: 0x" + z80_base_1.toHexByte(value));
        }
        if (this.currentDrive !== previousDrive) {
            this.updateMotorOn();
        }
        // If a drive was selected, turn on its motor.
        if ((this.status & STATUS_NOT_READY) == 0) {
            this.setMotorOn(true);
            // Set timer to later turn off motor.
            if (this.motorOffTimeoutHandle !== undefined) {
                this.machine.eventScheduler.cancel(this.motorOffTimeoutHandle);
            }
            this.motorOffTimeoutHandle = this.machine.eventScheduler.add(undefined, this.machine.tStateCount + MOTOR_TIME_AFTER_SELECT * this.machine.clockHz, () => {
                this.motorOffTimeoutHandle = undefined;
                this.status |= STATUS_NOT_READY;
                this.setMotorOn(false);
            });
        }
    }
    /**
     * Verify that head is on the expected track. Set either STATUS_NOT_FOUND or
     * STATUS_SEEK_ERROR if a problem is found.
     */
    verify() {
        const drive = this.drives[this.currentDrive];
        if (drive.floppyDisk === undefined) {
            this.status |= STATUS_NOT_FOUND;
        }
        else if (drive.physicalTrack !== this.track) {
            this.status |= STATUS_SEEK_ERROR;
        }
        else {
            // Make sure a sector exists on this track.
            const sectorData = drive.floppyDisk.readSector(this.track, trs80_base_1.Side.FRONT, undefined);
            if (sectorData === undefined) {
                this.status |= STATUS_NOT_FOUND;
            }
            if (this.doubleDensity && !drive.floppyDisk.supportsDoubleDensity) {
                this.status |= STATUS_NOT_FOUND;
            }
        }
    }
    /**
     * If we're doing a non-read/write command, update the status with the state
     * of the disk, track, and head position.
     */
    updateStatus() {
        if (isReadWriteCommand(this.currentCommand)) {
            // Don't modify status.
            return;
        }
        const drive = this.drives[this.currentDrive];
        if (drive.floppyDisk === undefined) {
            this.status |= STATUS_INDEX;
        }
        else {
            // See if we're over the index hole.
            if (this.angle() < HOLE_WIDTH) {
                this.status |= STATUS_INDEX;
            }
            else {
                this.status &= ~STATUS_INDEX;
            }
            // See if the diskette is write protected.
            if (drive.writeProtected || !SUPPORT_WRITING) {
                this.status |= STATUS_WRITE_PROTECTED;
            }
            else {
                this.status &= ~STATUS_WRITE_PROTECTED;
            }
        }
        // See if we're on track 0, which for some reason has a special bit.
        if (drive.physicalTrack === 0) {
            this.status |= STATUS_TRACK_ZERO;
        }
        else {
            this.status &= ~STATUS_TRACK_ZERO;
        }
        // RDY and HLT inputs are wired together on TRS-80 I/III/4/4P.
        if ((this.status & STATUS_NOT_READY) !== 0) {
            this.status &= ~STATUS_HEAD_ENGAGED;
        }
        else {
            this.status |= STATUS_HEAD_ENGAGED;
        }
    }
    /**
     * Turn motor on or off.
     */
    setMotorOn(motorOn) {
        if (motorOn !== this.motorOn) {
            this.motorOn = motorOn;
            this.machine.diskMotorOffInterrupt(!motorOn);
            this.updateMotorOn();
        }
    }
    /**
     * Dispatch a change to the motor light.
     */
    updateMotorOn() {
        this.onMotorOn.dispatch(this.motorOn ? this.currentDrive : undefined);
    }
    // Return a value in [0,1) indicating how far we've rotated
    // from the leading edge of the index hole. For the first HOLE_WIDTH we're
    // on the hole itself.
    angle() {
        // Use simulated time.
        const clocksPerRevolution = Math.round(this.machine.clockHz / (RPM / 60));
        return (this.machine.tStateCount % clocksPerRevolution) / clocksPerRevolution;
    }
    /**
     * Event used for delayed command completion.  Clears BUSY,
     * sets any additional bits specified, and generates a command
     * completion interrupt.
     */
    done(bits) {
        this.status &= ~STATUS_BUSY;
        this.status |= bits;
        this.machine.diskIntrqInterrupt(true);
    }
    /**
     * Event to abort the last command with LOST_DATA if it is
     * still in progress.
     */
    lostData(cmd) {
        if (this.currentCommand === cmd) {
            this.status &= ~STATUS_BUSY;
            this.status |= STATUS_LOST_DATA;
            this.sectorData = undefined;
            this.machine.diskIntrqInterrupt(true);
        }
    }
    /**
     * Event used as a delayed command start. Sets DRQ, generates a DRQ interrupt,
     * sets any additional bits specified, and schedules a lostData() event.
     */
    firstDrq(bits) {
        this.status |= STATUS_DRQ | bits;
        this.machine.diskDrqInterrupt(true);
        // Evaluate this now, not when the callback is run.
        const currentCommand = this.currentCommand;
        // If we've not finished our work within half a second, trigger a lost data interrupt.
        this.machine.eventScheduler.add(EventScheduler_1.EventType.DISK_LOST_DATA, this.machine.tStateCount + this.machine.clockHz / 2, () => this.lostData(currentCommand));
    }
}
exports.FloppyDiskController = FloppyDiskController;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonUniformPromiseSimpleEventList = exports.PromiseSimpleEventList = exports.PromiseSimpleEventHandlingBase = exports.PromiseSimpleEventDispatcher = exports.PromiseSignalList = exports.PromiseSignalHandlingBase = exports.PromiseSignalDispatcher = exports.NonUniformPromiseEventList = exports.PromiseEventList = exports.PromiseEventHandlingBase = exports.PromiseEventDispatcher = exports.SignalList = exports.SignalHandlingBase = exports.SignalDispatcher = exports.NonUniformSimpleEventList = exports.SimpleEventList = exports.SimpleEventHandlingBase = exports.SimpleEventDispatcher = exports.NonUniformEventList = exports.EventList = exports.EventHandlingBase = exports.EventDispatcher = exports.HandlingBase = exports.PromiseDispatcherBase = exports.PromiseSubscription = exports.DispatchError = exports.EventManagement = exports.EventListBase = exports.DispatcherWrapper = exports.DispatcherBase = exports.Subscription = void 0;
var ste_core_1 = __webpack_require__(0);
Object.defineProperty(exports, "Subscription", { enumerable: true, get: function () { return ste_core_1.Subscription; } });
Object.defineProperty(exports, "DispatcherBase", { enumerable: true, get: function () { return ste_core_1.DispatcherBase; } });
Object.defineProperty(exports, "DispatcherWrapper", { enumerable: true, get: function () { return ste_core_1.DispatcherWrapper; } });
Object.defineProperty(exports, "EventListBase", { enumerable: true, get: function () { return ste_core_1.EventListBase; } });
Object.defineProperty(exports, "EventManagement", { enumerable: true, get: function () { return ste_core_1.EventManagement; } });
Object.defineProperty(exports, "DispatchError", { enumerable: true, get: function () { return ste_core_1.DispatchError; } });
Object.defineProperty(exports, "PromiseSubscription", { enumerable: true, get: function () { return ste_core_1.PromiseSubscription; } });
Object.defineProperty(exports, "PromiseDispatcherBase", { enumerable: true, get: function () { return ste_core_1.PromiseDispatcherBase; } });
Object.defineProperty(exports, "HandlingBase", { enumerable: true, get: function () { return ste_core_1.HandlingBase; } });
var ste_events_1 = __webpack_require__(70);
Object.defineProperty(exports, "EventDispatcher", { enumerable: true, get: function () { return ste_events_1.EventDispatcher; } });
Object.defineProperty(exports, "EventHandlingBase", { enumerable: true, get: function () { return ste_events_1.EventHandlingBase; } });
Object.defineProperty(exports, "EventList", { enumerable: true, get: function () { return ste_events_1.EventList; } });
Object.defineProperty(exports, "NonUniformEventList", { enumerable: true, get: function () { return ste_events_1.NonUniformEventList; } });
var ste_simple_events_1 = __webpack_require__(73);
Object.defineProperty(exports, "SimpleEventDispatcher", { enumerable: true, get: function () { return ste_simple_events_1.SimpleEventDispatcher; } });
Object.defineProperty(exports, "SimpleEventHandlingBase", { enumerable: true, get: function () { return ste_simple_events_1.SimpleEventHandlingBase; } });
Object.defineProperty(exports, "SimpleEventList", { enumerable: true, get: function () { return ste_simple_events_1.SimpleEventList; } });
Object.defineProperty(exports, "NonUniformSimpleEventList", { enumerable: true, get: function () { return ste_simple_events_1.NonUniformSimpleEventList; } });
var ste_signals_1 = __webpack_require__(76);
Object.defineProperty(exports, "SignalDispatcher", { enumerable: true, get: function () { return ste_signals_1.SignalDispatcher; } });
Object.defineProperty(exports, "SignalHandlingBase", { enumerable: true, get: function () { return ste_signals_1.SignalHandlingBase; } });
Object.defineProperty(exports, "SignalList", { enumerable: true, get: function () { return ste_signals_1.SignalList; } });
var ste_promise_events_1 = __webpack_require__(78);
Object.defineProperty(exports, "PromiseEventDispatcher", { enumerable: true, get: function () { return ste_promise_events_1.PromiseEventDispatcher; } });
Object.defineProperty(exports, "PromiseEventHandlingBase", { enumerable: true, get: function () { return ste_promise_events_1.PromiseEventHandlingBase; } });
Object.defineProperty(exports, "PromiseEventList", { enumerable: true, get: function () { return ste_promise_events_1.PromiseEventList; } });
Object.defineProperty(exports, "NonUniformPromiseEventList", { enumerable: true, get: function () { return ste_promise_events_1.NonUniformPromiseEventList; } });
var ste_promise_signals_1 = __webpack_require__(29);
Object.defineProperty(exports, "PromiseSignalDispatcher", { enumerable: true, get: function () { return ste_promise_signals_1.PromiseSignalDispatcher; } });
Object.defineProperty(exports, "PromiseSignalHandlingBase", { enumerable: true, get: function () { return ste_promise_signals_1.PromiseSignalHandlingBase; } });
Object.defineProperty(exports, "PromiseSignalList", { enumerable: true, get: function () { return ste_promise_signals_1.PromiseSignalList; } });
var ste_promise_simple_events_1 = __webpack_require__(83);
Object.defineProperty(exports, "PromiseSimpleEventDispatcher", { enumerable: true, get: function () { return ste_promise_simple_events_1.PromiseSimpleEventDispatcher; } });
Object.defineProperty(exports, "PromiseSimpleEventHandlingBase", { enumerable: true, get: function () { return ste_promise_simple_events_1.PromiseSimpleEventHandlingBase; } });
Object.defineProperty(exports, "PromiseSimpleEventList", { enumerable: true, get: function () { return ste_promise_simple_events_1.PromiseSimpleEventList; } });
Object.defineProperty(exports, "NonUniformPromiseSimpleEventList", { enumerable: true, get: function () { return ste_promise_simple_events_1.NonUniformPromiseSimpleEventList; } });


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatcherBase = void 0;
const __1 = __webpack_require__(0);
/**
 * Base class for implementation of the dispatcher. It facilitates the subscribe
 * and unsubscribe methods based on generic handlers. The TEventType specifies
 * the type of event that should be exposed. Use the asEvent to expose the
 * dispatcher as event.
 */
class DispatcherBase {
    constructor() {
        this._wrap = new __1.DispatcherWrapper(this);
        this._subscriptions = new Array();
    }
    /**
     * Returns the number of subscriptions.
     *
     * @readonly
     *
     * @memberOf DispatcherBase
     */
    get count() {
        return this._subscriptions.length;
    }
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    subscribe(fn) {
        if (fn) {
            this._subscriptions.push(this.createSubscription(fn, false));
        }
        return () => {
            this.unsubscribe(fn);
        };
    }
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    sub(fn) {
        return this.subscribe(fn);
    }
    /**
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    one(fn) {
        if (fn) {
            this._subscriptions.push(this.createSubscription(fn, true));
        }
        return () => {
            this.unsubscribe(fn);
        };
    }
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    has(fn) {
        if (!fn)
            return false;
        return this._subscriptions.some((sub) => sub.handler == fn);
    }
    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    unsubscribe(fn) {
        if (!fn)
            return;
        for (let i = 0; i < this._subscriptions.length; i++) {
            if (this._subscriptions[i].handler == fn) {
                this._subscriptions.splice(i, 1);
                break;
            }
        }
    }
    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    unsub(fn) {
        this.unsubscribe(fn);
    }
    /**
     * Generic dispatch will dispatch the handlers with the given arguments.
     *
     * @protected
     * @param {boolean} executeAsync `True` if the even should be executed async.
     * @param {*} scrop The scope of the event. The scope becomes the `this` for handler.
     * @param {IArguments} args The arguments for the event.
     * @returns {(IPropagationStatus | null)} The propagation status, or if an `executeAsync` is used `null`.
     *
     * @memberOf DispatcherBase
     */
    _dispatch(executeAsync, scope, args) {
        //execute on a copy because of bug #9
        for (let sub of [...this._subscriptions]) {
            let ev = new __1.EventManagement(() => this.unsub(sub.handler));
            let nargs = Array.prototype.slice.call(args);
            nargs.push(ev);
            let s = sub;
            s.execute(executeAsync, scope, nargs);
            //cleanup subs that are no longer needed
            this.cleanup(sub);
            if (!executeAsync && ev.propagationStopped) {
                return { propagationStopped: true };
            }
        }
        if (executeAsync) {
            return null;
        }
        return { propagationStopped: false };
    }
    createSubscription(handler, isOnce) {
        return new __1.Subscription(handler, isOnce);
    }
    /**
     * Cleans up subs that ran and should run only once.
     */
    cleanup(sub) {
        if (sub.isOnce && sub.isExecuted) {
            let i = this._subscriptions.indexOf(sub);
            if (i > -1) {
                this._subscriptions.splice(i, 1);
            }
        }
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent() {
        return this._wrap;
    }
    /**
     * Clears all the subscriptions.
     */
    clear() {
        this._subscriptions.splice(0, this._subscriptions.length);
    }
}
exports.DispatcherBase = DispatcherBase;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchError = void 0;
/**
 * Indicates an error with dispatching.
 *
 * @export
 * @class DispatchError
 * @extends {Error}
 */
class DispatchError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.DispatchError = DispatchError;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatcherWrapper = void 0;
/**
 * Hides the implementation of the event dispatcher. Will expose methods that
 * are relevent to the event.
 */
class DispatcherWrapper {
    /**
     * Creates a new EventDispatcherWrapper instance.
     * @param dispatcher The dispatcher.
     */
    constructor(dispatcher) {
        this._subscribe = (fn) => dispatcher.subscribe(fn);
        this._unsubscribe = (fn) => dispatcher.unsubscribe(fn);
        this._one = (fn) => dispatcher.one(fn);
        this._has = (fn) => dispatcher.has(fn);
        this._clear = () => dispatcher.clear();
        this._count = () => dispatcher.count;
    }
    /**
     * Returns the number of subscriptions.
     *
     * @readonly
     * @type {number}
     * @memberOf DispatcherWrapper
     */
    get count() {
        return this._count();
    }
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    subscribe(fn) {
        return this._subscribe(fn);
    }
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    sub(fn) {
        return this.subscribe(fn);
    }
    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    unsubscribe(fn) {
        this._unsubscribe(fn);
    }
    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    unsub(fn) {
        this.unsubscribe(fn);
    }
    /**
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     */
    one(fn) {
        return this._one(fn);
    }
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    has(fn) {
        return this._has(fn);
    }
    /**
     * Clears all the subscriptions.
     */
    clear() {
        this._clear();
    }
}
exports.DispatcherWrapper = DispatcherWrapper;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListBase = void 0;
/**
 * Base class for event lists classes. Implements the get and remove.
 */
class EventListBase {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name) {
        let event = this._events[name];
        if (event) {
            return event;
        }
        event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name) {
        delete this._events[name];
    }
}
exports.EventListBase = EventListBase;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManagement = void 0;
/**
 * Allows the user to interact with the event.
 *
 * @class EventManagement
 * @implements {IEventManagement}
 */
class EventManagement {
    constructor(unsub) {
        this.unsub = unsub;
        this.propagationStopped = false;
    }
    stopPropagation() {
        this.propagationStopped = true;
    }
}
exports.EventManagement = EventManagement;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlingBase = void 0;
/**
 * Base class that implements event handling. With a an
 * event list this base class will expose events that can be
 * subscribed to. This will give your class generic events.
 *
 * @export
 * @abstract
 * @class HandlingBase
 * @template TEventHandler
 * @template TDispatcher
 * @template TList
 */
class HandlingBase {
    constructor(events) {
        this.events = events;
    }
    /**
     * Subscribes once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    one(name, fn) {
        this.events.get(name).one(fn);
    }
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    has(name, fn) {
        return this.events.get(name).has(fn);
    }
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name, fn) {
        this.events.get(name).subscribe(fn);
    }
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    sub(name, fn) {
        this.subscribe(name, fn);
    }
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name, fn) {
        this.events.get(name).unsubscribe(fn);
    }
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsub(name, fn) {
        this.unsubscribe(name, fn);
    }
}
exports.HandlingBase = HandlingBase;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseDispatcherBase = void 0;
const __1 = __webpack_require__(0);
class PromiseDispatcherBase extends __1.DispatcherBase {
    constructor() {
        super();
    }
    _dispatch(executeAsync, scope, args) {
        throw new __1.DispatchError("_dispatch not supported. Use _dispatchAsPromise.");
    }
    createSubscription(handler, isOnce) {
        return new __1.PromiseSubscription(handler, isOnce);
    }
    /**
     * Generic dispatch will dispatch the handlers with the given arguments.
     *
     * @protected
     * @param {boolean} executeAsync `True` if the even should be executed async.
     * @param {*} scrop The scope of the event. The scope becomes the `this` for handler.
     * @param {IArguments} args The arguments for the event.
     * @returns {(IPropagationStatus | null)} The propagation status, or if an `executeAsync` is used `null`.
     *
     * @memberOf DispatcherBase
     */
    async _dispatchAsPromise(executeAsync, scope, args) {
        //execute on a copy because of bug #9
        for (let sub of [...this._subscriptions]) {
            let ev = new __1.EventManagement(() => this.unsub(sub.handler));
            let nargs = Array.prototype.slice.call(args);
            nargs.push(ev);
            let ps = sub;
            await ps.execute(executeAsync, scope, nargs);
            //cleanup subs that are no longer needed
            this.cleanup(sub);
            if (!executeAsync && ev.propagationStopped) {
                return { propagationStopped: true };
            }
        }
        if (executeAsync) {
            return null;
        }
        return { propagationStopped: false };
    }
}
exports.PromiseDispatcherBase = PromiseDispatcherBase;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseSubscription = void 0;
class PromiseSubscription {
    /**
     * Creates an instance of Subscription.
     *
     * @param {TEventHandler} handler The handler for the subscription.
     * @param {boolean} isOnce Indicates if the handler should only be executed once.
     */
    constructor(handler, isOnce) {
        this.handler = handler;
        this.isOnce = isOnce;
        /**
         * Indicates if the subscription has been executed before.
         */
        this.isExecuted = false;
    }
    /**
     * Executes the handler.
     *
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} scope The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    async execute(executeAsync, scope, args) {
        if (!this.isOnce || !this.isExecuted) {
            this.isExecuted = true;
            //TODO: do we need to cast to any -- seems yuck
            var fn = this.handler;
            if (executeAsync) {
                setTimeout(() => {
                    fn.apply(scope, args);
                }, 1);
                return;
            }
            let result = fn.apply(scope, args);
            await result;
        }
    }
}
exports.PromiseSubscription = PromiseSubscription;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
/**
 * Stores a handler. Manages execution meta data.
 * @class Subscription
 * @template TEventHandler
 */
class Subscription {
    /**
     * Creates an instance of Subscription.
     *
     * @param {TEventHandler} handler The handler for the subscription.
     * @param {boolean} isOnce Indicates if the handler should only be executed once.
     */
    constructor(handler, isOnce) {
        this.handler = handler;
        this.isOnce = isOnce;
        /**
         * Indicates if the subscription has been executed before.
         */
        this.isExecuted = false;
    }
    /**
     * Executes the handler.
     *
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} scope The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    execute(executeAsync, scope, args) {
        if (!this.isOnce || !this.isExecuted) {
            this.isExecuted = true;
            var fn = this.handler;
            if (executeAsync) {
                setTimeout(() => {
                    fn.apply(scope, args);
                }, 1);
            }
            else {
                fn.apply(scope, args);
            }
        }
    }
}
exports.Subscription = Subscription;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Core
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonUniformEventList = exports.EventList = exports.EventHandlingBase = exports.EventDispatcher = void 0;
const EventDispatcher_1 = __webpack_require__(11);
Object.defineProperty(exports, "EventDispatcher", { enumerable: true, get: function () { return EventDispatcher_1.EventDispatcher; } });
const EventHandlingBase_1 = __webpack_require__(71);
Object.defineProperty(exports, "EventHandlingBase", { enumerable: true, get: function () { return EventHandlingBase_1.EventHandlingBase; } });
const EventList_1 = __webpack_require__(24);
Object.defineProperty(exports, "EventList", { enumerable: true, get: function () { return EventList_1.EventList; } });
const NonUniformEventList_1 = __webpack_require__(72);
Object.defineProperty(exports, "NonUniformEventList", { enumerable: true, get: function () { return NonUniformEventList_1.NonUniformEventList; } });


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandlingBase = void 0;
const ste_core_1 = __webpack_require__(0);
const EventList_1 = __webpack_require__(24);
/**
 * Extends objects with signal event handling capabilities.
 */
class EventHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new EventList_1.EventList());
    }
}
exports.EventHandlingBase = EventHandlingBase;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NonUniformEventList = void 0;
const EventDispatcher_1 = __webpack_require__(11);
/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */
class NonUniformEventList {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name) {
        if (this._events[name]) {
            // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
            return this._events[name];
        }
        const event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name) {
        delete this._events[name];
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new EventDispatcher_1.EventDispatcher();
    }
}
exports.NonUniformEventList = NonUniformEventList;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NonUniformSimpleEventList = exports.SimpleEventList = exports.SimpleEventHandlingBase = exports.SimpleEventDispatcher = void 0;
const SimpleEventDispatcher_1 = __webpack_require__(12);
Object.defineProperty(exports, "SimpleEventDispatcher", { enumerable: true, get: function () { return SimpleEventDispatcher_1.SimpleEventDispatcher; } });
const SimpleEventHandlingBase_1 = __webpack_require__(74);
Object.defineProperty(exports, "SimpleEventHandlingBase", { enumerable: true, get: function () { return SimpleEventHandlingBase_1.SimpleEventHandlingBase; } });
const NonUniformSimpleEventList_1 = __webpack_require__(75);
Object.defineProperty(exports, "NonUniformSimpleEventList", { enumerable: true, get: function () { return NonUniformSimpleEventList_1.NonUniformSimpleEventList; } });
const SimpleEventList_1 = __webpack_require__(25);
Object.defineProperty(exports, "SimpleEventList", { enumerable: true, get: function () { return SimpleEventList_1.SimpleEventList; } });


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleEventHandlingBase = void 0;
const ste_core_1 = __webpack_require__(0);
const SimpleEventList_1 = __webpack_require__(25);
/**
 * Extends objects with signal event handling capabilities.
 */
class SimpleEventHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new SimpleEventList_1.SimpleEventList());
    }
}
exports.SimpleEventHandlingBase = SimpleEventHandlingBase;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NonUniformSimpleEventList = void 0;
const SimpleEventDispatcher_1 = __webpack_require__(12);
/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */
class NonUniformSimpleEventList {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name) {
        if (this._events[name]) {
            // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
            return this._events[name];
        }
        const event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name) {
        delete this._events[name];
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new SimpleEventDispatcher_1.SimpleEventDispatcher();
    }
}
exports.NonUniformSimpleEventList = NonUniformSimpleEventList;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Promise Signals
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalList = exports.SignalHandlingBase = exports.SignalDispatcher = void 0;
const SignalDispatcher_1 = __webpack_require__(26);
Object.defineProperty(exports, "SignalDispatcher", { enumerable: true, get: function () { return SignalDispatcher_1.SignalDispatcher; } });
const SignalHandlingBase_1 = __webpack_require__(77);
Object.defineProperty(exports, "SignalHandlingBase", { enumerable: true, get: function () { return SignalHandlingBase_1.SignalHandlingBase; } });
const SignalList_1 = __webpack_require__(27);
Object.defineProperty(exports, "SignalList", { enumerable: true, get: function () { return SignalList_1.SignalList; } });


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalHandlingBase = void 0;
const ste_core_1 = __webpack_require__(0);
const SignalList_1 = __webpack_require__(27);
/**
 * Extends objects with signal event handling capabilities.
 */
class SignalHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new SignalList_1.SignalList());
    }
}
exports.SignalHandlingBase = SignalHandlingBase;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Core
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonUniformPromiseEventList = exports.PromiseEventList = exports.PromiseEventHandlingBase = exports.PromiseEventDispatcher = void 0;
const PromiseEventDispatcher_1 = __webpack_require__(13);
Object.defineProperty(exports, "PromiseEventDispatcher", { enumerable: true, get: function () { return PromiseEventDispatcher_1.PromiseEventDispatcher; } });
const PromiseEventHandlingBase_1 = __webpack_require__(79);
Object.defineProperty(exports, "PromiseEventHandlingBase", { enumerable: true, get: function () { return PromiseEventHandlingBase_1.PromiseEventHandlingBase; } });
const PromiseEventList_1 = __webpack_require__(28);
Object.defineProperty(exports, "PromiseEventList", { enumerable: true, get: function () { return PromiseEventList_1.PromiseEventList; } });
const NonUniformPromiseEventList_1 = __webpack_require__(80);
Object.defineProperty(exports, "NonUniformPromiseEventList", { enumerable: true, get: function () { return NonUniformPromiseEventList_1.NonUniformPromiseEventList; } });


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseEventHandlingBase = void 0;
const ste_core_1 = __webpack_require__(0);
const PromiseEventList_1 = __webpack_require__(28);
/**
 * Extends objects with signal event handling capabilities.
 */
class PromiseEventHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new PromiseEventList_1.PromiseEventList());
    }
}
exports.PromiseEventHandlingBase = PromiseEventHandlingBase;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NonUniformPromiseEventList = void 0;
const PromiseEventDispatcher_1 = __webpack_require__(13);
/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */
class NonUniformPromiseEventList {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name) {
        if (this._events[name]) {
            // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
            return this._events[name];
        }
        const event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name) {
        delete this._events[name];
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new PromiseEventDispatcher_1.PromiseEventDispatcher();
    }
}
exports.NonUniformPromiseEventList = NonUniformPromiseEventList;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseSignalDispatcher = void 0;
const ste_core_1 = __webpack_require__(0);
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event.
 */
class PromiseSignalDispatcher extends ste_core_1.PromiseDispatcherBase {
    /**
     * Creates a new SignalDispatcher instance.
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the signal.
     *
     * @returns {IPropagationStatus} The status of the dispatch.
     *
     * @memberOf SignalDispatcher
     */
    async dispatch() {
        const result = await this._dispatchAsPromise(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the signal threaded.
     */
    dispatchAsync() {
        this._dispatchAsPromise(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.PromiseSignalDispatcher = PromiseSignalDispatcher;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseSignalHandlingBase = void 0;
const ste_core_1 = __webpack_require__(0);
const PromiseSignalList_1 = __webpack_require__(30);
/**
 * Extends objects with signal event handling capabilities.
 */
class PromiseSignalHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new PromiseSignalList_1.PromiseSignalList());
    }
}
exports.PromiseSignalHandlingBase = PromiseSignalHandlingBase;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Core
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonUniformPromiseSimpleEventList = exports.PromiseSimpleEventList = exports.PromiseSimpleEventHandlingBase = exports.PromiseSimpleEventDispatcher = void 0;
const NonUniformPromiseSimpleEventList_1 = __webpack_require__(84);
Object.defineProperty(exports, "NonUniformPromiseSimpleEventList", { enumerable: true, get: function () { return NonUniformPromiseSimpleEventList_1.NonUniformPromiseSimpleEventList; } });
const PromiseSimpleEventDispatcher_1 = __webpack_require__(14);
Object.defineProperty(exports, "PromiseSimpleEventDispatcher", { enumerable: true, get: function () { return PromiseSimpleEventDispatcher_1.PromiseSimpleEventDispatcher; } });
const PromiseSimpleEventHandlingBase_1 = __webpack_require__(85);
Object.defineProperty(exports, "PromiseSimpleEventHandlingBase", { enumerable: true, get: function () { return PromiseSimpleEventHandlingBase_1.PromiseSimpleEventHandlingBase; } });
const PromiseSimpleEventList_1 = __webpack_require__(31);
Object.defineProperty(exports, "PromiseSimpleEventList", { enumerable: true, get: function () { return PromiseSimpleEventList_1.PromiseSimpleEventList; } });


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NonUniformPromiseSimpleEventList = void 0;
const PromiseSimpleEventDispatcher_1 = __webpack_require__(14);
/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */
class NonUniformPromiseSimpleEventList {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name) {
        if (this._events[name]) {
            // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
            return this._events[name];
        }
        const event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name) {
        delete this._events[name];
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new PromiseSimpleEventDispatcher_1.PromiseSimpleEventDispatcher();
    }
}
exports.NonUniformPromiseSimpleEventList = NonUniformPromiseSimpleEventList;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseSimpleEventHandlingBase = void 0;
const ste_core_1 = __webpack_require__(0);
const PromiseSimpleEventList_1 = __webpack_require__(31);
/**
 * Extends objects with signal event handling capabilities.
 */
class PromiseSimpleEventHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new PromiseSimpleEventList_1.PromiseSimpleEventList());
    }
}
exports.PromiseSimpleEventHandlingBase = PromiseSimpleEventHandlingBase;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
const Utils_1 = __webpack_require__(8);
const gCssPrefix = Utils_1.CSS_PREFIX + "-progress-bar";
const gScreenNodeCssClass = gCssPrefix + "-screen-node";
const gBarCssClass = gCssPrefix + "-bar";
const gSubbarCssClass = gCssPrefix + "-subbar";
const GLOBAL_CSS = "." + gBarCssClass + ` {
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

.` + gScreenNodeCssClass + ` {
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
        screenNode.classList.add(gScreenNodeCssClass);
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
        const styleId = gCssPrefix;
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
exports.ProgressBar = ProgressBar;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CassettePlayer = void 0;
/**
 * Interface for fetching cassette audio data. We make this a concrete
 * class because rollup.js can't handle exported interfaces.
 */
class CassettePlayer {
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
exports.CassettePlayer = CassettePlayer;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
const trs80_base_1 = __webpack_require__(3);
const EditorFont_1 = __webpack_require__(89);
const ControlPanel_1 = __webpack_require__(34);
/**
 * Allows the user to edit the in-memory Basic program directly in an HTML text widget,
 * writing the result back into memory.
 */
class Editor {
    constructor(trs80, screen) {
        this.editing = false;
        this.wasStarted = false;
        this.trs80 = trs80;
        this.screen = screen;
        const width = screen.getWidth();
        const height = screen.getHeight();
        EditorFont_1.addCssFontToPage();
        // This is the "stage" node, which provides perspective for its children.
        this.node = document.createElement("div");
        this.node.style.perspective = "1000px";
        // This is the card that will be flipped around.
        this.card = document.createElement("div");
        this.card.style.width = width + "px";
        this.card.style.height = height + "px";
        this.card.style.position = "relative";
        this.card.style.transition = "transform 0.5s ease-in-out";
        this.card.style.transformStyle = "preserve-3d";
        this.node.append(this.card);
        // This is the "front" of the card, which is the TRS-80 screen.
        const screenNode = screen.getNode();
        screenNode.style.position = "absolute";
        screenNode.style.backfaceVisibility = "hidden";
        screenNode.style.transform = "rotateY(0deg)"; // Need this for backface-visibility to work.
        // This is the "back" of the card, which is the editor.
        this.editorNode = document.createElement("div");
        this.editorNode.style.position = "absolute";
        this.editorNode.style.width = width + "px";
        this.editorNode.style.height = height + "px";
        this.editorNode.style.backfaceVisibility = "hidden";
        this.editorNode.style.transform = "rotateY(180deg)";
        this.card.append(screenNode, this.editorNode);
        // The text editor sits in the editor node, on the back of the card.
        const fontSize = Math.round(24 * screen.scale);
        this.textarea = document.createElement("textarea");
        this.textarea.style.width = width + "px";
        this.textarea.style.height = height + "px";
        this.textarea.style.padding = this.screen.padding + "px";
        this.textarea.style.border = "0";
        this.textarea.style.borderRadius = this.screen.getBorderRadius() + "px";
        this.textarea.style.fontFamily = `"TreasureMIII64C", monospace`;
        this.textarea.style.fontSize = fontSize + "px";
        this.textarea.style.lineHeight = fontSize + "px";
        this.textarea.style.outline = "0";
        this.textarea.style.boxSizing = "border-box";
        this.textarea.placeholder = "Write your Basic program here...";
        this.editorNode.append(this.textarea);
        // Control panel for saving/canceling.
        const controlPanel = new ControlPanel_1.ControlPanel(this.editorNode);
        controlPanel.addSaveButton(() => this.save());
        controlPanel.addCancelButton(() => this.cancel());
        this.hide();
        // For Ctrl-Enter quick edit/save.
        window.addEventListener("keydown", e => this.keyboardListener(e));
    }
    /**
     * Grab the program from memory and start the editor.
     */
    startEdit() {
        const basicProgram = this.trs80.getBasicProgramFromMemory();
        if (typeof basicProgram === "string") {
            // TODO show error.
            console.error(basicProgram);
        }
        else {
            this.wasStarted = this.trs80.stop();
            this.setProgram(basicProgram);
            this.show();
        }
    }
    /**
     * Provide hot key for edit/save.
     * @param e
     */
    keyboardListener(e) {
        if (e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.key === "Enter") {
            if (this.editing) {
                this.save();
                e.preventDefault();
                e.stopPropagation();
            }
            else {
                // If the emulator is not running, then the user's not paying attention to it and
                // we shouldn't invoke the editor.
                if (this.trs80.started) {
                    this.startEdit();
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        }
    }
    /**
     * Save the program back out to memory and close the editor.
     */
    save() {
        const newBasicBinary = trs80_base_1.parseBasicText(this.textarea.value);
        if (typeof newBasicBinary === "string") {
            this.showError(newBasicBinary);
            return;
        }
        const newBasicProgram = trs80_base_1.decodeBasicProgram(newBasicBinary);
        if (newBasicProgram === undefined) {
            // I don't know how this might happen.
            this.showError("Can't decode Basic program");
            return;
        }
        this.trs80.loadBasicProgram(newBasicProgram);
        this.close();
    }
    /**
     * Cancel the editor, losing the contents.
     */
    cancel() {
        this.close();
    }
    /**
     * Close the editor and restart the emulator, if necessary.
     */
    close() {
        if (this.wasStarted) {
            this.trs80.start();
        }
        this.hide();
    }
    /**
     * Show a temporary compile error.
     */
    showError(error) {
        const errorNode = document.createElement("div");
        errorNode.innerText = error;
        errorNode.style.position = "absolute";
        errorNode.style.left = "50%";
        errorNode.style.top = "40%";
        errorNode.style.transform = "translate(-50%, 0)";
        errorNode.style.whiteSpace = "nowrap";
        errorNode.style.fontFamily = `"TreasureMIII64C", monospace`;
        errorNode.style.fontSize = "48px";
        errorNode.style.padding = "20px 30px 0 30px";
        errorNode.style.color = "white";
        errorNode.style.backgroundColor = "rgba(40, 40, 40, 0.8)";
        errorNode.style.borderRadius = "999px";
        errorNode.style.opacity = "0";
        errorNode.style.transition = "opacity .20s ease-in-out";
        this.editorNode.append(errorNode);
        setTimeout(() => {
            errorNode.style.opacity = "1";
            setTimeout(() => {
                errorNode.style.opacity = "0";
                setTimeout(() => {
                    errorNode.remove();
                }, 500);
            }, 2000);
        }, 0);
    }
    /**
     * Fill the text editor with this program.
     */
    setProgram(basicProgram) {
        const parts = [];
        for (const element of basicProgram.elements) {
            if (element.elementType === trs80_base_1.ElementType.LINE_NUMBER && parts.length > 0) {
                parts.push("\n");
            }
            parts.push(element.text);
        }
        this.textarea.value = parts.join("");
    }
    /**
     * Show the editor (back of the card).
     */
    show() {
        this.card.style.transform = "rotateY(180deg)";
        this.textarea.style.color = this.screen.getForegroundColor();
        this.textarea.style.backgroundColor = this.screen.getBackgroundColor();
        this.textarea.focus();
        this.editing = true;
    }
    /**
     * Hide the editor (show the front).
     */
    hide() {
        this.card.style.transform = "rotateY(0deg)";
        this.editing = false;
    }
}
exports.Editor = Editor;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Another Man's Treasure font, for the editor.
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCssFontToPage = void 0;
const Utils_1 = __webpack_require__(8);
const FONT_CSS_ID_NAME = Utils_1.CSS_PREFIX + "-css-font";
// Kept in a different file so the long text isn't in our way.
const FONT_CSS = `
@font-face {
    /* http://www.kreativekorp.com/software/fonts/index.shtml#retro */
    font-family: "TreasureMIII64C";
    src: url("data:font/ttf;base64,AAEAAAAKAIAAAwAgT1MvMo/ITg4AAAEoAAAAYGNtYXDl2APGAAAQrAAAAiRnbHlmfKdewwAAIfgAAZTcaGVhZAblu0AAAACsAAAANmhoZWEOdglCAAAA5AAAACRobXR42mHlKAAAAYgAAA8kbG9jYQMSP6AAABLQAAAPKG1heHAD+gDCAAABCAAAACBuYW1lQWtiywABttQAAAdncG9zdIeZwIkAAb48AAAeKAABAAAAAQAAQWWVvF8PPPUAAwlgAAAAAM9qOacAAAAAz2o5pwAA/BgI/AV4AAAADAAAAAEAAAAAAAEAAAV4/BgAAAlgAAAAAAj8AAEAAAAAAAAAAAAAAAAAAAPJAAEAAAPJAMAAMAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAwMjAfQABQAABLAJYAAABLAEsAlgAAAEsADIArwAAAAAAAAAAAAAAACAAACvUAfwygAAADAAAAAAS0JuUAAAAAD//QV4/BgAAAV4A+ggAAABAAAAAAPoBXgAAAAgAAAAAAAAAyAAAAAAAAADIAAAAyABkAMgAMgDIABkAyAAyAMgAGQDIABkAyABLAMgASwDIADIAyAAyAMgAMgDIAEsAyAAZAMgAZADIABkAyAAZAMgAMgDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAZADIAEsAyAAyAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgASwDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAyAMgAGQDIABkAyAAZAMgAGQDIADIAyAAZAMgAMgDIABkAyAAyAMgAMgDIAAAAyABLAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyABLAMgAGQDIABkAyABLAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAyAMgAZADIADIAyAAZAMgAAADIAGQAyAAyAMgAGQDIABkAyAAyAMgAZADIADIAyAAyAMgAAADIABkAyAAZAMgAGQDIABkAyAAAAMgAGQDIADIAyAAyAMgAMgDIADIAyABLAMgAMgDIABkAyABkAMgASwDIAEsAyAAZAMgAAADIABkAyAAZAMgAGQDIABkAyAAyAMgAMgDIADIAyAAZAMgAMgDIADIAyAAyAMgAMgDIADIAyAAyAMgAMgDIADIAyABLAMgASwDIAEsAyABLAMgAGQDIABkAyAAyAMgAMgDIADIAyAAZAMgAMgDIADIAyAAZAMgAGQDIABkAyAAZAMgAGQDIADIAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIADIAyAAZAMgAGQDIABkAyAAZAMgAGQDIAEsAyABLAMgASwDIAEsAyAAZAMgAGQDIADIAyAAyAMgAMgDIABkAyAAyAMgAMgDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAMgDIABkAyABLAMgAGQDIAEsAyAAyAMgAMgDIABkAyAAZAMgAMgDIABkAyAAZAMgAAADIADIAyAAZAMgAGQDIADIAyAAyAMgASwDIAGQAyAAyAMgAZADIAEsAyABLAMgAGQDIADIAyAAAAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyABLAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAMgDIADIAyAAyAMgAGQDIABkAyAAZAMgASwDIADIAyAAZAMgAMgDIABkAyAAyAMgAGQDIABkAyAAZAMgAGQDIAEsAyAAyAMgASwDIABkAyAAyAMgAMgDIABkAyAAZAMgAMgDIADIAyAAyAMgAGQDIABkAyAAyAMgAGQDIABkAyAAZAMgAGQDIADIAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIADIAyAAAAMgAAADIAEsAyABLAMgASwDIAEsAyAAyAMgAMgDIADIAyAAyAMgAMgDIADIAyAAyAMgAMgDIAGQAyAAyAMgAGQDIAGQAyAAZAMgAGQDIADIAyAAyAMgAMgDIABkAyAAAAMgAGQDIAAAAyAAAAMgAAADIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAMgDIADIAyAAyAMgAMgDIADIAyAAyAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIAAAAyAAZAMgAGQDIADIAyAAyAMgAMgDIADIAyAAyAMgAGQDIABkAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAZADIAAAAyAAAAMgAAADIAAAAyACvAMgAAADIAGQAyAAAAMgAAADIAAAAyAAAAMgAAADIAGQAyAAAAMgAAADIABkAyAAZAMgAGQDIABkAyAAAAMgAAADIAAAAyAAAAMgAMgJYABkCWAAZAMgAAADIAAAAyAAAAMgAMgDIADIAyAAAAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAMgDIABkAyABLAMgASwDIAEsAyAAyAMgASwDIAEsAyAAZAMgAGQDIABkAyAAZAMgAMgDIABkAyABLAMgAGQDIADIAyAAZAMgAMgDIADIAyAAyAMgAGQDIABkAyAAAAMgAGQDIAAAAyAAZAMgAAADIABkAyAAAAMgAGQDIAAAAyAAZAMgAAADIABkAyAAAAMgAMgDIABkAyAAZAMgAAADIABkAyAAAAMgAGQDIAAAAyAAZAMgAAADIADIAyAAZAMgAAADIABkAyAAAAMgASwDIADIAyAAZAMgAGQDIADIAyAAZAMgAMgDIABkAyAAAAMgAAADIABkAyAAAAMgAAADIABkAyAAAAMgAAADIABkAyAAAAMgAAADIABkAyAAAAMgAAADIABkAyAAZAMgAGQDIABkAyAAZAMgAMgDIABkAyAAyAMgAGQDIADIAyAAyAMgAGQDIABkAyAAZAMgAGQDIABkAyAAyAMgAGQDIABkAyAAZAMgAGQDIABkAyAAAAMgAMgDIABkAyAAAAMgAAADIAAAAyAAAAMgASwDIADIAyAAAAMgAGQDIAGQAyAAZAMgAGQDIADIAyAAZAMgAMgDIABkAyAAZAMgAGQDIAGQAyAAZAMgAGQDIADIAyAAZAMgAGQDIADIAyAAZAMgAGQDIABkAyAAZAMgAGQDIADIAyAAZAMgAGQDIABkAyAAZAMgAMgDIADIAyAAyAMgAGQDIAAAAyABkAMgAMgDIABkAyAAyAMgAGQDIABkAyABLAMgASwDIADIAyAAyAMgAMgDIAEsAyAAZAMgAZADIABkAyAAZAMgAMgDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAZADIAEsAyAAyAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgASwDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAyAMgAGQDIABkAyAAZAMgAGQDIADIAyAAZAMgAMgDIABkAyAAyAMgAMgDIAAAAyABLAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyABLAMgAGQDIABkAyABLAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAyAMgAZADIADIAyAAZAMgAMgDIAAAAyAAAAMgAZADIAAAAyAAAAMgAAADIAAAAyAAAAMgAZADIAAAAyABkAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAZADIAAAAyABkAMgAAADIAAAAyAAAAMgAAADIAAAAyABkAMgAAADIAGQAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAZAMgAGQDIABkAyAAZAMgAAADIAAAAyAAyAMgAMgDIABkAyAAZAMgAGQDIAEsAyAAyAMgASwDIABkAyAAyAMgAMgDIABkAyAAZAMgAMgDIADIAyAAyAMgAGQDIABkAyAAyAMgAGQDIABkAyAAZAMgAMgDIABkAyAAZAMgAGQDIABkAyAAZAMgAMgDIABkAyAAZAMgAGQDIADIAyAAZAMgAMgDIABkAyAAZAMgAGQDIABkAyAAyAMgAGQDIAAAAyAAZAMgAGQDIADIAyAAAAMgAGQDIAAAAyAAAAMgAGQDIAAAAyAAAAMgAMgDIAGQAyAAAAMgAMgDIADIAyAAyAMgAMgDIABkAyAAyAMgAGQDIABkAyAAyAMgAMgDIADIAyAAyAMgAMgDIADIAyAAyAMgAMgDIADIAyAAyAMgAMgDIABkAyAAZAMgAMgDIADIAyAAyAMgAGQDIABkAyAAyAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAyAMgAMgDIADIAyAAyAMgAGQDIABkAyAAZAMgAMgDIABkAyAAZAMgAGQDIADIAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIADIAyAAZAMgAGQDIADIAyAAZAMgAGQDIABkAyAAZAMgAGQDIADIAyAAZAMgASwDIAEsAyAAyAMgASwDIABkAyAAyAMgASwDIADIAyAAyAMgAMgDIADIAyAAyAMgAMgDIADIAyAAyAMgAGQDIABkAyAAZAMgAMgDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAMgDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIAEsAyAAZAMgAGQDIADIAyAAZAMgAMgDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIADIAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAyAMgAMgDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIAEsAyABLAMgAMgDIAEsAyAAZAMgAMgDIAEsAyAAyAMgAMgDIADIAyAAyAMgAMgDIADIAyAAyAMgAMgDIABkAyAAZAMgAGQDIADIAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIADIAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyABLAMgAGQDIABkAyAAyAMgAGQDIADIAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAyAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAGQDIABkAyAAZAMgAAAAAAACAAAAAwAAABQAAwABAAAAFAAEAhAAAACAAIAABgAAAAAAfgEBATEBQgFTAWEBeAF+AZICJwI3AscCywLdA6EDziAVICcgMSA6ID0gRCCsIQYhFyEeISAhIiEnIgIiDSISIhUiHiIrIkgiYCJlIwIjByMYI34lnyXIJcol5iYcJh4mOyZCJmcnEzACMBEwnDD84X/2GfcF+wL/n//9//8AAAAAACAAoAExAUEBUgFgAXgBfQGSAiYCNwLGAsoC2AOQA6MgECAYIDAgOSA8IEQgrCEFIRchHiEgISIhJiICIgYiDyIV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AAEG+AABBzwAAQekAAEICAABCLgAAQkMAAEJhAABCbQAAQowAAEKYAABCsgAAQroAAELLAABC6QAAQwcAAEMhAABDPwAAQ1YAAENvAABDjQAAQ6IAAEO1AABDzQAAQ/AAAEP+AABEFgAARCsAAERBAABEWwAARHUAAESKAABEpAAARL0AAETSAABE7AAARQYAAEUyAABFTAAARWUAAEV/AABFjAAARaYAAEXAAABF1QAARdUAAEXdAABF5QAARe0AAEX1AABF/QAARgoAAEYUAABGHAAARikAAEYxAABGOwAARkMAAEZNAABGVwAARl8AAEZnAABGdAAARoEAAEaOAABGlgAARp4AAEarAABGtQAARsIAAEbTAABG4AAARu8AAEb5AABHBQAARxEAAEcbAABHIwAARzAAAEc9AABHSgAAR1cAAEdkAABHdQAAR4QAAEeMAABHmQAAR6EAAEerAABHtQAAR8EAAEfNAABH1wAAR98AAEfsAABH+QAASAYAAEgQAABIGgAASCkAAEg1AABIPwAASE4AAEhYAABIZAAASGwAAEh2AABIgAAASIgAAEikAABIwAAASOAAAEkAAABJPgAASXwAAEmhAABJxgAASeUAAEoFAABKJQAASkoAAEpsAABKjQAASqcAAErSAABK4wAASwoAAEsrAABLQAAAS1cAAEt+AABLpgAAS7sAAEvQAABL5QAAS/YAAEwOAABMLwAATFsAAEx9AABMoAAATMYAAEzZAABM6gAATQwAAE00AABNUgAATXEAAE2SAABNtAAATfYAAE4cAABOPwAATl0AAE6FAABO4wAATxgAAE9SAABPaQAAT48AAE/BAABP6gAAUA8AAFAgAABQRwAAUI4AAFCuAABQ0AAAUNwAAFD7AABRNAAAUW8AAFGWAABRwAAAUdYAAFHgAABR6gAAUgAAAFIIAABSHQAAUjIAAFJHAABSXAAAUmwAAFKDAABSlQAAUqMAAFKzAABSzQAAUtUAAFLxAABTCwAAUykAAFM5AABTVgAAU3MAAFOLAABTqQAAU8IAAFPOAABT7wAAVA4AAFQ1AABUUgAAVHoAAFSYAABUuQAAVNUAAFTvAABVBAAAVR0AAFUqAABVVAAAVXgAAFWZAABVuAAAVc0AAFXpAABWCAAAViEAAFZCAABWbgAAVpgAAFbEAABW4QAAVvg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/zgAAAAAAAD/OAAAAMgAAP84AAAAAgDIAAACvAV4AAsADwAACQ8AyADIAAAAZAAAAMgAAP84AAD/nAAA/zgB9AAA/gwAAAPoAAABkAAA/nAAAP84AAD+cAAAAZAAAP2o/zgAAADIAAAAAQAAAlgBkAV4AAMAAAkDAAAAAAGQAAACWAMgAAD84AABAZACWAMgBXgAAwAACQMDIP5wAAABkAJYAAADIAAAAAEAAAJYAyAFeAADAAAJAwAAAAADIAAAAlgDIAAA/OAAAQAA/zgBkAJYAAMAAAkDAAAAAAGQAAD/OAMgAAD84AABAAD/OAGQBXgAAwAACQMAAAAAAZAAAP84BkAAAPnAAAIAAP84AyAFeAADAAcAAAkHAAAAAAGQAAABkP5wAAABkP84AyAAAPzgAyAAAAMgAAAAAAABAAD/OAMgBXgABQAACQUAAAAAAyAAAP5wAAD/OAZAAAD84AAA/OAAAQGQ/zgDIAJYAAMAAAkDAyD+cAAAAZD/OAAAAyAAAAACAAD/OAMgBXgAAwAHAAAJBwAAAAABkAAAAZD+cAAAAZACWAMgAAD84PzgAAADIAAAAAAAAQGQ/zgDIAV4AAMAAAkDAyD+cAAAAZD/OAAABkAAAAABAAD/OAMgBXgABQAACQUAAAAAAyAAAP5wAAACWAMgAAD5wAAAAyAAAQAA/zgDIAJYAAMAAAkDAAAAAAMgAAD/OAMgAAD84AABAAD/OAMgBXgABQAACQUAAAAAAZAAAAGQAAD/OAZAAAD84AAA/OAAAQAA/zgDIAV4AAUAAAkFAAAAAAGQAAABkAAA/zgDIAAAAyAAAPnAAAEAAP84AyAFeAADAAAJAwAAAAADIAAA/zgGQAAA+cAAAQAA/BgBkP84AAMAAAkDAAABkAAA/nD/OAAA/OAAAAACAAD8GAGQBXgAAwAHAAAJBwAAAZAAAP5wAAAAAAGQAAD/OAAA/OAAAAZAAyAAAPzgAAAAAgAA/BgDIAV4AAMABwAACQcAAAGQAAD+cAMg/nAAAAGQ/zgAAPzgAAAGQAAAAyAAAAAAAAIAAPwYAyAFeAADAAcAAAkHAAABkAAA/nAAAAAAAyAAAP84AAD84AAABkADIAAA/OAAAAABAAD8GAGQAlgAAwAACQMAAAGQAAD+cAJYAAD5wAAAAAEAAPwYAZAFeAADAAAJAwAAAZAAAP5wBXgAAPagAAAAAgAA/BgDIAV4AAMABwAACQcAAAGQAAD+cAMg/nAAAAGQAlgAAPnAAAAGQAAAAyAAAAAAAAEAAPwYAyAFeAAFAAAJBQAAAyAAAP5wAAD+cAV4AAD84AAA+cAAAAACAAD8GAMgAlgAAwAHAAAJBwAAAZAAAP5wAyD+cAAAAZD/OAAA/OAAAAMgAAADIAAAAAAAAwAA/BgDIAV4AAMABwALAAAJCwAAAZAAAP5wAAAAAAGQAAABkP5wAAABkP84AAD84AAABkADIAAA/OD84AAAAyAAAAACAAD8GAMgBXgAAwAHAAAJBwAAAZAAAP5wAyD+cAAAAZD/OAAA/OAAAAMgAAAGQAAAAAAAAgAA/BgDIAV4AAMACQAACQkAAAGQAAD+cAAAAAADIAAA/nAAAP84AAD84AAABkADIAAA+cAAAAMgAAAAAQAA/BgDIAJYAAUAAAkFAAADIAAA/nAAAP5wAlgAAPzgAAD84AAAAAEAAPwYAyAFeAAHAAAJBwAAAZAAAAGQAAD+cAAA/nAFeAAA/OAAAPzgAAD84AAAAAEAAPwYAyAFeAAHAAAJBwAAAZAAAAGQAAD+cAAA/nACWAAAAyAAAPnAAAD84AAAAAEAAPwYAyAFeAAFAAAJBQAAAyAAAP5wAAD+cAV4AAD5wAAA/OAAAAABAZD8GAMg/zgAAwAACQMDIP5wAAABkPwYAAADIAAAAAIAAPwYAyAFeAADAAcAAAkHAAAAAAGQAAABkP5wAAABkAJYAyAAAPzg+cAAAAMgAAAAAAACAZD8GAMgBXgAAwAHAAAJBwMg/nAAAAGQAAD+cAAAAZD8GAAAAyAAAAMgAAADIAAAAAAAAgAA/BgDIAV4AAMABwAACQcAAAAAAyAAAAAA/nAAAAGQAlgDIAAA/OD5wAAAAyAAAAAAAAIAAPwYAyACWAADAAcAAAkHAAAAAAGQAAABkP5wAAABkP84AyAAAPzg/OAAAAMgAAAAAAACAAD8GAMgBXgAAwAHAAAJBwAAAAABkAAAAZD+cAAAAZD/OAZAAAD5wPzgAAADIAAAAAAAAwAA/BgDIAV4AAMABwALAAAJCwAAAAABkAAAAZD+cAAAAZAAAP5wAAABkP84AyAAAPzg/OAAAAMgAAADIAAAAyAAAAACAAD8GAMgBXgABQAJAAAJCQAAAAADIAAA/nAAAAGQ/nAAAAGQ/zgGQAAA/OAAAPzg/OAAAAMgAAAAAAABAZD8GAMgAlgAAwAACQMDIP5wAAABkPwYAAAGQAAAAAIAAPwYAyAFeAADAAcAAAkHAAAAAAGQAAABkP5wAAABkAJYAyAAAPzg+cAAAAZAAAAAAAABAZD8GAMgBXgAAwAACQMDIP5wAAABkPwYAAAJYAAAAAEAAPwYAyAFeAAFAAAJBQAAAAADIAAA/nAAAAJYAyAAAPagAAAGQAABAAD8GAMgAlgABQAACQUAAAAAAyAAAP5wAAD/OAMgAAD5wAAAAyAAAQAA/BgDIAV4AAcAAAkHAAAAAAGQAAABkAAA/nAAAP84BkAAAPzgAAD5wAAAAyAAAQAA/BgDIAV4AAcAAAkHAAAAAAGQAAABkAAA/nAAAP84AyAAAAMgAAD2oAAAAyAAAQAA/BgDIAV4AAUAAAkFAAAAAAMgAAD+cAAA/zgGQAAA9qAAAAMgAAEAAPwYAyD/OAADAAAJAwAAAyAAAPzg/zgAAPzgAAAAAgAA/BgDIAV4AAMABwAACQcAAAMgAAD84AAAAAABkAAA/zgAAPzgAAAGQAMgAAD84AAAAAIAAPwYAyAFeAADAAcAAAkHAAADIAAA/OADIP5wAAABkP84AAD84AAABkAAAAMgAAAAAAACAAD8GAMgBXgAAwAHAAAJBwAAAyAAAPzgAAAAAAMgAAD/OAAA/OAAAAZAAyAAAPzgAAAAAQAA/BgDIAJYAAUAAAkFAAABkAAAAZAAAPzgAlgAAPzgAAD84AAAAAEAAPwYAyAFeAAFAAAJBQAAAZAAAAGQAAD84AV4AAD5wAAA/OAAAAACAAD8GAMgBXgABQAJAAAJCQAAAZAAAAGQAAD84AMg/nAAAAGQAlgAAPzgAAD84AAABkAAAAMgAAAAAAABAAD8GAMgBXgABwAACQcAAAMgAAD+cAAAAZAAAPzgBXgAAPzgAAD84AAA/OAAAAABAAD8GAMgAlgABQAACQUAAAGQAAABkAAA/OD/OAAAAyAAAPnAAAAAAgAA/BgDIAV4AAUACQAACQkAAAGQAAABkAAA/OAAAAAAAZAAAP84AAADIAAA+cAAAAZAAyAAAPzgAAAAAQAA/BgDIAV4AAUAAAkFAAABkAAAAZAAAPzg/zgAAAZAAAD2oAAAAAEAAPwYAyAFeAAHAAAJBwAAAZAAAP5w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Q01lZGl1bUJpdHNOUGljYXM6IEFub3RoZXJNYW5zVHJlYXN1cmVNSUlJNjRDOiAyMDE0QW5vdGhlciBNYW5zIFRyZWFzdXJlIE1JSUkgNjRDVmVyc2lvbiAxLjBBbm90aGVyTWFuc1RyZWFzdXJlTUlJSTY0Q01hZGUgd2l0aCBCaXRzJ24nUGljYXMgYnkgS3JlYXRpdmUgU29mdHdhcmVodHRwOi8vd3d3LmtyZWF0aXZla29ycC5jb20vc29mdHdhcmUvYml0c25waWNhcy8AQwByAGUAYQB0AGUAZAAgAGIAeQAgAFIAZQBiAGUAYwBjAGEAIABCAGUAdAB0AGUAbgBjAG8AdQByAHQAIAB3AGkAdABoACAARgBvAG4AdABGAG8AcgBnAGUAIAAyAC4AMAAgACgAaAB0AHQAcAA6AC8ALwBmAG8AbgB0AGYAbwByAGcAZQAuAHMAZgAuAG4AZQB0ACkAQQBuAG8AdABoAGUAcgAgAE0AYQBuAHMAIABUAHIAZQBhAHMAdQByAGUAIABNAEkASQBJACAANgA0AEMATQBlAGQAaQB1AG0AQgBpAHQAcwBOAFAAaQBjAGEAcwA6ACAAQQBuAG8AdABoAGUAcgBNAGEAbgBzAFQAcgBlAGEAcwB1AHIAZQBNAEkASQBJADYANABDADoAIAAyADAAMQA0AEEAbgBvAHQAaABlAHIAIABNAGEAbgBzACAAVAByAGUAYQBzAHUAcgBlACAATQBJAEkASQAgADYANABDAFYAZQByAHMAaQBvAG4AIAAxAC4AMABBAG4AbwB0AGgAZQByAE0AYQBuAHMAVAByAGUAYQBzAHUAcgBlAE0ASQBJAEkANgA0AEMATQBhAGQAZQAgAHcAaQB0AGgAIABCAGkAdABzACcAbgAnAFAAaQBjAGEAcwAgAGIAeQAgAEsAcgBlAGEAdABpAHYAZQAgAFMAbwBmAHQAdwBhAHIAZQBoAHQAdABwADoALwAvAHcAdwB3AC4AawByAGUAYQB0AGkAdgBlAGsAbwByAHAALgBjAG8AbQAvAHMAbwBmAHQAdwBhAHIAZQAvAGIAaQB0AHMAbgBwAGkAYwBhAHMALwAAAgAAAAAAAP84AMgAAAAAAAAAAAAAAAAAAAAAAAAAAAPJAAAAAQACAAMABAAFAAYABwAIAAkACgALAAwADQAOAA8AEAARABIAEwAUABUAFgAXABgAGQAaABsAHAAdAB4AHwAgACEAIgAjACQAJQAmACcAKAApACoAKwAsAC0ALgAvADAAMQAyADMANAA1ADYANwA4ADkAOgA7ADwAPQA+AD8AQABBAEIAQwBEAEUARgBHAEgASQBKAEsATABNAE4ATwBQAFEAUgBTAFQAVQBWAFcAWABZAFoAWwBcAF0AXgBfAGAAYQCsAKMAhACFAL0AlgDoAIYAjgCLAJ0AqQCkAQIAigDaAIMAkwDyAPMAjQCXAIgBAwDeAPEAngCqAPUA9AD2AKIArQDJAMcArgBiAGMAkABkAMsAZQDIAMoAzwDMAM0AzgDpAGYA0wDQANEArwBnAPAAkQDWANQA1QBoAOsA7QCJAGoAaQBrAG0AbABuAKAAbwBxAHAAcgBzAHUAdAB2AHcA6gB4AHoAeQB7AH0AfAC4AKEAfwB+AIAAgQDsAO4AugEEAQUA1wDiAOMAsACxAOQA5QC7AOYA5wCmAQYBBwEIANgA4QEJAQoA2wDcAN0A4AELAN8BDAENAQ4BDwEQAREBEgETARQBFQEWARcBGAEZARoBGwEcAR0BHgEfASABIQEiASMBJAElASYBJwEoASkBKgErASwBLQEuAS8BMAExATIBMwE0ATUBNgE3ATgBOQE6AJsBOwE8AT0BPgE/AUABQQFCAUMBRAFFAUYBRwFIAUkBSgFLALIAswFMALYAtwDEAU0AtAC1AMUBTgCCAMIAhwFPAVABUQCrAVIAxgFTAL4AvwFUAVUBVgFXAVgBWQFaAVsBXACMAJ8BXQCYAKgBXgFfAWABYQFiAWMBZACaAWUAmQDvALwApQFmAWcBaACSAJwApwCPAJQAlQFpAWoBawFsAW0BbgFvAXABcQFyAXMBdAF1AXYBdwF4AXkBegF7AXwBfQF+AX8BgAGBAYIBgwGEAYUBhgGHAYgBiQGKAYsBjAGNAY4BjwGQALkBkQGSAZMBlAGVAZYBlwGYAZkBmgGbAZwBnQGeAZ8BoAGhAaIBowGkAaUBpgGnAagBqQGqAasBrAGtAa4BrwGwAbEBsgGzAbQBtQG2AbcBuAG5AboBuwG8Ab0BvgG/AcABwQHCAcMBxAHFAcYBxwHIAckBygHLAcwBzQHOAc8B0AHRAdIB0wHUAdUB1gHXAdgB2QHaAdsB3AHdAd4B3wHgAeEB4gHjAeQB5QHmAecB6AHpAeoB6wHsAe0B7gHvAfAB8QHyAfMB9AH1AfYB9wH4AfkB+gH7AfwB/QH+Af8CAAIBAgICAwIEAgUCBgIHAggCCQIKAgsCDAINAg4CDwIQAhECEgITAhQCFQIWAhcCGAIZAhoCGwIcAh0CHgIfAiACIQIiAiMCJAIlAiYCJwIoAikCKgIrAiwCLQIuAi8CMAIxAjICMwI0AjUCNgI3AjgCOQI6AjsCPAI9Aj4CPwJAAkECQgJDAkQCRQJGAkcCSAJJAkoCSwJMAk0CTgJPAlACUQJSAlMCVAJVAlYCVwJYAlkCWgJbAlwCXQJeAl8CYAJhAmICYwJkAmUCZgJnAmgCaQJqAmsCbAJtAm4CbwJwAnECcgJzAnQCdQJ2AncCeAJ5AnoCewJ8An0CfgJ/AoACgQKCAoMChAKFAoYChwKIAokCigKLAowCjQKOAo8CkAKRApICkwKUApUClgKXApgCmQKaApsCnAKdAp4CnwKgAqECogKjAqQCpQKmAqcCqAKpAqoCqwKsAq0CrgKvArACsQKyArMCtAK1ArYCtwK4ArkCugK7ArwCvQK+Ar8CwALBAsICwwLEAsUCxgLHAsgCyQLKAssCzALNAs4CzwLQAtEC0gLTAtQC1QLWAtcC2ALZAtoC2wLcAt0C3gLfAuAC4QLiAuMC5ALlAuYC5wLoAukC6gLrAuwC7QLuAu8C8ALxAvIC8wL0AvUC9gL3AvgC+QL6AvsC/AL9Av4C/wMAAwEDAgMDAwQDBQMGAwcDCAMJAwoDCwMMAw0DDgMPAxADEQMSAxMDFAMVAxYDFwMYAxkDGgMbAxwDHQMeAx8DIAMhAyIDIwMkAyUDJgMnAygDKQMqAysDLAMtAy4DLwMwAzEDMgMzAzQDNQM2AzcDOAM5AzoDOwM8Az0DPgM/A0ADQQNCA0MDRANFA0YDRwNIA0kDSgNLA0wDTQNOA08DUANRA1IDUwNUA1UDVgNXA1gDWQNaA1sDXANdA14DXwNgA2EDYgNjA2QDZQNmA2cDaANpA2oDawNsA20DbgNvA3ADcQNyA3MDdAN1A3YDdwN4A3kDegN7A3wDfQN+A38DgAOBA4IDgwOEA4UDhgOHA4gDiQOKA4sDjAONA44DjwOQA5EDkgOTA5QDlQOWAMAAwQOXA5gDmQOaA5sDnAOdA54DnwOgA6EDogOjA6QDpQOmA6cDqAOpA6oDqwOsA60DrgOvA7ADsQOyA7MDtAO1A7YDtwO4A7kDugO7A7wDvQO+A78DwAPBA8IDwwPEA8UDxgPHA8gDyQPKA8sDzAPNA84DzwPQA9ED0gPTA9QD1QPWBmh5cGhlbg5wZXJpb2RjZW50ZXJlZAdBbWFjcm9uB2FtYWNyb24HdW5pMDIyNgd1bmkwMjI3B3VuaTAyMzcHdW5pMDJDQQd1bmkwMkNCBXRpbGRlEWlvdGFkaWVyZXNpc3Rvbm9zBUFscGhhBEJldGEFR2FtbWEFRGVsdGEHRXBzaWxvbgRaZXRhA0V0YQVUaGV0YQRJb3RhBUthcHBhBkxhbWJkYQJNdQJOdQJYaQdPbWljcm9uAlBpA1JobwVTaWdtYQNUYXUHVXBzaWxvbgNQaGkDQ2hpA1BzaQVPbWVnYQxJb3RhZGllcmVzaXMPVXBzaWxvbmRpZXJlc2lzCmFscGhhdG9ub3MMZXBzaWxvbnRvbm9zCGV0YXRvbm9zCWlvdGF0b25vcxR1cHNpbG9uZGllcmVzaXN0b25vcwVhbHBoYQRiZXRhBWdhbW1hBWRlbHRhB2Vwc2lsb24EemV0YQNldGEFdGhldGEEaW90YQVrYXBwYQZsYW1iZGECbXUCbnUCeGkHb21pY3JvbgNyaG8Gc2lnbWExBXNpZ21hA3RhdQd1cHNpbG9uA3BoaQNjaGkDcHNpBW9tZWdhDGlvdGFkaWVyZXNpcw91cHNpbG9uZGllcmVzaXMMb21pY3JvbnRvbm9zDHVwc2lsb250b25vcwpvbWVnYXRvbm9zB3VuaTIwMTAHdW5pMjAxMQd1bmkyMDEyCWFmaWkwMDIwOA1xdW90ZXJldmVyc2VkB3VuaTIwMUYHdW5pMjAyMwd1bmkyMDI0B3VuaTIwMjUHdW5pMjAyNwd1bmkyMDMxCWV4Y2xhbWRibAd1bmkyMDNECGZyYWN0aW9uBEV1cm8JYWZpaTYxMjQ4B3VuaTIxMDYHdW5pMjExNwd1bmkyMTFFB3VuaTIxMjAHdW5pMjEyNwd1bmkyMjA3B3VuaTIyMDgHdW5pMjIwOQd1bmkyMjBBB3VuaTIyMEIHdW5pMjIwQwd1bmkyMjBEB3VuaTIyMTAHdW5pMjIxQgd1bmkyMjFDB3VuaTIyMUQHdW5pMjMwMQVob3VzZQd1bmkyMzA3B3VuaTIzMTgHdW5pMjM3RQd1cGJsb2NrB3VuaTI1ODEHdW5pMjU4Mgd1bmkyNTgzB2RuYmxvY2sHdW5pMjU4NQd1bmkyNTg2B3VuaTI1ODcFYmxvY2sHdW5pMjU4OQd1bmkyNThBB3VuaTI1OEIHbGZibG9jawd1bmkyNThEB3VuaTI1OEUHdW5pMjU4RgdydGJsb2NrB2x0c2hhZGUFc2hhZGUHZGtzaGFkZQd1bmkyNTk0B3VuaTI1OTUHdW5pMjU5Ngd1bmkyNTk3B3VuaTI1OTgHdW5pMjU5OQd1bmkyNTlBB3VuaTI1OUIHdW5pMjU5Qwd1bmkyNTlEB3VuaTI1OUUHdW5pMjU5Rgd1bmkyNUM2B3VuaTI1QzcHdW5pMjVDOAd1bmkyNUUyB3VuaTI1RTMHdW5pMjVFNAd1bmkyNUU1Cm9wZW5idWxsZXQHdW5pMjYxQwd1bmkyNjFFB3VuaTI2MzkJc21pbGVmYWNlDGludnNtaWxlZmFjZQZmZW1hbGUHdW5pMjY0MQRtYWxlBXNwYWRlB3VuaTI2NjEHdW5pMjY2MgRjbHViB3VuaTI2NjQFaGVhcnQHZGlhbW9uZAd1bmkyNjY3B3VuaTI3MTMHdW5pMzAwMQd1bmkzMDAyB3VuaTMwMEMHdW5pMzAwRAd1bmkzMDBFB3VuaTMwMEYHdW5pMzAxMAd1bmkzMDExB3VuaTMwOTkHdW5pMzA5QQd1bmkzMDlCB3VuaTMwOUMHdW5pMzBBMQd1bmkzMEEyB3VuaTMwQTMHdW5pMzBBNAd1bmkzMEE1B3VuaTMwQTYHdW5pMzBBNwd1bmkzMEE4B3VuaTMwQTkHdW5pMzBBQQd1bmkzMEFCB3VuaTMwQUMHdW5pMzBBRAd1bmkzMEFFB3VuaTMwQUYHdW5pMzBCMAd1bmkzMEIxB3VuaTMwQjIHdW5pMzBCMwd1bmkzMEI0B3VuaTMwQjUHdW5pMzBCNgd1bmkzMEI3B3VuaTMwQjgHdW5pMzBCOQd1bmkzMEJBB3VuaTMwQkIHdW5pMzBCQwd1bmkzMEJEB3VuaTMwQkUHdW5pMzBCRgd1bmkzMEMwB3VuaTMwQzEHdW5pMzBDMgd1bmkzMEMzB3VuaTMwQzQHdW5pMzBDNQd1bmkzMEM2B3VuaTMwQzcHdW5pMzBDOAd1bmkzMEM5B3VuaTMwQ0EHdW5pMzBDQgd1bmkzMENDB3VuaTMwQ0QHdW5pMzBDRQd1bmkzMENGB3VuaTMwRDAHdW5pMzBEMQd1bmkzMEQyB3VuaTMwRDMHdW5pMzBENAd1bmkzMEQ1B3VuaTMwRDYHdW5pMzBENwd1bmkzMEQ4B3VuaTMwRDkHdW5pMzBEQQd1bmkzMERCB3VuaTMwREMHdW5pMzBERAd1bmkzMERFB3VuaTMwREYHdW5pMzBFMAd1bmkzMEUxB3VuaTMwRTIHdW5pMzBFMwd1bmkzMEU0B3VuaTMwRTUHdW5pMzBFNgd1bmkzMEU3B3VuaTMwRTgHdW5pMzBFOQd1bmkzMEVBB3VuaTMwRUIHdW5pMzBFQwd1bmkzMEVEB3VuaTMwRUUHdW5pMzBFRgd1bmkzMEYwB3VuaTMwRjEHdW5pMzBGMgd1bmkzMEYzB3VuaTMwRjQHdW5pMzBGNQd1bmkzMEY2B3VuaTMwRjcHdW5pMzBGOAd1bmkzMEY5B3VuaTMwRkEHdW5pMzBGQgd1bmkzMEZDB3VuaUUwMDAHdW5pRTAwMQd1bmlFMDAyB3VuaUUwMDMHdW5pRTAwNAd1bmlFMDA1B3VuaUUwMDYHdW5pRTAwNwd1bmlFMDA4B3VuaUUwMDkHdW5pRTAwQQd1bmlFMDBCB3VuaUUwMEMHdW5pRTAwRAd1bmlFMDBFB3VuaUUwMEYHdW5pRTAxMAd1bmlFMDExB3VuaUUwMTIHdW5pRTAxMwd1bmlFMDE0B3VuaUUwMTUHdW5pRTAxNgd1bmlFMDE3B3VuaUUwMTgHdW5pRTAxOQd1bmlFMDFBB3VuaUUwMUIHdW5pRTAxQwd1bmlFMDFEB3VuaUUwMUUHdW5pRTAxRgd1bmlFMDIwB3VuaUUwMjEHdW5pRTAyMgd1bmlFMDIzB3VuaUUwMjQHdW5pRTAyNQd1bmlFMDI2B3VuaUUwMjcHdW5pRTAyOAd1bmlFMDI5B3VuaUUwMkEHdW5pRTAyQgd1bmlFMDJDB3VuaUUwMkQHdW5pRTAyRQd1bmlFMDJGB3VuaUUwMzAHdW5pRTAzMQd1bmlFMDMyB3VuaUUwMzMHdW5pRTAzNAd1bmlFMDM1B3VuaUUwMzYHdW5pRTAzNwd1bmlFMDM4B3VuaUUwMzkHdW5pRTAzQQd1bmlFMDNCB3VuaUUwM0MHdW5pRTAzRAd1bmlFMDNFB3VuaUUwM0YHdW5pRTA0MAd1bmlFMDQxB3VuaUUwNDIHdW5pRTA0Mwd1bmlFMDQ0B3VuaUUwNDUHdW5pRTA0Ngd1bmlFMDQ3B3VuaUUwNDgHdW5pRTA0OQd1bmlFMDRBB3VuaUUwNEIHdW5pRTA0Qwd1bmlFMDREB3VuaUUwNEUHdW5pRTA0Rgd1bmlFMDUwB3VuaUUwNTEHdW5pRTA1Mgd1bmlFMDUzB3VuaUUwNTQHdW5pRTA1NQd1bmlFMDU2B3VuaUUwNTcHdW5pRTA1OAd1bmlFMDU5B3VuaUUwNUEHdW5pRTA1Qgd1bmlFMDVDB3VuaUUwNUQHdW5pRTA1RQd1bmlFMDVGB3VuaUUwNjAHdW5pRTA2MQd1bmlFMDYyB3VuaUUwNjMHdW5pRTA2NAd1bmlFMDY1B3VuaUUwNjYHdW5pRTA2Nwd1bmlFMDY4B3VuaUUwNjkHdW5pRTA2QQd1bmlFMDZCB3VuaUUwNkMHdW5pRTA2RAd1bmlFMDZFB3VuaUUwNkYHdW5pRTA3MAd1bmlFMDcxB3VuaUUwNzIHdW5pRTA3Mwd1bmlFMDc0B3VuaUUwNzUHdW5pRTA3Ngd1bmlFMDc3B3VuaUUwNzgHdW5pRTA3OQd1bmlFMDdBB3VuaUUwN0IHdW5pRTA3Qwd1bmlFMDdEB3VuaUUwN0UHdW5pRTA3Rgd1bmlFMDgwB3VuaUUwODEHdW5pRTA4Mgd1bmlFMDgzB3VuaUUwODQHdW5pRTA4NQd1bmlFMDg2B3VuaUUwODcHdW5pRTA4OAd1bmlFMDg5B3VuaUUwOEEHdW5pRTA4Qgd1bmlFMDhDB3VuaUUwOEQHdW5pRTA4RQd1bmlFMDhGB3VuaUUwOTAHdW5pRTA5MQd1bmlFMDkyB3VuaUUwOTMHdW5pRTA5NAd1bmlFMDk1B3VuaUUwOTYHdW5pRTA5Nwd1bmlFMDk4B3VuaUUwOTkHdW5pRTA5QQd1bmlFMDlCB3VuaUUwOUMHdW5pRTA5RAd1bmlFMDlFB3VuaUUwOUYHdW5pRTBBMAd1bmlFMEExB3VuaUUwQTIHdW5pRTBBMwd1bmlFMEE0B3VuaUUwQTUHdW5pRTBBNgd1bmlFMEE3B3VuaUUwQTgHdW5pRTBBOQd1bmlFMEFBB3VuaUUwQUIHdW5pRTBBQwd1bmlFMEFEB3VuaUUwQUUHdW5pRTBBRgd1bmlFMEIwB3VuaUUwQjEHdW5pRTBCMgd1bmlFMEIzB3VuaUUwQjQHdW5pRTBCNQd1bmlFMEI2B3VuaUUwQjcHdW5pRTBCOAd1bmlFMEI5B3VuaUUwQkEHdW5pRTBCQgd1bmlFMEJDB3VuaUUwQkQHdW5pRTBCRQd1bmlFMEJGB3VuaUUwQzAHdW5pRTBDMQd1bmlFMEMyB3VuaUUwQzMHdW5pRTBDNAd1bmlFMEM1B3VuaUUwQzYHdW5pRTBDNwd1bmlFMEM4B3VuaUUwQzkHdW5pRTBDQQd1bmlFMENCB3VuaUUwQ0MHdW5pRTBDRAd1bmlFMENFB3VuaUUwQ0YHdW5pRTBEMAd1bmlFMEQxB3VuaUUwRDIHdW5pRTBEMwd1bmlFMEQ0B3VuaUUwRDUHdW5pRTBENgd1bmlFMEQ3B3VuaUUwRDgHdW5pRTBEOQd1bmlFMERBB3VuaUUwREIHdW5pRTBEQwd1bmlFMEREB3VuaUUwREUHdW5pRTBERgd1bmlFMEUwB3VuaUUwRTEHdW5pRTBFMgd1bmlFMEUzB3VuaUUwRTQHdW5pRTBFNQd1bmlFMEU2B3VuaUUwRTcHdW5pRTBFOAd1bmlFMEU5B3VuaUUwRUEHdW5pRTBFQgd1bmlFMEVDB3VuaUUwRUQHdW5pRTBFRQd1bmlFMEVGB3VuaUUwRjAHdW5pRTBGMQd1bmlFMEYyB3VuaUUwRjMHdW5pRTBGNAd1bmlFMEY1B3VuaUUwRjYHdW5pRTBGNwd1bmlFMEY4B3VuaUUwRjkHdW5pRTBGQQd1bmlFMEZCB3VuaUUwRkMHdW5pRTBGRAd1bmlFMEZFB3VuaUUwRkYHdW5pRTEwMAd1bmlFMTAxB3VuaUUxMDIHdW5pRTEwMwd1bmlFMTA0B3VuaUUxMDUHdW5pRTEwNgd1bmlFMTA3B3VuaUUxMDgHdW5pRTEwOQd1bmlFMTBBB3VuaUUxMEIHdW5pRTEwQwd1bmlFMTBEB3VuaUUxMEUHdW5pRTEwRgd1bmlFMTEwB3VuaUUxMTEHdW5pRTExMgd1bmlFMTEzB3VuaUUxMTQHdW5pRTExNQd1bmlFMTE2B3VuaUUxMTcHdW5pRTExOAd1bmlFMTE5B3VuaUUxMUEHdW5pRTExQgd1bmlFMTFDB3VuaUUxMUQHdW5pRTExRQd1bmlFMTFGB3VuaUUxMjAHdW5pRTEyMQd1bmlFMTIyB3VuaUUxMjMHdW5pRTEyNAd1bmlFMTI1B3VuaUUxMjYHdW5pRTEyNwd1bmlFMTI4B3VuaUUxMjkHdW5pRTEyQQd1bmlFMTJCB3VuaUUxMkMHdW5pRTEyRAd1bmlFMTJFB3VuaUUxMkYHdW5pRTEzMAd1bmlFMTMxB3VuaUUxMzIHdW5pRTEzMwd1bmlFMTM0B3VuaUUxMzUHdW5pRTEzNgd1bmlFMTM3B3VuaUUxMzgHdW5pRTEzOQd1bmlFMTNBB3VuaUUxM0IHdW5pRTEzQwd1bmlFMTNEB3VuaUUxM0UHdW5pRTEzRgd1bmlFMTQwB3VuaUUxNDEHdW5pRTE0Mgd1bmlFMTQzB3VuaUUxNDQHdW5pRTE0NQd1bmlFMTQ2B3VuaUUxNDcHdW5pRTE0OAd1bmlFMTQ5B3VuaUUxNEEHdW5pRTE0Qgd1bmlFMTRDB3VuaUUxNEQHdW5pRTE0RQd1bmlFMTRGB3VuaUUxNTAHdW5pRTE1MQd1bmlFMTUyB3VuaUUxNTMHdW5pRTE1NAd1bmlFMTU1B3VuaUUxNTYHdW5pRTE1Nwd1bmlFMTU4B3VuaUUxNTkHdW5pRTE1QQd1bmlFMTVCB3VuaUUxNUMHdW5pRTE1RAd1bmlFMTVFB3VuaUUxNUYHdW5pRTE2MAd1bmlFMTYxB3VuaUUxNjIHdW5pRTE2Mwd1bmlFMTY0B3VuaUUxNjUHdW5pRTE2Ngd1bmlFMTY3B3VuaUUxNjgHdW5pRTE2OQd1bmlFMTZBB3VuaUUxNkIHdW5pRTE2Qwd1bmlFMTZEB3VuaUUxNkUHdW5pRTE2Rgd1bmlFMTcwB3VuaUUxNzEHdW5pRTE3Mgd1bmlFMTczB3VuaUUxNzQHdW5pRTE3NQd1bmlFMTc2B3VuaUUxNzcHdW5pRTE3OAd1bmlFMTc5B3VuaUUxN0EHdW5pRTE3Qgd1bmlFMTdDB3VuaUUxN0QHdW5pRTE3RQd1bmlFMTdGB3VuaUY2MTgHdW5pRjYxOQd1bmlGNzAwB3VuaUY3MDEHdW5pRjcwMgd1bmlGNzAzB3VuaUY3MDQHdW5pRjcwNQd1bmlGRjYxB3VuaUZGNjIHdW5pRkY2Mwd1bmlGRjY0B3VuaUZGNjUHdW5pRkY2Ngd1bmlGRjY3B3VuaUZGNjgHdW5pRkY2OQd1bmlGRjZBB3VuaUZGNkIHdW5pRkY2Qwd1bmlGRjZEB3VuaUZGNkUHdW5pRkY2Rgd1bmlGRjcwB3VuaUZGNzEHdW5pRkY3Mgd1bmlGRjczB3VuaUZGNzQHdW5pRkY3NQd1bmlGRjc2B3VuaUZGNzcHdW5pRkY3OAd1bmlGRjc5B3VuaUZGN0EHdW5pRkY3Qgd1bmlGRjdDB3VuaUZGN0QHdW5pRkY3RQd1bmlGRjdGB3VuaUZGODAHdW5pRkY4MQd1bmlGRjgyB3VuaUZGODMHdW5pRkY4NAd1bmlGRjg1B3VuaUZGODYHdW5pRkY4Nwd1bmlGRjg4B3VuaUZGODkHdW5pRkY4QQd1bmlGRjhCB3VuaUZGOEMHdW5pRkY4RAd1bmlGRjhFB3VuaUZGOEYHdW5pRkY5MAd1bmlGRjkxB3VuaUZGOTIHdW5pRkY5Mwd1bmlGRjk0B3VuaUZGOTUHdW5pRkY5Ngd1bmlGRjk3B3VuaUZGOTgHdW5pRkY5OQd1bmlGRjlBB3VuaUZGOUIHdW5pRkY5Qwd1bmlGRjlEB3VuaUZGOUUHdW5pRkY5Rgd1bmlGRkZE");
}
`;
/**
 * Add the above CSS to the page if it's not already there. Idempotent.
 */
function addCssFontToPage() {
    if (document.getElementById(FONT_CSS_ID_NAME) === null) {
        const node = document.createElement("style");
        node.id = FONT_CSS_ID_NAME;
        node.innerHTML = FONT_CSS;
        document.head.append(node);
    }
}
exports.addCssFontToPage = addCssFontToPage;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(91), exports);
__exportStar(__webpack_require__(92), exports);


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.concatByteArrays = exports.withCommas = exports.clearElement = void 0;
/**
 * Remove all children from element.
 */
function clearElement(e) {
    while (e.firstChild) {
        e.removeChild(e.firstChild);
    }
}
exports.clearElement = clearElement;
/**
 * Generate the string version of a number, in base 10, with commas for thousands groups.
 */
function withCommas(n) {
    let s = typeof n === "number" ? Math.round(n).toString(10) : n;
    const negative = s.length >= 1 && s.charAt(0) === "-";
    const firstDigit = negative ? 1 : 0;
    if (s.length - firstDigit > 4) {
        for (let i = s.length - 3; i > firstDigit; i -= 3) {
            s = s.substring(0, i) + "," + s.substring(i);
        }
    }
    return s;
}
exports.withCommas = withCommas;
/**
 * Concatenate a list of byte arrays into one.
 */
function concatByteArrays(samplesList) {
    const length = samplesList.reduce((sum, samples) => sum + samples.length, 0);
    const allBytes = new Uint8Array(length);
    let offset = 0;
    for (const samples of samplesList) {
        allBytes.set(samples, offset);
        offset += samples.length;
    }
    return allBytes;
}
exports.concatByteArrays = concatByteArrays;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteReader = exports.EOF = void 0;
exports.EOF = -1;
/**
 * Provides an API for reading through a byte array.
 */
class ByteReader {
    constructor(b) {
        this.b = b;
        this.pos = 0;
    }
    /**
     * Return the next byte, or EOF on end of array.
     *
     * @returns {number}
     */
    read() {
        return this.pos < this.b.length ? this.b[this.pos++] : exports.EOF;
    }
    /**
     * Return the next byte, not advancing the stream.
     *
     * @param ahead how many bytes ahead to peek, or 0 for the next byte
     * to be returned by {@link #read()}.
     */
    peek(ahead = 0) {
        const pos = this.pos + ahead;
        return pos < this.b.length ? this.b[pos] : exports.EOF;
    }
    /**
     * Return the byte address of the next byte to be read.
     */
    addr() {
        return this.pos;
    }
    /**
     * Reads a little-endian short (two-byte) integer.
     *
     * @param allowEofAfterFirstByte if true, an EOF after the first byte will result in just the
     * first byte. Otherwise an EOF is returned.
     * @returns the integer, or EOF on end of file.
     */
    readShort(allowEofAfterFirstByte) {
        const low = this.read();
        if (low === exports.EOF) {
            return exports.EOF;
        }
        const high = this.read();
        if (high === exports.EOF) {
            return allowEofAfterFirstByte ? low : exports.EOF;
        }
        return low + high * 256;
    }
    /**
     * Reads an ASCII string from the stream. If the returned string is shorter than "length", then we hit EOF.
     */
    readString(length) {
        return new TextDecoder("ascii").decode(this.readBytes(length));
    }
    /**
     * Returns the next "length" bytes. If the returned array is shorter than "length", then we hit EOF.
     */
    readBytes(length) {
        const pos = this.pos;
        length = Math.min(length, this.b.length - pos);
        this.pos += length;
        // So instead make a copy.
        return this.b.slice(pos, pos + length);
    }
}
exports.ByteReader = ByteReader;


/***/ })
/******/ ]);