# SKD Mobile Gudang — Functional Breakdown

## Overview

SKD Mobile Gudang is a mobile web application designed to support warehouse operations by integrating with Microsoft Dynamics NAV via web services.

The application acts as a middleware-based mobile frontend that enables warehouse operators to perform stock-related transactions using barcode scanning or manual input.

The system is optimized for mobile browser usage.

## Features

- **Frontend** - EJS + Tailwind + HTMX
- **Backend** - Express
- **ERP Integration** - Microsoft Dynamics NAV Web Services

- **Communication Pattern**
   - Client -> Mid App -> NAV
   - NAV -> Mid App -> Client

**The Mid App handles:**

- Authentication proxying
- Web service calls to NAV
- Configuration management
- Business logic coordination

## Core Functional Modules

### 🔐 Authentication Flow

1. User inputs Username + Password
2. Mid App calls NAV Login Web Service
3. NAV returns:
   - Login status (Valid / Invalid)
   - Location Code (if valid)

- If invalid → Show error message
- If valid:
   - Store Location Code in session
   - Redirect to Menu page

### ⚙️ Settings Page

- Allows configuration of:
    - NAV URL
    - Mid App credentials (if applicable)
- Save & Back

Mostly admin config stuff (ERP connection config)

### 📃 Menu Page

After successful login, user sees:

- Stock Count
- Gudang Receive
- Cek Stock
- Logout

Logout clears session and returns to Login page.

## Core Features

### 📦 A. Stock Count Module

Used for physical inventory counting. (stock counting)

**Step 1 — Load Stock Count Documents**

- Fetch list of Released Stock Count documents filtered by LOCATION
- Show dropdown list
- User selects one → START
- Go to Stock Count Detail page

**Step 2 — Stock Count Detail**

Consists of 2 modes, user must choose:
- Barcode Mode = **ON**
- Barcode Mode = **OFF**

**✅ Barcode Mode: ON (Scan-Optimized Mode)**

Optimized for scanning.

**Rules**
- Only Barcode input field enabled
- User scans barcode
- Mid App calls NAV to resolve Item from Barcode (check exists or not)

If valid:
- Quantity = 1
- NAV returns Base UOM

If same barcode scanned again:
- Do NOT call NAV again
- Increment Quantity by 1

If different barcode scanned:
- Show confirmation popup
- If confirmed:
    - Call NAV for new barcode
    - Reset Quantity = 1

⚠️ User must click POST to send new item detail (quantity) to NAV. Then, NAV updates Stock Count quantity accordingly.

**❌ Barcode Mode: OFF (Manual Mode)**

All input fields enabled.

- User can:
    - Select Item manually
    - Scan Barcode
- User manually inputs:
    - Quantity
    - UOM

Flow:

- Item / Barcode selected
- Mid App calls NAV to resolve item
- User inputs manually (Quantity and UOM)
- Click POST
- NAV updates item detail

### 📩 B. Gudang Receive Module

Used for receiving goods against Purchase Orders.

Flow is structurally identical to Stock Count.

- Call NAV Web Service:
    - Filter: Location Code
    - Get Released PO List
- Display PO numbers in dropdown
- User selects PO
- Click START
- Consists of 2 modes, Barcode Mode ON/OFF (logic identical to 📦 stock count)
- Difference:
    - POST updates "Quantity to Receive" in NAV.

### 🔎 Cek Stock Module

Read-only stock inquiry feature. (simple)

1. User inputs Item or scans Barcode
2. Mid App calls NAV
3. NAV returns:
    - Inventory
    - Qty Sold Not Posted
4. Display stock information

_No transaction posting involved. Basically a read-only_

## Barcode Mode Behavior Summary

Barcode Mode ON is optimized for:

- Fast warehouse scanning
- Reduced NAV calls
- Incremental quantity accumulation

Key design principles:

- Cache last scanned barcode
- Avoid redundant NAV calls
- Require explicit POST action
- Always auto-focus barcode input field

## Expected UI Characteristics

This application should be:

- Mobile-first ⚠️
- Minimal UI ⚠️
- Large touch targets ⚠️
- Fast response time ⚠️
- Scan-focused
- Low animation / no heavy UI transitions

Primary goal:

    Speed, accuracy, and operational efficiency.

## Menu

Big buttons:
    
    [ 📦 Stock Count ]

    [ 📥 Gudang Receive ]

    [ 🔍 Cek Stock ]

    [ 🚪 Logout ]

Large, finger-friendly, simple.


## Non-Functional Requirements (Implied)

- Low latency when scanning
- Graceful handling of NAV service errors
- Prevention of duplicate POST submissions
- Session-based location handling
- Clear error feedback

## Summary

SKD Mobile Gudang is a mobile warehouse transaction application that:

- Authenticates users via NAV
- Filters data by Location Code
- Supports Stock Count and Goods Receiving workflows
- Optimizes for barcode-based operations
- Posts transactions to Microsoft Dynamics NAV
- Provides stock inquiry functionality

The application prioritizes operational efficiency over visual complexity.

## Getting Started

```sh
# Install dependencies
pnpm install

# Generate SQL migrations
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Build (compile TypeScript & Tailwind)
pnpm build

# Run development
pnpm dev
```

Visit http://localhost:_APP_PORT_FROM_DOT_ENV_
after starting the server.
