// var resultsDiv = document.getElementById('results');

// function saveSearch() {
// 	var searchInput = document.getElementById('linkedinSearch').value;
// 	resultsDiv.innerHTML = searchInput;
// }




$('#linkedinSearch').keyup(function() {

	var searchField = $('#linkedinSearch').val();
	// console.log(searchField);
	// Lets us do case insensitive searches:
	var myExp = new RegExp (searchField, "i");

	$.ajax({
		url: 'https://www.linkedin.com/ta/federator?types=company&query=' + searchField,
		type: 'GET',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function(data) {
			var companyID;
			var companyLink;
			var newsFeed = '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:';
			var output = '<ul class="searchResults">';
			$.each(data, function(key, val) {
				for (var i = 0; i < 5; i++) {
					if ( (val.resultList[i].displayName.search(myExp) != -1) || (val.resultList[i].subLine.search(myExp) != -1) ) {
						console.log(val);
						output += '<li>';
						output += '<h2>' + val.resultList[i].displayName + '</h2>';
						output += '<img src="' + val.resultList[i].imageUrl + '" alt="' + val.resultList[i].displayName +'" />';
						output += '<p>' + val.resultList[i].subLine + '</p>';
						output += '</li>';
					}
				}
				companyID = val.resultList[0].id;
				companyLink = '<div src="https://www.linkedin.com/biz/' + companyID + '/feed?start=0&v2=true">';
				companyLink += '<a href="https://www.linkedin.com/biz/' + companyID + '/feed?start=0&v2=true">';
				companyLink += 'https://www.linkedin.com/biz/' + companyID + '/feed?start=0&v2=true';
				companyLink += '</a>';
				companyLink += '</div>';
				//newsFeed += latestNewsID;
				newsFeed += '6443100829355466752';
			});
			output += '</ul>';
			$('#companyResults').html(output);
			newsFeed += '" height="350" width="320" max-height="530" max-width="504" frameborder="0" allowfullscreen=""></iframe>';
			$('#newsFeed').html(newsFeed);
			//$('#newsFeed').html('https://www.linkedin.com/biz/' + companyID + '/feed?start=0&v2=true');

			$('#companyNews').html(companyLink);
			
			//<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6443100829355466752" height="530" width="504" frameborder="0" allowfullscreen=""></iframe>
			// https://www.linkedin.com/feed/update/urn:li:activity:6443100829691011072
			//console.log("NAME: " + data.company.resultList[0].displayName);
			// console.log(data.company.resultList[0].imageUrl);
			// console.log(data.company.resultList[0].subLine);


			// var target_domain = "www.linkedin.com";
		 //    var protocol = "https://";
		 //    var path1 = "/biz/";
		 //    var path2 = "/feed?start=0&v2=true";
		 //    var target_host = protocol + target_domain;
		 //    var target_URI = target_host + path1 + companyID + path2;
		 //    var method = "GET";
		 //    $.ajax({
		 //        url: target_URI,
		 //        type: method,
		 //        headers: {
		 //            "X-Requested-With": "", //nullifies the default AJAX value of "XMLHttpRequest"
		 //            "Origin": target_host, //lies to the target server
		 //            "Referer": target_host, //lies to the target server
		 //            "X-Http-Method-Override": method, //forces the specified method
		 //        },
		 //        crossDomain: "true", //applies cross domain settings
		 //        success: function() {
		 //        	$("#companyNews").html('hi');
		 //        }
		 //    });
		    


		},
		error: function() {
			console.log('Failed!');
		}
	});

	
});



