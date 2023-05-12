
$(document).ready(() => {
    const url = 'http://localhost:3000/prodmng'
    load_data()

    function load_data() {
        $.ajax({
            url: url,
            method: 'POST',
            data: {prodmng: 'fetch'},
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
                            <th class="product-name">`+data.data[i].name+`</th>
                            <th class="product-category">`+data.data[i].category+`</th>
                            <th class="quantity">`+data.data[i].quantity+`</th>
                            <th class="price">`+Number(data.data[i].price).toFixed(2)+`</th>
                            <th class="status">`+data.data[i].status+`</th>
                            <th>
                                <button class="act-btn btn btn-outline-secondary view_product">
                                <a href = "/user_view_products"><i class="fa-solid fa-eye"></i></a>
                                </button>
                                <button type="button" class="act-btn btn btn-outline-warning edit_product" data-id="`+data.data[i].id+`">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button type="button" class="act-btn btn btn-outline-danger delete_product" data-id="`+data.data[i].id+`">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </th>
                        </tr>
                        `
                    }

                    $('#products_table tbody').html(html)
                }
            }
        });
    }

    $('#add_product').click(() => {
        $('#dynamic_modal_title').text('Add Product')
        $('#add_product_form')[0].reset()
        $('#prodmng').val('Add')
        $('#prodmng_btn').text('Add')
        $('#prodmng_modal').modal('show')
    })

    $('#add_product_form').on('submit', e => {
        e.preventDefault()

        $.ajax({
            url: url,
            method: 'POST',
            data: $('#add_product_form').serialize(),
            dataType: 'JSON',
            beforeSend: function() {
                $('#prodmng_btn').attr('disabled', 'disabled')
            },
            success: function(data) {
                $('#prodmng_btn').attr('disabled', false)
                $('#message').html(`<div class="alert alert-success">`+data.message+`</div>`)
                $('#prodmng_modal').modal('hide')

                load_data()

                setTimeout(() => $('#message').html(''), 5000)
            }
        })
    })

    $(document).on('click', '.edit_product', (e) => {

        const id = e.target.dataset.id

        $('#dynamic_modal_title').text('Edit Product')
        $('#prodmng').val('Edit')
        $('#prodmng_btn').text('Edit')
        $('#prodmng_modal').modal('show')

        $.ajax({
            url: url,
            method: 'POST',
            data: {id:id, prodmng:'fetch_single'},
            dataType: 'JSON',
            success: function(data) {
                $('#product_name').val(data.name)
                $('#product_category').val(data.category)
                $('#product_price').val(data.price)
                $('#product_quantity').val(data.quantity)
                $('#product_description').val(data.description)
                $('#product_status').val(data.status)
                $('#id').val(data.id)
            }
        })
    })

    $(document).on('click', '.delete_product', e => {
        const id = e.target.dataset.id
        const message = "Are you sure you want to delete this product?"

        if (confirm(message)) {
            $.ajax({
                url: url,
                method: 'POST',
                data: { prodmng: 'delete', id:id },
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