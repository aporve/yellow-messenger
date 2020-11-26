
var claim_type;
var claim_msg_type;
var referenceNumber = null;
function getAccidentPage() {
    console.log('get accident page ');
    window.parent.postMessage(JSON.stringify({
        event_code: 'ym-client-event', data: JSON.stringify({
            event: {
                code: "nextaction",
                data: "accident"
            }
        })
    }), '*');
}

function getIllnessPage() {
    console.log('get illness page ');
    window.parent.postMessage(JSON.stringify({
        event_code: 'ym-client-event', data: JSON.stringify({
            event: {
                code: "nextaction",
                data: "illness"
            }
        })
    }), '*');
}

function getDeathPage() {
    console.log('get death page ');
    window.parent.postMessage(JSON.stringify({
        event_code: 'ym-client-event', data: JSON.stringify({
            event: {
                code: "nextaction",
                data: "death"
            }
        })
    }), '*');
}

function captcha() {
    // $('#refNoWarning').modal('hide');
    if (grecaptcha && grecaptcha.getResponse().length > 0) {

        referenceNumber = document.getElementById('reference_number').value
        trackProgress();
    } else {
        $("#err_recaptcha").text('Please verify the reCAPTCHA and tick the check box before submission');
        $("#err_recaptcha").show();
        // activeProcess()
    }
}

function trackUser() {

    $('.dropdown-content').toggle()
    $('.arrow-up').toggle();
    $('.arrow-down ').toggle();



}



function dummyRefNumberTest() {

    if ($('#reference_number').val() == '1234') {
        claim_type = 'accident';
        claim_msg_type = 'A-1'
        return true;
    }
    else if ($('#reference_number').val() == '5678') {
        claim_type = 'illness';
        claim_msg_type = 'I-2'
        return true;
    }
    else if ($('#reference_number').val() == '9012') {
        claim_type = 'death';
        claim_msg_type = 'D-2'
        return true;
    }
    else {
        return false;

    }
}

function trackProgress() {

    // api call on clicking GO button from claim status screen
    var response = {};
    claim_type = response['claim-type']         // to show header and description based on claim type
    claim_msg_type = response['claim-msg-type'] // to set the message shown based on status
    trackMessagesArr = response['trackMessages']  // to populate dropdown

    var x = dummyRefNumberTest() // for testing
    if (x == false) {
        $('#refNoWarning').modal('show');
    }
    else {
        displayDateForClaimStatus()
        $("#img_claim").hide();
        $("#claim").hide();
        $("#reference_No").hide();

        // document.getElementById('text').innerHTML = document.getElementById('payout-pickup-ill').innerHTML;
        // activeProcess()
        // activeProcessCircle()
        $("#err_recaptcha").text('');
        $("#err_recaptcha").hide();
        $("#reference-divider").show();
        $("#process_confirmation1").show();
        setClaimProgressScreen(); // to set header title and image for claim status screen
        trackProgressDropDown(trackMessagesArr) // for tracking progress dropdown
    }
}

// to set header title and image for claim status screen
function setClaimProgressScreen() {
    switch (claim_type) {
        case 'accident':
            setClaimProgressScreenHeader('accident')
            break;
        case 'illness':
            setClaimProgressScreenHeader('illness')
            break;
        case 'death':
            setClaimProgressScreenHeader('death')
            break;
        default: setClaimProgressScreenHeader('accident') // to be removed
            break;
    }
}

function setClaimProgressScreenHeader(title) {

    if (title == 'accident') {
        document.getElementById('claim-header-text').innerHTML = 'ACCIDENT';
        document.getElementById('claim-header-desc').innerHTML = 'We have your back and we&#8217;re here to help you focus on your recovery';
        document.getElementById('claim-header-img').src = './assets/images/accidental.png';
        setAccidentClaimStatusMsg()
    }
    else if (title == 'illness') {
        document.getElementById('claim-header-text').innerHTML = 'ILLNESS';
        document.getElementById('claim-header-desc').innerHTML = 'Don’t worry about your medical expenses because we’re here for you.';
        document.getElementById('claim-header-img').src = './assets/images/illness.png';
        setIllnessClaimStatusMsg()
    }
    else if (title == 'death') {
        document.getElementById('claim-header-text').innerHTML = 'DEATH';
        document.getElementById('claim-header-desc').innerHTML = 'Nothing can be harder than losing someone close to us, that’s why we’re here to help you in this trying time.';
        document.getElementById('claim-header-img').src = './assets/images/death.png';
        setDeathClaimStatusMsg()
    }
}


