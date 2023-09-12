import { TonClient } from "@eversdk/core";
import { libNode } from "@eversdk/lib-node";

TonClient.useBinaryLibrary(libNode);
const client = new TonClient();

async function main() {
  const keys = await client.crypto.mnemonic_derive_sign_keys({
    dictionary: 1,
    word_count: 12,
    phrase: "",
  }).catch(console.error);
  console.log(keys);
}

main();
