"use client";

import { useEffect, useState } from "react";

type ConnectionStatus = {
  status: string;
  message?: string;
  connectionDetails?: object;
} | null;

export default function Home() {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>(null);

  useEffect(() => {
    async function fetchConnectionData() {
      try {
        const response = await fetch("/api/connect");
        const data = await response.json();
        setConnectionStatus({
          status: "success",
          connectionDetails: data,
        });
      } catch (error) {
        if (error instanceof Error) {
          setConnectionStatus({
            status: "error",
            message: error.message,
          });
        } else {
          setConnectionStatus({
            status: "error",
            message: "An unknown error occurred",
          });
        }
      }
    }

    fetchConnectionData();
  }, []);

  return (
    <div className="p-5">
      <h1 className="font-semibold">Database Connection Status</h1>
      {connectionStatus ? (
        <div>
          <p className="font-semibold">Status: {connectionStatus.status}</p>
          {connectionStatus.status === "success" && (
            <pre className="font-semibold">
              {JSON.stringify(connectionStatus.connectionDetails, null, 2)}
            </pre>
          )}
          {connectionStatus.status === "error" && (
            <p className="font-semibold">Error: {connectionStatus.message}</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
