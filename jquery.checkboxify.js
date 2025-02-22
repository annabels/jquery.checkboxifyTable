(function ($)  {
	$.widget( 'stog.checkboxify', {

		options: {
			selectAll:			true,
			selectSome:			false,
			itemSelector:		'tr td:first-child',
			prependCheckbox:	false,
			commonParams:		null
		},

		_create: function() {
			var that = this;
			// add in checkboxes
			this.element.find(this.options.itemSelector).each( function () {
				var $this= $(this);
				var id = $this.parent().data('checkboxify-id');
				if(!id)
					id = $this.data('checkboxify-id');
				if(!id)
					id = $this.text().trim();

				let boxHtml = '<input type="checkbox" class="checkboxify" data-id="' + id + '">';
				if(that.options.prependCheckbox)
					$this.prepend(boxHtml);
				else {
					if($this.text().length > 0);
						boxHtml = '<br>' + boxHtml;

					$this.append(boxHtml);
				}
			});

			// create list of select All/Some Checkboxes
			let selects = [];
			let sAllOp = this.options.selectAll;
			let sSomeOps = this.options.selectSome;
			// selectAll case
			let s1 = null;
			if (sAllOp === true)
				s1 = {selector: null};
			else if(typeof sAllOp === 'string')
				s1 = {selector: null, label: sAllOp};
			else {		// sAllOp must be a hash
				s1 = sAllOp;
				s1.selector = null;
				//s1["selector"] = null;
			}
			if(!s1.label)
				s1.label = 'Select All';

			// selectSome cases
			if (sSomeOps) {
				if (!Array.isArray(sSomeOps))
					selects = [sSomeOps];
				else
					selects = sSomeOps;
			}
			// combine
			if (s1 !== null)
				selects.unshift(s1);

			let buttDiv;
			if (this.options.buttons || selects.length) {
				buttDiv = $('<div></div>');
				this.element.before(buttDiv);

				for (let sel of selects) {
					// work out selector
					let selector = '.checkboxify';
					if (sel.selector)
						selector = sel.selector + ' ' + selector;
					// add button
					let newButton = $('<button>' + sel.label + ' <span><input type="checkbox" class="checkboxify-all"></span></button>');
					newButton.click(function() {
						$(that.element).find(selector).prop('checked', $('input', this).prop('checked')).change();
					});
					if(sel.class)
						newButton.addClass(sel.class);
					buttDiv.append(newButton);

					// select all checkbox to react to changes to row checkboxes
					$(selector, that.element).change(function() {
						let nAll = $(selector, that.element).length;
						let nOn = $(selector + ':checked', that.element).length;
						if(!nOn) // Does this work??
						// TODO: newButton!! - should be class????
							$('input', newButton).prop('checked', false).prop('indeterminate', false);
						else if(nAll === nOn)
							$('input', newButton).prop('checked', true).prop('indeterminate', false);
						else
							$('input', newButton).prop('checked', true).prop('indeterminate', true);
					});
				}

				const nButtons = this.options.buttons.length;
				for(var i=0; i<nButtons; i++) {
					let but = this.options.buttons[i];
					let newButton = $('<button>' + but.label + '</button>');
					newButton.data('checkboxify-action', but.action)
						.data('checkboxify-params', but.params);
					if(but.confirm) {
						newButton.click(function(event) {
							if (!window.confirm(but.confirm)) {
								event.stopPropogation();
							}
						});
					}
					newButton.click(function() {
						let $this = $(this);
						var all_params = $.extend($this.data('checkboxify-params'), {id: that.getSelected()}, that.options.commonParams);
						$.redirect($this.data('checkboxify-action'), all_params);
					});
					if(but.class)
						newButton.addClass(but.class);
					buttDiv.append(newButton);
				}
			}
		},

		getSelected: function() {
			var a = this.element.find('input.checkboxify:checked').map( function () {
				return $(this).data('id');
			}).get();
			return a;
		}

	});

}( jQuery ));

