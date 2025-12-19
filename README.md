# DeCent-Pay 🔐

<div align="center">

**A decentralized freelancer marketplace built on Stellar (Soroban) that provides secure, trustless escrow services for freelance work agreements.**

[![Stellar](https://img.shields.io/badge/Stellar-Soroban-7D00FF?style=flat-square&logo=stellar)](https://stellar.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Rust](https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white)](https://www.rust-lang.org/)

</div>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [How It Works](#how-it-works)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Smart Contract Details](#smart-contract-details)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

DeCent-Pay is a blockchain-powered freelancer marketplace that revolutionizes how clients and freelancers collaborate. Built on the Stellar network using Soroban smart contracts, DeCent-Pay ensures secure payments, transparent milestone tracking, and fair dispute resolution—all without requiring trust between parties.

### Why DeCent-Pay?

- **🔒 Trustless Escrow**: Funds are locked in smart contracts until work is approved
- **⚡ Fast & Low-Cost**: Leverages Stellar's fast, low-fee network
- **🌍 Global Access**: Works with native XLM and whitelisted tokens
- **⚖️ Fair Disputes**: Multi-arbiter system ensures fair conflict resolution
- **📊 On-Chain Reputation**: Build trust through verifiable, on-chain reputation scores

---

## ✨ Features

### Core Features

- 🔐 **Smart Contract Escrow**: Funds are secured in blockchain escrow until milestones are approved
- 📋 **Milestone-Based Payments**: Break projects into milestones with automatic payment releases
- 💼 **Job Marketplace**: Post open jobs or create direct contracts with known freelancers
- 👥 **Application System**: Freelancers can apply to open jobs with cover letters and timelines
- ⚖️ **Dispute Resolution**: Multi-arbiter system with admin oversight for fair conflict resolution
  - **Resolution Display**: Both clients and freelancers can see who won a dispute on their job cards
  - **Transparent Outcomes**: Clear indication of resolution results (freelancer payment or client refund)
- 💰 **Refund Protection**: Automatic refunds after deadlines with emergency mechanisms
- ⭐ **Reputation & Rating System**: Build trust through on-chain reputation scores
  - **Client Ratings**: Clients can rate freelancers after project completion (1-5 stars with reviews)
  - **Badge Tiers**: Freelancers earn badges (Beginner, Intermediate, Advanced, Expert) based on completed projects
  - **Average Ratings**: Display average ratings and review counts for freelancers
- 💎 **Multi-Token Support**: Use native XLM or any whitelisted token
- ⏰ **Deadline Management**: Flexible deadlines with extension capabilities
- 🛡️ **Admin Controls**: Platform management with pause/unpause capabilities
- 🔄 **Milestone Resubmission**: Freelancers can resubmit rejected milestones with improvements

### Security Features

- ✅ **Authorization Checks**: All operations require proper authentication
- ✅ **Token Whitelisting**: Only approved tokens can be used
- ✅ **Arbiter Authorization**: Only authorized arbiters can resolve disputes
- ✅ **Platform Fee Management**: Configurable platform fees with dedicated collector
- ✅ **Emergency Refunds**: Automatic refunds after deadline expiration

---

## 🔄 How It Works

### Workflow Overview

DeCent-Pay operates through a streamlined workflow that ensures security and fairness at every step:

```
1. Job Creation → 2. Application/Selection → 3. Work Start → 4. Milestone Submission → 5. Approval/Dispute → 6. Payment Release
```

### Detailed Flow

#### 1. **Job Creation** 🎯

Clients can create jobs in two ways:

- **Open Job Marketplace**: Create a job without specifying a freelancer. Anyone can apply.
- **Direct Contract**: Create a job directly with a known freelancer address.

**What happens:**

- Client deposits funds (XLM or whitelisted token) into the escrow contract
- Sets up milestones with amounts and descriptions
- Defines project details (title, description, deadline)
- Optionally sets up arbiters for dispute resolution
- Funds are locked in the smart contract

#### 2. **Application & Selection** 📝

For open jobs:

- **Freelancers Browse**: View all available open jobs in the marketplace
- **Apply to Jobs**: Freelancers submit applications with:
  - Cover letter explaining their approach
  - Proposed timeline for completion
  - Their Stellar address
- **Client Reviews**: Client can see all applications for their job
- **Selection**: Client chooses a freelancer from the applicants
- **Contract Activation**: Once selected, the contract is ready to begin

For direct contracts:

- Job is created with a specific freelancer address
- No application process needed
- Contract is immediately ready to start

#### 3. **Work Start** 🚀

- **Freelancer Initiates**: The chosen freelancer calls `start_work()` to activate the contract
- **Status Change**: Escrow status changes from `Pending` to `InProgress`
- **Work Begins**: Freelancer can now start working on milestones

#### 4. **Milestone Submission** 📦

- **Freelancer Completes Work**: After completing a milestone, freelancer submits it
- **Submission Details**: Includes milestone index and updated description
- **Status Update**: Milestone status changes to `Submitted`
- **Awaiting Approval**: Client is notified and can review the work

#### 5. **Milestone Review** ✅❌⚖️

Client has three options for each milestone:

- **✅ Approve**:
  - Client approves the milestone
  - Payment is automatically released to the freelancer
  - Milestone status changes to `Approved`
  - Freelancer's reputation increases

- **❌ Reject**:
  - Client rejects the milestone with feedback
  - Milestone status changes to `Rejected`
  - Freelancer can resubmit the milestone with improvements
  - Rejection reason is stored and displayed to the freelancer

- **⚖️ Dispute**:
  - Either party (client or freelancer) can dispute a milestone
  - Client raises a dispute with a reason
  - Milestone status changes to `Disputed`
  - Admin and arbiters are notified
  - Dispute resolution process begins

#### 6. **Dispute Resolution** ⚖️

When a dispute is raised:

- **Admin Review**: Platform admin reviews the dispute
- **Arbiter Assignment**: Admin can authorize additional arbiters if needed
- **Resolution Process**: Admin resolves the dispute by determining payment split
  - Sets amount to be paid to freelancer (0 = full refund to client, >0 = partial/full payment to freelancer)
- **Resolution Display**:
  - Both client and freelancer see the resolution outcome on their job cards
  - Clear indication of who won: "Freelancer won" with amount or "Client won - Full refund issued"
  - Transparent display of resolution results for accountability

#### 7. **Payment & Completion** 💰⭐

- **Automatic Release**: Approved milestones trigger automatic payments
- **Partial Payments**: Each milestone is paid individually
- **Platform Fees**: Fees are automatically deducted and sent to fee collector
- **Completion**: When all milestones are approved, the contract is marked as `Completed`
- **Reputation Update**: Both parties' reputation scores are updated
- **Client Rating**:
  - After project completion, clients can rate freelancers (1-5 stars)
  - Written reviews are stored on-chain
  - Ratings affect freelancer's average rating and badge tier
  - Rating data is displayed on freelancer profiles and job applications

#### 8. **Refunds** 💸

Refunds can occur in several scenarios:

- **Before Work Starts**: Client can refund if no work has started
- **After Deadline**: Emergency refund after deadline expiration
- **Dispute Resolution**: Refunds can be issued as part of dispute resolution
- **Automatic**: Automatic refunds after deadline if work isn't completed

---

## 🏗️ Architecture

### Smart Contract Architecture

The DeCent-Pay smart contract is modular and consists of several key components:

```
DeCent-Pay Contract
├── Admin Module          # Platform administration and controls
├── Escrow Core          # Core escrow data management
├── Escrow Management    # Escrow creation and lifecycle
├── Marketplace          # Job marketplace and applications
├── Work Lifecycle       # Milestone tracking and work flow
├── Refund System        # Refund mechanisms and emergency refunds
└── Storage Types        # Data structures and types
```

### Frontend Architecture

The frontend is built with modern web technologies:

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: Zustand for global state
- **Styling**: Tailwind CSS with Radix UI components
- **Contract Integration**: Auto-generated TypeScript clients from Soroban contracts
- **Wallet Integration**: Stellar Wallets Kit for wallet connections

### Data Flow

```
User Interface (React)
    ↓
Web3 Context / Contract Service
    ↓
Stellar SDK / Contract Client
    ↓
Stellar Network (Soroban)
    ↓
Smart Contract (Rust)
```

---

## 🛠️ Tech Stack

### Smart Contracts

- **Language**: Rust
- **Framework**: Soroban SDK
- **Network**: Stellar (Soroban)
- **Deployment**: Stellar Registry

### Frontend

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Radix UI
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **Validation**: Zod

### Development Tools

- **Contract Scaffolding**: Stellar Scaffold
- **Package Manager**: npm
- **Version Control**: Git
- **Code Quality**: ESLint, Prettier

### Blockchain Integration

- **SDK**: @stellar/stellar-sdk
- **Wallet Kit**: @creit.tech/stellar-wallets-kit
- **Contract Clients**: Auto-generated from Soroban contracts

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Rust](https://www.rust-lang.org/tools/install) (latest stable version)
- [Cargo](https://doc.rust-lang.org/cargo/) (comes with Rust)
- Rust target: `wasm32v1-none` (install via `rustup target add wasm32v1-none`)
- [Node.js](https://nodejs.org/) (v22 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Stellar CLI](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup#install-the-stellar-cli)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/subrat243/DeCent-Pay.git
cd DeCent-Pay
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
VITE_STELLAR_NETWORK=testnet
VITE_DECENT_PAY_CONTRACT_ID=your_contract_id_here
VITE_OWNER_ADDRESS=your_owner_address_here
```

4. **Generate Deployment Identity** (First time only)

```bash
stellar keys generate alice --network testnet --fund
```

5. **Build the Contract**

```bash
stellar contract build
```

6. **Deploy to Testnet**

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/decent_pay.wasm \
  --source-account alice \
  --network testnet \
  --alias decent-pay
```

7. **Start development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

---

## 📚 Usage Guide

### For Clients

#### Creating a Job

1. **Navigate to Create Page**: Click "Create Job" in the navigation
2. **Fill Job Details**:
   - Project title and description
   - Total budget amount
   - Select payment token (XLM or whitelisted token)
   - Set deadline
3. **Set Up Milestones**:
   - Add milestone amounts
   - Add milestone descriptions
   - Milestone amounts should sum to total budget
4. **Choose Job Type**:
   - **Open Job**: Leave freelancer field empty (anyone can apply)
   - **Direct Contract**: Enter freelancer's Stellar address
5. **Set Arbiters** (optional):
   - Add arbiter addresses for dispute resolution
   - Set required confirmations
6. **Deposit Funds**: Approve transaction to deposit funds into escrow
7. **Job Created**: Your job is now live!

#### Managing Applications

1. **View Applications**: Go to your job's detail page
2. **Review Applications**: See all freelancer applications with cover letters and timelines
3. **Select Freelancer**: Choose the best candidate
4. **Accept Application**: Click "Accept" to assign the freelancer

#### Reviewing Milestones

1. **View Submitted Milestones**: Check your dashboard for submitted work
2. **Review Work**: Examine the milestone submission
3. **Take Action**:
   - **Approve**: Release payment immediately
   - **Reject**: Request revisions
   - **Dispute**: Raise a dispute with reason

### For Freelancers

#### Finding Jobs

1. **Browse Marketplace**: Visit the Jobs page to see all open jobs
2. **Filter Jobs**: Use filters to find relevant opportunities
3. **View Job Details**: Click on a job to see full details

#### Applying to Jobs

1. **Select Job**: Choose a job you want to apply for
2. **Click Apply**: Fill out the application form
3. **Submit Application**:
   - Write a compelling cover letter
   - Propose a realistic timeline
   - Submit your application
4. **Wait for Selection**: Client will review and select a candidate

#### Working on Projects

1. **Start Work**: Once selected, click "Start Work" to activate the contract
2. **Complete Milestones**: Work through each milestone
3. **Submit Milestones**: Submit completed work with descriptions
4. **Track Status**: Monitor milestone approval status
5. **Receive Payments**: Payments are automatically released upon approval

### For Admins

#### Platform Management

1. **Access Admin Panel**: Navigate to Admin page (requires owner address)
2. **Manage Platform**:
   - Pause/unpause job creation
   - Set platform fees
   - Manage fee collector address
   - Whitelist tokens
   - Authorize arbiters

#### Dispute Resolution

1. **View Disputes**: Check the dispute resolution panel
2. **Review Disputes**: Examine dispute details and evidence
3. **Delegate Arbiters**: Assign additional arbiters if needed
4. **Resolve Disputes**: Make final decisions based on arbiter votes

---

## 🔧 Smart Contract Details

### Key Functions

#### Job Creation

```rust
pub fn create_escrow(
    depositor: Address,
    beneficiary: Option<Address>,  // None for open jobs
    arbiters: Vec<Address>,
    required_confirmations: u32,
    milestones: Vec<(i128, String)>,
    token: Option<Address>,  // None for native XLM
    total_amount: i128,
    duration: u32,
    project_title: String,
    project_description: String,
) -> Result<u32, Error>
```

#### Marketplace

```rust
pub fn apply_to_job(
    escrow_id: u32,
    cover_letter: String,
    proposed_timeline: u32,
    freelancer: Address,
) -> Result<(), Error>

pub fn accept_freelancer(
    escrow_id: u32,
    freelancer: Address,
    depositor: Address,
) -> Result<(), Error>
```

#### Work Lifecycle

```rust
pub fn start_work(
    escrow_id: u32,
    beneficiary: Address,
) -> Result<(), Error>

pub fn submit_milestone(
    escrow_id: u32,
    milestone_index: u32,
    description: String,
    beneficiary: Address,
) -> Result<(), Error>

pub fn approve_milestone(
    escrow_id: u32,
    milestone_index: u32,
    depositor: Address,
) -> Result<(), Error>
```

#### Dispute Resolution

Disputes are handled through the milestone approval process. When a client disputes a milestone, arbiters can vote on the resolution.

#### Refunds

```rust
pub fn refund_escrow(
    escrow_id: u32,
    depositor: Address,
) -> Result<(), Error>

pub fn emergency_refund_after_deadline(
    escrow_id: u32,
    depositor: Address,
) -> Result<(), Error>
```

### Escrow States

- **Pending**: Job created, waiting for work to start
- **InProgress**: Work has started, milestones being completed
- **Released**: All milestones approved, contract completed
- **Refunded**: Funds refunded to client
- **Disputed**: Dispute raised, awaiting resolution
- **Expired**: Deadline passed

### Milestone States

- **NotStarted**: Milestone not yet started
- **Submitted**: Work submitted, awaiting approval
- **Approved**: Approved by client, payment released
- **Disputed**: Dispute raised
- **Resolved**: Dispute resolved
- **Rejected**: Rejected by client

### Security Considerations

- All write operations require authentication
- Only contract owner can perform admin functions
- Token whitelisting prevents unauthorized tokens
- Arbiter authorization ensures trusted dispute resolution
- Platform fees are configurable and transparent

---

## 📁 Project Structure

```
DeCent-Pay/
├── contracts/                    # Smart contracts
│   └── DeCent-Pay/
│       └── src/
│           ├── admin.rs          # Admin functions
│           ├── escrow_core.rs    # Core escrow logic
│           ├── escrow_management.rs  # Escrow creation
│           ├── marketplace.rs    # Job marketplace
│           ├── refund_system.rs  # Refund mechanisms
│           ├── storage_types.rs  # Data structures
│           ├── work_lifecycle.rs # Milestone workflow
│           └── lib.rs            # Main contract
├── src/                          # Frontend application
│   ├── components/               # React components
│   │   ├── admin/               # Admin components
│   │   ├── approvals/           # Approval components
│   │   ├── create/              # Job creation
│   │   ├── dashboard/          # Dashboard components
│   │   ├── freelancer/          # Freelancer components
│   │   ├── jobs/                # Job marketplace
│   │   └── ui/                  # UI components
│   ├── contexts/                # React contexts
│   │   ├── web3-context.tsx     # Web3/Stellar context
│   │   └── ...
│   ├── contracts/               # Contract integration
│   │   └── generated/          # Auto-generated clients
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utilities
│   ├── pages/                   # Page components
│   │   ├── AdminPage.tsx
│   │   ├── ApprovalsPage.tsx
│   │   ├── CreatePage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── FreelancerPage.tsx
│   │   ├── JobsPage.tsx
│   │   └── HomePage.tsx
│   └── util/                    # Utility functions
├── environments.toml            # Environment configs
├── package.json                 # Frontend dependencies
├── Cargo.toml                   # Contract dependencies
└── README.md                    # This file
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Scaffold Stellar](https://github.com/AhaLabs/scaffold-stellar)
- Powered by [Stellar](https://stellar.org) and [Soroban](https://soroban.stellar.org)
- UI components from [Radix UI](https://www.radix-ui.com/)

---

## Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

---

<div align="center">

**Built with ❤️ on Stellar**

</div>

