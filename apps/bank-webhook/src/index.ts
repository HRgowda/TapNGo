import express from "express";
import cors from "cors";
import db from "@repo/db/client";

const app = express();
app.use(express.json());

// Configure CORS (replace "*" with allowed origin in production)
app.use(cors({ origin: "*" }));

// Webhook Route
app.post("/bank_server", async (req, res) => {
  const { token, user_identifier, amount, pin } = req.body;

  if (!token || !user_identifier || !amount || !pin) {
    return res.status(400).json({
      message: "Invalid request payload. Please provide all required fields.",
    });
  }

  try {
    // Validate the transaction with the token and status
    const transaction = await db.onRampTransaction.findFirst({
      where: {
        token,
        userid: Number(user_identifier),
        status: "Processing",
      },
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found or already completed.",
      });
    }

    // Validate the user's PIN
    const user = await db.user.findUnique({
      where: { id: Number(user_identifier) },
      select: { pin: true },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (user.pin !== pin) {
      return res.status(403).json({
        message: "Invalid PIN. Please enter the correct PIN.",
      });
    }

    await db.$transaction([
      db.balance.upsert({
        where: { userid: Number(user_identifier) },
        update: { amount: { increment: Number(amount) } },
        create: {
          userid: Number(user_identifier),
          amount: Number(amount),
          locked: 0,
        },
      }),
      db.onRampTransaction.updateMany({
        where: { token },
        data: { status: "Success" },
      }),
    ]);

    return res.status(200).json({
      message: "Transaction successfully captured.",
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
});

// Start the webhook server
const PORT = 3003;
app.listen(PORT, () => console.log(`Webhook server running on port ${PORT}`));
