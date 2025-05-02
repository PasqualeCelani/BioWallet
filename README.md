# BioWallet
A biometric based wallet for cryptocurrencies that leverages facial recognition to securely generate and retrieve cryptographic keys, eliminating the need for passwords or phrases. 
BioWallet is a **proof-of-concept** desktop application implementing a key release biometric cryptosystem, ensuring that private keys are only accessible after successful identity verification.

&nbsp;

![alt text](https://github.com/PasqualeCelani/BioWallet/blob/main/doc/assets/homepage.png?raw=true)

## :warning: Limitations
While BioWallet demonstrates the feasibility of using facial biometrics for secure cryptographic key management, it currently remains a prototype and has several limitations that should be addressed in future development:

* **No Blockchain Integration**:  Only generates public and private keys and displays them, it does not handle addresses, transactions, or funds nor is it integrated with the Bitcoin blockchain;
* **Possibility of Spoofing**: There is currently no protection against spoofing attempts using photos or videos;
* **Desktop only**: Currently, the application's user interface is designed to be user-friendly and functional only on desktop devices;
* **Local host only**:  Currently, the application is not intended to run in a server environment due to potential security risks. While it is theoretically possible, it is not recommended, as potential threats have not been thoroughly evaluated.
