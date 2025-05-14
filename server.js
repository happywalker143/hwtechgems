const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/messagesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

// Save message from users
app.post("/sendMessage", async (req, res) => {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });

    try {
        await newMessage.save();
        res.json({ message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error saving message" });
    }
});

// Admin-only route to view messages
app.get("/admin/messages", async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages" });
    }
});

// Admin-only route to delete a message by ID
app.delete("/admin/messages/:id", async (req, res) => {
    const messageId = req.params.id;
    
    try {
        const result = await Message.findByIdAndDelete(messageId);
        if (result) {
            res.status(200).json({ message: "Message deleted successfully" });
        } else {
            res.status(404).json({ message: "Message not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting message" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
