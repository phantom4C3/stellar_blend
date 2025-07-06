import { Server } from '@stellar/stellar-sdk';
import env from './env.js';

export const sorobanClient = new Server(env.SOROBAN_RPC_URL, {
  allowHttp: env.DEBUG_MODE, });

export const blendContractAddress = env.BLEND_CONTRACT_ADDRESS;
export const notificationContractAddress = env.NOTIFICATION_CONTRACT_ADDRESS;
