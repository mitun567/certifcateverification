//made changes
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";

export function Profile({}) {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { address, connector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance, refetch } = useBalance({ address });
  const [realtimeBalance, setRealtimeBalance] = useState(null);

  useEffect(() => {
    if (isConnected && balance) {
      const { formatted, symbol, ...other } = balance;
      setRealtimeBalance(balance);
      console.log("realtime in profile.js:", realtimeBalance);
    }
  }, [isConnected, balance]);

  const handleConnect = async (connector) => {
    try {
      await connect({ connector });
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  useEffect(() => {
    // Fetch balance when address changes
    if (address) {
      refetch();
    }
  }, [address, refetch]);

  return (
    <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 h-18 min-w-full py-3 mt-0 flex justify-between items-center shadow-lg">
      <p className="ml-6 text-lg font-bold">CERTIFICATE VERIFICATION</p>
      <Image
        className="md:mr-36 h-auto w-auto"
        src="/tick4.png"
        alt="Image Description"
        width={60}
        height={40}
      />
      <span>
        {isConnected && balance && (
          <div className="mr-9">
            <p>Connected to: {address.slice(0, 7)}...</p>
            <p>
              Balance: {parseFloat(balance.formatted).toFixed(5)}{" "}
              {balance.symbol}
            </p>
          </div>
        )}
        {!isConnected ? (
          connectors.map((connector) => (
            <button
              className="mr-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2"
              key={connector.id}
              onClick={() => handleConnect(connector)}
            >
              LogIn
            </button>
          ))
        ) : (
          <button
            className="mr-6 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full ml-2"
            onClick={handleDisconnect}
          >
            LogOut
          </button>
        )}
      </span>
    </span>
  );
}
