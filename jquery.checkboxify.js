(function ($)  {
	$.widget( 'stog.checkboxify', {

		_create: function() {
			var that = this;
			// add in checkboxes
			this.element.find('tr td:first-child').each( function () {
				var $this= $(this);
				var id = $this.parent().data('checkboxify-id');
				if(!id)
					id = $this.html();
				$this.append('<br><input type="checkbox" class="checkboxify" data-id="' + id + '">');
			});
			
			// add buttons
			if(this.options.buttons) {
				var nButtons = this.options.buttons.length;
				buttDiv = $('<div></div>');
				this.element.before(buttDiv);
				for(var i=0; i<nButtons; i++) {
					but = this.options.buttons[i];
					newButton = $('<button>' + but.label + '</button>')
					newButton.data('checkboxify-action', but.action)
					.data('checkboxify-params', but.params)
					.click(function() {
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

