let address = 'api/Songs';

function displaySongs() {
    $.ajax({
        type: "GET",
        url: address,
        cache: false,
        success: function (data) {
            const tableBody = $("#table_songs");
            $(tableBody).empty(); 
            if (data.length == 0) { 
                const tr = $("<tr></tr>")
                    .append('<td colspan="5" align="center">No Songs information</td>');
                tr.appendTo(tableBody);
            } else {
                $.each(data, function (key, item) {
                    const html = '<a href="' + item.url + '" target="_blank">Go to Web Site</a>';
                    const tr = $("<tr></tr>")
                        .append($("<td></td>").text(item.songTitle))
                        .append($("<td></td>").text(item.artist))
                        .append($("<td></td>").html(html))
                        .append($("<td></td>").append('<button class="btn btn-primary" data-toggle="modal" data-target="#update">Edit</button>')
                            .on("click", function () {
                                fetchSong(item.id);
                            })
                        )
                        .append($("<td></td>").append('<button class="btn btn-danger">Delete</button>')
                            .on("click", function () {
                                deleteSong(item.id);
                            })
                        );
                    tr.appendTo(tableBody)
                });
            }
        }
    });
}

function addSong() {
    let song_title = $('#title').val();
    let song_artist = $('#artist').val();
    let website_url = $('#url').val();

    let song = {
        songTitle: song_title,
        artist: song_artist,
        url: website_url
    };

    $.ajax({
        type: "POST",
        url: address,
        data: JSON.stringify(song),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        $("#result").html("Song Details are stored");
        displaySongs();
    }).fail(function (xhr, status) {
        $("#result").html("Failure in storing Song Details");
    });
}

function updateSong() {
    let song_title = $('#title1').val();
    let song_artist = $('#artist1').val();
    let website_url = $('#url1').val();
    let songid = parseInt($('#songid').val());
    let song = {
        id: songid,
        songTitle: song_title,
        artist: song_artist,
        url: website_url
    };
    $.ajax({
        type: "PUT",
        url: address + "/" + songid,
        data: JSON.stringify(song),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        $("#resultUpdate").html("Song Details are Updated");
        displaySongs();
    }).fail(function (xhr, status) {
        $("#resultUpdate").html("Failure in Updation of Song Details");
    });
}

function deleteSong(id) {
    let result = confirm("Are You Sure to Remove Song Details?");
    if (result) {
        $.ajax({
            type: "DELETE",
            url: address + "/" + id,
        }).done(function (response) {
            displaySongs();
        });
    }
}

function fetchSong(id) {
    $.ajax({
        type: "GET",
        url: address + "/" + id,
        contentType: "application/json"
    }).done(function (song) {        
        $('#songid').val(song.id);
        $('#title1').val(song.songTitle);
        $('#artist1').val(song.artist);
        $('#url1').val(song.url);
    });
}