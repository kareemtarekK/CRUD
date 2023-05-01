let addnewperson = window.document.querySelector(".addnewperson")
let over_lay = window.document.querySelector(".over_lay");
let button_form = window.document.querySelector(".button_form")
let close = window.document.querySelector(".close");
//     this code to show overlay_modal and form_button
addnewperson.addEventListener('click', () => {
    button_form.style.display = "block";
    over_lay.classList.add("show_modal");
})
close.addEventListener("click", () => {
    button_form.style.display = "none";
    over_lay.classList.remove("show_modal");
})
let data_stored = localStorage.getItem("arr_storage");
let user_array = JSON.parse(data_stored || "[]");
// set values of inputs into array
let save_button = window.document.getElementById("save_b")
let user_input_name = document.getElementById("name");
let user_input_phone = document.getElementById("phone");
let user_input_email = document.getElementById("email");
let user_input_address = document.getElementById("address");
// this code to know it array hah a value from localstorage or [].

let real_id = user_array.length;
// this function to push data to array.
let functio = () => {
    user_array.push({
        user_id: real_id += 1,
        user_name: user_input_name.value,
        user_phone: user_input_phone.value,
        user_email: user_input_email.value,
        user_address:user_input_address.value
    })
}
// this function to fitch the data from array into table_tbody.
let t_body = document.querySelector(".tbody");
let t_body_function = () => {
    let trsss = '';
    user_array.forEach(element => {
        trsss += `<tr data-mark="${element.user_id}">
<td>${element.user_id}</td>
<td>${element.user_name}</td>
<td>${element.user_phone}</td>
<td>${element.user_email}</td>
<td>${element.user_address}</td>
<td class="blue test1">Edit</td>
<td class="red test2">Delete</td>
        </tr>
        `
    });
    t_body.innerHTML = trsss;
};
t_body_function();
// this function to remove values after send data to body.
let remove_function = () => {
    user_input_name.value = "";
        user_input_phone.value = "";
        user_input_email.value = "";
        user_input_address.value = "";
}
// this save handelar
let save = () => {
    functio();
    localStorage.setItem("arr_storage", JSON.stringify(user_array));
    t_body_function();
    remove_function();
    over_lay.classList.remove("show_modal");
    button_form.style.display = "none";
 }
save_button.addEventListener('click', save);
// this function to edit elements
let edit_delete_function = (e) => {
    if (e.target.classList.contains("blue")) {
        let current_tr = e.target.parentElement;
        let current_id = current_tr.dataset.mark;
        let index = parseInt(current_id) - 1;
        //to show over_lay and form
        over_lay.classList.add("show_modal");
        button_form.style.display = "block";
        //to bring data into inputs
        user_input_name.value = user_array[index].user_name;
        user_input_phone.value = user_array[index].user_phone;
        user_input_email.value = user_array[index].user_email;
        user_input_address.value = user_array[index].user_address;
        // update function to make a edit.
        let update_function = () => {
            let new_object = {
                user_id: parseInt(current_id),
                user_name: user_input_name.value,
                user_phone: user_input_phone.value,
                user_email: user_input_email.value,
                user_address: user_input_address.value
            }
            // to reassign newdata into arrays
            user_array[index] = new_object;
            // to save data into localstorage.
         localStorage.setItem("arr_storage", JSON.stringify(user_array));
            t_body_function();
            // to stope repeate update and operate add function.
            save_button.removeEventListener('click', update_function);
            save_button.addEventListener('click',save)
//to close over_lay and form.
            over_lay.classList.remove("show_modal");
            button_form.style.display = "none";
        }
        // to stope repeate add function.
        save_button.removeEventListener("click", save);
        // to update function.
        save_button.addEventListener("click", update_function);

    }
    //to delete one current tr.
    if (e.target.classList.contains("red")) {
        let current_tr = e.target.parentElement;
        let current_id = current_tr.dataset.mark;
        let index = parseInt(current_id) - 1;
        user_array.splice(index, 1);
        // to push new ata into localstorage.
        localStorage.setItem("arr_storage", JSON.stringify(user_array));
        t_body_function();
     }
 }
t_body.addEventListener("click", edit_delete_function);
// to operate search function.
let form_search = document.getElementById("form_search");
let input_search = document.getElementById("search");
let trs = document.querySelectorAll("tbody tr");
form_search.addEventListener("submit", (e) => {
    e.preventDefault();
})
input_search.addEventListener('keyup', () => {
    let sec_value = input_search.value.toLowerCase();
    trs.forEach(element => {
        let tr_name = element.children[1].textContent.toLowerCase();
        if (tr_name.includes(sec_value)) {
            element.style.display = "";
        }
        else {
            element.style.display = "none";
         }
     })


 })




 










