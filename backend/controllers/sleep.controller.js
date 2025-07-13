import prisma from "../utils/prisma.js";
import { format } from "date-fns";

// controller for patient/user to add sleep record
export const addSleepRecord = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const { quality, date, hours, issue } = req.body;

    // Validate required fields
    if (!quality || !date || !hours || !Array.isArray(hours)) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid required fields",
      });
    }

    // now create the record
    const newRecord = await prisma.record.create({
      data: {
        text: quality,
        amount: hours[0],
        date: new Date(date),
        issue: ["poor", "terrible"].includes(quality) ? issue : null,
        userId, //for relationship with record
      },
    });

    res.status(201).json({
      success: true,
      message: "Sleep record added successfully",
      record: newRecord,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

// controller for patient/user to get sleep record
export const getUserSleepRecords = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Fetch all sleep records for the user
    const records = await prisma.record.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 7,
    });

    // Sort back in ascending order for chart
    const formattedRecords = records
      .map((record) => {
        const jsDate = new Date(record.date);
        return {
          date: format(jsDate, "EEE"), // e.g., Mon
          day: format(jsDate, "EEEE"), // e.g., Monday
          hours: record.amount, // from slider
        };
      })
      .reverse(); // Oldest to newest for left-to-right chart

    res.status(200).json({
      success: true,
      records: formattedRecords,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// New controller to get all patients with sleep records
export const getPatientsWithRecords = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Only authrorized doctors can access this data",
      });
    }

    const patients = await prisma.user.findMany({
      where: { role: "PATIENT" },
      include: {
        record: {
          orderBy: { date: "desc" },
          take: 7, // Get last 7 records
        },
      },
    });

    const patientsWithStats = patients.map((patient) => {
      const records = patient.record || [];

      // Calculate average sleep
      const totalSleep = records.reduce((sum, r) => sum + r.amount, 0);
      const avgSleep = records.length > 0 ? totalSleep / records.length : 0;

      const formattedRecords = records
        .map((r) => {
          const jsDate = new Date(r.date);
          return {
            date: jsDate.toLocaleDateString("en-US", { weekday: "short" }), // Sat, Sun, etc.
            day: jsDate.toLocaleDateString("en-US", { weekday: "long" }), // Saturday, Sunday, etc.
            hours: r.amount,
          };
        })
        .reverse(); // Oldest to newest

      return {
        id: patient.id,
        name: patient.name,
        email: patient.email,
        avgSleep: Number(avgSleep.toFixed(1)),
        sleepGoal: 8, // optionally fetch from a profile/settings table
        alerts: records.filter((r) => r.amount < 5).length, // example rule
        lastActive: `${Math.floor(
          (Date.now() - new Date(patient.updatedAt)) / (1000 * 60)
        )} minutes ago`,
        status:
          avgSleep >= 7.5
            ? "excellent"
            : avgSleep >= 6.5
            ? "good"
            : avgSleep >= 5.5
            ? "warning"
            : "critical",
        sleepRecords: formattedRecords,
      };
    });

    res.status(200).json(patientsWithStats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching patients", error: error.message });
  }
};
