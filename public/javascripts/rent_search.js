$(function(){
    var autocomplete_text = ["성현빌딩","우영빌딩","59빌","블루빌","덕곡마을","명지대정문","동진마을"];
         $("#autocomplete").autocomplete({
            source: autocomplete_text
         });
})
