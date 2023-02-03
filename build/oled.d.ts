/// <reference types="node" />
import { Board, Pin } from 'johnny-five';
declare enum Protocol {
    I2C = 0,
    SPI = 1
}
declare enum TransferType {
    Command = 0,
    Data = 1
}
type Direction = 'left' | 'left diagonal' | 'right' | 'right diagonal';
type Black = 0x00;
type White = 0x01 | 0xff;
export type Color = Black | White;
export type Pixel = [number, number, Color];
interface OledOptions {
    height?: number;
    width?: number;
    address?: number;
    microview?: boolean;
    secondaryPin?: number;
    resetPin?: number | null;
    data?: number;
    command?: number;
}
interface Font {
    monospace: boolean;
    width: number;
    height: number;
    fontData: number[];
    lookup: string[];
}
interface ScreenConfig {
    multiplex: number;
    compins: number;
    coloffset: number;
}
interface SPIConfig {
    dcPin: number;
    ssPin: number;
    rstPin: number;
    clkPin: number;
    mosiPin: number;
}
declare class Oled {
    readonly HEIGHT: number;
    readonly WIDTH: number;
    readonly ADDRESS: number;
    readonly PROTOCOL: Protocol;
    readonly MICROVIEW: boolean;
    readonly SECONDARYPIN: number;
    readonly RESETPIN: number;
    readonly DATA: number;
    readonly COMMAND: number;
    readonly board: Board;
    readonly five: any;
    readonly screenConfig: ScreenConfig;
    readonly SPIconfig: SPIConfig;
    dcPin: Pin;
    ssPin: Pin;
    clkPin: Pin;
    mosiPin: Pin;
    rstPin: Pin;
    static readonly DISPLAY_OFF: number;
    static readonly DISPLAY_ON: number;
    static readonly SET_DISPLAY_CLOCK_DIV: number;
    static readonly SET_MULTIPLEX: number;
    static readonly SET_DISPLAY_OFFSET: number;
    static readonly SET_START_LINE: number;
    static readonly CHARGE_PUMP: number;
    static readonly EXTERNAL_VCC: boolean;
    static readonly MEMORY_MODE: number;
    static readonly SEG_REMAP: number;
    static readonly COM_SCAN_DEC: number;
    static readonly COM_SCAN_INC: number;
    static readonly SET_COM_PINS: number;
    static readonly SET_CONTRAST: number;
    static readonly SET_PRECHARGE: number;
    static readonly SET_VCOM_DETECT: number;
    static readonly DISPLAY_ALL_ON_RESUME: number;
    static readonly NORMAL_DISPLAY: number;
    static readonly COLUMN_ADDR: number;
    static readonly PAGE_ADDR: number;
    static readonly INVERT_DISPLAY: number;
    static readonly ACTIVATE_SCROLL: number;
    static readonly DEACTIVATE_SCROLL: number;
    static readonly SET_VERTICAL_SCROLL_AREA: number;
    static readonly RIGHT_HORIZONTAL_SCROLL: number;
    static readonly LEFT_HORIZONTAL_SCROLL: number;
    static readonly VERTICAL_AND_RIGHT_HORIZONTAL_SCROLL: number;
    static readonly VERTICAL_AND_LEFT_HORIZONTAL_SCROLL: number;
    buffer: Buffer;
    cursor_x: number;
    cursor_y: number;
    dirtyBytes: number[];
    constructor(board: Board, five: any, opts: OledOptions);
    _initialise(): void;
    _setUpSPI(): void;
    _setUpI2C(opts: OledOptions): void;
    _transfer(type: TransferType, val: number): void;
    _writeSPI(byte: number, mode: TransferType): void;
    _readI2C(fn: (data: number) => void): void;
    _waitUntilReady(callback: () => void): void;
    setCursor(x: number, y: number): void;
    _invertColor(color: Color): Color;
    writeString(font: Font, size: number, string: string, color: Color, wrap: boolean, linespacing: number | null, sync?: boolean): void;
    _drawChar(font: Font, byteArray: number[][], size: number, color: Color, sync?: boolean): void;
    _readCharBytes(byteArray: number[]): number[][];
    _findCharBuf(font: Font, c: string): number[];
    update(): void;
    updateDirty(): void;
    dimDisplay(bool: boolean): void;
    turnOffDisplay(): void;
    turnOnDisplay(): void;
    clearDisplay(sync?: boolean): void;
    invertDisplay(bool: boolean): void;
    drawBitmap(pixels: Color[], sync?: boolean): void;
    _isSinglePixel(pixels: Pixel | Pixel[]): pixels is Pixel;
    drawPixel(pixels: Pixel | Pixel[], sync?: boolean): void;
    _updateDirtyBytes(byteArray: number[]): void;
    drawLine(x0: number, y0: number, x1: number, y1: number, color: Color, sync?: boolean): void;
    drawRect(x: number, y: number, w: number, h: number, color: Color, sync?: boolean): void;
    drawQRCode(x: number, y: number, data: string, margin?: number, sync?: boolean): void;
    fillRect(x: number, y: number, w: number, h: number, color: Color, sync?: boolean): void;
    drawCircle(x0: number, y0: number, r: number, color: Color, sync?: boolean): void;
    startScroll(dir: Direction, start: number, stop: number): void;
    stopScroll(): void;
}
export default Oled;
