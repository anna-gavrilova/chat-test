const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
const _=require('underscore')
var fs=require('fs');
const User=require('./user')
const Message=require('./message');

var schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    }
  };

const conversationSchema=mongoose.Schema({
    members:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    dateOfCreation:Date,
    messageHistory:[{ type: Schema.Types.ObjectId, ref: 'Message' }]
},schemaOptions);

conversationSchema.virtual('name')
  .get(function(){
    return _.pluck(this.members,'name').join(",")
  })


conversationSchema.pre('find', function(next) {
  this.populate('members');
  this.populate('messageHistory')
  next();
})

conversationSchema.pre('findOne', function(next) {
  this.populate('members')
  rhis.populate('messages');
  next();
})

module.exports=mongoose.model("Conversation",conversationSchema)