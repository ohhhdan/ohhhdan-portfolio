import http from 'node:http';
import { loadConfig, runDeployAgent } from './deploy-agent-lib.mjs';

const config = loadConfig();
const port = Number(config.agentPort || 3939);
const secret = config.agentSecret;

if (!secret || secret.length < 16) {
  console.error('deploy-agent.config.json needs agentSecret (16+ chars). Run: npm run setup-deploy-agent');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.method !== 'POST' || req.url !== '/deploy') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  const auth = req.headers.authorization || '';
  if (auth !== `Bearer ${secret}`) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Unauthorized' }));
    return;
  }

  void (async () => {
    try {
      const result = runDeployAgent({ force: true });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }));
    }
  })();
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Deploy agent listening on http://0.0.0.0:${port}`);
  console.log('Admin "Pull changes" can trigger POST /deploy when this is running.');
});
