define 'views/pages/hire', [ 'views/pages/PageView' ], (PageView)->

	class Hire extends PageView
		template: '#hire-page-template'
		className: 'hire-p'

		render:->
			super
			@$el.addClass 'animated fadeInDown'
			@

	Hire














