// document.body.style.background = '#000';
// document.documentElement.style.height = '100%';
// document.body.style.height = '100%';
// document.documentElement.style.width = '100%';
// document.body.style.width = '100%';
console.log("contetn.js");

if (window.location.hostname.includes("digikala")) {
    var button = document.createElement('button');
    var x = document.getElementsByClassName("c-product__add");

    //append all elements
    x[0].appendChild(button);
    button.addEventListener('click', function(e){
        //send message to ext
        var someInformation = {/*your msg here*/}
        chrome.extension.sendMessage({url: window.location.href}, function(response) {
            console.log("event");
        });
    }, false);
    button.style.border = 'none';
    button.style.backgroundColor = '#ef5661';
    button.style.color = 'rgb(255, 255, 255)';
    button.style.borderRadius = '10px';
    button.style.fontSize = '1.286rem';
    button.style.display = 'flex';
    button.style.flexFlow = 'row-reverse';
    button.style.justifyContent = 'center';
    button.style.marginRight = '10px';
    button.style.alignItems = 'center';
    button.style.cursor = 'pointer';
    button.style.padding = '16px';
    button.style.lineHeight = '1.222';
    button.innerText = 'افزودن به پایش';
}