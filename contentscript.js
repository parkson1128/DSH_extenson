console.log("contentscript.js running...");


var keyword    ;
var ByTagtitle   ;
var document_title;
var webtitle    ;
var website    ;
var websnippet ;
var query_time ;
var random = Math.floor((Math.random() * 10));   // random  0 ~ 9

var cutword;
var uri_dec;
var url = document.URL;
var open_supporting = 0;
var check_two_clicks = 0;
var button_open="";
var click_szie;


console.log('conten_start ===>>> ');
 
//抓URL
// console.log('document.URL ===>>> ' + document.URL);


//從URL 抓關鍵字  
//console.log(' 在切字串=  ' + url);
// cutword = url.split("q=");
// console.log(' 分割字串000=  ' + cutword[0]);
// console.log(' 分割字串111=  ' + cutword[1]);


keyword = document.getElementById('lst-ib').value;   //抓搜尋關鍵字
createButton(keyword);
// console.log('增加按鈕!!!!');


// keyword     = document.getElementById('lst-ib').value;   //抓搜尋關鍵字
// webtitle    = document.getElementsByClassName("r")[0].innerText;    //抓連結的標題
// website     = document.getElementsByClassName("_Rm")[random].innerText;  //抓連結的網址
// websnippet  = document.getElementsByClassName("st")[random].innerText;   //抓連結的snippet

// console.log('conten_222keyword=  ' + keyword);
// console.log('conten_222webtitle=  ' + webtitle);
// console.log('conten_222website=  ' + website);
// console.log('conten_222websnippet=  ' + websnippet);



//從DOM抓URL在抓關鍵字
/* 				cutword = $(".hdtb-imb").children("a").attr('href');
console.log(' 在切字串=  ' + cutword);


cutword = cutword.split("&");
console.log(' 分割字串=  ' + cutword[0]);
cutword = cutword[0].split("=");
console.log(' 分割字串000=  ' + cutword[0]);
console.log(' 分割字串111=  ' + cutword[1]);
uri_dec = decodeURIComponent(cutword[1]);
console.log('  11你在搜尋什麼!!!=  ' + uri_dec);  */




search_function();
// console.log("執行search_function");



//變更 rcnt的大小					
document.getElementById("rcnt").setAttribute("style","clear:both;position:relative;zoom:1;width:1600px;"); 
document.getElementById("hdtb-msb").setAttribute("style","width:1300px;"); 

//放一個縮圖網站的網址
$("#rcnt").append('Website thumbnails by <a href="https://www.bitpixels.com/">BitPixels</a>');

//增加頁籤的外圍DIV
$("#rhs").prepend("<div id='tabdiv'></div>");  //加在前面	


//調整頁籤的位置
// document.getElementById("tabdiv").setAttribute("style","float:right; margin-left:50px; width:950px;"); 
// document.getElementById("tabdiv").setAttribute("style","float:right; margin-left:460px; width:1450px;"); 
	

///////////////////////分隔線///////////////////////


function show(){ //功能全部顯示
	
	document.getElementById("clicktab01").setAttribute("style","display:none"); 
	document.getElementById("divsectab").setAttribute("style","display:none"); 
	document.getElementById("wordcloud_svg01").setAttribute("style","display:none"); 
}

function show02(){ //功能全部隱藏
	
	document.getElementById("clicktab01").setAttribute("style","display:block"); 
	document.getElementById("divsectab").setAttribute("style","display:block"); 
	document.getElementById("wordcloud_svg01").setAttribute("style","display:block"); 

}

function hide02(){ //出現功能全部顯示的按鈕
	
	
	document.getElementById("Query02").setAttribute("style","visibility:hidden"); 
	document.getElementById("Query03").setAttribute("style","visibility:visible"); 
}

function hide03(){ //出現功能全部隱藏的按鈕
	
	
	document.getElementById("Query02").setAttribute("style","visibility:visible"); 
	document.getElementById("Query03").setAttribute("style","visibility:hidden"); 
	
}

