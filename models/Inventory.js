const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['consumable', 'equipment', 'material', 'lab-item', 'medicine', 'other'],
    required: true
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  unit: {
    type: String,
    required: true
  },
  reorderLevel: {
    type: Number,
    required: true,
    default: 10
  },
  costPerUnit: {
    type: Number,
    required: true
  },
  supplier: {
    name: String,
    contact: String,
    email: String
  },
  purchaseHistory: [{
    quantity: Number,
    cost: Number,
    supplier: String,
    date: {
      type: Date,
      default: Date.now
    },
    invoiceNumber: String
  }],
  expiryDate: Date,
  location: String,
  notes: String,
  lowStockAlert: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Check low stock and set alert
inventorySchema.pre('save', function(next) {
  this.lowStockAlert = this.quantity <= this.reorderLevel;
  next();
});

module.exports = mongoose.model('Inventory', inventorySchema);
