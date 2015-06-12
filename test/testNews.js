// googleNews ;
// cnnNews;
// newsPage currentSource currentGenre reLoad();
//	entertainment sports business topNews

function loadTest(){
	//testNewsPage();
	//setTimeout("testNewsSourceChange()",3000);
	//setTimeout("testNewsGenreChange()",6000);
	//setTimeout("testGetterMethods()",5000);
	alert("Yeah...called back.");
	setTimeout("testRefreshNewsFeed()",5000);

}
function testRefreshNewsFeed(){
		alert("reloading news...");
	document.getElementById("mynews-feed").innerHTML = "Deleted , reloading....";
	setTimeout("refreshNewsFeed()",5000);
	toggleNewsSource();
}

var testUpdate=0;
function toggleNewsSource(){
	testUpdate++;
	if(testUpdate%2 == 0){
		
	newsPage.currentSource = googleNews;
	}else {
	newsPage.currentSource = cnnNews;
	}
}
function testGetterMethods(){
	var message="";
	message+="Current source : "+getCurrentNewsChannel();
	message+="\nCurrent genre  : "+getCurrentNewsType();
	message+="\nAll channels  : "+getNewsChannelNames();
	message+="\nAll genres  : "+getNewsTypeNames();
	alert(message);
}

function testNewsGenreChange(){
	document.getElementById("mynews-feed").innerHTML = "";
	setNewsType(3);
	alert("Genre changed");
}
function testNewsSourceChange(){
	document.getElementById("mynews-feed").innerHTML = "";
	setNewsChannel(1);
	alert("Source changed");
}


function testNewsPage(){
	var status = "Genre : "+newsPage.currentGenre+"\n";
	status += "Source : "+(newsPage.currentSource.source)+"\n";	
	alert(status);	
	newsPage.currentSource= cnnNews;
	newsPage.currentGenre = "entertainment";
	newsPage.reLoad();
}

function testNewsSource(){
	//google.load("mynews-feeds","1");
	//googleNews = new NewsSource("Google","http://news.google.com/?output=rss","http://news.google.com/?topic=b&output=rss","http://news.google.com/?topic=s&output=rss","http://news.google.com/?topic=e&output=rss");
	//cnnNews  = new NewsSource("CNN" ,"http://rss.cnn.com/rss/edition.rss", "http://rss.cnn.com/rss/edition_business.rss","http://rss.cnn.com/rss/edition_sport.rss","http://rss.cnn.com/rss/edition_entertainment.rss");

	var status = "Google news top url  : "+googleNews.getUrl("top");
	alert(status);	
}


    
	