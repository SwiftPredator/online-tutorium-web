
var queue = new Queue();
/*Listen for student enquue*/
document.getElementById("enqueue_student").addEventListener("click", ()=>{
    //queue.enqueue(0);
    document.getElementById("queueDesc").innerHTML = "Eigene Position";
    document.getElementById("enqueue_student").innerHTML =  "Austragen";
    document.getElementById("enqueue_student").style.color ="red";
});

