'use strict';

var startBtn = document.querySelector('.start-notification');
var stopBtn = document.querySelector('.stop-notification');

var onMsg = document.querySelector('.notify-on');
var offMsg = document.querySelector('.notify-off');

stopBtn.style.display = 'none';
onMsg.style.display = 'none';

var intervalId = 0;
var notificationInterval = 1800000;

document.addEventListener("DOMContentLoaded", function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(function (reg) {
            return console.log();
        }).catch(function (err) {
            return console.log();
        });
    }
});

var onStart = function onStart() {
    startNotification();
};

var onStop = function onStop() {
    setUpOnStop();
    stopNotification();
};

var startNotification = function startNotification() {
    if (!window.Notification) {
        alert('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            setUpOnStart();
            toastr.info('Welcome user , you will get drink water notification in every thirty minutes.Thanks');
            speak('Welcome user , you will get drink water notification in every thirty minutes.thanks');
            intervalId = setInterval(function () {
                showNotification();
            }, notificationInterval);
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    setUpOnStart();
                    toastr.info('Welcome user , you will get drink water notification in every thirty minutes.Thanks');
                    speak('Welcome user , you will get drink water notification in every thirty minutes.thanks');
                    intervalId = setInterval(function () {
                        showNotification();
                    }, notificationInterval);
                } else {
                    alert('User blocked notifications.');
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
};

var showNotification = function showNotification() {
    var notification = new Notification('DRINK WATER NOTIFIER', {
        icon: './water-bottle.png',
        body: 'Hey user , Please drink water!'
    });
};

var stopNotification = function stopNotification() {
    toastr.error('Your drink water notification has been stopped.Thanks');
    speak('Your drink water notification has been stopped.thanks');
    clearInterval(intervalId);
};

var setUpOnStart = function setUpOnStart() {
    startBtn.style.display = 'none';
    stopBtn.style.display = 'block';

    offMsg.style.display = 'none';
    onMsg.style.display = 'block';
};

var setUpOnStop = function setUpOnStop() {
    startBtn.style.display = 'block';
    stopBtn.style.display = 'none';

    offMsg.style.display = 'block';
    onMsg.style.display = 'none';
};

var speak = function speak(text) {
    var utter = new SpeechSynthesisUtterance();
    utter.text = text;
    window.speechSynthesis.speak(utter);
};