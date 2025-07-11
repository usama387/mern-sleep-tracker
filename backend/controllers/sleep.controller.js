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
