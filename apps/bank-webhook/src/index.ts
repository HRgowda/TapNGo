import express from "express";
import cors from "cors";
import db from "@repo/db/client";

const app = express();
app.use(express.json());

// Configure CORS (restrict origins in production)
app.use(cors({ origin: "*" }));

// Webhook Routes

app.post("/create_onramp", async (req, res) => {
  const { amount, provider, user_identifier } = req.body;

  if (!amount || !provider) {
    return res.status(400).json({
      message: "Invalid request payload, please provide all required fields.",
    });
  }
   else if (amount < 0) {
    return res.status(400).json({
       message: "Please enter a valid amount." 
      });
  } 
  else if (amount > 15000) {
    return res.status(400).json({
      message: "Amount should be less than Rs 15,000.",
    });
  }

  try {
    const token = generateToken();

    await db.onRampTransaction.create({
      data: {
        userid: user_identifier,
        amount,
        provider,
        startTime: new Date(),
        status: "Processing",
        token
      },
    });

    return res.status(200).json({
      message: "Deposit initiated.",
      token: token,
    });
  } catch (error) {
    console.error("Transaction error:", error);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }

  function generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
});

// complete the processing onRamp
app.post("/complete_onramp", async (req, res) => {
  console.log("Request Body:", req.body); // Log the request body
  const { token, user_identifier, amount, pin } = req.body;

  // Check for required fields
  if (!token || !user_identifier || !amount) {
    return res.status(400).json({
      message: "Invalid request payload. Please provide all required fields.",
    });
  }

  try {
    // Find the corresponding transaction
    const transaction = await db.onRampTransaction.findFirst({
      where: { 
        token, 
        status: "Processing" 
      },
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found or already completed.",
      });
    }

    const user = await db.user.findUnique({
      where: { 
        id: Number(user_identifier)
      },
      select: { 
        pin: true 
      },
    });

    if (!user) {
      return res.status(404).json({ 
        message: "User not found." 
      });
    }

    // If a PIN is provided, validate it
    if (pin !== undefined) {
      if(user.pin !== pin){
        return res.status(400).json({
          message: "Invalid PIN. Please enter a valid PIN."
        });
      }
    } else {
      console.log("Otp verfication succeeded")
    }

    // Proceed with the deposit
    await db.$transaction([
      db.balance.upsert({
        where: { 
          userid: Number(user_identifier)
        },
        update: {
          amount: { increment: Number(amount) } 
        },
        create: {
          userid: Number(user_identifier),
          amount: Number(amount),
          locked: 0,
        },
      }),

      db.onRampTransaction.updateMany({
        where: { token },
        data: { 
          status: "Success"
        },
      }),
    ]);

    return res.status(200).json({
      message: "Deposited successfully." 
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
});

const PORT = 3003;
app.listen(PORT, () =>
  console.log(`Webhook server running on port ${PORT}`)
);
