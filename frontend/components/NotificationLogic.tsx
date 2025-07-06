import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Notification from './ui/Notification';
import { addNotificationToContract, fetchPoolsFromContract } from '../lib/soroban';
import useWalletStore  from '../stores/walletStore';
import  useNotificationStore  from '../stores/notificationStore';
import { NOTIFICATION_SEVERITIES, NOTIFICATION_TYPES } from '../lib/constants';

const NotificationLogic: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { wallet } = useWalletStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    const fetchAndNotify = async () => {
      if (!wallet?.address) {
        setError('Wallet not connected');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        
        const pools = await fetchPoolsFromContract();
        const highYield = pools.filter((pool) => pool.parameters.apy > 600); 

        if (highYield.length > 0) {
          const riskNotification = {
            type: NOTIFICATION_TYPES.RISK_ALERT,
            severity: NOTIFICATION_SEVERITIES.WARNING,
            message: `High-yield pools detected with APY > 6%. Monitor: ${highYield
              .map((pool) => pool.template_id)
              .join(', ')}`,
            templateId: null,
            poolId: null,
          };

          
          const newNotification = await addNotificationToContract(
            riskNotification.type,
            riskNotification.severity,
            riskNotification.message,
            riskNotification.templateId,
            riskNotification.poolId
          );
          addNotification(
            riskNotification.type,
            riskNotification.severity,
            riskNotification.message,
            riskNotification.templateId,
            riskNotification.poolId
          );

          
          toast.success(
            <div>
              <p className="font-semibold">Risk Alert</p>
              <p>Risk Factor: {riskNotification.severity === NOTIFICATION_SEVERITIES.INFO ? 'Low' : 'High'}</p>
              <p>{riskNotification.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(newNotification.timestamp * 1000).toLocaleString()}
              </p>
            </div>,
            { duration: 10000 }
          );
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch notification data');
        toast.error(`Error: ${err.message || 'Failed to fetch notification data'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndNotify();
    const interval = setInterval(fetchAndNotify, 60000); 
    return () => clearInterval(interval);
  }, [wallet, addNotification]);

  if (isLoading) return <div className="text-center">Loading notifications...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <>
      <Toaster position="top-right" />
      <Notification />
    </>
  );
};

export default NotificationLogic;
