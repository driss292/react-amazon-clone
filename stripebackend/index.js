const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(
  "sk_test_51KTROODZJ3ZAf9MX06LcP2lpPdvEAstrxEoFZJdJSmLOvk9VrGeE70MEBCGC4vYJf30eJavWfdQok5fSVhyOd34W00ysYLSuXW"
);
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Add your stripe Secrect key to the .require('stripe')");
});

app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;

  try {
    const { total, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencyKey = uuidv4();

    const charge = await stripe.charges.create(
      {
        amount: total * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "Purchased the product",
      },
      {
        idempotencyKey,
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }
  res.json({ error, status });
  //   res.status(400).json({ error });
});

app.listen(8080);
