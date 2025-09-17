"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let queryClientSingleton: QueryClient | null = null;

function getQueryClient() {
  if (!queryClientSingleton) {
    queryClientSingleton = new QueryClient();
  }
  return queryClientSingleton;
}

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = React.useMemo(() => getQueryClient(), []);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
