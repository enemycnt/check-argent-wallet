import React from "react";
import { utils } from 'ethers'

import { useContractCall } from "@usedapp/core";

import ABI from '../abi/argent.json'

const argentInterface = new utils.Interface(ABI)
const GUARDIAN_CONTRACT_ADDRESS = '0xFF5A7299ff6f0fbAad9b38906b77d08c0FBdc9A7'


function GuardiansCount(props) {
  const { walletAddress } = props;

  const numberOfguardians = walletAddress ? useContractCall({
    abi: argentInterface,
    address: GUARDIAN_CONTRACT_ADDRESS,
    method: 'guardianCount',
    args: [walletAddress],
  }) : 0;
  return (
    <div className="mt-12 ml-4 space-y-1">
      <div>Number of guardians</div>
      <div className="text-3xl">
        {numberOfguardians ? numberOfguardians.toString() : '0'}
      </div>
    </div>
  );
}

export default GuardiansCount;
