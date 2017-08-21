/********************
ScrollerTrack.Init({
                control: "monthRange",
                from: 0,
                to: 12,
                current: 1,
                scale: [0, 3, 6, 9, 12]
            });
********************/

var ScrollerTrack = {
            BodyWidth: 500,
            CurrentX: 0,
            CurrentValue: 0,
            Count: 0,
            Control: null,
            Init: function (options) {
                var MaxValue = options.to;
                var $control = $("#" + options.control);
                var count = options.scale.length - 1;
                var mWidth = ScrollerTrack.BodyWidth;
                $control.find(".contain").css("width", mWidth + "px");
                var rangeBar = "<div class='show'>0</div><div class='value'></div><div class='track'></div>";
                $control.find(".contain").append(rangeBar);
                ScrollerTrack.Count = count;
                var itemWidth = mWidth / count;
                var itemUnit = MaxValue / count;
                for (var i = 0; i <= count; i++) {
                    var span = $("<span>" + i * itemUnit + "</span>");
                    $(span).css("margin-left", i * (itemWidth - 1) + "px");
                    $control.find(".scale").append(span);
                }
                ScrollerTrack.Value({ $control: $control, MaxValue: MaxValue });
            },
            Value: function () {
                var currentValue;
                var isMoving = false;
                var $control = arguments[0].$control,
                    MaxValue = arguments[0].MaxValue;
                ScrollerTrack.CurrentX = $control.find(".track").offset().left;
                $control.find(".track").mousedown(function () {
                    var target = $(this).parent();
                    isMoving = true;
                    $("html,body").mousemove(function (event) {
                        if (isMoving == false) return;
                        var changeX = event.clientX - ScrollerTrack.CurrentX;
                        currentValue = changeX - ScrollerTrack.CurrentX;
                        if (changeX <= 0) {
                            $(target).find(".track").css("margin-left", "0px");
                            $(target).find(".value").css("width", "0px");
                            $(target).find(".show").css("margin-left", "-15px");
                            $(target).find(".show").html(0);
                            ScrollerTrack.CurrentValue = 0;
                        }
                        else if (changeX >= ScrollerTrack.BodyWidth - 16) {
                            $(target).find(".track").css("margin-left", ScrollerTrack.BodyWidth - 16 + "px");
                            $(target).find(".value").css("width", ScrollerTrack.BodyWidth - 16 + "px");
                            $(target).find(".show").css("margin-left", ScrollerTrack.BodyWidth - 31 + "px");
                            $(target).find(".show").html(MaxValue);
                            ScrollerTrack.CurrentValue = MaxValue;
                        }
                        else {
                            $(target).find(".track").css("margin-left", changeX + "px");
                            $(target).find(".value").css("width", changeX + "px");
                            $(target).find(".show").css("margin-left", changeX - 15 + "px");
                            var v = MaxValue * ((changeX + 16) / ScrollerTrack.BodyWidth);
                            $(target).find(".show").html(parseInt(v));
                            ScrollerTrack.CurrentValue = parseInt(v);
                        }
                    });
                });
                $("html,body").mouseup(function () {
                    isMoving = false;
                });
            }
        }
