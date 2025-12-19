import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, CheckCircle2, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useWeb3 } from "@/contexts/web3-context";
import { CONTRACTS } from "@/lib/web3/config";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { wallet } = useWeb3();
  const [stats, setStats] = useState({
    activeEscrows: 0,
    totalVolume: "0",
    completedEscrows: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wallet.isConnected) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [wallet.isConnected]);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Use ContractService instead of contract.call - it reads from blockchain
      const { ContractService } = await import("@/lib/web3/contract-service");
      const contractService = new ContractService(CONTRACTS.DeCentPay_ESCROW);

      // Get next escrow ID from blockchain (not hardcoded)
      const nextEscrowId = await contractService.getNextEscrowId();
      console.log(`[HomePage] next_escrow_id from blockchain: ${nextEscrowId}`);

      let activeEscrows = 0;
      let completedEscrows = 0;
      let totalVolume = 0;

      // Fetch all escrows from the contract to calculate stats
      // Check up to 20 escrows (reasonable limit)
      const maxEscrowsToCheck = Math.min(nextEscrowId - 1, 20);
      for (let i = 1; i <= maxEscrowsToCheck; i++) {
        try {
          console.log(`[HomePage] Checking escrow ${i} for stats...`);
          const escrowData = await contractService.getEscrow(i);

          if (!escrowData) {
            continue;
          }

          // Get status and total amount
          const status = escrowData.status || 0;
          const totalAmount = Number(escrowData.amount || "0");

          // Add to total volume (convert from stroops to XLM - 7 decimals)
          totalVolume += totalAmount / 1e7;

          // EscrowStatus enum: Pending=0, InProgress=1, Released=2, Refunded=3, Disputed=4, Expired=5
          if (status === 1) {
            // InProgress - Active escrow
            activeEscrows++;
          } else if (status === 2) {
            // Released - Completed
            completedEscrows++;
          }
        } catch (error) {
          console.error(
            `[HomePage] Error checking escrow ${i} for stats:`,
            error
          );
          // Skip escrows that don't exist
          continue;
        }
      }

      console.log(`[HomePage] Stats calculated:`, {
        activeEscrows,
        completedEscrows,
        totalVolume: totalVolume.toFixed(2),
      });

      setStats({
        activeEscrows,
        totalVolume: totalVolume.toFixed(2),
        completedEscrows,
      });
    } catch (error) {
      console.error("[HomePage] Error fetching stats:", error);
      // Set empty stats if contract call fails
      setStats({
        activeEscrows: 0,
        totalVolume: "0",
        completedEscrows: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-mesh">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />

        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/20 hover:border-primary/40 transition-colors duration-300">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold tracking-wide uppercase">
                  Powered by Stellar Testnet
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-balance leading-[1.1] tracking-tight">
              Empower Your Freelance Vision with{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-sm">
                Trustless Escrow.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
              DeCent-Pay connects elite freelancers and visionary clients through
              secure, milestone-based smart contracts. Experience the future of work
              where trust is built into the code.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/create">
                <Button size="lg" className="gap-2 text-lg px-8 glow-primary">
                  Start Project
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-lg px-8 bg-transparent"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20"
          >
            <Card className="glass border-primary/20 p-6 text-center hover:border-primary/50 transition-all duration-500 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2 tracking-tight">
                {loading ? (
                  <Skeleton className="h-10 w-16 mx-auto" />
                ) : (
                  stats.activeEscrows
                )}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Active Contracts
              </div>
            </Card>

            <Card className="glass border-accent/20 p-6 text-center glow-accent hover:border-accent/50 transition-all duration-500 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4 group-hover:scale-110 transition-transform duration-500">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <div className="text-4xl font-bold mb-2 tracking-tight text-accent">
                {loading ? (
                  <Skeleton className="h-10 w-24 mx-auto" />
                ) : (
                  `$${stats.totalVolume}`
                )}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Total Value Secured
              </div>
            </Card>

            <Card className="glass border-primary/20 p-6 text-center hover:border-primary/50 transition-all duration-500 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:scale-110 transition-transform duration-500">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2 tracking-tight">
                {loading ? (
                  <Skeleton className="h-10 w-16 mx-auto" />
                ) : (
                  stats.completedEscrows
                )}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Milestones Delivered
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              The DeCent-Pay Standard
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Simple, secure, and transparent escrow for the Web3 era
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="glass p-8 h-full border-primary/20 hover:border-primary/40 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Secure Agreements</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Locked-in funds provide peace of mind. Both parties agree on
                  terms that are immutably stored and executed by Soroban smart
                  contracts.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass p-8 h-full border-secondary/20 hover:border-secondary/40 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/10 mb-6">
                  <TrendingUp className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Milestone Velocity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Break down complex projects into granular milestones. Get paid
                  instantly as you deliver, keeping the momentum and cash flow
                  steady.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glass p-8 h-full border-primary/20 hover:border-primary/40 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
                  <CheckCircle2 className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Global Consensus</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Leverage the power of the Stellar network for near-instant,
                  low-fee settlements. No borders, no delays, just pure performance.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />

        <div className="container relative mx-auto px-4">
          <Card className="glass border-primary/20 p-12 max-w-4xl mx-auto text-center glow-primary">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Secure Your Professional Future
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Join hundreds of freelancers and clients using DeCent-Pay for
              trustless payments
            </p>
            <Link to="/create">
              <Button size="lg" className="gap-2 text-lg px-8">
                Launch Your First Project
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}
