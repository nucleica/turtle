import { log } from "../log/log.ts";
import { Text } from "../log/text.ts";

if (import.meta.main) {
  log("This is error", { ansi: "\[31m" }, "This is good", { ansi: "\[32m" });
  log("Wow, that is nice", { ansi: `[${Text.underline}m` });
}
