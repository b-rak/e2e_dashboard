<template>
  <NuxtLink
    :to="to"
    :id="id"
    :class="[
      selected
        ? 'after:scale-x-100 after:origin-[0%_50%] !font-bold !text-[#303436]'
        : '',
    ]"
    class="tab_inactive_18 cursor-pointer basic_text_grey no-underline hover:font-bold hover:text-[#303436] after:block after:content-[''] after:border-b-[0.188rem] after:border-b-[#ff4220] after:scale-x-0 after:transition after:ease-in-out after:duration-[250ms]"
    >{{ text }}</NuxtLink
  >
</template>

<script lang="ts" setup>
const props = defineProps<{
  to: String;
  id: String;
  text: String;
}>();

const route = useRoute();
const selected = ref(route.path.includes(props.to as string));
watch(
  () => route.path,
  () => {
    selected.value = route.path.includes(props.to as string);
  }
);
</script>
