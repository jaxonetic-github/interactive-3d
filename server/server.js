Meteor.methods({
	'submitChatPost': function(chatText){
						console.log(chatText);
						ChatPosts.insert({chatText:chatText, date:Date.now});
	},
	'submitBlogPost': function(title, body){
						Blogs.insert({title:title, body:body, date:Date.now});
	},
	'submitReferencePost': function(title,url, description){
					 	References.insert({title:title,url:url, description:description, date:Date.now});
	},
	'submitMultiChatSession': function(session_id){
		 RTCSessions.insert({session_id:session_id, numUsersInSession:1, date:Date.now});		
	}
})

Meteor.publish("chatPosts", function(chatPostsCursor){
	return ChatPosts.find({}, {limit:6, skip:chatPostsCursor});
})
