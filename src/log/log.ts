import { ansi, General } from "./ansi.ts";

export function t(...ars: unknown[]) {
  o({ time: true }, ...ars);
}

export function o(...ars: unknown[]) {
  const input: unknown[] = [];

  if (
    typeof ars[0] === "object" && ars[0]
  ) {
    if ("fast" in ars[0]) {
      console.log(...ars);

      return;
    }

    if ("time" in ars[0]) {
      input.push(
        `${ansi("\[34m")}${new Date().toLocaleTimeString()}${
          ansi(General.reset)
        }`,
      );
    }
  }

  for (const a of ars) {
    // if is interface ANSI { ansi: string }

    if (
      typeof a === "object" && a !== null &&
      "ansi" in a && typeof a.ansi === "string"
    ) {
      input[input.length - 1] = `${ansi(a.ansi)}${input[input.length - 1]}${
        ansi(General.reset)
      }`;
    } else if (typeof a === "object" && a !== null && "time" in a) {}
    else {
      input.push(a);
    }
  }

  console.log(...input);
}
