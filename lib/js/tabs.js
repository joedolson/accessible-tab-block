window.addEventListener( 'load', function () {
	const tabBlocks = document.querySelectorAll('.wp-block-tb-tabs');

	[...tabBlocks].forEach(function (tabBlock) {
		const tabLabels = tabBlock.querySelectorAll('.tb__tab-label');
		const tabPanels = tabBlock.querySelectorAll('.tb__tab-panel');

		tabLabels.forEach( function ( label, i ) {
			label.setAttribute( 'id', 'tablabel_' + i );
			tabPanels[i].setAttribute( 'aria-labelledby', 'tablabel_' + i );
		});

		//check for mouse click or keydown.
		const toggleEvent = function (e) {
			if ( e.type === 'click' ) {
				return true;
			} else if ( e.type === 'keydown' ) {
				const code = e.charCode || e.keyCode;
				if ( code === 32 || code === 13 ) {
					return true;
				}
				if ( code === 37 ) {
					return 'move-left';
				}
				if ( code === 39 ) {
					return 'move-right';
				}
				return false;
			} else {
				return false;
			}
		}; // a11yEvent

		const toggleTabClasses = function (label, i) {
			const activeTab   = tabBlock.querySelector('.tb__tab-label.active');
			const activePanel = tabBlock.querySelector(
				'.tb__tab-panel.active'
			);

			activeTab.classList.remove('active');
			activeTab.setAttribute('aria-selected', false);

			label.classList.add('active');
			label.setAttribute('aria-selected', true);

			activePanel.classList.remove('active');
			activePanel.setAttribute('aria-selected', false);
			activePanel.setAttribute('hidden', true);

			tabPanels[i].classList.add('active');
			tabPanels[i].setAttribute('aria-selected', true);
			tabPanels[i].removeAttribute('hidden');
		};

		const moveTabFocus = function ( i ) {
			var label   = tabLabels[i];
			var labelId = label.getAttribute( 'id' );
			var control = document.getElementById( labelId );
			control.focus();
			toggleTabClasses( label, i );
		}

		var total = tabLabels.length;
		tabLabels.forEach(function (label, i) {
			if (label.classList.contains('active')) {
				tabPanels[i].classList.toggle('active');
			}

			label.addEventListener('click', function (e) {
				if (toggleEvent(e) === true) {
					toggleTabClasses(label, i);
				}
			});
			label.addEventListener('keydown', function (e) {
				if (toggleEvent(e) === true) {
					toggleTabClasses(label, i);
				}
				if ( toggleEvent(e) === 'move-right' && i < total ) {
					moveTabFocus( i + 1 );
				}
				if ( toggleEvent(e) === 'move-left' && i > 0 ) {
					moveTabFocus( i - 1 );
				}
			});
		});
	}); //tabBlocks forEach
});
