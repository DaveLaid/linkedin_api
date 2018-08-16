var resultsDiv = document.getElementById('results');

function saveSearch() {
	var searchInput = document.getElementById('linkedinSearch').value;
	resultsDiv.innerHTML = searchInput;
}



$('#linkedinSearch').keyup(function() {
	var searchField = $('#linkedinSearch').val();
	console.log(searchField);
	var myExp = new RegExp (searchField, "i");
	$.getJSON('data.json', function(data){
		var output = '<ul class="searchResults">';
		$.each(data,function(key, val) {
			if ((val.name.search(myExp) != -1) || (val.bio.search(myExp) != -1)) {
				output += '<li>';
				output += '<h2>' + val.name + '</h2>';
				output += '<img src="images/' + val.shortname + '_tn.jpg" alt="' + val.name +'" />';
				output += '<p>' + val.bio + '</p>';
				output += '</li>';
			}
		});
		output += '</ul>';
		$('#results').html(output);
	});
});



$('#linkedinSearch').keyup(function() {
	var searchField = $('#linkedinSearch').val();
	console.log(searchField);
	var myExp = new RegExp (searchField, "i");

	$.ajax({
		url: 'https://www.linkedin.com/ta/federator?types=company&query=',
		type: 'GET',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function(data) {
		  	var output = '<ul class="searchResults">';
			$.each(data,function(key, val) {
				if ((val.name.search(myExp) != -1) || (val.bio.search(myExp) != -1)) {
					output += '<li>';
					output += '<h2>' + val.displayName + '</h2>';
					output += '<img src="' + val.imageUrl + '" alt="' + val.displayName +'" />';
					output += '<p>' + val.subLine + '</p>';
					output += '</li>';
				}
			});
			output += '</ul>';
			$('#results').html(output);

			console.log('Company: ' + data.companies);
		},
		error: function() {
			console.log('Failed!');
		},
	});

});