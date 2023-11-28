const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieListSchema = new Schema({
    id : {
        type : Number,
        required: true,
        unique : true
    },
    title: String,
    coverImg : String,
    summary : String,
    genres: Array
},{collection:'movielist'});

movieListSchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
  };
  
module.exports = mongoose.model('Movies', movieListSchema);