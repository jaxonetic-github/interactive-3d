Router.configure({layoutTemplate:'layout'})

Router.map(function(){
	
	this.route('home', {path:'/'});
	this.route('blog_home', {path:'blog'});
})
