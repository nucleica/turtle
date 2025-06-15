export function lls(command: string[]) {
  let stdout = "";
  let stderr = "";

  const promise = new Promise((res, rej) => {
    ll(command, (data, err) => {
      stdout += data;
      stderr += err;
    }, (err) => {
      if (err) {
        return rej(err);
      }

      res({ stdout, stderr });
    });
  });

  return promise;
}

export function ll(
  command: string[],
  change?: (data: string) => void,
  finished?: (err?: Error) => void,
  stderr?: (error: string) => void,
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
          const text = new TextDecoder().decode(chunk);
          change && change(text);
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
          const text = new TextDecoder().decode(chunk);
          stderr && stderr(text);
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
