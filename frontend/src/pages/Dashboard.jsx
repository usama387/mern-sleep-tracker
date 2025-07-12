import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Clock,
  Award,
  Target,
  BarChart3,
  Plus,
  CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { format, differenceInCalendarDays, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import {
  useAddSleepRecordMutation,
  useGetSleepRecordsQuery,
} from "@/featues/api/sleepApi";
import { toast } from "sonner";
import SleepInsights from "@/reusable/_components/SleepInsights";

const DashboardPage = () => {
  // user state from auth slice
  const { user } = useSelector((store) => store?.auth);

  const userId = user?.id;
  
  const userData = user || {};

  // state to hold sleep data
  const [sleepData, setSleepData] = useState({
    quality: "",
    date: undefined,
    hours: [7],
    issue: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // sleep records for chart from api
  const {
    data: records,
    isLoading: recordsLoading,
    refetch,
  } = useGetSleepRecordsQuery(userId, {
    skip: !userId, // Skip if no user ID
    refetchOnMountOrArgChange: true, // Important for immediate refetch
  });

  // Fallback to empty array if no records are available
  const sleepRecords = records?.records || [];

  // Calculate statistics
  const { formattedAverage, bestSleep, worstSleep } = useMemo(() => {
    if (sleepRecords.length === 0) {
      return {
        formattedAverage: "No data",
        bestSleep: { hours: 0 },
        worstSleep: { hours: 0 },
      };
    }

    // Calculate average sleep hours
    const totalHours = sleepRecords.reduce((sum, rec) => sum + rec.hours, 0);
    const average = totalHours / sleepRecords.length;

    const hrs = Math.floor(average);
    const mins = Math.round((average - hrs) * 60);
    const formattedAverage = `${hrs} hour${
      hrs !== 1 ? "s" : ""
    } ${mins} minute${mins !== 1 ? "s" : ""}`;

    // Find best and worst sleep records
    const bestSleep = sleepRecords.reduce(
      (best, rec) => (rec.hours > best.hours ? rec : best),
      sleepRecords[0]
    );

    const worstSleep = sleepRecords.reduce(
      (worst, rec) => (rec.hours < worst.hours ? rec : worst),
      sleepRecords[0]
    );

    return {
      formattedAverage,
      bestSleep,
      worstSleep,
    };
  }, [sleepRecords]);

  // Format hours for display
  const formatHours = (hours) => {
    if (!hours) return "No data";
    const hrs = Math.floor(hours);
    const mins = Math.round((hours - hrs) * 60);

    if (mins === 0) {
      return `${hrs} hour${hrs !== 1 ? "s" : ""}`;
    }
    return `${hrs} hour${hrs !== 1 ? "s" : ""} ${mins} minute${
      mins !== 1 ? "s" : ""
    }`;
  };

  const chartConfig = {
    hours: {
      label: "Sleep Hours",
      color: "hsl(var(--chart-1))",
    },
  };

  // tracks input value
  const handleInputChange = (field, value) => {
    setSleepData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // tracks date value
  const handleDateSelect = (date) => {
    setSleepData((prev) => ({
      ...prev,
      date: date,
    }));
    setCalendarOpen(false);
  };

  // mutation to add sleep record
  const [addSleepRecord, { data, isLoading, isSuccess, error }] =
    useAddSleepRecordMutation();

  // Handle form submission by invoking the mutation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      quality: sleepData.quality,
      date: sleepData.date ? format(sleepData.date, "yyyy-MM-dd") : null,
      hours: [sleepData.hours[0]],
      issue: ["poor", "terrible"].includes(sleepData.quality)
        ? sleepData.issue
        : null,
    };

    try {
      await addSleepRecord(payload);
      refetch();
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // after success in mutation
  useEffect(() => {
    if (isSuccess) {
      toast.success("Sleep record added!");
      setSleepData({
        quality: "",
        date: undefined,
        hours: [7],
        issue: "",
      });
    }
  }, [isSuccess]);

  // after error in mutation
  useEffect(() => {
    if (error) {
      toast.error("Failed to add sleep record");
      console.error(error);
    }
  }, [error]);

  // framer motion config
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/30">
      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Welcome Section */}
            <motion.div variants={itemVariants}>
              <Card className="border border-green-100 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16 border-4 border-green-200 shadow-lg">
                      <AvatarImage
                        src={userData.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback className="bg-green-100 text-green-700 text-xl">
                        {userData.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome Back, {userData.name?.split(" ")[0] || "User"}{" "}
                        👋
                      </h1>
                      <p className="text-gray-600 mb-4">
                        Here's a quick overview of your recent sleep activity.
                        Stay on top of your sleep insights and manage your rest
                        efficiently!
                      </p>
                      <div className="space-y-1 text-sm text-gray-500">
                        <p>
                          <span className="font-medium">Joined:</span>{" "}
                          {userData.createdAt
                            ? format(
                                new Date(userData.createdAt),
                                "MMMM d, yyyy"
                              )
                            : "Not available"}
                        </p>
                        <p>
                          <span className="font-medium">Last Active:</span>{" "}
                          {userData.updatedAt
                            ? format(
                                new Date(userData.updatedAt),
                                "MMMM d, yyyy"
                              )
                            : "Not available"}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Track Your Sleep */}
            <motion.div variants={itemVariants}>
              <Card className="border border-green-100 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <Moon className="w-5 h-5 mr-2 text-green-600" />
                    Track Your Sleep
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {/* Sleep Quality */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="quality"
                          className="text-sm font-medium text-gray-700"
                        >
                          Sleep Quality
                        </Label>
                        <Select
                          value={sleepData.quality}
                          onValueChange={(value) =>
                            handleInputChange("quality", value)
                          }
                        >
                          <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400 h-10 sm:h-11">
                            <SelectValue placeholder="Sleep quality..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                            <SelectItem value="poor">Poor</SelectItem>
                            <SelectItem value="terrible">Terrible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {["poor", "terrible"].includes(sleepData.quality) && (
                        <div className="space-y-2">
                          <Label
                            htmlFor="issue"
                            className="text-sm font-medium text-gray-700"
                          >
                            What issue did you face?
                          </Label>
                          <Select
                            value={sleepData.issue}
                            onValueChange={(value) =>
                              handleInputChange("issue", value)
                            }
                          >
                            <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400 h-10 sm:h-11">
                              <SelectValue placeholder="Select an issue..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="difficulty_falling_asleep">
                                Difficulty falling asleep
                              </SelectItem>
                              <SelectItem value="frequent_waking">
                                Woke up frequently during the night
                              </SelectItem>
                              <SelectItem value="nightmares">
                                Nightmares
                              </SelectItem>
                              <SelectItem value="early_waking">
                                Woke up too early
                              </SelectItem>
                              <SelectItem value="restless_sleep">
                                Restless sleep
                              </SelectItem>
                              <SelectItem value="sleep_apnea">
                                Possible sleep apnea symptoms
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Sleep Date with Calendar */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Sleep Date
                        </Label>
                        <Popover
                          open={calendarOpen}
                          onOpenChange={setCalendarOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal border-green-200 focus:border-green-400 focus:ring-green-400 h-10 sm:h-11",
                                !sleepData.date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                              <span className="truncate">
                                {sleepData.date
                                  ? format(sleepData.date, "PPP")
                                  : "Pick a date"}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0"
                            align="start"
                            side="bottom"
                          >
                            <Calendar
                              mode="single"
                              selected={sleepData.date}
                              onSelect={handleDateSelect}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* Hours Slept */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium text-gray-700">
                        Hours Slept
                      </Label>
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">
                          Select between 0 and 12 hours of sleep
                        </p>
                        <Slider
                          value={sleepData.hours}
                          onValueChange={(value) =>
                            handleInputChange("hours", value)
                          }
                          max={12}
                          min={0}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="text-center">
                          <span className="text-lg font-semibold text-green-600">
                            {sleepData.hours[0]} hours
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-lg"
                      >
                        {isLoading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            Adding Sleep Record...
                          </>
                        ) : (
                          <>
                            <Plus className="w-5 h-5 mr-2" />
                            Add Sleep Record
                          </>
                        )}
                      </Button>
                    </motion.div>

                    {sleepData.quality && sleepData.date && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-green-600 bg-green-50 p-3 rounded-lg"
                      >
                        Sleep record added successfully!
                      </motion.div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            <SleepInsights sleepRecords={sleepRecords} />
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Sleep Records Chart */}
            <motion.div variants={itemVariants}>
              <Card className="border border-green-100 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                    Sleep Records Chart
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 pt-0">
                  <div className="w-full">
                    <ChartContainer
                      config={chartConfig}
                      className="min-h-[200px] h-[250px] sm:h-[300px] w-full"
                    >
                      <BarChart
                        data={sleepRecords}
                        margin={{
                          top: 10,
                          right: 10,
                          left: 10,
                          bottom: 10,
                        }}
                        width="100%"
                        height="100%"
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="stroke-muted opacity-30"
                        />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          className="text-xs fill-muted-foreground"
                          tick={{ fontSize: 12 }}
                          interval={0}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          className="text-xs fill-muted-foreground"
                          domain={[0, 12]}
                          tick={{ fontSize: 12 }}
                          width={30}
                        />
                        <ChartTooltip
                          content={(props) => (
                            <ChartTooltipContent
                              {...props}
                              formatter={(value, name) => [
                                <div
                                  className="flex items-center gap-2"
                                  key="tooltip-content"
                                >
                                  <div className="h-2 w-2 rounded-full bg-green-500" />
                                  {`${value} hours`}
                                </div>,
                                "Sleep Duration",
                              ]}
                              labelFormatter={(label) => {
                                const record = sleepRecords.find(
                                  (r) => r.date === label
                                );
                                return record ? record.day : label;
                              }}
                            />
                          )}
                        />
                        <Bar
                          dataKey="hours"
                          fill="var(--color-hours)"
                          radius={[2, 2, 0, 0]}
                          className="fill-green-500"
                          maxBarSize={40}
                        />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Average Sleep */}
            <motion.div variants={itemVariants}>
              <Card className="border border-green-100 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-gray-600 mb-2">
                      {sleepRecords.length === 0
                        ? "Your Average Sleep"
                        : "Your Average Sleep"}
                    </h3>
                    <p className="text-2xl font-bold text-green-600">
                      {recordsLoading ? "Computing..." : formattedAverage}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Best and Worst Sleep */}
            <motion.div variants={itemVariants}>
              <Card className="border border-green-100 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-green-600" />
                    Best and Worst Sleep
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Badge className="bg-green-500 text-white mb-2">
                        Best Sleep
                      </Badge>
                      <p className="text-2xl font-bold text-green-600">
                        {bestSleep?.hours
                          ? formatHours(bestSleep.hours)
                          : "No data"}
                      </p>
                      {bestSleep?.date && (
                        <p className="text-xs text-gray-500 mt-1">
                          {bestSleep.date} ({bestSleep.day})
                        </p>
                      )}
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <Badge className="bg-red-500 text-white mb-2">
                        Worst Sleep
                      </Badge>
                      <p className="text-2xl font-bold text-red-600">
                        {worstSleep?.hours
                          ? formatHours(worstSleep.hours)
                          : "No data"}
                      </p>
                      {worstSleep?.date && (
                        <p className="text-xs text-gray-500 mt-1">
                          {worstSleep.date} ({worstSleep.day})
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sleep Goal */}
            <motion.div variants={itemVariants}>
              <Card className="border border-green-100 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-gray-600 mb-2">
                      Sleep Goal Progress
                    </h3>
                    <div className="relative w-full bg-gray-200 rounded-full h-3 mb-2">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-green-600">85%</span>{" "}
                      of your 8-hour goal
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;
