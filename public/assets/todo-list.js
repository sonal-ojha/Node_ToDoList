function onSubmitToDo() {
    var todo_text = document.getElementById("todo_item").value;
    fetch(`http://localhost:3001/todo?${todo_text}`, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item: todo_text }),
        }
    )
    .then(res => res.json())
    .then(result => result)
}

// locate your element and add the Click Event Listener
document.getElementById("todo-list-items").addEventListener("click",function(e) {
    // e.target is our targetted element.
    console.log(e.target.nodeName);
    if(e.target && e.target.nodeName == "BUTTON") {
        const deleteID = e.target.id;
        fetch(`http://localhost:3001/todo/${deleteID}`, 
        {
            method: 'DELETE',
        }
    )
    .then(res => res.json())
    .then(result => window.location.reload())}
});