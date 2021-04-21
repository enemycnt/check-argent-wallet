import React from "react";
import { BigNumber } from "ethers";
import { formatEther } from "@ethersproject/units";
import { useEtherBalance } from "@usedapp/core";

function Balance(props) {
  const { walletAddress } = props;
  const balance = useEtherBalance(walletAddress);
  const formatter = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 4,
  });
  const formattedBalance = formatter.format(
    parseFloat(formatEther(balance ?? BigNumber.from("0")))
  );

  return (
    <div className="mt-12 ml-4 space-y-1">
      <div>Wallet Balance</div>
      <div className="text-3xl">{formattedBalance} ETH</div>
    </div>
  );
}

export default Balance;
