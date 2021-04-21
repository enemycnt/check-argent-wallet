import { useState } from "react";
import Head from "next/head";

import Balance from "../components/Balance";
import GuardiansCount from "../components/GuardiansCount";
import TokenList from "../components/TokenList";
import Form from "../components/Form";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null);
  return (
    <div className="bg-gray-200 container mx-auto">
      <Head>
        <title>Check Argent wallet</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <main className="bg-white m-5 px-8 py-8 max-w-xl mx-auto border-2 border-solid rounded-lg shadow-xl">
        <Form setAddress={setWalletAddress} />
        <Balance walletAddress={walletAddress} />
        <GuardiansCount walletAddress={walletAddress} />
        <TokenList walletAddress={walletAddress} />
      </main>
    </div>
  );
}
