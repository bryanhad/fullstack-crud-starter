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

### 1. Authentication Module
Login Page

**Flow:**

    1. User inputs:
        - Username
        - Password
    2. Mid App calls NAV Login Web Service
    3. NAV returns:
        - Login status (Valid / Invalid)
        - Location Code (if valid)

**Behavior:**

    - If invalid → Show error message
    - If valid:
        - Store Location Code in session
        - Redirect to Menu page

### 2. Settings Module

**Setting Page**

    Allows configuration of:
    - NAV Web Service URL
    - Mid App credentials (if applicable)

**Actions:**

    - Save
    - Back

**Purpose:**

    - Environment configuration
    - ERP connection configuration

### 3. Menu Module

After successful login, user sees:

    - Stock Count
    - Gudang Receive
    - Cek Stock
    - Logout

Logout clears session and returns to Login page.

## Transaction Modules

### 4. Stock Count Module

Used for physical inventory counting.

**Step 1 — Load Stock Count Documents**

    - Call NAV Web Service:
        - Filter: Location Code = User’s Location
        - Only Released documents
    - Display returned document numbers in dropdown
    - User selects one
    - Click START
    - Navigate to Stock Count Detail page

**Step 2 — Stock Count Detail**

    User must choose:
    - Barcode Mode = ON
    - Barcode Mode = OFF

**Barcode Mode: ON (Scan-Optimized Mode)**

Designed for fast repetitive scanning.

    **Rules**
    - Only Barcode input field enabled
    - User scans barcode
    - Mid App calls NAV to resolve Item from Barcode

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

    _User must click POST to send transaction to NAV._
    
    _NAV updates Stock Count quantity accordingly._

**Barcode Mode: OFF (Manual Mode)**

All input fields enabled.

    User can:

    - Select Item manually
    - Scan Barcode
    - Input Quantity manually
    - Select UOM

    Flow:

    - Item / Barcode selected
    - Mid App calls NAV to resolve item
    - User inputs Quantity and UOM
    - Click POST
    - NAV updates Stock Count

### 5. Gudang Receive Module

Used for receiving goods against Purchase Orders.

Flow is structurally identical to Stock Count.

**Step 1 — Load PO List**

    - Call NAV Web Service:
        - Filter: Location Code
        - Only Released PO
    - Display PO numbers in dropdown
    - User selects PO
    - Click START

**Step 2 — Gudang Receive Detail**

    Supports:
    - Barcode Mode ON
    - Barcode Mode OFF

    Logic identical to Stock Count.

    Difference:
    - POST updates "Quantity to Receive" in NAV.
    
### 6. Cek Stock Module

Read-only stock inquiry feature.

**Flow:**

    1. User inputs Item or scans Barcode
    2. Mid App calls NAV
    3. NAV returns:
        - Inventory
        - Qty Sold Not Posted
    4. Display computed stock information

_No transaction posting involved._

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

- Mobile-first
- Minimal UI
- Large touch targets
- Fast response time
- Scan-focused
- Low animation / no heavy UI transitions

Primary goal:

    Speed, accuracy, and operational efficiency.

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

Visit http://localhost:*APP_PORT_FROM_DOT_ENV*
after starting the server.