module.exports = {

"[project]/lib/constants.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/buffer [external] (buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[externals]/tty [external] (tty, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[project]/stores/walletStore.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stellar$2f$freighter$2d$api$2f$build$2f$index$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@stellar/freighter-api/build/index.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stellar$2f$stellar$2d$sdk$2f$lib$2f$rpc$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@stellar/stellar-sdk/lib/rpc/index.js [app-ssr] (ecmascript)");
;
;
;
;
const sorobanClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stellar$2f$stellar$2d$sdk$2f$lib$2f$rpc$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Server"](__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NETWORK"].SOROBAN_RPC_URL, {
    allowHttp: true
});
const useWalletStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
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
                const publicKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stellar$2f$freighter$2d$api$2f$build$2f$index$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPublicKey"])();
                const challenge = "default-challenge";
                const signedChallenge = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stellar$2f$freighter$2d$api$2f$build$2f$index$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signTransaction"])(challenge);
                setSignature(signedChallenge);
                setWallet({
                    address: publicKey,
                    signature: signedChallenge
                });
                if (!await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stellar$2f$freighter$2d$api$2f$build$2f$index$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isConnected"])()) {
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
}}),
"[project]/app/(auth)/connect-wallet/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$walletStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stores/walletStore.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const Auth = ()=>{
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { wallet, connectWallet, error: walletError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$walletStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkWallet = async ()=>{
            if (wallet?.address) {
            // No direct navigation here; handled by handleNavigate
            }
        };
        checkWallet();
    }, [
        wallet
    ]);
    // Dynamically import useRouter for navigation
    const handleNavigate = async (path)=>{
        const { useRouter } = await __turbopack_context__.r("[project]/node_modules/next/router.js [app-ssr] (ecmascript, async loader)")(__turbopack_context__.i);
        const router = useRouter();
        router.push(path);
    };
    const handleConnectWallet = async ()=>{
        setIsLoading(true);
        setError(null);
        try {
            await connectWallet();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Wallet connected successfully!');
            handleNavigate('/');
        } catch  {
            setError(walletError || 'Failed to connect wallet');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(`Wallet connection error: ${walletError || 'Unknown error'}`);
        } finally{
            setIsLoading(false);
        }
    };
    const handleGoHome = ()=>{
        handleNavigate('/');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center rounded-4xl bg-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
                position: "top-right"
            }, void 0, false, {
                fileName: "[project]/app/(auth)/connect-wallet/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-mona-sans font-bold mb-4 text-black",
                        children: "Connect Wallet"
                    }, void 0, false, {
                        fileName: "[project]/app/(auth)/connect-wallet/page.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-500 mb-4",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/(auth)/connect-wallet/page.tsx",
                        lineNumber: 52,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleConnectWallet,
                        disabled: isLoading || wallet?.address !== undefined,
                        className: "w-full bg-pink-500 text-white py-2 rounded hover:scale-105 transition-colors disabled:bg-blue-300",
                        children: isLoading ? 'Connecting...' : 'Connect Wallet'
                    }, void 0, false, {
                        fileName: "[project]/app/(auth)/connect-wallet/page.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleGoHome,
                        className: "w-full mt-4 bg-gray-500 text-white py-2 rounded hover:scale-105 transition-colors",
                        disabled: wallet?.address === undefined,
                        children: "Go to Home"
                    }, void 0, false, {
                        fileName: "[project]/app/(auth)/connect-wallet/page.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(auth)/connect-wallet/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(auth)/connect-wallet/page.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = Auth;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__591fbf12._.js.map