function addTask() {
    let input = document.querySelector('.input');
    let list = document.querySelector('.list'); 
    if(input.value == "") {
        alert("Введите задачу");
    }

    else{
        let li = document.createElement('li');
            li.className = 'task';
            list.appendChild(li)
        let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox';
            checkbox.addEventListener('change', checkTask);
        let text = document.createElement('div');
            text.textContent = input.value;
            input.value = '';
            text.className = 'text';
        let deletbtn = document.createElement('button');
            deletbtn.className = 'deletbtn';
            deletbtn.textContent = 'X';
            deletbtn.addEventListener('click', deletTask);
            deletbtn.src = './img/DeletList.png'
            deletbtn.type = "image";
            document.body.appendChild(deletbtn);
        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deletbtn);
    } 
}

function deletTask({target}){
    target.closest('.task').remove();
}

function checkTask({target}){
    let text = target.closest('.task').querySelector('.text');
    text.classList.add('done');
    target.remove();
}