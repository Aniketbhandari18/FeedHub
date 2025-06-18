import * as motion from "motion/react-client";
import Link from "next/link";
import {
  Brain,
  BarChart3,
  Code,
  Zap,
  CheckCircle,
  ArrowRight,
  UserPlus,
  Star,
} from "lucide-react";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const LandingPage = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Based Categorization",
      description:
        "Automatically classify feedback into bugs, feature requests, complaints, or praise.",
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description:
        "Instant AI classification and sentiment analysis of submitted feedback.",
    },
    {
      icon: BarChart3,
      title: "Weekly Reports",
      description:
        "Receive automated weekly summaries highlighting common feedback trends.",
    },
    {
      icon: Code,
      title: "Multi-Hub Support",
      description:
        "Manage feedback across multiple teams, products, or spaces from a single dashboard.",
    },
    {
      icon: UserPlus,
      title: "Invite Team Members Easily",
      description:
        "Add people to your feedback hubs quickly via sharable invite links.",
    },
    {
      icon: Star,
      title: "Effortless Feedback Collection",
      description:
        "Streamline the process of gathering valuable customer feedback without friction.",
    },
  ];

  const benefits = [
    "Collect meaningful customer feedback effortlessly",
    "Gain AI-powered insights to prioritize actions",
    "Track trending complaints and feature requests",
    "Automatically categorize feedback for efficient review",
    "Drive improvements with actionable insights",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <motion.section
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="pt-20 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            AI-Powered
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Feedback Hub{" "}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 23 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-6"
          >
            Collect, categorize, and analyze valuable feedback with the power of
            AI. Get instant insights to improve experiences, processes, and
            decision-making.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 13 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{
              delay: 0.5,
              duration: 0.3,
              scale: { duration: 0.2 },
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <SignedIn>
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl transition-all duration-200 transform shadow-lg"
              >
                <span>Go to Dashboard</span>
                <ArrowRight size={20} />
              </Link>
            </SignedIn>
            <SignedOut>
              <SignUpButton>
                <Button variant="gradient" size="xl">
                  Get Started
                  <ArrowRight className="size-4.5" />
                </Button>
              </SignUpButton>
            </SignedOut>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <div className="pt-12 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for Teams and Organizations
              </h2>
              <p className="text-xl text-gray-600 max-w-[480px] mx-auto">
                Collect, organize, and analyze feedback with real-time AI
                processing
              </p>
            </div>
          </motion.section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-border transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-15 bg-indigo-400"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Choose Feedback Hub?
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Instantly categorize and track customer feedback with AI-driven
                insights to make smarter product decisions
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="text-blue-200 shrink-0" size={20} />
                    <span className="text-blue-100">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;