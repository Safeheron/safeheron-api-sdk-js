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

# Usage

> Take `/v1/account/create` as an example to explain, the complete code can be found in `demo/api_demo/` directory

* Define request parameter data object
  ```ts
    interface CreateAccountRequest {
        accountName?: string;
        hiddenOnUI?: boolean;
    }
  ```

* Define response data object
  ```ts
    interface CreateAccountResponse {
        accountKey: string;
        pubKeys: Array<{
            signAlg: string;
            pubKey: string;
        }>;
    };
  ```
* Construct `SafeheronClient`
  ```ts
    // You can get `apiKey` and `safeheronRsaPublicKey` from Safeheron Web Console: https://www.safeheron.com/console.
    const client: SafeheronClient = new SafeheronClient({
        baseUrl: 'https://api.safeheron.vip',
        apiKey: 'd1ad6******a572e7',
        rsaPrivateKey: privateKey,
        safeheronRsaPublicKey: publicKey,
        requestTimeout: 3000,
    });
  ```
* Call api with `client`
  ```ts
    const request: CreateAccountRequest = {
        accountName: "first_account"
    }

    const createAccountResponse = await accountApi.createAccount(request);
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




