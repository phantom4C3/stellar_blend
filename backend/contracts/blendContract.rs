use soroban_sdk::{
    contract, contractimpl, contracttype, Address, Env, String, Vec, Map, Symbol, symbol_short, 
    BytesN, log, vec as soroban_vec, map
};
use core::convert::TryInto;

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum ImageType {
    PNG,
    SVG,
    JPEG,
    GIF,
    WebP,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]>
pub enum Popularity {
    Low,
    Medium,
    High,
    VeryHigh,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum RiskFactor {
    Low,
    Medium,
    MediumHigh,
    High,
    VeryHigh,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum DeploymentFrequency {
    Weekly,
    BiWeekly,
    Monthly,
    Quarterly,
    OneTime,
    Custom,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum InterestPeriod {
    Weekly,
    BiWeekly,
    Monthly,
    Quarterly,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum ReturnDuration {
    Daily,
    Weekly,
    BiWeekly,
    Monthly,
    Quarterly,
    Custom,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum OracleProvider {
    Chainlink,
    MINTX,
    BandProtocol,
    Custom,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum BackstopModule {
    Enabled,
    Disabled,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum AnchorIntegration {
    MoneyGram,
    Cowrie,
    Vibrant,
    None,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum PoolType {
    Isolated,
    CrossPool,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum AccessControl {
    Public,
    Whitelisted,
    KYCRequired,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum LoopingStrategy {
    Enabled,
    Disabled,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum GeographicFocus {
    Global,
    EmergingMarkets,
    SpecificRegion,
    Custom,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct Parameters {
    pub assets: Vec<String>,
    pub popularity: Popularity,
    pub apy: u32,
    pub tvl: u128,
    pub risk_factor: RiskFactor,
    pub deployment_frequency: DeploymentFrequency,
    pub interest_percentage: InterestPercentage,
    pub allowed_assets: Vec<String>,
    pub collaterals: Vec<String>,
    pub return_duration: ReturnDuration,
    pub deposits: u128,
    pub borrows: u128,
    pub max_positions: u32,
    pub oracle_provider: OracleProvider,
    pub backstop_module: BackstopModule,
    pub collateralization_ratio: u32,
    pub liquidation_threshold: u32,
    pub anchor_integration: AnchorIntegration,
    pub pool_type: PoolType,
    pub access_control: AccessControl,
    pub fee_structure: u32,
    pub looping_strategy: LoopingStrategy,
    pub geographic_focus: GeographicFocus,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct InterestPercentage {
    pub rate: u32,
    pub period: InterestPeriod,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct Template {
    pub id: BytesN<32>,
    pub name: String,
    pub image_type: ImageType,
    pub description: String,
    pub parameters: Parameters,
    pub creator: Address,
    pub created_at: u64,
    pub updated_at: u64,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct Pool {
    pub id: BytesN<32>,
    pub template_id: BytesN<32>,
    pub creator: Address,
    pub parameters: Parameters,
    pub default_rate: u32,
    pub created_at: u64,
    pub updated_at: u64,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct Rating {
    pub template_id: BytesN<32>,
    pub user: Address,
    pub rating: u32,
    pub review: String,
    pub created_at: u64,
    pub updated_at: u64,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct Notification {
    pub user: Address,
    pub type_: Symbol,
    pub severity: Symbol,
    pub message: String,
    pub template_id: Option<BytesN<32>>,
    pub timestamp: u64,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct UserPosition {
    pub pool_id: BytesN<32>,
    pub user: Address,
    pub deposit_amount: u128, 
    pub borrow_amount: u128, 
    pub collateral: Vec<String>, 
}

#[contracttype]
pub enum DataKey {
    Templates(BytesN<32>),
    Pools(BytesN<32>),
    Ratings(BytesN<32>, Address),
    Notifications(Address, u64),
    TemplateCounter,
    PoolCounter,
    RatingCounter(Address),
    Positions(BytesN<32>, Address), 
    SupportedAssets,
}

#[contract]
pub struct BlendContract;

#[contractimpl]
impl BlendContract {

    pub fn initialize(env: Env, admin: Address) {
        admin.require_auth();
        if env.storage().instance().has(&DataKey::TemplateCounter) {
            panic!("Contract already initialized");
        }
        env.storage().instance().set(&DataKey::TemplateCounter, &0u64);
        env.storage().instance().set(&DataKey::PoolCounter, &0u64);
    }


    pub fn create_template(
        env: Env,
        creator: Address,
        name: String,
        image_type: ImageType,
        description: String,
        parameters: Parameters,
    ) -> BytesN<32> {
        creator.require_auth();
        Self::validate_parameters(&env, &parameters);

        let template_id = Self::generate_template_id(&env);
        let template = Template {
            id: template_id.clone(),
            name,
            image_type,
            description,
            parameters,
            creator: creator.clone(),
            created_at: env.ledger().timestamp(),
            updated_at: env.ledger().timestamp(),
        };

        env.storage().persistent().set(&DataKey::Templates(template_id.clone()), &template);
        Self::generate_notification(
            &env,
            creator,
            symbol_short!("template_created"),
            symbol_short!("info"),
            String::from_str(&env, &format!("Template {} created", template.name)),
            Some(template_id.clone()),
        );

        template_id
    }


    pub fn get_template(env: Env, template_id: BytesN<32>) -> Option<Template> {
        env.storage().persistent().get(&DataKey::Templates(template_id))
    }


    pub fn get_templates(
        env: Env,
        assets: Option<Vec<String>>,
        popularity: Option<Popularity>,
        risk_factor: Option<RiskFactor>,
        apy_min: Option<u32>,
        apy_max: Option<u32>,
        tvl_min: Option<u128>,
        tvl_max: Option<u128>,
    ) -> Vec<Template> {
        let mut templates = soroban_vec![&env];
        let template_counter: u64 = env.storage().instance().get(&DataKey::TemplateCounter).unwrap_or(0);

        for i in 0..template_counter {
            let template_id = BytesN::from_array(&env, &i.to_le_bytes());
            if let Some(template) = env.storage().persistent().get(&DataKey::Templates(template_id)) {
                let params = &template.parameters;
                let matches = assets.as_ref().map_or(true, |a| a.iter().any(|asset| params.assets.contains(asset)))
                    && popularity.as_ref().map_or(true, |p| params.popularity == *p)
                    && risk_factor.as_ref().map_or(true, |r| params.risk_factor == *r)
                    && apy_min.map_or(true, |min| params.apy >= min)
                    && apy_max.map_or(true, |max| params.apy <= max)
                    && tvl_min.map_or(true, |min| params.tvl >= min)
                    && tvl_max.map_or(true, |max| params.tvl <= max);
                if matches {
                    templates.push_back(template);
                }
            }
        }

        templates
    }


    pub fn update_template(
        env: Env,
        template_id: BytesN<32>,
        creator: Address,
        name: String,
        image_type: ImageType,
        description: String,
        parameters: Parameters,
    ) {
        creator.require_auth();
        let mut template: Template = env.storage().persistent().get(&DataKey::Templates(template_id.clone()))
            .expect("Template not found");
        
        if template.creator != creator {
            panic!("Unauthorized");
        }

        Self::validate_parameters(&env, &parameters);
        template.name = name;
        template.image_type = image_type;
        template.description = description;
        template.parameters = parameters;
        template.updated_at = env.ledger().timestamp();

        env.storage().persistent().set(&DataKey::Templates(template_id.clone()), &template);
        Self::generate_notification(
            &env,
            creator,
            symbol_short!("template_updated"),
            symbol_short!("info"),
            String::from_str(&env, &format!("Template {} updated", template.name)),
            Some(template_id),
        );
    }


    pub fn delete_template(env: Env, template_id: BytesN<32>, creator: Address) {
        creator.require_auth();
        let template: Template = env.storage().persistent().get(&DataKey::Templates(template_id.clone()))
            .expect("Template not found");

        if template.creator != creator {
            panic!("Unauthorized");
        }

        env.storage().persistent().remove(&DataKey::Templates(template_id.clone()));
        Self::generate_notification(
            &env,
            creator,
            symbol_short!("template_deleted"),
            symbol_short!("info"),
            String::from_str(&env, &format!("Template {} deleted", template.name)),
            Some(template_id),
        );
    }


    pub fn deploy_pool(env: Env, template_id: BytesN<32>, creator: Address, parameters: Parameters) -> BytesN<32> {
        creator.require_auth();
        let template: Template = env.storage().persistent().get(&DataKey::Templates(template_id))
            .expect("Template not found");

        Self::validate_parameters(&env, &parameters);
        let pool_id = Self::generate_pool_id(&env);
        let pool = Pool {
            id: pool_id.clone(),
            template_id: template_id.clone(),
            creator: creator.clone(),
            parameters,
            default_rate: 0,
            created_at: env.ledger().timestamp(),
            updated_at: env.ledger().timestamp(),
        };

        env.storage().persistent().set(&DataKey::Pools(pool_id.clone()), &pool);
        Self::generate_notification(
            &env,
            creator,
            symbol_short!("pool_deployed"),
            symbol_short!("info"),
            String::from_str(&env, &format!("Pool deployed from template {}", template.name)),
            Some(template_id),
        );

        pool_id
    }


    pub fn get_pool(env: Env, pool_id: BytesN<32>) -> Option<Pool> {
        env.storage().persistent().get(&DataKey::Pools(pool_id))
    }

    pub fn get_all_pools(env: Env) -> Vec<Pool> {
        let mut pools = soroban_vec![&env];
        let pool_counter: u64 = env.storage().instance().get(&DataKey::PoolCounter).unwrap_or(0);

        for i in 0..pool_counter {
            let pool_id = BytesN::from_array(&env, &i.to_le_bytes());
            if let Some(pool) = env.storage().persistent().get(&DataKey::Pools(pool_id)) {
                pools.push_back(pool);
            }
        }

        pools
    }

    pub fn deposit_to_pool(env: Env, pool_id: BytesN<32>, user: Address, amount: u128, asset: String) {
        user.require_auth();
        let pool: Pool = env.storage().persistent().get(&DataKey::Pools(pool_id.clone()))
            .expect("Pool not found");
        
        let supported_assets: Vec<String> = env.storage().persistent().get(&DataKey::SupportedAssets)
            .unwrap_or_default();
        if !supported_assets.contains(&asset) {
            panic!("Unsupported asset: {}", asset);
        }
        if amount == 0 {
            panic!("Deposit amount must be greater than 0");
        }

        let position_key = DataKey::Positions(pool_id.clone(), user.clone());
        let mut position: UserPosition = env.storage().persistent().get(&position_key)
            .unwrap_or(UserPosition {
                pool_id: pool_id.clone(),
                user: user.clone(),
                deposit_amount: 0,
                borrow_amount: 0,
                collateral: soroban_vec![&env],
            });

        position.deposit_amount += amount;
        if !position.collateral.contains(&asset) {
            position.collateral.push_back(asset);
        }

        env.storage().persistent().set(&position_key, &position);
        Self::generate_notification(
            &env,
            user,
            symbol_short!("deposit"),
            symbol_short!("info"),
            String::from_str(&env, &format!("Deposited {} {} to pool {}", amount, asset, pool_id.to_string())),
            None,
        );
    }

    pub fn borrow_from_pool(env: Env, pool_id: BytesN<32>, user: Address, amount: u128, collateral: Vec<String>) {
        user.require_auth();
        let pool: Pool = env.storage().persistent().get(&DataKey::Pools(pool_id.clone()))
            .expect("Pool not found");

        let supported_assets: Vec<String> = env.storage().persistent().get(&DataKey::SupportedAssets)
            .unwrap_or_default();
        for asset in collateral.iter() {
            if !supported_assets.contains(&asset) {
                panic!("Unsupported collateral asset: {}", asset);
            }
        }
        if amount == 0 {
            panic!("Borrow amount must be greater than 0");
        }
        if collateral.is_empty() {
            panic!("At least one collateral asset is required");
        }

        let position_key = DataKey::Positions(pool_id.clone(), user.clone());
        let mut position: UserPosition = env.storage().persistent().get(&position_key)
            .unwrap_or(UserPosition {
                pool_id: pool_id.clone(),
                user: user.clone(),
                deposit_amount: 0,
                borrow_amount: 0,
                collateral: soroban_vec![&env],
            });

        position.borrow_amount += amount;
        for asset in collateral.iter() {
            if !position.collateral.contains(&asset) {
                position.collateral.push_back(asset);
            }
        }

        env.storage().persistent().set(&position_key, &position);
        Self::generate_notification(
            &env,
            user,
            symbol_short!("borrow"),
            symbol_short!("info"),
            String::from_str(&env, &format!("Borrowed {} from pool {}", amount, pool_id.to_string())),
            None,
        );

        
        if position.borrow_amount > pool.parameters.tvl / 2 {
            Self::generate_notification(
                &env,
                user,
                symbol_short!("risk_alert"),
                symbol_short!("warning"),
                String::from_str(&env, &format!("High borrow amount {} in pool {}", position.borrow_amount, pool_id.to_string())),
                None,
            );
        }
    }

    pub fn get_user_positions(env: Env, user: Address) -> Vec<UserPosition> {
        user.require_auth();
        let mut positions = soroban_vec![&env];
        let pool_counter: u64 = env.storage().instance().get(&DataKey::PoolCounter).unwrap_or(0);

        for i in 0..pool_counter {
            let pool_id = BytesN::from_array(&env, &i.to_le_bytes());
            let position_key = DataKey::Positions(pool_id.clone(), user.clone());
            if let Some(position) = env.storage().persistent().get(&position_key) {
                positions.push_back(position);
            }
        }

        positions
    }

    pub fn get_supported_assets(env: Env) -> Vec<String> {
        env.storage().persistent().get(&DataKey::SupportedAssets).unwrap_or_else(|| {
            soroban_vec![
                &env,
                String::from_str(&env, "XLM"),
                String::from_str(&env, "USDC"),
                String::from_str(&env, "ZUSD"),
                String::from_str(&env, "AUDD"),
                String::from_str(&env, "MBRL"),
                String::from_str(&env, "KES"),
                String::from_str(&env, "RWF"),
                String::from_str(&env, "NGNT"),
                String::from_str(&env, "BTC"),
                String::from_str(&env, "ETH"),
                String::from_str(&env, "REToken"),
                String::from_str(&env, "GOLD"),
                String::from_str(&env, "SVLR"),
                String::from_str(&env, "LiquidityPoolShares"),
                String::from_str(&env, "Custom")
            ]
        })
    }

    pub fn create_rating(env: Env, template_id: BytesN<32>, user: Address, rating: u32, review: String) {
        user.require_auth();
        let template: Template = env.storage().persistent().get(&DataKey::Templates(template_id.clone()))
            .expect("Template not found");

        if rating < 1 || rating > 5 {
            panic!("Rating must be between 1 and 5");
        }
        if review.len() > 500 {
            panic!("Review must be 500 characters or less");
        }

        let rating_key = DataKey::Ratings(template_id.clone(), user.clone());
        if env.storage().persistent().has(&rating_key) {
            panic!("User has already rated this template");
        }

        let rating_data = Rating {
            template_id: template_id.clone(),
            user: user.clone(),
            rating,
            review,
            created_at: env.ledger().timestamp(),
            updated_at: env.ledger().timestamp(),
        };

        env.storage().persistent().set(&rating_key, &rating_data);
        Self::generate_notification(
            &env,
            user,
            symbol_short!("rating_created"),
            symbol_short!("info"),
            String::from_str(&env, &format!("Rating {} submitted for template {}", rating, template.name)),
            Some(template_id),
        );
    }


    pub fn get_aggregated_ratings(env: Env, template_id: BytesN<32>) -> Map<Symbol, u32> {
        let template: Template = env.storage().persistent().get(&DataKey::Templates(template_id.clone()))
            .expect("Template not found");

        let mut total_rating: u64 = 0;
        let mut count: u32 = 0;
        let template_counter: u64 = env.storage().instance().get(&DataKey::TemplateCounter).unwrap_or(0);

        for i in 0..template_counter {
            let user_key = BytesN::from_array(&env, &i.to_le_bytes());
            let rating_key = DataKey::Ratings(template_id.clone(), Address::from_bytes(user_key));
            if let Some(rating) = env.storage().persistent().get(&rating_key) {
                total_rating += rating.rating as u64;
                count += 1;
            }
        }

        let average_rating = if count > 0 { (total_rating / count as u64) as u32 } else { 0 };
        map![&env,
            (symbol_short!("average_rating"), average_rating),
            (symbol_short!("total_reviews"), count)
        ]
    }


    fn generate_notification(env: &Env, user: Address, type_: Symbol, severity: Symbol, message: String, template_id: Option<BytesN<32>>) {
        let notification = Notification {
            user: user.clone(),
            type_,
            severity,
            message,
            template_id,
            timestamp: env.ledger().timestamp(),
        };
        let notification_id = env.storage().instance().get(&DataKey::RatingCounter(user.clone())).unwrap_or(0);
        env.storage().persistent().set(&DataKey::Notifications(user, notification_id), &notification);
        env.storage().instance().set(&DataKey::RatingCounter(user), &(notification_id + 1));

    
        if let Some(t_id) = template_id {
            if let Some(template) = env.storage().persistent().get(&DataKey::Templates(t_id.clone())) {
                if template.parameters.tvl < 100_000 {
                    let notif = Notification {
                        user: user.clone(),
                        type_: symbol_short!("risk_alert"),
                        severity: symbol_short!("warning"),
                        message: String::from_str(&env, &format!("Low TVL in {}: ${}", template.name, template.parameters.tvl)),
                        template_id: Some(t_id.clone()),
                        timestamp: env.ledger().timestamp(),
                    };
                    env.storage().persistent().set(&DataKey::Notifications(user.clone(), notification_id + 1), &notif);
                }
                if template.parameters.risk_factor == RiskFactor::High || template.parameters.risk_factor == RiskFactor::VeryHigh {
                    let notif = Notification {
                        user: user.clone(),
                        type_: symbol_short!("risk_alert"),
                        severity: symbol_short!("high"),
                        message: String::from_str(&env, &format!("High risk in {}: {:?}", template.name, template.parameters.risk_factor)),
                        template_id: Some(t_id),
                        timestamp: env.ledger().timestamp(),
                    };
                    env.storage().persistent().set(&DataKey::Notifications(user, notification_id + 2), &notif);
                }
            }
        }
    }


    fn validate_parameters(env: &Env, params: &Parameters) {
        if params.assets.is_empty() {
            panic!("At least one asset is required");
        }
        if params.apy < 10 || params.apy > 2000 {
            panic!("APY must be between 0.1% and 20%");
        }
        if params.tvl < 10_000 {
            panic!("TVL must be at least $10,000");
        }
        if params.collateralization_ratio < 100 || params.collateralization_ratio > 300 {
            panic!("Collateralization ratio must be between 100% and 300%");
        }
        if params.liquidation_threshold < 50 || params.liquidation_threshold > 95 {
            panic!("Liquidation threshold must be between 50% and 95%");
        }
        if params.fee_structure < 5 || params.fee_structure > 200 {
            panic!("Fee structure must be between 0.05% and 2%");
        }
    }


    fn generate_template_id(env: &Env) -> BytesN<32> {
        let counter: u64 = env.storage().instance().get(&DataKey::TemplateCounter).unwrap_or(0);
        let id = BytesN::from_array(env, &counter.to_le_bytes());
        env.storage().instance().set(&DataKey::TemplateCounter, &(counter + 1));
        id
    }


    fn generate_pool_id(env: &Env) -> BytesN<32> {
        let counter: u64 = env.storage().instance().get(&DataKey::PoolCounter).unwrap_or(0);
        let id = BytesN::from_array(env, &counter.to_le_bytes());
        env.storage().instance().set(&DataKey::PoolCounter, &(counter + 1));
        id
    }
}
