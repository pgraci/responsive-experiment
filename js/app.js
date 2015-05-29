$(document).ready(function() {

    $.getJSON("js/test.json", function(data){
        $.each(data, function(i){

          vari = parseInt(i) + 1;

          productdata = '<li id="' + i + '" class="product">';
          productdata += '<div class="product-wrap">\n';
            productdata += '<div class="product-id"><span>#' + vari + '</span></div>\n';
            productdata += '<div class="product-features">\n';

            if ((vari % 4 ) === 0 ) {
              productdata += '<div class="triangle" id="' + i + '-triangle"></div>\n';
            }

            productdata += '<ul>\n';

              $.each(data[i], function(i, field){
                  productdata += '<li>\n';
                    productdata += '<div class="features-label">' + field.label + '</div>\n';
                    productdata += '<div class="features-value">' + field.value + '</div>\n';
                  productdata += '</li>\n';
              });

            productdata += '</ul>\n';
            productdata += '</div>\n';
          productdata += '</div>\n';
          productdata += '</li>';

          $('#products').append(productdata);
        });

    });

    $('#products').on('click', 'div.triangle', function(event) {
      $("#" + this.id.replace("-triangle","")).remove();
    });

    adjustlayout();

});

var rtime = new Date(1, 1, 2000, 12,00,00);
var timeout = false;
var delta = 200;
$(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        adjustlayout();
    }
}

function adjustlayout() {

      if (window.innerWidth > 460) {

        totalrows = parseInt(window.innerHeight / 230);
        productsheight = (totalrows * 230)+45;
        productswidth = Math.ceil((200 / totalrows) * 450);

        if (totalrows == 1) {
          productstopmargin = ((window.innerHeight - productsheight) / 2)+16;
        } else {
          productstopmargin = ((window.innerHeight - productsheight) / 2)+11;
        }


        $("#products").css({"height": productsheight + "px", "width":  parseInt(productswidth) + "px", "margin-top":  productstopmargin + "px"});

      } else {
        $("#products").css({"height": "auto", "width": "100%", "margin-top": "0px"});
      }

}
