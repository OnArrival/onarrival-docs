---
title: "Product & Integration Overview"
description: "How OnArrival integrations work, responsibilities split, and booking lifecycle"
category: "introduction"
order: 3
---

# Product & Integration Overview

## Product Overview

OnArrival is a modular travel platform that enables consumer businesses to launch travel experiences inside their existing app — without building a full OTA stack or integrating multiple suppliers.

Instead of providing only APIs, OnArrival offers a **Micro-App powered travel experience** that ships with:

- Fully-managed search & booking workflows
- Multi-supplier inventory aggregation
- Fare rules, ancillaries & pricing integrity
- S2S payments, refunds & lifecycle events
- Loyalty, rewards & partner-owned value programs

This allows partners to go live in **weeks instead of months**, while retaining full control over brand, user experience, payments and customer ownership.

---

## Integration Model — At a Glance

The integration runs across two coordinated tracks:

### Frontend Track (User Experience)

Handled via Micro-App + JS Bridge:

- Search, availability, fares & ancillaries
- Review & booking confirmation flow
- Native navigation & event callbacks
- Cross-screen communication with Native app

Experience feels **fully native & on-brand**.

### Backend Track (S2S + Operations)

Handled via secure server-to-server contracts:

- User profile fetch & eligibility context
- Payment init, status & refunds
- Webhooks + booking lifecycle events
- Rewards earn / burn processing
- Reconciliation & audit trails

This ensures no dependency on frontend sessions, reliable retries & recoverability, and traceable booking & payment workflows.

---

## Responsibilities Split

### Partner Owns

- User identity & authentication (JWT)
- User profile + segmentation + loyalty logic
- Payment gateway execution
- Refund approval workflows
- User messaging & communication
- Order retrieval for MyTrips / History

### OnArrival Owns

- Inventory aggregation & supplier routing
- Search, pricing, fare rules & availability
- Booking creation & lifecycle
- Ancillaries, SSR, baggage, seat logic
- Ops workflows & escalation handling
- Pricing integrity & reconciliation

---

## Why This Integration Model Works

| Benefit | Impact |
| --- | --- |
| 30-day go-live instead of multi-month build | Faster monetisation |
| No multi-supplier integration burden | Lower engineering load |
| Enterprise-grade UX with full brand control | Feels native to partner app |
| Access to deep supply & ancillaries | Competitive pricing & coverage |
| Optional BYOS (Bring Your Own Supply) | Flexible sourcing strategy |
| Lower capex vs OTA-scale rebuild | Better ROI & faster iteration |
