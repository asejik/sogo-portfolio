---
title: "How to Set Up a Free, Self-Hosted n8n Automation Server on Google Cloud (Complete Guide)"
slug: "setup-free-n8n-google-cloud"
date: "2026-03-20"
readTime: "8 min read"
excerpt: "Learn how to build a fully functional, self-hosted n8n automation server on Google Cloud for absolutely zero cost. This guide covers everything from bypassing memory crashes to configuring Cloudflare Tunnels and fixing webhook errors."
image: "/blog/n8n-gcp-setup.jpeg"
tags: ["n8n", "Automation", "Google Cloud", "Self-Hosting", "Docker", "Cloudflare"]
---
![Self-Hosted n8n on Google Cloud](/blog/n8n-gcp-setup.jpeg)


If you have been looking for a way to run powerful workflow automations without paying for a monthly subscription, this guide is exactly what you need.

By the time you finish reading, you will have a fully functional, self-hosted **n8n** instance running 24/7 on your own custom domain (like `n8n.yourdomain.com`), secured with HTTPS, and ready to connect to external services like Telegram, Slack, webhooks, and more — all at **zero cost**.

This is not a surface-level walkthrough. We are going to tackle the real-world roadblocks that trip most people up: memory crashes, Cloudflare DNS routing, folder permission errors, and the dreaded localhost webhook bug. Every fix is included.

Let's get into it.

---

## What You Will Need Before You Start

Make sure you have the following ready before proceeding:

