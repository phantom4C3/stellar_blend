(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/lib/constants.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "API_CONFIG": (()=>API_CONFIG),
    "ASSET_DISPLAY": (()=>ASSET_DISPLAY),
    "CURRENT_DATE": (()=>CURRENT_DATE),
    "DEFAULT_POOL_PARAMETERS": (()=>DEFAULT_POOL_PARAMETERS),
    "ERROR_MESSAGES": (()=>ERROR_MESSAGES),
    "NETWORK": (()=>NETWORK),
    "NOTIFICATION_MAX_MESSAGE_LENGTH": (()=>NOTIFICATION_MAX_MESSAGE_LENGTH),
    "NOTIFICATION_SEVERITIES": (()=>NOTIFICATION_SEVERITIES),
    "NOTIFICATION_TYPES": (()=>NOTIFICATION_TYPES),
    "TEMPLATE_NAMES": (()=>TEMPLATE_NAMES),
    "TEMPLATE_OPTIONS": (()=>TEMPLATE_OPTIONS),
    "TIMESTAMP_FORMAT": (()=>TIMESTAMP_FORMAT),
    "WALLET_CONFIG": (()=>WALLET_CONFIG)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_CONFIG = {
    BASE_URL: ("TURBOPACK compile-time value", "") || 'http://localhost:3001/api',
    TIMEOUT_MS: 30000
};
const NETWORK = {
    NETWORK_PASSPHRASE: 'Test SDF Network ; September 2015',
    SOROBAN_RPC_URL: 'https://soroban-testnet.stellar.org'
};
const NOTIFICATION_TYPES = {
    CUSTOM: 'custom',
    RISK_ALERT: 'risk_alert',
    DEPOSIT: 'deposit',
    BORROW: 'borrow',
    POOL_DEPLOYED: 'pool_deployed'
};
const NOTIFICATION_SEVERITIES = {
    INFO: 'info',
    WARNING: 'warning',
    HIGH: 'high'
};
const NOTIFICATION_MAX_MESSAGE_LENGTH = 500;
const DEFAULT_POOL_PARAMETERS = {
    ASSETS: [
        'XLM',
        'USDC',
        'ZUSD',
        'AUDD',
        'MBRL',
        'KES',
        'RWF',
        'NGNT',
        'BTC',
        'ETH',
        'REToken',
        'GOLD',
        'SVLR',
        'LiquidityPoolShares',
        'Custom'
    ],
    DEFAULT_APY: 500,
    DEFAULT_TVL: 100000,
    DEFAULT_RISK_FACTOR: 'Low',
    DEFAULT_RATE: 0
};
const TEMPLATE_NAMES = [
    'StableYield',
    'GlobalFlow',
    'AssetVault',
    'CryptoBoost',
    'InclusiveLend',
    'Custom'
];
const WALLET_CONFIG = {
    MIN_LENGTH_ADDRESS: 56,
    MAX_LENGTH_ADDRESS: 56
};
const CURRENT_DATE = new Date('2025-07-06T18:30:00+05:30');
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const ERROR_MESSAGES = {
    WALLET_NOT_CONNECTED: 'Wallet not connected',
    NETWORK_ERROR: 'Network error occurred',
    INVALID_INPUT: 'Invalid input provided'
};
const ASSET_DISPLAY = {
    XLM: {
        symbol: 'XLM',
        decimals: 7
    },
    USDC: {
        symbol: 'USDC',
        decimals: 6
    },
    ZUSD: {
        symbol: 'ZUSD',
        decimals: 6
    }
};
const TEMPLATE_OPTIONS = {
    names: [
        'StableYield',
        'GlobalFlow',
        'AssetVault',
        'CryptoBoost',
        'InclusiveLend',
        'Custom'
    ],
    imageTypes: [
        'PNG',
        'SVG',
        'JPEG',
        'GIF',
        'WebP'
    ],
    assets: [
        'XLM',
        'USDC',
        'ZUSD',
        'AUDD',
        'MBRL',
        'KES',
        'RWF',
        'NGNT',
        'BTC',
        'ETH',
        'REToken',
        'GOLD',
        'SVLR',
        'LiquidityPoolShares',
        'Custom'
    ],
    popularity: [
        'Low',
        'Medium',
        'High',
        'Very High'
    ],
    apy: [
        0.02,
        0.035,
        0.05,
        0.065,
        0.078,
        0.082,
        0.1,
        0.12
    ],
    tvl: [
        100000,
        500000,
        800000,
        1000000,
        2300000,
        3500000,
        5000000,
        6000000
    ],
    riskFactors: [
        'Low',
        'Medium',
        'Medium-High',
        'High',
        'Very High'
    ],
    deploymentFrequencies: [
        'Weekly',
        'Bi-weekly',
        'Monthly',
        'Quarterly',
        'One-Time',
        'Custom'
    ],
    interestPeriods: [
        'weekly',
        'bi-weekly',
        'monthly',
        'quarterly'
    ],
    returnDurations: [
        'Daily',
        'Weekly',
        'Bi-weekly',
        'Monthly',
        'Quarterly',
        'Custom'
    ],
    deposits: [
        10000,
        100000,
        500000,
        700000,
        1000000,
        2000000,
        3200000,
        4800000,
        5500000
    ],
    borrows: [
        5000,
        50000,
        200000,
        400000,
        1000000,
        1400000,
        1800000,
        2100000,
        3200000
    ],
    maxPositions: [
        1,
        2,
        3,
        4,
        5,
        'Unlimited'
    ],
    oracleProviders: [
        'Chainlink',
        'MINTX',
        'Band Protocol',
        'Custom'
    ],
    backstopModules: [
        'Enabled',
        'Disabled'
    ],
    collateralizationRatios: [
        1,
        1.25,
        1.5,
        2
    ],
    liquidationThresholds: [
        0.8,
        0.85,
        0.9
    ],
    anchorIntegrations: [
        'MoneyGram',
        'Cowrie',
        'Vibrant',
        'None'
    ],
    poolTypes: [
        'Isolated',
        'Cross-Pool'
    ],
    accessControls: [
        'Public',
        'Whitelisted',
        'KYC-Required'
    ],
    feeStructures: [
        0.001,
        0.005,
        0.01
    ],
    loopingStrategies: [
        'Enabled',
        'Disabled'
    ],
    geographicFocuses: [
        'Global',
        'Emerging Markets',
        'Specific Region',
        'Custom'
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/stores/walletStore.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stellar$2f$freighter$2d$api$2f$build$2f$index$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@stellar/freighter-api/build/index.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stellar$2f$stellar$2d$sdk$2f$lib$2f$rpc$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@stellar/stellar-sdk/lib/rpc/index.js [app-client] (ecmascript)");
;
;
;
;
const sorobanClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stellar$2f$stellar$2d$sdk$2f$lib$2f$rpc$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Server"](__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NETWORK"].SOROBAN_RPC_URL, {
    allowHttp: true
});
const useWalletStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        accountDetails: null,
        publicKey: null,
        secretKey: null,
        loading: false,
        error: null,
        wallet: null,
        signature: null,
        setPublicKey: (publicKey)=>set({
                publicKey
            }),
        setSecretKey: (secretKey)=>set({
                secretKey
            }),
        connectWallet: async ()=>{
            try {
                const publicKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stellar$2f$freighter$2d$api$2f$build$2f$index$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublicKey"])();
                const challenge = "default-challenge";
                const signedChallenge = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stellar$2f$freighter$2d$api$2f$build$2f$index$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signTransaction"])(challenge);
                setSignature(signedChallenge);
                setWallet({
                    address: publicKey,
                    signature: signedChallenge
                });
                if (!await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stellar$2f$freighter$2d$api$2f$build$2f$index$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isConnected"])()) {
                    throw new Error("Freighter wallet is not installed or not connected");
                }
                set({
                    isLoading: false
                });
                return wallet;
            } catch (error) {
                alert("Failed to connect wallet.");
                console.error("Failed to connect Wallet", error);
            }
        },
        disconnectWallet: ()=>set({
                wallet: null
            }),
        getAuthHeaders: ()=>{
            const { wallet: wallet1 } = useWalletStore.getState();
            return wallet1 ? {
                "x-stellar-address": wallet1.address,
                "x-stellar-signature": wallet1.signature
            } : {};
        },
        resetError: ()=>set({
                error: null
            }),
        getAccountDetails: async ()=>{
            const publicKey = get().publicKey;
            if (!publicKey) return;
            set({
                loading: true
            });
            try {} catch (error) {
                console.error("Error loading Account");
                set({
                    error: "Error loading account"
                });
            } finally{
                set({
                    loading: false
                });
            }
        },
        submitTransaction: async (transaction)=>{
            try {
                const result = await server.submitTransaction(transaction);
                return result;
            } catch (error) {
                console.error("Error submitting Transaction");
                throw error;
            }
        },
        signTransaction: async (transaction)=>{
            const secretKey = get().secretKey;
            if (!secretKey) return;
            try {
                const keyPair = StellarSdk.KeyPair.fromSecretKey(secretKey);
                transaction.sign(keyPair);
                return transaction;
            } catch (error) {
                console.error("Error signing Transaction");
                throw error;
            }
        },
        buildTransaction: async (operation)=>{
            const accountDetails = get().accountDetails;
            if (!accountDetails) return;
            try {
                const transaction = StellarSdk.TransactionBuilder(accountDetails).addOperation(operation).setTimeOut(30).build();
                return transaction;
            } catch (error) {
                console.error("Error buiding Transaction", error);
                throw error;
            }
        }
    }));
