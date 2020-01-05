class Queue{
	/* items = list of matrikelnumbers which are unique 
	Usage: var queue = new Queue(); for a new Queue-Object
	*/
	
	constructor(){
		this.items = [];
	}
	
	/*
	Checks if Queue is empty.
	*/
	isEmpty(){
		return this.items.length == 0;
	}
	
	/*
	Enqueues a student.
	*/
	enqueue(mnr){
		this.items.push(mnr);
		window.location.href = "tutor_room.html";
	}
	
	/*
	Dequeues a student. (Used by students)
	*/
	dequeue(mnr){
		this.items.splice(this.items.indexOf(mnr), 1); /* needs to be tested */
	}
	
	/*
	Dequeues the first student inside the queue and returns her/his Matrikelnumber. 
	(Used by tutors)
	*/
	getFirst(){
		if(!this.isEmpty()){
			return this.items.shift();
		}
	}
	
	/*
	Returns the current position given a valid "Matrikelnummer".
	Note: If given Matrikelnummer is invalid it should return 0.
	*/
	position(mnr){
		return (this.items.indexOf(mnr) + 1);
	}
	
	/*
	Return the numbers of students inside the queue
	*/
	length(){
		return this.items.length;
	}
}