function cheak_task_yes(){  //執行連接task，點yes

			var taskid = $("#task_check_01").attr('taskid');
			console.log('taskid=' + taskid); 

			document.getElementById("task_check_01").setAttribute("style","visibility:hidden"); 
			document.getElementById("task_check_02").setAttribute("style","visibility:hidden"); 
			document.getElementById("task_text_01").setAttribute("style","visibility:hidden"); 
			document.getElementById("task_text_02").setAttribute("style","visibility:hidden"); 
			
			$.ajax({        
				    
				url: 'https://140.116.39.177/Dexterous_Search_Helper/ajax_cheak_task_yes.php',         
				dataType: "html",             
				type:'GET',         
				data: {
					taskid:taskid,
				},           
				error: function(xhr,ajaxOptions, thrownError) {           
					console.log('cheak_task_Yes 發生錯誤,請聯絡網站管理員');  
					console.log(thrownError);   	
					console.log(ajaxOptions);   			
					console.log(xhr.responseText);			
				},         
				success: function(response) {                   
					if(response){ 

						//console.log(response);
						console.log("cheak_task_Yes_end  " + response);
						//cutword = $(".hdtb-mitem hdtb-imb").attr('taskid');
						
						//<img src=https://140.116.39.177/Dexterous_Search_Helper/savewebimg/yes.png>
						// $("#task_check_01").append('<img src=https://140.116.39.177/Dexterous_Search_Helper/yes.png>');
						$("#hdtb-msb").append('<img src=https://140.116.39.177/Dexterous_Search_Helper/yes.png>');
						
						
						// setTimeout(function(){   //延遲1秒，避免抓不到網頁資料
						// }, 1000); //end setTimeout
						
						
					}else{
								
						console.log("cheak_task_Yes_else:" + response);

					}
				}
			});
			
}//End function

function cheak_task_no(){  //執行分開task，點no

			var taskid = $("#task_check_02").attr('taskid');
			console.log('taskid=' + taskid); 
			
			document.getElementById("task_check_01").setAttribute("style","visibility:hidden"); 
			document.getElementById("task_check_02").setAttribute("style","visibility:hidden"); 
			document.getElementById("task_text_01").setAttribute("style","visibility:hidden"); 
			document.getElementById("task_text_02").setAttribute("style","visibility:hidden"); 
			
	
			$.ajax({        
				    
				url: 'https://140.116.39.177/Dexterous_Search_Helper/ajax_cheak_task_no.php',         
				dataType: "html",             
				type:'GET',         
				data: {
					taskid:taskid,
				},           
				error: function(xhr,ajaxOptions, thrownError) {           
					console.log('cheak_task_no 發生錯誤,請聯絡網站管理員');  
					console.log(thrownError);   	
					console.log(ajaxOptions);   			
					console.log(xhr.responseText);			
				},         
				success: function(response) {                   
					if(response){ 

						//console.log(response);
						console.log("cheak_task_no_end  " + response);
						//cutword = $(".hdtb-mitem hdtb-imb").attr('taskid');
						$("#hdtb-msb").append('<img src=https://140.116.39.177/Dexterous_Search_Helper/no.png>');
						
					}else{
								
						console.log("cheak_task_no_else:" + response);

					}
				}
			});
			
}//End function

