<template>
  <div
    class="px-6 py-3 h-14 flex items-center basic_white border border_medium border-solid f_border_neutral_80 shadow_light_1 gap-2"
  >
    <font-awesome-icon
      :icon="{ prefix: 'far', iconName: 'calendar-day' }"
      class="fa-flip-horizontal f_text_neutral_500 h-4 w-4 fa-xl"
    />
    <input
      type="text"
      name="daterange"
      class="h-[1.125rem] w-[10.875rem] text-center text_regular_16"
    />
  </div>
</template>

<script lang="ts" setup>
import DateRangePicker from "daterangepicker";

onMounted(() => {
  setTimeout(() => {
    const input = document.querySelector(
      'input[name="daterange"]'
    ) as HTMLElement;
    let daterangepicker = new DateRangePicker(input, {
      opens: "center",
      locale: {
        format: "DD.MM.YYYY",
        separator: " - ",
        applyLabel: "OK",
        cancelLabel: "Abbrechen",
        fromLabel: "Von",
        toLabel: "Bis",
        customRangeLabel: "Custom",
        daysOfWeek: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        monthNames: [
          "Januar",
          "Februar",
          "März",
          "April",
          "Mai",
          "Juni",
          "Juli",
          "August",
          "September",
          "Oktober",
          "November",
          "Dezember",
        ],
        firstDay: 1,
      },
    });
  }, 1);
});
</script>
