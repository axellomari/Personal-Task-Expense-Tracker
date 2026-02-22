import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useMessage() {
  return useQuery({
    queryKey: [api.messages.get.path],
    queryFn: async () => {
      const res = await fetch(api.messages.get.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch message");
      const data = await res.json();
      return api.messages.get.responses[200].parse(data);
    },
    // Adding some retry logic for robustness
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
