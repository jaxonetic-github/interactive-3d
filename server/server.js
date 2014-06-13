Meteor.methods({
	'submitBlogPost': function(title, body){
						Blogs.insert({title:title, body:body, date:Date.now});
	},
	'submitReferencePost': function(title,url, description){
						References.insert({title:title,url:url, description:description, date:Date.now});
	}
})
