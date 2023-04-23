const querystring = require("querystring");
const { Curl } = require("node-libcurl");
const terminate = curlTest.close.bind(curlTest);

const curlTest = new Curl();

//URL :
curlTest.setOpt(Curl.option.URL, "https://reqres.in/api/users");
//Method : POST
curlTest.setOpt(Curl.option.POST, true);
// POST Parameters :
curlTest.setOpt(
	Curl.option.POSTFIELDS,
	querystring.stringify({
		name: "section",
		job: "webdev",
	})
);

// File Upload using multipart form upload.
curl.setOpt(Curl.option.URL, '<the-backend-script-url-for-processing-the-upload>');
curl.setOpt(Curl.option.HTTPPOST, [
    { 
        name: '<name-of-input>', 
        file: '<path-in-your-device-directory>', 
        type: '<filetype>' 
    }
]);

curlTest.on("end", function (statusCode, data, headers) {
	console.info("Status code " + statusCode);
	console.info("***");
	console.info("Our response: " + data);
	console.info("***");
	console.info("Length: " + data.length);
	console.info("***");
	console.info("Total time taken: " + this.getInfo("TOTAL_TIME"));

	this.close();
});
curlTest.on("error", terminate);

curlTest.perform();
