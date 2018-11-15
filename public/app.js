const socket = io();
const date = new Date();
const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
$("header").append(`<h1>${day[date.getDay()]}</h1><h4>${month[date.getMonth()]} ${date.getDate()} <span>${date.getFullYear()}</span></h4>`);

function renderChecklist() {
    $.get("/api/checklist").then(function (res) {
        $("ul").empty();
        res.forEach(e => $("ul").append(`<li data-id="${e._id}">${e.todo}<i class="far ${e.completed ? "fa-times-circle" : "fa-circle"}"></i></li>`));
        $(".fa-times-circle").parent().css("color", "lightsteelblue");
        $(".fa-times-circle").on("click", deleteItem);
        $("li").on("click", function (event) {
            if ($(event.target).attr("class") === "far fa-circle") {
                const id = $(event.target).parent().attr("data-id");
                $.ajax({ url: `/api/checklist/${id}`, method: "PUT", data: { completed: true } }).then(function (res) {
                    socket.emit("checked-list", {completed: true})
                    $(event.target).removeClass("far fa-circle").addClass("far fa-times-circle");
                    $(".fa-times-circle").parent().css("color", "lightsteelblue");
                    $(".fa-times-circle").on("click", deleteItem);
                })
            }
        })
    })
}

function deleteItem (event) {
    const id = $(event.target).parent().attr("data-id");
    $.ajax({ url: `/api/checklist/${id}`, method: "DELETE"}).then(function(res){
        socket.emit("delete-list", { _id: id})
        $(event.target).parent().remove();
    })
}

$("form").on("submit", function (event) {
    event.preventDefault();
    const input = $("input").val().trim();
    $("input").val("");
    $.post("/api/checklist", { todo: input }).then(function (res) {
        socket.emit("new-message", { todo: input })
    })
})

socket.on("emit-message", function (data) {
    renderChecklist();
})

socket.on("emit-checked", function(data){
    renderChecklist();
})

socket.on("emit-deleted", function(data){
    renderChecklist();
})

renderChecklist();


