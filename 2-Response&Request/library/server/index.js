export const serve = async (listener, f) => {
  for await (const connection of listener) {
    const xs = new Uint8Array(1024); // The Uint8Array typed array represents an array of 8-bit unsigned integers.
    const n = await Deno.read(connection.rid, xs); // read function returns the number of byte that was read

    const ys = await f(xs.subarray(0, n));
    await Deno.write(connection.rid, ys);
  }
};
