import axios from "axios";

interface FeatureFlag {
    id: string;
    name: string;
    enabled: boolean;
    targeting?: {
        default: boolean;
        rules: { condition: string; enabled: boolean }[];
    };
}

class SwashFeatureFlags {
    private readonly apiUrl: string;
    private readonly apiToken: string;
    private cache: FeatureFlag[] = [];
    private readonly cacheExpiration: number;
    private lastFetchTime: number | null = null;

    constructor(apiUrl: string, apiToken: string, cacheTime: number = 60000) {
        this.apiUrl = apiUrl;
        this.apiToken = apiToken;
        this.cacheExpiration = cacheTime; // Default: 60 seconds
    }

    // ✅ Fetch all feature flags with caching
    async fetchFlags(): Promise<FeatureFlag[]> {
        const now = Date.now();

        // ✅ Return cached data if it's still valid
        if (this.lastFetchTime && now - this.lastFetchTime < this.cacheExpiration) {
            console.log("⚡ Returning cached feature flags");
            return this.cache;
        }

        try {
            const response = await axios.get(`${this.apiUrl}/flags`, {
                headers: { Authorization: `Bearer ${this.apiToken}` },
            });

            this.cache = response.data; // Store in cache
            this.lastFetchTime = now; // Update last fetch time

            console.log("✅ Fetched feature flags from API");
            return this.cache;
        } catch (error) {
            console.error("🚨 Error fetching feature flags:", error);
            return this.cache.length ? this.cache : []; // Return cache if available
        }
    }

    // ✅ Manually refresh flags (force fetch)
    async refreshFlags(): Promise<FeatureFlag[]> {
        console.log("🔄 Manually refreshing feature flags...");
        this.lastFetchTime = null; // Invalidate cache
        return this.fetchFlags();
    }

    // ✅ Get a specific flag from cache
    getFlag(flagId: string): FeatureFlag | undefined {
        return this.cache.find((flag) => flag.id === flagId);
    }
}

export default SwashFeatureFlags;
