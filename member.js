function skillsMember() {
    var member = document.getElementById("member");
    var memberValue = member.options[member.selectedIndex].value;
    if (memberValue == "1") {
        document.getElementById("skillsMember").style.display = "block";
    } else {
        document.getElementById("skillsMember").style.display = "none";
    }
}
