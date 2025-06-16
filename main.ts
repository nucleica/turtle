import { ll } from "./src/ll.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  ll("ls", {
    change: (data) => {
      console.log(data);
    },

    finished: (err) => {
      console.error(err);
    },
  });
}
