# GitHub integration example

This example shows the smallest end-to-end GitHub integration flow with Composio:

1. Create a Composio-managed GitHub auth config.
2. Generate a connection URL and wait for the user to authorize GitHub.
3. Execute `GITHUB_GET_A_REPOSITORY` against `mixiboo/composio`.

## Prerequisites

- Node.js/Bun supported by this repository
- A Composio project API key

Set `COMPOSIO_API_KEY` in your environment, then run:

```bash
bun src/index.ts
```

The script prints a GitHub authorization URL. After authorization completes, it performs the first real Composio GitHub tool call and prints the result.
