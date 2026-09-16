import { AuthConfigTypes, Composio } from '@composio/core';
import 'dotenv/config';

const apiKey = process.env.COMPOSIO_API_KEY;

if (!apiKey) {
  throw new Error('COMPOSIO_API_KEY is required');
}

const composio = new Composio({ apiKey });

async function main() {
  console.log('🚀 Starting Composio GitHub integration example...');

  const authConfig = await composio.authConfigs.create('github', {
    type: AuthConfigTypes.COMPOSIO_MANAGED,
    name: 'GitHub Integration Example',
  });

  console.log(`🔐 Auth config created: ${authConfig.id}`);

  const connectionRequest = await composio.connectedAccounts.link(
    'default',
    authConfig.id
  );

  console.log('\n🔗 Open this URL to connect GitHub:');
  console.log(connectionRequest.redirectUrl);

  const connectedAccount = await connectionRequest.waitForConnection();
  console.log(`\n✅ GitHub connected: ${connectedAccount.id}`);

  const result = await composio.tools.execute('GITHUB_GET_A_REPOSITORY', {
    userId: 'default',
    arguments: {
      owner: 'mixiboo',
      repo: 'composio',
    },
  });

  console.log('\n🎉 First real Composio tool call succeeded!');
  console.log(JSON.stringify(result, null, 2));
}

main().catch(error => {
  console.error('❌ GitHub integration failed:', error);
  process.exitCode = 1;
});
