(function ($)  {
	$.widget( 'stog.checkboxify', {

		options: {
			selectAll:	true,
		},

		_create: function() {
			var that = this;
			// add in checkboxes
			this.element.find('tr td:first-child').each( function () {
				var $this= $(this);
				var id = $this.parent().data('checkboxify-id');
				if(!id)
					id = $this.text().trim();
				$this.append('<br><input type="checkbox" class="checkboxify" data-id="' + id + '">');
			});

			// add buttons
			if(this.options.buttons || this.options.selectAll) {
				buttDiv = $('<div></div>');
				this.element.before(buttDiv);

				if(this.options.selectAll) {
					// add select all button
					newButton = $('<button><span><input type="checkbox" class="checkboxify-all"></span></button>');
					newButton.click(function() {
							$(that.element).find('.checkboxify').prop('checked',$('input',this).prop('checked'));
					});
					if(this.options.selectAll.class)
						newButton.addClass(this.options.selectAll.class);
					buttDiv.append(newButton);

					// select all checkbox to react to changes to row checkboxes
					$('.checkboxify', that.element).change(function() {
						nAll = $('.checkboxify', that.element).length;
						nOn = $('.checkboxify:checked', that.element).length;
						if(!nOn)
							$('.checkboxify-all').prop('checked', false).prop('indeterminate',false);
						else if(nAll == nOn)
							$('.checkboxify-all').prop('checked', true).prop('indeterminate',false);
						else
							$('.checkboxify-all').prop('checked', true).prop('indeterminate', true);
					});
				}

				var nButtons = this.options.buttons.length;
				for(var i=0; i<nButtons; i++) {
					but = this.options.buttons[i];
					newButton = $('<button>' + but.label + '</button>')
					newButton.data('checkboxify-action', but.action)
					.data('checkboxify-params', but.params);
					if(but.confirm) {
						newButton.click(function(event) {
							if(!confirm(but.confirm))
								ev.stopPropogation();
						});
					}
					newButton.click(function() {
						$this = $(this);
						var all_params = $.extend($this.data('checkboxify-params'), {id: that.getSelected() });
						$.redirect($this.data('checkboxify-action'), all_params);
					});
					if(but.class)
						newButton.addClass(but.class);
					buttDiv.append(newButton)
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
