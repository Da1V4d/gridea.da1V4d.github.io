/**
 * Main JS file for Subtle behaviours
 */

// Responsive video embeds
let videoEmbeds = [
	'iframe[src*="youtube.com"]',
	'iframe[src*="vimeo.com"]'
];
reframe(videoEmbeds.join(','));

// Smooth scroll to anchors
var scroll = new SmoothScroll('[data-scroll]', {
	speed: 300,
	updateURL: false
});

// Gallery adjustments
var images = document.querySelectorAll('.kg-gallery-image img');
images.forEach(function (image) {
	var container = image.closest('.kg-gallery-image');
	var width = image.attributes.width.value;
	var height = image.attributes.height.value;
	var ratio = width / height;
	container.style.flex = ratio + ' 1 0%';
});

if (images.length) {
	window.addEventListener("load", function() {
		Lightense('.kg-gallery-image img', {
			background: 'rgba(255,255,255,.9)',
		});
	}, false);
}

// 侧栏由纯 CSS（checkbox + label + :has()）控制，参考 paper 主题，不依赖此处 JS

// 代码块复制按钮（仅文章正文）
(function () {
	var container = document.querySelector('.post-content');
	if (!container) return;
	var pres = container.querySelectorAll('pre');
	pres.forEach(function (pre) {
		var code = pre.querySelector('code');
		var text = (code ? code.textContent : pre.textContent) || '';
		var wrap = document.createElement('div');
		wrap.className = 'code-block-wrap';
		pre.parentNode.insertBefore(wrap, pre);
		wrap.appendChild(pre);
		var btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'code-copy-btn';
		btn.setAttribute('aria-label', '复制代码');
		btn.textContent = '复制';
		wrap.appendChild(btn);
		btn.addEventListener('click', function () {
			var label = btn.textContent;
			function done(success) {
				btn.textContent = success ? '已复制' : '复制';
				btn.disabled = true;
				setTimeout(function () {
					btn.textContent = label;
					btn.disabled = false;
				}, 1500);
			}
			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(text).then(function () { done(true); }).catch(function () { done(false); });
			} else {
				var ta = document.createElement('textarea');
				ta.value = text;
				ta.style.position = 'fixed';
				ta.style.left = '-9999px';
				document.body.appendChild(ta);
				ta.select();
				try {
					document.execCommand('copy');
					done(true);
				} catch (e) {
					done(false);
				}
				document.body.removeChild(ta);
			}
		});
	});
})();
