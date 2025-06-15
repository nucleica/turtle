export function ll(
  command: string[],
  change?: (data: string) => void,
  finished?: (err?: Error) => void,
) {
  const cmd = new Deno.Command(command[0], {
    args: command.slice(1),
    stdout: "piped",
    stderr: "piped",
  });

  try {
    const process = cmd.spawn();

    process.stdout.pipeTo(
      new WritableStream({
        write(chunk) {
          change && change(new TextDecoder().decode(chunk));
        },
        close() {
          finished && finished();
        },
        abort(err) {
          finished && finished(err);
        },
      }),
    );

    process.stderr.pipeTo(
      new WritableStream({
        write(chunk) {
        },
        close() {
        },
        abort(err) {
          finished && finished(err);
        },
      }),
    );
  } catch (err) {
    console.log(err);
  }
}
