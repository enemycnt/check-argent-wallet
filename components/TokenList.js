import React from "react";
import { formatUnits } from "@ethersproject/units";
import { useContractCalls, useEthers, ERC20Interface } from "@usedapp/core";
import sushiswapToken from "@sushiswap/default-token-list";

function getTokenList(chainId) {
  return sushiswapToken.tokens.filter((token) => token.chainId == chainId);
}

function useTokensBalance(tokenList, account) {
  return useContractCalls(
    tokenList && account
      ? tokenList.map((token) => ({
          abi: ERC20Interface,
          address: token.address,
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

function TokenList(props) {
  const { walletAddress } = props;
  const { chainId } = useEthers();
  const tokenList = getTokenList(chainId);
  const balances = useTokensBalance(tokenList, walletAddress);
  const positiveBalances = balances
    ? withPositiveBalance(tokenList, balances)
    : [];
  return (
    <>
      <div className="mt-8 ml-4 space-y-1">
        <div>ERC20 tokens</div>
        <div className="space-y-2">
          {positiveBalances.length > 0 ?
            positiveBalances.map(({ tokenInfo: token, tokenBalance }) => (
              <div key={token.address} className="flex  items-center space-x-3 " title={token.name}>
                <div>
                  <img
                    src={token.logoURI}
                    alt={`${token.symbol} logo`}
                    className="w-6"
                  />
                </div>
                <div className="text-3xl">{token.symbol}</div>
                <div className="text-3xl">{tokenBalance}</div>

              </div>
            )) : <div className="text-3xl"> No tokens </div>}
        </div>
      </div>
    </>
  );
}

export default TokenList;
