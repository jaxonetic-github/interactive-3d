var PAGE_SIZE = 6;
Session.setDefault("PostsCursor",0);

Deps.autorun(function(){
	Meteor.subscribe("ChatHistory", Session.get('PostsCursor'));	
})
		


Template.chat_input.events({
	'submit #chatpost-form': function(e){
		e.preventDefault();
		console.log("SUBMITTING");
		var chatText = $('#posttext').val(); 
		
		if(chatText.length){
			Meteor.call('submitChatPost', chatText);
			$('#posttext').val(""); 
		}
	}});
	
Template.chat_history.events({
	
	'click .previous ': function(evt, tmpl){
		console.log("previous");
		console.log("chatcursor@=",Session.get("PostsCursor"));
		if(Number(Session.get("PostsCursor")) >=PAGE_SIZE ){
			Session.set("PostsCursor", Number(Session.get("PostsCursor"))-PAGE_SIZE)
		}
		console.log("chatcursor@=",Session.get("PostsCursor"));
	},
	
	'click .next ': function(evt, tmpl){
		console.log("next");
		
			Session.set("PostsCursor", Number(Session.get("PostsCursor"))+PAGE_SIZE);
			console.log("chatcursor@=",Session.get("PostsCursor"));
	}
	
	
})
Template.chat_history.helpers({
	nextText : function(){
	var tmp = Number(Session.get("PostsCursor"))+PAGE_SIZE ;
	console.log(tmp);
	//Session.set("PostsCursor",tmp);
	return (Number(Session.get("PostsCursor"))+PAGE_SIZE) +" - " + (Number(Session.get("PostsCursor"))+12) ;
},
	previousText : function(){
	console.log(Session.get("PostsCursor"));
	if(Number(Session.get("PostsCursor"))<PAGE_SIZE){
		return "";
	}
	//Session.set("PostsCursor",(Number(Session.get("PostsCursor"))-PAGE_SIZE)); 
	return (Number(Session.get("PostsCursor"))-PAGE_SIZE+1) +" - " + (Number(Session.get("PostsCursor"))) ;
},

chatHistory: function(){
	
	console.log("inside chat_posts",ChatHistory.find().count());
		//Meteor.subscribe("ChatHistory", Session.get('PostsCursor'));
	//console.log();
	 return ChatHistory.find();
}
})

