import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Users,
  Search,
  Filter,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  LogOut,
  Eye,
  MessageSquare,
  FileText,
  Download,
  Activity,
  Moon,
  Target,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "@/featues/api/authApi";
import { useGetAllUsersSleepRecordsQuery } from "@/featues/api/sleepApi";
import { Skeleton } from "@/components/ui/skeleton";

const DoctorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [patientsData, setPatientsData] = useState([]);

  const { user } = useSelector((store) => store?.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  // API call to fetch all patients with sleep records
  const { 
    data: apiData, 
    isLoading, 
    isError, 
    refetch 
  } = useGetAllUsersSleepRecordsQuery();

  // Helper function to format last active time
  const formatLastActive = (minutesAgo) => {
    const minutes = parseInt(minutesAgo);
    if (isNaN(minutes)) return "Unknown";
    
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  useEffect(() => {
    if (apiData && apiData.length > 0) {
      const formattedData = apiData.map(patient => {
        // Extract minutes from the string (e.g. "4278 minutes ago")
        const minutes = patient.lastActive.replace(' minutes ago', '');
        const lastActive = formatLastActive(minutes);
        
        return {
          ...patient,
          lastActive,
          avatar: "/placeholder.svg?height=40&width=40",
          // Add other fields as needed
        };
      });
      
      setPatientsData(formattedData);
      if (!selectedPatient) {
        setSelectedPatient(formattedData[0]);
      }
    }
  }, [apiData, selectedPatient]);

  // Handle logout
  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  // Calculate doctor stats based on patient data
  const doctorData = useMemo(() => {
    if (patientsData.length === 0) {
      return {
        totalPatients: 0,
        activeToday: 0,
        activeAlerts: 0,
        avgSleepQuality: 0,
      };
    }

    const activeToday = patientsData.filter(
      (p) => p.lastActive.includes("hour") || p.lastActive.includes("minute")
    ).length;

    const activeAlerts = patientsData.reduce(
      (sum, patient) => sum + patient.alerts,
      0
    );

    const totalSleep = patientsData.reduce(
      (sum, patient) => sum + patient.avgSleep,
      0
    );
    const avgSleepQuality = totalSleep / patientsData.length;

    return {
      totalPatients: patientsData.length,
      activeToday,
      activeAlerts,
      avgSleepQuality: avgSleepQuality.toFixed(1),
    };
  }, [patientsData]);

  // Filter patients based on search and status
  const filteredPatients = useMemo(() => {
    return patientsData.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || patient.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus, patientsData]);

  // Status helpers
  const getStatusColor = (status) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-700 border-green-200";
      case "good":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "critical":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-4 h-4" />;
      case "good":
        return <TrendingUp className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "critical":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const chartConfig = {
    hours: {
      label: "Sleep Hours",
      color: "hsl(var(--chart-1))",
    },
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

  // Loading skeleton for stats cards
  const StatsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((id) => (
        <Card key={id} className="border border-green-100 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-12" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Loading skeleton for patient list
  const PatientListSkeleton = () => (
    <Card className="border border-green-100 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-48" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2 p-6 pt-0">
          {[1, 2, 3, 4, 5].map((id) => (
            <Card key={id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-5 w-12" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-5 w-12" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // Loading skeleton for patient details
  const PatientDetailsSkeleton = () => (
    <Card className="border border-green-100 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mt-6">
          <div className="text-center">
            <Skeleton className="h-20 w-20 mx-auto rounded-full mb-4" />
            <Skeleton className="h-6 w-48 mx-auto mb-2" />
            <Skeleton className="h-4 w-24 mx-auto" />
            <Skeleton className="h-6 w-32 mx-auto mt-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </div>
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
          <div>
            <Skeleton className="h-5 w-48 mb-3" />
            <div className="space-y-2">
              {[1, 2, 3].map((id) => (
                <Skeleton key={id} className="h-12 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Handle error state
  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50/30">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg border border-red-200">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-6">
            We encountered an issue while fetching patient data. Please try again.
          </p>
          <Button
            onClick={refetch}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <Link to="/">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <Stethoscope className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                    Somnio
                  </h1>
                  <p className="text-sm text-gray-600">Doctor Dashboard</p>
                </div>
              </div>
            </Link>

            {/* Notifications & User Menu */}
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10 border-2 border-green-200">
                      <AvatarImage
                        src={user?.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {user?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Somnologist
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Dashboard Stats */}
          <motion.div variants={itemVariants}>
            {isLoading ? (
              <StatsSkeleton />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border border-green-100 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Total Patients
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          {doctorData.totalPatients}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-green-100 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Active Today
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          {doctorData.activeToday}
                        </p>
                      </div>
                      <Activity className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-yellow-100 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Alerts
                        </p>
                        <p className="text-2xl font-bold text-yellow-600">
                          {doctorData.activeAlerts}
                        </p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-purple-100 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Avg Sleep Quality
                        </p>
                        <p className="text-2xl font-bold text-purple-600">
                          {doctorData.avgSleepQuality}h
                        </p>
                      </div>
                      <Moon className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>

          {/* Main Dashboard */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Patients List */}
            <div className="xl:col-span-2">
              <motion.div variants={itemVariants}>
                {isLoading ? (
                  <PatientListSkeleton />
                ) : (
                  <Card className="border border-green-100 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                          <Users className="w-5 h-5 mr-2 text-green-600" />
                          Patient Overview
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={refetch}>
                            <Download className="w-4 h-4 mr-2" />
                            Refresh Data
                          </Button>
                        </div>
                      </div>

                      {/* Search and Filter */}
                      <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            placeholder="Search patients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                          />
                        </div>
                        <Select
                          value={filterStatus}
                          onValueChange={setFilterStatus}
                        >
                          <SelectTrigger className="w-full sm:w-48 border-green-200 focus:border-green-400 focus:ring-green-400">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Patients</SelectItem>
                            <SelectItem value="excellent">
                              Excellent
                            </SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="warning">Warning</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>

                    <CardContent className="p-0">
                      <div className="space-y-2 p-6 pt-0">
                        <AnimatePresence>
                          {filteredPatients.length > 0 ? (
                            filteredPatients.map((patient, index) => (
                              <motion.div
                                key={patient.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.05,
                                }}
                                whileHover={{ scale: 1.01 }}
                                className="cursor-pointer"
                                onClick={() => setSelectedPatient(patient)}
                              >
                                <Card
                                  className={`border transition-all duration-200 hover:shadow-md ${
                                    selectedPatient?.id === patient.id
                                      ? "border-green-300 bg-green-50/50"
                                      : "border-gray-200 hover:border-green-200"
                                  }`}
                                >
                                  <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-4">
                                        <Avatar className="h-12 w-12 border-2 border-green-200">
                                          <AvatarImage
                                            src={
                                              patient.avatar ||
                                              "/placeholder.svg"
                                            }
                                          />
                                          <AvatarFallback className="bg-green-100 text-green-700">
                                            {patient.name
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <h3 className="font-semibold text-gray-900">
                                            {patient.name}
                                          </h3>
                                          <p className="text-sm text-gray-600">
                                            {patient.lastActive}
                                          </p>
                                          <div className="flex items-center space-x-2 mt-1">
                                            <Badge
                                              className={`text-xs ${getStatusColor(
                                                patient.status
                                              )}`}
                                            >
                                              {getStatusIcon(patient.status)}
                                              <span className="ml-1 capitalize">
                                                {patient.status}
                                              </span>
                                            </Badge>
                                            {patient.alerts > 0 && (
                                              <Badge className="bg-red-100 text-red-700 text-xs">
                                                {patient.alerts} Alert
                                                {patient.alerts > 1 ? "s" : ""}
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="text-right">
                                        <div className="flex items-center space-x-4">
                                          <div>
                                            <p className="text-sm text-gray-600">
                                              Avg Sleep
                                            </p>
                                            <p className="text-lg font-semibold text-gray-900">
                                              {patient.avgSleep}h
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-gray-600">
                                              Goal
                                            </p>
                                            <p className="text-lg font-semibold text-green-600">
                                              {patient.sleepGoal}h
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))
                          ) : (
                            <div className="text-center py-12">
                              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                No patients found
                              </h3>
                              <p className="text-gray-600">
                                Try adjusting your search or filter criteria.
                              </p>
                            </div>
                          )}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>

            {/* Patient Details */}
            <div>
              <motion.div variants={itemVariants}>
                {isLoading ? (
                  <PatientDetailsSkeleton />
                ) : (
                  <Card className="border border-green-100 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                        {selectedPatient
                          ? "Patient Details"
                          : "Select Patient"}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      {selectedPatient ? (
                        <Tabs
                          value={activeTab}
                          onValueChange={setActiveTab}
                          className="w-full"
                        >
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="chart">Sleep Chart</TabsTrigger>
                          </TabsList>

                          <TabsContent
                            value="overview"
                            className="space-y-6 mt-6"
                          >
                            {/* Patient Info */}
                            <div className="text-center">
                              <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-green-200">
                                <AvatarImage
                                  src={
                                    selectedPatient.avatar ||
                                    "/placeholder.svg"
                                  }
                                />
                                <AvatarFallback className="bg-green-100 text-green-700 text-xl">
                                  {selectedPatient.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <h3 className="text-xl font-bold text-gray-900">
                                {selectedPatient.name}
                              </h3>
                              <p className="text-gray-600">
                                {selectedPatient.email}
                              </p>
                              <Badge
                                className={`mt-2 ${getStatusColor(
                                  selectedPatient.status
                                )}`}
                              >
                                {getStatusIcon(selectedPatient.status)}
                                <span className="ml-1 capitalize">
                                  {selectedPatient.status}
                                </span>
                              </Badge>
                            </div>

                            {/* Sleep Stats */}
                            <div className="grid grid-cols-2 gap-4">
                              <Card className="border border-green-100 bg-green-50/50">
                                <CardContent className="p-4 text-center">
                                  <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                  <p className="text-sm text-gray-600">
                                    Average Sleep
                                  </p>
                                  <p className="text-xl font-bold text-green-600">
                                    {selectedPatient.avgSleep}h
                                  </p>
                                </CardContent>
                              </Card>

                              <Card className="border border-green-100 bg-green-50/50">
                                <CardContent className="p-4 text-center">
                                  <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                  <p className="text-sm text-gray-600">
                                    Sleep Goal
                                  </p>
                                  <p className="text-xl font-bold text-green-600">
                                    {selectedPatient.sleepGoal}h
                                  </p>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Progress */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600">
                                  Goal Progress
                                </span>
                                <span className="text-sm text-gray-600">
                                  {Math.round(
                                    (selectedPatient.avgSleep /
                                      selectedPatient.sleepGoal) *
                                      100
                                  )}
                                  %
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <motion.div
                                  className="h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${Math.min(
                                      (selectedPatient.avgSleep /
                                        selectedPatient.sleepGoal) *
                                        100,
                                      100
                                    )}%`,
                                  }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                />
                              </div>
                            </div>

                            {/* Recent Activity */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">
                                Recent Sleep Records
                              </h4>
                              <div className="space-y-2">
                                {selectedPatient.sleepRecords
                                  .slice(-3)
                                  .reverse()
                                  .map((record, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                      <span className="text-sm font-medium text-gray-700">
                                        {record.day}
                                      </span>
                                      <span
                                        className={`text-sm font-semibold ${
                                          record.hours >= 7
                                            ? "text-green-600"
                                            : record.hours >= 6
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                        }`}
                                      >
                                        {record.hours}h
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="chart" className="mt-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900">
                                Weekly Sleep Pattern
                              </h4>
                              <ChartContainer
                                config={chartConfig}
                                className="h-[300px] w-full"
                              >
                                <ResponsiveContainer
                                  width="100%"
                                  height="100%"
                                >
                                  <BarChart
                                    data={selectedPatient.sleepRecords}
                                    margin={{
                                      top: 10,
                                      right: 10,
                                      left: 10,
                                      bottom: 10,
                                    }}
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
                                    />
                                    <YAxis
                                      tickLine={false}
                                      axisLine={false}
                                      className="text-xs fill-muted-foreground"
                                      domain={[0, 12]}
                                    />
                                    <ChartTooltip
                                      content={(props) => (
                                        <ChartTooltipContent
                                          {...props}
                                          formatter={(value) => [
                                            `${value} hours`,
                                            "Sleep Duration",
                                          ]}
                                          labelFormatter={(label) => {
                                            const record =
                                              selectedPatient.sleepRecords.find(
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
                                    />
                                  </BarChart>
                                </ResponsiveContainer>
                              </ChartContainer>

                              {/* Sleep Quality Indicators */}
                              <div className="grid grid-cols-3 gap-2 mt-4">
                                <div className="text-center p-2 bg-green-50 rounded">
                                  <p className="text-xs text-green-600">
                                    Good Sleep
                                  </p>
                                  <p className="text-sm font-bold text-green-700">
                                    {selectedPatient.sleepRecords.filter(
                                      (r) => r.hours >= 7
                                    ).length}{" "}
                                    days
                                  </p>
                                </div>
                                <div className="text-center p-2 bg-yellow-50 rounded">
                                  <p className="text-xs text-yellow-600">
                                    Fair Sleep
                                  </p>
                                  <p className="text-sm font-bold text-yellow-700">
                                    {selectedPatient.sleepRecords.filter(
                                      (r) => r.hours >= 6 && r.hours < 7
                                    ).length}{" "}
                                    days
                                  </p>
                                </div>
                                <div className="text-center p-2 bg-red-50 rounded">
                                  <p className="text-xs text-red-600">
                                    Poor Sleep
                                  </p>
                                  <p className="text-sm font-bold text-red-700">
                                    {selectedPatient.sleepRecords.filter(
                                      (r) => r.hours < 6
                                    ).length}{" "}
                                    days
                                  </p>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      ) : (
                        <div className="text-center py-12">
                          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Select a Patient
                          </h3>
                          <p className="text-gray-600">
                            Choose a patient from the list to view their sleep
                            details and analytics.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DoctorDashboard;