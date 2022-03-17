const TronWeb = require('tronweb')
const hdWallet = require('tron-wallet-hd');
const utils=hdWallet.utils;

//Conexion con el cluster de tron 
const tronWeb = new TronWeb({
    fullHost : 'https://api.trongrid.io/',
    solidityNode: 'https://api.trongrid.io/' 
  }
)
//Metodo para establecer la dirección utilizada con todas las API de TronWeb
tronWeb.setAddress('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'); //Direccion publica contrato Tether(USDT)


//Variable que almacena Frase secreta 
const seed = utils.generateMnemonic();
console.log("Frase secreta :",seed);

//Variable que se utiliza para validar frase secreta
const isValidSeed = utils.validateMnemonic(seed);

//Funcion para generar KEYPAIR (secret key , public key )
async function account() {
    const acc = await utils.generateAccountsWithMnemonic(seed,1);
    console.log("Direccion publica :",acc[0].address);
    return acc   
}


// Temporizador para activar funcion de balance 
setTimeout(() => {
    balance()
}, 2000)

//Funcion para obtener balance de una cuenta 
async function balance() {
    const cuenta = await account();
    const trc20ContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";//Direccion publica contrato Tether(USDT)

    try {
        let contract = await tronWeb.contract().at(trc20ContractAddress);
        //Use call to execute a pure or view smart contract method.
        // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
        let result = await contract.balanceOf(cuenta[0].address).call();
        let balance = tronWeb.toDecimal(result)
        console.log('Balance : ', balance);
    } catch(error) {
        console.error("trigger smart contract error",error)
    }
}