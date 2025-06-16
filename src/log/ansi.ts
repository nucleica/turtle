export function ansi(code: string) {
  return `${General.escape}${code}`;
}

export function runANSI(code: string) {
  Deno.stdout.write(
    new TextEncoder().encode(ansi(code)),
  );
}

export enum Erase {
  eraseToStartOfScreen = "[1J",
  eraseToEndOfScreen = "[0J",
  eraseToStartOfLine = "[1K",
  eraseToEndOfLine = "[0K",
  eraseSavedLines = "[3J",
  eraseAllLines = "[2J",
  eraseInDisplay = "[J",
  eraseInLine = "[K",
  eraseLine = "[2K",
}

export enum Cursor {
  invisible = "[?25l",
  visible = "[?25h",
  position = "[6n",
  restore = "8",
  home = "[H",
  save = "7",
  up = "M",
}

export enum Screen {
  disableBuffer = "[?1049l",
  enableBuffer = "[?1049h",
  restoreScreen = "[?47l",
  saveScreen = "[?47h",
}

export enum General {
  carriageReturn = "\x0D",
  horizontalTab = "\x09",
  verticalTab = "\x0B",
  lineFeed = "\x0A", // new line
  formFeed = "\x0C", // new page
  backspace = "[1D",
  escape = "\x1B",
  delete = "\x7F",
  bell = "\x07",
  reset = "[m",
}
