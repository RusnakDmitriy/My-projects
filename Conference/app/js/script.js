var $ = function(element){
    return document.getElementById(element);
},
elClass = function(element){
    return document.getElementsByClassName(element);
};
			
function getStyle(elem) {
    return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
}

function scrollBackground(){
    var el = document.getElementsByClassName('info'),
        countInfo = el.length,
        WinHeight = window.innerHeight,
        scroll = window.pageYOffset || document.documentElement.scrollTop,
        for(var i=0; i<countInfo; i++){
            var position = (scroll+WinHeight - el[i].offsetTop -350)/5;
            if(el[i].offsetTop<scroll+WinHeight && el[i].offsetTop>scroll-el[i].clientHeight)
                el[i].style.backgroundPosition = '0% ' + -position + 'px';
        }
}

window.addEventListener('scroll', function(){
    scrollBackground();
});

function clickMobMenu(){
    var clickCounter = 0;
    elClass('icon-menu')[0].addEventListener('click', function(){
        clickCounter++;
        if(clickCounter%2!==0){
            //elClass('menuList')[0].style.display = 'block';
            $('mainMenu').style.height = '450px';
        }
        else{
            //elClass('menuList')[0].style.display = 'none';
            $('mainMenu').style.height = '50px';
        }
    });
}
clickMobMenu();

function validateForm(){
    var form = document.forms.myQuestion,
        error = form.getElementsByClassName('error');
    
    form.onsubmit = function(e) {
        e.preventDefault();
        error[0].innerHTML = "";
        error[0].innerHTML += validate(form.elements.name, 1, 20);
        error[0].innerHTML += validateEmail(form.elements.email);
        error[0].innerHTML += validatePhone(form.elements.phone);
        if (error[0].innerHTML !== "") {
            return;
        }
        this.submit();
    };

    function validate(element, minlength, maxlength) {
        element.classList.remove("errorLight");
        if(minlength !== false && element.value.length < minlength) {
            element.classList.toggle("errorLight");
            return "Your " + element.name + " must contain at least " + minlength + " characters</br>";
        }
        if(maxlength !== false && element.value.length > maxlength) {
            element.classList.toggle("errorLight");
            return "Your " + element.name + " must contain maximum " + maxlength + " characters</br>";
        }
        return "";
    }

    function validatePhone(element) {
        var pattern = /^\+00\(0\d{2}\)\s(\d{3})-\d{2}-\d{2}$/;
        element.classList.remove("errorLight");
        if (element.value.search(pattern) > -1) {
            return "";
        }
        else {
            element.classList.toggle("errorLight");
            return "Telephone is not valid. The pattern of phone is +00(0##) ###-##-##<br>";
        }
    }
    
    function validateEmail(element) {
        var pattern = /.+@.+\..+/i;
        element.classList.remove("errorLight");
        if (element.value.search(pattern) > -1) {
            return "";
        }
        else {
            element.classList.toggle("errorLight");
            return "Email is not valid<br>";
        }
    }
}
validateForm();

function mapInitialize() {     
	var myLatlng = new google.maps.LatLng(23.7104, 90.40744);
	var myOptions = {
		zoom: 18,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map"), myOptions); 
}
mapInitialize();

//  AIzaSyBDgD3UQwlfcRdo8CamY5Ox_xD_KTIcLK0  APIkey for Google Map