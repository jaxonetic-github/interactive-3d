Meteor.methods({
	'submitChatPost': function(chatText){
						console.log("chatter chatted"+chatText);
						ChatHistory.insert({chatText:chatText, date:Date.now});
						console.log(ChatHistory.find().count());
	},
	'submitBlogPost': function(title, body){
						Blogs.insert({title:title, body:body, date:Date.now});
	},
	'submitReferencePost': function(title,url, description){
					 	References.insert({title:title,url:url, description:description, date:Date.now});
	}
})

Meteor.publish("ChatHistory", function(chatPostsCursor){
	return ChatHistory.find({}, {limit:6, skip:chatPostsCursor});
})
