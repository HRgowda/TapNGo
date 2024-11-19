import express from "express";
import cors from "cors";
import db from "@repo/db/client";
import rateLimit from "express-rate-limit";

// Bank-webhook server

const app = express();
app.use(express.json());

// Custom Rate Limit Handler
const depositLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: "Too many requests, try again after 5 minutes",
  standardHeaders: true, 
  legacyHeaders: false, 
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, try again after 5 minutes.",
    });
  },
});


app.use(cors({ origin: "*" }));

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Create onRamp transaction
app.post("/create_onramp", depositLimiter, async (req, res) => {
  const { amount, provider, user_identifier } = req.body;

  if (!amount || !provider || !user_identifier) {
    return res.status(400).json({ message: "Invalid request payload." });
  }
  if (isNaN(Number(amount)) || Number(amount) <= 0) {
    return res.status(400).json({ message: "Invalid amount." });
  }
  if (Number(amount) > 15000) {
    return res.status(400).json({ message: "Amount should be less than Rs 15,000." });
  }

  try {
    const token = generateToken();

    await db.onRampTransaction.create({
      data: {
        userid: user_identifier,
        amount: Number(amount),
        provider,
        startTime: new Date(),
        status: "Processing",
        token,
      },
    });

    return res.status(200).json({ message: "Deposit initiated.", token });
  } catch (error) {
    console.error("Transaction error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/complete_onramp", depositLimiter, async (req, res) => {
  const { token, user_identifier, amount, pin } = req.body;

  // Validate input
  if (!token || !user_identifier || !amount) {
    return res.status(400).json({ message: "Invalid request payload." });
  }

  try {
    const transaction = await db.onRampTransaction.findFirst({
      where: { token, status: "Processing" },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found or already completed." });
    }

    if (Number(amount) !== transaction.amount) {
      return res.status(400).json({ message: "Amount mismatch for the transaction." });
    }

    const user = await db.user.findUnique({
      where: { id: Number(user_identifier) },
      select: { pin: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (pin !== undefined && user.pin !== pin) {
      return res.status(400).json({ message: "Invalid PIN." });
    }

    await db.$transaction([

      db.balance.upsert({
        where: { userid: Number(user_identifier) },
        update: { amount: { increment: Number(amount) } },
        create: { userid: Number(user_identifier), amount: Number(amount), locked: 0 },
      }),

      db.onRampTransaction.updateMany({
        where: { token },
        data: { status: "Success" },
      }),
    ]);

    return res.status(200).json({ message: "Deposited successfully." });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Webhook server running on port ${PORT}`));
