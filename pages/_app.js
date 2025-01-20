import "@/styles/globals.css";

import {ChatAppProvider} from '../Context/ChatAppContext';
import {NavBar} from "../Components/index";


import { WagmiProvider, createConfig } from "wagmi";
import { mainnet, sepolia, localhost } from "wagmi/chains"; 
import {createClient, http } from 'viem';    
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";




const config = createConfig({
    chains: [mainnet, sepolia, localhost]
});

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }) => (
    <div>
        <WagmiProvider config={ config}>
                <ChatAppProvider >
                    <NavBar />
                    <Component {...pageProps} />
                </ChatAppProvider>
        </WagmiProvider>
    </div>
  
);

export default MyApp;
