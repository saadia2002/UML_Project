const mongoose = require('mongoose');

const diagnostiqueSchema = new mongoose.Schema({
 
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

module.exports = mongoose.model('Diagnostique', diagnostiqueSchema);
