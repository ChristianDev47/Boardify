import { createPlugin } from "@fullcalendar/core";

const plugin = createPlugin({
  defaultEventBackgroundColor: "#22272B",
  defaultEventBorderColor: "#22272B",

  init() {
    this.calendar.options.eventBackgroundColor =
      this.calendar.options.eventBackgroundColor ||
      this.defaultEventBackgroundColor;
    this.calendar.options.eventBorderColor =
      this.calendar.options.eventBorderColor || this.defaultEventBorderColor;
  },
});

export default plugin;
