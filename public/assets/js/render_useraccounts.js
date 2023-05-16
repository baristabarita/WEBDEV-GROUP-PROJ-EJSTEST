$(document).ready(() => {
    const url = 'http://localhost:3000/accmng'
    load_data()
    
    function load_data() {
        $.ajax({
            url: url,
            method: 'POST',
            data: {accmng: 'fetch'},
            datatype: 'JSON',
            success: function(data) {
                let html = ''
                
                if (data.data.length > 0) {
                    for (let i = 0; i < data.data.length; i++) {
                        html += `
                        <tr>
                            <th><span class="custom-checkbox">
                                    <input type="checkbox" id="checkbox1" name="option[]" value="1">
                                    <label for="checkbox1"></label></th>
                            <th class="item-no">`+data.data[i].id+`</th>
                            <th class="account-fname">`+data.data[i].fname+`</th>
                            <th class="account-lname">`+data.data[i].lname+`</th>
                            <th class="account-username">`+data.data[i].username+`</th>
                            <th class="email">`+data.data[i].email+`</th>
                            <th class="account-category">`+data.data[i].category+`</th>
                            <th>
                                <button type="button" class="act-btn btn btn-outline-secondary view">
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                                <button type="button" class="act-btn btn btn-outline-warning edit_account" data-id="`+data.data[i].id+`">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button type="button" class="act-btn btn btn-outline-danger delete_account" data-id="`+data.data[i].id+`">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </th>
                        </tr>
                        `
                    }

                    $('#accounts_table tbody').html(html)
                }
            }
        });
    }

    $('#add_account').click(() => {
        $('#dynamic_modal_title').text('Add Account')
        $('#add_account_form')[0].reset()
        $('#accmng').val('Add')
        $('#accmng_btn').text('Add')
        $('#accmng_modal').modal('show')
    })

    $('#add_account_form').on('submit', e => {
        e.preventDefault()

        $.ajax({
            url: url,
            method: 'POST',
            data: $('#add_account_form').serialize(),
            dataType: 'JSON',
            beforeSend: function() {
                $('#accmng_btn').attr('disabled', 'disabled')
            },
            success: function(data) {
                $('#accmng_btn').attr('disabled', false)
                $('#message').html(`<div class="alert alert-success">`+data.message+`</div>`)
                $('#accmng_modal').modal('hide')

                load_data()

                setTimeout(() => $('#message').html(''), 5000)
            }
        })
    })

    $(document).on('click', '.edit_account', (e) => {

        const id = e.target.dataset.id

        $('#dynamic_modal_title').text('Edit Account')
        $('#accmng').val('Edit')
        $('#accmng_btn').text('Edit')
        $('#accmng_modal').modal('show')

        $.ajax({
            url: url,
            method: 'POST',
            data: {id:id, accmng:'fetch_single'},
            dataType: 'JSON',
            success: function(data) {
                $('#account_category').val(data.category)
                $('#fname').val(data.fname)
                $('#lname').val(data.lname)
                $('#username').val(data.username)
                $('#email').val(data.email)
                $('#fname').val(data.fname)
                $('#password').val(data.password)
                $('#phone_number').val(data.phone_number)
                $('#id').val(data.id)
            }
        })
    })

    $(document).on('click', '.delete_account', e => {
        const id = e.target.dataset.id
        const message = "Are you sure you want to delete this Account?"

        if (confirm(message)) {
            $.ajax({
                url: url,
                method: 'POST',
                data: { accmng: 'delete', id:id },
                dataType: 'JSON',
                success: function(data) {
                    $('#message').html(`<div class="alert alert-success">`+data.message+`</div>`)
                    load_data()

                    setTimeout(() => $('#message').html(''), 5000)
                }
            })
        }
    })
})