window.onload = function() {
    var url = "test.jpg";
    getLightness(url, function(b, g) {
        console.log(b + " " + g);
    });
}

function getLightness(imageSrc, callback) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var r, g, b, avg;

        var green = 0;
        for(var x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x + 1];
            b = data[x + 2];

            avg = Math.floor((r + g + b) / 3);
            green += g;
            colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width * this.height));
        var greenVal = Math.floor(green / (this.width * this.height));
        callback(brightness, greenVal);
    }
}