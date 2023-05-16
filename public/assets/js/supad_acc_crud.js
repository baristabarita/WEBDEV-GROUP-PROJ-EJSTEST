const API_URL = 'http://localhost:3000';

function renderAccounts(accounts) {
    const tbody = $('#accounts-table tbody');
    tbody.empty();
    accounts.forEach(account => {
        const row = `
        <tr>
        <td><span class="custom-checkbox">
                <input type="checkbox" id="checkbox1" name="option[]" value="1">
                <label for="checkbox1"></label></td>
        <td class="account-no">${account.id}</td>
        <td class="user-name">${account.username}</td>
        <td class="user-category">${account.category}</td>
        <td class="status">${account.email}</td>
        <td>
            <button class="btn btn-sm btn-primary">Edit</button>
            <button class="btn btn-sm btn-danger">Delete</button>
        </td>
    </tr>
    `;
        tbody.append(row);
    });
}
function fetchAccounts() {
    $.get(`${API_URL}/proventory`, data => {
        renderAccounts(data);

    });
}
//inserted and adding accounts
$('#account-form').on('submit', e => {
    e.preventDefault();
    const category = $('#category').prop('value');
    const fname = $('#fname').prop('value');
    const lname = $('#lname').prop('value');
    const username = $('#username').prop('value');
    const email = $('#email').prop('value');
    const password = $('#password').prop('value');
    const phone_number = $('#phone').prop('value');

    var postAccount = {
        "category": category, "fname": fname, "lname": lname, "username": username,
        "email": email, "password": password, "phone_number": phone_number
    };
    var json = JSON.stringify(postAccount);
    //console.log('Data sent to API:', JSON.stringify({ email }), JSON.stringify({ password }), JSON.stringify({ username }), JSON.stringify({ category }), JSON.stringify({ phone_number }), JSON.stringify({ fname }), JSON.stringify({ lname }));
    $.ajax({
        url: `${API_URL}/proventory`,
        type: 'POST',
        contentType: 'application/JSON',
        data: json,
        success: (data) => {
            fetchAccounts();
            $('#category').val('');
            $('#fname').val('');
            $('#lname').val('');
            $('#username').val('');
            $('#email').val('');
            $('#password').val('');
            $('#phone').val('');
        }
    });
});
//editing/updating accounts



$('body').on('click', '.update-button', function () {
    const id = $(this).data('id');
    const category = $(this).closest('tr').find('.user-category-content').prop('value');
    const fname = $(this).closest('tr').find('.user-fname-content').prop('value');
    const lname = $(this).closest('tr').find('.user-lname-content').prop('value');
    const username = $(this).closest('tr').find('.user-username-content').prop('value');
    const email = $(this).closest('tr').find('.user-email-content').prop('value');
    const password = $(this).closest('tr').find('.user-password-content').prop('value');
    const phone_number = $(this).closest('tr').find('.user-phone-content').prop('value');

    var editAccount = {
        "category": category, "fname": fname, "lname": lname, "username": username,
        "email": email, "password": password, "phone_number": phone_number
    };
    var json = JSON.stringify(editAccount);
    $.ajax({
        url: `${API_URL}/proventory/${id}`,
        type: 'PUT',
        contentType: 'application/json',
        data: json,
        success: () => {
            fetchAccounts();
        }
    });
});
//deleting accounts
$('body').on('click', '#del-btn', function () {
    const id = $(this).data('id');
    $.ajax({
        url: `${API_URL}/proventory/${id}`,
        type: 'DELETE',
        success: () => {
            fetchAccounts();
        }
    });
});

fetchAccounts();