#!/bin/sh
set -e

DATA="${DATA_DIR:-/app/data}"
SEED="/app/data-seed"

mkdir -p "$DATA"

# Mounted volumes may be root-owned on first deploy; fix before seeding.
if [ "$(id -u)" = "0" ]; then
  chown -R nextjs:nodejs "$DATA" 2>/dev/null || true
fi

if [ ! -f "$DATA/profile.json" ] && [ -d "$SEED" ]; then
  if [ -w "$DATA" ] || [ "$(id -u)" = "0" ]; then
    echo "[entrypoint] Seeding CMS data into ${DATA}"
    if cp -a "$SEED/." "$DATA/"; then
      [ "$(id -u)" = "0" ] && chown -R nextjs:nodejs "$DATA" 2>/dev/null || true
    else
      echo "[entrypoint] WARN: Could not seed CMS data (permission denied?)." >&2
      echo "[entrypoint] WARN: On the NAS run: sudo chown -R 1001:1001 docker/synology/data" >&2
    fi
  else
    echo "[entrypoint] WARN: ${DATA} is not writable; skipping CMS seed." >&2
    echo "[entrypoint] WARN: On the NAS run: sudo chown -R 1001:1001 docker/synology/data" >&2
  fi
fi

if [ "$(id -u)" = "0" ]; then
  exec su-exec nextjs "$@"
fi

exec "$@"
