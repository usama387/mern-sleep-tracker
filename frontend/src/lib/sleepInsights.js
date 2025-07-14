export function getSleepInsights(records) {
  if (!records || records.length === 0) return "No sleep data available.";

  const averageHours =
    records.reduce((sum, r) => sum + r.hours, 0) / records.length;

  const poorQualityNights = records.filter((r) => r.quality === "poor");
  const commonIssues = {};
  const sleepTimes = [];
  const wakeTimes = [];

  records.forEach((r) => {
    // Track sleep and wake times
    if (r.sleepStart && r.sleepEnd) {
      sleepTimes.push(parseTime(r.sleepStart));
      wakeTimes.push(parseTime(r.sleepEnd));
    }

    // Track issues
    if (r.issue) {
      commonIssues[r.issue] = (commonIssues[r.issue] || 0) + 1;
    }
  });

  const avgSleepTime = getAverageTime(sleepTimes);
  const avgWakeTime = getAverageTime(wakeTimes);
  const issueSummary = Object.entries(commonIssues)
    .map(([issue, count]) => `${formatIssue(issue)} (${count} times)`)
    .join(", ");

  const sleepTimeWarning = getSleepTimeWarning(avgSleepTime);
  const wakeTimeWarning = getWakeTimeWarning(avgWakeTime);

  return `
🧠 **Sleep Insights Summary**

- 💤 Average Sleep Duration: **${averageHours.toFixed(1)} hours**
- 📉 Nights with Poor Sleep Quality: **${poorQualityNights.length}**
- ⚠️ Reported Issues: ${issueSummary || "None"}

🕒 **Sleep Timing Patterns**
- ⏰ Average Sleep Time: **${avgSleepTime}**
- 🌅 Average Wake-up Time: **${avgWakeTime}**
${sleepTimeWarning ? `- ❗ ${sleepTimeWarning}` : ""}
${wakeTimeWarning ? `- ❗ ${wakeTimeWarning}` : ""}

🩺 **AI Recommendations**
- Target **7–9 hours** of sleep consistently to restore body and brain functions.
- Sleep before **11:00 PM** to align with melatonin release and circadian rhythm.
- Reduce exposure to blue light 1–2 hours before bedtime (phones, laptops).
- Avoid heavy meals, caffeine, and stimulating activities 2 hours before sleep.
- Use relaxation techniques like deep breathing, journaling, or light stretching.

🔍 **Root Cause Suggestions**
- Sleep < 4 hours regularly can lead to **low energy, poor focus, mood swings, and long-term health decline**.
- Sleeping after 1:00 AM disturbs melatonin cycles, leading to shallow and disrupted sleep.
- Poor sleep quality may be linked to **stress, poor environment, anxiety, or inconsistent routines**.

🌿 **Daily Lifestyle Practices for Better Sleep**
- 🌞 Get **morning sunlight** for 15–30 mins daily — it helps regulate your sleep-wake clock.
- 🏃‍♂️ Include light **physical activity** like walking, yoga, or stretches — ideally before 7 PM.
- 💧 Stay **hydrated**, but reduce water intake 1 hour before bed to avoid waking up at night.
- 📅 Keep a **consistent routine** — wake and sleep at the same time even on weekends.
- 📖 Add calming rituals like reading, journaling, or prayer to your pre-sleep routine.

🧬 **Medical & Mental Health Checkups**
- 🩺 If sleep issues persist (like insomnia, waking up frequently), consult a **sleep specialist**.
- 🧠 Poor sleep can be a symptom of **anxiety, depression, or hormonal imbalance** — talk to a psychologist if needed.
- 🧪 Get your **vitamin D, iron, and thyroid levels** checked — deficiencies can impact sleep.
- ❤️ Consider an annual **wellness exam** to rule out sleep apnea, chronic fatigue, or stress-related conditions.

🌟 **Conclusion**
Your sleep is not just rest — it's your body's daily **healing mechanism**. Improve it by making small, consistent changes to your **routine, mindset, and health awareness**. Sleep well, live better!
`;
}

function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours + minutes / 60;
}

function formatTime(decimal) {
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);
  return `${pad(hours)}:${pad(minutes)}`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

function getAverageTime(times) {
  if (times.length === 0) return "N/A";
  const avg = times.reduce((sum, t) => sum + t, 0) / times.length;
  return formatTime(avg);
}

function getSleepTimeWarning(avgTime) {
  const [h] = avgTime.split(":").map(Number);
  if (h >= 1) return "You’re sleeping too late. Try to sleep before 11:00 PM.";
  return "";
}

function getWakeTimeWarning(avgTime) {
  const [h] = avgTime.split(":").map(Number);
  if (h >= 9) return "Waking up late may reduce productivity. Try waking up earlier.";
  return "";
}

function formatIssue(issue) {
  return issue.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

