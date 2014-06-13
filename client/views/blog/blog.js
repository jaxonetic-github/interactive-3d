Template.blog.events({
	'submit #blog-form': function(e){
		e.preventDefault();
		var title = $('#blog-title').val();
		var body = $('#blog-body').val(); 
		
		if(title.length && body.length){
			Meteor.call('submitPost', title, body);
		}
	}
})

Template.listBlogs.blogs = function(){
	return Blogs.find();
}
