<template>
  <h1 class="h2_bold_28 text-center">Mitteilungen</h1>
  <div class="flex gap-20">
    <div class="flex flex-col gap-4 w-40">
      <h3 class="h3_bold_18">Object Ref</h3>
      <span>My name: {{ obj.name }}</span>
      <span>Selected: {{ obj.selected }}</span>
      <button
        class="mr-auto border border-solid p-2 border_small bg_light shadow_light_2"
        @click="toggleSelected()"
      >
        Click me
      </button>
    </div>
    <div class="flex flex-col gap-4 w-40">
      <h3 class="h3_bold_18">Array Ref Obj Ref</h3>
      <template v-for="obj in arr">
        <span>My name: {{ obj.value.name }}</span>
        <span>Selected: {{ obj.value.selected }}</span>
        <button
          class="mr-auto border border-solid p-2 border_small bg_light shadow_light_2"
          @click="toggleArray()"
        >
          Click me
        </button>
      </template>
    </div>
    <Testcomponent
      :name="obj3.name"
      :selected="obj3.selected"
      @update:selected="updateDisplay"
    />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["check-session"],
});

//1
const obj = ref({
  name: "Old Name",
  selected: true,
});
const toggleSelected = () => {
  obj.value.selected = !obj.value.selected;
  obj.value.name = !obj.value.selected ? "New Name" : "Old Name";
};

//2
const arr = ref([]);
arr.value.push(obj);
const toggleArray = () => {
  arr.value[0].value.selected = !arr.value[0].value.selected;
  arr.value[0].value.name = !arr.value[0].value.selected
    ? "New Name"
    : "Old Name";
};

//3
const arr2 = ref([]);
const obj2 = {
  name: "Old Name",
  selected: true,
};
arr2.value.push(obj2);

const toggleArrayNotRef = () => {
  console.log(arr2.value);
  arr2.value[0].selected = !arr2.value[0].selected;
  arr2.value[0].name = !arr2.value[0].selected ? "New Name" : "Old Name";
  console.log(arr2.value);
};

const arr3 = reactive([obj2]);

const arr4 = [reactive(obj2)];
const obj3 = reactive({
  name: "Old Name",
  selected: true,
});

const arr5 = [obj3];
const updateDisplay = (ob: object) => {
  console.log(ob);
  //obj2.name = ob.name;
  //arr3[0].selected = ob.selected;
  //obj3.name = ob.name;
  //obj3.selected = ob.selected;

  arr5[0].selected = ob.selected;
};
</script>
