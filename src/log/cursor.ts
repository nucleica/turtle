import { Cursor, runANSI } from "../log/ansi.ts";

export class Pointer {
  static move(x: number, y: number) {
    runANSI(`[${y};${x}H`);
  }

  static up(lines: number) {
    runANSI(`[${lines}A`);
  }

  static down(lines: number) {
    runANSI(`[${lines}B`);
  }

  static left(columns: number) {
    runANSI(`[${columns}D`);
  }
  static right(columns: number) {
    runANSI(`[${columns}C`);
  }

  static position() {
    runANSI(`${Cursor.position}`);
  }

  static hide() {
    runANSI(`${Cursor.invisible}`);
  }

  static scrollUp() {
    runANSI(Cursor.up);
  }

  static show() {
    runANSI(Cursor.visible);
  }
}
