

'use strict';

const baseURL = "https://api.datamuse.com/";

// You set up both of the fetch calls to the 2 endpoints that you will connect the API to

// Fetch and creating the full url go here
function fetchRhymes(subject, rhyme){
  let rhymeURL = baseURL + "words?ml=" + subject + "&" + "rel_rhy=" + rhyme;
  fetch(rhymeURL)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      displayRhymes(responseJson);
      $('.rhyme-results').removeClass('hidden');
    });
}

// Fetch and creating the full url go here
function fetchAdjectives(word){
  let adjURL = baseURL + "words?rel_jjb=" + word;

  fetch(adjURL)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      displayAdjectives(responseJson);
      $('.adjective-results').removeClass('hidden');
    })
}

// Dynamic html to load stuff to the page
function displayRhymes(responseJson){
  if (responseJson.length !== 0) {
    $('.rhyme-results').html("");
    for (let i = 0; i < responseJson.length; i ++){
    $('.rhyme-results').append (`<li>${responseJson[i].word}</li>`);
    }
    }
  else {$('.rhyme-results').html("<p>No Results Found. Please try a new word.</p>");
  }
}



// Dynamic html to load stuff to the page
function displayAdjectives(responseJson){
  if (responseJson.length !== 0) {
    $('.adjective-results').html("");
  for (let i = 0; i < responseJson.length; i ++){
    $('.adjective-results').append (`<li>${responseJson[i].word}</li>`);
  }
  }
 else {$('.adjective-results').html("<p>No Results Found. Please try a new word.</p>");
  }
}

// Function that has the event listener
function watchFormRhyme(){
  $('#rhyme-form').submit(event => {
    event.preventDefault();
    const rhyme = $('#rhyme').val();
    const subject = $('#subject').val();

    fetchRhymes(subject, rhyme);
  });
}
function watchFormAdjective(){
  $('#adjective-form').submit(event => {
    event.preventDefault();
    const adjective = $('#adjective').val();
    fetchAdjectives(adjective);
  });
 
}

$(watchFormRhyme);
$(watchFormAdjective);