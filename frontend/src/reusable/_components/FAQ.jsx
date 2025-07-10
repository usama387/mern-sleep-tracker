import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does Somnio track my sleep?",
      answer:
        "Somnio uses advanced sensors and AI algorithms to monitor your sleep patterns, including movement, heart rate, and breathing. Simply place your device on your nightstand or wear our comfortable sleep tracker, and we'll do the rest while you sleep peacefully.",
    },
    {
      question: "Is my sleep data secure and private?",
      answer:
        "Absolutely. Your sleep data is encrypted end-to-end and stored securely on our servers. We never share your personal information with third parties, and you have complete control over your data. You can export or delete your data at any time.",
    },
    {
      question: "Can Somnio help improve my sleep quality?",
      answer:
        "Yes! Somnio provides personalized insights and recommendations based on your sleep patterns. Our AI analyzes your data to suggest optimal bedtimes, wake times, and lifestyle changes that can significantly improve your sleep quality and overall health.",
    },
    {
      question: "What devices are compatible with Somnio?",
      answer:
        "Somnio works with iOS and Android smartphones, Apple Watch, Fitbit, and other popular wearables. You can also use our dedicated sleep tracking device for the most accurate results. All data syncs seamlessly across your devices.",
    },
    {
      question: "How long does it take to see sleep improvements?",
      answer:
        "Most users notice improvements in their sleep awareness within the first week. Significant sleep quality improvements typically occur within 2-4 weeks of following our personalized recommendations. Remember, better sleep is a journey, not a destination.",
    },
    {
      question: "Do I need to wear anything while sleeping?",
      answer:
        "Not necessarily! Somnio offers multiple tracking options. You can use our non-contact bedside device, wear a comfortable wristband, or simply place your phone nearby. Choose the method that feels most comfortable for your sleep routine.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 mb-4">
              <HelpCircle className="w-3 h-3 mr-1" />
              Got Questions?
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Frequently Asked{" "}
              </span>
              <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about Somnio and how it can transform
              your sleep experience.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div variants={itemVariants} className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0">
                    <motion.button
                      onClick={() => toggleFAQ(index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-green-50/50 transition-colors duration-200"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-shrink-0"
                      >
                        {openIndex === index ? (
                          <Minus className="w-5 h-5 text-green-600" />
                        ) : (
                          <Plus className="w-5 h-5 text-green-600" />
                        )}
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0">
                            <motion.p
                              initial={{ y: -10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -10, opacity: 0 }}
                              transition={{ duration: 0.2, delay: 0.1 }}
                              className="text-gray-600 leading-relaxed"
                            >
                              {faq.answer}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <p className="text-gray-600 mb-6">Still have questions?</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 px-8 py-3 bg-transparent"
              >
                Contact Support
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;