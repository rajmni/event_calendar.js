(function() {
  $(function() {
    var DAYS_IN_THE_MONTH, DAYS_OF_WEEK, append_dates_to_cal, get_week, go_backwards, go_forwards, main_function, propagate_time_column;
    DAYS_IN_THE_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    DAYS_OF_WEEK = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
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
      _results = [];
      for (i = 0; i <= 7; i++) {
        day = i + 1;
        _results.push($("#" + DAYS_OF_WEEK[i] + "_title").text(DAYS_OF_WEEK[i] + " the " + full_week[i]));
      }
      return _results;
    };
    propagate_time_column = function(pixels_per_hour) {
      var hour, new_div, _results;
      _results = [];
      for (hour = 0; hour <= 23; hour++) {
        _results.push(hour === 0 ? $("#time_column").append("<div>" + hour + "</div>") : (new_div = $("#time_column").append("<div id='" + hour + "'>" + hour + "</div>"), $("#" + hour).css("margin-top", pixels_per_hour)));
      }
      return _results;
    };
    main_function = function() {
      var event, events, full_week, height_of_column, length, pixels_per_hour, _i, _len, _ref, _results;
      full_week = get_week();
      append_dates_to_cal(full_week);
      height_of_column = 750;
      pixels_per_hour = height_of_column / 24;
      $("td").css("height", height_of_column);
      propagate_time_column(pixels_per_hour);
      events = jQuery.parseJSON('[{"start_time":12,"end_time":1},{"start_time":2,"end_time":3}]');
      _ref = events.length;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        length = 1;
        _results.push($("#sunday").append("<div></div>"));
      }
      return _results;
    };
    return main_function();
  });
}).call(this);