// functions to set the message for each claim status //
function setAccidentClaimStatusMsg() {
    switch (claim_msg_type) {
        case 'A-1':
            document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-1').innerHTML;
            document.getElementById("turnaround-time-ref").style.display = "block";
            document.getElementById("payment-ref").style.display = "none";
            twoStepperActive()

            break;
        case 'A-2':
            document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-2').innerHTML;
            document.getElementById("turnaround-time-ref").style.display = "none";
            document.getElementById("payment-ref").style.display = "none";
            allStepperActive()
            break;
        case 'A-3':
            document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-3').innerHTML;
            document.getElementById("turnaround-time-ref").style.display = "none";
            document.getElementById("payment-ref").style.display = "none";
            allStepperActive()
            break;
        case 'A-4':
            document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-4').innerHTML;
            document.getElementById("turnaround-time-ref").style.display = "none";
            document.getElementById("payment-ref").style.display = "none";
            allStepperActive()
            break;
        case 'A-5':
            document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-5').innerHTML;
            document.getElementById("turnaround-time-ref").style.display = "none";
            document.getElementById("payment-ref").style.display = "none";
            allStepperActive()
            break;
        default: document.getElementById('claim-msg-text').innerHTML = 'No message found'
            break;
    }
}
function setIllnessClaimStatusMsg() {
    switch (claim_msg_type) {
        case 'I-1':
            document.getElementById('claim-msg-text').innerHTML = document.getElementById('I-1').innerHTML;
            document.getElementById("turnaround-time-ref").style.display = "none";
            document.getElementById("payment-ref").style.display = "none";
            twoStepperActive()
            break;
        case 'I-2':
            document.getElementById('claim-msg-text').innerHTML = document.getElementById('I-2').innerHTML;
            document.getElementById("payment-ref").style.display = "block"; // to display payment box
            document.getElementById("turnaround-time-ref").style.display = "none";
            allStepperActive()
            break;
        case 'I-3':
            document.getElementById('claim-msg-text').innerHTML = document.getElementById('I-3').innerHTML;
            document.getElementById("payment-ref").style.display = "block";
            document.getElementById("turnaround-time-ref").style.display = "none";
            allStepperActive()
            break;
        default: document.getElementById('claim-msg-text').innerHTML = 'No message found'
            break;
    }

}
function setDeathClaimStatusMsg() {
    switch (claim_msg_type) {
        case 'D-1':
            document.getElementById('claim-msg-text').innerHTML = document.getElementById('D-1').innerHTML;
            document.getElementById("payment-ref").style.display = "block";
            document.getElementById("turnaround-time-ref").style.display = "none";
            allStepperActive()
            break;
        case 'D-2':
            document.getElementById('claim-msg-text').innerHTML = document.getElementById('D-2').innerHTML;
            document.getElementById("payment-ref").style.display = "block";
            document.getElementById("turnaround-time-ref").style.display = "none";
            allStepperActive()
            break;
        default: 'No message'
            break;
    }
}
// functions to set the message for each claim status //

//-----functions for stepper-----//

