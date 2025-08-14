// app.js (Backend)
const express = require("express");
const mongoose = require("mongoose");
const router3 = require("./Router/UserRoute");
const app = express();
const cors = require("cors");
const User = require("./Model/UserModel");
const db = require("./util/db");

//payment gtway
const stripe = require("stripe")("sk_test_51R8NoCSBlInf359dPI3W3e8CBI04Ghwqs6dNzWaAZJFqtW8tazkKFAXVYjLDWvDYdM4goGijNdqRDKgKzcpp09Ou00tVxe7GfL");
require("dotenv").config();


const router2 = require("./Router/MaterialRoute"); // import materials route
const orderrouter = require("./Router/OrderRoute"); // import order route
const equipmentrouter = require("./Router/EquipmentRoute"); // import Equipment route
const confirmrouter = require("./Router/ConfirmOrderRoute"); // import ConfirmOrder route
const scheduleRouter = require("./Router/ScheduleRoutes");
const taskRouter = require("./Router/TaskRoutes");
const requestinRouter = require("./Router/inventoryrequest");
const progressRouter = require("./Router/Progressroter");
const router = require("./Router/Budgetroute");
const router1 = require("./Router/Expensesroute");
const bcrypt = require("bcrypt");

const monitoringRouter = require("./Router/MonitoringRoutes");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const routerNotification = require("./Router/NotificationRoute");
const routerPassword = require("./Router/Passwordroute");

const whatsappRoute = require("./Router/whatsapp.js");

//progress routes
const progressrouter =require("./Router/Progressroter");
const routerRequiment=require("./Router/requimentRoute");
const  routerfeedback=require("./Router/feedbackRoute");


// Clear model cache
delete mongoose.connection.models['Task'];

// Enhanced CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Improved JSON parsing middleware
app.use(express.json({
    verify: (req, res, buf) => {
        try {
            JSON.parse(buf.toString());
        } catch (e) {
            throw new Error('Invalid JSON');
        }
    },
    strict: true
}));

// Routes
app.use("/users", router3);
app.use("/Monitoring", monitoringRouter);
app.use("/ProjectSchedules", scheduleRouter);
app.use("/Tasks", taskRouter);
app.use("/inventoryreq", requestinRouter);
app.use("/Budgets", router);
app.use("/Expenses", router1);
app.use("/progress", progressRouter);
app.use("/Materials", router2);
app.use("/Orders", orderrouter);
app.use("/Equipments", equipmentrouter);
app.use("/ConfirmedOrders", confirmrouter);

app.use('/api', whatsappRoute);

app.use("/Notification", routerNotification);
app.use("/Password", routerPassword);

app.use("/requiments",routerRequiment);
app.use("/feedback",routerfeedback);
app.use('/progressuploads', express.static('progressuploads'));


//ajtdQYIXjaiZbNli
//mongoose.connect("mongodb+srv://janithsdissanayaka:ajtdQYIXjaiZbNli@cluster0.n2zxb.mongodb.net/")
//mongoose.connect("mongodb://0.0.0.0:27017/CCMS")


// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Login function
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ err: "User not found" });
        }
        // Verify password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            return res.json({ 
                status: "ok", 

                userrole: user.userrole,
                userIds: user.userid, // Return the user's role
                username: user.name, // Include username for frontend
                userId: user._id,
                username: user.email


            });
        } else {
            return res.json({ err: "Incorrect password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Server error" });
    }
});

// Logout route
app.get("/logout", (req, res) => {
    res.json({ status: "ok", message: "Logged out successfully" });
});



//////////////////////////////////////////////////////////////////////Img Part
require("./Model/ImgModel");
const Img = mongoose.model("ImgModel");

// Configure upload directory
const uploadDir = path.join(__dirname, "./uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Created upload directory:", uploadDir);
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});



const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpe?g|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
});


app.post("/uploadImg", upload.single("image"), async (req, res) => {
    try {
        const {projectId} = req.body
        if (!req.file) {
            return res.status(400).json({ status: "error", message: "No file uploaded" });
        }

        const newImage = await Img.create({ 
            ProjectId: projectId,
            Image: req.file.filename,
            path: `/files/${req.file.filename}`,
            size: req.file.size,
            mimetype: req.file.mimetype
        });

        res.json({ 
            status: "ok",
            filename: req.file.filename,
            path: newImage.path
        });
    } catch (error) {
        console.error("Upload error:", error);
        if (req.file) {
            fs.unlinkSync(path.join(uploadDir, req.file.filename));
        }
        res.status(500).json({ 
            status: "error",
            message: error.message || "Upload failed" 
        });
    }
});


// Display Images  
app.get("/getImage/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const images = await Img.find({ProjectId: id}).sort({ createdAt: -1 });
        
        res.json({ 
            status: "ok", 
            data: images.map(img => ({
                _id: img._id,
                Image: img.Image,
                path: img.path,
                createdAt: img.createdAt
            }))
        });
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ 
            status: "error",
            message: "Failed to fetch images" 
        });
    }
});

// Display Images  
app.get("/getImages", async (req, res) => {
    try {

        const images = await Img.find({}).sort({ createdAt: -1 });
        res.json({ 
            status: "ok", 
            data: images.map(img => ({
                _id: img._id,
                Image: img.Image,
                path: img.path,
                createdAt: img.createdAt
            }))
        });
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ 
            status: "error",
            message: "Failed to fetch images" 
        });
    }
});



// Delete Image Endpoint
app.delete("/deleteImage/:id", async (req, res) => {
    try {
        const img = await Img.findById(req.params.id);
        if (!img) {
            return res.status(404).json({ 
                status: "error", 
                message: "Image not found" 
            });
        }

        // Delete file from storage
        const filePath = path.join(uploadDir, img.Image);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Delete record from database
        await Img.findByIdAndDelete(req.params.id);

        res.json({ 
            status: "ok",
            message: "Image deleted successfully"
        });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ 
            status: "error",
            message: "Failed to delete image" 
        });
    }
});


//paymentgtway endpoint
app.post("/api/payments/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: "usd", // Use "usd" or any supported currency; LKR may be unsupported for card payments
      description: 'Order payment for construction materials',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Payment Intent Error:", err.message);
    res.status(500).send({ error: err.message });
  }
});

// Serve static files
app.use("/files", express.static(uploadDir));
//sms payment
app.use("/api", require("./Router/send-sms"));



// Enhanced error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ 
            success: false,
            error: "Invalid or missing authentication token" 
        });
    }

    res.status(500).json({ 
        success: false,
        error: err.message || "Internal server error" 
    });
});

// Serve static files from uploads directory-InventoryManager
app.use('/materialuploads', express.static(path.join(__dirname, 'materialuploads')));
//serve static file-bill images 
app.use("/billuploads", express.static(path.join(__dirname, "billuploads")));



// Handle 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Endpoint not found"
    });
});


// Database connection and server startup
db
    .then(() => {
        console.log("MongoDB connection successful");
        
       
        mongoose.connection.db.collection('tasks').indexes()
            .catch(err => console.error("Error checking indexes:", err));

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });