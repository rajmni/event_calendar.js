(function() {
  $(function() {
    var height_of_column, main_function, pixels_per_hour, propagate_time_column;
    height_of_column = 750;
    pixels_per_hour = height_of_column / 24;
    $("td").css("height", height_of_column);
    propagate_time_column = function(pixels_per_hour) {
      var hour, new_div, _results;
      _results = [];
      for (hour = 0; hour <= 23; hour++) {
        _results.push(hour === 0 ? $("#time_column").append("<div>" + hour + "</div>") : (new_div = $("#time_column").append("<div id='" + hour + "'>" + hour + "</div>"), $("#" + hour).css("margin-top", pixels_per_hour)));
      }
      return _results;
    };
    main_function = function() {
      var obj;
      propagate_time_column(pixels_per_hour);
      obj = jQuery.parseJSON('[{"start_time":12,"end_time":1},{"start_time":2,"end_time":3}]');
      return console.log(obj[0].start_time);
    };
    return main_function();
  });
}).call(this);
