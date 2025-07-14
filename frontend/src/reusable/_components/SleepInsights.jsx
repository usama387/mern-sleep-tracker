import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  TrendingUp,
  Clock,
  Target,
  Lightbulb,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getSleepInsights } from "@/lib/sleepInsights";

const SleepInsights = ({ sleepRecords }) => {
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleInsights = async () => {
    if (!sleepRecords?.length) return;

    setLoading(true);
    setHasGenerated(false);
    setInsights("");

    try {
      // Simulate processing delay (remove in production)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const result = await getSleepInsights(sleepRecords);
      setInsights(result);
    } catch (error) {
      console.error("Error generating insights:", error);
      setInsights("Failed to generate insights. Please try again.");
    } finally {
      setLoading(false);
      setHasGenerated(true);
    }
  };

  // Clean and parse insights into structured data
  const parseInsights = (insightText) => {
    if (!insightText) return [];

    // Remove Markdown formatting and clean whitespace
    const cleanedText = insightText
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
      .replace(/#+\s*/g, "") // Remove headings
      .replace(/-\s/g, "") // Remove bullet points
      .trim();

    // Split into logical sections
    return cleanedText
      .split(/\n\n+/)
      .filter((section) => section.trim())
      .map((section, index) => {
        const lines = section.split("\n").filter((line) => line.trim());
        return {
          title: lines[0] || `Insight ${index + 1}`,
          content: lines.length > 1 ? lines.slice(1).join("\n") : "", // 👈 Only show if extra lines
          icon: getInsightIcon(index),
        };
      });
  };

  const getInsightIcon = (index) => {
    const icons = [TrendingUp, Clock, Target, Lightbulb, Zap, Brain];
    return icons[index % icons.length];
  };

  const parsedInsights = parseInsights(insights);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const insightVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Card className="border border-green-100 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 border-b border-green-100">
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Brain className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                AI Powered Insights
                <Badge className="ml-2 bg-green-500 text-white text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Smart
                </Badge>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                “Our sleep tracker provides AI-powered insights using
                intelligent pattern analysis — crafted from real sleep research
                and best practices.”
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {!hasGenerated && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Brain className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ready to analyze your sleep patterns?
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Our AI will analyze your sleep data and provide personalized
                  insights.
                </p>
                <Button
                  onClick={handleInsights}
                  disabled={!sleepRecords?.length}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-6 text-lg group"
                >
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Generate Insights
                </Button>
                {!sleepRecords?.length && (
                  <p className="text-sm text-gray-500 mt-3">
                    Add sleep records to generate insights
                  </p>
                )}
              </motion.div>
            )}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Brain className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Analyzing Your Sleep Data...
                </h3>
                <div className="space-y-2 max-w-sm mx-auto">
                  {[
                    "Processing patterns",
                    "Identifying trends",
                    "Generating recommendations",
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className="flex items-center justify-center gap-2 text-sm text-gray-600"
                    >
                      <motion.span
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                      {text}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {hasGenerated && !loading && (
              <motion.div
                variants={insightVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold">
                      Your Sleep Analysis
                    </h3>
                  </div>
                  <Badge variant="outline" className="text-green-700">
                    AI Generated
                  </Badge>
                </div>

                <Separator className="bg-green-100" />

                {parsedInsights.length > 0 ? (
                  <div className="grid gap-4">
                    {parsedInsights.map((insight, i) => {
                      const Icon = insight.icon;
                      return (
                        <motion.div key={i} variants={insightVariants}>
                          <Card className="border border-green-100 bg-green-50/50 hover:shadow-sm transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex gap-3">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Icon className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-1.5">
                                    {insight.title}
                                  </h4>
                                  {insight.content && (
                                    <p className="text-gray-700 leading-relaxed">
                                      {insight.content}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <Card className="border border-green-100 bg-green-50/50">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <Lightbulb className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {insights}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex gap-3 pt-4 border-t border-green-100">
                  <Button
                    onClick={handleInsights}
                    variant="outline"
                    className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SleepInsights;
