//This library creates the UI for the application

//HTML text in the option link in left pane when a category is not selected 
var topLinkUnselectedText = "<a href= \"#\" onclick= \"setSelectedNewsTypeLink(&quot;topNewsLink&quot;)\" class= \"optionLink\">Top News</a> ";
var businessLinkUnselectedText = "<a href= \"#\" onclick= \" setSelectedNewsTypeLink(&quot;businessNewsLink&quot;)\" class= \"optionLink \">Business News </a> ";
var sportsLinkUnselectedText = "<a href= \"#\" onclick= \" setSelectedNewsTypeLink(&quot;sportsNewsLink&quot;)\" class= \"optionLink \">Sports News</a>";
var enterLinkUnselectedText = "<a href= \"#\" onclick= \" setSelectedNewsTypeLink(&quot;entertainmentNewsLink&quot;)\" class= \"optionLink \">Entertainment</a>";

//HTML text in the option link in left pane when a category is selected 
var topLinkSelectedText = "Top News";
var businessLinkSelectedText  = "Business News";
var sportsLinkSelectedText = "Sports News";
var enterLinkSelectedText = "Entertainment";

//HTML text to display the news source not selected
var googleUnSelectedText = "<a href= \"#\" onclick= \" setGoogleSelecetd()\" ><img src=\"images/google_on.jpg\" width=\"60px\" height=\"23px\"></a> ";
var cnnUnSelectedText = "<a href= \"#\" onclick= \" setCNNSelecetd()\" ><img src=\"images/cnn_on.jpg\" width=\"60px\" height=\"23px\"></a> ";

//HTML text to display the selected news source  
var googleSelectedText = "<img src=\"images/google_off.jpg\" width=\"60px\" height=\"23px\"> ";
var cnnSelectedText = "<img src=\"images/cnn_off.jpg\" width=\"60px\" height=\"23px\"> ";


//Refresh time for timer
var autoRefreshTime = 60; // Duration at which autoupdate takes place
var autoRefresh = true;  // Is auto-update enabled/disabled
var timeToAutoRefresh = autoRefreshTime; //time left for next update in seconds

//HTML text for displaying the counter for time left to auto update
var refreshCounterEnabledText = "auto-update in <div id=\"refresh-counter\" style=\"display:inline;\">5 </div> seconds";
var refreshCounterDisabledText = "<!--auto refresh off-->";

//HTML text to display the auto-update option button
var autoRefreshgButtonEnabledText = "<a href= \"#\" onclick= \"setAutoRefresh(false)\" ><img src=\"images/auto-update_on.jpg\" width=\"70px\" height=\"23px\"></a>";
var autoRefreshgButtonDisabledText = "<a href= \"#\" onclick= \"setAutoRefresh(true)\"><img src=\"images/auto-update_off.jpg\" width=\"70px\" height=\"23px\"></a>";

//HTML text to take the user defined auto-update interval
var timerSetterText = "auto-update every &nbsp; <input type=\"text\" id=\"interTimerinput\" size=\"4\" onblur=\"removeTimerSetter(true)\" onkeypress=\"timerSetterEntered(event.keyCode)\"></input> seconds";

//This loads the ui and core API
function loadNews(){
	try{
		loadNewsPage(loadNewsPageUI);	
	}catch(error){
		loadingFailed(error);		
	}
}

//Loads the ui and library 
function loadNewsPageUI(){	
	setSelectedNewsTypeLink("topNewsLink");
	setAutoRefresh(true);	
	setGoogleSelecetd();
}

//Set the google as selected news source
function setGoogleSelecetd(){	
	document.getElementById("googleNewsbuttonHolder").innerHTML = googleSelectedText;
	document.getElementById("cnnNewsbuttonHolder").innerHTML = cnnUnSelectedText;		
	
	//Set the news source in news lbrary	
	setNewsChannel(0);
}

//Set the CNN news as source for news
function setCNNSelecetd(){	
	document.getElementById("googleNewsbuttonHolder").innerHTML = googleUnSelectedText;
	document.getElementById("cnnNewsbuttonHolder").innerHTML = cnnSelectedText;	
	//Set teh news source in news lbrary	
	setNewsChannel(1);
}

