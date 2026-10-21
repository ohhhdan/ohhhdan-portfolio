# Deploy on Synology NAS + Namecheap domain

This site runs in Docker on your NAS. Synology’s **Reverse Proxy** handles HTTPS; Namecheap points your domain at your home IP (or DDNS hostname).

## What you need

- Synology NAS with **Container Manager** (Docker)
- **Namecheap** domain (e.g. `ohhhdan.com`)
- Router port forward: **443** → NAS, **80** → NAS (for Let’s Encrypt)
- Optional: Synology **DDNS** if your public IP changes

---

## 1. Generate production secrets (on your PC)

In the project folder:

```bash
npm install
npm run generate-prod-env www.yourdomain.com
```

This creates `docker/synology/.env` with `CMS_SECRET`, `ADMIN_PASSWORD`, etc. **Save the admin password** it prints.

---

## 2. Copy the project to your NAS

Example target: `/volume1/docker/ohhhdan-portfolio`

Ways to copy:

- **File Station**: upload a zip of the repo, extract
- **Git** (SSH on NAS): `git clone` into that folder
- **Shared folder sync** from your PC

Required on the NAS:

```
/volume1/docker/ohhhdan-portfolio/
  docker/synology/.env          ← from generate-prod-env
  docker/synology/data/       ← empty folder (CMS seeds on first start)
  docker/synology/scorm-packages/  ← optional
  (full repo for docker build)
```

Create empty folders and set ownership for the container user (`nextjs`, uid **1001**):

```bash
mkdir -p /volume1/docker/ohhhdan-portfolio/docker/synology/data
mkdir -p /volume1/docker/ohhhdan-portfolio/docker/synology/scorm-packages
sudo chown -R 1001:1001 /volume1/docker/ohhhdan-portfolio/docker/synology/data
```

Copy `docker/synology/.env` from your PC to that path.

---

## 3. Build and start the container

SSH into the NAS (or Task Scheduler → user script). On Synology, Docker requires **sudo**:

```bash
cd /volume1/docker/ohhhdan-portfolio
sudo docker compose -f docker/synology/docker-compose.yml up -d --build
```

**Note:** `ADMIN_PASSWORD_BCRYPT` in `.env` / `production.env` must escape `$` as `$$` (bcrypt hashes look like `$2b$12$...`). `npm run generate-prod-env` does this automatically.

First start seeds CMS JSON into `docker/synology/data/` if empty.

Check logs:

```bash
sudo docker compose -f docker/synology/docker-compose.yml logs -f portfolio
```

Site listens on **localhost:3000** inside the NAS (not exposed to the internet directly).

---

## 4. Synology Reverse Proxy + SSL

1. **Control Panel** → **Login Portal** → **Advanced** → **Reverse Proxy** → **Create**
2. **Source**
   - Protocol: `HTTPS`
   - Hostname: `www.yourdomain.com` (and add a second rule for `yourdomain.com` if you want apex)
   - Port: `443`
3. **Destination**
   - Protocol: `HTTP`
   - Hostname: `localhost` (or `127.0.0.1`)
   - Port: `3000`
4. **Custom header** (recommended): add `X-Forwarded-Proto` = `https`, `X-Forwarded-Host` = `$host`

**Certificate**

1. **Control Panel** → **Security** → **Certificate** → **Add** → **Get a certificate from Let’s Encrypt**
2. Domain: `www.yourdomain.com`, email: yours, set as default
3. In Reverse Proxy → edit rule → assign that certificate

---

## 5. Namecheap DNS

1. Namecheap → **Domain List** → **Manage** → **Advanced DNS**
2. Add records (replace IP/hostname with yours):

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | `@` | Your public IP | Automatic |
| A | `www` | Your public IP | Automatic |

**If your IP changes (typical home internet):**

1. Enable **Synology DDNS** (Control Panel → External Access → DDNS)
2. Use hostname like `yourname.synology.me`
3. Namecheap: **CNAME** `www` → `yourname.synology.me`
4. For apex `@`, Namecheap **URL Redirect** to `https://www.yourdomain.com` or use their DNS redirect record

Wait 5–30 minutes for DNS to propagate.

---

## 6. Router port forwarding

On your router, forward to the NAS LAN IP:

- **TCP 443** → NAS:443 (HTTPS to Synology)
- **TCP 80** → NAS:80 (Let’s Encrypt HTTP challenge)

Do **not** forward port 3000 to the internet; Reverse Proxy handles that internally.

---

## 7. Admin CMS in production

- URL: `https://www.yourdomain.com/admin/login`
- Password: from `npm run generate-prod-env` (or `ADMIN_PASSWORD` in `.env`)
- Edits save to `docker/synology/data/` on the NAS volume

To change copy without admin: edit JSON files in `docker/synology/data/` and restart the container.

---

## Updates

```bash
cd /volume1/docker/ohhhdan-portfolio
git pull   # or re-copy files
sudo docker compose -f docker/synology/docker-compose.yml up -d --build
```

Your `data/` volume keeps CMS content across rebuilds.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| 502 from Reverse Proxy | Container not running: check `docker ps` and logs |
| Admin saves fail | Ensure `./data` volume is writable; folder exists on NAS |
| `permission denied` seeding `/app/data` | `sudo chown -R 1001:1001 docker/synology/data` then rebuild/restart |
| Certificate fails | Port 80 must reach NAS; DNS must point to your public IP |
| Wrong password | Regenerate `.env` with `generate-prod-env`; restart container |
| `WARN ... variable is not set` on compose up | Bcrypt `$` in `.env` must be `$$`; re-run `generate-prod-env` or fix `ADMIN_PASSWORD_BCRYPT` |
| `permission denied` Docker socket | Use `sudo docker compose ...` on Synology SSH |

---

## Optional: edit locally, deploy data only

1. Edit `data/*.json` on your PC
2. Copy into NAS `docker/synology/data/`
3. `docker compose ... restart portfolio`
