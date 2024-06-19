// central store for loading faucet data
import { useActiveAccount, useAutoConnect } from "thirdweb/react";
import { client, wallets } from "@/lib/thirdweb-client";
import { useFaucetBalance } from "@/queries/useFaucetBalance";
import { useFaucetStats } from "@/queries/useFaucetStats";
import { useIsWhitelisted } from "@/queries/useIsWhitelisted";

const useFaucet = () => {
  const wallet = useActiveAccount();
  const { isLoading: isAutoConnecting } = useAutoConnect({ client, wallets });
  const { data, isLoading } = useIsWhitelisted(wallet?.address ?? "");
  const { data: faucetBalance, refetch: refetchFaucet, isLoading: isFetchingFaucetBalance } = useFaucetBalance();
  const { data: faucetStats, isLoading: isFetchingFaucetStats } = useFaucetStats(wallet?.address as string);

  return {
    isFaucetLoading: isAutoConnecting || isLoading || isFetchingFaucetStats || isFetchingFaucetBalance,
    isWhitelisted: data?.isWhitelisted,
    wallet,
    faucetBalance,
    faucetStats,
    refetchFaucet,
  };
};

export { useFaucet };
