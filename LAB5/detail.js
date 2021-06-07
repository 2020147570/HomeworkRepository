var data = JSON.parse(document.getElementById("detaildata").value)[0];

document.addEventListener("DOMContentLoaded", (() => {
    const div = document.getElementById("detail");

    const img = document.createElement("img");
    img.src = "." + data.product_image;
    img.alt = data.product_title;
    img.className = "detail_image_display";
    div.appendChild(img);

    const article1 = document.createElement("article");
    article1.innerHTML = "";
    article1.innerHTML += "<strong>ID</strong><br>";
    article1.innerHTML += "<strong>Title</strong><br>";
    article1.innerHTML += "<strong>Price</strong><br>";
    article1.innerHTML += "<strong>CATEGORY</strong>";
    article1.className = "detail_text_display1";
    div.appendChild(article1);
    const article2 = document.createElement("article");
    article2.innerHTML = "";
    article2.innerHTML += data.product_id + "<br>";
    article2.innerHTML += data.product_title + "<br>";
    article2.innerHTML += data.product_price + "원<br>";
    article2.innerHTML += data.product_category;
    article2.className = "detail_text_display2";
    div.appendChild(article2);
}), false);

fetch("../comment.json")
.then(response => response.json())
.then(json => display(json))
.catch(error => {
    console.log("Error: " + error);
});

function display (json) {
    var comment = json[data.product_id];
    const div = document.getElementById("comments");

    const table = document.createElement("div");
    table.id = "comments_table";
    const c0 = document.createElement("span");
    c0.className = "zeroth_comment";
    c0.innerHTML = "Feedback";
    table.appendChild(c0);
    for (var i = 1; i <= Object.keys(comment).length; i++) {
        const ci = document.createElement("span");
        ci.className = "ith_comment";
        ci.innerHTML = comment["c" + String(i)];
        table.appendChild(ci);
    }

    div.appendChild(table);

    const article = document.createElement("article");
    article.className = "comment_submit";
    article.innerHTML = "";
    article.innerHTML += "<label for='new_comment'><strong>Submit your review</strong></label><br>";
    article.innerHTML += "<input type='text' id='new_comment' placeholder='Review' /><br>";
    article.innerHTML += "<button type='button' id='submit_new_comment' onclick='submitNewComment(this)'>Submit</button>";

    div.appendChild(article);
}

function submitNewComment (button) {
    $.ajax ({
        url: "./:" + String(data.product_id),
        type: "POST",
        data: {
            newComment: $("input#new_comment").val()
        },
        success: function (data) {
            console.log(data);
        }
    })
}