function createButton(keyword){  //建立按鈕
	
	//創第一個按鈕  用<input>製作
	var node = document.createElement("input");
	node.setAttribute("type", "button");	
	node.setAttribute("value", "手動開啟輔助功能");	
	node.setAttribute("id", "addQuery");
	node.setAttribute("onclick", "javascript:{this.disabled=true;}");  //點擊後變灰色
	
	document.getElementById("hdtb-msb").appendChild(node);
	
	// var textnode_button= document.createTextNode("&nbsp;");
	// document.getElementById("hdtb-msb").appendChild("&nbsp;");
	
	//加上空白
	node = document.createElement("a");
	node.innerHTML = "&nbsp;&nbsp;&nbsp;";	
	document.getElementById("hdtb-msb").appendChild(node);

	// node.setAttribute("onclick", "javascript:{this.disabled=true;}");  //點擊後變灰色
	

		
	var onclick;
	var node02;
	

	//這是呼叫JS裡面的 addQueryResult()，並不是呼叫HTML裡面的
	var x = document.getElementById("addQuery");
	// console.log("XXXXXXXXXXX = " + x);
	x.addEventListener("click", addQueryResult);
	

	var node02 = document.createElement("input");
	node02.setAttribute("type", "button");
	node02.setAttribute("value", "功能全部隱藏");
	node02.setAttribute("id", "Query02");
	node02.setAttribute("style","visibility:hidden");
	// node02.setAttribute("style","visibility:visible");
	document.getElementById("hdtb-msb").appendChild(node02);
	
	
	//這是呼叫JS裡面的 function，並不是呼叫HTML裡面的
	var x = document.getElementById("Query02");

	x.addEventListener("click", show);		
	x.addEventListener("click", hide02);
	
	
	
	var node03 = document.createElement("input");
	node03.setAttribute("type", "button");
	node03.setAttribute("value", "功能全部顯示");
	node03.setAttribute("id", "Query03");
	node03.setAttribute("style","visibility:hidden"); 
	// node03.setAttribute("style","visibility:visible"); 

	document.getElementById("hdtb-msb").appendChild(node03);

	//這是呼叫JS裡面的 function，並不是呼叫HTML裡面的
	var x = document.getElementById("Query03");

	x.addEventListener("click", show02);
	x.addEventListener("click", hide03);
	
	
	//加上空白
	node = document.createElement("a");
	node.innerHTML = "&nbsp;&nbsp;&nbsp;";	
	document.getElementById("hdtb-msb").appendChild(node);
	
	// var textnode = document.createTextNode("這兩堆關鍵字是有關係的嗎?");
	// document.getElementById("hdtb-msb").appendChild(textnode);

	var node04 = document.createElement("input");
	node04.setAttribute("type", "text");
	// node04.setAttribute("value", "任務第一關鍵字");
	node04.setAttribute("id", "task_text_01");
	// node04.setAttribute("style","visibility:visible"); 
	node04.setAttribute("style","visibility:hidden"); 
	document.getElementById("hdtb-msb").appendChild(node04);
	
	//加上空白
	node = document.createElement("a");
	node.innerHTML = "&nbsp;&nbsp;&nbsp;";	
	document.getElementById("hdtb-msb").appendChild(node);
	
	var node05 = document.createElement("input");
	node05.setAttribute("type", "text");
	// node05.setAttribute("value", "任務第二關鍵字");
	node05.setAttribute("id", "task_text_02");
	// node05.setAttribute("style","visibility:visible"); 
	node05.setAttribute("style","visibility:hidden"); 
	document.getElementById("hdtb-msb").appendChild(node05);
	
	//加上空白
	node = document.createElement("a");
	node.innerHTML = "&nbsp;&nbsp;&nbsp;";	
	document.getElementById("hdtb-msb").appendChild(node);
	
	node04 = document.createElement("input");
	node04.setAttribute("type", "button");
	node04.setAttribute("value", "左邊兩個有關係");
	node04.setAttribute("id", "task_check_01");
	// node04.setAttribute("style","visibility:visible"); 
	node04.setAttribute("style","visibility:hidden"); 
	document.getElementById("hdtb-msb").appendChild(node04);
	
	//這是呼叫JS裡面的 function，並不是呼叫HTML裡面的
	var x = document.getElementById("task_check_01");

	x.addEventListener("click", cheak_task_yes);		
	
	
	//加上空白
	node = document.createElement("a");
	node.innerHTML = "&nbsp;&nbsp;&nbsp;";	
	document.getElementById("hdtb-msb").appendChild(node);
	
	node04 = document.createElement("input");
	node04.setAttribute("type", "button");
	node04.setAttribute("value", "沒有關係");
	node04.setAttribute("id", "task_check_02");
	// node04.setAttribute("style","visibility:visible"); 
	node04.setAttribute("style","visibility:hidden"); 
	document.getElementById("hdtb-msb").appendChild(node04);
	
	//這是呼叫JS裡面的 function，並不是呼叫HTML裡面的
	var x = document.getElementById("task_check_02");

	x.addEventListener("click",cheak_task_no);		

	
} // end function

function hide_button(){   //功能全部隱藏的按鈕
	//創第二個按鈕  用<input>製作
		
		var node02 = document.createElement("input");
		node02.setAttribute("type", "button");
		node02.setAttribute("value", "功能全部隱藏");
		node02.setAttribute("id", "Query02");
		
		document.getElementById("hdtb-msb").appendChild(node02);
		
		
		//這是呼叫JS裡面的 function，並不是呼叫HTML裡面的
		var x = document.getElementById("Query02");

		x.addEventListener("click", show);
		x.addEventListener("click", hide02);
	
}

function show_button(){   //功能全部顯示的按鈕
	
	var node03 = document.createElement("input");
	node03.setAttribute("type", "button");
	node03.setAttribute("value", "功能全部顯示");
	node03.setAttribute("id", "Query03");
	node03.setAttribute("style","visibility:hidden"); 
	
	document.getElementById("hdtb-msb").appendChild(node03);
	


	//這是呼叫JS裡面的 function，並不是呼叫HTML裡面的
	var x = document.getElementById("Query03");
	// console.log("XXXXXXXXXXX = " + x);
	x.addEventListener("click", show02);
	x.addEventListener("click", hide03);
	
	
	
	
}

function addQueryResult() {  //開啟輔助並提供瀏覽點擊紀錄
	
	//抓取候選關鍵字並解析網頁
	autoComplete();
	
	createTab();
	
	get_browser_history();
	get_browser_history02();
	get_browser_history03();
	
	createTab02();
	button_open = "open";
	
	hide03();
	
	
} //end function

