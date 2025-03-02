// import binaryImage from './dvoichnii-kod.jpg';
import './styles.scss';

// document.querySelector('.todo').style.backgroundImage = `url(${binaryImage})`;


// const ulTodoEl = document.querySelector('.todo__list');
// const btnAddTodo = document.querySelector('.todo__btn');

// document.addEventListener('DOMContentLoaded', () => {
//     const saveToLocalStorage = localStorage.getItem('todos');
//     if (saveToLocalStorage) {
//         ulTodoEl.innerHTML = saveToLocalStorage;
//     }
// })

// ulTodoEl.addEventListener('click', (event) => {
//     if (event.target.tagName === 'BUTTON') {
//         event.target.parentElement.remove();
//         setItemLoalStorage();
//     }
// });

// ulTodoEl.addEventListener('change', (event) => {
//     if (event.target.type === 'checkbox') {
//         if (event.target.checked) {
//             event.target.setAttribute('checked', 'checked');
//         } else {
//             event.target.removeAttribute('checked');
//         }
//         setItemLoalStorage();
//     }
// })

// btnAddTodo.addEventListener('click', (event) => {
//     event.preventDefault();
//     const inputTodoEl = document.querySelector('.todo__input');
//     const inputTodoElValue = inputTodoEl.value.trim();

//     if (inputTodoElValue === '') {
//         return;
//     }

//     const liTodoEl = document.createElement('li');

//     const checkBoxEl = document.createElement('input');
//     checkBoxEl.type = 'checkbox';
//     liTodoEl.appendChild(checkBoxEl);

//     const spanTodoEl = document.createElement('span');
//     spanTodoEl.textContent = inputTodoElValue;
//     liTodoEl.appendChild(spanTodoEl);

//     const btnDel = document.createElement('button');
//     btnDel.textContent = 'X';
//     liTodoEl.appendChild(btnDel);

//     ulTodoEl.appendChild(liTodoEl);

//     inputTodoEl.value = '';

//     setItemLoalStorage();
// });


// --------------------------------------------------------------------------------------------------------
const ulTodoEl = $(".todo__list");
const btnAddTodo = $(".todo__btn");

$(function () {
    const saveToLocalStorage = localStorage.getItem('todos');
    if (saveToLocalStorage) {
        ulTodoEl.html(saveToLocalStorage);
    }
})

function setItemLoalStorage() {
    localStorage.setItem('todos', ulTodoEl.html());
}

$(ulTodoEl).on('click', 'button', function () {
    this.parentElement.remove();
    setItemLoalStorage();
})

$(ulTodoEl).on('change', 'input[type="checkbox"]', function () {

    if (this.checked) {
        this.setAttribute('checked', 'checked');
    } else {
        this.removeAttribute('checked');
    }
    setItemLoalStorage();
})

$(btnAddTodo).on('click', function (event) {
    event.preventDefault();
    const inputTodoEl = $('.todo__input');
    const inputTodoElValue = inputTodoEl.val().trim();

    if (inputTodoElValue === '') {
        $('#alertMessage').show();
        inputTodoEl.focus();
        setTimeout(() => $('#alertMessage').hide(), 3000);
        return;
    }

    const liTodoEl = $('<li></li>').addClass('todo__list-item');

    const checkBoxEl = $('<input>').attr('type', 'checkbox');
    $(liTodoEl).append(checkBoxEl);

    const spanTodoEl = $('<span></span>').text(inputTodoElValue);
    $(liTodoEl).append(spanTodoEl);

    const btnDel = $('<button></button>').text('X').addClass("todo__btn todo__btn-danger");
    $(liTodoEl).append(btnDel);

    $(ulTodoEl).append(liTodoEl);

    inputTodoEl.val('');

    setItemLoalStorage();
});

$(document).ready(function () {
    $('.myModal').dialog({
        autoOpen: false,
        modal: true,
        title: 'Task',
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        },

    })
    $(ulTodoEl).on('click', 'span', function () {
        const taskText = $(this).text();
        $('.myModal p').text(taskText);
        $('.myModal').dialog('open');
    });
});





