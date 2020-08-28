function calculate(soldStocks, sellPrice) {
        return (soldStocks * sellPrice);
    }

    $('input').on('change', function () {
        var scope = $(this).closest('.row'),
            soldStocks = $('.soldStocks', scope).val(),
            sellPrice = $('.sellPrice', scope).val(),
            calculation = $('.calculation', scope);
        if ($.isNumeric(soldStocks) && $.isNumeric(sellPrice)) {
            calculation.val(calculate(soldStocks, sellPrice));
        } else {
            calculation.val('');
        }
    });