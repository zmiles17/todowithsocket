
function renderChecklist() {
    const circle = `<i class="fal fa-circle"></i>`;
    $.get("/checklist").then(function (res) {
        $("ul").empty();
        res.forEach(e => $("ul").append(`<li>${e.todo}${circle}</li>`).attr("data-id", e._id));
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


