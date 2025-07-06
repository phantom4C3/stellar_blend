import {
  Contract,
  TransactionBuilder,
  xdr,
} from "@stellar/stellar-sdk";
import  useWalletStore  from "../stores/walletStore";
import { NETWORK, CURRENT_DATE } from "./constants";

import { Server } from "@stellar/stellar-sdk/rpc";

const sorobanClient = new Server(NETWORK.SOROBAN_RPC_URL, {
  allowHttp: true,
});

const CONTRACT_ADDRESSES = {
  BLEND_CONTRACT:
    process.env.NEXT_PUBLIC_BLEND_CONTRACT_ADDRESS ||
    "CBTEST Blend Contract Address",
  NOTIFICATION_CONTRACT:
    process.env.NEXT_PUBLIC_NOTIFICATION_CONTRACT_ADDRESS ||
    "CBTEST Notification Contract Address",
};

const getAccount = async () => {
  const wallet = useWalletStore.getState().wallet;
  if (!wallet?.address) throw new Error("Wallet not connected");
  return await sorobanClient.getAccount(wallet.address);
};

export const fetchPoolsFromContract = async () => {
  try {
    const account = await getAccount();
    const contract = new Contract(CONTRACT_ADDRESSES.BLEND_CONTRACT);
    const txBuilder = new TransactionBuilder(account, {
      fee: "100",
      networkPassphrase: NETWORK.NETWORK_PASSPHRASE,
    });

    const tx = txBuilder
      .addOperation(contract.call("get_all_pools"))
      .setTimeout(30)
      .build();

    const response = await sorobanClient.simulateTransaction(tx);
    if (response.results && response.results.length > 0) {
      const result = xdr.ScVal.fromXDR(
        response.results[0].xdr,
        "base64"
      ).toObject();
      return result.map((pool) => ({
        id: pool.id.toString("hex"),
        template_id: pool.template_id.toString("hex"),
        creator: pool.creator.toString(),
        parameters: {
          assets: pool.parameters.assets,
          apy: pool.parameters.apy,
          tvl: pool.parameters.tvl,
          risk_factor: pool.parameters.risk_factor,
        },
        default_rate: pool.default_rate,
        created_at: CURRENT_DATE.getTime() / 1000,
        updated_at: CURRENT_DATE.getTime() / 1000,
      }));
    }
    return [];
  } catch (error) {
    throw new Error(`Failed to fetch pools: ${error.message}`);
  }
};

export const deployPoolToContract = async (templateId, parameters) => {
  try {
    const account = await getAccount();
    const contract = new Contract(CONTRACT_ADDRESSES.BLEND_CONTRACT);
    const txBuilder = new TransactionBuilder(account, {
      fee: "100",
      networkPassphrase: NETWORK.NETWORK_PASSPHRASE,
    });

    const tx = txBuilder
      .addOperation(
        contract.call(
          "deploy_pool",
          xdr.ScVal.scvBytes(Buffer.from(templateId, "hex")),
          account.accountId(),
          xdr.ScVal.scvObject({
            assets: parameters.assets || [],
            apy: parameters.apy || 500,
            tvl: parameters.tvl || 100000,
            risk_factor: parameters.risk_factor || "Low",
          })
        )
      )
      .setTimeout(30)
      .build();

    const preparedTx = await sorobanClient.prepareTransaction(tx);
    const signedTx = await useWalletStore
      .getState()
      .wallet.signTransaction(preparedTx);
    const result = await sorobanClient.sendTransaction(signedTx);

    return {
      id: result.hash.toString("hex"),
      template_id: templateId,
      creator: account.accountId().toString(),
      parameters,
      default_rate: 0,
      created_at: CURRENT_DATE.getTime() / 1000,
      updated_at: CURRENT_DATE.getTime() / 1000,
    };
  } catch (error) {
    throw new Error(`Failed to deploy pool: ${error.message}`);
  }
};

export const addNotificationToContract = async (
  type,
  severity,
  message,
  templateId = null,
  poolId = null
) => {
  try {
    const account = await getAccount();
    const contract = new Contract(CONTRACT_ADDRESSES.NOTIFICATION_CONTRACT);
    const txBuilder = new TransactionBuilder(account, {
      fee: "100",
      networkPassphrase: NETWORK.NETWORK_PASSPHRASE,
    });

    const tx = txBuilder
      .addOperation(
        contract.call(
          "add_notification",
          account.accountId(),
          type,
          severity,
          message,
          templateId
            ? xdr.ScVal.scvBytes(Buffer.from(templateId, "hex"))
            : xdr.ScVal.scvVoid(),
          poolId
            ? xdr.ScVal.scvBytes(Buffer.from(poolId, "hex"))
            : xdr.ScVal.scvVoid()
        )
      )
      .setTimeout(30)
      .build();

    const preparedTx = await sorobanClient.prepareTransaction(tx);
    const signedTx = await useWalletStore
      .getState()
      .wallet.signTransaction(preparedTx);
    const result = await sorobanClient.sendTransaction(signedTx);

    return {
      id: result.hash.toString("hex"),
      user: account.accountId().toString(),
      type,
      severity,
      message,
      template_id: templateId,
      pool_id: poolId,
      timestamp: CURRENT_DATE.getTime() / 1000,
    };
  } catch (error) {
    throw new Error(`Failed to add notification: ${error.message}`);
  }
};