function createTab(){  //建立click儲思盆的頁籤表格
	
	$("#tabdiv").append("<div  class='abgne_tab' id='clicktab01' style='display:block'></div>");	
	$("div.abgne_tab").append("<ul class='tabs'></ul>");
	$("div.abgne_tab").append("<div class='tab_container'></div>");

 	// tab01
	$("ul.tabs").append("<li><a href='#tab1' id='tabname1'>click儲思盆-順序↓</a></li>");		
	$("div.tab_container").append("<div id='tab1' class='tab_content'></div>");	
	// $("#tab1").append("<h2>關於作者</h2><p>目前工作是網頁開發為主，因此針對了 HTML, JavaScript, CSS 等知識特別深入研究。若有任何問題，歡迎直接留言或是透過 Mail 討論。</p>");
	
	// tab02
	$("ul.tabs").append("<li><a href='#tab2' id='tabname2'>click儲思盆-次數↓</a></li>");
	$("div.tab_container").append("<div id='tab2' class='tab_content'></div>");	
	// $("#tab2").append("<h2>jQuery is a new kind of JavaScript Library.</h2><p>jQuery is a fast and concise JavaScript Library that simplifies HTML document traversing, event handling, animating, and Ajax interactions for rapid web development. jQuery is designed to change the way that you write JavaScript</p>");
	
	//tab03
	$("ul.tabs").append("<li><a href='#tab3' id='tabname3'>click儲思盆-閱讀時間↓</a></li>");
	$("div.tab_container").append("<div id='tab3' class='tab_content'></div>");	
	// $("#tab3").append("<h2>22222222222222222222222222222222222222222</h2>");
	 
	
	
	//頁籤的活動功能，請勿做任何更改
	$(function(){
		// 預設顯示第一個 Tab
		var _showTab = 0;
		$('.abgne_tab').each(function(){
			// 目前的頁籤區塊
			var $tab = $(this);

			var $defaultLi = $('ul.tabs li', $tab).eq(_showTab).addClass('active');
			$($defaultLi.find('a').attr('href')).siblings().hide();
			
			// 當 li 頁籤被點擊時...
			// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
			$('ul.tabs li', $tab).click(function() {
				// 找出 li 中的超連結 href(#id)
				var $this = $(this),
					_clickTab = $this.find('a').attr('href');
				// 把目前點擊到的 li 頁籤加上 .active
				// 並把兄弟元素中有 .active 的都移除 class
				$this.addClass('active').siblings('.active').removeClass('active');
				// 淡入相對應的內容並隱藏兄弟元素
				$(_clickTab).stop(false, true).fadeIn().siblings().hide();

				return false;
			}).find('a').focus(function(){
				this.blur();
			});
		});
	});
	 
	


	
}//end function

function createTab02(){  //建立關鍵字搜尋結果的頁籤表格
	
	
	$("#tabdiv").append("<div  class='abgne_tab sec_tab' id='divsectab' style='display:block'></div>");	
	$("#divsectab").append("<ul class='tabs' id='sec_tab'></ul>");	
	$("#divsectab").append("<div class='tab_container' id='sec_tab_container'></div>");	
		
	// tab04
	$("#sec_tab").append("<li><a href='#tab4' id='tabname4'></a></li>");	
	$("#sec_tab_container").append("<div id='tab4' class='tab_content'></div>");	
	
 	// tab05
	$("#sec_tab").append("<li><a href='#tab5' id='tabname5'></a></li>");
	$("#sec_tab_container").append("<div id='tab5' class='tab_content'></div>");	
	
	// tab06
	$("#sec_tab").append("<li><a href='#tab6' id='tabname6'></a></li>");
	$("#sec_tab_container").append("<div id='tab6' class='tab_content'></div>");	
	
	// tab07
	$("#sec_tab").append("<li><a href='#tab7' id='tabname7'></a></li>");
	$("#sec_tab_container").append("<div id='tab7' class='tab_content'></div>");	
	
	
	// tab08
	$("#sec_tab").append("<li><a href='#tab8' id='tabname8'></a></li>");
	$("#sec_tab_container").append("<div id='tab8' class='tab_content'></div>"); 
	
	
	//頁籤的活動功能，請勿做任何更改
	$(function(){
		// 預設顯示第一個 Tab
		var _showTab = 0;
		$('.abgne_tab').each(function(){
			// 目前的頁籤區塊
			var $tab = $(this);

			var $defaultLi = $('ul.tabs li', $tab).eq(_showTab).addClass('active');
			$($defaultLi.find('a').attr('href')).siblings().hide();
			
			// 當 li 頁籤被點擊時...
			// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
			$('ul.tabs li', $tab).click(function() {
				// 找出 li 中的超連結 href(#id)
				var $this = $(this),
					_clickTab = $this.find('a').attr('href');
				// 把目前點擊到的 li 頁籤加上 .active
				// 並把兄弟元素中有 .active 的都移除 class
				$this.addClass('active').siblings('.active').removeClass('active');
				// 淡入相對應的內容並隱藏兄弟元素
				$(_clickTab).stop(false, true).fadeIn().siblings().hide();

				return false;
			}).find('a').focus(function(){
				this.blur();
			});
		});
	});
}

function get_browser_history(){   //click儲思盆-依點擊順序排序
	
	$.ajax({         
		url: 'https://140.116.39.177/Dexterous_Search_Helper/ajax_get_browser_history.php',         
		cache: false,         
		dataType: 'html',             
		type:'GET',         
		data: {keyword:keyword},   
		error: function(xhr) {           
			console.log('get history發生錯誤,請聯絡網站管理員');         
		},         
		success: function(response) {                   
			if(response){ 
				$('#tab1').html(response);

			}
		
		}
	});		

	
}

