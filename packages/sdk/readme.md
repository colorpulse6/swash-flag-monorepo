# Swash Feature Flags SDK

## 🚀 Introduction
Welcome to the **Swash Feature Flags SDK**! 🎉

This lightweight JavaScript SDK allows you to **easily integrate feature flags** into your application. Whether you're rolling out new features gradually or enabling experimental functionality, Swash Feature Flags has you covered. ✅

Unlike traditional authentication-based systems, the Swash Feature Flags SDK **uses API tokens** for authentication. This means you don’t have to deal with JWTs manually—just grab your API token from the Swash Flag Dashboard and start using feature flags immediately! 🔐

---

## 📦 Installation
First, install the SDK using your favorite package manager:

```sh
pnpm add swash-feature-flags-sdk
# or
npm install swash-feature-flags-sdk
# or
yarn add swash-feature-flags-sdk
```

---

## 🔧 Basic Implementation (Works Out of the Box)
Here’s a quick setup that fetches feature flags and evaluates them for a user:

```ts
import SwashFeatureFlags from "swash-feature-flags-sdk";

const featureFlags = new SwashFeatureFlags("https://api.swashflag.com", "YOUR_API_TOKEN");

// Fetch feature flags
featureFlags.fetchFlags().then(flags => {
  console.log("Feature Flags:", flags);
});

// Evaluate a flag for a user
featureFlags.evaluateFlag("new-dashboard", { id: "user-123" }).then(isEnabled => {
  console.log(isEnabled ? "✅ Feature is enabled!" : "❌ Feature is disabled.");
});
```

**Where do I get an API token?** 🤔
- Go to the **Swash Flag Dashboard**.
- Navigate to the **API Tokens** section.
- Click **"Generate API Token"**.
- Copy the generated token and use it in the SDK.

---

## 🚦 Fetching All Feature Flags
Retrieve all available feature flags like this:

```ts
featureFlags.fetchFlags().then(flags => {
  console.log("Feature Flags:", flags);
});
```

This returns an **array of feature flags**:
```json
[
  {
    "id": "dark-mode",
    "name": "Dark Mode",
    "enabled": false
  },
  {
    "id": "new-dashboard",
    "name": "New Dashboard UI",
    "enabled": true
  }
]
```

---

## 🎯 Evaluating a Feature Flag for a User
If you want to check whether a **specific user** has access to a feature, use:

```ts
featureFlags.evaluateFlag("new-dashboard", { id: "user-123", location: "US" }).then(isEnabled => {
  if (isEnabled) {
    console.log("✅ Feature is enabled!");
  } else {
    console.log("❌ Feature is disabled.");
  }
});
```

This will return `true` or `false` depending on the flag’s targeting rules.

---

## 🚀 Caching for Performance
The SDK automatically **caches feature flags** after fetching them to avoid unnecessary API requests. If you want to manually refresh the cache:

```ts
featureFlags.refreshFlags().then(flags => {
  console.log("🔄 Flags refreshed:", flags);
});
```

**How does caching work?**
- The SDK **stores feature flags in memory** for 60 seconds (default).
- If a request is made before the cache expires, it **returns cached flags** instead of hitting the API.
- The cache **resets on page reload**, ensuring fresh data on new sessions.
- Developers can manually refresh flags anytime using `refreshFlags()`.

---

## 🛠 Advanced Configuration
You can customize caching behavior and logging options:

```ts
const featureFlags = new SwashFeatureFlags("https://api.swashflag.com", "YOUR_API_TOKEN", 30000); // Cache for 30 seconds
```

### **Available Options:**
| Option       | Description                                     | Default  |
|-------------|---------------------------------|----------|
| `cacheTime` | Time (in milliseconds) before cache expires | `60000` (60s) |

---

## ❓ Need Help?
If you have any questions or run into issues, feel free to [open an issue](https://github.com/your-repo/swash-feature-flags-sdk/issues) or reach out to us! 🚀

Happy coding! 🎉

