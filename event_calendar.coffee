$ ->
	DAYS_IN_THE_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	DAYS_OF_WEEK = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
	
	go_backwards = (full_week, day_of_the_week, date, month) ->
		if date - 1 < 1
			DAYS_IN_THE_MONTH[month - 1]
		else
			return date - 1;

	go_forwards = (date, month) ->
		if date + 1 > DAYS_IN_THE_MONTH[month]
			return  1
		else
			return date + 1
	
	get_week = ->
		currentDate = new Date()
		date = currentDate.getDate()
		month = currentDate.getMonth() # January is 0, febrauary is 1, etc. Didn't add 1 so it can be used smoothly in DAYS_IN_THE_MONTH
		year = currentDate.getFullYear()
		day_of_the_week = currentDate.getDay()
		full_week = new Array()
		
		saved_day_of_the_week = day_of_the_week
		saved_date = date
		full_week[day_of_the_week] = date
		

		# populating the full_week array
		
		# going down the week
		while(day_of_the_week >= 1) 
			day_of_the_week-- # going back a day for the next iteration
			date = go_backwards(full_week, day_of_the_week, date, month)
			full_week[day_of_the_week] = date
	
		day_of_the_week = saved_day_of_the_week # bringing day_of_the_week back to today
		date = saved_date # bringing the date back to today
		day_of_the_week++ # so we start with tommorow, because today is already set
		
		# going up the week
		while(day_of_the_week < 7) 
			date = go_forwards(date, month)
			full_week[day_of_the_week] = date
			day_of_the_week++ # going forward a day for the next iteration
		
		full_week
		
	append_dates_to_cal = (full_week) ->
		for i in [0..7]
			day = i + 1
			$("#" + DAYS_OF_WEEK[i] + "_title").text(DAYS_OF_WEEK[i] + " the " + full_week[i])

	propagate_time_column = (pixels_per_hour) ->
		for hour in [0..23]
			if hour is 0
				$("#time_column").append("<div>#{hour}</div>")
			else
				new_div = $("#time_column").append("<div id='#{hour}'>#{hour}</div>")
				$("##{hour}").css("margin-top", pixels_per_hour)
	
	main_function = ->
		
		full_week = get_week()
		append_dates_to_cal(full_week)
	
		# setting the height of the day column
		height_of_column = 750
		pixels_per_hour = height_of_column / 24
		$("td").css "height", height_of_column
	
		propagate_time_column(pixels_per_hour) # setting the time_column up and giving it times
		
		events = jQuery.parseJSON('[{"start_time":12,"end_time":1},{"start_time":2,"end_time":3}]')
		# adding the new event div, starting with everything on sunday
		for event in events.length
			length = 1
			$("#sunday").append("<div></div>")

	main_function()