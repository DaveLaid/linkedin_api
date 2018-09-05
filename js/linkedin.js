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
			var newsFeed = '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:';
			var output = '<ul class="searchResults">';
			$.each(data, function(key, val) {
				for (var i = 0; i < 5; i++) {
					if (val.resultList[i].displayName.search(myExp) != -1) {
						console.log(val);
						output += '<li>';
						output += '<h2>' + val.resultList[i].displayName + '</h2>';
						output += '<img src="' + val.resultList[i].imageUrl + '" alt="' + val.resultList[i].displayName +'" />';
						output += '<p>' + val.resultList[i].subLine + '</p>';
						output += '</li>';
						
					}
				}
				//newsFeed += latestNewsID;
				newsFeed += '6443100829355466752';
				companyID = val.resultList[0].id;
			});
			output += '</ul>';
			$('#companyResults').html(output);
			newsFeed += '" height="350" width="320" max-height="530" max-width="504" frameborder="0" allowfullscreen=""></iframe>';
			$('#newsFeed').html(newsFeed);
			//$('#newsFeed').html('https://www.linkedin.com/biz/' + companyID + '/feed?start=0&v2=true');


			//<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6443100829355466752" height="530" width="504" frameborder="0" allowfullscreen=""></iframe>
			// https://www.linkedin.com/feed/update/urn:li:activity:6443100829691011072
			//console.log("NAME: " + data.company.resultList[0].displayName);
			// console.log(data.company.resultList[0].imageUrl);
			// console.log(data.company.resultList[0].subLine);

		},
		error: function() {
			console.log('Failed!');
		}
	});

});