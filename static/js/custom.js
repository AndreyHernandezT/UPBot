$(document).ready(function () {
	$('.chat_icon').click(function () {
		$('.chat_box').toggleClass('active');
	});
	$("form").on("submit", function (event) {
		var rawText = $("#text").val();
		if ($.trim(rawText) == '') {
			return false;
		}
		var userHtml = '<li class="resUser"><p class="userText">' + rawText + "</p></li>";
		$("#text").val("");
		$(".messages").append(userHtml);
		document.getElementById("userInput").scrollIntoView({
			block: "start",
			behavior: "smooth",
		});
		$.ajax({
			data: {
				msg: rawText,
			},
			type: "POST",
			url: "/get",
		}).done(function (data) {
			var botHtml = '<li class="resChat"><p class="botText">' + data + "</p></li>";
			$(".messages").append($.parseHTML(botHtml));
			document.getElementById("userInput").scrollIntoView({
				block: "start",
				behavior: "smooth",
			});
		});
		$(".messages").animate({ scrollTop: $(document).height() }, "fast");
		event.preventDefault();
	});
});