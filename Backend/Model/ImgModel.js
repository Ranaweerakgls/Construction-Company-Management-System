const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require("fs");
const path = require("path");

// Configure upload directory path
const uploadDir = path.join(__dirname, "../uploads");

const ImgSchema = new Schema({
    ProjectId: {
        type: Schema.Types.ObjectId,
        ref: "Monitoring",
        required: true
    },
    Image: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\.(jpg|jpeg|png|gif|webp)$/i.test(v);
            },
            message: props => `${props.value} is not a valid image file!`
        }
    },
    path: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.startsWith('/files/');
            },
            message: props => `${props.value} must start with '/files/'`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true // Added for faster sorting
    },
    size: {
        type: Number,
        required: true,
        min: 1 // File must be at least 1 byte
    },
    mimetype: {
        type: String,
        required: true,
        enum: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    }
}, {
    versionKey: false,
    timestamps: false // We're using custom createdAt instead
});

// Add pre-delete hook to clean up files
ImgSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    try {
        const filePath = path.join(uploadDir, this.Image);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted file: ${filePath}`);
        }
        next();
    } catch (err) {
        console.error(`Error deleting file for ${this.Image}:`, err);
        next(err);
    }
});

// Add static method for safe deletion
ImgSchema.statics.safeDelete = async function(id) {
    try {
        const img = await this.findById(id);
        if (!img) {
            throw new Error('Image not found');
        }
        await img.deleteOne();
        return { success: true, message: 'Image deleted successfully' };
    } catch (error) {
        console.error('Safe delete error:', error);
        throw error;
    }
};

// Add static method for bulk deletion
ImgSchema.statics.cleanupOrphanedFiles = async function() {
    try {
        const dbFiles = await this.find({}, 'Image');
        const storedFiles = fs.readdirSync(uploadDir);
        
        const orphanedFiles = storedFiles.filter(
            file => !dbFiles.some(dbFile => dbFile.Image === file)
        );
        
        orphanedFiles.forEach(file => {
            const filePath = path.join(uploadDir, file);
            fs.unlinkSync(filePath);
            console.log(`Cleaned up orphaned file: ${file}`);
        });
        
        return {
            scanned: storedFiles.length,
            removed: orphanedFiles.length
        };
    } catch (error) {
        console.error('Orphaned files cleanup error:', error);
        throw error;
    }
};

module.exports = mongoose.model("ImgModel", ImgSchema);