import {getClient} from './utils';
import { ProviderRpcClient, Subscriber, Contract, Address } from "everscale-inpage-provider";
import { readFileSync } from 'fs';
import { resolve } from 'path';

async function getContract(client: ProviderRpcClient, address: string) {
  const contractAbi = JSON.parse(
    readFileSync(
      resolve(process.cwd(), 'abi/abi.json'), // yes, just place it somewhere
      'utf-8'
    )
  );
  return new client.Contract(contractAbi, new Address(address));
}

async function listenContractEvent<T>(client: ProviderRpcClient, contract: Contract<T>) {  
  const subscriber = new Subscriber(client);
  await contract
    .events(subscriber)
    .on(async (event) => {
      // here is our event
      const {event: eventName, data, transaction: {id: {hash: tranId}, createdAt, aborted, exitCode, resultCode, origStatus, endStatus, inMessage: {hash: inMsgId}}} = event;
      console.log(`New event: ${eventName}`)
      console.log(`Data: ${JSON.stringify(data)}`);
      // console.log(`Transaction: ${JSON.stringify(event.transaction)}`);
      console.log(`Transaction: ${JSON.stringify({tranId, createdAt, aborted, exitCode, resultCode, origStatus, endStatus, inMsgId})}`);
      console.log("==============================================");
    })
  console.log(`Subscribed to Contract`);
}


async function main() {
  const client = await getClient(
    process.env.ENDPOINT|| "https://jrpc-testnet.venom.foundation/rpc",
    process.env.PUBLIC_KEY as string,
    process.env.SECRET_KEY as string,
  );
  const contractAddr = process.env.CONTRACT_ADDRESS || "0:1ef42a3c649061ba446f2d5ae5219380573c78de3541fe67c742ead0cae68d0d";
  const contract = await getContract(client, contractAddr)
  await listenContractEvent(client, contract);
}

main();
