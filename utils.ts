import { ProviderRpcClient } from "everscale-inpage-provider";
import { EverscaleStandaloneClient, SimpleKeystore } from "everscale-standalone-client/nodejs";


async function getClient(endpoint: string, publicKey: string, secretKey: string): Promise<ProviderRpcClient> {
  const client = new ProviderRpcClient({
    fallback: () =>
    EverscaleStandaloneClient.create({
      connection: {
        id: 1010,
        group: "testnet",
        type: "jrpc",
        data: {
          endpoint: endpoint,
        },
      },
      // Manually creating a keystore for our client, because we haven't wallet extension here...we are not in browser
      keystore: new SimpleKeystore({
        [publicKey]: {
          publicKey: publicKey,
          secretKey: secretKey,
        }
      }),
    }),
  });
  await client.ensureInitialized();
  await client.requestPermissions({ permissions: ['basic'] });
  return client;
}

export {
  getClient,
}