function get_browser_history02(){  //click儲思盆-依點擊次數排序
	
	$.ajax({         
		url: 'https://140.116.39.177/Dexterous_Search_Helper/ajax_get_browser_history02.php',         
		cache: false,         
		dataType: 'html',             
		type:'GET',         
		data: {keyword:keyword},   
		error: function(xhr) {           
			console.log ('get history02 發生錯誤,請聯絡網站管理員');         
		},         
		success: function(response) {                   
			if(response){ 

				$('#tab2').html(response);
			}
		
		}
	});		

	
}

function get_browser_history03(){  //click儲思盆-依閱讀時間排序

	$.ajax({         
		url: 'https://140.116.39.177/Dexterous_Search_Helper/ajax_get_browser_history03.php',         
		cache: false,         
		dataType: 'html',             
		type:'GET',         
		data: {keyword:keyword},   
		error: function(xhr) {           
			console.log ('get history03 發生錯誤,請聯絡網站管理員');         
		},         
		success: function(response) {                   
			if(response){ 

				$('#tab3').html(response);
			}
		
		}
	});		

	
}

function search_function(){  //儲存搜尋關鍵字並偵測點擊次數，符合條件便開啟輔助功能
			$.ajax({       
				url: 'https://140.116.39.177/Dexterous_Search_Helper/ajax_search_new.php',        
				dataType: "JSON",             
				type:'POST',         
				data: {
					keyword:keyword
				},      
				error: function(xhr) {           
					console.log ('search發生錯誤,請聯絡網站管理員');         
				},         
				success: function(response) {              
					if(response){
						
						query_time = response.time;

						// console.log("query_time = " + query_time);
						// console.log("search_log = " + response.log);
						// console.log("response_similarity= " + response.similarity);
						
						// console.log("information_search= " + response.information_search);
						
						click_szie = response.click_size;
						console.log("click_szie = " + click_szie);
						check_two_clicks += click_szie;
						
						if(click_szie >= 2 && button_open !="open" ){
								
							// console.log("check_two_clicks= " + check_two_clicks);
							//有兩次click就開啟輔助功能
					
					
							//DB資料有兩次click 就開啟
							
							createTab();
							get_browser_history();
							get_browser_history02();
							get_browser_history03();
							createTab02();
							autoComplete();
							button_open ="open";
							
							hide03();
							
							// console.log("check_two_clicks開啟");
							
							console.log("DB click >=2 ,button_open 沒有 open");
							console.log("button_open =" + button_open);
				
					
					
						}//End else
						
						//間隔17秒，刷新click儲思盆的頁面，讓縮圖顯示出來
						setInterval(get_browser_history,17000);
						setInterval(get_browser_history02,17000);
						setInterval(get_browser_history03,17000);
						console.log("setInterval 執行 ");
						
						
						
						$(".r").click(function(){   //儲存點擊資料
						
							webtitle = $(this).text();
							// console.log("連結title100= "+ webtitle);	
							website = $(this).children("a").attr('data-href');  //原始抓網址的版本
							// website = $(this).children(".r").attr('href'));
							// website = $(this).parents(".rc").find("._Rm").text();  //還是有時候抓不到網址
							// console.log("連結網址100= "+ website);
							websnippet = $(this).parents(".rc").find(".st").text();
							// console.log("連結snippe100= "+ websnippet);
							
							save_click_record(query_time);
							// console.log("!!!儲存 "+ webtitle +" 點擊紀錄: ");
							check_two_clicks += 1;
							
							
							if(check_two_clicks < 2 && button_open == "open" ){
									
									
									// console.log("進來click <2 ,button_open = open");
									// console.log("button_open =" + button_open);
									// console.log("check_two_clicks= " + check_two_clicks);
									// console.log("check_two_clicks_條件不符，沒有開啟輔助");
								
								
								}else if(check_two_clicks >= 2 && button_open !="open" ){
								
									// console.log("check_two_clicks= " + check_two_clicks);
									//有兩次click就開啟輔助功能
									autoComplete();
									createTab();
									get_browser_history();
									get_browser_history02();
									get_browser_history03();
									createTab02();
									button_open ="open";
									hide03();
									// console.log("check_two_clicks開啟");
									
									// console.log("進來click >=2 ,button_open 不等於 open");
									// console.log("button_open =" + button_open);
								
								
								
								}else if(check_two_clicks >= 1){
									
									get_browser_history();
									get_browser_history02();
									get_browser_history03();
									
									// console.log("進來click >=1 ");
									// console.log("button_open =" + button_open);
									
								}
							
							
							
							
						});  //END	click_function
						
						
						if(response.similarity == 0 ){						
							
							
						}else{							
							
							link_task(); //進行search task連接!
							console.log("進行search task連接!");
							
						}//End else
						
						

					}else{
						
						console.log("Search_else:" + response);

					}//End else
					
					
				}//End success
				
			});//End search ajax 
			
}//End function

