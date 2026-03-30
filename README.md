# Javascript & Typescript SDK for Safeheron API

![GitHub last commit](https://img.shields.io/github/last-commit/Safeheron/safeheron-api-sdk-js)
![GitHub top language](https://img.shields.io/github/languages/top/Safeheron/safeheron-api-sdk-js?color=green)

# API Documentation
- [Official documentation](https://docs.safeheron.com/api/index.html)

# Installation

```bash
npm install @safeheron/api-sdk --save
```
or
```bash
yarn add @safeheron/api-sdk
```

# AI-Powered Development

Use the **Safeheron Skill** with Claude Code or Cursor to generate, debug, and troubleshoot Safeheron API integrations using natural language.

**Example prompts:**
- "Help me set up an API Co-Signer approval callback service"
- "Write a Webhook handler to process incoming transaction events"
- "What causes error 1012 and how do I fix it?"

**Get started:**

View the Skill source code on GitHub: [safeheron/safeheron-skill](https://github.com/safeheron/safeheron-skill)

# Usage

> Take `/v1/account/create` as an example to explain, the complete code can be found in `demo/api_demo/` directory

* Import 
  ```ts
    import { AccountApi, CreateAccountRequest, CreateAccountResponse } from "@safeheron/api-sdk";
  ```

* Construct `AccountApi`
  ```ts
    // You can get `apiKey` and `safeheronRsaPublicKey` from Safeheron Web Console: https://www.safeheron.com/console.
    const accountApi = new AccountApi({
        baseUrl: 'https://api.safeheron.vip',
        apiKey: 'd1ad6******a572e7',
        // Here are two configuration options:
        // 1. Configure the path to the private key file, the path must contain the "file:" prefix, for example: file:/path/to/your/private/key/file.pem
        // 2. Configure the private key content in string format, for example: -----BEGIN PRIVATE KEY-----\nMIIJQgIBADANBgkqhkiG****ICAQDidDHYV73U4cub\n-----END PRIVATE KEY-----
        rsaPrivateKey: "file:/path/to/your/private/key/file.pem",
        // You can get safeheronRsaPublicKey from Safeheron Web Console. Here are two configuration options:
        // 1. Save safeheronRsaPublicKey to a file and configure the path to the file, the path must contain the "file:" prefix, for example: file:/path/to/safeheron/public/key/file.pem
        // 2. Directly paste the public key that you copied from the web console, for example: MIICIjANBgkqhki****8eUQV63wRS0CAwEAAQ==
        safeheronRsaPublicKey: "MIICIjANBgkqhki****8eUQV63wRS0CAwEAAQ==",
        // RequestTimeout (Millisecond), Default: 20000
        requestTimeout: 20000
    });
  ```
* Call api with `AccountApi`
  ```ts
    const request: CreateAccountRequest = {
        accountName: "first_account"
    }

    const createAccountResponse:CreateAccountResponse = await accountApi.createAccount(request);
    // Your code to process response
    ...
  ```

# Test
## Test Create Wallet Account
* Before run the test code, modify `demo/api_demo/.safeheronrc.dist` according to the comments
  ```ini
  # your api key
  APIKEY=
  # path to your private key file, pem encoded
  PRIVATE_KEY_PEM_FILE=
  # path to safeheron api public key file, pem encoded
  APIKEY_PUBLIC_KEY_PEM_FILE= 
  # Safheron api url
  BASE_URL=https://api.safeheron.vip
  # RequestTimeout (Millisecond), Default: 20000
  requestTimeout: 20000
  ```
* Run the test
  ```bash
  $ cd demo/api_demo
  $ cp .safeheronrc.dist .safeheronrc
  $ ts-node ./accountDemo.ts
  ```

## Test Send A Transaction
* Before run the test code, modify `demo/api_demo/.sendtransaction.dist` according to the comments
  ```ini
  # your api key
  APIKEY=
  # path to your private key file, pem encoded
  PRIVATE_KEY_PEM_FILE=
  # path to safeheron api public key file, pem encoded
  APIKEY_PUBLIC_KEY_PEM_FILE= 
  # Safheron api url
  BASE_URL=https://api.safeheron.vip
  # RequestTimeout (Millisecond), Default: 20000
  requestTimeout: 20000
  # Wallet Account key
  ACCOUNT_KEY=
  # To address
  DESTINATION_ADDRESS=
  ```
* Run the test
  ```bash
  $ cd demo/api_demo
  $ cp .sendtransaction.dist .sendtransactionrc
  $ ts-node ./transactionDemo.ts
  ```

## Test MPC Sign
* Before run the test code, modify `demo/mpc_demo/.mpcdemo.dist` according to the comments
  ```ini
  # your api key
  APIKEY=
  # path to your private key file, pem encoded
  PRIVATE_KEY_PEM_FILE=
  # path to Safeheron api public key file, pem encoded
  APIKEY_PUBLIC_KEY_PEM_FILE=
  # Safeheron api url
  BASE_URL=https://api.safeheron.vip
  # RequestTimeout (Millisecond), Default: 20000
  requestTimeout: 20000
  # Wallet Account key
  ACCOUNT_KEY=
  # Goerli testnet token address in wallet account
  ACCOUNT_TOKEN_ADDRESS=
  # erc20 token contract address
  ERC20_CONTRACT_ADDRESS=
  # address to receive token
  TO_ADDRESS=
  ```

* Run the test
  ```bash
  $ cd demo/mpc_demo
  $ cp .mpcdemo.dist .mpcdemorc
  $ ts-node ./mpcSign.ts
  ```