//Displays the input type for taking user defined update interval
function displayTimerSetter(){
	document.getElementById("set-update-interval").innerHTML = timerSetterText;
	document.getElementById("interTimerinput").focus();
}

//Sets update time if setTime is true
function removeTimerSetter(setTime){
	var updateTime ; 
	if(setTime){
		updateTime=parseInt(document.getElementById("interTimerinput").value);
		if(!isNaN(updateTime)){
			setAutoRefreshTime(updateTime);
		}
	}
	document.getElementById("set-update-interval").innerHTML = "";	
}

//Set the auto-update time
function setAutoRefreshTime(time){
	autoRefreshTime = time;
	timeToAutoRefresh=time;
}

//Invoked when an input is made for setting update interval
function timerSetterEntered(keyPressed){
	if(keyPressed == 13 ){
		removeTimerSetter(true);
	}else if(keyPressed == 27){
		removeTimerSetter(false);		
	}
}

//The text for refresh-counter div must be set before invoking this
function timer(){
	if(autoRefresh){
		document.getElementById("timer-pane").innerHTML = "auto update in "+(timeToAutoRefresh)+" seconds";
		setTimeout("timer()",1000);
		timeToAutoRefresh = timeToAutoRefresh-1;
		if(timeToAutoRefresh == -1){
			timeToAutoRefresh = autoRefreshTime;
			doAutoRefresh();
		}
	}
}

function setAutoRefresh(refresh){
	autoRefresh = refresh;
	if(refresh){
		//Set refresh procedures on		
		document.getElementById("timer-pane").innerHTML = refreshCounterEnabledText;
		document.getElementById("refresh-option-pane").innerHTML = autoRefreshgButtonEnabledText;
		displayTimerSetter();
		timer();
	}else {
		//Set refresh procedures off
		//Remove the time left message
		document.getElementById("refresh-option-pane").innerHTML = autoRefreshgButtonDisabledText;
		document.getElementById("timer-pane").innerHTML = refreshCounterDisabledText;
	}
}

function doAutoRefresh(){
	refreshNewsFeed();
}

function setSelectedNewsTypeLink(linkName){
	//set all links unselected
	document.getElementById("topNewsLink").innerHTML = topLinkUnselectedText;
	document.getElementById("businessNewsLink").innerHTML = businessLinkUnselectedText;
	document.getElementById("sportsNewsLink").innerHTML = sportsLinkUnselectedText ;
	document.getElementById("entertainmentNewsLink").innerHTML = enterLinkUnselectedText;
	
	//Select the selected link
	linkP = document.getElementById(linkName);
	linkP.style.color = "#FFCC00";
	
	switch(linkName){
		case "topNewsLink" : 	
			linkP.innerHTML = topLinkSelectedText;	
			topLinkSelected();
		break;
		
		case "sportsNewsLink" : 	
			linkP.innerHTML = sportsLinkSelectedText;
			sportsLinkSelected();
		break;		
		
		case "businessNewsLink" : 	
			linkP.innerHTML = businessLinkSelectedText;
			businessLinkSelected();
		break;

		case "entertainmentNewsLink" : 	
			linkP.innerHTML = enterLinkSelectedText;
			enterLinkSelected();
	}	
}

//Set the current news category to top news
function topLinkSelected (){
	document.getElementById("news-title-pane").innerHTML = "<h1>Top News</h1><hr>";
	//Set the news type in news library
	setNewsType(1);
}

//Set the current news category to Business news
function businessLinkSelected (){
	document.getElementById("news-title-pane").innerHTML = "<h1>Business News</h1><hr>";
	//Set the news type in news library
	setNewsType(2);
}

//Set the current news category to Sports news
function sportsLinkSelected (){
	document.getElementById("news-title-pane").innerHTML = "<h1>Sports News</h1><hr>";
	//Set the news type in news library
	setNewsType(3);
}	

//Set the current news category to entertainment
function enterLinkSelected (){
	document.getElementById("news-title-pane").innerHTML = "<h1>Entertainment</h1><hr>";
	//Set the news type in news library
	setNewsType(4);
}