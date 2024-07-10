import { configureChains, createConfig } from "wagmi";
import { mainnet, polygon, optimism } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism],
  [alchemyProvider({ apiKey: "yourAlchemyApiKey" }), publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains }), new MetaMaskConnector()],
  publicClient,
});

function WagmiContextProvider({ children }) {
  return (
    <WagmiContext.Provider value={config}>{children}</WagmiContext.Provider>
  );
}
