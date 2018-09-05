var resultsDiv = document.getElementById('results');

function saveSearch() {
	var searchInput = document.getElementById('linkedinSearch').value;
	resultsDiv.innerHTML = searchInput;
}



// $('#linkedinSearch').keyup(function() {
// 	var searchField = $('#linkedinSearch').val();
// 	console.log(searchField);
// 	var myExp = new RegExp (searchField, "i");
// 	$.getJSON('data.json', function(data){
// 		var output = '<ul class="searchResults">';
// 		$.each(data,function(key, val) {
// 			if ((val.name.search(myExp) != -1) || (val.bio.search(myExp) != -1)) {
// 				output += '<li>';
// 				output += '<h2>' + val.name + '</h2>';
// 				output += '<img src="images/' + val.shortname + '_tn.jpg" alt="' + val.name +'" />';
// 				output += '<p>' + val.bio + '</p>';
// 				output += '</li>';
// 			}
// 		});
// 		output += '</ul>';
// 		$('#results').html(output);
// 	});
// });


// $.ajax({
//       url: "http://www.omdbapi.com/?t=romancing+the+stone&y=&plot=short&apikey=40e9cece",
//       method: "GET"
//     }).done(function(response) {
//       console.log(response);
//     });



$('#linkedinSearch').keyup(function() {
	var searchField = $('#linkedinSearch').val();
	console.log(searchField);
	var myExp = new RegExp (searchField, "i");

	$.ajax({
		url: 'https://www.linkedin.com/ta/federator?types=company&query=' + searchField,
		type: 'GET',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function(data) {
			console.log(data);
			console.log(data.company.resultList[0].displayName);
			console.log(data.company.resultList[0].imageUrl);
			console.log(data.company.resultList[0].subLine);

		  	var output = '<ul class="searchResults">';
			$.each(data,function(key, val) {
				if (val.company[myExp] != -1) {
					output += '<li>';
					output += '<h2>' + val.displayName + '</h2>';
					output += '<img src="' + val.company[myExp].imageUrl + '" alt="' + val.company.displayName +'" />';
					output += '<p>' + val.company + '</p>';
					output += '</li>';
				}
			});
			output += '</ul>';
			$('#companyResults').html(output);

			//console.log('Company: ' + data.companies);
		},
		error: function() {
			console.log('Failed!');
		}
	});

});