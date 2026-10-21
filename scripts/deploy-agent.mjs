import { runDeployAgent } from './deploy-agent-lib.mjs';

const force = process.argv.includes('--force');

try {
  const result = runDeployAgent({ force });
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
