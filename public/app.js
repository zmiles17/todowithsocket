const date = new Date();
const day = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
$("header").append(`<h1>${day[date.getDay()]}</h1><h4>${month[date.getMonth()]}${date.getDate()}</h4><h4>${date.getFullYear()}</h4>`);

function renderChecklist() {
    $.get("/checklist").then(function (res) {
        $("ul").empty();
        for (let i = 0; i < res.length; i++) {
            if (res[i].completed === false) {
                $("ul").empty();
                res.forEach(e => $("ul").append(`<li data-id="${e._id}">${e.todo}<i class="far fa-circle"></i></li>`));
                $("li").on("click", function (event) {
                    if ($(event.target).attr("class") === "far fa-circle") {
                        const id = $(event.target).parent().attr("data-id");
                        $.ajax({ url: `/checklist/${id}`, method: "PUT", data: { completed: true } }).then(function (res) {
                            $(event.target).removeClass("fal fa-circle").addClass("far fa-times-circle");
                            console.log(res);
                        })
                    }
                })
            }
            else if (res[i].completed === true) {
                $("ul").empty();
                res.forEach(e => $("ul").append(`<li data-id="${e._id}">${e.todo}<i class="far fa-times-circle"></i></li>`));
            }
        }
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


