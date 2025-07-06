use soroban_sdk::{
    contract, contractimpl, contracttype, Address, Env, String, Vec, Symbol, symbol_short,
    BytesN, log, vec as soroban_vec
};
use core::convert::TryInto;


#[contracttype]
#[derive(Clone, Debug)]
pub struct Notification {
    pub user: Address,
    pub type_: Symbol, 
    pub severity: Symbol, 
    pub message: String,
    pub template_id: Option<BytesN<32>>,
    pub pool_id: Option<BytesN<32>>,
    pub timestamp: u64,
}


#[contracttype]
pub enum DataKey {
    Notifications(Address, u64), 
    NotificationCounter(Address),
    BlendContractAddress,
}


#[contracttype]
pub struct Template {
    pub id: BytesN<32>,
    pub name: String,
    pub parameters: Parameters,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct Parameters {
    pub assets: Vec<String>,
    pub popularity: Symbol,
    pub apy: u32, 
    pub tvl: u128,
    pub risk_factor: Symbol, 
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct Pool {
    pub id: BytesN<32>,
    pub template_id: BytesN<32>,
    pub parameters: Parameters,
    pub default_rate: u32, 
}

#[contract]
pub struct NotificationContract;

#[contractimpl]
impl NotificationContract {
    
    pub fn initialize(env: Env, admin: Address, blend_contract: Address) {
        admin.require_auth();
        if env.storage().instance().has(&DataKey::BlendContractAddress) {
            panic!("Contract already initialized");
        }
        env.storage().instance().set(&DataKey::BlendContractAddress, &blend_contract);
    }

    
    pub fn create_notification(
        env: Env,
        user: Address,
        type_: Symbol,
        severity: Symbol,
        message: String,
        template_id: Option<BytesN<32>>,
        pool_id: Option<BytesN<32>>,
    ) {
        user.require_auth();
        Self::validate_notification(&env, &type_, &severity, &message);

        let notification_id = Self::get_notification_counter(&env, &user);
        let notification = Notification {
            user: user.clone(),
            type_,
            severity,
            message,
            template_id,
            pool_id,
            timestamp: env.ledger().timestamp(),
        };

        env.storage().persistent().set(&DataKey::Notifications(user.clone(), notification_id), &notification);
        env.storage().persistent().set(&DataKey::NotificationCounter(user), &(notification_id + 1));

        log!(&env, "Notification created: type={}, severity={}, message={}", type_, severity, message);
    }

    pub fn add_notification(
        env: Env,
        user: Address,
        type_: Symbol,
        severity: Symbol,
        message: String,
        template_id: Option<BytesN<32>>,
        pool_id: Option<BytesN<32>>,
    ) {
        user.require_auth();
        if message.len() > 500 {
            panic!("Message must be 500 characters or less");
        }

        let notification_id = env.storage().instance().get(&DataKey::RatingCounter(user.clone())).unwrap_or(0);
        let notification = Notification {
            user: user.clone(),
            type_,
            severity,
            message,
            template_id,
            pool_id,
            timestamp: env.ledger().timestamp(),
        };

        env.storage().persistent().set(&DataKey::Notifications(user, notification_id), &notification);
        env.storage().instance().set(&DataKey::RatingCounter(user), &(notification_id + 1));
    }
    
    pub fn generate_risk_notifications(env: Env, user: Address, template_id: Option<BytesN<32>>, pool_id: Option<BytesN<32>>) {
        user.require_auth();
        let blend_contract_address: Address = env.storage().instance()
            .get(&DataKey::BlendContractAddress)
            .expect("Blend contract not initialized");

        let blend_contract = env.contracts().client(blend_contract_address);

        
        if let Some(t_id) = template_id {
            let template: Template = blend_contract
                .try_call("get_template", (t_id.clone(),))
                .expect("Failed to fetch template")
                .unwrap_or_else(|| panic!("Template not found"));

            if template.parameters.tvl < 100_000 {
                Self::create_notification(
                    env.clone(),
                    user.clone(),
                    symbol_short!("risk_alert"),
                    symbol_short!("warning"),
                    String::from_str(&env, &format!("Low TVL in template {}: ${}", template.name, template.parameters.tvl)),
                    Some(t_id.clone()),
                    None,
                );
            }
            if template.parameters.risk_factor == symbol_short!("High") || template.parameters.risk_factor == symbol_short!("VeryHigh") {
                Self::create_notification(
                    env.clone(),
                    user.clone(),
                    symbol_short!("risk_alert"),
                    symbol_short!("high"),
                    String::from_str(&env, &format!("High risk in template {}: {}", template.name, template.parameters.risk_factor)),
                    Some(t_id),
                    None,
                );
            }
        }

        
        if let Some(p_id) = pool_id {
            let pool: Pool = blend_contract
                .try_call("get_pool", (p_id.clone(),))
                .expect("Failed to fetch pool")
                .unwrap_or_else(|| panic!("Pool not found"));

            if pool.parameters.tvl < 100_000 {
                Self::create_notification(
                    env.clone(),
                    user.clone(),
                    symbol_short!("risk_alert"),
                    symbol_short!("warning"),
                    String::from_str(&env, &format!("Low TVL in pool: ${}", pool.parameters.tvl)),
                    Some(pool.template_id.clone()),
                    Some(p_id.clone()),
                );
            }
            if pool.default_rate > 500 { 
                Self::create_notification(
                    env.clone(),
                    user.clone(),
                    symbol_short!("risk_alert"),
                    symbol_short!("high"),
                    String::from_str(&env, &format!("High default rate in pool: {}%", pool.default_rate / 100)),
                    Some(pool.template_id),
                    Some(p_id),
                );
            }
        }
    }

    
    pub fn get_notifications(env: Env, user: Address) -> Vec<Notification> {
        user.require_auth();
        let mut notifications = soroban_vec![&env];
        let counter: u64 = env.storage().persistent().get(&DataKey::NotificationCounter(user.clone())).unwrap_or(0);

        for i in 0..counter {
            if let Some(notification) = env.storage().persistent().get(&DataKey::Notifications(user.clone(), i)) {
                notifications.push_back(notification);
            }
        }

        notifications
    }

    
    pub fn clear_notification(env: Env, user: Address, notification_id: u64) {
        user.require_auth();
        if !env.storage().persistent().has(&DataKey::Notifications(user.clone(), notification_id)) {
            panic!("Notification not found");
        }
        env.storage().persistent().remove(&DataKey::Notifications(user, notification_id));
        log!(&env, "Notification cleared: user={}, id={}", user, notification_id);
    }

    
    fn validate_notification(env: &Env, type_: &Symbol, severity: &Symbol, message: &String) {
        let valid_types = soroban_vec![
            &env,
            symbol_short!("template_created"),
            symbol_short!("template_updated"),
            symbol_short!("template_deleted"),
            symbol_short!("pool_deployed"),
            symbol_short!("rating_created"),
            symbol_short!("risk_alert"),
        ];
        if !valid_types.contains(type_) {
            panic!("Invalid notification type");
        }

        let valid_severities = soroban_vec![&env, symbol_short!("info"), symbol_short!("warning"), symbol_short!("high")];
        if !valid_severities.contains(severity) {
            panic!("Invalid severity");
        }

        if message.len() > 500 {
            panic!("Message must be 500 characters or less");
        }
    }

    
    fn get_notification_counter(env: &Env, user: &Address) -> u64 {
        env.storage().persistent().get(&DataKey::NotificationCounter(user.clone())).unwrap_or(0)
    }
}