
function renderChecklist() {
    $.get("/checklist").then(function (res) {
        $("ul").empty();
        res.forEach(e => $("ul").append(`<li data-id="${e._id}">${e.todo}<i icon-id="${e._id}" class="fal fa-circle"></i></li>`));
        $(".fa-circle").on("click", function () {
            const id = $(event.target).parent().attr("data-id");
            $.ajax({ url: `/checklist/${id}`, method: "PUT", data: { completed: true } }).then(function (res) {
                if(this.data === "completed=true"){
                    console.log("Hi");
                };
            })
        })
    })
}

$("form").on("submit", function (event) {
    event.preventDefault();
    const input = $("input").val().trim();
    $("input").val("");
    $.post("/checklist", { todo: input }).then(function (res) {
        renderChecklist();
    })
})

renderChecklist();


