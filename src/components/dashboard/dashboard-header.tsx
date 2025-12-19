import { motion } from "framer-motion";

export function DashboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Project Portfolio</h1>
        <p className="text-xl text-muted-foreground">
          Oversee your active contracts and monitor milestone progress in real-time.
        </p>
      </div>
    </motion.div>
  );
}
