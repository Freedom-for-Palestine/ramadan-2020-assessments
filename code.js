window.addEventListener('load', () => {
    // constantans
    const author_name = document.getElementsByName('author_name')[0];
    const author_email = document.getElementsByName('author_email')[0];
    const topic_title = document.getElementsByName('topic_title')[0];
    const topic_details = document.getElementsByName('topic_details')[0];
    const expected_result = document.getElementsByName("expected_result")[0];
    const target_level = document.getElementsByName("target_level")[0];

    // submit btn 
    const submit = document.querySelector('button');

    // submit listener
    submit.addEventListener('click', (e) => {

        // preventdefault behavior for submit btn
        e.preventDefault();
        // how to use ajax
        // i should take these values from html page user inputs 
        // but here i'm just trying it 
        const videoRequestOBJ = {
            author_name: author_name.value,
            author_email: author_email.value,
            topic_title: topic_title.value,
            topic_details: topic_details.value,
            expected_result: expected_result.value,
            target_level: target_level.value
        }
        // check
        console.log(videoRequestOBJ)
        // convert js object to json object to send it to webserver
        const videoRequestJSON = JSON.stringify(videoRequestOBJ);
        // server url 
        const url = 'http://localhost:7777/video-request';

        const xhr = new XMLHttpRequest();
        // open request
        xhr.open('POST', url, true);
        // set header to tell server what i'm going to send or the type of object text - html - json
        xhr.setRequestHeader('Content-type', 'application/json ; charset=utf-8');
        // initialize request
        xhr.send(videoRequestJSON);

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(xhr.status);
                console.log('post successfully created!');
            }
        }
    })
})