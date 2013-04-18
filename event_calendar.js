(function() {
  $(function() {
    var DAYS_IN_THE_MONTH, DAYS_OF_WEEK, append_dates_to_cal, build_calendar, get_week, go_backwards, go_forwards, main_function, populate_events, populate_time_column;
    DAYS_IN_THE_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    go_backwards = function(full_week, day_of_the_week, date, month) {
      if (date - 1 < 1) {
        return DAYS_IN_THE_MONTH[month - 1];
      } else {
        return date - 1;
      }
    };
    go_forwards = function(date, month) {
      if (date + 1 > DAYS_IN_THE_MONTH[month]) {
        return 1;
      } else {
        return date + 1;
      }
    };
    get_week = function() {
      var currentDate, date, day_of_the_week, full_week, month, saved_date, saved_day_of_the_week, year;
      currentDate = new Date();
      date = currentDate.getDate();
      month = currentDate.getMonth();
      year = currentDate.getFullYear();
      day_of_the_week = currentDate.getDay();
      full_week = new Array();
      saved_day_of_the_week = day_of_the_week;
      saved_date = date;
      full_week[day_of_the_week] = date;
      while (day_of_the_week >= 1) {
        day_of_the_week--;
        date = go_backwards(full_week, day_of_the_week, date, month);
        full_week[day_of_the_week] = date;
      }
      day_of_the_week = saved_day_of_the_week;
      date = saved_date;
      day_of_the_week++;
      while (day_of_the_week < 7) {
        date = go_forwards(date, month);
        full_week[day_of_the_week] = date;
        day_of_the_week++;
      }
      return full_week;
    };
    append_dates_to_cal = function(full_week) {
      var day, i, _results;
      full_week = get_week();
      _results = [];
      for (i = 0; i <= 7; i++) {
        day = i + 1;
        _results.push($("#" + DAYS_OF_WEEK[i] + "_title").text(DAYS_OF_WEEK[i] + " the " + full_week[i]));
      }
      return _results;
    };
    populate_time_column = function(pixels_per_hour) {
      var hour, new_div, _results;
      _results = [];
      for (hour = 0; hour <= 23; hour++) {
        _results.push(hour === 0 ? $("#time_column").append("<div>" + hour + "</div>") : (new_div = $("#time_column").append("<div id='" + hour + "'>" + hour + "</div>"), $("#" + hour).css("margin-top", pixels_per_hour - 20)));
      }
      return _results;
    };
    build_calendar = function() {
      var day, full_week, html_for_table;
      full_week = get_week();
      html_for_table = "<tr><td id='time_column'></td>";
      for (day = 0; day <= 6; day++) {
        html_for_table += "<td class='day_columns' id='the_" + full_week[day] + "'></td>";
      }
      html_for_table += "</tr>";
      return $("#calendar_table").append(html_for_table);
    };
    populate_events = function(events, pixels_per_hour) {
      var event, event_in_date, height, length, margin_top, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        event = events[_i];
        event_in_date = new Date(event.start_time * 1000);
        console.log(event_in_date);
        length = (event.end_time - event.start_time) / 3600;
        height = length * pixels_per_hour;
        margin_top = event_in_date.getHours() * pixels_per_hour + height / 2;
        $("#the_" + event_in_date.getDate()).append("<div style='margin-top:" + margin_top + "px; height: " + height + "px; background-color: red'></div>");
        console.log("margin_top: " + height);
        console.log("event.start_time * pixels_per_hour = " + event.start_time * pixels_per_hour);
        _results.push(console.log("length * pixels_per_hour = " + length * pixels_per_hour));
      }
      return _results;
    };
    main_function = function() {
      var events, height_of_column, pixels_per_hour;
      build_calendar();
      append_dates_to_cal();
      height_of_column = 750;
      pixels_per_hour = height_of_column / 24;
      $("td").css("height", height_of_column);
      populate_time_column(pixels_per_hour);
      events = jQuery.parseJSON('[{"start_time":1365958800,"end_time":1365962400},{"start_time":1366102800,"end_time":1366110000}]');
      return populate_events(events, pixels_per_hour);
    };
    return main_function();
  });
}).call(this);