function save_click_record(query_time){  //儲存點擊的網站連結
			$.ajax({
       
				url: 'https://140.116.39.177/Dexterous_Search_Helper/ajax_save_click.php',        
				dataType: "JSON",             
				type:'POST',         
				data: {
					keyword:keyword,
					website:website,
					webtitle :webtitle,
					websnippet:websnippet,
					query_time:query_time
				},      
				error: function(xhr) {           
					console.log ('save_click_發生錯誤,請聯絡網站管理員');         
				},         
				success: function(response) {              
					if(response){
						
						//alert(response);  

						// console.log("RUN_儲存點擊紀錄: " + response.status);
						
						
					}else{
						
						console.log("Save_Click_else:" + response);
						

					}
				
				}//End success
				
			});//End ajax 
			
}//End function

function link_task(){  //執行連接task
	
			$.ajax({        
				    
				url: 'https://140.116.39.177/Dexterous_Search_Helper/ajax_link_search_task.php',         
				dataType: "html",             
				type:'GET',         
				data: {
					keyword:keyword,
				},           
				error: function(xhr,ajaxOptions, thrownError) {           
					console.log('link_task 發生錯誤,請聯絡網站管理員');  
					console.log(thrownError);   	
					console.log(ajaxOptions);   			
					console.log(xhr.responseText);			
				},         
				success: function(response) {                   
					if(response){ 

						//console.log(response);
						console.log("link_task_end  " + response);
						
						if(response>=1){
							
							check_task();
						
						}
						
					}else{
								
						console.log("link_task_else:" + response);

					}
				}
			});
}//End function

function check_task(){  //執行check_task比較
	
			$.ajax({        
				    
				url: 'https://140.116.39.177/Dexterous_Search_Helper/ajax_get_search_task.php',         
				dataType: "json",             
				type:'GET',         
				data: {
					keyword:keyword,
				},           
				error: function(xhr,ajaxOptions, thrownError) {           
					console.log('check_task 發生錯誤,請聯絡網站管理員');  
					console.log(thrownError);   	
					console.log(ajaxOptions);   			
					console.log(xhr.responseText);			
				},         
				success: function(response) {                   
					if(response){ 

						//console.log(response);
						console.log("check_task_first  " + response[0]);
						console.log("check_task_second  " + response[1]);
						
						
						// node03.setAttribute("value", "功能全部顯示");
						// node03.setAttribute("id", "Query03");
						// node03.setAttribute("style","visibility:hidden"); task_check_02
						if (!response[0] || !response[1]){
							
							// nothing
						}else {
							//設定名稱
							document.getElementById("task_text_01").setAttribute("value", response[0]);
							document.getElementById("task_text_02").setAttribute("value", response[1]);
							//設定DB的task_ID
							document.getElementById("task_check_01").setAttribute("taskid", response[2]);
							document.getElementById("task_check_02").setAttribute("taskid", response[2]);
							//全部顯示
							document.getElementById("task_text_01").setAttribute("style","visibility:visible");
							document.getElementById("task_text_02").setAttribute("style","visibility:visible");
							document.getElementById("task_check_01").setAttribute("style","visibility:visible");
							document.getElementById("task_check_02").setAttribute("style","visibility:visible");
							
						}
						
				
						
						
						
					}else{
								
						console.log("link_task_else:" + response);

					}
				}
			});
}//End function
	
