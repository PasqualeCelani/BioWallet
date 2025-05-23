# BioWallet
A biometric based wallet for cryptocurrencies that leverages facial recognition to securely generate and retrieve cryptographic keys, eliminating the need for passwords or phrases. 
BioWallet is a **proof-of-concept** desktop application implementing a key release biometric cryptosystem, ensuring that private keys are only accessible after successful identity verification.

&nbsp;

![alt text](https://github.com/PasqualeCelani/BioWallet/blob/main/doc/assets/homepage.png?raw=true)

##  :rocket: Key Features

* 🧠 **Facial Recognition with Deep Learning:** Uses RetinaFace for detection and FaceNet512 for embedding generation;
* 🔐 **Key Release Cryptosystem**: Private keys are stored and released only after a successful verification;
* 📊 **Quality Verification:** Integrates FaceQnet for automatic facial quality filtering of the samples submited either as probe or as templates in the gallery; 
* :key: **ECC-Based Key Generation:** Uses secp256k1 elliptic curve cryptography for Bitcoin compatibility;
* 🧪 **Experimental Validation:** Evaluated on AT&T and custom DB-1 datasets.
  * The two datasets used for evaluations and the FaceQnet pre-traid model can be downloaded from the following [link](https://drive.google.com/drive/folders/1fQCNFnmyeTsDg8TEFWbBa0d8ynN5bO4w?usp=sharing). The FaceQnet pre-traid model must be placed in the following application directory ```BioWallet/app/backend/src/flask_docker/util/models```, and the dataset under ```BioWallet/datasets```. Moreover, a suit of scripts for running the evaluations are in the verification module of this repository ```BioWallet/verification```.
* :notebook_with_decorative_cover: **Documentation**: For a more detailed overview of the project, please refer to the main report available in the ```doc/main.pdf``` file within the repository.

## :gear: Build&Run
### Prerequisites
Having Docker and Docker Compose installed. Moreover, ensure that the FaceQnet model is properly loaded in the backend, as demonstrated in the "Experimental Validation" section under Key Features. The model is not included in the repository, so while the application will still build without it, an error will occur during enrollment or verification if the model is missing. The following steps are intended for running the actual application. If you need to execute the verification scripts or plot experimental results from the CSV files, you'll also need to have Python installed on your machine (e.g., Python 3.12) along with a compatible version of Poetry.
### Steps for the application

1. Clone the repository: ```git clone https://github.com/PasqualeCelani/BioWallet.git```
2. Go to the application directory: ```cd BioWallet/app```
3. Start the application: ```docker compose up --build --force-recreate```
4. Open the application:  Open the following URL in your favorite browser ```http://localhost:3000```

### Steps for the verification

1. Clone the repository: ```git clone https://github.com/PasqualeCelani/BioWallet.git```
2. Go to the repository directory: ```cd BioWallet```
3. Create the lock file: ```poetry lock```
4. Install the dependencies: ```poetry install```
5. Go to the verification directory: ```cd verification```
6. Choose a script to run, for instance: ```poetry run python plot.py --type=FRR-FAR --benchmark_file=./BenchmarkResults/benchmark_50-50_Facenet512_retinaface_Aligned_MyDataset```

## :warning: Limitations
While BioWallet demonstrates the feasibility of using facial biometrics for secure cryptographic key management, it currently remains a prototype and has several limitations that should be addressed in future development:

* **No Blockchain Integration**:  Only generates public and private keys and displays them, it does not handle addresses, transactions, or funds nor is it integrated with the Bitcoin blockchain;
* **Possibility of Spoofing**: There is currently no protection against spoofing attempts using photos or videos;
* **Desktop only**: Currently, the application's user interface is designed to be user-friendly and functional only on desktop devices;
* **Local host only**:  Currently, the application is not intended to run in a server environment due to potential security risks. While it is theoretically possible, it is not recommended, as potential threats have not been thoroughly evaluated.

## :paperclip: License 
This project is released under the MIT License.