- **A Google Cloud account** — A free tier account works perfectly. You will need to add a payment card, but you will not be charged if you follow this guide exactly.
- **A free Cloudflare account** — Sign up at [cloudflare.com](https://cloudflare.com) if you do not already have one.
- **A domain name** — This tutorial uses `sogoayenigba.site` (hosted on Bluehost) as the working example. Your domain can be registered with any provider — GoDaddy, Namecheap, or others will work just as well.

---

## Step 1: Claim Your Free Google Cloud Server

Google offers a genuinely free "Always Free" tier under its Compute Engine product. The catch is that you must configure the server with the exact specifications listed below. Deviate from these settings and you risk incurring charges.

### 1.1 — Enable Billing (Don't Panic)

1. Go to the [Google Cloud Console](https://console.cloud.google.com) and navigate to **Compute Engine** → **VM Instances**.
2. You will likely see a popup saying: *"Compute Engine API requires a project with a billing account."*

> **Why does this happen?** Google requires a linked billing account to activate Compute Engine, even on the free tier. This is their way of verifying you are a real person and preventing abuse. As long as you stick to the exact machine specs below, **your card will not be charged.**

Click **Enable Billing** and add your card to proceed.

---

### 1.2 — Create the VM Instance

Click **Create Instance** and fill in the settings exactly as follows:

| Setting | Value |
|---|---|
| **Name** | `n8n-server` |
| **Region** | `us-central1` (Iowa) |
| **Machine type** | `e2-micro` (2 vCPU, 1 GB memory) |
| **Operating System** | Ubuntu 22.04 LTS |
| **Boot Disk Size** | 30 GB |
| **Boot Disk Type** | Standard persistent disk |

> ⚠️ **Important:** When selecting the boot disk, do **not** choose Balanced or SSD. Only the Standard persistent disk qualifies for the Always Free tier.

---

### 1.3 — Configure Networking

Before you click **Create**, scroll down to the **Networking** section and make one important change:

- Set the **Network Service Tier** to **Standard**
- Leave the IP address as **Ephemeral**

> **Why?** A static (reserved) IP address on Google Cloud costs money even when it is not in use. Leaving it as Ephemeral means Google assigns one dynamically and you are never billed for it. Since we are routing traffic through Cloudflare Tunnel in the next step, you will not need a static IP anyway.

Click **Create** and wait about 60 seconds for the VM to spin up.

---

## Step 2: Prevent Memory Crashes with a Swap File

Before you install anything, there is a critical configuration step you must not skip.

The free `e2-micro` machine only has **1 GB of RAM**. Under normal usage this is fine, but when n8n runs complex workflows or handles concurrent requests, it can exhaust that memory and crash the entire process. The fix is to create a **2 GB swap file** — a section of the hard drive that Linux can use as overflow memory when RAM runs out.

Click the **SSH** button next to your new VM in the Google Cloud Console. This opens a browser-based terminal connected directly to your server.

Run the following commands **one by one**, pressing Enter after each:

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

**What each command does:**
- `fallocate` — Allocates 2 GB of disk space for the swap file
- `chmod 600` — Restricts access to root only (required for security)
- `mkswap` — Formats the file as swap space
- `swapon` — Activates it immediately
- The `echo` command — Writes an entry to `/etc/fstab` so the swap file is automatically re-enabled every time the server reboots

Your server is now much more resilient. Let's move on.

---

## Step 3: Connect Your Domain Using Cloudflare Tunnel

Instead of exposing your server's IP address directly to the internet, we are going to use **Cloudflare Tunnel**. This approach gives you three major benefits:

- **Free SSL/HTTPS** — No need to manually configure certificates
- **IP privacy** — Your server's real IP address is never exposed publicly
- **No static IP required** — Cloudflare handles the routing

---

### 3.1 — Transfer DNS Management to Cloudflare

If your domain is currently managed by Bluehost, Namecheap, GoDaddy, or any other registrar, you need to point it to Cloudflare first.

1. Log in to your Cloudflare dashboard and click **Add a Site**.
2. Enter your root domain (e.g., `sogoayenigba.site`) and follow the prompts.
3. Cloudflare will scan your existing DNS records and then provide you with **two nameserver addresses** (they will look something like `ava.ns.cloudflare.com` and `bob.ns.cloudflare.com`).
4. Log in to your domain registrar (Bluehost, in this example), navigate to the nameserver settings, **delete the existing nameservers**, and replace them with the two Cloudflare nameservers.

> **Note:** DNS propagation can take anywhere from a few minutes to 48 hours, though it is usually fast. Cloudflare will send you an email once your domain is active on their network.

---

### 3.2 — Create the Cloudflare Tunnel

Once your domain is active on Cloudflare:

1. In the Cloudflare dashboard, navigate to **Zero Trust** → **Networks** → **Tunnels**.
2. Click **Create a Tunnel**, select **Cloudflared**, and name it `n8n`.
3. On the next screen, select **Debian** as the operating system and **64-bit** as the architecture.
4. Copy the installation command that Cloudflare provides — it will be a long `curl` or `wget` command unique to your tunnel.
5. Paste that command into your Google Cloud SSH terminal and press Enter. This installs and registers the Cloudflare tunnel agent on your server.

---

### 3.3 — Configure the Public Hostname

Back in the Cloudflare tunnel setup, configure the **Public Hostname** section with the following values:

| Field | Value |
|---|---|
| **Subdomain** | `n8n` |
| **Domain** | `sogoayenigba.site` *(use your own domain)* |
| **Service Type** | `HTTP` |
| **Service URL** | `localhost:5678` |

This tells Cloudflare: *"Any request arriving at `n8n.sogoayenigba.site` should be forwarded to port 5678 on the local machine."*

Save the tunnel. The DNS record will be created automatically in Cloudflare.

---

## Step 4: Install n8n and Fix the "502 Bad Gateway" Error

With the tunnel in place, it is time to install **Docker** and run n8n inside a container.

---

### 4.1 — Install Docker

In your SSH terminal, run:

```bash
sudo apt update && sudo apt install -y docker.io
```

This updates your package list and installs Docker in a single command.

---

### 4.2 — Start n8n (and Fix the Permissions Crash)

Here is where most tutorials leave you stranded. If you run the standard n8n Docker command and immediately visit your domain, you will likely see a **502 Bad Gateway** error from Cloudflare.

**Why does this happen?**
When Docker creates the data folder (`~/.n8n`) for the first time, it creates it as the `root` user. However, n8n runs internally as a restricted user called `node` (with a user ID of `1000`). Because `root` owns the folder, `node` cannot write to it, n8n fails to start, and Cloudflare gets no response — hence the 502 error.

The fix is straightforward: start the container, stop it before it fully crashes, correct the folder ownership, then start it again cleanly.

Run these commands in order:

```bash
# Start the n8n container
sudo docker run -d --name n8n --restart always -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n

# Stop it immediately so we can fix the permissions
sudo docker stop n8n

# Transfer ownership of the data folder to the correct user (ID 1000)
sudo chown -R 1000:1000 ~/.n8n

# Start the container again — it will now have correct access
sudo docker start n8n
```

Wait about 20–30 seconds, then open your browser and visit your domain — for example, `https://n8n.sogoayenigba.site`.

You should be greeted with the n8n setup screen. Go ahead and create your admin account.

---

## Step 5: Fix the Telegram Webhook Bug (and All External Webhooks)

Your n8n instance is live — congratulations! However, there is one more issue to address before you can reliably connect external services.

If you try to create a **Telegram bot** or any workflow that relies on incoming webhooks, you will notice that n8n generates webhook URLs pointing to `localhost:5678` instead of your public domain. External services like Telegram will reject these addresses outright, because `localhost` is only meaningful inside your own server — it means nothing to the outside world.

**Why does this happen?**
n8n does not automatically know what its public-facing URL is. It needs to be told explicitly using an environment variable called `WEBHOOK_URL`.

To apply this fix, we need to remove the existing container and recreate it with the new setting. Your data is stored in `~/.n8n` on the server itself, so nothing will be lost.

Run the following in your SSH terminal:

```bash
# Remove the existing container
sudo docker stop n8n && sudo docker rm n8n

# Recreate it with the WEBHOOK_URL environment variable
sudo docker run -d \
  --name n8n \
  --restart always \
  -p 5678:5678 \
  -e WEBHOOK_URL=https://n8n.sogoayenigba.site \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

> 🔁 Remember to replace `https://n8n.sogoayenigba.site` with your own domain.

Refresh your n8n browser tab. Your webhook URLs will now correctly display your custom domain, and external services like Telegram will be able to reach your workflows without any issues.

---

## You Are Done

Here is a quick summary of everything you have built:

- ✅ A free, always-on Google Cloud server
- ✅ 2 GB of swap memory to prevent crashes
- ✅ Cloudflare Tunnel providing HTTPS and IP privacy
- ✅ n8n running in Docker with correct file permissions
- ✅ Webhooks correctly broadcasting your public domain

Your n8n instance is now production-ready. You can start building workflows, connecting APIs, and automating tasks — all on infrastructure you own and control, at no ongoing cost.