	if(null==pimaxColumns||pimaxColumns==""||pimaxColumns=="undefined")
		var pimaxColumns = 2;
		
	if(null==pimaxWidgetWidth||pimaxWidgetWidth==""||pimaxWidgetWidth=="undefined")
		var pimaxWidgetWidth = 640;

	if(null==albumNames||albumNames==""||albumNames=="undefined")
		var albumNames = [];

	if(null==pathToLoadingImage||pathToLoadingImage==""||pathToLoadingImage=="undefined")
		var pathToLoadingImage = '';



	if (typeof pimaxWidgetHeight !== 'undefined') {
		//alert('pimaxWidgetHeight defined');
		if(null!=pimaxWidgetHeight&&pimaxWidgetHeight!=""&&pimaxWidgetHeight!="undefined")
			$('html > head').append('<style>#pimax{overflow-y:auto;height:'+pimaxWidgetHeight+'px;}</style>');	
	}
	
	var pimaxImageAspectRatio = 1;

	
	function byteConversion(numBytes) {
		var kilobytes;
		var megabytes;
		
		if(null==numBytes||numBytes==""||numBytes=="undefined")
			return "? KB";
		
		if(numBytes >= 1024) {
			kilobytes = numBytes/1024;				
			if(kilobytes >=1024) {
				megabytes = kilobytes/1024;
				return megabytes.toFixed(2)+" MB";
			} else {
				return kilobytes.toFixed(2)+" KB";
			}
		} else {
			return numBytes+" bytes"
		}
	
	}


	function getDateDiff(timestamp) {
		if(null==timestamp||timestamp==""||timestamp=="undefined")
			return "?";
		//alert(timestamp);
		var splitDate=((timestamp.toString().split('T'))[0]).split('-');
		var d1 = new Date();		
		
		var d1Y = d1.getFullYear();
        var d2Y = parseInt(splitDate[0],10);
        var d1M = d1.getMonth();
        var d2M = parseInt(splitDate[1],10);

        var diffInMonths = (d1M+12*d1Y)-(d2M+12*d2Y);
		/*alert(d1Y);
		alert(d2Y);
		alert(d1M);
		alert(d2M);
		alert(diffInMonths);
		*/
		if(diffInMonths<=1)
			return "1 month";
		else if(diffInMonths<12)
			return  diffInMonths+" months";
		
		var diffInYears = Math.floor(diffInMonths/12);
		
		if(diffInYears<=1)
			return "1 year";
		else if(diffInYears<12)
			return  diffInYears+" years";

	}	
		
	function loadPimax() {
		$('#pimax').append('<div id="pimax-header"><div id="pimax-stat-holder"></div></div>');
		
		$('#pimax').append('<div id="pimax-tabs"></div>');
		
		createPimaxTabs();
		


		
		$('#pimax').append('<div id="pimax-encloser"><div id="pimax-img-list-div"></div></div>');
		
		$('#pimax-img').hide();
		
		/*
		$('#pimax').append('<div id="pimax-lightbox"><div id="picasa-lightbox-wrapper" style="width:100%; position:absolute; top:20%;"><img id="picasa-img-lightbox" src="" frameborder="0" allowfullscreen></iframe></div></div>');
		*/
		
		$('#pimax').append('<div id="pimax-lightbox"><div id="picasa-lightbox-wrapper"><div id="picasa-lightbox-image"><img id="picasa-img-lightbox" src=""></div><div id="picasa-lightbox-helper"></div></div></div>');
		
		$('#pimax-lightbox').click(function(){
			$('#picasa-img-lightbox').attr('src','');
			$('#pimax-lightbox').hide();
		});
		
		$('#picasa-img-lightbox').click(function(){
			//alert('hi');
			//showLoadingInLightbox();
			var $nextSibling = $('.pimax-selected').next();
			
			if(null==$nextSibling||$nextSibling=="undefined"||$nextSibling.text()=="") {
				$nextSibling = $('.pimax-img-tnail-box:first');
			}
			
			//console.log($nextSibling.text());
			
			$('.pimax-selected').removeClass('pimax-selected');
			$nextSibling.addClass('pimax-selected');
			showVideoLightbox($nextSibling.attr('data-picSrc'));
			return false;
		});
	
		$('#pimax-lightbox').hide();
	}
	
	function showLoadingInLightbox() {
		$('#picasa-img-lightbox').attr('src','');
		$('#picasa-img-lightbox').attr('src',pathToLoadingImage);
	}
		
	
		$(document).ready(function() {
		
			var style = '<style>.pimax-showing {color:black;font-weight:normal;}.pimax-img-size {background-color: black;color: white;padding: 2px 3px;font-weight: bold;position: absolute;bottom: 0;right: 0;opacity: 0.8;}#pimax-header {background-color:rgb(53,53,53);font:24px Arial;color:white;line-height:25px;height:90px;text-align:left;border: 1px solid rgb(53,53,53);}.pimax-stat {float:right;margin:10px;font:10px Arial;color:#ccc;margin-top: 25px;text-align: center;}#pimax-stat-holder {float:right;height:100%;}.pimax-stat-count {font: 18px Arial;}#pimax-channel-desc {text-align:left;}#pimax {width:'+pimaxWidgetWidth+'px;background-color: rgb(230,230,230);margin:0px auto;font-family: Calibri;font-size: 14px;text-align:center; overflow-x:hidden;}.pimax-img-tnail {width:100%; background-repeat:no-repeat; background-size:100%;height:180px;position: relative;}.pimax-img-tnail-box {background-color: white;width:46%;margin:2%;float:left;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 1px 3px rgba(0, 0, 0, 0.2);cursor:pointer;cursor:hand;}#pimax-encloser {border-left: 1px solid #cccccc;border-right: 1px solid #cccccc;border-bottom: 1px solid #cccccc;}#pimax-img-list-div {width:100%;text-align:left;display: inline-block;background-color:rgb(230,230,230);	}.pimax-img-list-title {color:#438bc5;display: inline-block;padding:2% 10px; padding-bottom: 0px;font-weight:bold;max-width:250px;max-height:18px;overflow:hidden;}.pimax-img-list-views {color:#555;padding:1% 10px; padding-bottom: 3%;display:inline-block;font-size:12px;}.pimax-album-sidebar {width: 70px;background-color:rgba(0,0,0,0.8);float:right;max-width:50%;height:100%;color:white;text-align:center;}.pimax-album-img-count {	display:inline-block;margin-top:105px;height:20%;width: 100%;}.pimax-album-sidebar-img {opacity:1;width:64px;height:20%;background-color:rgb(114,114,114);display:inline-block;margin:2% auto;background-size:cover;background-position: center center;background-repeat:no-repeat;}.pimax-tab {background-color:rgb(230,230,230);color:#666;text-shadow:0 1px 0 #fff;display: inline-block;margin: 5px;margin-top: 10px;padding: 5px;cursor:pointer;cursor:hand;}#pimax-tabs {text-align:left;background-color:rgb(230,230,230);padding-left: 10px;border-left: 1px solid #cccccc;border-right: 1px solid #cccccc;}#pimax-lightbox {position:fixed;background-color:rgba(0,0,0,0.9);z-index:100;width:100%;height:100%;left:0;top:0;}#picasa-img-lightbox {opacity:1; max-width:1000px; max-height:700px; z-index:200;cursor:pointer;cursor:mouse;}#picasa-lightbox-wrapper {height: 100%;width: 100%;white-space: nowrap;}#picasa-lightbox-image {display: inline-block;vertical-align: middle;white-space: normal;z-index:120;}#picasa-lightbox-helper {display: inline-block;vertical-align: middle;height: 100%;}#pimax-header a {text-decoration: none;color: inherit;}</style>';
			$('html > head').append(style);		

			//var style='<style>::-webkit-scrollbar {width: 10px;}::-webkit-scrollbar-button {display:none;}::-webkit-scrollbar-track-piece {background: #888}::-webkit-scrollbar-thumb {background: #eee}</style>';
			//$('html > head').append(style);		

			preparePimax();
			
		});

		function preparePimax() {

			if(googleUserName.indexOf("@")!=-1) {
				googleUserName = googleUserName.substring(0,googleUserName.indexOf("@"));
				//console.log(googleUserName);
			} else if(googleUserName.indexOf("plus.google.com/")!=-1) {
				googleUserName = googleUserName.substring(googleUserName.indexOf("plus.google.com/")+16);
				if(googleUserName.indexOf("/")!=-1)
					googleUserName = googleUserName.substring(0,googleUserName.indexOf("/"));
				//console.log(googleUserName);
			}

			$('#pimax').empty();
			
			
			loadPimax();
			showLoader();
			
			/*
			if(typeof pimaxDefaultTab === 'undefined'||null==pimaxDefaultTab||pimaxDefaultTab==""||pimaxDefaultTab=="undefined") {
				$("#picasa-albums").click();
			} else if(pimaxDefaultTab.toUpperCase()=='UPLOADS'||pimaxDefaultTab.toUpperCase()=='UPLOAD') {
				$("#pimax-uploads").click();
			} else if(pimaxDefaultTab.toUpperCase()=='PLAYLISTS'||pimaxDefaultTab.toUpperCase()=='PLAYLIST') {
				$("#pimax-albums").click();
			} else {
				$("#picasa-albums").click();
			}*/
		
			
		}
		
		
        function setHeader(xhr) {
			if(xhr && xhr.overrideMimeType) {
				xhr.overrideMimeType("application/j-son;charset=UTF-8");
			}
        }
		
		function showLoader() {
			$('#pimax-img-list-div').empty();
			$('#pimax-img').hide();
			$('#pimax-img').attr('src','');
			$('#pimax-img-list-div').append('<div style="text-align:center; height:200px; font:14px Calibri;"><br><br><br><br><br><br>loading...</div>');
		}
		
		
		function getAlbums() {
			showLoader();
			var apiAlbumURL = "https://picasaweb.google.com/data/feed/api/user/"+googleUserName+"?alt=json-in-script";
			$.ajax({
				url: apiAlbumURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { showAlbums(response);},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});
		}

		function createPimaxTabs() {
			//showLoader();
			var apiAlbumURL = "https://picasaweb.google.com/data/feed/api/user/"+googleUserName+"?alt=json-in-script";
			$.ajax({
				url: apiAlbumURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { showPimaxTabs(response);},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});
		}

		function showPimaxTabs(response) {
		
			console.log(response);
			var albumArray = response.feed.entry;
			var zeroAlbumCompensation = 0;
			var albumIdArray = [];
			var maxTopPics;
			
			showPimaxHeader(response);
			
			for(var a=0; a<albumNames.length; a++) {
				for(var i=0; i<albumArray.length; i++) {
					albumTitle = albumArray[i].media$group.media$title.$t;
					if(albumTitle.toUpperCase() === albumNames[a].toUpperCase()) {
						albumId = albumArray[i].gphoto$id.$t;
						$('#pimax-tabs').append('<span id="'+albumId+'" class="pimax-tab">'+albumTitle+'</span>');
						break;
					}
				}
			}
			
			$('#pimax-tabs').append('<span id="picasa-albums" class="pimax-tab">Albums</span>');
			
			//adding onclick events on tabs
			$('.pimax-tab').click(function(){
				$('.pimax-tab').css('color','#666');
				$('.pimax-tab').css('background-color','rgb(230,230,230)');
				$('.pimax-tab').css('text-shadow','0 1px 0 #fff');

				$(this).css('color','#eee');
				$(this).css('background-color','#999');
				$(this).css('text-shadow','0 0');
				
				pimaxTabId = this.id;
				
				if(pimaxTabId=="picasa-albums")
					getAlbums();
				else
					getAlbumImages(pimaxTabId);
			
			});		
			
			$('.pimax-tab:first').click();
	
		}
		
		function showPimaxHeader(response) {
		
			//console.log(response);
			
			var authorName = response.feed.author[0].name.$t;
			var authorLink = response.feed.author[0].uri.$t;
			var authorPic = response.feed.gphoto$thumbnail.$t;
		
			$('#pimax-header').append('<a target="_blank" href="'+authorLink+'"><img style="vertical-align:middle; height:60px; margin:15px; display:inline-block;" src="'+authorPic+'"/>'+authorName+'</a>');
			
			/*
			$('#pimax-header').append('&nbsp;&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://www.youtube.com/subscription_center?add_user='+pimaxUser+'"><img style="vertical-align:middle;height:60px;" src="http://s.ytimg.com/yt/img/creators_corner/Subscribe_to_my_imgs/YT_Subscribe_64x64_red.png" alt="Subscribe to me on YouTube"/></a>');
			
			//$('#pimax-stat-holder').append('<div class="pimax-stat">'+channelSubscribers+'<br/> subscribers </div><div class="pimax-stat">'+channelViews+'<br/>img views</div>');
			$('#pimax-stat-holder').append('<div class="pimax-stat"><span class="pimax-stat-count">'+getReadableNumber(channelViews)+'</span><br/> img views </div><div class="pimax-stat"><span class="pimax-stat-count">'+getReadableNumber(channelSubscribers)+'</span><br/>subscribers</div>');
			
			$('#pimax-channel-desc').append('About '+channelName+'<br/>'+channelDesc);*/
			
		}
		
		
		/*function showTopImagesOfAlbums(response) {
			//console.log(response);
			
			var albumId = response.feed.gphoto$id.$t;
			var albumArray = response.feed.entry;
			
			//console.log("showTopImagesOfAlbums::albumId: "+albumId);
			
			if(null!=albumArray&&albumArray!="undefined") {
				for(var j=1; j<albumArray.length; j++) {
					//console.log(albumArray[i].media$group);
					picThumbnail = albumArray[j].media$group.media$thumbnail[0].url;
					$('#pimax-album-sidebar-'+albumId).append('<div class="pimax-album-sidebar-img" style="background-image:url(\''+picThumbnail+'\')"></div>');
				}
			}

			var pimaxTnailWidth;
			var pimaxTnailHeight = $('.pimax-album-sidebar-img').css('height');
			if(null!=pimaxTnailHeight&&pimaxTnailHeight!="undefined") {
				pimaxTnailHeight=pimaxTnailHeight.substring(0,pimaxTnailHeight.indexOf("px"));
				pimaxTnailWidth = pimaxImageAspectRatio*pimaxTnailHeight;
			
			//$('html > head').append('<style>.pimax-album-sidebar-img{width:'+pimaxTnailWidth+'px;}</style>');	
			//$('html > head').append('<style>.pimax-album-sidebar{width:'+(pimaxTnailWidth+20)+'px;}</style>');	
				$('div.pimax-album-sidebar-img').css({'width':pimaxTnailWidth+'px'});
				$('div.pimax-album-sidebar').css({'width':(pimaxTnailWidth+30)+'px'});
			} else {
				//$('div.pimax-album-sidebar-img').css({'width':''});
				$('div.pimax-album-sidebar').css({'width':'20%'});			
			}
			
			//console.log(pimaxTnailWidth);
			//console.log(pimaxTnailHeight);

			
		}*/
		
		/*function getTopImagesOfAlbums(albumIdArray,maxTopPics) {
		
			//console.log(albumIdArray);
			for(var i=0; i<albumIdArray.length; i++) {			
				albumId = albumIdArray[i];

				apiAlbumImagesURL = "https://picasaweb.google.com/data/feed/api/user/"+googleUserName+"/albumid/"+albumId+"?alt=json-in-script&max-results="+maxTopPics;
				
				$.ajax({
					url: apiAlbumImagesURL,
					type: "GET",
					async: true,
					cache: true,
					dataType: 'jsonp',
					success: function(response) { showTopImagesOfAlbums(response);},
					error: function(html) { alert(html); },
					beforeSend: setHeader
				});
			}
		
		}*/		


		function showAlbums(response) {
			console.log(response);
			
			$('#pimax-img-list-div').empty();
			
			var albumArray = response.feed.entry;
			var zeroAlbumCompensation = 0;
			var albumIdArray = [];
			var maxTopPics;
			
			for(var i=0; i<albumArray.length; i++) {
				//console.log(albumArray[i].media$group);
				albumId = albumArray[i].gphoto$id.$t;
				numPics = albumArray[i].gphoto$numphotos.$t;
				albumType = albumArray[i].gphoto$albumType;
				if(null!=albumType&&albumType!="undefined")
					albumType=albumType.$t;
				picThumbnail = albumArray[i].media$group.media$thumbnail[0].url;
				picThumbnail=picThumbnail.replace("s160-c","s300-c");
				picTitle = albumArray[i].media$group.media$title.$t;
				albumUploaded = albumArray[i].published.$t;
				
				if(albumType=='Buzz'){
					zeroAlbumCompensation++;
					continue;
				}	
				
				albumIdArray.push(albumId);
				
				
				if((i-zeroAlbumCompensation)%pimaxColumns!=0)
					$('#pimax-img-list-div').append('<div class="pimax-img-tnail-box" style="width:'+((100/pimaxColumns)-4)+'%;" id="'+albumId+'"><div class="pimax-img-tnail" style="background-image:url(\''+picThumbnail+'\')"><div class="pimax-album-sidebar" id="pimax-album-sidebar-'+albumId+'"><span class="pimax-album-img-count"><b>'+numPics+'</b><br/>PHOTOS</span></div></div><span class="pimax-img-list-title">'+picTitle+'</span><br/><span class="pimax-img-list-views">'+numPics+' photos | '+getDateDiff(albumUploaded)+' ago</span></div>');
				else
					$('#pimax-img-list-div').append('<div class="pimax-img-tnail-box" style="width:'+((100/pimaxColumns)-4)+'%; clear:both;" id="'+albumId+'"><div class="pimax-img-tnail" style="background-image:url(\''+picThumbnail+'\')"><div class="pimax-album-sidebar" id="pimax-album-sidebar-'+albumId+'"><span class="pimax-album-img-count"><b>'+numPics+'</b><br/>PHOTOS</span></div></div><span class="pimax-img-list-title">'+picTitle+'</span><br/><span class="pimax-img-list-views">'+numPics+' photos | '+getDateDiff(albumUploaded)+' ago</span></div>');
	
			}

						
			$('.pimax-img-tnail-box').click(function(){
				//alert(this.id);
				getAlbumImages(this.id);
			});
			
			var pimaxTnailWidth = $('.pimax-img-tnail').css('width');
			pimaxTnailWidth=pimaxTnailWidth.substring(0,pimaxTnailWidth.indexOf("px"));
			var pimaxTnailHeight = pimaxTnailWidth/pimaxImageAspectRatio;
			//$('html > head').append('<style>.pimax-img-tnail{height:'+pimaxTnailHeight+'px;}</style>');	
			$('div.pimax-img-tnail').css({'height':pimaxTnailHeight+'px'});
			
			
			if(pimaxTnailHeight<130) {
				maxTopPics = 3;
				$('html > head').append('<style>.pimax-album-img-count{margin: 10%;margin-top: 15%;}.pimax-album-sidebar-img{margin: 8% auto;}</style>');	
				//$('div.pimax-album-img-count').css({'margin':'10%','margin-top':'15%'});
				//$('div.pimax-album-sidebar-img').css({'margin':'8% auto'});
			} else {
				maxTopPics = 4;
			}
			
			//console.log(pimaxTnailWidth);
			//console.log(pimaxTnailHeight);

			//no need for Top Images of Album
			//getTopImagesOfAlbums(albumIdArray,maxTopPics);
			

		}
		
		function getAlbumImages(albumId) {
			showLoader();
			apiPlaylistVideosURL = "https://picasaweb.google.com/data/feed/api/user/"+googleUserName+"/albumid/"+albumId+"?alt=json-in-script";
			$.ajax({
				url: apiPlaylistVideosURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { showAlbumImages(response);},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});
		}
		

		
		function showAlbumImages(response) {
			console.log(response);
			
			$('#pimax-img-list-div').empty();

			$('#pimax-img-list-div').append('<span class="pimax-img-list-title" style="max-width:100%;"><span class="pimax-showing">&nbsp;&nbsp;Showing album: </span>'+response.feed.gphoto$name.$t+'</span><br/>');

			var albumArray = response.feed.entry;
			
			for(var i=0; i<albumArray.length; i++) {
				//console.log(albumArray[i].media$group);
				picId = albumArray[i].gphoto$id.$t;
				picThumbnail = albumArray[i].media$group.media$thumbnail[0].url;
				picThumbnail=picThumbnail.replace("s72","s300-c");
				picTitle = albumArray[i].media$group.media$title.$t;
				picUploaded = albumArray[i].published.$t;
				//picSrc = albumArray[i].media$group.media$content[0].url;
				picSrc = picThumbnail.replace("s300-c","s1600");
				picHeight = albumArray[i].media$group.media$content[0].height;
				picWidth = albumArray[i].media$group.media$content[0].width;
				resolution = picWidth+" x "+picHeight;
				
				picSize = albumArray[i].gphoto$size.$t;
				
				
				if(i%pimaxColumns!=0)
					$('#pimax-img-list-div').append('<div class="pimax-img-tnail-box" style="width:'+((100/pimaxColumns)-4)+'%;" data-picSrc="'+picSrc+'" data-picHeight="'+picHeight+'" id="'+picId+'"><div class="pimax-img-tnail" style="background-image:url(\''+picThumbnail+'\')"><div class="pimax-img-size">'+byteConversion(picSize)+'</div></div><span class="pimax-img-list-title">'+picTitle+'</span><br/><span class="pimax-img-list-views">'+resolution+' | '+getDateDiff(picUploaded)+' ago</span></div>');
				else
					$('#pimax-img-list-div').append('<div class="pimax-img-tnail-box" style="width:'+((100/pimaxColumns)-4)+'%; clear:both;" data-picSrc="'+picSrc+'" data-picHeight="'+picHeight+'" id="'+picId+'"><div class="pimax-img-tnail" style="background-image:url(\''+picThumbnail+'\')"><div class="pimax-img-size">'+byteConversion(picSize)+'</div></div><span class="pimax-img-list-title">'+picTitle+'</span><br/><span class="pimax-img-list-views">'+resolution+' | '+getDateDiff(picUploaded)+' ago</span></div>');

			}




			$('.pimax-img-tnail-box').click(function(){
				//showLoadingInLightbox();
				$('.pimax-img-tnail-box').removeClass('pimax-selected');
				$(this).addClass('pimax-selected');
				showVideoLightbox(this.getAttribute('data-picSrc'));
				
			});
			
			var pimaxTnailWidth = $('.pimax-img-tnail').css('width');
			pimaxTnailWidth=pimaxTnailWidth.substring(0,pimaxTnailWidth.indexOf("px"));
			var pimaxTnailHeight = pimaxTnailWidth/pimaxImageAspectRatio;
			//$('html > head').append('<style>.pimax-img-tnail{height:'+pimaxTnailHeight+'px;}</style>');	
			$('div.pimax-img-tnail').css({'height':pimaxTnailHeight+'px'});
			
			//console.log(pimaxTnailWidth);
			//console.log(pimaxTnailHeight);

		}
		
		function showVideoLightbox(picSrc) {
			//console.log(picSrc);
			$('#pimax-lightbox').show();
			showLoadingInLightbox();
			setTimeout(function(){$('#picasa-img-lightbox').attr('src',picSrc);},10);
			//$('#picasa-img-lightbox').attr('src',picSrc);
		}
	
