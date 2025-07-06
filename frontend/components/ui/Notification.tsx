import React, { useState, useEffect } from 'react';
import { addNotificationToContract, fetchPoolsFromContract } from '@/lib/soroban';
import useWalletStore from '@/stores/walletStore';
import useNotificationStore from '@/stores/notificationStore';
import { NOTIFICATION_SEVERITIES, NOTIFICATION_TYPES } from '@/lib/constants';

interface Notification {
  id: string;
  user: string;
  type: string;
  severity: string;
  message: string;
  template_id: string | null;
  pool_id: string | null;
  timestamp: number;
}

interface HighYieldPool {
  id: string;
  template_id: string;
  parameters: {
    apy: number;
    risk_factor: string;
  };
}

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [highYieldPools, setHighYieldPools] = useState<HighYieldPool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { wallet } = useWalletStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    const fetchData = async () => {
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
        setHighYieldPools(highYield);

        
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
        setNotifications([newNotification]);

        
        addNotification(riskNotification.type, riskNotification.severity, riskNotification.message);
      } catch (err) {
        setError(err.message || 'Failed to fetch notification data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); 
    return () => clearInterval(interval);
  }, [wallet, addNotification]);

  if (isLoading) return <div className="border p-4 rounded shadow animate-pulse bg-gray-200">Loading...</div>;
  if (error) return <div className="border p-4 rounded shadow text-red-500">{error}</div>;
  if (!notifications.length) return null;

  const riskColor = notifications[0].severity.toLowerCase() === 'info' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-auto bg-white mb-4">
      <div className="p-4">
        <h4 className="text-lg font-semibold mb-2">Notification</h4>
        {notifications.map((notification) => (
          <div key={notification.id} className="mb-4">
            <p className={`text-sm mb-2 ${riskColor}`}>
              Risk Factor: {notification.severity === NOTIFICATION_SEVERITIES.INFO ? 'Low' : 'High'}
            </p>
            <p className="text-sm mb-2">
              High-Yield Pools to Watch: {highYieldPools.map((pool) => pool.template_id).join(', ')}
            </p>
            <p className="text-xs text-gray-500">
              Timestamp: {new Date(notification.timestamp * 1000).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
