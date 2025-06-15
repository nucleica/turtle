export interface LlOptionsSync {
  args?: string[];
  cwd?: string;
}

export interface LlOptions extends LlOptionsSync {
  stderr?: (error: string) => void;
  finished?: (err?: Error) => void;
  change?: (data: string) => void;
}

export function lls(command: string, options?: LlOptionsSync) {
  let stdout = "";
  let stderr = "";

  const promise = new Promise((res, rej) => {
    ll(command, {
      change: (data) => {
        stdout += data;
      },

      finished: (err) => {
        if (err) {
          return rej(err);
        }

        res({ stdout, stderr });
      },

      stderr: (err) => {
        stderr += err;
      },

      ...options,
    });
  });

  return promise;
}

export function ll(
  command: string,
  { change, finished, stderr, cwd, args }: LlOptions,
) {
  const cmd = new Deno.Command(command, {
    stdout: "piped",
    stderr: "piped",
    args,
    cwd,
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
