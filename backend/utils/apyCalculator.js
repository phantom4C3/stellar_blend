import { sorobanClient, blendContractAddress } from "../config/soroban.js";
import { Contract } from '@stellar/stellar-sdk';
import Pool from "../models/pool.models.js";

const APY_DIFFERENCE_THRESHOLD = 0.01;
const LOW_INTEREST_RATE_THRESHOLD= 0.02;
const HIGH_DEFAULT_RATE_THRESHOLD= 0.05;
const LOW_TVL_THRESHOLD= 1000;

export async function calculateApyDifferences(userPosition, pools) {
    try {
        if (!userPosition || !userPosition.apy) {
            return [];
        }

        const currentApy = userPosition.apy;
        const betterPools = pools
        .filter((pool) => pool.apy > currentApy + APY_DIFFERENCE_THRESHOLD)
        .map((pool) => ({
            poolId : pool.id,
            poolName : pool.name,
            apy: pool.apy,
            apyDifference : pool.apy - currentApy,
            message : `Move to ${pool.name} for ${(pool.apy*100).toFixed(2)}% APY (vs. ${(currentApy*100).toFixed(2)}%)`
        }));
        
        return betterPools;
        
    } catch (error) {
        console.error("Error calculating APY Differences:", error);
        return [];
    }
}

export async function assessPoolRisks(pool) {
    const risks = [];

    if (pool.apy < LOW_INTEREST_RATE_THRESHOLD) {
        risks.push({
            type: "low_interest_rate",
            severity: "warning",
            message: `Low interest rate detected in ${pool.name}: ${(pool.apy*100).toFixed(2)}% APY is below the recommended threshold of ${(LOW_INTEREST_RATE_THRESHOLD*100).toFixed(2)}%. Consider relocating assets`,
        });
    }

    if (pool.defaultRate && pool.defaultRate > HIGH_DEFAULT_RATE_THRESHOLD) {
        risks.push({
            type: "high_default_rate",
            severity: "red_alert",
            message: `High default rate detected in ${pool.name}: Default Rate of ${(pool.defaultRate*100).toFixed(2)}% exceeds safe threshold of ${(HIGH_DEFAULT_RATE_THRESHOLD*100).toFixed(2)}%. Relocate assets to a safer Pool`,
      })
    }

    if (pool.tvl < LOW_TVL_THRESHOLD) {
        risks.push({
            type: "low_tvl",
            severity: "warning",
            message: `Low TVL in ${pool.name}: ${pool.tvl} XLM is below the stability threshold of ${LOW_TVL_THRESHOLD} XLM. Consider relocating assets to a more stable pool.`,
        });
    }

    return risks;
}

export async function generateNotifications(userAddress, pools) {
    try {
        const contract = new Contract(blendContractAddress);
        const userPositions = await contract.call("get_user_positions", userAddress);

        const notifications = [];

    for (const pool of pools) {
      if (pool.defaultRate > 0.05) {
        notifications.push({
          type: 'risk_alert',
          severity: 'warning',
          message: `High default risk in ${pool.name} (${(pool.defaultRate * 100).toFixed(2)}%)`,
          poolId: pool.poolId,
        });
      }
      if (pool.tvl < 1000) {
        notifications.push({
          type: 'risk_alert',
          severity: 'warning',
          message: `Low TVL in ${pool.name} ($${pool.tvl})`,
          poolId: pool.poolId,
        });
      }
      if (item.parameters.riskFactor === 'High' || item.parameters.riskFactor === 'Very High') {
        notifications.push({
          type: 'risk_alert',
          severity: 'high',
          message: `High risk in ${item.name} (${item.parameters.riskFactor})`,
          templateId: item._id,
        });
      }
    }

        for (const position of userPositions){
            const betterPools = await calculateApyDifferences(position, pools);
            notifications.push(...betterPools.map((pool) => ({
                type: "yield optimziation",
                severity: "info",
                message: pool.message,
                poolId: pool.poolId
            })));


            const currentPool = pools.find((pool) => pool.id === position.poolId) || (await Pool.findOne({ poolId: position.poolId }));
            if (currentPool) {
                const poolRisks = assessPoolRisks({
                    ...currentPool,
                    defaultRate : position.defaultRate || 0,
                });
                notifications.push(...poolRisks);
            }
        }

        return notifications;
    } catch (error) {
        console.error("Error generating notifications", error);
        return [];
    }
}

export async function updatePoolData() {
    try {
        const contract = new Contract(blendContractAddress);
        const poolsData = contract.call("get_all_pools");

        const enrichedPools = poolsData.map((pool) => ({
            ...pool,
            tvl: pool.tvl * (1 + Math.random() * 0.1), 
            defaultRate: pool.defaultRate || Math.random() * 0.1,
        }));

        await Pool.deleteMany({});
        await Pool.insertMany(enrichedPools);

        return enrichedPools;
    } catch (error) {
        console.error("Error updating Pool Data", error);
        return [];
    }
}

export function calculateRiskScore(pool) {
    let riskScore = 0;
    
    if (pool.apy < LOW_INTEREST_RATE_THRESHOLD) {
        riskScore += 30;
    }

    if (pool.defaultRate && pool.defaultRate > HIGH_DEFAULT_RATE_THRESHOLD) {
        riskScore += 40; 
    }

    if (pool.tvl < LOW_TVL_THRESHOLD) {
        riskScore += 30;
    }

    return Math.min(riskScore, 100);
}

export function validatePoolData(pool) {
    if (!pool.id || !pool.name || typeof pool.apy !== "number" || typeof pool.tvl !== "number") {
        console.error("Invalidate Pool Data:", pool);
        return false;
    }
    return true;
}