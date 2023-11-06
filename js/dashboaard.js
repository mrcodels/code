window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

// Posts Search
function updateData(limit, search, page) {
    $.ajax({
        type: 'GET',
        url: '/dashboard/search/posts',
        data: {
            'limit': limit,
            'search': search,
            'page': page
        },
        success: function(data) {
            $('#Content').html(data.html); 
            feather.replace();

            // Update pagination links
            $('.pagination').html(data.pagination);
        }
    });
}

$(document).ready(function() {
    updateData($('#postsLimitSelect').val(), '', 1);

    $('#postsSearch').on('input', function() {
        var value = $(this).val();
        updateData($('#postsLimitSelect').val(), value, 1);
    });

    $('#postsLimitSelect').on('change', function() {
        var limit = $(this).val();
        updateData(limit, $('#postsSearch').val(), 1);
    });

    $(document).on('click', '.pagination a', function(event) {
        event.preventDefault();
        var page = $(this).attr('href').split('page=')[1];
        var limit = $('#postsLimitSelect').val();
        var search = $('#postsSearch').val();
        updateData(limit, search, page);
    });
});



// Kategori Search
$('#kategoriSearch').on('input', function() {
    $value = $(this).val();

    if ($value) {
        $('#kategoriTable .allData').hide();
        $('#kategoriTable .searchData').show();
    } else {
        $('#kategoriTable .allData').show();
        $('#kategoriTable .searchData').hide();
    }

    $.ajax({
        type: 'get',
        url: '/dashboard/search/category',
        data: {
            'search': $value
        },
        success: function(data) {
            console.log(data);
            $('#kategoriTable #categoryData').html(data);
            feather.replace();
        }
    });
});
$(document).ready(function() {
    updateData($('#kategoriLimitSelect').val(), '');
    $('#kategoriLimitSelect').on('change', function() {
        var selectedValue = $(this).val();
        var searchValue = $('#kategoriSearch').val();
        updateData(selectedValue, searchValue);
    });
    $('#kategoriSearch').on('input', function() {
        var selectedValue = $('#kategoriLimitSelect').val();
        var searchValue = $(this).val();
        updateData(selectedValue, searchValue);
    });

    function updateData(limit, search) {
        $.ajax({
            type: 'GET',
            url: '/dashboard/search/category',
            data: {
                'limit': limit,
                'search': search
            },
            success: function(data) {
                $('#kategoriTable #categoryData').html(data);
                feather.replace();
            }
        });
    }
    updateData($('#kategoriLimitSelect').val(), '');
});


// Series Search
$('#seriesSearch').on('input', function() {
    $value = $(this).val();

    if ($value) {
        $('#seriesTable .allData').hide();
        $('#seriesTable .searchData').show();
    } else {
        $('#seriesTable .allData').show();
        $('#seriesTable .searchData').hide();
    }

    $.ajax({
        type: 'get',
        url: '/dashboard/search/category',
        data: {
            'search': $value
        },
        success: function(data) {
            console.log(data);
            $('#seriesTable #categoryData').html(data);
            feather.replace();
        }
    });
});
$(document).ready(function() {
    updateData($('#seriesLimitSelect').val(), '');
    $('#seriesLimitSelect').on('change', function() {
        var selectedValue = $(this).val();
        var searchValue = $('#seriesSearch').val();
        updateData(selectedValue, searchValue);
    });
    $('#seriesSearch').on('input', function() {
        var selectedValue = $('#seriesLimitSelect').val();
        var searchValue = $(this).val();
        updateData(selectedValue, searchValue);
    });

    function updateData(limit, search) {
        $.ajax({
            type: 'GET',
            url: '/dashboard/search/series',
            data: {
                'limit': limit,
                'search': search
            },
            success: function(data) {
                $('#seriesTable #seriesData').html(data);
                feather.replace();
            }
        });
    }
    updateData($('#seriesLimitSelect').val(), '');
});