const __TURBOPACK__default__export__ = useWalletStore;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(home)/templates/[id]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$walletStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stores/walletStore.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const TemplateDetails = ()=>{
    _s();
    var _s1 = __turbopack_context__.k.signature();
    const [template, setTemplate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { wallet } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$walletStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TemplateDetails.useEffect": ()=>{
            const fetchTemplate = {
                "TemplateDetails.useEffect.fetchTemplate": async ()=>{
                    if (!wallet?.address) {
                        setError('Wallet not connected');
                        setIsLoading(false);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Wallet not connected. Please connect your wallet.');
                        return;
                    }
                    setIsLoading(true);
                    setError(null);
                    try {
                        // Dynamically import useRouter to access query params
                        const { useRouter } = await __turbopack_context__.r("[project]/node_modules/next/router.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
                        const router = useRouter();
                        const { id } = router.query;
                        if (!id || typeof id !== 'string') {
                            setError('Invalid template ID');
                            setIsLoading(false);
                            return;
                        }
                        const response = await fetch(`/api/templates/${id}`);
                        if (!response.ok) throw new Error('Failed to fetch template details');
                        const data = await response.json();
                        setTemplate(data);
                    } catch (err) {
                        setError(err.message || 'Failed to fetch template details');
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(`Error: ${err.message || 'Unknown error'}`);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["TemplateDetails.useEffect.fetchTemplate"];
            fetchTemplate();
        }
    }["TemplateDetails.useEffect"], [
        wallet
    ]);
    const handleNavigate = async (path)=>{
        _s1();
        const { useRouter } = await __turbopack_context__.r("[project]/node_modules/next/router.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
        const router = useRouter();
        router.push(path);
    };
    _s1(handleNavigate, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", true);
    if (isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-center text-gray-600 mt-[8rem]",
        children: "Loading template details..."
    }, void 0, false, {
        fileName: "[project]/app/(home)/templates/[id]/page.tsx",
        lineNumber: 57,
        columnNumber: 25
    }, this);
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-red-500 text-center mt-[8rem]",
        children: error
    }, void 0, false, {
        fileName: "[project]/app/(home)/templates/[id]/page.tsx",
        lineNumber: 58,
        columnNumber: 21
    }, this);
    if (!template) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-center text-gray-600 mt-[8rem]",
        children: "Template not found"
    }, void 0, false, {
        fileName: "[project]/app/(home)/templates/[id]/page.tsx",
        lineNumber: 59,
        columnNumber: 25
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col text-white items-center justify-center bg-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
                position: "top-right"
            }, void 0, false, {
                fileName: "[project]/app/(home)/templates/[id]/page.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-6 rounded-lg shadow-lg w-full max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold mb-4",
                        children: "Template Details"
                    }, void 0, false, {
                        fileName: "[project]/app/(home)/templates/[id]/page.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "ID:"
                            }, void 0, false, {
                                fileName: "[project]/app/(home)/templates/[id]/page.tsx",
                                lineNumber: 66,
                                columnNumber: 12
                            }, this),
                            " ",
                            template.template_id
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(home)/templates/[id]/page.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Creator:"
                            }, void 0, false, {
                                fileName: "[project]/app/(home)/templates/[id]/page.tsx",
                                lineNumber: 67,
                                columnNumber: 12
                            }, this),
                            " ",
                            template.creator
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(home)/templates/[id]/page.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "APY:"
                            }, void 0, false, {
                                fileName: "[project]/app/(home)/templates/[id]/page.tsx",
                                lineNumber: 68,
                                columnNumber: 12
                            }, this),
                            " ",
                            (template.parameters.apy / 100).toFixed(2),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(home)/templates/[id]/page.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "TVL:"
                            }, void 0, false, {
                                fileName: "[project]/app/(home)/templates/[id]/page.tsx",
                                lineNumber: 69,
                                columnNumber: 12
                            }, this),
                            " ",
                            template.parameters.tvl.toLocaleString(),
                            " XLM"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(home)/templates/[id]/page.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Risk Factor:"
                            }, void 0, false, {
                                fileName: "[project]/app/(home)/templates/[id]/page.tsx",
                                lineNumber: 70,
                                columnNumber: 12
                            }, this),
                            " ",
                            template.parameters.risk_factor
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(home)/templates/[id]/page.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleNavigate('/'),
                        className: "w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors",
                        children: "Back to Home"
                    }, void 0, false, {
                        fileName: "[project]/app/(home)/templates/[id]/page.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(home)/templates/[id]/page.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(home)/templates/[id]/page.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
};
_s(TemplateDetails, "16BBF2V5z2A7Vmg+kQRiqB1VBa0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$walletStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = TemplateDetails;
const __TURBOPACK__default__export__ = TemplateDetails;
var _c;
__turbopack_context__.k.register(_c, "TemplateDetails");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_770b59ce._.js.map