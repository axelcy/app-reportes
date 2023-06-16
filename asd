var btns = document.getElementsByName("importancia")
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("active");
                if (current.length > 0) {
                    current[0].className = current[0].className.replace(" active", "");
                }
                this.className += " active";
            })



            .active + label{
                background-color: #20295B !important;
                border-color: #20295B !important;
            }

            label.btn.btn-primary:hover{
                background-color: #5264C9 ;
                border-color: #5264C9 ;
            }