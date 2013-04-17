$ ->
	# setting the height of the day column
	height_of_column = 750
	pixels_per_hour = height_of_column / 24
	$("td").css "height", height_of_column
	
	propagate_time_column = (pixels_per_hour) ->
		for hour in [0..23]
			if hour is 0
				$("#time_column").append("<div>#{hour}</div>")
			else
				new_div = $("#time_column").append("<div id='#{hour}'>#{hour}</div>")
				$("##{hour}").css("margin-top", pixels_per_hour)
	
	main_function = ->
		propagate_time_column(pixels_per_hour) # setting the time_column up and giving it times
		
		obj = jQuery.parseJSON('[{"start_time":12,"end_time":1},{"start_time":2,"end_time":3}]')
		console.log obj[0].start_time

	main_function()