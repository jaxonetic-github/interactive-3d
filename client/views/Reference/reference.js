Template.reference.events({
	'submit #reference-form': function(e){
		e.preventDefault();
		var title = $('#reference-title').val();
		var body = $('#reference-description').val(); 
		var url = $('#reference-url').val(); 
		
		if(title.length && body.length && url.length){
			Meteor.call('submitPost', title, url,body);
		}
	}
})

Template.listReferences.references = function(){
	return References.find();
}
