import React, { useEffect, useState } from "react";
import { formatUnits } from "@ethersproject/units";
import { useContractCalls, ERC20Interface } from "@usedapp/core";

function useTokensBalance(tokenList, account) {
  return useContractCalls(
    tokenList && account
      ? tokenList.map((token) => ({
          abi: ERC20Interface,
          address: token.contractAddress,
          method: "balanceOf",
          args: [account],
        }))
      : []
  );
}

function withPositiveBalance(tokenList, balances) {
  return tokenList.reduce((acc, token, idx) => {
    if (balances?.[idx] && !balances?.[idx][0].isZero()) {
      acc.push({
        tokenInfo: token,
        tokenBalance: formatUnits(balances[idx][0], token.decimals),
      });
    }
    return acc;
  }, []);
}

const getAllTransfersFromEtherscan = (walletAddress) => {
  return fetch(
    `https://api.etherscan.io/api?module=account&action=tokentx&address=${walletAddress}&startblock=0&endblock=999999999&sort=asc&apikey=TA9V6N8V168HP7CIAZ8KFPRK8CTXDGVQHH`
  )
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.message === "OK") {
        const uniq = [
          ...new Map(
            resp.result.map((item) => [item["contractAddress"], item])
          ).values(),
        ];
        return uniq;
      }
    });
};

function TokenList(props) {
  const { walletAddress } = props;
  const [ethTokenList, setEthTokenList] = useState([]);

  useEffect(async () => {
    if (!!walletAddress) {
      getAllTransfersFromEtherscan(walletAddress).then((list) => {
        setEthTokenList(list);
      });
    }
  }, [walletAddress]);
  const balances = useTokensBalance(ethTokenList, walletAddress);
  const positiveBalances = balances
    ? withPositiveBalance(ethTokenList, balances)
    : [];
  return (
    <>
      <div className="mt-8 ml-4 space-y-1">
        <div>ERC20 tokens</div>
        <div className="space-y-2">
          {positiveBalances.length > 0 ? (
            positiveBalances.map(({ tokenInfo: token, tokenBalance }) => (
              <div
                key={token.contractAddress}
                className="flex  items-center space-x-3 "
                title={token.tokenName}
              >
                <div className="text-3xl">{token.tokenSymbol}</div>
                <div className="text-3xl">{tokenBalance}</div>
              </div>
            ))
          ) : (
            <div className="text-3xl"> No tokens </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TokenList;
