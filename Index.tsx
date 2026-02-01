import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StartupCard } from "@/components/StartupCard";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { InvestorCard } from "@/components/InvestorCard";
import { AddIdeaModal } from "@/components/AddIdeaModal";
import { CommunitySection } from "@/components/CommunitySection";

// Sample data
const initialStartups = [
  {
    id: 1,
    name: "EcoTrack",
    description: "AI-powered carbon footprint tracking for businesses. Automated sustainability reporting and actionable insights.",
    category: "SaaS",
    interests: 1247,
    trending: true,
  },
  {
    id: 2,
    name: "HealthSync",
    description: "Unified health data platform connecting wearables, medical records, and wellness apps in one dashboard.",
    category: "HealthTech",
    interests: 892,
    trending: true,
  },
  {
    id: 3,
    name: "LearnLoop",
    description: "Personalized microlearning platform using spaced repetition and AI tutoring for professional skills.",
    category: "EdTech",
    interests: 634,
    trending: false,
  },
  {
    id: 4,
    name: "PayFlow",
    description: "Instant cross-border payments for freelancers with zero hidden fees and real-time currency conversion.",
    category: "FinTech",
    interests: 1089,
    trending: true,
  },
  {
    id: 5,
    name: "LocalBite",
    description: "Hyperlocal food marketplace connecting home cooks with hungry neighbors. Fresh, authentic, community-driven.",
    category: "Marketplace",
    interests: 456,
    trending: false,
  },
  {
    id: 6,
    name: "CodeBuddy",
    description: "AI pair programmer that learns your codebase and provides context-aware suggestions and code reviews.",
    category: "AI/ML",
    interests: 2103,
    trending: true,
  },
];

const investors = [
  {
    name: "Sarah Chen",
    title: "General Partner",
    company: "Velocity Ventures",
    location: "San Francisco",
    investmentRange: "$500K - $2M",
    focus: ["SaaS", "AI/ML", "B2B"],
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    title: "Angel Investor",
    company: "Independent",
    location: "New York",
    investmentRange: "$50K - $250K",
    focus: ["FinTech", "Consumer", "HealthTech"],
    avatar: "MJ",
  },
  {
    name: "Elena Rodriguez",
    title: "Partner",
    company: "Future Fund",
    location: "Austin",
    investmentRange: "$1M - $5M",
    focus: ["EdTech", "Marketplace", "SaaS"],
    avatar: "ER",
  },
];

const Index = () => {
  const [startups, setStartups] = useState(initialStartups);
  const [interestedIds, setInterestedIds] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInterest = (id: number) => {
    setInterestedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });

    setStartups((prev) =>
      prev.map((startup) =>
        startup.id === id
          ? {
              ...startup,
              interests: interestedIds.has(id)
                ? startup.interests - 1
                : startup.interests + 1,
            }
          : startup
      )
    );
  };

  const handleAddIdea = (idea: { name: string; description: string; category: string }) => {
    const newId = Math.max(...startups.map((s) => s.id)) + 1;
    setStartups((prev) => [
      {
        id: newId,
        ...idea,
        interests: 0,
        trending: false,
      },
      ...prev,
    ]);
  };

  const totalInterests = startups.reduce((sum, s) => sum + s.interests, 0);
  const trendingCount = startups.filter((s) => s.trending).length;

  return (
    <div className="min-h-screen bg-background">
      <Header onAddIdea={() => setIsModalOpen(true)} />

      {/* Hero */}
      <HeroSection />

      {/* Analytics Section */}
      <section id="analytics" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              Platform Analytics
            </h2>
            <p className="text-muted-foreground">
              Real-time insights into market interest
            </p>
          </motion.div>

          <AnalyticsDashboard
            totalIdeas={startups.length}
            totalInterests={totalInterests}
            trendingCount={trendingCount}
            weeklyGrowth={24}
          />
        </div>
      </section>

      {/* Startup Ideas Section */}
      <section id="ideas" className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              Trending Startup Ideas
            </h2>
            <p className="text-muted-foreground">
              Explore and show interest in ideas you believe in
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startups.map((startup) => (
              <StartupCard
                key={startup.id}
                {...startup}
                onInterest={handleInterest}
                isInterested={interestedIds.has(startup.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section id="investors" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              Featured Investors
            </h2>
            <p className="text-muted-foreground">
              Connect with investors actively looking for the next big thing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investors.map((investor) => (
              <InvestorCard key={investor.name} {...investor} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Connect Section */}
      <CommunitySection />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-bold gradient-text">
              LaunchPulse
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 LaunchPulse. Validate before you build.
          </p>
        </div>
      </footer>

      {/* Add Idea Modal */}
      <AddIdeaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddIdea}
      />
    </div>
  );
};

export default Index;
