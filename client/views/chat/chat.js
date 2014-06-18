Session.setDefault("chatPostsCursor",0);

Meteor.autorun(function(){
	Meteor.subscribe("chatP osts", Session.get('chatPostsCursor'))
})


Template.chat_input.nextText = function(){
	return (Number(Session.get(chatPostsCursor))+20) +" - " + (Number(Session.get(chatPostsCursor))+40) ;
}
Template.chat_input.previousText = function(){
	if(Number(Session.get(chatPostsCursor))<20){
		return "";
	}
	return (Number(Session.get(chatPostsCursor))-20) +" - " + (Number(Session.get(chatPostsCursor))) ;
}


Template.chat_input.events({
	'submit #chatpost-form': function(e){
		e.preventDefault();
		
		var chatText = $('#posttext').val(); 
		
		if(chatText.length){
			Meteor.call('submitChatPost', chatText);
		}
	},
	
	'click .previous ': function(evt, tmpl){
		if(Number(Session.get("chatPostsCursor")) >6 ){
			Session.set("chatPostsCursor", Number(Session.get("chatPostsCursor"))-6)
		}
	},
	
	'click .next ': function(evt, tmpl){
			Session.set("chatPostsCursor", Number(Session.get("chatPostsCursor"))+6)
	}
	
	
})

Template.chat_history.chat_posts= function(){
	return ChatPosts.find();
}