function autoComplete(){  //解析候選關鍵字並且去搜尋
			var return_class  = new Array();
			

			$.ajax({        
				url: 'https://suggestqueries.google.com/complete/search?client=chrome&q=' + keyword,        
				dataType: "json",             
				type:'get',      
				error: function(xhr) {           
					// alert('autoComplete_發生錯誤,請聯絡網站管理員');         
					console.log('autoComplete_發生錯誤,請聯絡網站管理員');         
				},         
				success: function(response) {              
					if(response){
						
						
						//製作文字雲
						// var combojson = '{"';  //文字雲版本ㄧ
						
						var combojson = '[';
						var txt = "google:suggestrelevance"; //google有權重分數的欄位
						var number = 0;
						
						for (var i=0; i<20; i++){
							/* if(response[1][i]){
								getkeyword = response[1][i];  //抓取關鍵字
								// console.log("11TEST解析候選關鍵字: " + getkeyword+"="+i);
							} */
							
							/* if(response[4]){
								var txt = "google:suggestrelevance";
								getkeyword = response[4][txt][i]; //抓取權重的分數
								// console.log("55TEST解析關鍵字分數: " + getkeyword + "="+i);
							} */
							
							if(response[1][i] && response[4][txt][i]){
							
								// console.log("製作JSON= "+i );
								
								
								var temp = (response[4][txt][i]/25)+(20-i) ;
								
								//過濾候選關鍵字有 HTTP的字樣
								if(response[1][i].indexOf('http://') != -1 || response[1][i].indexOf('https://') != -1   ){
									
									// console.log("沒有加入候選關鍵字=  " + response[1][i] + "="+i);
									
								}else{
									
									if(i>0){
									// combojson += ',"';//文字雲版本ㄧ
									combojson += ',';
									}else{}
									var filterkeyword = response[1][i].replace(keyword,"");
									// console.log("filterkeyword=  " + filterkeyword + "="+i);
									combojson += '{"text":"'+ filterkeyword +'", "url":"https://www.google.com.tw/search?q=' + response[1][i] +'", "size":'+temp+'}';
									// combojson += '{"text":"'+ response[1][i]+'", "url":"https://www.google.com.tw/search?q=' + response[1][i] +'", "size":'+temp+'}';
									// combojson += response[1][i]+'":'+ temp;//文字雲版本ㄧ
									number = i+1;
								}
							}else{
								// console.log("沒有組合json="+i);
								number = i;
								break;
							}
						} //end for
						
						// combojson += '}';//文字雲版本ㄧ
						combojson += ']';
						

						
						// console.log("組合json=  " + combojson);
						combojson = JSON.parse(combojson);
						// d3.select(document.getElementById("wordClound")).append("svg")
						// if(response[1][0] && response[4][txt][0] && !document.getElementsByTagName('svg')[0]){
						// if(response[1][0] && response[4][txt][0] && !document.getElementById("wordClound")){ //有過濾SVG
						if(response[1][0] && response[4][txt][0] && !document.getElementById("autokeyword1" ) ){
							wordClound(combojson,number);
						}else{
							console.log("沒有執行文字雲");
						}
						//文字雲結束
						
						var getkeyword = "";
						
						//alert(response);  

						// console.log("autoComplete: " + response);
						var tempword;
						
						for (var i=0; i<5; i++){
							
							
							//找出前五個候選關鍵字
							getkeyword = response[1][i];
							// console.log("解析候選關鍵字: " + getkeyword);	
							
							if (getkeyword){
								
								var keyword01 =0;
								var keyword02 =0;
								
								
								
								// 第1或第2個關鍵字有"http://"就換成第3個關鍵字  ==-1 表示沒有相符
								if(getkeyword.indexOf('http://') != -1 || getkeyword.indexOf('https://') != -1   ){
									
									// console.log("indexOf('http:') = " + getkeyword.indexOf('http:'));
									// console.log("indexOf('httpS:')= " + getkeyword.indexOf('https:'));
									
									// console.log("有一個http家族成員= " + getkeyword);
									
									
									//第一個有HTTP就換第3個，第二個有就換第3個，如果兩個都有則第二個就換第4個
									if(i == 0){
										keyword01 = 1;
										// getkeyword = response[1][i+2];
										getkeyword = response[1][i+5];
										// console.log("第一個換掉HTTP");
										
									}else if(i == 1){
										keyword02 = 1;
										// getkeyword = response[1][i+1];
										getkeyword = response[1][i+4];
										// console.log("第二個換掉HTTP" + getkeyword);
										
										if(keyword01 == 1 && keyword02 == 1){
											getkeyword = response[1][i+2];
											// console.log("第三個換掉HTTP");
										}else {}
								
									}else {
										
									}
									
									
								}else{
									
									// console.log("沒有http家族成員= " + getkeyword);
								}
								
								//解析搜尋網頁並回傳前3筆結果
								parse_page(getkeyword, i); 
								// console.log("執行parse_page ");
								
								
							}else{
								
								console.log("沒有候選關鍵字_parse_page沒有執行 ");
							}//end else
							
						} //end for	
						 
						// 做一個提示告知user沒有候選關鍵字了
						if (!response[1][0] && !response[1][1]){
							
							document.getElementById("addQuery").setAttribute("value", "Sorry~沒有關鍵字了");
							
							//隱藏DIV
							document.getElementById("divsectab").setAttribute("style","display:none"); 
						
						}else {
							
							
							document.getElementById("addQuery").setAttribute("value", "已執行!");
							
							//變回原狀可以再點擊
							// document.getElementById("addQuery").disabled = false; 
							
							//變成不可點擊
							document.getElementById("addQuery").disabled = true; 
							
						}//end else
						
						
					}else{
						console.log("autoComplete_else:" + response);
						
					}//end else
				
				}//End success
				
			});//End ajax 
			
			
			
}//End function

