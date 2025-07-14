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

    const { quality, date, sleepStart, sleepEnd, issue } = req.body;

    if (!quality || !date || !sleepStart || !sleepEnd) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Convert time strings to Date objects
    const sleepStartDate = new Date(`${date}T${sleepStart}`);
    const sleepEndDate = new Date(`${date}T${sleepEnd}`);

    // Handle overnight sleep
    if (sleepEndDate < sleepStartDate) {
      sleepEndDate.setDate(sleepEndDate.getDate() + 1);
    }

    // Calculate duration in hours
    const hours = (sleepEndDate - sleepStartDate) / (1000 * 60 * 60);

    // Create record with new fields
    const newRecord = await prisma.record.create({
      data: {
        text: quality,
        amount: hours,
        date: new Date(date),
        sleepStart: sleepStartDate,
        sleepEnd: sleepEndDate,
        issue: ["poor", "terrible"].includes(quality) ? issue : null,
        userId,
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

    // Fetch all sleep records for the user with all needed fields
    const records = await prisma.record.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 7,
      select: {
        id: true,
        text: true,       // sleep quality
        amount: true,     // hours
        date: true,
        issue: true,
        sleepStart: true,
        sleepEnd: true,
        createdAt: true
      }
    });

    // Format records with all required fields
    const formattedRecords = records
      .map((record) => {
        const jsDate = new Date(record.date);
        const sleepStart = record.sleepStart ? new Date(record.sleepStart) : null;
        const sleepEnd = record.sleepEnd ? new Date(record.sleepEnd) : null;
        
        return {
          id: record.id,
          date: format(jsDate, "EEE"), // e.g., Mon
          day: format(jsDate, "EEEE"), // e.g., Monday
          fullDate: format(jsDate, "yyyy-MM-dd"), // for reference
          hours: record.amount,
          quality: record.text,
          issue: record.issue,
          sleepStart: sleepStart ? format(sleepStart, "HH:mm") : null,
          sleepEnd: sleepEnd ? format(sleepEnd, "HH:mm") : null,
          formattedSleepStart: sleepStart ? format(sleepStart, "h:mm a") : null,
          formattedSleepEnd: sleepEnd ? format(sleepEnd, "h:mm a") : null,
          createdAt: record.createdAt
        };
      })
      .reverse(); // Oldest to newest for left-to-right chart

    res.status(200).json({
      success: true,
      records: formattedRecords,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message 
    });
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