//function to be called if all three steps are to be highlighted//
function allStepperActive() {
    $("#step1").addClass("active");
    $("#step2").addClass("active");
    $("#step3").addClass("active");
    $("#step3").addClass("done");
    document.getElementById('step-circle-1').style.backgroundColor = "#8bc435";
    document.getElementById('step-circle-1').style.borderColor = "#8bc435";
    document.getElementById('step-circle-2').style.backgroundColor = "#8bc435";
    document.getElementById('step-circle-2').style.borderColor = "#8bc435";
    document.getElementById('step-circle-3').style.backgroundColor = "#8bc435";
    document.getElementById('step-circle-3').style.borderColor = "#8bc435";


    document.getElementById('step-circle-title-1').style.color = 'black';
    document.getElementById('step-circle-title-2').style.color = 'black';
    document.getElementById('step-circle-title-3').style.color = '#8bc435';
    //change stepper bar colour based on status//
    document.getElementById('step-circle-1').style.width = '20px';
    document.getElementById('step-circle-1').style.height = '20px';
    document.getElementById('step-circle-2').style.width = '20px';
    document.getElementById('step-circle-2').style.height = '20px';
    //change stepper bar colour based on status//
    document.getElementById('step-bar-1').style.border = '1px solid #8bc435'
    document.getElementById('step-bar-2').style.border = '1px solid #8bc435'
    document.getElementById('step-bar-3').style.border = '1px solid #8bc435'
    document.getElementById('step-bar-4').style.border = '1px solid #8bc435'


}

//function to be called if only two steps are to be highlighted//
function twoStepperActive() {
    $("#step1").addClass("active");
    $("#step2").addClass("active");
    $("#step3").addClass("done");
    document.getElementById('step-circle-1').style.backgroundColor = "#b8123e";
    document.getElementById('step-circle-1').style.borderColor = "#b8123e";
    document.getElementById('step-circle-2').style.backgroundColor = "#b8123e";
    document.getElementById('step-circle-2').style.borderColor = "#b8123e";

    document.getElementById('step-circle-title-1').style.color = 'black';
    document.getElementById('step-circle-title-2').style.color = 'black';
    document.getElementById('step-circle-title-3').style.color = '#c7c2c2';

    document.getElementById('step-circle-3').style.backgroundColor = "#c7c2c2";
    document.getElementById('step-circle-3').style.borderColor = "#c7c2c2";
    //change stepper circle size based on status//
    document.getElementById('step-circle-1').style.width = '20px';
    document.getElementById('step-circle-1').style.height = '20px';
    document.getElementById('step-circle-2').style.width = '20px';
    document.getElementById('step-circle-2').style.height = '20px';
    //change stepper bar colour based on status//
    document.getElementById('step-bar-1').style.border = '1px solid rgb(184, 18, 62)'
    document.getElementById('step-bar-2').style.border = '1px solid rgb(184, 18, 62)'

}
/* -------functions for stepper------ */

function trackProgressDropDown(trackMessagesArr) {
    //to be reomvesd -testing
    if (claim_msg_type == 'A-1') {
        trackMessagesArr = [1, 4, 5, 7, 8] // for testing - to be removed
    }
    if (claim_msg_type == 'I-2') {
        trackMessagesArr = [2, 4, 6, 7, 8, 9, 11] // for testing - to be removed
    }

    if (claim_msg_type == 'D-2') {
        trackMessagesArr = [3, 4, 6, 7, 11, 12] // for testing - to be removed
    }
    else {
        trackMessagesArr = [1, 4, 5, 7, 8] // for testing - to be removed
    }
    //to be reomved -testing

    var finaltext = '';
    trackMessagesArr.forEach(function (item) {
        progress_msges.forEach(function (msg) {
            if (item == msg['id']) {
                finaltext = finaltext + '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + msg['msg'] + '</div></div></div>'
                // break;
            }

        })

    });
    console.log('finaltext' + finaltext)
    document.getElementById('progs-status').innerHTML = finaltext // set the populated dropdown details to html
}


/* function to display date at top in the claim status screen */

function displayDateForClaimStatus() {
    var date = new Date();

    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    };

    var x = date.toLocaleDateString("en", options);
    var parts = x.split(',');
    var day = parts[0];
    var mnthDate = parts[1].split(' ')[1];
    var year = parts[2];
    var time = parts[3];
    var finalDate = day + ' ' + date.getDate() + ' ' + mnthDate + year + ' at ' + time;
    document.getElementById("displayDt").innerHTML = finalDate
}




