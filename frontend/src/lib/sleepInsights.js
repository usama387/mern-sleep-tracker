export function getSleepInsights(records) {
  if (!records || records.length === 0) return "No sleep data available.";

  const hoursArray = records.map((r) => r.hours);
  const average =
    hoursArray.reduce((sum, h) => sum + h, 0) / hoursArray.length;
  const min = Math.min(...hoursArray);
  const max = Math.max(...hoursArray);
  const variation = max - min;
  const hasLowDays = hoursArray.some((h) => h < 4);
  const oversleptDays = hoursArray.filter((h) => h > 9).length;
  const undersleptDays = hoursArray.filter((h) => h < 5).length;

  const lines = [];

  // 🧠 GENERAL OVERVIEW
  lines.push("🧠 **Sleep Insights Summary**");

  if (average < 6) {
    lines.push(
      `• Your **average sleep duration** is critically low (${average.toFixed(
        1
      )} hrs). Chronic sleep deprivation can lead to mood disorders, weakened immunity, and cognitive decline.`
    );
  } else if (average >= 6 && average < 7) {
    lines.push(
      `• Your **average sleep** (${average.toFixed(
        1
      )} hrs) is slightly below the recommended range. While it's manageable short-term, consistent improvement is needed.`
    );
  } else if (average >= 7 && average <= 9) {
    lines.push(
      `• Excellent! Your average sleep (${average.toFixed(
        1
      )} hrs) falls within the optimal range for adults. Keep it consistent!`
    );
  } else {
    lines.push(
      `• You're **sleeping more than usual** (${average.toFixed(
        1
      )} hrs). Oversleeping may be linked to fatigue, depression, or poor sleep quality.`
    );
  }

  // 📉 VARIABILITY
  if (variation > 3) {
    lines.push(
      `• Your sleep hours **fluctuate significantly** (from ${min} to ${max} hrs). Irregular sleep can disrupt your circadian rhythm and reduce sleep efficiency.`
    );
  }

  // 🚨 SPECIFIC ISSUES
  if (hasLowDays) {
    lines.push(
      `• Some days had **extremely low sleep (<4 hrs)**. This is a red flag — prioritize earlier wind-down routines or short naps when needed.`
    );
  }

  if (oversleptDays >= 2) {
    lines.push(
      `• You **overslept on ${oversleptDays} day(s)**. Oversleeping may indicate burnout, poor sleep quality, or inconsistent routines.`
    );
  }

  if (undersleptDays >= 3) {
    lines.push(
      `• You had **${undersleptDays} days with <5 hours of sleep**. Prolonged sleep deprivation can impair decision-making and increase health risks.`
    );
  }

  // 🧘 LIFESTYLE RECOMMENDATIONS
  lines.push("\n🧘 **Lifestyle & Routine Suggestions**");

  lines.push(
    `• **Exercise:** Engage in 20–30 mins of light exercise (walking, yoga) during the day. Avoid heavy workouts within 3 hours of bedtime.`
  );
  lines.push(
    `• **Diet:** Avoid caffeine after 2 PM. Include sleep-friendly foods like almonds, kiwi, bananas, and warm milk. Avoid large meals before sleep.`
  );
  lines.push(
    `• **Digital Detox:** Turn off screens at least 30 minutes before bed. Blue light affects melatonin levels, making it harder to fall asleep.`
  );
  lines.push(
    `• **Routine:** Try to go to bed and wake up at the same time every day — even on weekends. Sleep thrives on regularity.`
  );
  lines.push(
    `• **Environment:** Make your room dark, cool, and quiet. Consider using blackout curtains or white noise apps for deeper sleep.`
  );

  // 💬 MOTIVATION
  lines.push("\n💬 **Final Note**");
  lines.push(
    `Better sleep isn't just about quantity — it's about **consistency**, **quality**, and **routine**. Start small, track daily, and aim for gradual improvement. Your future self will thank you. 💤`
  );

  return lines.join("\n\n");
}
