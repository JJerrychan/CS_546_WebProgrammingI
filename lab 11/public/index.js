(function ($) {
  $.getJSON('http://api.tvmaze.com/shows', function (data) {
    var shows = new Array();
    data.forEach((element) => {
      shows.push(
        `<li><a href="${element._links.self.href}" id="${element.id}">${element.name}</a></li>`
      );
    });
    $('#showList').html(shows.join(''));
    $('#showList a').click(function (e) {
      e.preventDefault();
      $('#showList').hide();
      $('#show').empty();
      var idClick = e.target.toString();
      $.getJSON(idClick, function (data) {
        var name = data.name ? data.name : 'N/A',
          image = data.image ? data.image.medium : '/public/no_image.jpg',
          language = data.language ? data.language : 'N/A',
          genres = data.genres,
          rating = data.rating.average ? data.rating.average : 'N/A',
          network = data.network ? data.network.name : 'N/A',
          summary = data.summary ? data.summary : 'N/A';
        var genresHtml;
        if (genres.length == 0) genresHtml = 'N/A';
        else {
          genresHtml = '<ul>';
          genres.forEach((element) => {
            genresHtml += `<li>${element}</li>`;
          });
          genresHtml += '</ul>';
        }
        $('#show').html(`<h1>${name}</h1>
        <img alt="${name}" src="${image}" />
        <dl>
            <dt>Language</dt>
            <dd>${language}</dd>
            <dt>Genres</dt>
            <dd>${genresHtml}</dd>
            <dt>Average Rating</dt>
            <dd>${rating}</dd>
            <dt>Network</dt>
            <dd>${network}</dd>
            <dt>Summary</dt>
            <dd>${summary}</dd>
        </dl>`);
        $('#show').show();
      });
      $('#homeLink').show();
    });
    $('#showList').show();
  });

  $('#searchBtn').click(function (e) {
    e.preventDefault();
    $('.error').remove();
    var searchTerm = $('#search_term').val().trim();
    $('#search_term').val('');
    if (searchTerm.length == 0) {
      $('#searchForm').append(
        `<div class="error">You must enter a valid value!</div>`
      );
    } else {
      $('#show').hide();
      $('#showList').empty();
      $.getJSON(
        `http://api.tvmaze.com/search/shows?q=${searchTerm}`,
        function (data) {
          var shows = new Array();
          data.forEach((element) => {
            shows.push(
              `<li><a href="${element.show._links.self.href}" id="${element.show.id}">${element.show.name}</a></li>`
            );
          });
          $('#showList').html(shows.join(''));
          $('#showList a').click(function (e) {
            e.preventDefault();
            $('#showList').hide();
            $('#show').empty();
            var idClick = e.target.toString();
            $.getJSON(idClick, function (data) {
              var name = data.name ? data.name : 'N/A',
                image = data.image ? data.image.medium : '/public/no_image.jpg',
                language = data.language ? data.language : 'N/A',
                genres = data.genres,
                rating = data.rating.average ? data.rating.average : 'N/A',
                network = data.network ? data.network.name : 'N/A',
                summary = data.summary ? data.summary : 'N/A';
              var genresHtml;
              if (genres.length == 0) genresHtml = 'N/A';
              else {
                genresHtml = '<ul>';
                genres.forEach((element) => {
                  genresHtml += `<li>${element}</li>`;
                });
                genresHtml += '</ul>';
              }
              $('#show').html(`<h1>${name}</h1>
                <img alt="${name}" src="${image}" />
                <dl>
                    <dt>Language</dt>
                    <dd>${language}</dd>
                    <dt>Genres</dt>
                    <dd>${genresHtml}</dd>
                    <dt>Average Rating</dt>
                    <dd>${rating}</dd>
                    <dt>Network</dt>
                    <dd>${network}</dd>
                    <dt>Summary</dt>
                    <dd>${summary}</dd>
                </dl>`);
              $('#show').show();
            });
            $('#homeLink').show();
          });
          $('#showList').show();
        }
      );
    }
  });
})(window.jQuery);
