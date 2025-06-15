import { ll } from "./ll.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  ll("ls", (data) => {
    console.log(data);
  }, (err) => {
    console.error(err);
  });
}
