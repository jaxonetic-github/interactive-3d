Template.rtc.rendered = function() {
	// Muaz Khan     - https://github.com/muaz-khan
	// MIT License   - https://www.webrtc-experiment.com/licence/
	// Documentation - https://github.com/muaz-khan/WebRTC-Experiment/tree/master/RTCMultiConnection

	var connection = new RTCMultiConnection();
	var sessions = { };
	
	connection.session = {
		audio : true,
		video : true
	};

	connection.onstream = function(e) {
		console.log("onstream");
		e.mediaElement.width = 600;
		videosContainer.insertBefore(e.mediaElement, videosContainer.firstChild);
		rotateVideo(e.mediaElement);
		scaleVideos();
	};

	function rotateVideo(mediaElement) {
		mediaElement.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
		setTimeout(function() {
			mediaElement.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
		}, 1000);
	}


	connection.onstreamended = function(e) {
		e.mediaElement.style.opacity = 0;
		rotateVideo(e.mediaElement);
		setTimeout(function() {
			if (e.mediaElement.parentNode) {
				e.mediaElement.parentNode.removeChild(e.mediaElement);
			}
			scaleVideos();
		}, 1000);
	};
	connection.onNewSession = function(connectionSession) {
		
		if (!connectionSession)
			throw 'No such session exists.';

		if (sessions[connectionSession.sessionid])
			return;
		sessions[connectionSession.sessionid] = connectionSession;

		var tr = document.createElement('tr');
		tr.innerHTML = '<td><strong>' + connectionSession.extra['session-name'] + '</strong> is running a conference!</td>' + '<td><button class="join">Join</button></td>';
		roomsList.insertBefore(tr, roomsList.firstChild);

		var joinRoomButton = tr.querySelector('.join');
		joinRoomButton.setAttribute('data-sessionid', connectionSession.sessionid);
		joinRoomButton.onclick = function() {
			this.disabled = true;

			var sessionid = this.getAttribute('data-sessionid');
			connectionSession = sessions[sessionid];

			connection.join(connectionSession);
		};
	};

	var videosContainer = document.getElementById('videos-container') || document.body;
	var roomsList = document.getElementById('rooms-list');

	// setup signaling to search existing sessions
	connection.connect();

	(function() {
		var uniqueToken = document.getElementById('unique-token');
		if (uniqueToken)
			if (location.hash.length > 2)
				uniqueToken.parentNode.parentNode.parentNode.innerHTML = '<h2 style="text-align:center;"><a href="' + location.href + '" target="_blank">Share this link</a></h2>';
			else
				uniqueToken.innerHTML = uniqueToken.parentNode.parentNode.href = '#' + (Math.random() * new Date().getTime()).toString(36).toUpperCase().replace(/\./g, '-');
	})();

	function scaleVideos() {
		var videos = document.querySelectorAll('video'), length = videos.length, video;

		var minus = 130;
		var windowHeight = 700;
		var windowWidth = 600;
		var windowAspectRatio = windowWidth / windowHeight;
		var videoAspectRatio = 4 / 3;
		var blockAspectRatio;
		var tempVideoWidth = 0;
		var maxVideoWidth = 0;

		for (var i = length; i > 0; i--) {
			blockAspectRatio = i * videoAspectRatio / Math.ceil(length / i);
			if (blockAspectRatio <= windowAspectRatio) {
				tempVideoWidth = videoAspectRatio * windowHeight / Math.ceil(length / i);
			} else {
				tempVideoWidth = windowWidth / i;
			}
			if (tempVideoWidth > maxVideoWidth)
				maxVideoWidth = tempVideoWidth;
		}
		for (var i = 0; i < length; i++) {
			video = videos[i];
			if (video)
				video.width = maxVideoWidth - minus;
		}
	}


	window.onresize = scaleVideos;
	document.getElementById('leave-conference').onclick = function() {
		connection.leave();

		enableAllButtons();
		disableCloseButtons();
	};
	document.getElementById('setup-new-conference').onclick = function() {

		this.disabled = true;
		var sessionName = $('#conference-name').val();

		connection.extra = {
			'session-name' : sessionName
		};
		connection.open(sessionName);

	};
}
