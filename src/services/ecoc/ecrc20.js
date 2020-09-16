import abi from "ethjs-abi";
import BigNumber from "bignumber.js";
import services from "./services";
import ecocjs from "./ecoc-lib";

const toDecimals = (value, decimals) => {
    const res = BigNumber(value).dividedBy(
        BigNumber(10).pow(BigNumber(decimals))
    );
    return res.toString();
};

export const getEcrc20List = tokens => {
    return tokens.map(token => ({
        name: token.contract.name,
        symbol: token.contract.symbol,
        contract_address: token.contract.contract_address,
        decimals: token.contract.decimals,
        total_supply: token.contract.total_supply,
        amount: toDecimals(token.amount, token.contract.decimals)
    }));
};

export const getEcrc20Info = contractAddress => {
    return services.currentNode().getTokenInfo(contractAddress);
};

export const checkSymbol = (symbol, tokenList) => {
    return (
        tokenList.filter(token => {
            return token.symbol === symbol;
        }).length > 0
    );
};

export const getTokenBySymbol = (symbol, tokenList) => {
    return tokenList.filter(token => {
        return token.symbol === symbol;
    })[0];
};

export const encodeSendData = (token, to, amount) => {
    return (
        "a9059cbb" +
        abi
            .encodeParams(
                ["address", "uint256"],
                [
                    "0x" +
                        ecocjs.address
                            .fromBase58Check(to)
                            ["hash"].toString("hex"),
                    amount * Math.pow(10, token.decimals)
                ]
            )
            .substr(2)
    );
};
