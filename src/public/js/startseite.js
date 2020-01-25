
var queue = new Queue();
/*Listen for student enquue*/
var status = 0;
document.getElementById("enqueue_student").addEventListener("click", ()=>{
    //queue.enqueue(0);
    if(status == 0) {
        document.getElementById("queueDesc").innerHTML = "Eigene Position";
        document.getElementById("enqueue_student").innerHTML =  "Austragen";
        document.getElementById("enqueue_student").classList.add('btn-danger');
        document.getElementById("enqueue_student").classList.remove('btn-success');
        status = 1;
    } else {
        document.getElementById("queueDesc").innerHTML = "Personen in der Schlange";
        document.getElementById("enqueue_student").innerHTML =  "Eintragen";
        document.getElementById("enqueue_student").classList.add('btn-success');
        document.getElementById("enqueue_student").classList.remove('btn-danger');
        status = 0;
    }
});

