/*
 * This library wraps the Google Feed API.
 * This library needs a div with id "mynews-feed" in document, where it puts all the results.
 * Methods that are required to be invoked from outside the API :
 * 	1. loadNewsPage(callback) 	: Loads the API
 *							   	  argument is method from caller API (calledback when the feeds are loaded)
 *	2. refreshNewsFeed()		: Auto update the news
 *	3. setNewsType(typeIndex)	: Set the news category and reload news
 *								  Argument typeIndex represent the news category type as 
 *									1 Top news 
 *									2 Business
 *									3 Sports
 *									4 Entertainmnt
 *	4. setNewsChannel(channelIndex)
 *								 Change the news source and reload . channelIndex represents the CNN when 1  and  Google for 0.
 *
 *	5. getCurrentNewsChannel()	: To access the currently displayed news source (google or cnn) .
 *  6. getCurrentNewsChannel()	: To access the currently displayed news category .
 *	7. getNewsChannelNames() 	: returns arrey containig the available news sources.
 *	8. getNewsTypeNames()		: returns arrey containig the avilable news categories.
*/

// represents a NewsSource instance for Google News
var googleNews ;
// represents a NewsSource instance for CNN News
var cnnNews;
//Represents the current NewsPage (source, news category)
var newsPage ;

//Loads the API
//callback : The method from caller API that will be invoked when the feeds are loaded
function loadNewsPage(callback){
	showLoadingAnimation();
	google.load("feeds","1");
	
	//Create the news sources
	googleNews = new NewsSource("Google","http://news.google.com/?output=rss","http://news.google.com/?topic=b&output=rss","http://news.google.com/?topic=s&output=rss","http://news.google.com/?topic=e&output=rss");
	cnnNews  = new NewsSource("CNN" ,"http://rss.cnn.com/rss/edition.rss", "http://rss.cnn.com/rss/edition_business.rss","http://rss.cnn.com/rss/edition_sport.rss","http://rss.cnn.com/rss/edition_entertainment.rss");
	newsPage = new NewsPage(googleNews,"topNews",callback);	
	
	//Initilize the Google Feed API
	google.setOnLoadCallback(newsPage.init);
}	

// Auto update the news
function refreshNewsFeed(){
	newsPage.reLoad();
}

/*Set the news category and reload news
Argument typeIndex represent the news category type as 
 *	1 Top news 
 *	2 Business
 *	3 Sports
 *	4 Entertainmnt		 */ 
function setNewsType(genreIndex){
	var typeName ;
	switch(genreIndex){			
			case   2 : 	typeName = "business";
			break;
			
			case   3: 	typeName =	"sports";
			break;
			
			case 4:		typeName =  "entertainment";
			break;	
			
			default : 	typeName ="topNews";
		}
		
	newsPage.setGenre(typeName); 	
}

//Change the news source and reload . channelIndex represents the CNN when 1  and  Google for 0.
function setNewsChannel(channelIndex){
	var source;
	if(channelIndex==1){
		source = cnnNews;
	}else {		
		source = googleNews;
	}
	
	if(source != newsPage.currentSource){
		newsPage.setNewsSource(source);
	}
}

//Getter methods
function getCurrentNewsChannel(){
	return newsPage.currentSource.source;
}
function getCurrentNewsType(){
	return newsPage.currentGenre;	
}

function getNewsChannelNames(){
	var channels=["Google","CNN"];
	return channels;
}

function getNewsTypeNames(){
	var newsTypeNames=["Top News","Business news","Sports News","Entertainment"];
	return newsTypeNames;
}

//represents an instance of the new source
function NewsSource (name , topUrl,businessUrl,sportsUrl,entertainmentUrl) {
	this.source = name;
    this.topNews = topUrl;
    this.business = businessUrl;
	this.sports = sportsUrl;
	this.entertainment = entertainmentUrl;
	
	this.getUrl = function(genreName) {
        var url ; 
		
		switch(genreName){			
			case  "business" : 
				url = this.business;
			break;
			
			case  "sports" : 
				url = this.sports;
			break;
			
			case  "entertainment" : 
				url = this.entertainment;
			break;			
			default : url = this.topNews;
		}
		return url;
    };
}

//represents a current instance of the news page
function NewsPage (source,genre,callback) {
	this.currentSource = source;
	this.currentGenre = genre;
	this.callback = callback
	
	//Invoked each time news are loaded
	this.reLoad = function() {
        //Reload the page
		//Ensure all dependensy taken care of.

		try{
			showLoadingAnimation();
			var feed = new google.feeds.Feed(newsPage.currentSource.getUrl(newsPage.currentGenre));		
			feed.load(processFeeds);
		}catch(error){
			loadingFailed(error);		
		}
    };
	
	//Invoked when first time the page is loaded
	this.init = function() {
		var feed = new google.feeds.Feed(newsPage.currentSource.getUrl(newsPage.currentGenre));		
		feed.load(processFeeds);
		callback();

    };
	
	this.setGenre = function(genreName) {
       newsPage.currentGenre = genreName;
	   newsPage.reLoad();
    };	
	this.setNewsSource = function(source) {
       newsPage.currentSource = source;
	   newsPage.reLoad();
    };
}

//Puts the news feed in dic named "mynews-feed" of the document
function processFeeds(result){
	if(!result.error){
		var container = document.getElementById("mynews-feed");
		
		//remove all current nodes in "mynews-feed" div
		while (container.firstChild !=null) {
			container.removeChild(container.firstChild);
		}

		for(var i =0;i<result.feed.entries.length && i<=5;i++){
			var entry = result.feed.entries[i];
			var feedDiv = document.createElement("div");
			var feedBody = "<h3>"+entry.title+"</h3><hr>";
			feedBody = feedBody + "<p>"+entry.content+"</p>";
			//Use the Read more links for IE only
			if(navigator.appName == 'Microsoft Internet Explorer'){
				var newslink  ="<hr><a href target=\"_blank\" href=\""+entry.link+"\">Read more</a> </p>";
				feedBody = feedBody + newslink;	
			}
			feedDiv.innerHTML = feedBody;
			container.appendChild(feedDiv);
		}
	}
}

function loadingFailed(error){
	//Display Error messages if not able to load feeds
	var message = ("Could not load feeds.\n");
	message+=("Message : "+error.message);
	message+="\n\nPossible causes \n";
	message+="  1. Internet connection not available. \n";
	message+="  2. The feed links are down. \n";
	message+="  3. The feed links are blocked on your server. ";
	alert(message);
}

function showLoadingAnimation(){
	var container = document.getElementById("mynews-feed");	
	var loadingDiv = document.createElement("div");	
	//remove all current nodes in "mynews-feed" div
	while (container.firstChild !=null) {
		container.removeChild(container.firstChild);
	}
	loadingDiv.style.backgroundColor = "#FFFFFF";
	loadingDiv.innerHTML = "<h1>Loading MyNews page</h1>"
	loadingDiv.innerHTML += "<img src=\"images/loading.gif\">"
	loadingDiv.textAlign="center";
	
	container.appendChild(loadingDiv);
}