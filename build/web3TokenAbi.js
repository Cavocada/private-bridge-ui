const { exec } = require('child_process');

exec(`abi-types-generator './src/abis/Erc20.json' --output='./src/contracts' --name=Erc20 --provider=web3`);
exec(`abi-types-generator './src/abis/Bridge.json' --output='./src/contracts' --name=Bridge --provider=web3`);
exec(`abi-types-generator './src/abis/DebtToken.json' --output='./src/contracts' --name=DebtToken --provider=web3`);
