const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// Parse incoming JSON request bodies.
app.use(express.json());

// Serve files inside the public folder.
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.send("My Week 2 API!");
});

app.post("/user", (req, res) => {
    console.log(req.body);

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    return res.status(200).json({
        message: `Hello, ${name}!`
    });
});


app.get("/user/:id", (req, res) => {
    const { id } = req.params;

    return res.status(200).json({
        message: `User ${id} profile`,
    });
});

// Handle routes that do not exist.
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
    });
});

// General error-handling middleware.
app.use((error, req, res, next) => {
    console.error("Server error:", error.message);

    // Handle malformed JSON.
    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return res.status(400).json({
            error: "Invalid JSON format",
        });
    }

    return res.status(500).json({
        error: "Internal server error",
    });
});

app.listen(PORT, () => {
    console.log(`Express app listening at http://localhost:${PORT}`);
});