function parse_page(getkeyword, number){  //解析搜尋網頁並回傳前5筆結果

			var return_class  = new Array();
			var addDIV ;
			var att01 ;
			
			$.ajax({        
				url: 'https://www.google.com.tw/search?q=' + getkeyword,        
				dataType: "html",             
				type:'get',      
				error: function(xhr) {           
					// alert('parse_page_發生錯誤,請聯絡網站管理員');         
					console.log('parse_page_發生錯誤,請聯絡網站管理員');         
				},         
				success: function(response) {              
					if(response){
						
						// console.log("parse_page: 搜尋的關鍵字= " + getkeyword + " ，結果= " + response);
						//console.log("parse_page_:" + response);
						
						var e = document.createElement("html");  //解析搜尋後的網頁
						e.innerHTML = response;
						// console.log(e);

						// console.log("候選關鍵字第"+number+"個= " + getkeyword);
						
						
						//頁籤加上關鍵字標題
	 					switch(number) {
							case 0:
								$("#tabname4").text(getkeyword); 
								break;
							case 1:
								$("#tabname5").text(getkeyword); 
								break;
							case 2:
								$("#tabname6").text(getkeyword); 
								break;
							case 3:
								$("#tabname7").text(getkeyword); 
								break;
							case 4:
								$("#tabname8").text(getkeyword); 
								break;
							
						} 
						
						//增加新搜尋的前5項結果
 						for (var i=0; i<9; i++){
							// console.log( i+" = "+ e.getElementsByClassName("r")[i].innerText); //抓連結的標題
							// console.log( i+" = "+ e.getElementsByClassName("_Rm")[i].innerText); //抓連結的網址
							// console.log( i+" = "+ e.getElementsByClassName("st")[i].innerText); //抓連結的snippet
									
								
							// if(e.getElementsByClassName("rc")[i] && e.getElementsByClassName("rc")[i+1] ){
							if(e.getElementsByClassName("rc")[i] ){
								
								// 把搜尋的前5筆資料匯入原始的第一筆搜尋的頁面中!!
								// console.log('沒有非srg家族成員 ');
								
								//代入class = rc的資料
								return_class[i] = e.getElementsByClassName("rc")[0];
								
								//製造一個 DIV class = g
								addDIV = "";
								att01  = "";
								
								addDIV = document.createElement("div");
								
								
								addDIV.setAttribute("class", "g");	
								// console.log('加入class = g' );
								
								// 在 g 加入子node  class = rc 物件
								addDIV.appendChild(return_class[i]);
								
								// 在 package 加入子node  DIV class = g
								// document.getElementsByClassName("package")[0].appendChild(addDIV);  //加在網頁最後面							
								
								
								//頁籤加上關鍵字SERP
								if (number == 0){
									$("#tab4").append(addDIV); 
								}else if(number ==1){
									$("#tab5").append(addDIV); 
								}else if(number ==2){
									$("#tab6").append(addDIV); 
								}else if(number ==3){
									$("#tab7").append(addDIV); 
								}else if(number ==4){
									$("#tab8").append(addDIV); 
								} 

								// return_class[i] = e.getElementsByClassName("g")[0];
								// document.getElementsByClassName("srg")[0].appendChild(return_class[i]);  //加在網頁最後面
								// console.log('加在網頁最後面 ' + i); 
								
								
							}else{
								
								
								break;
								
							}// end else
							
							
						
						}// end for 
						
					}else{
						console.log("parse_page_else:" + response);
					}
				
				}//End success
				
			});//End ajax 
	
	
	
} //End function

function wordClound(combojson,number){ //畫文字雲
			
			var words = combojson;
			var width  = 800;			
			var height = 200;
            
            var fill = d3.scale.category20();
            d3.layout.cloud()
				
				.size([width, height])					
				.words(words)	
                // .padding(5)  字與字的空格
                .padding(0)
                .rotate(function() {
                    // return ~~(Math.random() * 2) * 90;
                    return ~~(Math.random() * 2) * 0;
                })
                .font("Impact")
                .fontSize(function(d) {
                    return d.size;
                })
                .on("end", draw)
                .start();

            function draw(words) {
                
                d3.select(document.getElementsByClassName("mw")[0]).append("svg")               
					.attr("width", width)
					.attr("height", height)
					.attr("id", "wordcloud_svg01")
					.append("g")
                    
                    .attr("transform", "translate("+ width/2 +","+ height/2 +")")
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function(d) {
                        return d.size + "px";
                    })
                    .style("font-family", "Impact")
					.style("fill", function(d, i) {
                        return fill(i);
                    })
                    .attr("text-anchor", "middle")                    
                    .attr("transform", function(d) {
                        
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
					.text(function(d) {
                        return d.text;
					})
					.on("click", function (d, i){
						window.open(d.url, "_blank");
                    });
					
					
				//SVG置中	
				document.getElementsByClassName("mw")[0].setAttribute("style"," margin-left:300px; "); ;	
            } //end function
	
}
