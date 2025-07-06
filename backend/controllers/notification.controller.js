import { getNotificationsOnChain } from '../utils/stellarUtils.js';
import { generateNotifications } from '../utils/apyCalculator.js';
import Template from '../models/Template.js';
import { Contract } from "@stellar/stellar-sdk";

export const getNotifications = async (req, res) => {
  const userAddress = req.user.address; 
    try {
        const templates = await Template.find();
    const notifications = await generateNotifications(userAddress, templates);
    const onChainNotifications = await getNotificationsOnChain(userAddress);
    const allNotifications = [
      ...notifications.map((n, i) => ({ id: `offchain-${i}`, ...n })),
      ...onChainNotifications.map((n, i) => ({ id: `onchain-${i}`, ...n })),
    ];

    res.json({
      status: 'success',
      message: 'Notifications retrieved successfully',
      data: { notifications: allNotifications },
    });
  } catch (error) {
    throw error; 
  }
};

export const clearNotification = async (req, res) => {
  const userAddress = req.user.address;
  const { id } = req.params;
  try {
    if (id.startsWith('onchain-')) {
      const notificationId = parseInt(id.split('-')[1], 10);
      const contract = new Contract(notificationContractAddress);
      const account = await sorobanClient.getAccount(userAddress);
      const txBuilder = new TransactionBuilder(account, {
        fee: '100',
        networkPassphrase: Networks.TESTNET,
      });

      const tx = txBuilder
        .addOperation(contract.call('clear_notification', userAddress, notificationId))
        .setTimeout(30)
        .build();

            res.json({
        status: 'success',
        message: 'Notification cleared successfully',
        data: { notificationId },
      });
    } else {
      res.json({
        status: 'success',
        message: 'Off-chain notification cleared successfully',
        data: { notificationId: id },
      });
    }
  } catch (error) {
    throw error;   
}
};

export const clearAllNotifications = async (req, res) => {
  const userAddress = req.user.address;
  try {
    const contract = new Contract(notificationContractAddress);
    const account = await sorobanClient.getAccount(userAddress);
    const txBuilder = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: Networks.TESTNET,
    });

    const notifications = await getNotificationsOnChain(userAddress);
    for (const [index] of notifications.entries()) {
      txBuilder.addOperation(contract.call('clear_notification', userAddress, index));
    }

    const tx = txBuilder.setTimeout(30).build();
        res.json({
      status: 'success',
      message: 'All notifications cleared successfully',
      data: {},
    });
  } catch (error) {
    throw error;   }
};

export const addNotification = async (req, res) => {
  const userAddress = req.user.address;
  const { type, severity, message, templateId, poolId } = req.body;
  try {
    const notification = await addNotificationOnChain(userAddress, type, severity, message, templateId, poolId);
    res.json({
      status: 'success',
      message: 'Notification added successfully',
      data: { notification },
    });
  } catch (error) {
    throw error;
  }
};