"use client";

import { sepolia } from "wagmi/chains";
import { useState } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";

const alchemyId = process.env.ALCHEMY_API_KEY;
const walletConnectProjectId = process.env.WALLETCONNECT_PROJECT_ID;

const chains = [sepolia];

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/7uHD11eAzJs-ZrvTrfkQML__oQ20hD_v"
    ),
  },
});

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <PrivyProvider
          appId="clzdcx13r04tfu5kagi026oc0"
          config={{
            appearance: {
              theme: "light",
              accentColor: "#676FFF",
              logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
            },
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
          }}
        >
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <ConnectKitProvider chains={chains}>
                {children}
              </ConnectKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </PrivyProvider>
      </body>
    </html>
  );
}
